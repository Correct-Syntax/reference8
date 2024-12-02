"use client";

export default function DropDownMenu({ items, selected, onClick }) {
    const listItems = items.map(item =>
        <li onClick={() => onClick(item.id)} key={item.id} className={`px-3 py-2 flex items-center space-x-2 font-bold cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-accent/10 ${selected == item.id ? "text-accent bg-accent/10" : "text-gray hover:text-accent"}`}>
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
        </li>
    );
    return (
        <div className="z-50 absolute -left-20 top-10 p-2 w-52 text-[11pt] rounded-lg bg-foreground shadow-2xl">
            <ul className="space-y-1">{listItems}</ul>
        </div>
    );
}