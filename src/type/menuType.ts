export type ShowType = {
    coffee: boolean;
    tea: boolean;
    juices: boolean;
    soda: boolean;
};

export interface DetailMenuProps {
    title: string
    review: number
    price: number
    description: string
    image: string
}