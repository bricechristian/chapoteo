"use client";

import { useState, useEffect } from "react";

import Card from "./Card";
import Spinner from "../../../public/spinner.svg";

function shuffle(arra1) {
	var ctr = arra1.length,
		temp,
		index;
	while (ctr > 0) {
		index = Math.floor(Math.random() * ctr);
		ctr--;
		temp = arra1[ctr];
		arra1[ctr] = arra1[index];
		arra1[index] = temp;
	}
	return arra1;
}

const CardList = ({ data }) => {
	const [loading, setLoading] = useState(true);
	const [activeIndex, setActiveIndex] = useState(1);
	const [words, setWords] = useState([]);
	const [shuffled, setShuffled] = useState(false);
	const handleShuffleCards = () => {
		setShuffled(true)
		const shuffledWords = shuffle([...words]);
		setWords(shuffledWords);
		setActiveIndex(1);
		setTimeout(() => {
			setShuffled(false)
		}, 300);
	};
	const handleResetCards = () => {
		setWords(data);
		setActiveIndex(1);
	};
	useEffect(() => {
		if(localStorage.getItem("chapoteo") !== null && localStorage.getItem("chapoteo").length > 3){
			setWords(JSON.parse(localStorage.getItem("chapoteo")));
			setActiveIndex(Number(localStorage.getItem("chapoteo_active")))
		} else {
			setWords(data)
			localStorage.setItem("chapoteo", JSON.stringify(data));
		}
		setLoading(false)
	}, [])
	useEffect(() => {
		localStorage.setItem("chapoteo", JSON.stringify(words));
		localStorage.setItem("chapoteo_active", activeIndex);
		// console.log(JSON.parse(localStorage.getItem("chapoteo")))
	}, [activeIndex, shuffled])

	return (
		<section className="flex-grow flex">
			<div className="container flex-grow flex">
				<div className={`relative flex-grow flex items-center${loading ? " justify-center" : ""}`}>
					{loading ? (
						<Spinner className="animate-spin h-5 w-5 text-black" />
					) : words.slice(0, activeIndex + 3).map((item, index) => {
						return (
							<Card
								key={item.rank}
								words={words}
								shuffled={shuffled}
								handleShuffleCards={handleShuffleCards}
								handleResetCards={handleResetCards}
								cards={data.length}
								cardIndex={index + 1}
								data={item}
								activeIndex={activeIndex}
								setActiveIndex={setActiveIndex}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default CardList;
