import React, { useEffect, useState } from 'react';
import Watch from "./w12.jpg";
import Bag from "./w14.jpg";
import phone from "./w66.jpeg";
import Laptop from "./w55.jpg";
import './Products.css';

const Products = () => {
  const productList = [
    { name: "Watch", price: 349, img: Watch, description: "Stylish Watch" },
    { name: "1+Phone", price: 34999, img: phone, description: "Powerful Smartphone" },
    { name: "Bag", price: 800, img: Bag, description: "Durable Bag" },
    { name: "Laptop", price: 88000, img: Laptop, description: "Powerful Laptop" }
  ];

  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const totalPrice = getTotalPrice();
    setTotalPrice(totalPrice);
  }, [cartList]);

  const getTotalPrice = () => cartList.reduce((total, item) => total + item.price, 0);

  const handleAddToCart = (index) => setCartList((prevCartList) => [...prevCartList, productList[index]]);
  const handleRemoveFromCart = (index) => setCartList(cartList.filter((_, i) => i !== index));

  const handlePlaceOrder = () => {
    if (totalPrice === 0) {
      alert("First select a product");
    } else {
      const confirmation = window.confirm(`Your total products price is ₹${totalPrice}. Are you sure you want to place the order?`);
      if (confirmation) {
        alert("Order Submitted");
        setCartList([]);
      }
    }
  };

  const toggleCartVisibility = () => setShowCart(!showCart);

  return (
    <div className='container'>
      <h1 className='heading'>Products</h1>
      <ol className='product-list'>
        {productList.map((item, index) => (
          <li key={index} className='product-item'>
            <div>
              <p>{`${item.name} ₹${item.price}`}</p>
              <p>{item.description}</p>
              <img src={item.img} alt={item.name} className='product-image' />
            </div>
            <button onClick={() => handleAddToCart(index)} className='add-to-cart'>Add To Cart</button>
          </li>
        ))}
      </ol>
      {showCart && (
        <div className='cart-section'>
          <h2 className='heading'>Shopping Cart</h2>
          <ul className='cart-list'>
            {cartList.map(({ name, price, description, img }, index) => (
              <li key={index} className='cart-item'>
                <div>
                  <p>{`${name} ₹${price} ${description}`}</p>
                  <img src={img} alt={name} className='cart-image' />
                </div>
                <button onClick={() => handleRemoveFromCart(index)} className='remove-button'>Remove</button>
              </li>
            ))}
          </ul>
          <p className='total-price'>Total Price: ₹{totalPrice}</p>
          <button onClick={handlePlaceOrder} id='order'>Place Order</button>
        </div>
      )}
      <button onClick={toggleCartVisibility} className='view-cart-button'>
        {showCart ? 'Hide Cart' : 'View Cart'} {cartList.length}
      </button>
    </div>
  );
};

export default Products;
