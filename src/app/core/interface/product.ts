export interface list {
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  _id: string;
  category: Category;
  inventoryStatus: any;
}

export interface Category {
  name: string;
}
