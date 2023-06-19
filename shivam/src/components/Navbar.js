import React, { useCallback, useEffect, useState } from "react";
import "../App.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navbarf({ refreshValue, onDataChange }) {
  const navigate = useNavigate();
  const [cartCount, setcartCount] = useState(0);
  const [username, setusername] = useState("");
  const [userid, setuserid] = useState();
  const [searchItem, setSearchItem] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  var hideDiv =
    window.location.pathname === "/cartShow" ||
    window.location.pathname.startsWith("/ItemDetails/") ||
    window.location.pathname.startsWith("/placeOrder") ||
    window.location.pathname.startsWith("/Login");

  const fetchCartCount = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:5003/api/getCartCount?userId=" + userid
      );
      const json = await response.json();
      console.log(json);
      setcartCount(json.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [userid]);

  const decodeJWT = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const handleSearch = () => {
    onDataChange(searchItem);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedOut(true);
    navigate("/Login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decodedToken = decodeJWT(localStorage.getItem("token"));
      setusername(decodedToken.username);
      setuserid(decodedToken.id);
      fetchCartCount();
    }
  }, [fetchCartCount]);

  const Handelclick = () => {
    navigate("/cartShow");
  };

  const Login = () => {
    navigate("/Login");
  };

  if (isLoggedOut) {
    return <Navbarf refreshValue={refreshValue} onDataChange={onDataChange} />;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={require("../Assets/pic.jpg")}
            width="60"
            height="auto"
            className="d-inline-block align-top"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav navbarScroll>
            <Link className="navlink text-dark" to="/">
              {" "}
              Home{" "}
            </Link>
            <Link className="navlink text-dark" to="/">
              {" "}
              About{" "}
            </Link>
            <Link className="navlink text-dark" to="/">
              {" "}
              Contact us
            </Link>
          </Nav>
          <Form className=" me-auto  d-flex">
            {!hideDiv && (
              <>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                <Button variant="btn btn-success" onClick={handleSearch}>
                  Search
                </Button>
              </>
            )}
          </Form>
          {username ? (
            <div>
              <button className="btn " onClick={handleLogout}>
                Logout
              </button>
             {username}
            </div>
          ) : (
            <button className="btn mt-2" onClick={Login}>
              Login
            </button>
          )}

          {username && (
            <div className="shivam">
              <img
                onClick={Handelclick}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpryp1xWCg30Liy-aMXAkWJ5a45eMBr8mnRHmsqh-D8w&s"
                width="40"
                height="auto"
                className="addproductbadge"
                alt=""
              />
              <span className="addproduct">{cartCount}</span>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarf;
