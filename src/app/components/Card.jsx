"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon, RectangleStackIcon } from '@heroicons/react/24/solid'

const Card = ({ cards, data,  cardIndex, handleShuffleCards, activeIndex, setActiveIndex }) => {
	const [flipped, setFlipped] = useState(false);
	return (
		<div
			className={`card transition-smooth${flipped ? " -scale-x-100" : ""}${cardIndex < activeIndex ? " translate-y-12 invisible pointer-events-none" : ""}${cardIndex === activeIndex + 1 ? " scale-[.97] -translate-y-4" : ""}${cardIndex === activeIndex + 2 ? " scale-[.94] -translate-y-8" : ""}${cardIndex === activeIndex + 3 ? " scale-[.91] -translate-y-12" : ""}`}
			key={data.rank}
			style={{ zIndex: cards - cardIndex }}
			>
            <div className={`caps flex w-full justify-end p-4 transition${flipped ? " opacity-0": ""}`}>
                <span className="inline-block">({cardIndex < 10 ? "0" : ""}{cardIndex}/{cards})</span>
            </div>                
			<div className="relative flex justify-center w-full text-center p-10" onClick={() => setFlipped(!flipped)}>
				<div className="headline">
					<span
						className={`inline-block transition ${
							flipped ? "opacity-0" : "opacity-100"
						}`}>
						{data.targetWord}
					</span>
					<span
						className={`inline-block -scale-x-100 absolute inset-x-0 transition ${
							flipped ? "opacity-100" : "opacity-0"
						}`}>
						{data.englishWord}
					</span>
				</div>
			</div>
            <div className="caps flex justify-between w-full p-4">
                <span className={`relative inline-block group transition${flipped ? " opacity-0": ""}`} onClick={() => setActiveIndex(activeIndex > 1 ? activeIndex-1 : 1)}>
                    <ArrowLeftIcon className={`w-7${activeIndex > 1 ? " cursor-pointer transition supports-hover:hover:scale-90" : " opacity-30"}`} />
                    <span className={`caps-12 absolute top-0 invisible transition-smooth ${activeIndex > 1 ? " supports-hover:group-hover:visible supports-hover:group-hover:-translate-y-5" : ""}`}>Prev</span>
                </span>
                <span className={`relative inline-block group transition${flipped ? " opacity-0": ""}`} onClick={() => handleShuffleCards()}>
                    <RectangleStackIcon className={`w-7 cursor-pointer transition supports-hover:hover:scale-90`}/>
                    <span className={`caps-12 absolute top-0 invisible inset-x-0 mx-auto -ml-6  transition-smooth supports-hover:group-hover:visible supports-hover:group-hover:-translate-y-5`}>Shuffle</span>
                </span>
                <span className={`relative inline-block group cursor-pointer transition${flipped ? " opacity-0": ""}`} onClick={() => setActiveIndex(activeIndex+1)}>
                    <ArrowRightIcon className="w-7 transition supports-hover:hover:scale-90" />
                    <span className={`caps-12 absolute top-0 right-0 invisible transition-smooth supports-hover:group-hover:visible supports-hover:group-hover:-translate-y-5`}>Next</span>
                </span>
            </div>
		</div>
	);
};

export default Card;
