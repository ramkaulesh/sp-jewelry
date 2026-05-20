import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    featured: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    getProduct(id: string): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getStripePublicKey(): Promise<string>;
    isStripeConfigured(): Promise<boolean>;
    setStripePublicKey(key: string): Promise<void>;
}
