import React from "react";
import SUCCESSIMAGE from "../assest/paysuccess2.gif";
import { Link } from "react-router-dom";

const Success = () => {
   return (
      <div
         className=" w-full max-w-md mx-auto flex flex-col justify-center items-center m-2 rounded"
         style={{ backgroundColor: "rgb(236, 235, 239)" }}>
         <img src={SUCCESSIMAGE} alt="Payment Success" width={150} height={150} />
         <p className="text-green-600 font-bold text-xl ">Payment Successfully</p>
         <Link
            to={"/order"}
            className="p-2 px-3 m-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white ">
            See Order
         </Link>
      </div>
   );
};

export default Success;
