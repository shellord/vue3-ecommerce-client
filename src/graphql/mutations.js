import { gql } from 'graphql-tag'

export const GET_ALL_PRODUCTS = gql`
  query AllProducts($count: Int) {
    products(count: $count) {
      id
      name
      price
      image
      description
      category
      createdAt
    }
  }
`
