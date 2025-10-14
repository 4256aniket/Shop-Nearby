import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { API } from "../backend";
import Card from "./Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import { useContext } from "react";
import { loadCart } from "./helper/cartHelper";
import CartContext from "../context/cartContext";

const Shop = () => {
  const [prods, setProds] = useState([]);
  const [filteredProducts, setfilterProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const a = useContext(CartContext);

  useEffect(() => {
    const data =  loadCart();
    const len = data?.length;
    a.setState(len);
  }, []);
  const dispatch = useDispatch();
  const products = useSelector((state) => state);

  function filterData(searchQuery, products) {
    const data = prods.filter((product) => {
      return product.name.toLowerCase()?.includes(searchQuery.toLowerCase());
    });
    return data;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredData = filterData(searchQuery, products);
    setfilterProducts(filteredData);
    // console.log("printing filterd data ", filteredData);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const loadAllProducts = () => {
  //   getProducts().then((data) => {
  //     if (data.error) {
  //       setError(data.error);
  //     } else {
  //       setProducts(data);
  //       setfilterProducts(data);
  //     }
  //   });
  // };

  const getProducts = async () => {
    const response = await axios
      .get(`${API}/products`)
      .catch((err) => console.log(err));

    console.log("DATA ", response.data);
    dispatch(setProducts(response.data));
    setProds(response.data);
    setfilterProducts(response.data);
  };

  useEffect(() => {
    getProducts();
    console.log("Products ", products);
  }, []);

  return (
    <Base>
      <div className="flex flex-col items-center">
        {/* search bar */}
        <form onSubmit={handleSubmit}>
          <div className="flex items-center text-black gap-2">
            <input
              className=" py-3 px-4 text-sm w-[400px] rounded-md "
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleChange}
            />
            <button
              className="w-[100px] mx-auto my-5 sm:m-5 px-4 py-2 text-white bg-[#05445E] text-md font-semibold rounded-md hover:bg-[#189AB4] "
              type="submit"
            >
              Search
            </button>
          </div>
        </form>

        {/* cards */}
        <div className="flex justify-center p-4 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => {
              return <Card key={index} product={product} />;
            })}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Shop;