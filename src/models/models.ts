export interface Home {
    name: string;
    label: string;
}

export interface Pantry {
    name: string;
    home: string;
    label: string;
}

export interface Product {
    code: string;
    pantry: string;
    label: string;
    quantity: number;
}

export interface ProductProps {
    [name: string]: any;
}