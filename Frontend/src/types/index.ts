export type ClusterData = {
	clusters: string[][];
	ratio: number[][];
	message?: string;
	error?: string;
};

export type User = {
	id: number;
	profile_image_url: string;
	email: string;
	username: string;
};
export interface WidgetPaneProps {
	clusterData: ClusterData;
	colorCount: number;
	setColorCount: React.Dispatch<React.SetStateAction<number>>;
}
export type Palette = {
	id: number | null;
	date: string;
	name: string;
	clusterData: ClusterData;
	imageUrl: string | null;
};

export interface ImageFormProps {
	url: string;
	onSubmit: (
		event: React.FormEvent<HTMLFormElement>, // Use HTMLFormElement here
		imgFile: File | null,
		url: string
	) => void;
	onClose?: () => void;
	onSuccess?: () => void;
}

export interface ImagePaneProps {
	uploadedImage: string | null;
	className?: string;
}

export interface FormFieldProps {
	label: string;
	type:
		| "text"
		| "email"
		| "password"
		| "number"
		| "date"
		| "url"
		| "tel"
		| "search"
		| "color";
	required: boolean;
	id: string;
}

export interface AuthFormProps {
	formType: string;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
	children: React.ReactNode;
}

export interface AppContextType {
	imageProcessorEndpoint: string;
	activePalette: Palette | null;
	setActivePalette: React.Dispatch<React.SetStateAction<Palette | null>>;
	activeImageUrl: string | null;
	setActiveImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	showModal: boolean;
	modalContent: React.ReactNode;
	setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}
