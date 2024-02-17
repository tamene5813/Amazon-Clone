import React, { useContext, useState } from "react";
import styles from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/actionType";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // backend //function setup
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      // console.log(response.data)
      const clientSecret = response.data?.clientSecret;

      // React side confirmation using stripe
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      console.log(paymentIntent);
      //After confirmation Orders saved to firestore then clear the basket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // Empty the basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment_header}>Checkout {totalItem} items</div>
      {/* Payment method */}
      <section className={styles.payment}></section>
      <hr />
      {/* payment address */}
      <div className={styles.flex}>
        <h3>Delivery Address</h3>
        <div>
          <div>{user?.email}</div>
          <div>123 React Lane</div>
          <div>Emdibir, Ethiopia</div>
        </div>
      </div>
      <hr />
      {/* product */}
      <div className={styles.flex}>
        <h3>Review items and Delivery</h3>
        <div>
          {basket?.map((item) => (
            <ProductCard product={item} flex={true} />
          ))}
        </div>
      </div>
      <hr />
      {/* Card Info */}
      <div className={styles.flex}>
        <h3>Payment Method</h3>
        <div className={styles.payment_card_container}>
          <div className={styles.payment_details}>
            <form onSubmit={handlePayment}>
              {/* Card Error */}
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              {/* Card */}
              <CardElement onChange={handleChange} />

              {/* price */}
              <div className={styles.payment_price}>
                <span style={{ display: "flex", gap: "10px" }}>
                  <p>Total Order:</p> <CurrencyFormat amount={total} />
                </span>
              </div>
              <button type="submit">
                {processing ? (
                  <div className={styles.loading}>
                    <ClipLoader color="#000" size={15}></ClipLoader>
                    <p>Please Wait ...</p>
                  </div>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Payment;
