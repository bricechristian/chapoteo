"use client";

import { useState } from "react";

import Card from "./Card";

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
	const [activeIndex, setActiveIndex] = useState(1);
	const [words, setWords] = useState(data);
	const handleShuffleCards = () => {
		const shuffledWords = shuffle([...words]);
		setWords(shuffledWords);
		setActiveIndex(1);
	};

	return (
		<section className="flex-grow flex">
			<div className="container flex-grow flex">
				<div className="relative flex-grow flex items-center">
					{words.slice(0, activeIndex + 3).map((item, index) => {
						return (
							<Card
								words={words}
								handleShuffleCards={handleShuffleCards}
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
