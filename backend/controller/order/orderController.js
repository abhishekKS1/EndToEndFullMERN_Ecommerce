const orderModel = require("../../models/orderProductModel");

const orderController = async (req, res) => {
   try {
      const currentUserId = req.userId;

      const orderList = await orderModel.find({ userId: currentUserId }).sort({ createdAt: -1 });

      res.json({
         message: "All Order List",
         data: orderList,
         success: true,
      });
   } catch (error) {
      res.status(500).json({
         message: error.message || error,
         error: true,
         success: false,
      });
   }
};

module.exports = orderController;
