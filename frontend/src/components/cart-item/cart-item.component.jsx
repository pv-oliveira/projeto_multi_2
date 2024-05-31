import { FC } from 'react';

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='d-flex w-100' style={{ height: '80px', marginBottom: '15px'}}>
      <img width={'30%'} src={imageUrl} alt={`${name}`} />
      <div className='w-70 d-flex flex-column justify-content-center' style={{ alignItems: 'flex-start', padding: '10px 10px'}}>
        <span style={{ fontSize: '14px'}}>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
