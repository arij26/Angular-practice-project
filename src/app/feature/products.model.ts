export interface productsModel{
    id: string;
    title: string;
    price: string;
    description: string;
    category: string;
    image: string;
    rating: rate
}

export interface rate {
    rate:string,
    count:string
}