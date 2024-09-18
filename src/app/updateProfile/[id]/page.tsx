/* eslint-disable @next/next/no-img-element */
"use client";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContex";
import ClipLoader from "react-spinners/ClipLoader";

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
  const { user, loading } = useContext(UserContext);
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    address: "",
    languages: [],
    image: null,
    userType: "TOURIST",
    tourGuideData: {},
  });

  //   const handleInputChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     setProfile({
  //       ...profile,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleLanguageChange = (language: string) => {
    const currentLanguages = profile.languages;
    if (currentLanguages.includes(language)) {
      setProfile({
        ...profile,
        languages: currentLanguages.filter((lang) => lang !== language),
      });
    } else {
      setProfile({
        ...profile,
        languages: [...currentLanguages, language],
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({
        ...profile,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // You would have your API call here to update the profile
    console.log(profile);
  };

  let [imageBlob, setImageBlob] = useState<string | null>(user.image);
  const [imagePreview, setImagePreview] = useState<any>(user.image); // Store the data URL here

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
      setImagePreview(user.image); // Or any default image URL
    }
  }, [profile.image, user.image]);

  return (
    <div className="w-full p-4 flex flex-col justify-start items-center">
      <h1 className="my-[2.5rem] text-[2rem] font-semibold">
        Complete Your Profile
      </h1>
      <form
        onSubmit={handleSubmit}
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
            ) : (
              <img
                src={imagePreview}
                className="w-full h-full flex justify-center items-center"
                alt=""
              />
            )}
          </div>
          {/* <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Profile Image
          </label> */}
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
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="FirstName"
                type="text"
                placeholder="Full Name"
                name="FirstName"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full">
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
            </div>
          </div>
          <div className="my-6 w-full">
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
        </div>
        <div className="w-full lg:w-[50%] h-full justify-start items-center flex flex-col">
          <div className="mb-4 w-full flex flex-col md:flex-row justify-start gap-x-[1.35rem] items-center h-full">
            <div className="w-full h-full flex-col justify-start items-start gap-x-[1.35rem] flex">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="languages"
              >
                Languages
                {/* (comma separated) */}
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="languages"
                type="text"
                placeholder="Enter Your Language"
                name="languages"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    languages: e.target.value
                      .split(",")
                      .map((lang) => lang.trim()),
                  })
                }
              />
            </div>
            <div className="w-full h-full flex justify-start items-center gap-x-[1rem] mt-8">
              <p className="w-fit px-[1.25rem] flex justify-center items-start py-2 rounded-full font-semibold shadow-md border">
                English
              </p>
              <p className="w-fit px-[1.25rem] flex justify-center items-start py-2 rounded-full font-semibold shadow-md border">
                French
              </p>
              <p className="w-fit px-[1.25rem] flex justify-center items-start py-2 rounded-full font-semibold shadow-md border">
                Spanish
              </p>
            </div>
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
          <div className="w-full flex items-center justify-between">
            <button
              className="bg-orange-400 hover:bg-orange-700 shadow-md w-full text-center text-white py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              SAVE AND CONTINUE
            </button>
          </div>
        </div>
        {/* Conditionally render tour guide data */}
        {/* {profile.userType === "TOUR_GUIDE" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Tour Guide Data</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="location"
                type="text"
                placeholder="Location"
                name="location"
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
          </div>
        )} */}
      </form>
    </div>
  );
};

export default Page;
