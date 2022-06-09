import { gql } from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;
export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!) {
    addToCart(productId: $productId) {
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
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: ID!) {
    removeFromCart(productId: $productId)
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($productId: ID!) {
    deleteCartItem(productId: $productId)
  }
`;

export const SIGNUP_USER = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder {
    createOrder {
      totalQuantity
      totalPrice
      user {
        id
        name
        email
        createdAt
      }
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
