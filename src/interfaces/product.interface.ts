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

export interface ProductUpdate {
  $push?: {
    categories?: string;
    'variants.colors'?: string;
  }
  name?: string;
  description?: string;
  qty?: number;
  variants?: {
    sizes?: {
      lg?: number;
      md?: number;
      sm?: number;
    }
  };
  prices?: {
    lg?: number;
    md?: number;
    sm?: number;
  };
}