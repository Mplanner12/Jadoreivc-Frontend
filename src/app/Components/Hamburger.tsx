import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import HashLoader from "react-spinners/HashLoader";
import { CSSProperties } from "react";
import { PiPencilLineLight } from "react-icons/pi";

interface User {
  id: string;
  fullName: string;
  profileImage: string;
  userType: string;
  loading: boolean;
}
interface HeaderProps {
  user?: User;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

export default function HamburgerMenu({ user }: HeaderProps) {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left md:hidden ml-[-1rem]"
    >
      <MenuButton className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-1 py-2 text-base font-semibold text-gray-900  hover:bg-gray-50">
        <div className="inline-flex w-full justify-center gap-x-1 rounded-md bg-white px-1 py-2 text-[1rem] font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
          <RxHamburgerMenu size={20} />
        </div>
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-[1.75rem] ml-[1.2rem] py-[1.5rem] px-[0.5rem] border-[1px] w-[15.25rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1">
          <MenuItem as="div">
            <a
              href="/"
              className="block px-4 font-semibold text-teal-900 py-2 text-base text-[1.15rem] data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Home
            </a>
          </MenuItem>
          <MenuItem as="div">
            <a
              href="/customTour"
              className="block px-4 font-semibold text-teal-900 py-2 text-base text-[1.15rem] data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Custom Tours
            </a>
          </MenuItem>
          {/* <MenuItem/> */}
          <MenuItem as="div">
            <a
              href={"/Blog"}
              className="block px-4 font-semibold text-teal-900 py-2 text-base text-[1.15rem] data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
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
                {user.userType === "TOURIST" && (
                  <div className="w-fit hidden md:flex justify-end items-center px-[1.5rem] ">
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
              <span>&nbsp;</span>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
