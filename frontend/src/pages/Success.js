import React from "react";
import SUCCESSIMAGE from "../assest/paysuccess2.gif";
import { IoMdCheckmark } from "react-icons/io";
import { Link } from "react-router-dom";

const Success = () => {
   return (
      <div className=" w-full max-w-md mx-auto flex flex-col gap-7 justify-center items-center m-2 rounded">
         {/* <img src={SUCCESSIMAGE} alt="Payment Success" width={150} height={150} /> */}
         <IoMdCheckmark className="mt-24 bg-green-600 text-white p-4 rounded-full text-7xl" />
         <p className="text-green-600 font-bold text-xl  ">Payment Successfull</p>
         <Link
            to={"/order"}
            className="p-2 px-3 m-5 mt-20 mb-44 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white ">
            See Order
         </Link>
      </div>
   );
};

export default Success;
