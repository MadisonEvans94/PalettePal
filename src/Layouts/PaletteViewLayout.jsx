import React from "react";

function PaletteViewLayout({ children }) {
	return (
		<div className="flex flex-col items-center justify-start w-full h-full pt-16 overflow-auto md:justify-center">
			<div className="w-full pt-24 mx-auto max-w-7xl">
				<div className="grid grid-cols-2 gap-4 p-4 ">
					{children[0]}
					{children[1]}
				</div>
				<div>
					{children[2]}
					{children[3]}
					<div className="mt-2 grid mx-auto grid-cols-2 gap-3 items-center justify-center w-[400px]">
						{children[4]}
						{children[5]}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaletteViewLayout;
