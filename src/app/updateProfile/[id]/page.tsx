/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContex";
import ClipLoader from "react-spinners/ClipLoader";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "@/src/lib/utils";

interface ProfileData {
  fullName: string;
  address: string;
  languages: string[];
  image: File | null;
  userType: "TOURIST" | "TOUR_GUIDE";
  tourGuideData?: {
    location?: string;
    offerRange?: number;
    aboutMe?: string;
    motto?: string;
    thingsToDo?: string[];
  };
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Page = ({ params }: { params: { id: string } }) => {
  const { user, loading, updateUser, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    address: "",
    languages: [],
    image: null,
    userType: "TOURIST",
    tourGuideData: {
      location: user?.tourGuide?.location || "",
      offerRange: user?.tourGuide?.offerRange || 0,
      aboutMe: user?.tourGuide?.aboutMe || "",
      motto: user?.tourGuide?.motto || "",
      thingsToDo: user?.tourGuide?.thingsToDo || [],
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", profile.fullName);
    formData.append("address", profile.address);
    profile.languages.forEach((language) => {
      formData.append("languages", language);
    });
    formData.append("userType", profile.userType);
    formData.append("tourGuideData", JSON.stringify(profile.tourGuideData));
    if (profile.image) {
      formData.append("image", profile.image);
    }
    const { data } = await axiosInstance.put("/api/users/profile", formData);
    console.log(data);
    if (data.message === "User updated successfully") {
      setUser(data.user);
      toast.success("updated successful!", {
        position: "top-center", // Adjust position as needed
        autoClose: 5000, // Duration in milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light", // Or "dark"
      });
      window.location.href = `/profile/${user.id}`;
    }
    console.log(profile);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "languages") {
      setProfile({
        ...profile,
        languages: e.target.value.split(",").map((lang) => lang.trim()),
      });
    } else {
      setProfile({
        ...profile,
        [e.target.name]: e.target.value,
      });
    }
  };

  // const handleLanguageChange = (language: string) => {
  //   const currentLanguages = profile.languages;
  //   if (currentLanguages.includes(language)) {
  //     setProfile({
  //       ...profile,
  //       languages: currentLanguages.filter((lang) => lang !== language),
  //     });
  //   } else {
  //     setProfile({
  //       ...profile,
  //       languages: [...currentLanguages, language],
  //     });
  //   }
  // };

  const handleLanguageChange = (language: string) => {
    const newLanguages = language
      .split(",")
      .map((lang) => lang.trim())
      .filter((lang) => lang !== ""); // Split, trim, and remove empty strings
    setProfile({
      ...profile,
      languages: [...new Set(profile.languages.concat(newLanguages))], // Use a Set to prevent duplicates
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({
        ...profile,
        image: e.target.files[0],
      });
    }
  };

  let [imageBlob, setImageBlob] = useState<string | null>(user?.image || null);
  const [imagePreview, setImagePreview] = useState<any>(user?.image || null); // Store the data URL here

  // useEffect(() => {
  //   const loadImageBlob = async () => {
  //     if (profile.image instanceof File) {
  //       try {
  //         const blob = await new Promise<Blob>((resolve, reject) => {
  //           const reader = new FileReader();
  //           reader.onload = () => resolve(reader.result as unknown as Blob);
  //           reader.onerror = reject;
  //           reader.readAsDataURL(profile.image as File);
  //         });
  //         setImageBlob(URL.createObjectURL(blob));
  //       } catch (error) {
  //         console.error("Error reading image:", error);
  //         // Handle the error, e.g., show an error message
  //       }
  //     }
  //   };

  //   loadImageBlob();
  // }, [profile.image]);

  useEffect(() => {
    if (profile.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the data URL to imagePreview
      };
      reader.readAsDataURL(profile.image);
    } else {
      // If profile.image is not a File (e.g., null), reset imagePreview
      setImagePreview(user?.image); // Or any default image URL
    }
  }, [profile.image, user?.image]);

  return (
    <div className="w-full p-4 flex flex-col justify-start items-center">
      <ToastContainer />
      <h1 className="my-[2.5rem] text-[2rem] font-semibold w-full text-center">
        Complete Your Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white w-full flex-col flex justify-start items-center rounded px-8 pt-6 pb-[4rem] mb-4"
      >
        <div className="mb-4 w-full md:w-[35%] h-full flex flex-col justify-start items-center">
          <div className="w-full md:w-[70%] flex shadow-md justify-center items-center object-contain h-[14rem] rounded-xl border">
            {loading ? (
              <ClipLoader
                cssOverride={override}
                color="green"
                loading={loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : user.image ? (
              <img
                src={`/uploads/userImages/${imagePreview}`}
                className="w-full h-full flex justify-center items-center"
                alt=""
              />
            ) : (
              <img
                src={`/${imagePreview}`}
                className="w-full h-full flex justify-center items-center"
                alt=""
              />
            )}
          </div>
          <input
            className="shadow md:w-[70%] rounded-lg appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="w-full md:w-[50%] h-full flex flex-col justify-start items-center mt-[1.25rem] lg:mt-0">
          <div className="mb-4 w-full gap-x-[1.35rem] h-full flex flex-col md:flex-row gap-y-[1.35rem] md:gap-y-0 justify-start items-center">
            <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="LastName"
                type="text"
                placeholder="Last Name"
                name="LastName"
                onChange={handleInputChange}
              />
            </div> */}
          </div>

          <div className="mb-7 w-full relative">
            {" "}
            {/* Add relative positioning */}
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userType"
            >
              User Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
              id="userType"
              name="userType"
              value={profile.userType}
              onChange={handleInputChange}
            >
              <option value="TOURIST">Tourist</option>
              <option value="TOUR_GUIDE">Tour Guide</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-[-1rem] top-6 flex items-center px-2 text-gray-700">
              {" "}
              {/* Position the icon */}
              <RiArrowDropDownLine size={48} />
              {/* SVG icon */}
            </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-[50%] h-full justify-start items-center flex flex-col"> */}
        {profile.userType === "TOUR_GUIDE" && (
          <div className="w-full flex flex-col lg:w-[50%]">
            <div className="w-full flex-col flex items-center justify-between">
              <div className="mb-4 w-full flex flex-col justify-start gap-x-[1.35rem] items-center h-full">
                <div className="w-full h-full flex-col justify-start items-start gap-x-[1.35rem] flex">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="languages"
                  >
                    Languages
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="languages"
                    type="text"
                    placeholder="Enter languages separated by commas"
                    name="languages"
                    onChange={(e) => handleLanguageChange(e.target.value)}
                  />
                </div>
                {/* <div className="w-full h-full grid grid-cols-2 lg:flex justify-start items-center gap-[1.25rem] mt-8">
                  <p className="w-fit px-[1.25rem] flex justify-center items-start py-2 rounded-full font-semibold shadow-md border">
                    English
                  </p>
                  <p className="w-fit px-[1.25rem] flex justify-center items-start py-2 rounded-full font-semibold shadow-md border">
                    French
                  </p>
                  <p className="w-fit px-[1.25rem] flex justify-center items-start py-2 rounded-full font-semibold shadow-md border">
                    Spanish
                  </p>
                </div> */}
              </div>
              <div className="my-2 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Motto
                </label>
                <textarea
                  className="shadow appearance-none h-[6rem] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  placeholder="Enter your Motto"
                  name="address"
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-6 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  About Me
                </label>
                <textarea
                  className="shadow appearance-none h-[6rem] border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="aboutMe"
                  placeholder="Enter About yourself"
                  name="AboutMe"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full lg:w-[50%] h-full justify-start items-center flex flex-col mt-[0rem]">
              <div className="mb-7 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Location
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={profile.tourGuideData?.location || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      tourGuideData: {
                        ...profile.tourGuideData,
                        location: e.target.value,
                      },
                    })
                  }
                />
              </div>

              {/* Offer Range */}
              <div className="mb-7 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="offerRange"
                >
                  Offer Range
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="offerRange"
                  type="number"
                  placeholder="Offer Range"
                  name="offerRange"
                  value={profile.tourGuideData?.offerRange || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      tourGuideData: {
                        ...profile.tourGuideData,
                        offerRange: parseInt(e.target.value) || 0,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
        <div className="w-full md:w-[50%] h-full flex items-center justify-between">
          <button
            className="bg-orange-400 hover:bg-orange-700 shadow-md w-full text-center text-white py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            SAVE AND CONTINUE
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
