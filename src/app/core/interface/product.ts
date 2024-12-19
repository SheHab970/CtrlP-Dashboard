export interface list {
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  OldPrice: number;
  UnitsInStock: number;
  CategoryNames: any;
  FramesNames: any;
  MaterialsNames: any;
  SizesNames: any;
  Image: any;
}

// function createListItem(data: Partial<list> = {}): list {
//   return {
//     oldprice: data.OldPrice ?? '_', // Default to '_' if no oldPrice is provided
//     Image: [],
//     ...data,
//   };
// }
// const listItem = createListItem({ Name: 'Sample Product' });
// console.log(listItem);
