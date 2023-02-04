import { createContext } from "react";

export const MenuContext = createContext({
  menus: {},
  cart: {},
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const MenuProvider = ({
  menus,
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  children,
}) => {
  return (
    <MenuContext.Provider
      value={{ menus, cart, addToCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </MenuContext.Provider>
  );
};
