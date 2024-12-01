import {
    ImageIcon,
    UploadIcon,
} from "@radix-ui/react-icons";
import PrimaryTextIconButton from "@/components/PrimaryTextIconButton";

export default function UploadArea() {
    return (
        <div id="uploadArea" className="flex justify-center p-5 mx-2 group bg-foreground outline-dashed outline-gray/30 outline-2 outline-offset-2">
            <div className="flex flex-col justify-center text-center">
                <ImageIcon className="mx-auto w-16 h-16 transition duration-300 ease-in-out rotate-3 group-hover:rotate-6 text-gray"></ImageIcon>
                <h2 className="mt-4 text-4xl font-bold text-gray">Drop a photo to upload.</h2>
                <h3 className="my-3 text-lg font-bold text-gray/50">or</h3>
                <div className="mx-auto">
                    <PrimaryTextIconButton text="Select file to upload" Icon={UploadIcon}></PrimaryTextIconButton>
                </div>


            </div>


        </div>
    );
}