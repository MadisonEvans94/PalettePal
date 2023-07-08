import React from "react";

function PaletteViewLayout({ children }) {
	return (
		<div className="h-screen w-screen overflow-auto fixed overscroll-none">
			<div className="overscroll-y-none w-full h-full overflow-auto flex flex-col items-center justify-start md:justify-center bg-[#0f0f0f]">
				<div className="mx-auto max-w-7xl border w-full">
					<div className="grid grid-cols-2 gap-4 p-4">
						{children[0]}
						{children[1]}
					</div>
					{children[2]}
					{children[3]}
					{children[4]}
				</div>
			</div>
		</div>
	);
}

export default PaletteViewLayout;
