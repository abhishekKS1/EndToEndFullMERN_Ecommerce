const orderModel = require("../../models/orderProductModel");
const userModel = require("../../models/userModel");

const allOrderController = async (req, res) => {
   const userId = req.userId;

   const user = await userModel.findById(userId);

   if (user.role !== "ADMIN") {
      return res.status(403).json({
         success: false,
         message: "only ADMIN's are authorized to perform this action",
      });
   }

   const allOrder = await orderModel.find().sort({ createdAt: -1 });

   return res.status(200).json({
      success: true,
      message: "All Order List",
      data: allOrder,
   });
};
module.exports = allOrderController;
