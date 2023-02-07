import { useState, useEffect, useRef } from 'react';
import { InitialValuesProps, onChangeArgsProps, Product } from '../interfaces/interfaces';

interface useProductProps {
    product: Product;
    onChange?: (args: onChangeArgsProps) => void;
    value?: number;
    initialValues?: InitialValuesProps
}

export const useProduct = ({ onChange, product, value = 0, initialValues }: useProductProps) => {

    //Si initialValues.count no es null, entonces asigna ese valor, sino el de value
    const [counter, setCounter] = useState<number>(initialValues?.count || value);
    const isMounted = useRef(false);

    const increaseBy = (value: number) => {

        //Aquí se hacen 2 cosas
        //Si se establece un máximo, se evalúa el valor del counter + value y si es menor que el maxCount lo
        //establece, sino lo deja con el maxCount
        //Si no está establecido un máximo, se asigna el máximo entre counter + value y 0. Esto asegura que 
        //el valorfd del newCounter nunca va a ser menor a 0
        let newCounter = initialValues?.maxCount ? Math.min(counter + value, initialValues.maxCount) :
            Math.max(counter + value, 0);
        setCounter(newCounter);
        onChange && onChange({ count: newCounter, product });
    };

    const reset = () => {
        setCounter(initialValues?.count || value)
    }

    const plusTwo = () => {
        setCounter(initialValues?.maxCount && initialValues?.maxCount - counter >= 2 ? counter + 2 : counter);
    }

    const minusTwo = () => {
        setCounter(counter === 0 ? counter : counter - 2);
    }

    useEffect(() => {
        if (!isMounted.current) return;

        setCounter(initialValues?.count || value)
    }, [value]);

    useEffect(() => {
        isMounted.current = true;
    }, [])

    return {
        counter,
        isMaxCountReached: !!initialValues?.count && initialValues.maxCount === counter,
        maxCount: initialValues?.maxCount,
        increaseBy,
        reset,
        plusTwo,
        minusTwo
    }
}