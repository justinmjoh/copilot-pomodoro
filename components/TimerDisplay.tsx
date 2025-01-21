import React from "react";

interface TimerDisplayProps {
    time: number;
    mode: "session" | "break";
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, mode }) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className="text-center">
            <h1 className="text-4xl text-gray-800 font-bold mb-5">{mode === "session" ? "Session" : "Break"}</h1>
            <p className="text-6xl text-gray-800 mb-5">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
        </div>
    );
};

export default TimerDisplay;