import {
    CaretDownIcon,
} from "@radix-ui/react-icons";


export default function IconDropDownButton({ Icon, active, onClick }) {
    return (
        <button onClick={onClick} className="flex flex-row items-center p-0.5 group">
            <Icon className={`w-5 h-5 transition-colors duration-300 ease-in-out group-hover:text-white ${active ? "text-accent" : "text-gray"}`} />
            <CaretDownIcon className={`w-4 h-4 transition-colors duration-300 ease-in-out  group-hover:text-white ${active ? "rotate-180 text-accent" : "text-gray"}`}></CaretDownIcon>
        </button>
    );
}