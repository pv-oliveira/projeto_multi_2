import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 pb-4 d-flex justify-content-center align-items-center flex-column container-product">
      <img src={imageUrl} alt={`${name}`} />
      <div className="row w-100 flex-row d-flex justify-content-center footer-card">
        <span className="col-10 p-0 mb-2">{name}</span>
        <span className="col-2 p-0">{price}</span>
      </div>
      <button
        className="btn btn-light add-to-cart-button"
        onClick={addProductToCart}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default ProductCard;