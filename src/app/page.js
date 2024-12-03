"use client";

import { useState } from "react";
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
  EnvelopeOpenIcon,
  GlobeIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import useFullscreen from "@/hooks/FullscreenHook";
import IconDropDownButton from "@/components/IconDropDownButton";
import DropDownMenu from "@/components/DropDownMenu";
import ImageFiltersDropDownMenu from "@/components/ImageFiltersDropDownMenu";
import IconButton from "@/components/IconButton";
import ImageCanvas from "@/components/ImageCanvas";
import UploadArea from "@/components/UploadArea";
import AboutDropDownMenu from "@/components/AboutDropDownMenu";


const aboutMenuItemsConst = [
  { id: 0, name: "Send Feedback", icon: EnvelopeOpenIcon, },
  { id: 1, name: "Visit Website", icon: GlobeIcon, },
  { id: 2, name: "GitHub Repository", icon: GitHubLogoIcon, },
];

const gridModesConst = [
  { id: 0, name: "None", icon: ViewNoneIcon, },
  { id: 1, name: "Vertical", icon: ViewVerticalIcon, },
  { id: 2, name: "Horizontal", icon: ViewHorizontalIcon, },
  { id: 3, name: "Grid", icon: ViewGridIcon, },
];

const imageFiltersConst = [
  { id: 0, name: "Original", thumbnail: "/original.jpg", },
  { id: 1, name: "Grayscale", thumbnail: "/grayscale.jpg", },
  { id: 2, name: "High Contrast", thumbnail: "high-contrast.jpg", },
];


export default function Home() {
  const [fullscreenRef, toggleFullscreen, isFullscreen] = useFullscreen();

  const [darkMode, setDarkMode] = useState(true);

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
  }

  function handleSetToggleDarkMode() {
    setDarkMode(!darkMode);
  }

  function handleFileUpload(event) {
    const uploadedFile = event.target.files[0];
    setNewFile(uploadedFile);
  }

  function handleFileDrop(event) {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setNewFile(droppedFiles[0]);
  };

  function setNewFile(file) {
    if (/\.(jpe?g|png)$/i.test(file.name) === true) {
      setFileIsValid(true);
      setFile(URL.createObjectURL(file));
    } else {
      setFileIsValid(false);
    }
  }

  return (
    <div ref={fullscreenRef} className={`flex flex-col ${darkMode == true ? "dark bg-background" : "bg-foreground/10"}`}>
      <nav className={`flex z-50 flex-row justify-between items-center px-5 py-3 ${isFullscreen ? "absolute top-1 left-1 w-full rounded-lg bg-foreground/40 lg:w-1/3 xl:w-1/4" : "bg-foreground"}`}>
        <div className="flex relative justify-center items-center">
          <div onClick={() => setAboutMenuOpen(!aboutMenuOpen)} className="inline-flex items-center space-x-2 group hover:cursor-pointer">
            <Image
              className={`h-min ${isFullscreen ? "opacity-70" : ""}`}
              src="/logo-icon.png"
              alt="Logo"
              width={22}
              height={22}
              priority
            />
            <span className={`font-bold transition-colors duration-300 ease-in-out group-hover:text-white ${aboutMenuOpen == true ? "text-accent" : "text-gray"}`}>Reference8</span>
          </div>
          {aboutMenuOpen && <AboutDropDownMenu items={aboutMenuItemsConst}></AboutDropDownMenu>}
        </div>

        <div className="flex flex-row space-x-4">
          <div className="flex relative">
            <IconDropDownButton Icon={ShadowInnerIcon} active={imageFiltersMenuOpen} onClick={() => setImageFiltersMenuOpen(!imageFiltersMenuOpen)}>
            </IconDropDownButton>
            {imageFiltersMenuOpen && <ImageFiltersDropDownMenu items={imageFiltersConst} selected={imageFilters} onClick={handleSetImageFilters}></ImageFiltersDropDownMenu>}
          </div>
          <div className="flex relative">
            <IconDropDownButton Icon={gridModesConst[gridMode].icon} active={gridModeMenuOpen} onClick={() => setGridModeMenuOpen(!gridModeMenuOpen)}>
            </IconDropDownButton>
            {gridModeMenuOpen && <DropDownMenu items={gridModesConst} selected={gridMode} onClick={handleSetGridMode}></DropDownMenu>}
          </div>
        </div>

        <div className="flex flex-row space-x-4">
          <hr className="border-white" />
          <IconButton onClick={handleSetToggleDarkMode}>
            {darkMode ? <SunIcon className="w-5 h-5"></SunIcon> : <MoonIcon className="w-5 h-5"></MoonIcon>}
          </IconButton>
          <IconButton disabled={fileIsValid !== true} onClick={toggleFullscreen}>
            {isFullscreen ? <ExitFullScreenIcon className="w-5 h-5"></ExitFullScreenIcon> : <EnterFullScreenIcon className="w-5 h-5"></EnterFullScreenIcon>}
          </IconButton>
        </div>
      </nav>

      <main id="main" className={`flex justify-center items-center py-6 ${isFullscreen ? "fullscreen" : ""}`}>
        {file == null ? <UploadArea fileIsValid={fileIsValid} onFileUpload={handleFileUpload} onFileDrop={handleFileDrop}></UploadArea> :
          <ImageCanvas file={file} imageFilters={imageFilters} gridMode={gridMode}></ImageCanvas>}
      </main>
    </div>
  );
}
