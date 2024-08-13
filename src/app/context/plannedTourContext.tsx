// "use client";

// import { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import axiosInstance from "@/src/lib/utils";

// const PlannedTourContext = createContext<{
//   plannedTours: PlannedTourProps[] | undefined;
//   loading: true;
//   fetchPlannedTours: () => void;
// }>({
//   plannedTours: undefined,
//   loading: true,
//   fetchPlannedTours: () => {},
// });

// interface PlannedTourProps {
//   id: string;
//   image: string;
//   location: string;
//   noOfDays: string;
//   startDate: string;
//   endDate: string;
//   numberOfPeople: string;
//   time: string;
//   guidePreference: string;
//   localGuide: string[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface User {
//   id: string;
//   fullName: string;
//   address: string;
//   email: string;
//   password: string;
//   userType: string;
//   languages: string[];
//   image: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface TourGuide {
//   id: string;
//   userId: string;
//   location: string;
//   offerRange: number;
//   aboutMe: string;
//   motto: string;
//   thingsToDo: string[];
//   summary: string;
//   tourHighlights: string[];
//   rating: number | null;
//   user: User;
//   reviews: any[]; // Adjust the type of reviews as needed
// }

// export const PlannedTourProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [plannedTours, setPlannedTours] = useState<any>([]);
//   const [loading, setLoading] = useState<any>(true);

//   const fetchPlannedTours = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axiosInstance.get("/api/planTours/plannedTours");
//       setPlannedTours(data.plannedTours);
//     } catch (error) {
//       console.error("Error fetching planned tours:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlannedTours();
//   }, []);

//   return (
//     <PlannedTourContext.Provider
//       value={{ plannedTours, loading, fetchPlannedTours }}
//     >
//       {children}
//     </PlannedTourContext.Provider>
//   );
// };

// export { PlannedTourContext };
