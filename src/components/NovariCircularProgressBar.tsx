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

    // Handle division by zero when maxValue is 0
    const currentValue: number = maxValue === 0 ? 0 : Math.floor((value / maxValue) * 100);
    const circumference: number = 2 * Math.PI * 56;
    const valueOffset: number = maxValue === 0 ? circumference : circumference * (1 - (value / maxValue));

    const innerShadow = () => `inset 2px 2px 6px -1px ${firstColor}`
    const outerShadow = () => `2px 2px 6px -1px ${secondColor}`

    return (
        <div style={{
            position: "relative",
            height: "128px",
            width: "128px",
        }}>
            <div style={{
                     borderRadius: "100%",
                     boxShadow: outerShadow(),
                     padding: "16px",
                     height: "128px",
                     width: "128px",
                 }}
            >
                <div style={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                         borderRadius: "100%",
                         boxShadow: innerShadow(),
                         height: "96px",
                         width: "96px",
                     }}
                >
                    <p style = {{
                            fontSize: "32px",
                            paddingLeft: "8px",
                    }}
                    >{currentValue}%</p>
                </div>
            </div>
            <svg xmlns={"https://www.w3.org/200/svg"} version={"1.1"} width={"128px"} height={"128px"}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
            >
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
                            strokeDasharray={circumference}
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