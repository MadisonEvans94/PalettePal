export type ClusterData = {
	clusters: string[][];
	ratio: number[][];
};

export type User = {
	id: number;
	profile_image_url: string;
	email: string;
	username: string;
};

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
		event: React.FormEvent,
		imgFile: File | null,
		url: string
	) => void;
	onClose: () => void;
	onSuccess?: () => void;
}

export interface ImagePaneProps {
	uploadedImage: string | null;
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
}
