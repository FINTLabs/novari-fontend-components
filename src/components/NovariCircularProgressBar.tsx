type props = {
    maxValue: number;
    value: number;
};

export default function CircularProgressBar({maxValue, value}: props) {

    const currentValue: number = Math.floor((value / maxValue) * 100);
    const circumference: number = 2 * Math.PI * 56;
    const valueOffset: number = circumference * (1 - (value / maxValue));

    const firstColor: string = "#6B133D"
    const secondColor: string = "#7F78E8"

    return (
        <div className={"h-32 w-32 relative"}>
            <div className={"h-32 w-32 rounded-full p-4"}
                 style={{
                     boxShadow: "2px 2px 6px -1px #6B133D",
                 }}
            >
                <div className={"h-24 w-24 rounded-full flex items-center justify-center"}
                     style={{
                         boxShadow: "inset 2px 2px 6px -1px #7F78E8",
                     }}
                >
                    <p className={"text-3xl pl-2"}>{currentValue}%</p>
                </div>
            </div>
            <svg xmlns={"https://www.w3.org/200/svg"} version={"1.1"} width={"128px"} height={"128px"}
                 className={"absolute top-0 left-0"}>
                <defs>
                    <linearGradient id={"CircularProgressBarGradient"}>
                        <stop offset={"0%"}
                              stopColor={firstColor}/>
                        <stop offset={"100%"}
                              stopColor={secondColor}/>
                    </linearGradient>
                </defs>
                <g transform="scale(-1,1) translate(-128,0)">
                    <circle cx="64" cy="64" r="56" strokeLinecap={"round"} fill={"none"}
                            stroke="url(#CircularProgressBarGradient)"
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
