"use client";

import { ImgComparisonSlider } from "@img-comparison-slider/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";


function filterClassFromId(filterId) {
    switch (filterId) {
        case 0:
            return "";
        case 1:
            return "grayscale";
        case 2:
            return "high-contrast";
    }
}

function gridClassesFromId(gridModeId) {
    switch (gridModeId) {
        case 0:
            return "grid-none";
        case 1:
            return "grid-vertical";
        case 2:
            return "grid-horizontal";
        case 3:
            return "grid-thirds";
    }
}

export default function ImageCanvas({ file, imageFilters, gridMode, onFileDrop, isFullscreen }) {
    // List containing the one/two filter ids that are active.
    var activeIds = [];
    for (var i = 0; i < imageFilters.length; i++) {
        if (imageFilters[i] == true) {
            activeIds.push(i);
        }
    }
    var showSlider = imageFilters.filter(i => i == true).length > 1;
    return (
        <div onDrop={(event) => onFileDrop(event)} onDragOver={(event) => event.preventDefault()} id="imageCanvas" className={`relative w-auto grid-overlay ${gridClassesFromId(gridMode)} ${isFullscreen == true ? "fs" : ""}`}>
            <div id="horizontalTop" className="absolute z-40 w-full h-[1px] bg-white/50"></div>
            <div id="horizontalBottom" className="absolute z-40 w-full h-[1px] bg-white/50"></div>
            <div id="verticalLeft" className="absolute z-40 w-[1px] h-full bg-white/50"></div>
            <div id="verticalRight" className="absolute z-40 w-[1px] h-full bg-white/50"></div>

            {showSlider ?
                <ImgComparisonSlider className="slider">
                    <img className={filterClassFromId(activeIds[0])} slot="first" src={file} alt={file.name} />
                    <img className={filterClassFromId(activeIds[1])} slot="second" src={file} alt={file.name} />
                    <div slot="handle" className="inline-flex">
                        <ChevronLeftIcon className="w-6 h-6 text-white/60"></ChevronLeftIcon>
                        <ChevronRightIcon className="w-6 h-6 text-white/60"></ChevronRightIcon>
                    </div>
                </ImgComparisonSlider> : <img className={filterClassFromId(activeIds[0])} src={file} alt={file.name} />}
        </div>
    );
}