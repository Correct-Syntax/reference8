"use client";

import { ViewGridIcon } from "@radix-ui/react-icons";

function getIcon() {
    return null;
}

export default function DropDownMenu({items}) {
    const listItems = items.map(item => 
        <li key={item.id} className="flex items-center space-x-2 font-semibold cursor-pointer text-gray">
            <ViewGridIcon className="w-5 h-5"></ViewGridIcon>
            <span>{item.name}</span>
        </li>
    );
    return (
        <div className="px-4 py-5 w-44 rounded-lg bg-foreground">
            <ul className="space-y-3">{listItems}</ul>
        </div>
    );
}