import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import styles from "./results.module.css";
import Loader from "../../Components/Loader/Loader";

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <section>
            <h1 style={{ padding: "30px" }}>Results</h1>
            <p>Category/{categoryName}</p>
            <hr />
            <div className={styles.products_container}>
              {results?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  needAddButton={true}
                />
              ))}
            </div>
          </section>
        )}
      </>
    </LayOut>
  );
}

export default Results;
