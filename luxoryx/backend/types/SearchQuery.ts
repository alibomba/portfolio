export default interface SearchQuery{
    name: {
        contains: string,
        mode: string
    };
    price: {
        lte: number;
    } | {
        gte: number;
    };
}