// ./types/index.ts

export type PixelData = any[]; // Replace 'any' with a more specific type if possible

export type ImageFile = File | null;

export interface CentroidContextType {
	centroidArray: any[]; // Again, use a more specific type if applicable
	setCentroidArray: React.Dispatch<React.SetStateAction<any[]>>; // Replace 'any[]' with the type of your centroid array
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
