import React from "react";
import CANCELIMAGE from "../assest/payerror.webp";
import { Link } from "react-router-dom";

const Cancel = () => {
   return (
      <div
         className=" w-full max-w-md mx-auto flex flex-col justify-center items-center m-2 rounded"
         style={{ backgroundColor: "rgb(236, 235, 239)" }}>
         <img className="mix-blend-multiply " src={CANCELIMAGE} alt="Payment Success" width={150} height={150} />
         <p className="text-red-600 font-bold text-xl ">Payment Cancel</p>
         <Link
            to={"/cart"}
            className="p-2 px-3 m-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white ">
            Go To Cart
         </Link>
      </div>
   );
};

export default Cancel;
