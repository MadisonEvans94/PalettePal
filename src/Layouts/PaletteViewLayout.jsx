import React from "react";

function PaletteViewLayout({ children }) {
	return (
		<div className="h-screen w-screen overflow-auto fixed overscroll-none">
			<div className="overscroll-y-none w-full h-full overflow-auto flex flex-col items-center justify-start md:justify-center bg-[#0f0f0f]">
				<div className="mx-auto max-w-7xl p-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaletteViewLayout;
