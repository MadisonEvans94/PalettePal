export type ClusterData = {
	clusters: string[][];
	ratio: number[][];
};

// TODO: fix the redundancy
export type PaletteCardProps = {
	clusterData: ClusterData;
	imageUrl: string;
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
	uploadedImage: File | null;
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
