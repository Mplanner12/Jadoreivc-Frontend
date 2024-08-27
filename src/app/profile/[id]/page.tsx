/* eslint-disable @next/next/no-img-element */
"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Suspense,
  useContext,
  CSSProperties,
} from "react";
import { MdCheckBox, MdKeyboardArrowDown } from "react-icons/md";
import { BsCamera } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FaXmark, FaCheck, FaStar } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { UserContext } from "../../context/UserContex";
import LoadingScreen from "../../Components/Loader";
import HashLoader from "react-spinners/HashLoader";
import { useForm } from "react-hook-form";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Page = ({ params }: { params: { id: string } }) => {
  const [selectedLocals, setSelectedLocals] = useState<string[]>([]);

  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]); // Default language
  const languageDropdownRef = useRef<HTMLUListElement>(null); // Reference to the dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const [profileImage, setProfileImage] = useState<File | null>(null); // State for profile image
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [about, setAbout] = useState("");
  const [motto, setMotto] = useState("");
  const [selectedThingsToDo, setSelectedThingsToDo] = useState<string[]>([]);

  const localsOptions = [
    "MAN",
    "WOMAN",
    "COUPLE",
    "FAMILY",
    "COUPLE OF FRIENDS",
  ];

  const languageOptions = ["English", "French"]; // Available languages

  const thingsToDoOptions = [
    "Explore The Pleateu District",
    "Visit St Paul's Cathedral",
    "Wander around Banco National park",
    "Relax at Bessam Beach",
    "Shop at Treichville Market",
    "Tour the Abidjan Zoo",
    "Enjoy nightlife in Zone 4",
    "Explore the Museum of Civilizations of Côte d'Ivoire",
  ];

  const GuideInfo = [
    {
      image: "/smilingGirl.png",
      name: "Grace Jennings",
      location: "Abidjan, Cote d Ivoire",
      rating: "4.5",
      noofreviews: "(243)",
      quote: '"Grace made our trip unforgettable!"',
      languages: ["French", "English"],
    },
  ];

  const handleLocalsSelect = (local: string) => {
    if (selectedLocals.includes(local)) {
      setSelectedLocals(selectedLocals.filter((l) => l !== local));
    } else {
      setSelectedLocals([...selectedLocals, local]);
    }
    // onLocalsSelect(local);
    // setLocalsOpen(false);
  };

  const handleThingsToDoSelect = (thingToDo: string) => {
    if (selectedThingsToDo.includes(thingToDo)) {
      setSelectedThingsToDo(selectedThingsToDo.filter((t) => t !== thingToDo));
    } else {
      setSelectedThingsToDo([...selectedThingsToDo, thingToDo]);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage((prevSelectedLanguages) => {
      if (prevSelectedLanguages.includes(language)) {
        // Remove language if already selected
        return prevSelectedLanguages.filter((l) => l !== language);
      } else {
        // Add language to the array
        return [...prevSelectedLanguages, language];
      }
    });
    // setIsDropdownOpen(false); // Close the dropdown after selection
  };

  // close Language Dropdown
  const handleLanguageDropdownToggle = () => {
    setIsDropdownOpen((isDropdownOpen) => !isDropdownOpen); // Toggle dropdown state
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      languageDropdownRef.current &&
      !languageDropdownRef.current.contains(event.target as Node) &&
      // Check if the click is on the button itself
      !((event.target as HTMLElement)?.closest("button") || false)
    ) {
      setIsDropdownOpen(false); // Close the dropdown
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    // Only attach the event listener when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the dropdown closes or the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleFormSubmit = async (data: any) => {
    try {
      updateUser(data);
      // console.log("Form submitted successfully:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors, such as displaying an error message to the user.
    }
  };

  const { user, loading, updateUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || "",
      aboutMe: user?.tourGuide.aboutMe || "",
      motto: user?.tourGuide.motto || "",
      offerRange: user?.tourGuide.offerRange || "",
      email: user?.email || "",
      languages: user?.tourGuide.languages || [],
      thingsToDo: user?.tourGuide.thingsToDo || [],
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="w-full m-0 p-0 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center pt-[2rem]">
          <div className="flex flex-col justify-center items-center py-[2rem]">
            <h1 className="text-center text-[1.85rem] font-semibold text-teal-950">
              My Profile
            </h1>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center md:pr-[9rem] items-center md:items-start md:mt-[3rem] md:mb-[11rem]">
            {loading ? (
              <div className="md:w-[88%] mt-[1rem] md:px-[12rem] mb-[5.75rem] px-[1.5rem] flex flex-col justify-center h-full">
                <div className="mb-[0.85rem] w-full h-full">
                  <HashLoader
                    cssOverride={override}
                    color="green"
                    loading={loading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </div>
            ) : (
              <div className="md:w-[88%] mt-[1rem] md:px-[10rem] md:pr-[3rem] mb-[5.75rem] px-[1.5rem] flex flex-col justify-center h-full">
                <div className="mb-[0.85rem] w-full h-full">
                  <img
                    className="rounded-xl w-full md:h-fit"
                    src={user?.image || "/placeholder-image.png"}
                    alt="image"
                  />
                </div>
                <div className="w-full h-full flex justify-between items-start">
                  <div className="w-full h-fit pb-[0.5rem] pt-[0.2rem] space-y-[0.25rem] text-teal-950 tracking-wide">
                    <p className="text-[1rem] font-semibold">
                      {user?.fullName || "Guest"}
                    </p>
                    <div className="w-fit gap-x-[0.3rem] text-base font-normal flex justify-between items-center">
                      <HiOutlineLocationMarker size={17} />
                      <p className="text-[0.725rem] tracking-tighter font-[500]">
                        {user?.tourGuide.location || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-[0.5rem] py-[0.3rem]">
                    <div className="w-fit gap-x-[0.5rem] flex justify-center items-center">
                      <div className="text-[0.9rem] font-semibold text-blue-950">
                        {user?.tourGuide.rating || "N/A"}
                      </div>
                      <div className="flex justify-center w-fit gap-x-[0.10rem] md:gap-x-1">
                        <FaStar color="orange" size={15} />
                      </div>
                      <div className="text-[0.8rem] font-[500] text-blue-950">
                        (243)
                      </div>
                    </div>
                    <div className="w-full flex h-fit py-0.5 text-[0.7rem] font-semibold justify-start items-center gap-x-[0.25rem]">
                      <div className="w-full text-teal-900">
                        {user?.languages?.[0] || "English"}
                      </div>
                      <div className="text-teal-900 border-l-[1.5px] border-teal-700 pl-[0.25rem]">
                        {user?.languages?.[1] || "French"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-fit flex justify-start text-[0.75rem] italic font-[500] text-slate-900">
                  &quot;{user?.fullName.split(" ")[0] || "Guest"} made our trip
                  unforgettable!&quot;
                </div>
                <div className="text-teal-950 md:gap-x-[4rem] md:w-full flex justify-between pt-[0.5rem] md:pt-[0.5rem]">
                  <p className="w-full text-sm md:text-sm font-[500]">
                    4 Reviews
                  </p>
                  <p className="text-sm md:text-sm font-[500]">
                    From
                    <span className="text-sm text-emerald-600 text-[0.8rem] font-[500] px-[0.25rem]">
                      ${user?.tourGuide.offerRange || "NA"}/hr
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Page;
