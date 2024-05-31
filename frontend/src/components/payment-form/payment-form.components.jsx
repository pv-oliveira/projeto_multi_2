import { useState } from "react";
import { useSelector } from "react-redux";

import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import SignInForm from "../sign-in-form/sign-in-form.component";
// import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const amount = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  // const currentUser = useSelector(selectCurrentUser);
  const [newUser, setNewUser] = useState(false)

  const newPaymentHandler = async (e) => {
    e.preventDefault();

    setNewUser(true);
  }

  return (<div className="row w-100 flex-row justify-content-between">
    <div className="col-lg-6 mt-5">
      { newUser ? <SignInForm className="col-lg-6" items={cartItems} amount={amount} /> : null }
    </div>
    <div className="col-lg-6 d-flex flex-column align-items-end">
      <span className="fs-2 mt-4">Total: ${amount}</span>
      <form onSubmit={newPaymentHandler}>
      { !newUser ? <button className="btn btn-dark mt-2" style={{ marginLeft: 'auto', marginTop: '30px' }} >Pagar</button> : null }
      </form>
    </div>



  </div>
  );
};

export default PaymentForm;
