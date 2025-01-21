import React from "react";
import Button from "./Button";

interface LengthSettingProps {
    title: string;
    length: number;
    onIncrease: () => void;
    onDecrease: () => void;
    isDisabled: boolean;
}

// uses variant instead of style

const LengthSetting: React.FC<LengthSettingProps> = ({
    title,
    length,
    onIncrease,
    onDecrease,
    isDisabled
}) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="flex justify-center items-center space-x-4">
                <Button 
                    onClick={onDecrease} 
                    variant="default"
                    disabled={isDisabled}
                >
                    -
                </Button>
                <span className="text-lg">{length}</span>
                <Button 
                    onClick={onIncrease} 
                    variant="default"
                    disabled={isDisabled}
                >
                    +
                </Button>
            </div>
        </div>
    );
};

export default LengthSetting;