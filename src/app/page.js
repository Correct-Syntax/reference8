import Image from "next/image";
import { 
  SunIcon, 
  BoxModelIcon, 
  RotateCounterClockwiseIcon,
  EnterFullScreenIcon,
  ViewNoneIcon,
  ViewGridIcon,
  ViewVerticalIcon,
  ViewHorizontalIcon,
 } from "@radix-ui/react-icons";
import IconDropDownButton from "@/components/IconDropDownButton";
import DropDownMenu from "@/components/DropDownMenu";


export default function Home() {
  const gridModes = [
    {id: 0, name: 'None'},// icon: ViewNoneIcon(),},
    {id: 1, name: 'Vertical'}, //icon: ViewVerticalIcon(),},
    {id: 2, name: 'Horizontal'}, //icon: ViewHorizontalIcon(),},
    {id: 3, name: 'Grid'}//, icon: ViewGridIcon(),},
  ];

  const filterModes = [
    {id: 0, name: 'Original',},
    {id: 1, name: 'Grayscale',},
    {id: 2, name: 'Posterize',},
  ];

  return (
    <div className="min-h-screen">
      <nav class="flex flex-row justify-between items-center px-5 py-3 bg-foreground">
        <Image
            className=""
            src="/logo-icon.png"
            alt="Next.js logo"
            width={22}
            height={22}
            priority
          />
          <div class="flex flex-row space-x-4">
            <BoxModelIcon className="w-5 h-5 text-gray"></BoxModelIcon>
            <RotateCounterClockwiseIcon className="w-5 h-5 text-gray"></RotateCounterClockwiseIcon>

          </div>

          <div className="flex flex-row space-x-4">

            <IconDropDownButton></IconDropDownButton>


            <hr className="border-white"/>
            <SunIcon className="w-5 h-5 text-gray"></SunIcon>
            <EnterFullScreenIcon className="w-5 h-5 text-gray"></EnterFullScreenIcon>
          </div>
      </nav>


      <main className="flex flex-col">

        <DropDownMenu items={gridModes}></DropDownMenu>


      </main>
      <footer className="flex flex-wrap row-start-3 gap-6 justify-center items-center">



      </footer>
    </div>
  );
}
