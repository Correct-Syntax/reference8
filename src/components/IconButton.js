
export default function IconButton({ children, onClick }) {
    return (
        <button onClick={onClick} className="p-0.5 transition-colors duration-300 ease-in-out text-gray hover:text-white">
            {children}
        </button>
    );
}