import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = (props) => {
  const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];
  const [projects, setProjects] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(projects));
  }, [projects]);

  const addItem = (project, amount) => {
    setProjects((s) => [
      ...s,
      {
        id: project.id,
        title: project.title,
        image: project.image.imagelink[3].url,
        amount,
      },
    ]);
  };

  const isInCart = (product) => Boolean(findItem(product));

  const findItem = (product) => projects.find((p) => p.id === product.id);

  return (
    <CartContext.Provider
      value={{
        addItem,
        isInCart,
        cartItems: projects,
      }}
      {...props}
    />
  );
};
