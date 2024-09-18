"use client";
import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaInfoCircle } from "react-icons/fa";
import axiosInstance from "@/src/lib/utils";

declare global {
  interface Window {
    paypal: any; // Or a more specific type if available
  }
}
// type CheckoutSummaryProps = {
//   summary: {
//     location: string;
//     startDate: string;
//     endDate: string;
//     adults: number;
//     children: number;
//     infants: number;
//     pets: number;
//     tourGuide: string;
//     tripCost: number;
//     tax: number;
//     duration: string;
//     totalCost: number;
//   };
// };

const Page = ({ params }: { params: { id: string } }) => {
  const tourPlanId = params.id;
  const [tourPlan, setTourPlan] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTourPlan = async () => {
      console.log(tourPlanId);
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/plans/tourPlanById/${tourPlanId}`
        );
        setTourPlan(response.data.tourPlan);
        console.log(response.data.tourPlan);
      } catch (error) {
        console.error("Error fetching tour plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourPlan();
  }, [params]);

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

  //   useEffect(() => {
  //     setLoading(true);
  //     const planData = localStorage.getItem("currentTourPlan");
  //     console.log(planData);
  //     if (planData) {
  //       setTourPlan(JSON.parse(planData));
  //     }
  //     setLoading(false);
  //   }, []);
  return (
    <div className="bg-white w-full h-full md:w-fit flex flex-col justify-start mx-auto items-center p-4">
      <h2 className="text-[2.35rem] text-center font-bold text-gray-800 mb--2">
        Checkout
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        tourPlan && ( // Removed extra curly braces and parentheses
          <div className="w-full h-full flex flex-col items-start justify-start lg:px-[2.75rem]">
            <div className="w-full px-[2.85rem] lg:px-[3.75rem] h-full flex flex-col items-start justify-start rounded-md bg-yellow-50 p-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <FaInfoCircle className="w-5 h-5 text-yellow-400" />
                <p className="text-lg font-semibold text-yellow-800">
                  Fee Breakdown
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2">
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

            <div className="w-full bg-white shadow-md rounded-2xl p-[2rem] mt-[1.25rem] mb-[2.35rem] border-[0.5px] border-gray-400">
              <div className="w-full grid gap-1 mb-4">
                <h1 className="w-full font-bold text-gray-800 mb-1">Summary</h1>
                <div className="w-full flex justify-between items-center mb-2">
                  <p className="font-light text-teal-800">Location</p>
                  <p className="font-semibold text-teal-900">
                    {tourPlan?.location}
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
                    {tourPlan.startDate &&
                      new Date(tourPlan.startDate).toLocaleDateString("en-US", {
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
              </div>
              <div className="font-semibold text-gray-800 mb-[2rem]">
                <h1 className="w-full font-bold text-gray-800 mb-1">
                  Price Details
                </h1>
                {/* <p>Trip: ${tourPlan.tripCost} USD</p> */}
                {/* <p>Tax: ${tourPlan.tax} USD</p> */}
                {/* <p>Duration: {tourPlan.duration}</p> */}
                {/* <p className="text-xl">Total: ${tourPlan.totalCost} USD</p> */}
              </div>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AVwQU-8TNph39dbHeSzGGM1lCJo7rqHu4kL1leL30Mc_8dlluT6zxeTkAx5Lt3f6alAtcch2rAoa2T6d",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE", // or "AUTHORIZE" depending on your needs
                      purchase_units: [
                        {
                          amount: {
                            // Add currency_code here
                            currency_code: "USD", // Specify the currency
                            value: tourPlan.totalCost.toString(), // Convert to string
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    // Check if actions.order is defined
                    if (actions.order) {
                      return actions.order.capture().then((details) => {
                        // Handle the capture response
                        console.log(details);
                        // Redirect to a success page or display a success message
                      });
                    } else {
                      // Handle the case where actions.order is undefined
                      console.error("Error: actions.order is undefined");
                      // Return a rejected promise to maintain consistent return type
                      return Promise.reject(
                        new Error("actions.order is undefined")
                      );
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        )
      )}
      {/* <div className="grid gap-1 mb-4">
        <p>Location: {tourPlan.location}</p>
        <p>Start Date: {tourPlan.startDate}</p>
        <p>End Date: {tourPlan.endDate}</p>
        <p>Adults: {tourPlan.adults}</p>
        <p>Children: {tourPlan.children}</p>
        <p>Infants: {tourPlan.infants}</p>
        <p>Pets: {tourPlan.pets}</p>
        <p>Tour Guide: {tourPlan.tourGuide}</p>
      </div>
      <div className="font-semibold text-gray-800">
        <p>Price Details</p>
        <p>Trip: ${tourPlan.tripCost} USD</p>
        <p>Tax: ${tourPlan.tax} USD</p>
        <p>Duration: {tourPlan.duration}</p>
        <p className="text-xl">Total: ${tourPlan.totalCost} USD</p>
      </div>
      <button className="w-full bg-orange-500 text-white rounded-lg py-2 mt-4 hover:bg-orange-600">
        PAY WITH PAYPAL
      </button> */}
    </div>
  );
};

export default Page;
