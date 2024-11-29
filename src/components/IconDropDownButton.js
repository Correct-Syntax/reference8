import { CaretDownIcon,
    ViewNoneIcon, } from "@radix-ui/react-icons";

export default function IconDropDownButton() {
    return (
    <button className="flex flex-row items-center group">
        <ViewNoneIcon className="w-5 h-5 transition-colors duration-300 ease-in-out text-gray group-hover:text-white"></ViewNoneIcon>
        <CaretDownIcon className="w-4 h-4 transition-colors duration-300 ease-in-out text-gray group-hover:text-white"></CaretDownIcon>
    </button>
    );
}