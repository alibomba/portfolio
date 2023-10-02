import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function getRandomElementFromArray(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function productSeeder(howMany: number) {
    const categoriesIds = await prisma.category.findMany({ select: { id: true } });
    const names = ['Lorem ipsum', 'Lorem', 'Ipsum', 'Gold Watch', 'Woman Necklace', 'Some product'];

    for (let i = 0; i < howMany; i++) {
        await prisma.product.create({
            data: {
                name: getRandomElementFromArray(names),
                description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat dui, fringilla eget porta eu, congue vitae orci. Curabitur ultrices faucibus velit, aliquet efficitur mi accumsan in. Vivamus augue nisi, placerat sit amet nibh nec, pretium posuere elit. Nunc ut euismod urna. Fusce maximus volutpat pellentesque. Maecenas aliquam convallis augue, a ultrices velit gravida eu. Vestibulum eu nibh nec nisl finibus mollis vitae ut metus. Proin ultrices, libero tempus accumsan laoreet, enim metus porttitor nisl, eu ornare est lorem et orci. In maximus dictum semper. Praesent in faucibus tortor. Ut non lobortis lectus, nec interdum orci.

                Integer varius imperdiet sem, et sollicitudin velit consequat ac. Nullam rhoncus ultrices turpis ac tempor. Nam eu congue libero. Praesent in mauris ultrices, convallis nunc a, fermentum elit. Donec ut auctor velit. Nulla accumsan, nunc at iaculis ultricies, erat tortor ultricies mauris, vitae tincidunt quam lacus eget quam. Integer non ex eget nulla pharetra tincidunt. Nulla a enim urna. Duis ac commodo sapien. Praesent scelerisque consequat dolor, ut ullamcorper sem pellentesque sit amet.

                Suspendisse ac lorem convallis, pretium nulla quis, laoreet lorem. Cras elementum bibendum facilisis. Maecenas volutpat tempus pretium. Maecenas odio odio, ultrices non arcu quis, bibendum iaculis sapien. Nam ullamcorper dui risus, id dapibus risus rutrum nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas commodo ligula volutpat magna consectetur iaculis. Donec id vehicula lacus. Cras porta nulla a risus hendrerit congue. Mauris cursus mollis urna, vel viverra odio consequat sed. Cras id est pellentesque est egestas ultricies non sit amet nisl. Donec vel interdum quam. Fusce enim metus, placerat sit amet ipsum a, cursus dictum velit. Proin sed nisl condimentum, rhoncus nibh ut, accumsan arcu. Mauris erat sapien, rutrum et metus in, rhoncus consequat ante.`,
                price: parseFloat((Math.random() * (3000 - 200) + 200).toFixed(2)),
                stock: Math.round(Math.random() * (300 - 1 + 1)) + 1,
                category_id: getRandomElementFromArray(categoriesIds).id
            }
        })
    }
}

export default productSeeder;