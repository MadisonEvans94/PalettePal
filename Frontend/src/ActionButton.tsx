import React from "react";
interface ButtonComponent {
	label: string;
	onClick(): React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ActionButton: React.FC<ButtonComponent> = ({ label, onClick }) => {
	return <div onClick={onClick}>{label}</div>;
};

export default ActionButton;
