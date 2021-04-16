import * as React from "react";

export function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            id="ArrowRight"
            xmlns="http://www.w3.org/2000/svg"
            x={0}
            y={0}
            width={30}
            height={30}
            viewBox="0 0 306 306"
            xmlSpace="preserve"
            {...props}
        >
            <path d="M94.35 0l-35.7 35.7L175.95 153 58.65 270.3l35.7 35.7 153-153z" />
        </svg>
    );
}
