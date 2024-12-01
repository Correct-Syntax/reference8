

export default function PrimaryTextIconButton({ text, Icon }) {
    return (
        <button className="flex relative flex-row items-center px-4 py-3 space-x-2 font-bold rounded-lg transition-colors duration-300 ease-in-out h-min bg-accent text-foreground hover:bg-accent/90">
            <Icon className="w-6 h-6"></Icon>
            <span className="text-lg">{text}</span>
        </button>
    );
}