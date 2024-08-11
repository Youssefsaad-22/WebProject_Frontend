const express = require('express');
const router = express.Router();
const productcontroller = require('../controllers/productcontroller');
const productModel=require('../models/productmodel');
const domainName = 'dxx24bpv-8080.uks1.devtunnels.ms';
var moment = require('moment'); //al time stamp handlation wii al format fal ejs
var methodOverride = require('method-override')//dah 3ashn al delete man al database
const multer = require("multer");

const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original filename
  },
});
const upload = multer({ storage });
// ...

  //display al products fal table get products
  router.get('/admin',productController.getProducts);
    
  
  //create
  router.post("/Web Development/project/views/admin.ejs", upload.single("images") , productController.createProduct);
  
 
  router.delete("/deletee/:id",productController.deleteProduct);
  
  
  //get data to the edit page
  router.get('/adminedit/:id',productController.moveProducttoedit);
  
  
  // update fal database
  router.put("/updateProduct/:id",productController.updateProduct);

module.exports = router;
