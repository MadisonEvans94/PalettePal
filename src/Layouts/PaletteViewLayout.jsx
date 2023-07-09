import React from "react";

function PaletteViewLayout({ children }) {
	return (
		<div className="h-full w-full overflow-auto flex flex-col items-center justify-start md:justify-center bg-gray-800 pt-16">
			<div className="mx-auto max-w-7xl border w-full ">
				<div className="grid grid-cols-2 gap-4 p-4 ">
					{children[0]}
					{children[1]}
				</div>
				<div className="">
					{children[2]}
					{children[3]}
					{children[4]}
				</div>
			</div>
		</div>
	);
}

export default PaletteViewLayout;
