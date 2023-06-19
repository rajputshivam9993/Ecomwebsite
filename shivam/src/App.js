import React from 'react';
import './App.css';
import Homescreen from './components/Homescreen';
import CartItem from './components/CartItems';
import { Routes,Route } from 'react-router-dom';
import ItemDetails from './components/Itemdetails';
import OrderDetail from './Orderscreen';
import Login from './components/Login';


function App() {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/ItemDetails/:id" element={<ItemDetails />} />
        <Route path="/cartShow" element={<CartItem />} />
        <Route path="/placeOrder" element={< OrderDetail/>} />
        <Route path="/Login" element={< Login/>} />
      </Routes>
    </div>
  );
}

export default App;
