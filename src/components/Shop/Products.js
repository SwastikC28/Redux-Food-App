import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import classes from './Products.module.css';
import Spinner from 'react-bootstrap/Spinner';

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const url = 'https://dummyjson.com/products';
      const response = await fetch(url);
      const data = await response.json();

      const totalProducts = data.products;

      const transformedData = totalProducts.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        price: p.price,
      }));
      transformedData.splice(4);
      setProducts(transformedData);
    };

    setIsLoading(true);
    setTimeout(() => {
      console.log('Lets wait');
    }, 1000);
    getProducts();
    setIsLoading(false);
  }, []);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {isLoading && (
        <div className={classes.spinner}>
          <Spinner animation="border" variant="light" />
        </div>
      )}

      <ul>
        {products.map((product) => (
          <ProductItem
            id={product.id}
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
