const express = require( "express");

const { getAllProducts, getAllProuctsTesting } = require ("../controllers/products");

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/testing').get(getAllProuctsTesting);

module.exports =  router;