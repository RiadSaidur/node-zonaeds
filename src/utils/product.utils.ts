import { ProductQuery, ProductQueryOptions, Sort } from "../interfaces/product.interface";

export const getQueryOptions = (queries: ProductQuery) => {
  const structuredQuery = {
    sort: {} as Sort,
    queryOptions: {} as ProductQueryOptions
  }

  if(queries.sort) {
    const [sortBy, order] = queries.sort.split(',')
    structuredQuery.sort = {
      sortBy, order
    }
  }
  if(queries.categories) {
    structuredQuery.queryOptions.categories = {
      $in: queries.categories.split(',')
    }
  }
  if(queries.colors) {
    structuredQuery.queryOptions['variants.colors'] = {
      $in: queries.colors.split(',')
    }
  }

  return structuredQuery
}