import { gql } from 'graphql-tag';

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      name
      email
      createdAt
    }
  }
`;

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

export const GET_PRODUCT_BY_ID = gql`
  query Product($id: ID!) {
    product(id: $id) {
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

export const GET_PRODUCTS_WITH_CATEGORY = gql`
  query ProductsOFCategory($category: String) {
    products(category: $category) {
      id
      name
      category
      description
      image
      price
      createdAt
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      createdAt
    }
  }
`;
export const GET_ORDERS = gql`
  query Order {
    order {
      totalQuantity
      totalPrice
      user {
        id
        name
        email
        createdAt
      }
      orderItems {
        id
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
