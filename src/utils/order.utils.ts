import { OrderDocument } from "../interfaces/model.interface";
import { OrderQuery, OrderQueryOptions } from "../interfaces/order.interface";
import { Sort } from "../interfaces/product.interface";

export const getUpatableFields = ({ products }: OrderDocument) => {
  return products.map(product => ({ qty: product.qty, sizes: product.sizes }))
}

export const getOrderQueryOptions = (queries: OrderQuery) => {
  const structuredQuery = {
    sort: {} as Sort,
    queryOptions: {} as OrderQueryOptions
  }

  if(queries.sort) {
    const [sortBy, order] = queries.sort.split(',')
    structuredQuery.sort = {
      sortBy, order
    }
  }
  if(queries.pid) {
    structuredQuery.queryOptions.pid = queries.pid
  }
  if(queries.status) {
    structuredQuery.queryOptions.status = queries.status
  }

  return structuredQuery
}