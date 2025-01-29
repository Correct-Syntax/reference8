import { useRef, useState, useEffect } from "react";

// Logic from https://stackoverflow.com/a/62681847
const useClickOutside = () => {
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClick = (ev) => {
            if (buttonRef.current && buttonRef.current.contains(ev.target)) {
                setIsOpen(!isOpen);
            } else {
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return [buttonRef, isOpen, setIsOpen];
}

export default useClickOutside;