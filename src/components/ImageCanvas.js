"use client";

import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export default function ImageCanvas() {
    return (
        <div className="w-auto">
            <ImgComparisonSlider class="slider">
                <img slot="first" src="/img.jpg" />
                <img slot="second" src="/img.jpg" />
                <div slot="handle" className="inline-flex">
                    <ChevronLeftIcon className="w-8 h-8 text-white"></ChevronLeftIcon>
                    <ChevronRightIcon className="w-8 h-8 text-white"></ChevronRightIcon>
                </div>
            </ImgComparisonSlider>
        </div>
    );
}