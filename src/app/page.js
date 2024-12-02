"use client";

import Image from "next/image";
import {
  SunIcon,
  EnterFullScreenIcon,
  ViewNoneIcon,
  ViewGridIcon,
  ViewVerticalIcon,
  ViewHorizontalIcon,
  ShadowInnerIcon,
  ExitFullScreenIcon,
  MoonIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import IconDropDownButton from "@/components/IconDropDownButton";
import DropDownMenu from "@/components/DropDownMenu";
import ImageFiltersDropDownMenu from "@/components/ImageFiltersDropDownMenu";
import IconButton from "@/components/IconButton";
import ImageCanvas from "@/components/ImageCanvas";
import { useState } from 'react';
import UploadArea from "@/components/UploadArea";

const gridModesConst = [
  { id: 0, name: 'None', icon: ViewNoneIcon, },
  { id: 1, name: 'Vertical', icon: ViewVerticalIcon, },
  { id: 2, name: 'Horizontal', icon: ViewHorizontalIcon, },
  { id: 3, name: 'Grid', icon: ViewGridIcon, },
];

const imageFiltersConst = [
  { id: 0, name: 'Original', },
  { id: 1, name: 'Grayscale', },
  { id: 2, name: 'Posterize', },
];



export default function Home() {
  const [fullscreen, setFullscreen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);

  const [gridMode, setGridMode] = useState(0);
  const [imageFilters, setImageFilters] = useState([true, false, false]);

  const [gridModeMenuOpen, setGridModeMenuOpen] = useState(false);
  const [imageFiltersMenuOpen, setImageFiltersMenuOpen] = useState(false);

  const [file, setFile] = useState(null);
  const [fileIsValid, setFileIsValid] = useState(null);


  function handleSetGridMode(id) {
    setGridMode(id);
    setGridModeMenuOpen(false);
  }

  function handleSetImageFilters(index) {
    const nextImageFilters = imageFilters.map((f, i) => {
      if (i == index) {
        // Up to two can be selected.
        var numberOfSelected = imageFilters.filter(i => i == true).length;
        if (numberOfSelected > 1 && numberOfSelected < 3) {
          return false;
        } else {
          if (numberOfSelected >= 1) {
            return true;
          } else {
            return !f;
          }
        }
      } else {
        return f;
      }
    });
    setImageFilters(nextImageFilters);
    //setImageFiltersMenuOpen(false);
  }

  function handleSetToggleDarkTheme() {


    setDarkTheme(!darkTheme);
  }

  function handleSetToggleFullscreen() {
    setFullscreen(!fullscreen);
  }

  function handleFileUpload(e) {
    console.log(e.target.files);
    var uploadedFile = e.target.files[0];
    if (/\.(jpe?g|png)$/i.test(uploadedFile.name) === true) {
      setFileIsValid(true);
      setFile(URL.createObjectURL(uploadedFile));
    } else {
      setFileIsValid(false);
    }
  }

  return (
    <div className="flex flex-col">
      <nav className="flex z-50 flex-row justify-between items-center px-5 py-3 bg-foreground">
        <div onClick={() => setAboutMenuOpen(!aboutMenuOpen)} className="inline-flex space-x-2 group hover:cursor-pointer">
          <Image
            src="/logo-icon.png"
            alt="Logo"
            width={22}
            height={22}
            priority
          />
          <span className="font-bold transition-colors duration-300 ease-in-out text-gray group-hover:text-white">Reference8</span>
        </div>


        <div className="flex flex-row space-x-4">
          <div className="relative">
            <IconDropDownButton Icon={ShadowInnerIcon} active={imageFiltersMenuOpen} onClick={() => setImageFiltersMenuOpen(!imageFiltersMenuOpen)}>
            </IconDropDownButton>
            {imageFiltersMenuOpen && <ImageFiltersDropDownMenu items={imageFiltersConst} selected={imageFilters} onClick={handleSetImageFilters}></ImageFiltersDropDownMenu>}
          </div>
          <div className="relative">
            <IconDropDownButton Icon={gridModesConst[gridMode].icon} active={gridModeMenuOpen} onClick={() => setGridModeMenuOpen(!gridModeMenuOpen)}>
            </IconDropDownButton>
            {gridModeMenuOpen && <DropDownMenu items={gridModesConst} selected={gridMode} onClick={handleSetGridMode}></DropDownMenu>}
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <hr className="border-white" />
          <IconButton onClick={handleSetToggleDarkTheme}>
            {darkTheme ? <SunIcon className="w-5 h-5"></SunIcon> : <MoonIcon className="w-5 h-5"></MoonIcon>}
          </IconButton>
          <IconButton onClick={handleSetToggleFullscreen}>
            {fullscreen ? <ExitFullScreenIcon className="w-5 h-5"></ExitFullScreenIcon> : <EnterFullScreenIcon className="w-5 h-5"></EnterFullScreenIcon>}
          </IconButton>
        </div>
      </nav>

      <main className="flex justify-center items-center p-4">
        {file == null ? <UploadArea file={file} fileIsValid={fileIsValid} onFileUpload={handleFileUpload}></UploadArea> :
          <ImageCanvas file={file}></ImageCanvas>}
      </main>
    </div>
  );
}
