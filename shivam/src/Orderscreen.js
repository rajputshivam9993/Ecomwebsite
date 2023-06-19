import React, { useEffect, useState } from "react";
import "./App.css";
import Navbarf from "./components/Navbar";
import Swal from "sweetalert2";

const OrderDetail = () => {
  const [cartItem, setCartItem] = useState([]);
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
  useEffect(() => {
    fetchCartItem();
  }, []);

  const PlaceOrderbtn = () => {
    Swal.fire({
      icon: "success",
      title: "Your order has been placed successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <Navbarf />

      <div className="container mt-3">
        <div class="row">
          <div class="col-md-8">
            {cartItem.map((item) => (
              <div class="d-flex align-items-center" key={item._id}>
                <div class="col-md-4" >
                  <img
                    className="image"
                    src={item.productDetails[0].image}
                    alt=""
                  />
                </div>
                <div class="mt-5 col-md-4 ">
                  <pre>
                    <h6> {item.productDetails[0].ProducttName}</h6>
                    <h6> Price:{item.productDetails[0].Price}</h6>
                    <h6> Qty:{item.Qty}</h6>
                  </pre>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <pre>
              <h5>prize: $300</h5>
            </pre>
            <pre>
              <h5>Discount: $30</h5>
            </pre>
            <pre>
              <h5>Delivery Charges: $10</h5>
            </pre>
            <pre>
              <h5>Total: $340</h5>
            </pre>
            <button className="Placeorderbtn" onClick={PlaceOrderbtn}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
