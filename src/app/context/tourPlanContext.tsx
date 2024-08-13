"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "@/src/lib/utils";

const PlannedTourContext = createContext<{
  tourPlans: any[];
  loading: boolean;
  fetchTourPlans: () => void;
  createTourPlan: (tourPlanData: any) => Promise<void>; // Fixed type definition
}>({
  tourPlans: [],
  loading: true,
  fetchTourPlans: () => {},
  createTourPlan: async () => {}, // Default implementation of createTourPlan
});

export const PlannedTourProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tourPlans, setTourPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTourPlans = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/plans/tourPlans");
      setTourPlans(data.tourPlans);
    } catch (error) {
      console.error("Error fetching tour plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTourPlan = async (tourPlanData: any) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/plans/tourPlans",
        tourPlanData
      );
      setTourPlans([...tourPlans, data.tourPlan]);
    } catch (error) {
      console.error("Error creating tour plan:", error);
    }
  };

  useEffect(() => {
    fetchTourPlans();
  }, []);

  return (
    <PlannedTourContext.Provider
      value={{ tourPlans, loading, fetchTourPlans, createTourPlan }}
    >
      {children}
    </PlannedTourContext.Provider>
  );
};

export const usePlannedTours = () => useContext(PlannedTourContext);
