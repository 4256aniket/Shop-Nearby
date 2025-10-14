import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "./Card";
import Card_V from "./Card Vertical";
import { getProducts } from "./helper/coreapicalls";
import Carousel from "../component/Carousel";
import headphoneAd from "../../assets/headphoneGirlAd2.png";
import iphoneAd from "../../assets/iphoneAd2.png";
import onePlusAd from "../../assets/onePlusAd.png";
import { useContext } from "react";
import { loadCart } from "./helper/cartHelper";
import CartContext from "../context/cartContext";

const slides = [headphoneAd, iphoneAd, onePlusAd];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const a = useContext(CartContext);

  useEffect(() => {
    const data = loadCart();
    const len = data?.length;
    a.setState(len);
  }, []);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else if (data) {
        setProducts(data);
        setfilterProducts(data);
      }
    }).catch(err => {
      setError("Failed to load products");
    });
  };
  
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setfilterProducts(filtered);
  };
  
  const getCategories = async() => {
    const cat = await axios.get(`${API}/categories`);
    setCategories(cat.data);
  };

  useEffect(() => {
    loadAllProducts();
    getCategories();
    console.log(products);
    console.log("CATEGORIES, ", categories);
    console.log("api",API);
  }, []);

  // Filter products by category first, then map them
  const getProductsByCategory = (categoryName) => {
    return filteredProducts
      .filter(product => product.category && product.category.name === categoryName)
      .map(product => <Card_V key={product._id} product={product} />);
  };

  return (
    <Base>
      <div className="flex flex-col items-center">
        {/* ad images  */}
        <div className="w-full md:w-[90%] max-h-[600px] flex flex-center py-4 sm:px-4">
          <Carousel>
            {slides.map((i, index) => (
              <img src={i} key={index} alt="slideImage" />
            ))}
          </Carousel>
        </div>

        {/* Smart Phone Section */}
        <div className="w-full md:w-[90%] mx-auto">
          <div className="ml-4 mb-2">
            <span className="inline-block px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black shadow-none hover:shadow-2xl">
              <h1 className="text-black font-bold">Smart Phone</h1>
            </span>
          </div>

          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth py-4">
            {getProductsByCategory("Phone")}
          </div>
        </div>

        {/* Laptop Section */}
        <div className="w-full md:w-[90%] mx-auto">
          <div className="ml-4 mb-2">
            <span className="inline-block px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black shadow-none hover:shadow-2xl">
              <h1 className="text-black font-bold">Laptop</h1>
            </span>
          </div>

          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth py-4">
            {getProductsByCategory("Laptop")}
          </div>
        </div>

        {/* Smart Watch Section */}
        <div className="w-full md:w-[90%] mx-auto">
          <div className="ml-4 mb-2">
            <span className="inline-block px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black shadow-none hover:shadow-2xl">
              <h1 className="text-black font-bold">Smart Watch</h1>
            </span>
          </div>

          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth py-4">
            {getProductsByCategory("smart watch")}
          </div>
        </div>

        {/* Recently Viewed Section */}
        <div className="w-full md:w-[90%] mx-auto">
          <div className="ml-4 mb-2">
            <span className="inline-block px-4 py-2 text-xl bg-white border rounded-lg dark:bg-white dark:border-gray-300 dark:text-black shadow-none hover:shadow-2xl">
              <h1 className="text-black font-bold">Recently Viewed</h1>
            </span>
          </div>

          <div className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth py-4">
            {filteredProducts.map(product => (
              <Card_V key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;