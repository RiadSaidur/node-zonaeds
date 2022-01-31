export interface ProductQuery {
  sort?: string;
  categories?: string;
  colors?: string;
}
export interface ProductQueryOptions {
  categories?: {
    $in: string[];
  };
  'variants.colors': {
    $in: string[];
  };
}

export interface Sort {
  sortBy: string;
  order: string;
}