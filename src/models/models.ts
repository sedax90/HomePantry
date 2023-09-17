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
    ean: string;
    pantry: string;
    label: string;
}