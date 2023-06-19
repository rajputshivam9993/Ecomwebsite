import React, { useEffect, useState } from "react";
import Navbarf from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CartItem = () => {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([]);
  const [refreshValue, setRefreshValue] = useState(false);

  const handleRefresh = () => {
    setRefreshValue(!refreshValue);
  };

  const ContinueBtn = () => {
    navigate("/placeOrder");
  };

  const fetchCartItem = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/getCartList");
      const json = await response.json();
      console.log(json);
      setCartItem(json);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteCartItem = async (itemId) => {
    try {
      const response = await fetch(
        "http://localhost:5003/api/deleteCartItem/" + itemId,
        {
          method: "delete",
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        handleRefresh();
        fetchCartItem();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuantityDecrease = async (itemId) => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, Qty: item.Qty - 1 } : item
      )
    );
    try {
      const response = await fetch(
        "http://localhost:5003/api/UpdateCartItem?cartId="+ itemId + "&cr_status=remove",          
        {
          method: "put",
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuantityIncrease = async (itemId) => {
    setCartItem((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, Qty: item.Qty + 1 } : item
      )
    );
    try {
      const response = await fetch(
        "http://localhost:5003/api/UpdateCartItem?cartId=" +
          itemId +
          "&cr_status=add",
        {
          method: "put",
        }
      );
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, []);

  return (
    <>
      <Navbarf refreshValue={refreshValue} />
      {cartItem !== null ? (
        <div className="container mt-4">
          {cartItem.map((item) => (
            <div className="row mb-4 border" key={item._id}>
              <div className="col-sm-1 mt-4 ">
                <button
                  type="button"
                  className="btn-close btn-close-white bg-warning"
                  aria-label="Close"
                  onClick={() => deleteCartItem(item._id)}
                />
              </div>
              <div className="col-sm-3 border">
                <img
                  className="image"
                  alt=""
                  src={item.productDetails[0].image}
                />
              </div>
              <div className="col-sm-3 border">
                <h6 className="mt-2">{item.productDetails[0].ProducttName}</h6>
                <p className="textcart">Best Quality</p>
              </div>
              <div className="col-sm-3 border">
                <div className="counter">
                  <button
                    className="btn btn-light"
                    onClick={() => handleQuantityDecrease(item._id)}
                  >
                    -
                  </button>
                  <span>{item.Qty}</span>
                  <button
                    className="btn btn-light"
                    onClick={() => handleQuantityIncrease(item._id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-sm-2 border">
                <h6 className="mt-4">${item.productDetails[0].Price}</h6>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="container">
        <button
          className="btn btn-success float-end mb-4"
          onClick={ContinueBtn}
        >
          Continue
        </button>
      </div>
    </>
  );
};
export default CartItem;
