import { PRODUCTS } from "../constants";

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const initCart = () => {
  const cart = getCart();
  if (cart.length === 0) {
    cart.push(...PRODUCTS);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addCart = (product) => {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.name === product.name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, cartId: Date.now(), quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addQuantity = (cartID) => {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === cartID);
  if (existingProduct) {
    existingProduct.quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeCart = (cartId) => {
  const cart = getCart()
    .map((item) => {
      if (item.id === cartId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeQuantity = (cartID) => {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === cartID);
  if (existingProduct) {
    existingProduct.quantity = 0;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};