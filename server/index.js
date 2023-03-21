'use strict';

const express = require('express');
const morgan = require('morgan');

const PORT = 4000;

const {getItems} = require("./handlers/getItems")
const {getItem} = require("./handlers/getItem")
const {getCompanies} = require("./handlers/getCompanies")
const {getCompany} = require("./handlers/getCompany")
const {getCompanyItems} = require("./handlers/getCompanyItems")
const {getCart} = require("./handlers/getCart")
const {addToCart} = require("./handlers/addToCart")
const {addToBoughtItems} = require("./handlers/addToBoughtItems")
const {updateCart} = require("./handlers/updateCart")
const {deleteCartItem} = require("./handlers/deleteCartItem")

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get("/api/get-items", getItems)
  .get("/api/get-item/:item", getItem)
  .get("/api/get-companies", getCompanies)
  .get("/api/get-company/:company", getCompany)
  .get("/api/get-company-items/:company", getCompanyItems)
  .get("/api/get-cart/:useremail", getCart)

  .post("/api/add-to-cart", addToCart)
  .post("/api/add-to-bought-items", addToBoughtItems)

  .patch("/api/update-cart", updateCart)

  .delete("/api/delete-cart-item", deleteCartItem)
  
  
  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
