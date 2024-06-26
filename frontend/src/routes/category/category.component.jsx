import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.components';

import {
  selectCategoriesMap,
  selectIsLoading,
} from '../../store/categories/category.selector';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className='text-center fs-1 mb-4'>{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='row'>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>)}
    </Fragment>
  );
};

export default Category;
