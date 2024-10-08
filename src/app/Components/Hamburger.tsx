import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import HashLoader from "react-spinners/HashLoader";
import { CSSProperties } from "react";
import { PiPencilLineLight } from "react-icons/pi";
import { getUserRole } from "@/src/lib/utils";

interface User {
  id: string;
  fullName: string;
  profileImage: string;
  userType: string;
  loading: boolean;
}
interface HeaderProps {
  user?: User;
  userRole?: any;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function HamburgerMenu({ user, userRole }: HeaderProps) {
  // let userRole = getUserRole();
  return (
    <Menu
      as="div"
      className="relative inline-block text-left md:hidden ml-[-1rem]"
    >
      <MenuButton className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-1 text-base font-semibold text-gray-900  hover:bg-gray-50">
        <div className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-1 py-2 text-[1rem] font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
          <RxHamburgerMenu size={20} />
        </div>
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-[2rem] ml-[-6.5rem] py-[0.25rem] px-[0.1rem] border-[1px] w-[14rem] flex justify-center items-center origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1 w-full flex flex-col justify-center items-center">
          <MenuItem as="div">
            <a
              href="/"
              className="block px-4 font-semibold text-teal-900 py-2 text-base text-[1.15rem] text-center data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Home
            </a>
          </MenuItem>
          {/* <MenuItem/> */}
          <MenuItem as="div">
            <a
              href={"/Blog"}
              className="block px-4 font-semibold text-teal-900 py-2 text-base text-[1.15rem] text-center data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Blog
            </a>
          </MenuItem>
          <MenuItem
            as="div"
            className={"mt-[1rem] flex justify-center items-center"}
          >
            {user?.loading ? (
              // {loading ? (
              <HashLoader
                cssOverride={override}
                color="green"
                loading={user.loading}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : user ? (
              <>
                {/* "Tours" link is rendered only if the user is a TOURIST */}
                {userRole === "TOURIST" && (
                  <div className="w-fit flex justify-end items-center px-[0.15rem] ">
                    <Link href={`/planTour/${user?.id}`}>
                      <button
                        type="submit"
                        className="uppercase w-[13rem] py-[1.3rem] block px-[0.25rem] text-center font-light text-[1.rem] text-white data-[focus]:bg-gray-100 rounded-full bg-orange-400 data-[focus]:text-gray-900 hover:bg-emerald-600 hover:text-white"
                      >
                        Plan your Tour
                      </button>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <span>{""}</span>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
