import { CheckIcon } from "@radix-ui/react-icons";


export default function ImageFiltersDropDownMenu({ items, selected, onClick }) {
    const listItems = items.map(item =>
        <li key={item.id} onClick={() => onClick(item.id)} className={`z-50 group flex flex-col items-center font-bold text-center cursor-pointer text-[11pt] transition-colors duration-300 ease-in-out ${selected[item.id] == true ? "text-accent" : "text-gray hover:text-white"}`}>
            <div className={`relative w-24 h-24 bg-[url('/img.jpg')] bg-cover bg-center rounded-xl mb-1 border-4 ${selected[item.id] == true ? "border-accent" : "border-foreground"}`}>
                {selected[item.id] == true && <div className="flex absolute right-0 bottom-0 justify-center items-center m-2 w-6 h-6 rounded-lg bg-accent">
                    <CheckIcon className="w-5 h-5 text-foreground"></CheckIcon>
                </div>}
            </div>
            {item.name}
        </li>
    );
    return (
        <div className="z-50 absolute -left-14 top-10 py-4 px-2 w-40 text-[11pt] rounded-lg bg-foreground shadow-2xl">
            <ul className="space-y-4">{listItems}</ul>
            <p className="mt-3 text-xs text-center text-gray/50">Select up to 2 at a time.</p>
        </div>
    );
}