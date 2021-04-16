import * as React from "react";

export function SvgArrowLeft(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            id="ArrowLeft"
            xmlns="http://www.w3.org/2000/svg"
            x={0}
            y={0}
            width={30}
            height={30}
            viewBox="0 0 306 306"
            xmlSpace="preserve"
            {...props}
        >
            <path d="M247.35 35.7L211.65 0l-153 153 153 153 35.7-35.7L130.05 153z" />
        </svg>
    );
}
