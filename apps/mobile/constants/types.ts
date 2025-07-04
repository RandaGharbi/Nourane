export type RawProduct = {
  id: number;
  title: string;
  product_url: string;
  image_url: string;
  price: number;
  customerRating: number | null;
  numberOfReviews: number;
  collection: string;     
  typeOfCare: string;
  subtitle: string;

};

export type Ingredient = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type IngredientCategory = {
  category: string;
  ingredients: Ingredient[];
};


export type Product = {
  id: number;
  title: string;
  product_url: string;
  image_url: string;
  subtitle: string;
  price: number;
  customerRating: number | null;
  numberOfReviews: number;     
};


export type Order = {
  productUrl: string;
};

// src/types/FAQItemType.ts
export type FAQItemType = {
  title: string;
  subtitle: string;
  icon: string;
};

export type RawShop = {
  id: number;
  Subtitle:  string;
  Name:  string;
  product_url:  string;
  Image: string;
  price: number;
  Arrivals: string;
  category: string;
};