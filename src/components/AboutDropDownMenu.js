

function handleAboutMenuItemsOnClick(id) {
    switch (id) {
        case 0:
            sendFeedback();
        case 1:
            visitWebsite();
        case 2:
            visitGitHubRepository();
    }
}


function sendFeedback() {
    window.open("mailto:hi@noahrahm.com", "_blank");
}

function visitWebsite() {
    window.open("https://reference8.com", "_blank");
}

function visitGitHubRepository() {
    window.open("https://github.com/Correct-Syntax/reference8", "_blank");
}


export default function AboutDropDownMenu({ items }) {
    const listItems = items.map(item =>
        <li onClick={() => handleAboutMenuItemsOnClick(item.id)} key={item.id} className="flex z-50 items-center px-3 py-2 space-x-2 font-bold rounded-lg transition-colors duration-300 ease-in-out cursor-pointer text-gray hover:text-white">
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
        </li>
    );
    return (
        <div className="z-50 absolute -left-1 top-10 p-2 w-52 text-[11pt] rounded-lg bg-foreground shadow-2xl">
            <ul className="mb-1 space-y-1">{listItems}</ul>
            <small className="relative px-3 text-xs text-gray/70">Reference8 v0.1.0 build 1</small>
        </div>
    );
}