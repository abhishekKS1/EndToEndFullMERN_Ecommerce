import React from "react";
import CANCELIMAGE from "../assest/payerror.webp";
import { Link } from "react-router-dom";
import { TbShoppingCartCancel } from "react-icons/tb";

const Cancel = () => {
   return (
      <div className=" w-full max-w-md mx-auto flex flex-col justify-center items-center m-2 rounded">
         {/* <img className="mix-blend-multiply " src={CANCELIMAGE} alt="Payment Success" width={150} height={150} /> */}
         <div className="flex gap-4 items-center justify-center mt-40">
            <TbShoppingCartCancel size={55} className="text-red-600" />
            <p className="text-red-600 font-bold text-xl ">Purchase Incomplete!!</p>
         </div>
         <Link
            to={"/cart"}
            className="p-2 px-3 mt-36  border-2 mb-36 border-red-600 rounded font-semibold text-red-600 hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 hover:text-white ">
            Go To Cart
         </Link>
      </div>
   );
};

export default Cancel;
