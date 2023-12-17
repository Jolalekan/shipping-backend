const express = require("express");
const router = express.Router()
const shippingController = require("../controller/shippingController.js")
const trackingController = require("../controller/trackingController.js")
const adminController = require("../controller/adminController")
const { authorize } = require("../utils/verify.js")

router.post("/register", adminController.registerAdmin)

router.post("/login", adminController.adminLogin)

router.post("/tracking", authorize, shippingController.submitShipping)

router.get("/trackinglist", shippingController.shipList)

router.get("/tracking", trackingController.trackingLogin)

router.get("/tracking/:trackingNumber", trackingController.trackGoods)

router.put("/tracking/:trackingNumber", trackingController.editTrackingInfo)

router.delete("/tracking/:trackingNumber", trackingController.deletingTracking)

module.exports = router
