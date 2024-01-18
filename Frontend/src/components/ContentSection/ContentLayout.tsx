import React from "react";
// FIXME:
interface ContentLayoutProps {
	children: any;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
	return (
		<div className="fixed w-screen h-screen flex flex-col">
			<div className="flex-1 grid grid-cols-1 gap-4">
				{React.Children.map(children, (child, index) => {
					// If this is the last child, give it a class that takes up 40% of the screen
					const className =
						index === React.Children.count(children) - 1
							? "h-40v"
							: "flex-1";

					return <div className={className}>{child}</div>;
				})}
			</div>
		</div>
	);
};

export default ContentLayout;
