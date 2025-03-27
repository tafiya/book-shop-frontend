export interface IProduct {
  _id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  imgURL: string;
  isDeleted: boolean;
}
export interface TUser {
  _id: string; // MongoDB ObjectId
  name: string;
  address: string;
  phone: string;
  userImg: string;
  email: string;
  password: string; // Optional, since it may not be needed in every scenario
  role: "User" | "Admin"; // Restricting to specific roles
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type TTransaction = {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
};

export type TOrder = {
  _id: string;
  product: IProduct;
  orderQuantity: number;
  totalPrice: number;
  estimatedDeliveryDate: Date;
  transaction: TTransaction;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
