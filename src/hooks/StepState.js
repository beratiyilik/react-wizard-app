import { useState } from "react";

const StepState = ({ initial = 0, min = null, max = null }) => {
    const [currentStep, setCurrentStep] = useState(initial);
    const increment = () => (max != null && currentStep + 1 > max) ? setCurrentStep(currentStep) : setCurrentStep(currentStep + 1);
    const decrement = () => (min != null && currentStep -1 < min) ? setCurrentStep(currentStep) : setCurrentStep(currentStep - 1);
    return { currentStep, decrement, increment };
};

export default StepState;