import React from "react";
import { categoryInfos } from "./categoryInformation";
import CategoryCard from "./CategoryCard";
import styles from "./category.module.css";

function Category() {
  return (
    <section className={styles.category_container}>
      {categoryInfos.map((info) => (
        <CategoryCard key={info.name} data={info} />
      ))}
    </section>
  );
}

export default Category;
