import React from 'react';
import renderer from 'react-test-renderer';
import { ProductCard, ProductImage } from '../../src/components';
import { product2 } from '../data/products';

describe('ProductImage', () => {
  test('should display the component correctly without image', () => {
    const wrapper = renderer.create(<ProductImage img="http://image.jpg" />);

    expect(wrapper.toJSON()).toMatchSnapshot();
    console.log(wrapper.toJSON());
  });

  test('should display the product with image', () => {
    const wrapper = renderer.create(
      <ProductCard product={product2}>{() => <ProductImage />}</ProductCard>
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
