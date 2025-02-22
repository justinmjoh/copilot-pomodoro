// This is the main component of the Pomodoro Timer.
// It uses useState, useEffect, useRef, and useCallback.
// It imports TImerDisplay, Controls, LengthSetting, and Alert
// The states include seesionLength, breakLength, currentMode, prevModeRef, currentTime, isRunning, and showAlert.
// The default session length is 25 minutes, the break length is 5 minutes, and the default mode is session.

'use client'
import React, { useState, useEffect, useRef, useCallback, use } from "react";

import TimerDisplay from "./TimerDisplay";
import Controls from "./Controls";
import LengthSetting from "./LengthSetting";
import Alert from "./Alert";

const PomodoroTimer: React.FC = () => {
    const [sessionLength, setSessionLength] = useState(25); // in seconds
    const [breakLength, setBreakLength] = useState(5); // in seconds
    const [currentMode, setCurrentMode] = useState<"session" | "break">("session");
    const prevModeRef = useRef<"session" | "break">("session");
    const [currentTime, setCurrentTime] = useState(sessionLength * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setCurrentTime((prevTime) => {
                if (prevTime === 0) {
                    setShowAlert(true);
                    setIsRunning(false);
                    switchMode();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning, currentMode, sessionLength, breakLength]);

    useEffect(() => {
        prevModeRef.current = currentMode;
    }, [currentMode]);

    const switchMode = useCallback(() => {
        const newMode = currentMode === "session" ? "break" : "session";
        const nextTime = (newMode === "session" ? sessionLength : breakLength) * 60; 
        setCurrentMode(newMode);
        setCurrentTime(nextTime);
    }, [sessionLength, breakLength]);

    const handleStartStop = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
        showAlert && setShowAlert(false);
    }
    const handleReset = () => {
        setIsRunning(false);
        setCurrentMode("session");
        setCurrentTime(sessionLength * 60);
        setSessionLength(25);
        setBreakLength(5);
        setShowAlert(false);
    }

    const handleClose = () => {
        setShowAlert(false);
    }

    const getAlertMessage = () => {
        const previousMode = prevModeRef.current;
        const previousModeComplete = previousMode === "session" ? "Time for a break!" : "Back to work!";
        return previousModeComplete;
    }

    const adjustLength = (type: "session" | "break", adjustment: number) => {
        if (type === "session") {
            setSessionLength((prev) => Math.max(1, Math.min(60, prev + adjustment)));
            if (currentMode === "session" && !isRunning) {
                setCurrentTime((sessionLength + adjustment) * 60);
            }
        } else {
            setBreakLength((prev) => Math.max(1, Math.min(30, prev + adjustment)));
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            {showAlert && <Alert message={getAlertMessage()} onClose={handleClose} />}
            <TimerDisplay time={currentTime} mode={currentMode} />
            <Controls isRunning={isRunning} onStartPause={handleStartStop} onReset={handleReset} />
            <div className="mt-6 grid grid-cols-2 gap-4">
                <LengthSetting
                    title="Session Length"
                    length={sessionLength}
                    onIncrease={() => adjustLength("session", 1)}
                    onDecrease={ () => adjustLength("session", -1)}
                    isDisabled={isRunning}
                />
                <LengthSetting
                    title="Break Length"
                    length={breakLength}
                    onIncrease={() => adjustLength("break", 1)}
                    onDecrease={ () => adjustLength("break", -1)}
                    isDisabled={isRunning}
                />
            </div>
        </div>
    );
}

export default PomodoroTimer;