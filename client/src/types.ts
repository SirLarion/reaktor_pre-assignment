import React from 'react';

export interface ProductType {
    id: string;
    type: string;
    name: string;
    color: string[];
    price: number;
    manufacturer: string;
    availability?: string;
}

export interface CategoryType {
    name: string;
    products: ProductType[];
}

