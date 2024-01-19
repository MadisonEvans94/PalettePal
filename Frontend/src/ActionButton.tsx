import React from "react";
interface ButtonComponent {
	label: string;
	className: string;
	onClick(): React.MouseEventHandler<HTMLDivElement> | undefined | void;
}

const ActionButton: React.FC<ButtonComponent> = ({
	label,
	onClick,
	className,
}) => {
	return (
		<button onClick={onClick} className={className}>
			{label}
		</button>
	);
};

export default ActionButton;
