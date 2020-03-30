export interface Product {
  _id: number;
  name: string;
  price: number;
  ingredients: string[];
  description: string;
  imagePath: string;
  type: object;
}

export interface Type {
  food?: boolean;
  beverage?: boolean;
}

