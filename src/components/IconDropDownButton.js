import { CaretDownIcon,
    ViewNoneIcon, } from "@radix-ui/react-icons";

export default function IconDropDownButton({active}) {
    return (
    <button className="flex flex-row items-center p-1 group">
        <ViewNoneIcon className="w-5 h-5 transition-colors duration-300 ease-in-out text-gray group-hover:text-white"></ViewNoneIcon>
        <CaretDownIcon className={`w-4 h-4 transition-colors duration-300 ease-in-out text-gray group-hover:text-white ${active ? "rotate-180": ""}`}></CaretDownIcon>
    </button>
    );
}