const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
   try {
      const productCategory = await productModel.distinct("category");

      // console.log("category",productCategory)

      //array to store one product from each category
      const productByCategory = [];

      for (const category of productCategory) {
         const product = await productModel.findOne({ category });

         if (product) {
            productByCategory.push(product);
         }
      }

      res.json({
         message: "array of 1-1 product document from each distinct categories",
         data: productByCategory,
         success: true,
         error: false,
      });
   } catch (err) {
      res.status(500).json({
         message: err.message || err,
         error: true,
         success: false,
      });
   }
};

module.exports = getCategoryProduct;
