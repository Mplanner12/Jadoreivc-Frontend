"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "@/src/lib/utils";

const PlannedTourContext = createContext<{
  tourPlans: any[];
  plansLoading: boolean;
  fetchTourPlans: () => void;
  createTourPlan: (tourPlanData: any) => Promise<void>;
  fetchTourPlanById: (id: string) => Promise<void>;
}>({
  tourPlans: [],
  plansLoading: true,
  fetchTourPlans: () => {},
  createTourPlan: async () => {},
  fetchTourPlanById: async () => {},
});

export const PlannedTourProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tourPlans, setTourPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);

  const fetchTourPlans = async () => {
    setPlansLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/plans/tourPlans");
      setTourPlans(data.tourPlans);
    } catch (error) {
      console.error("Error fetching tour plans:", error);
    } finally {
      setPlansLoading(false);
    }
  };

  const fetchTourPlanById = async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/api/plans/tourPlans/${id}`);
      return data.tourPlan;
    } catch (error) {
      console.error("Error fetching tour plan:", error);
    }
  };

  const createTourPlan = async (tourPlanData: any): Promise<any> => {
    try {
      const { data } = await axiosInstance.post(
        "/api/plans/tourPlans",
        tourPlanData
      );
      return data.tourPlan.id; // Return the created tour plan
      // setTourPlans([...tourPlans, data.tourPlan]);
    } catch (error) {
      console.error("Error creating tour plan:", error);
    }
    // try {
    //   const response = await axiosInstance.post("/api/tourPlans", tourPlanData);
    //   // ... other logic ...
    //   return response.data; // Return the created tour plan object
    // } catch (error) {
    //   // ... error handling ...
    // }
  };

  useEffect(() => {
    fetchTourPlans();
  }, []);

  return (
    <PlannedTourContext.Provider
      value={{
        tourPlans,
        plansLoading,
        fetchTourPlans,
        fetchTourPlanById,
        createTourPlan,
      }}
    >
      {children}
    </PlannedTourContext.Provider>
  );
};

export const usePlannedTours = () => useContext(PlannedTourContext);
