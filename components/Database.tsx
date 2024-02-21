export interface Product {
  id: string;
  name: string;
  description: string;
}

export const Products: Product[] = [
  {
    id: "1",
    name: "Home Oven",
    description:
      "Cook delicious meals at home with our state-of-the-art oven, combining energy efficiency with a sleek design.",
  },
  {
    id: "2",
    name: "Low Consumption Light Bulbs",
    description:
      "Illuminate your home efficiently with our low-consumption light bulbs, designed to save energy without compromising light quality.",
  },
  {
    id: "3",
    name: "Drumsticks",
    description:
      "For demanding musicians, our high-quality drumsticks offer durability and exceptional response, crafted from selected woods.",
  },
  {
    id: "4",
    name: "Kids' Colored Pencils",
    description:
      "Spark your child's creativity with our colorful pencils designed specifically for kids, perfect for artistic activities at home or school.",
  },
  {
    id: "5",
    name: "Women's Perfume",
    description:
      "Immerse yourself in a unique sensory experience with our exquisite women's perfume, blending captivating floral and woody notes for an aura of elegance and femininity.",
  },
];

export interface UserInteraction {
  id: string,
  text: string;
}

export const UserInteractions: UserInteraction[] = [
  {
    id: "1",
    text: "User Description"
  },
  {
    id: "2",
    text: "Purchases history"
  }
];

