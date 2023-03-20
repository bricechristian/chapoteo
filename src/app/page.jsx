import Image from "next/image";

import {
	ArrowRightIcon,
	ArrowLeftIcon,
	RectangleStackIcon,
} from "@heroicons/react/24/solid";

import data from "../../public/vocab.json";
import ClientScripts from "./components/ClientScripts";
import CardList from "./components/CardList";

const Home = () => {
	return (
		<main className="relative">
			<h1 className="title headline-stroke absolute inset-x-0 top-4 text-center">
				Chapoteo (Splash)
			</h1>
			<CardList data={data.words} />
			<div className="px-6 absolute bottom-4 inset-x-0 mx-auto">
				<ol className="instructions flex flex-col items-center justify-center text-center list-inside">
					<li className="list-decimal">
						Click a card's word to flip it to reveal the
						English/Spanish word.
					</li>
					<li className="list-decimal">
						Click{" "}
						<ArrowRightIcon className="w-4 inline-flex relative bottom-px" />{" "}
						to move to the next card.
					</li>
					<li className="list-decimal">
						Click{" "}
						<ArrowLeftIcon className="w-4 inline-flex relative bottom-px" />{" "}
						to move to the previous card.
					</li>
					<li className="list-decimal">
						Click{" "}
						<RectangleStackIcon className="w-4 inline-flex relative bottom-px" />{" "}
						to shuffle the cards and start over.
					</li>
				</ol>
			</div> 
			<ClientScripts />
		</main>
	);
};

export default Home;
