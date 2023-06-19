import React, { useEffect, useState } from "react";
import "../App.css";
import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Fieldbox = ({ handleRefresh, data }) => {
  const [productdata, setproductdata] = useState([]);
  const [userid, setuserid] = useState();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5003/api/products");
      const json = await response.json();
      console.log(json);
      setproductdata(json);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addToCart = async (prodid) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
    try {
      const response = await fetch("http://localhost:5003/api/addcart", {
        method: "post",
        body: JSON.stringify({
          productId: prodid,
          userId: userid,
          Qty: 1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        handleRefresh();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const decodeJWT = (token) => {
    try {
      let decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };

  const Itemdetails = (id) => {
    navigate("/ItemDetails/" + id);
  };

  const searchData = async (data) => {
    try {
      const response = await fetch(`http://localhost:5003/api/search/${data}`);
      if (response.ok) {
        const json = await response.json();
        console.log(json.data);
        setproductdata(json.data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let decodedToken = decodeJWT(localStorage.getItem("token"));
      setuserid(decodedToken.id);
    }
    if (data === "") {
      fetchData();
    } else {
      searchData(data);
    }
  }, [data]);

  return (
    <>
      <div className="mt-5 container">
        <div className="top">
          <div className="row">
            {productdata.length > 0 ? (
              productdata.map((prod) => (
                <div className="col-lg-2 col-md-4 col-sm-6 mb-4" key={prod._id}>
                  <Card>
                    <Card.Img
                      onClick={() => Itemdetails(prod._id)}
                      className="image"
                      variant="top"
                      src={prod.image}
                    />
                    <Card.Body>
                      <Card.Text>
                        <strong>{prod.ProducttName}</strong>
                      </Card.Text>
                      <Card.Text>
                        <ins>Rs. {prod.Price}</ins>
                      </Card.Text>
                      <button
                        onClick={() => addToCart(prod._id)}
                        type="button"
                        className="btn btn-success btn-sm"
                      >
                        Add to Cart
                      </button>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p>No items found..</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fieldbox;
