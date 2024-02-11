import React, { useContext } from "react";
import styles from "./Heder.module.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BiCartAdd } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={styles.fixed}>
      <section className={styles.header_container}>
        <div className={styles.logo_container}>
          {/* logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          <div className={styles.delivery}>
            {/* Delivery */}
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={styles.search}>
          {/* search */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" name="" id="" placeholder="Search Amazon" />
          <FaSearch size={38} />
        </div>
        <div className={styles.order_container}>
          <div>
            <Link to="" className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1920px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
                alt="US flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
          </div>
          {/* Account, Order & Cart Components */}
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span
                    onClick={() => auth.signOut()}
                    className={styles.bolded}
                  >
                    Sign Out
                  </span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span className={styles.bolded}>Accounts & Lists</span>
                </>
              )}
            </div>
          </Link>
          <Link to="/orders">
            <div>
              <p>Returns</p>
              <span className={styles.bolded}>& Orders</span>
            </div>
          </Link>
          <Link to="/cart" className={styles.cart}>
            <BiCartAdd size={35} />
            <span>{totalItem}</span>
            <p className={styles.bolded}>Cart</p>
          </Link>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
