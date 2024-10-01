"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "@/src/lib/utils";

interface User {
  id: string;
  fullName: string;
  address: string;
  email: string;
  password: string;
  userType: string;
  languages: string[];
  image: string;
  createdAt: string;
  updatedAt: string;
}
interface TourGuide {
  id: string;
  userId: string;
  location: string;
  offerRange: number;
  aboutMe: string;
  motto: string;
  thingsToDo: string[];
  summary: string;
  tourHighlights: string[];
  rating: number | null;
  user: User;
  reviews: any[];
  name: string;
}

interface TourPlan {
  id: string;
  touristId: string;
  location: string;
  startDate: Date;
  endDate: Date;
  adults: number;
  children: number;
  infants: number;
  pets: number;
  guidePreference: string;
  // tourGuide?: TourGuide; // You might need to add this if you use it
  tourist?: User; // You might need to add this if you use it
  createdAt: Date;
  tourGuides: TourGuide[];
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  notifications: Notification[];
}

const PlannedTourContext = createContext<{
  tourPlans: any[];
  plansLoading: boolean;
  fetchTourPlans: () => void;
  createTourPlan: (tourPlanData: any) => Promise<void>;
  fetchTourPlanById: (id: string) => Promise<void>;
  sendMail: (to: string, subject: string, message: string) => Promise<void>;
}>({
  tourPlans: [],
  plansLoading: true,
  fetchTourPlans: () => {},
  createTourPlan: async () => {},
  fetchTourPlanById: async () => {},
  sendMail: async () => {},
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
      return data.tourPlan.id;
    } catch (error) {
      console.error("Error creating tour plan:", error);
    }
  };

  const sendMail = async (
    to: string,
    subject: string,
    message: string
  ): Promise<void> => {
    try {
      const response = await axiosInstance.post("/api/plans/sendEM", {
        to,
        subject,
        message,
      });
      // console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
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
        sendMail,
      }}
    >
      {children}
    </PlannedTourContext.Provider>
  );
};

export const usePlannedTours = () => useContext(PlannedTourContext);
