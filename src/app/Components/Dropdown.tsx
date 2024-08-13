import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900  hover:bg-gray-50">
        <div
          id="language"
          className="inline-flex w-full justify-center gap-x-1.5 bg-white px-1 py-2 text-[1.1rem] font-semibold text-gray-900  hover:bg-gray-50"
        >
          ENG
          <IoIosArrowDown
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </div>
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-[-0.3rem] ml-[-0.5rem] border-[1px] w-[5.25rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
        <div className="py-1">
          <MenuItem>
            <a
              id="language"
              href="#"
              className="block px-4 py-2 text-base text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              FRN
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
