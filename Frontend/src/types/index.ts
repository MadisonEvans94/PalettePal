// ./types/index.ts

export type PixelData = any[]; // Replace 'any' with a more specific type if possible

export type ImageFile = File | null;

// types.ts
export interface ColorClusters {
	[key: number]: string[]; // key is the cluster quantity, value is an array of color strings
}

export interface CentroidContextType {
	centroidArray: {
		colors: ColorClusters;
		// ... any other properties of centroidArray
	};
	// You can also add any other state or functions that you want to provide through the context
}

export interface LandingProps {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setPixelData: React.Dispatch<React.SetStateAction<PixelData>>;
	setImgFile: React.Dispatch<React.SetStateAction<ImageFile>>;
	imgFile: ImageFile;
}

export interface ContentSectionProps {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	pixelData: PixelData;
	setPixelData: React.Dispatch<React.SetStateAction<PixelData>>;
	imgFile: ImageFile;
	setImgFile: React.Dispatch<React.SetStateAction<ImageFile>>;
}
