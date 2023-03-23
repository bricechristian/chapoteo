"use client";

import { useEffect, useState } from "react";
import {
	ArrowRightIcon,
	ArrowLeftIcon,
	RectangleStackIcon,
	SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { AudioPlayerProvider, useAudioPlayer } from "react-use-audio-player"
import Spinner from "../../../public/spinner.svg";
const AudioPlayer = ({ data, activeIndex } ) => {

	const [clicked, setClicked] = useState(false);
	const [initialLoad, setInitialLoad] = useState(false);
	const [sound, setSound] = useState("https://media.merriam-webster.com/audio/prons/es/me/mp3/c/como001sp.mp3");
	const [soundError, setSoundError] = useState("");

	const { togglePlayPause, ready, loading } = useAudioPlayer({
        src: sound,
        format: "mp3",
        autoplay: false,
        onend: () => {
			setClicked(false);
		}
    })

	const handleAudioClick = async () => {
		setClicked(true);
		setSoundError("")
		const response = await fetch(`/api/audio?word=${data.targetWord.toLowerCase()}`);
		if(response.ok){
			const audioData = await response.json();
			const { audioKey } = await audioData;
			setSound(`https://media.merriam-webster.com/audio/prons/es/me/mp3/${audioKey.slice(0,1)}/${audioKey}.mp3`);
		} else {
			setSoundError("Sorry, sound not available.")
		}
	}
	useEffect(() => {
		if(ready) {
			setInitialLoad(false);
		} else {
			setInitialLoad(true);
		}
	}, [ready])
	useEffect(() => {
		if(!loading && sound.length && clicked && ready) {
			togglePlayPause()
			setInitialLoad(false);
		}
	}, [loading, sound, ready, clicked])
	useEffect(() => {
		setSound("");
	}, [activeIndex])

    return (
		<span className={`inline-block p-4 cursor-pointer absolute z-10 top-0 left-0 transition supports-hover:hover:scale-90${soundError.length ? " pointer-events-none sm:max-w-[200px]" : ""}`} onClick={() => handleAudioClick()}>
			{soundError.length ? <span className="text-[10px]">{soundError}</span> : initialLoad ? <Spinner className="animate-spin h-5 w-5 text-black" /> : <SpeakerWaveIcon className={`w-6 relative z-10`} />  }
		</span>		
    )
}

const Card = ({
	cards,
	data,
	cardIndex,
	handleShuffleCards,
	activeIndex,
	setActiveIndex,
}) => {
	const [flipped, setFlipped] = useState(false);
	return (
		<AudioPlayerProvider>
			<div
				className={`card transition-smooth${
					flipped ? " -scale-x-100" : ""
				}${
					cardIndex < activeIndex
						? " translate-y-12 invisible pointer-events-none"
						: ""
				}${
					cardIndex === activeIndex + 1
						? " scale-[.97] -translate-y-4"
						: ""
				}${
					cardIndex === activeIndex + 2
						? " scale-[.94] -translate-y-8"
						: ""
				}${
					cardIndex === activeIndex + 3
						? " scale-[.91] -translate-y-12"
						: ""
				}`}
				key={data.rank}
				style={{ zIndex: cards - cardIndex }}>
				<div
					className={`caps flex w-full justify-end p-4 relative transition${
						flipped ? " opacity-0" : ""
					}${cardIndex > activeIndex ? " opacity-0" : ""}`}>
					<AudioPlayer data={data} activeIndex={activeIndex} />
					<span className="inline-block">
						({cardIndex < 10 ? "0" : ""}
						{cardIndex}/{cards})
					</span>

				</div>
				<div
					className={`relative flex justify-center w-full text-center p-10 pb-0${
						cardIndex > activeIndex ? " opacity-0" : ""
					}`}
					onClick={() => setFlipped(!flipped)}>
					<div className="headline cursor-pointer">
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
				<div
					className={`caps flex justify-between w-full p-4${
						cardIndex > activeIndex ? " opacity-0" : ""
					}`}>
					<span
						className={`z-10 relative -bottom-4 -left-4 p-6 inline-flex transition select-none${
							flipped ? " opacity-0" : ""
						}`}
						onClick={() =>
							setActiveIndex(activeIndex > 1 ? activeIndex - 1 : 1)
						}>
						<div className="relative inline-flex group items-center">
							<ArrowLeftIcon
								className={`w-7 -left-6 -bottom-6${
									activeIndex > 1
										? " cursor-pointer transition supports-hover:hover:scale-90"
										: " opacity-30"
								}`}
							/>
							<span
								className={`caps-12 absolute bottom-2 left-0 invisible transition-smooth ${
									activeIndex > 1
										? " supports-hover:group-hover:visible supports-hover:group-hover:-translate-y-5"
										: ""
								}`}>
								Prev
							</span>
						</div>
					</span>
					<span
						className={`p-6 absolute bottom-0 inset-x-0 mx-auto flex justify-center transition${
							flipped ? " opacity-0" : ""
						}`}>
						<div className="relative inline-flex group">
							<RectangleStackIcon
								className={`w-7 inline-flex mx-auto cursor-pointer transition select-none supports-hover:hover:scale-90`}
								onClick={() => handleShuffleCards()}
							/>
							<span
								className={`caps-12 absolute top-0 invisible inset-x-0 mx-auto -ml-6  transition-smooth supports-hover:group-hover:visible supports-hover:group-hover:-translate-y-5`}>
								Shuffle
							</span>
						</div>
					</span>
					<span
						className={`p-6 absolute bottom-0 right-0 inline-block group cursor-pointer transition select-none${
							flipped ? " opacity-0" : ""
						}`}
						onClick={() => setActiveIndex(activeIndex + 1)}>
						<ArrowRightIcon className="w-7 transition supports-hover:hover:scale-90" />
						<span
							className={`caps-12 absolute top-6 right-4 invisible transition-smooth supports-hover:group-hover:visible supports-hover:group-hover:-translate-y-5`}>
							Next
						</span>
					</span>
				</div>
			</div>
		</AudioPlayerProvider>
	);
};

export default Card;
