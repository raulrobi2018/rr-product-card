# rr-product-card

NPM testing deployment

### Raul Rodriguez

## Example

```
import {ProductCard, ProductImage, ProductTitle, ProductButtons} from 'rr-product-card';
```

```
<ProductCard
    product={product}
    initialValues={{
        count: 4
        //maxCount: 10
    }}
>
    {({reset, isMaxCountReached, increaseBy, count, maxCount}) => (
        <>
            <ProductImage />
            <ProductTitle />
            <ProductButtons />
        </>
    )}
</ProductCard>

```
