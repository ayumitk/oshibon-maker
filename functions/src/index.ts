import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// import express
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Amazon Search
app.get("/amazon/:keyword", (req: any, res: any) => {
  // Amazon Product Advertising API v5.0
  const amazonPaapi = require("amazon-paapi");

  const commonParameters = {
    AccessKey: functions.config().amazon.access_key,
    SecretKey: functions.config().amazon.secret_key,
    PartnerTag: "ayutak04-22", // Your tag
    PartnerType: "Associates", // Default value is Associates.
    Marketplace: "www.amazon.co.jp", // Default value is US. Note: Host and Region are predetermined based on the marketplace value. There is no need for you to add Host and Region as soon as you specify the correct Marketplace value. If your region is not US or .com, please make sure you add the correct Marketplace value.
  };

  const requestParameters = {
    Keywords: req.params.keyword,
    SearchIndex: "Books",
    ItemCount: 2,
    Resources: [
      "Images.Primary.Medium",
      "ItemInfo.Title",
      "Offers.Listings.Price",
    ],
  };

  amazonPaapi
    .SearchItems(commonParameters, requestParameters)
    .then((data: any) => {
      res.send(data);
    })
    .catch((error: any) => {
      res.send(error);
    });
});

// Create OGP image
// const createOgpImage = require("./createOgpImage");
// app.get("/ogp", (req: any, res: any) => {
//   createOgpImage();
//   res.send("ogp");
// });

// export
const api = functions.https.onRequest(app);
module.exports = { api };
