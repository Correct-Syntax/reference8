"use client";

import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

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

export default function ImageCanvas({ file, imageFilters }) {
    // List containing the one/two filter ids that are active.
    var activeIds = [];
    for (var i = 0; i < imageFilters.length; i++) {
        if (imageFilters[i] == true) {
            activeIds.push(i);
        }
    }
    return (
        <div id="imageCanvas" className="w-auto">
            {imageFilters.filter(i => i == true).length > 1 ?
                <ImgComparisonSlider className="mt-[0.35rem]">
                    <img className={filterClassFromId(activeIds[0])} slot="first" src={file} />
                    <img className={filterClassFromId(activeIds[1])} slot="second" src={file} />
                    <div slot="handle" className="inline-flex">
                        <ChevronLeftIcon className="w-8 h-8 text-white"></ChevronLeftIcon>
                        <ChevronRightIcon className="w-8 h-8 text-white"></ChevronRightIcon>
                    </div>
                </ImgComparisonSlider> : <img src={file} />}
        </div>
    );
}