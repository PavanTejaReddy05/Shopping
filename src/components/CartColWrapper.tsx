import { useState } from "react";
import Collection from './Collection';
import Cart from '../Routes/cart';

interface Item {
  image: string;
  price: string; // Price is a string with currency
}

interface Category {
  _id: string;
  title: string;
  items: Item[];
}

interface CartItem extends Item {
  quantity: number;
}

const CartCollectionWrapper = ({ data }: { data: Category[] }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Item, quantity: number) => {
    console.log("addToCart function inside wrapper:", addToCart);
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.image === item.image
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.image === item.image
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity }];
      }
    });
  };
  console.log("addToCart function in wrapper:", addToCart);
  return (
    <div>
      <Collection data={data} addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default CartCollectionWrapper;
