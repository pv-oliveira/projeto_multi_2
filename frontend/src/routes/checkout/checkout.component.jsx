import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.components";
import Schedule from "../../components/schedule/schedule.component";

import "./checkout.style.scss";

export default function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="d-flex flex-column align-items-center checkout-container">
      <div className="d-flex justify-content-between checkout-header">
        <div className="header-block">
          <span>Produto</span>
        </div>
        <div className="header-block">
          <span>Descrição</span>
        </div>
        <div className="header-block">
          <span>Quantidade</span>
         </div>
        <div className="header-block">
          <span>Preço</span>
         </div>
        <div className="header-block">
          <span>Remover</span>
         </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      {/* {
        cartItems.length > 0 ? <Schedule /> : null
      } */}
      <PaymentForm />
    </div>
  );
}
