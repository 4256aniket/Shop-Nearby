import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { loadCart } from "./helper/cartHelper";
import CartContext from "../context/cartContext";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const a = useContext(CartContext);

  const addToCart = () => {
    toast.success("Item Added to Cart!");
    addItemToCart(product, () => {
      setRedirect(true);
      a.setState(a.state + 1);
    });
  };

  const showAddToCart = () => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add to cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
            const data = loadCart();
            a.setState(data?.length);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="flex flex-col min-w-[250px] max-w-[250px] bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black shadow-none  hover:shadow-2xl">
      <div className="flex items-center justify-center h-[185px] mt-4">
        <Link to={`/products/${product._id}`}>
          <ImageHelper product={product} />
        </Link>
      </div>
      <div className="mx-auto mb-5">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-black">
          {product.name}
        </h5>
      </div>

      {/* <div className="px-8 pb-5 mt-auto"> */}
        {/* {getRedirect()} */}
        {/* <div className="flex items-center justify-between mt-3"> */}
          {/* <span className="text-lg font-bold text-gray-900 dark:text-black"> */}
            {/* ₹{product.price} */}
          {/* </span> */}
          {/* {showAddToCart()} */}
          {/* {showRemoveFromCart()} */}
        {/* </div> */}
        
      {/* </div> */}
    </div>
  );
};

export default Card;
