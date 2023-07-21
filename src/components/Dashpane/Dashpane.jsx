import React, { useState } from "react";
import PaletteCard from "../PaletteCard/PaletteCard";
import { useContext, useEffect } from "react";
import { AccountContext } from "../Account";

const EmptyPaletteState = () => {
	return (
		<div className="flex justify-center">
			<div className="flex flex-col items-center p-4 text-center border-2 border-dashed rounded-lg border-shade w-96">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-24 h-24"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						fill="#A0AEC0"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
						clipRule="evenodd"
					/>
				</svg>
				<p className="text-2xl text-shade">No Palettes</p>
				<p className="my-4 text-sm text-shade">
					Get started by adding a new image from the navbar
				</p>
			</div>
		</div>
	);
};
const Dashpane = () => {
	const { tokens, userData, getSession } = useContext(AccountContext);
	const [palettes, setPalettes] = useState(null);

	const handleDeletePalette = (paletteId) => {
		setPalettes((prevPalettes) =>
			prevPalettes.filter((palette) => palette.imageId !== paletteId)
		);
	};

	const fetchPalettes = async (userData, tokens) => {
		try {
			console.log("INSIDE THE fetchPalettes FUNCTION", userData, tokens);
			getSession();

			const response = await fetch(
				`https://du65t1mu0a.execute-api.us-east-2.amazonaws.com/production/palette-pal-image-CRUD`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						userid: userData.username,
						Authorization: tokens,
					},
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			console.log(data, "RETURN FROM fetchPalettes...");
			setPalettes(data);
		} catch (error) {
			console.error("Fetch palettes error:", error);
		}
	};

	useEffect(() => {
		console.log("tokens \n\n -------------- \n\n", tokens);
		console.log("userData \n\n -------------- \n\n", userData);
		if (tokens && userData) {
			fetchPalettes(userData, tokens);
		} else {
			console.log("Palettes never fetched ");
		}
	}, [tokens, userData]);

	return (
		<div className="w-full p-10">
			<h1 className="text-primary text-[72px] my-8">Your Saved Palettes</h1>
			<div className="pb-6 grid sm:grid-cols-1 lg:grid-cols-2 ">
				{palettes && palettes.length > 0 ? (
					palettes.map((palette, id) => {
						return (
							<PaletteCard
								palette={palette}
								userData={userData}
								tokens={tokens}
								key={id}
								onDelete={handleDeletePalette}
							/>
						);
					})
				) : (
					<EmptyPaletteState />
				)}
			</div>
		</div>
	);
};

export default Dashpane;
