import React from "react";

function PaletteViewLayout({ children }) {
	return (
		<div className="h-full w-full overflow-auto flex flex-col items-center justify-start md:justify-center bg-gray-800 pt-16">
			<div className="mx-auto max-w-7xl w-full ">
				<div className="grid grid-cols-2 gap-4 p-4 ">
					{children[0]}
					{children[1]}
				</div>
				<div className="">
					{children[2]}
					{children[3]}
					<div className="mt-5 grid mx-auto grid-cols-2 gap-3 items-center justify-center w-[400px]">
						{children[4]}
						{children[5]}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaletteViewLayout;
