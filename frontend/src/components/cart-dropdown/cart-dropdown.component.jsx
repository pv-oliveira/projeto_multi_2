import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selector";

import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.style.scss";

export default function CartDropdown() {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="d-flex flex-column position-absolute bg-white cart-dropdown-container">
      <div className="cart-itens d-flex flex-column overflow-scroll" style={{ height: '240px'}}>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <span className="fs-6 m-auto">Seu carrinho está vazio</span>
        )}
      </div>
      <button className="btn btn-dark mt-2" style={{ height: '60px'}} onClick={goToCheckoutHandler}>IR PARA O CARRINHO</button>
    </div>
  );
}
