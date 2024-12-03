
export default function IconButton({ children, disabled, onClick }) {
    return (
        <button onClick={onClick} disabled={disabled} className={`p-0.5 transition-colors duration-300 ease-in-out  ${disabled ? "text-gray/50" : "text-gray hover:text-white"}`}>
            {children}
        </button>
    );
}