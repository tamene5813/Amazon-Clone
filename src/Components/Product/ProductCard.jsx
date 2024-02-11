import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import styles from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {Type} from "../../Utility/actionType"

function ProductCard({ product, flex, renderDesc, needAddButton }) {
  const { id, title, price, description, category, image, rating } = product;

   const [state, dispatch]=useContext(DataContext)

   const addToCart=()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { id, title, price, description, category, image, rating},
    });
   }


  return (
    <div
      className={`${styles.card_container} ${flex ? styles.product_flex : ""}`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={`${category} image`} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={styles.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* rating Counter */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* Price */}
          <CurrencyFormat amount={price} />
        </div>

        {needAddButton && (
          <button className={styles.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
