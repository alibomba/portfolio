import { Request, Response, Router } from 'express';
import { PrismaClient, Product, ProductLike } from '@prisma/client';
import { PaginationResponse } from '../types';
import jwtAuthentication from '../middleware/jwtAuthentication';
import Favorite from '../types/Favorite';
const productRoutes: Router = Router();
const prisma = new PrismaClient();

const PER_PAGE = 12;

productRoutes.get('/products', async (req: Request, res: Response) => {
    let page = req.query.page as string | number;
    if (page) page = +page
    else page = 1;
    const productCount = await prisma.product.count();
    const lastPage = Math.ceil(productCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;
    const products = await prisma.product.findMany({ take: PER_PAGE, skip: offset, include: { discount: true, images: { where: { is_thumbnail: true } } } });
    const response: PaginationResponse<Product> = {
        currentPage: page,
        lastPage,
        data: products
    };
    res.json(response);
});

productRoutes.get('/products-search', async (req: Request, res: Response) => {
    const { name, minPrice, maxPrice, category, sortCheap, sortExpensive } = req.query;
    let page = req.query.page as string | number;
    if (page) page = +page
    else page = 1;

    let query: any = {};

    if (name) {
        query.name = { contains: name as string, mode: 'insensitive' }
    }

    if (minPrice) {
        query.price = {
            gte: parseFloat(minPrice as string)
        }
    }

    if (maxPrice) {
        query.price = {
            lte: parseFloat(maxPrice as string)
        }
    }

    if (category) {
        query.category = {
            name: {
                equals: category as string,
                mode: 'insensitive'
            }
        }
    }

    let order: any = {};

    if (sortCheap) {
        order.price = 'asc';
    }

    if (sortExpensive) {
        order.price = 'desc';
    }

    if (!sortCheap && !sortExpensive) {
        order.createdAt = 'desc';
    }

    const productCount = (await prisma.product.findMany({ where: query })).length;
    const lastPage = Math.ceil(productCount / PER_PAGE);
    if (productCount === 0) {
        const response: PaginationResponse<Product> = {
            currentPage: 1,
            lastPage: 1,
            data: []
        }
        return res.json(response);
    }
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;

    const products = await prisma.product.findMany({
        where: query,
        take: PER_PAGE,
        skip: offset,
        include: { discount: true, images: { where: { is_thumbnail: true } } },
        orderBy: order
    });
    const response: PaginationResponse<Product> = {
        currentPage: page,
        lastPage,
        data: products
    };
    res.json(response);
});

productRoutes.get('/products-discount', async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            discount: {
                expires_at: { gt: new Date() }
            }
        },
        include: { discount: true, images: { where: { is_thumbnail: true } } },
        take: 6
    });
    if (products.length < 6) return res.status(404).json({ message: 'Za mało wyników' });
    res.json(products);
});

productRoutes.get('/products-limited', async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: { stock: { lte: 30 } },
        orderBy: { stock: 'asc' },
        include: { discount: true, images: { where: { is_thumbnail: true } } },
        take: 6
    });

    if (products.length < 6) return res.status(404).json({ message: 'Za mało wyników' });
    res.json(products);
});

productRoutes.get('/products-popular', async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        include: { orders: true, discount: true, images: { where: { is_thumbnail: true } } }, orderBy: {
            orders: {
                _count: 'desc'
            }
        },
        take: 6
    });
    res.json(products);
});

productRoutes.get('/products-new', async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({ include: { discount: true, images: { where: { is_thumbnail: true } } }, orderBy: { createdAt: 'desc' }, take: 6 });
    res.json(products);
});

productRoutes.get('/my-favorites', jwtAuthentication, async (req: Request, res: Response) => {
    const PER_PAGE: number = 6;
    const { user } = req.body;
    let page = req.query.page as string | number;
    if (page) page = +page;
    else page = 1;
    const favoritesCount = (await prisma.productLike.findMany({ where: { user_id: user.id } })).length;
    if (favoritesCount === 0) return res.status(404).json({ message: 'Brak ulubionych' });
    const lastPage = Math.ceil(favoritesCount / PER_PAGE);
    if (page > lastPage) return res.status(404).json({ message: `There are only ${lastPage} pages` });
    const offset = (page - 1) * PER_PAGE;
    const favorites = await prisma.productLike.findMany({
        where: { user_id: user.id },
        select: {
            product: {
                include: { discount: true, images: { where: { is_thumbnail: true } } }
            }
        },
        take: PER_PAGE,
        skip: offset
    });
    const response: PaginationResponse<Favorite> = {
        currentPage: page,
        lastPage,
        data: favorites
    };
    res.json(response);
});

productRoutes.get('/product/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            images: true,
            category: true,
            variants: true,
            discount: true,
            parameters: true,
            reviews: true
        }
    });
    if (!product) return res.status(404).json({ message: 'Produkt nie istnieje' });
    res.json(product);
});

productRoutes.get('/cross-sell/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(400).json({ message: 'Produkt nie istnieje' });
    const products = await prisma.product.findMany({
        where: { category_id: product.category_id },
        include: { discount: true, images: { where: { is_thumbnail: true } } },
        take: 3
    });
    if (products.length < 3) return res.status(404).json({ message: 'Za mało wyników' });
    res.json(products);
});

export default productRoutes;