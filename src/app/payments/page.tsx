"use client";
import Script from "next/script";
import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

declare global {
  interface Window {
    paypal: any; // Or a more specific type if available
  }
}

const PaymentPage = () => {
  const addPayPalScript = () => {
    if (typeof window !== "undefined" && !window.paypal) {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AVwQU-8TNph39dbHeSzGGM1lCJo7rqHu4kL1leL30Mc_8dlluT6zxeTkAx5Lt3f6alAtcch2rAoa2T6d&currency=USD";
      script.async = true;
      document.body.appendChild(script);
    }
  };
  useEffect(() => {
    addPayPalScript();
  }, []);

  // const [orderID, setOrderID] = useState("");
  // const [transactionID, setTransactionID] = useState("");
  // const [transactionStatus, setTransactionStatus] = useState("");
  // const [transactionAmount, setTransactionAmount] = useState("");
  // const [transactionCurrency, setTransactionCurrency] = useState("");
  // const [transactionTime, setTransactionTime] = useState("");
  // const [transactionPayerEmail, setTransactionPayerEmail] = useState("");
  // const [transactionPayerName, setTransactionPayerName] = useState("");
  // const [transactionPayerID, setTransactionPayerID] = useState("");
  // const [transactionPayerCountry, setTransactionPayerCountry] = useState("");
  // const [transactionPayerPhone, setTransactionPayerPhone] = useState("");
  // const [transactionPayerAddress, setTransactionPayerAddress] = useState("");
  // const [transactionPayerShippingAddress, setTransactionPayerShippingAddress] = useState("");
  // const [transactionPayerBillingAddress, setTransactionPayerBillingAddress] = useState("");
  // const [transactionPayerShippingName, setTransactionPayerShippingName] = useState("");
  // const [transactionPayerShippingPhone, setTransactionPayerShippingPhone] = useState("");
  // const [transactionPayerShippingEmail, setTransactionPayerShippingEmail] = useState("");
  // const [transactionPayerBillingName, setTransactionPayerBillingName] = useState("");
  // const [transactionPayerBillingPhone, setTransactionPayerBillingPhone] = useState("");
  // const [transactionPayerBillingEmail, setTransactionPayerBillingEmail] = useState("");
  // const [transactionPayerShippingCountry, setTransactionPayerShippingCountry] = useState("");
  //

  //   useEffect(() => {
  //     if (typeof window !== "undefined" && window.paypal) {
  //       // PayPal script is loaded, you can use window.paypal now
  //       window.paypal
  //         .Buttons({
  //           async createOrder() {
  //             try {
  //               const response = await fetch("/api/orders", {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //                 // use the "body" param to optionally pass additional order information
  //                 // like product ids and quantities
  //                 body: JSON.stringify({
  //                   cart: [
  //                     {
  //                       id: "YOUR_PRODUCT_ID",
  //                       quantity: "YOUR_PRODUCT_QUANTITY",
  //                     },
  //                   ],
  //                 }),
  //               });

  //               const orderData = await response.json();

  //               if (orderData.id) {
  //                 return orderData.id;
  //               } else {
  //                 const errorDetail = orderData?.details?.[0];
  //                 const errorMessage = errorDetail
  //                   ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
  //                   : JSON.stringify(orderData);

  //                 throw new Error(errorMessage);
  //               }
  //             } catch (error) {
  //               console.error(error);
  //               resultMessage(
  //                 `Could not initiate PayPal Checkout...<br><br>${error}`
  //               );
  //             }
  //           },
  //           async onApprove(
  //             data: { orderID: any },
  //             actions: { restart: () => any }
  //           ) {
  //             try {
  //               const response = await fetch(
  //                 `/api/orders/${data.orderID}/capture`,
  //                 {
  //                   method: "POST",
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                   },
  //                 }
  //               );

  //               const orderData = await response.json();
  //               // Three cases to handle:
  //               //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
  //               //   (2) Other non-recoverable errors -> Show a failure message
  //               //   (3) Successful transaction -> Show confirmation or thank you message

  //               const errorDetail = orderData?.details?.[0];

  //               if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
  //                 // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
  //                 // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
  //                 return actions.restart();
  //               } else if (errorDetail) {
  //                 // (2) Other non-recoverable errors -> Show a failure message
  //                 throw new Error(
  //                   `${errorDetail.description} (${orderData.debug_id})`
  //                 );
  //               } else if (!orderData.purchase_units) {
  //                 throw new Error(JSON.stringify(orderData));
  //               } else {
  //                 // (3) Successful transaction -> Show confirmation or thank you message
  //                 // Or go to another URL:  actions.redirect('thank_you.html');
  //                 const transaction =
  //                   orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
  //                   orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
  //                 resultMessage(
  //                   `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
  //                 );
  //                 console.log(
  //                   "Capture result",
  //                   orderData,
  //                   JSON.stringify(orderData, null, 2)
  //                 );
  //               }
  //             } catch (error) {
  //               console.error(error);
  //               resultMessage(
  //                 `Sorry, your transaction could not be processed...<br><br>${error}`
  //               );
  //             }
  //           },
  //         })
  //         .render("#paypal-button-container");
  //     }
  //   }, []);

  return (
    <div>
      <div id="paypal-button-container"></div>
      <p id="result-message"></p>
      <div id="paypal-button-container"></div>
    </div>
  );
};

export default PaymentPage;

// function resultMessage(message: string) {
//   const container = document.querySelector("#result-message");

//   // Check if container is not null before using it
//   if (container) {
//     container.innerHTML = message;
//   } else {
//     // Handle the case where the container is not found
//     console.error("Element with ID 'result-message' not found.");
//     // You might want to display an error message to the user or use an alternative way to show the message.
//   }
// }
