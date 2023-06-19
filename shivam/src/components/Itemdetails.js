import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarf from "./Navbar";

const ItemDetails = () => {
  const segment = useParams();
  const [ProductDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5003/api/ItemDetails/" + segment.id,
          {
            method: "GET",
          }
        );
        const json = await response.json();
        console.log(json);
        setProductDetails(json.data[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [segment.id]);

  return (
    <>
      <Navbarf />
      <div class="row mt-5">
        <div class="col-md-4">
          <img src={ProductDetails.image} alt="" />
        </div>
        <div class="col-md-8">
          <h4>Details: {ProductDetails.Details}</h4>
          <h4>Price: ${ProductDetails.Price}</h4>
        </div>
      </div>
    </>
  );
};
export default ItemDetails;
