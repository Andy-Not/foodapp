import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const checkoutHandler = () => {
      setIsCheckout(true);
  }

  const submitData = async (userData) => {
      setIsSubmitting(true);
        await fetch('https://foodapp-5aa39-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                items: cartCtx.items
            })
        });
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
      <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
              Close
          </button>
          {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
      </div>
  )

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitData} onCancel={props.onClose}/>}
            {!isCheckout && modalActions}
        </>
    )

    const isSubmittingModalConetnt = <p> Sending your order to the cloud...</p>
    const didSubmitModalContent =
        <>
            <p>Sucessfully sent the order!</p>

            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </>

  return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalConetnt}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
