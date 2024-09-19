// interface TourPlan {
//   id: string;
//   touristId: string;
//   location: string;
//   startDate: Date;
//   endDate: Date;
//   adults: number;
//   children: number;
//   infants: number;
//   pets: number;
//   guidePreference: string;
//   // tourGuide?: TourGuide; // You might need to add this if you use it
//   tourist?: User; // You might need to add this if you use it
//   createdAt: Date;
//   tourGuides: TourGuide[];
//   paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
//   notifications: Notification[];
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
//   reviews: any[];
//   name: string;
// }

// module.exports = TourPlan;
