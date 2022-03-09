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

  const removeItem = (project) => {
    const index = findItemIndex(project);
    setProjects((s) => [...s.slice(0, index), ...s.slice(index + 1)]);
  };

  const getTotal = () =>
    projects.reduce((total, project) => total + Number(project.amount), 0);

  const isInCart = (project) => Boolean(findItem(project));

  const findItem = (project) => projects.find((p) => p.id === project.id);

  const findItemIndex = (project) =>
    projects.findIndex((p) => p.id === project.id);

  return (
    <CartContext.Provider
      value={{
        getTotal,
        addItem,
        removeItem,
        isEmpty: projects.length === 0,
        isInCart,
        cartItems: projects,
      }}
      {...props}
    />
  );
};
