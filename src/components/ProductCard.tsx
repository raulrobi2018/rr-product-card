import React from 'react';

import styles from '../styles/styles.module.css';

import { useProduct } from '../hooks/useProduct';
import { createContext } from 'react';
import { ProductCardHandlers } from '../interfaces/interfaces';
import {
  ProductContextProps,
  Product,
  onChangeArgsProps,
  InitialValuesProps,
} from '../interfaces/interfaces';

export const ProductContext = createContext({} as ProductContextProps);
const { Provider } = ProductContext;
export interface Props {
  product: Product;
  //children?: ReactElement | ReactElement[];
  children: (args: ProductCardHandlers) => JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (args: onChangeArgsProps) => void;
  value?: number;
  initialValues?: InitialValuesProps;
}

export const ProductCard = ({
  children,
  product,
  className,
  style,
  onChange,
  value,
  initialValues,
}: Props) => {
  const {
    counter,
    increaseBy,
    maxCount,
    isMaxCountReached,
    reset,
  } = useProduct({
    onChange,
    product,
    value,
    initialValues,
  });

  return (
    <Provider value={{ counter, increaseBy, maxCount, product }}>
      <div className={`${styles.productCard} ${className}`} style={style}>
        {//React no permite renderizar funciones, pero podemos ejecutarla de la manera
        //en que la estamos haciendo aquí ya que lo que hace es devolver un JSX
        children({
          count: counter,
          isMaxCountReached,
          maxCount: initialValues?.maxCount,
          product,
          increaseBy,
          reset,
        })}
      </div>
    </Provider>
  );
};
