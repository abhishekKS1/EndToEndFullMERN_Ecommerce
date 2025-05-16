import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import SummaryApi from "../common"; //fixing addtocartbutton ui

const HorizontalCardProduct = ({ category, heading }) => {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const loadingList = new Array(13).fill(null);

   const [addedToCartSuccess, setAddedToCartSuccess] = useState([]);
   const currentCart = async () => {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
         method: SummaryApi.addToCartProductView.method,
         credentials: "include",
         headers: {
            "content-type": "application/json",
         },
      });
      const responseData = await response.json();

      const cartIdsArray = responseData?.data?.map((item) => item.productId._id);

      console.log("cartIdsArray", cartIdsArray);
      setAddedToCartSuccess((prev) => [...prev, ...(cartIdsArray || [])]);
   }; // fixing addtocartbutton ui

   const [scroll, setScroll] = useState(0);
   const scrollElement = useRef();

   const { fetchUserAddToCart } = useContext(Context);

   const handleAddToCart = async (e, id) => {
      try {
         const addRes = await addToCart(e, id);
         console.log("add to cart response", addRes.data);
         console.log("addedToCartSuccess", addedToCartSuccess);
         if (addRes?.data.productId) {
            setAddedToCartSuccess((prev) => [...prev, addRes?.data?.productId]);
         } // fixing addtocartbutton ui

         fetchUserAddToCart();
      } catch (error) {
         console.log("error in add to cart", error);
      }
   };

   const fetchData = async () => {
      setLoading(true);
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setLoading(false);

      // console.log("horizontal data",categoryProduct.data)
      setData(categoryProduct?.data);
   };

   useEffect(() => {
      fetchData();

      try {
         currentCart();
      } catch (error) {
         console.log("error in fetching data", error);
      } // fixing addtocartbutton ui
   }, []);

   const scrollRight = () => {
      scrollElement.current.scrollLeft += 300;
   };
   const scrollLeft = () => {
      scrollElement.current.scrollLeft -= 300;
   };

   return (
      <div className="container mx-auto px-4 my-6 relative">
         <h2 className="text-2xl font-semibold py-4">{heading}</h2>

         <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" ref={scrollElement}>
            <button className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block" onClick={scrollLeft}>
               <FaAngleLeft />
            </button>
            <button className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block" onClick={scrollRight}>
               <FaAngleRight />
            </button>

            {loading
               ? loadingList.map((product, index) => {
                    return (
                       <div
                          key={index}
                          className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                          <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                          <div className="p-4 grid w-full gap-2">
                             <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                             <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                             <div className="flex gap-3 w-full">
                                <p className="text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                                <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                             </div>
                             <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                          </div>
                       </div>
                    );
                 })
               : data.map((product, index) => {
                    return (
                       <Link
                          key={index}
                          to={"product/" + product?._id}
                          className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                          <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                             <img src={product.productImage[0]} className="object-scale-down h-full hover:scale-110 transition-all" />
                          </div>
                          <div className="p-4 grid">
                             <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                                {product?.productName}
                             </h2>
                             <p className="capitalize text-slate-500">{product?.category}</p>
                             <div className="flex gap-3">
                                <p className="text-red-600 font-medium">{displayINRCurrency(product?.sellingPrice)}</p>
                                <p className="text-slate-500 line-through">{displayINRCurrency(product?.price)}</p>
                             </div>
                             <button
                                className="text-sm bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600  text-white px-3 py-0.5 rounded-full"
                                onClick={(e) => handleAddToCart(e, product?._id)}>
                                {addedToCartSuccess.includes(product?._id) ? "Added" : "Add to Cart"}
                                {/* fixing addtocartbutton ui */}{" "}
                             </button>
                          </div>
                       </Link>
                    );
                 })}
         </div>
      </div>
   );
};

export default HorizontalCardProduct;
