"use client";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaInfoCircle } from "react-icons/fa";
import axiosInstance from "@/src/lib/utils";
import LoadingScreen from "../../Components/Loader";
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../../context/UserContex";
import { usePlannedTours } from "../../context/tourPlanContext";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};
declare global {
  interface Window {
    paypal: any; // Or a more specific type if available
  }
}

interface planTour {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  selectedLocal: string;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  guidePreference: number;
  paymentStatus: string;
}

const postMessage = (message: string) => {
  if (typeof window !== "undefined") {
    window.parent.postMessage(message, serverUrl);
  }
};

const serverUrl = "http://localhost:5000";
// const serverUrl = "https://jadoreivc-backend.vercel.app";

const initialOptions = {
  clientId:
    "AVwQU-8TNph39dbHeSzGGM1lCJo7rqHu4kL1leL30Mc_8dlluT6zxeTkAx5Lt3f6alAtcch2rAoa2T6d",
  currency: "USD",
  intent: "capture",
};

const Page = ({ params }: { params: { id: string } }) => {
  const { user, loading } = useContext(UserContext);
  const { sendMail } = usePlannedTours();
  const tourPlanId = params.id;
  const [tourPlan, setTourPlan] = useState<any>();
  const [cloading, setcLoading] = useState(false);

  const fetchTourPlan = async () => {
    setcLoading(true);
    try {
      const response = await axiosInstance.get(
        `/api/plans/tourPlanById/${tourPlanId}`
      );
      setTourPlan(response.data.tourPlan);
      // console.log(response.data.tourPlan);
    } catch (error) {
      console.error("Error fetching tour plan:", error);
    } finally {
      setcLoading(false);
    }
  };
  useEffect(() => {
    fetchTourPlan();
  }, []);

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

  const startTimestamp = tourPlan?.startDate
    ? new Date(tourPlan.startDate).getTime()
    : 0;
  const endTimestamp = tourPlan?.endDate
    ? new Date(tourPlan.endDate).getTime()
    : 0;
  const durationInMilliseconds = endTimestamp - startTimestamp;
  const durationInDays = Math.round(
    durationInMilliseconds / (1000 * 60 * 60 * 24)
  );
  const noOfHours = durationInDays * 8;
  const adultCost = tourPlan?.guidePreference * noOfHours;
  const childCost = tourPlan?.guidePreference * noOfHours * 0.6;
  const InfantCost = tourPlan?.guidePreference * noOfHours * 0.2;
  const PetCost = tourPlan?.guidePreference * noOfHours * 0.15;
  const totalCost = adultCost + childCost + InfantCost + PetCost;

  // console.log(tourPlan.paymentStatus);
  let [paymentStatus, setPaymentStatus] = useState<any>(
    `${tourPlan?.paymentStatus}`
  );
  const [transactionDetails, setTransactionDetails] = useState<any>(null);

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.origin === serverUrl) {
        try {
          const message = JSON.parse(event.data);
          console.log("Message received:", message);

          if (message.status === "success" && message.transaction) {
            setPaymentStatus("success");
            setTransactionDetails(message.transaction);
          } else if (message.status === "error") {
            setPaymentStatus("error");
            console.error("Payment error:", message.error);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="bg-white w-full h-full flex flex-col justify-start mx-auto items-center p-4">
      <h2 className="text-[2.35rem] text-center font-bold text-gray-800 mb--2">
        Checkout
      </h2>
      {cloading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingScreen />
        </div>
      ) : (
        tourPlan && ( // Removed extra curly braces and parentheses
          <div className="w-full lg:w-[45%] h-full flex flex-col items-start justify-start lg:px-[2.75rem]">
            <div className="w-full px-[2.85rem] lg:px-[3.75rem] h-full flex flex-col items-start justify-start rounded-md bg-yellow-50 p-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <FaInfoCircle className="w-5 h-5 text-yellow-400" />
                <p className="text-lg font-semibold text-yellow-800">
                  Fees & Time allocation Breakdown
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2">
                <li className="text-base text-gray-700 font-semibold">
                  {/* <span className="font-semibold">Child:</span> 60% of Adult Fee */}
                  8 hous per Day
                </li>
                <li className="text-base text-gray-700">
                  <span className="font-semibold">Child:</span> 60% of Adult Fee
                  per hour
                </li>
                <li className="text-base text-gray-700">
                  <span className="font-semibold">Infant:</span> 20% of Adult
                  Fee per hour
                </li>
                <li className="text-base text-gray-700">
                  <span className="font-semibold">Pet:</span> 15% of Adult Fee
                  per hour
                </li>
              </ul>
            </div>

            <div className="w-full bg-white shadow-lg rounded-2xl p-[2rem] mt-[1.25rem] mb-[2.35rem] border-[0.5px] border-gray-400">
              <p className="w-full text-center text-[1.35rem] mb-4 text-teal-900 font-semibold">
                <span className="font-normal">Payment Status:</span>{" "}
                {tourPlan?.paymentStatus}
              </p>

              <div className="w-full grid gap-1 mb-4">
                <h1 className="w-full font-bold text-gray-800 mb-1">Summary</h1>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Location</p>
                  <p className="font-semibold text-teal-900">
                    {tourPlan?.location}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">
                    Selected Guide rate
                  </p>
                  <p className="font-semibold text-teal-900">
                    ${tourPlan?.guidePreference}/hr
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Start Date</p>
                  <p className="font-semibold text-teal-900">
                    {" "}
                    {tourPlan.startDate &&
                      new Date(tourPlan.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">End Date</p>
                  <p className="font-semibold text-teal-900">
                    {tourPlan.endDate &&
                      new Date(tourPlan.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Adults</p>
                  <p className="font-semibold text-teal-900">
                    {tourPlan?.adults}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Children</p>
                  <p className="font-semibold text-teal-900">
                    {tourPlan?.children}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Infants</p>
                  <p className="font-semibold text-teal-900">
                    {tourPlan?.infants}
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Pets</p>
                  <p className="font-semibold text-teal-900">
                    {tourPlan?.pets}
                  </p>
                </div>
              </div>
              <div className="font-semibold text-gray-800 mb-[2rem]">
                <h1 className="w-full font-bold text-gray-800 mb-1">
                  Price Details
                </h1>
                {/* <p>Trip: ${tourPlan.tripCost} USD</p> */}
                {/* <p>Tax: ${tourPlan.tax} USD</p> */}
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Duration</p>
                  <p className="font-semibold text-teal-900">
                    {durationInDays} Days
                  </p>
                </div>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Total Cost</p>
                  <p className="font-semibold text-teal-900">${totalCost}</p>
                </div>
                {/* <p className="text-xl">Total: ${tourPlan.totalCost} USD</p> */}
              </div>
              <PayPalScriptProvider options={initialOptions}>
                {cloading ? (
                  <div className="w-full h-full flex justify-center gap-x-[0.5rem] items-center">
                    Loading
                    <ClipLoader
                      cssOverride={override}
                      color="green"
                      loading={cloading}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : !cloading && tourPlan?.paymentStatus === "PENDING" ? (
                  <div>
                    <PayPalButtons
                      createOrder={async () => {
                        try {
                          const response = await fetch(
                            `${serverUrl}/api/orders`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              // use the "body" param to optionally pass additional order information
                              // like product ids and quantities
                              body: JSON.stringify({
                                tourism: [
                                  {
                                    description: "Your Tour Guide cost",
                                    cost: totalCost,
                                    id: tourPlanId,
                                  },
                                ],
                              }),
                            }
                          );

                          const orderData = await response.json();

                          if (orderData.id) {
                            return orderData.id;
                          } else {
                            const errorDetail = orderData?.details?.[0];
                            const errorMessage = errorDetail
                              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                              : JSON.stringify(orderData);

                            throw new Error(errorMessage);
                          }
                        } catch (error) {
                          console.error(error);
                          postMessage(
                            `Could not initiate PayPal Checkout...${error}`
                          );
                        }
                      }}
                      onApprove={async (data, actions) => {
                        let intervalId: number | undefined;

                        try {
                          intervalId = window.setInterval(fetchTourPlan, 5000);
                          const response = await fetch(
                            `${serverUrl}/api/orders/${data.orderID}/capture`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                tourPlanId: tourPlanId,
                              }),
                            }
                          );

                          const orderData = await response.json();
                          const errorDetail = orderData?.details?.[0];

                          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            return actions.restart();
                          } else if (errorDetail) {
                            // (2) Other non-recoverable errors -> Show a failure message
                            throw new Error(
                              `${errorDetail.description} (${orderData.debug_id})`
                            );
                          } else {
                            // (3) Successful transaction -> Show confirmation or thank you message

                            const transactionId = orderData.transaction?.id;

                            if (transactionId) {
                              postMessage(
                                `Transaction successful: ${transactionId}. Thank you! Your tour Guide has been booked!, check your mail`
                              );

                              // Send email to the user
                              const sendEmail = async () => {
                                try {
                                  const response = await sendMail(
                                    user.email,
                                    "Jadoreivc Tour plan",
                                    `## Bonjour from J’ADOREIVC! 👋

Congratulations, your tour has been planned! 🎉 We're thrilled you've chosen us to guide you through this incredible experience. 

Your dedicated guide will be in touch shortly with a warm welcome, personalized itinerary, and answers to any questions you might have. 

Get ready to explore and create unforgettable memories! ✨

À bientôt,

The J’ADOREIVC Team
`
                                  );
                                } catch (err) {
                                  console.log(err);
                                }
                              };
                              sendEmail();

                              if (transactionId) {
                                postMessage(
                                  `Transaction successful: ${transactionId}. Thank you! Your tour Guide has been booked!, check your mail`
                                );
                              }

                              window.location.reload();

                              paymentStatus = "success";
                              setPaymentStatus("success");
                              setTransactionDetails({ id: transactionId });
                              console.log("Capture result", orderData);
                            } else {
                              console.error(
                                "Unexpected orderData structure:",
                                orderData
                              );
                              // Handle the unexpected data structure, maybe show a user-friendly error
                            }
                          }
                          if (intervalId !== undefined) {
                            clearInterval(intervalId);
                          }
                        } catch (error) {
                          if (intervalId !== undefined) {
                            clearInterval(intervalId);
                          }
                          console.error(error);
                          paymentStatus = "error";
                          setPaymentStatus("error");
                          setTransactionDetails(`Sorry, `);
                          postMessage(
                            `Sorry, your transaction could not be processed...${error}`
                          );
                        }
                      }}
                    />
                  </div>
                ) : !cloading && tourPlan?.paymentStatus === "COMPLETED" ? (
                  <div
                    className="bg-green-100 border flex flex-col justify-center items-center border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline w-full text-center">
                      {" "}
                      Your payment was successful, Your tour Guide has been
                      booked!, check your mail
                    </span>
                    {transactionDetails && (
                      <ul>
                        <li>Transaction ID: {transactionDetails.id}</li>
                        {/* ... display other transaction details ... */}
                      </ul>
                    )}
                  </div>
                ) : !cloading && tourPlan?.paymentStatus === "FAILED" ? (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">
                      {" "}
                      There was an error processing your payment. Please try
                      again.{" "}
                    </span>
                  </div>
                ) : null}
              </PayPalScriptProvider>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Page;
