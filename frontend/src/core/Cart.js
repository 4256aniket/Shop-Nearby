import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadCart } from "./helper/cartHelper";
import Payment from "./Payment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <div className="grid grid-cols-1 text-center gap-5">
          {products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                addtoCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
              />
            );
          })}
        </div>
      </div>
    );
  };

  

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="flex items-center justify-center md:items-start flex-col md:flex-row">
        <div className="w-2/3 md:w-2/3">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products in Cart</h3>
          )}
        </div>
        
        <div className=" w-2/3 md:w-1/3 mt-4">
          <div className=" max-w-[400px]">
            <Payment products={products} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;