import React from 'react';

export default function IconButton({children}) {
    return (
    <button className="p-1 transition-colors duration-300 ease-in-out text-gray hover:text-white">
        {children}
    </button>
    );
}