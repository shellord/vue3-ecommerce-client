import { gql } from 'graphql-tag';

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
`;

export const GET_CART = gql`
  query Cart {
    cart {
      user {
        id
        name
        email
        createdAt
      }
      totalQuantity
      totalPrice
      cartItems {
        product {
          id
          name
          category
          description
          image
          price
          createdAt
        }
        quantity
        createdAt
      }
    }
  }
`;
