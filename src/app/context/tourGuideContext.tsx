// context/TourGuideContext.js
"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import axiosInstance from "@/src/lib/utils";

const TourGuideContext = createContext<{
  tourGuides: TourGuide[];
  tourGuide: TourGuide | null;
  fetchTourGuideById: (id: string) => void;
  fetchTourGuides: () => void;
  loading: boolean;
  setTourGuide: any;
}>({
  tourGuides: [],
  tourGuide: null,
  fetchTourGuideById: (id: string) => {},
  fetchTourGuides: () => {},
  loading: true,
  setTourGuide: () => {},
});

// types.ts or models.ts
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
  reviews: any[]; // Adjust the type of reviews as needed
  name: string; // Add the missing 'name' property
  tourGuideststs: string; // Add the missing 'tourGuideststs' property
}

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

const TourGuideProvider: React.FC<any> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tourGuides, setTourGuides] = useState<any>([]);
  const [tourGuide, setTourGuide] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTourGuides = async () => {
    try {
      const { data } = await axiosInstance.get("/api/tourGuides/tourGuides");
      setTourGuides(data.tourGuides);
      // console.log(data.tourGuides);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTourGuideById = async (id: any) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/tourGuides/tourGuides/${id}`
      );
      setTourGuide(data.tourGuide);
      console.log(data.tourGuide);
    } catch (error) {
      console.error("Error fetching tour guide:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTourGuides();
  }, []);

  return (
    <TourGuideContext.Provider
      value={{
        tourGuides,
        tourGuide,
        fetchTourGuides,
        fetchTourGuideById,
        loading,
        setTourGuide,
      }}
    >
      {children}
    </TourGuideContext.Provider>
  );
};

export { TourGuideContext, TourGuideProvider };
