export interface list {
  id?: any;
  name?: string;
  oldPrice?: any;
  description?: string;
  price?: number;
  unitsInStock?: number;
  rating?: number;
  productCategoryIds?: any[];
  productFrameIds?: any[];
  productMaterialIds?: any[];
  productSizeIds?: any[];
  sizesNames?: any[];
  url?: any[];
  review?: any[];
  reviewerName?: any[];
  reviewDate?: any[];
  isInWishlist?: boolean;
  inventoryStatus?: any;
}

function createListItem(data: Partial<list> = {}): list {
  return {
    oldPrice: data.oldPrice ?? '_', // Default to '_' if no oldPrice is provided
    url: [],
    ...data,
  };
}

const listItem = createListItem({ name: 'Sample Product' });
console.log(listItem);
