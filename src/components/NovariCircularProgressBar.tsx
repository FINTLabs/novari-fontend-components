import React, {useId} from "react";

export interface CircularProgressProps {
    maxValue: number;
    value: number;
    firstColor?: string;
    secondColor?: string;
}

export const NovariCircularProgressBar: React.FC<CircularProgressProps> =  ({
                                                                                maxValue,
                                                                                value,
                                                                                firstColor = "#7F78E8",
                                                                                secondColor = "#6B133D"
}) => {
    const uniqueId = useId();

    const currentValue: number = Math.floor((value / maxValue) * 100);
    const circumference: number = 2 * Math.PI * 56;
    const valueOffset: number = circumference * (1 - (value / maxValue));

    const innerShadow = () => `inset 2px 2px 6px -1px ${firstColor}`
    const outerShadow = () => `2px 2px 6px -1px ${secondColor}`

    return (
        <div className={"h-32 w-32 relative"}>
            <div className={"h-32 w-32 rounded-full p-4"}
                 style={{
                     boxShadow: outerShadow(),
                 }}
            >
                <div className={"h-24 w-24 rounded-full flex items-center justify-center"}
                     style={{
                         boxShadow: innerShadow(),
                     }}
                >
                    <p className={`text-3xl pl-2`}>{currentValue}%</p>
                </div>
            </div>
            <svg xmlns={"https://www.w3.org/200/svg"} version={"1.1"} width={"128px"} height={"128px"}
                 className={"absolute top-0 left-0"}>
                <defs>
                    <linearGradient id={uniqueId}>
                        <stop offset={"0%"}
                              stopColor={secondColor}/>
                        <stop offset={"100%"}
                              stopColor={firstColor}/>
                    </linearGradient>
                </defs>
                <g transform="scale(-1,1) translate(-128,0)">
                    <circle cx="64" cy="64" r="56" strokeLinecap={"round"} fill={"none"}
                            stroke={`url(#${uniqueId})`}
                            strokeDasharray={2 * Math.PI * 56}
                            strokeDashoffset={valueOffset}
                            strokeWidth={"16px"}
                            transform="rotate(-90 64 64)"
                    />
                </g>
            </svg>
        </div>
    )
}

export default NovariCircularProgressBar;