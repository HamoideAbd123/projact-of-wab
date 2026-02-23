export interface Phone {
    id: number;
    name: string;
    brand: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
    display: string;
    price: string;
    image_url: string;
    images: { id: number; image_url: string }[];
    description: string;
    created_at: string;
    updated_at: string;
}
