"use client";

import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export default function ImageCanvas({ file }) {
    return (
        <div className="w-auto">
            <ImgComparisonSlider class="slider">
                <img slot="first" src={file} />
                <img slot="second" src={file} />
                <div slot="handle" className="inline-flex">
                    <ChevronLeftIcon className="w-8 h-8 text-white"></ChevronLeftIcon>
                    <ChevronRightIcon className="w-8 h-8 text-white"></ChevronRightIcon>
                </div>
            </ImgComparisonSlider>
        </div>
    );
}