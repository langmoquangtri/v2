export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  badge?: string;
  ctaText: string;
  ctaLink: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

export interface Specification {
  key: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  priceStr: string;
  imageUrl: string;
  images?: string[];
  shortDescription: string;
  description: string;
  specifications: Specification[];
  features: string[];
  isFeatured: boolean;
  rating: number;
  inStock: boolean;
  videoUrl?: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  location: string;
  year: string;
  material: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  scope: string[];
}

export interface Post {
  id: string;
  name: string;
  slug: string;
  date: string;
  author: string;
  readTime: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  sort_order: number;
}

export interface CtaSlide {
  id: string;
  title?: string;
  subtitle?: string;
  image: string;
  link?: string;
  button_text?: string;
  active: boolean;
  sort_order: number;
}

export type ViewType =
  | { type: "home" }
  | { type: "products"; categorySlug?: string }
  | { type: "product-detail"; slug: string }
  | { type: "projects" }
  | { type: "project-detail"; slug: string }
  | { type: "posts" }
  | { type: "post-detail"; slug: string }
  | { type: "contact"; productSlug?: string };
