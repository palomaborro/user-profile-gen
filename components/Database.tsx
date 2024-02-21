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
  id: string;
  description: string,
  text: string;
}

export const UserInteractions: UserInteraction[] = [
  {
    id: "1",
    description: "Respectful and polite",
    text: "I hope this email finds you well. I recently purchased one of your products, Low Consumption Light Bulbs, and unfortunately, I've encountered some issues with its functionality. Despite following the user manual carefully, it turns out after a few minutes. I understand that sometimes these things can happen, and I'm reaching out to kindly request assistance in resolving this matter. I would appreciate any guidance or support you can offer to help rectify the situation. Thank you for your attention to this matter, and I look forward to hearing from you soon.",
  },
  {
    id: "2",
    description: "Angry and demanding",
    text: "I'm writing to let you know that the Home Oven I bought from your company is a total disaster. It's malfunctioning like crazy, and I'm really fed up with it. I followed the instructions, but it's still acting up. Seriously, what's going on with your quality control? I expect better from a supposedly reputable company like yours. You better fix this ASAP or I'll be taking my business elsewhere.",
  },
];
