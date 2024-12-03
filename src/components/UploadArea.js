import {
    ExclamationTriangleIcon,
    UploadIcon,
} from "@radix-ui/react-icons";

export default function UploadArea({ fileIsValid, onFileUpload }) {
    return (
        <div id="uploadArea" className="flex justify-center px-5 mx-5 transition duration-300 ease-in-out cursor-pointer group bg-foreground/15 hover:bg-foreground/10 dark:bg-foreground dark:hover:bg-foreground/90 outline-dashed outline-gray dark:outline-gray/30 dark:hover:outline-gray/40 outline-2 outline-offset-2">
            <label htmlFor="dropzone" className="flex flex-col justify-center text-center cursor-pointer">
                <UploadIcon className="mx-auto w-12 h-12 transition duration-300 ease-in-out rotate-3 group-hover:rotate-0 text-foreground/50 dark:text-gray"></UploadIcon>
                <h2 className="mt-4 text-2xl font-bold text-foreground/50 dark:text-gray">Click to upload or drag and drop</h2>
                <h3 className="my-3 text-base font-bold text-foreground/25 dark:text-gray/50">JPG, JPEG, or PNG file</h3>

                {fileIsValid == false && <div className="flex flex-row items-center mx-auto mt-3 space-x-2">
                    <ExclamationTriangleIcon className="w-4 h-4 text-red-300" />
                    <p className="text-sm text-red-300">Must be a JPG, JPEG, or PNG file.</p>
                </div>}
                <input id="dropzone" type="file" className="hidden" onChange={onFileUpload} accept="image/x-png,image/jpeg" />
            </label>
        </div>
    );
}