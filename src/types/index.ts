export interface IColor {
  name: string;
  image: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'Kachi Krhai' | 'Dye Dye' | 'Tilly ka Kaam';
  colors: IColor[];
  sizes: string[];
  images: string[];
  videos: string[];
  stock: number;
  featured: boolean;
  createdAt: string;
}

export interface ICartItem {
  product: IProduct;
  color: string;
  size: string;
  quantity: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface IOrderItem {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IOrder {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: IOrderItem[];
  totalPrice: number;
  paymentMethod: 'COD';
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}