import { ImageSlider } from "./ImageSlider";

// Data
const SliderData = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1617107374365-442a6876ed0a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
        description: "Image 1"
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1617033332334-1e51884abd51?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
        description: "Image 2"
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1617118658610-916b54a8c334?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        description: "Image 3"
    },
    {
        id: 4,
        image:
            "https://images.unsplash.com/photo-1593642532400-2682810df593?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        description: "Image 4"
    }
];

// Component
export const ImageSliderDemo = () => {
    return <ImageSlider imagesData={SliderData} />;
};

// Types
export type SliderDataType = typeof SliderData;
