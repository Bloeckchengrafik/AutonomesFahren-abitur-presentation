import {useState} from "react"
import Intro from "../Intro.tsx"
import {Button} from "../ui/button.tsx";
import {useStep1, validateStep1, Step1GetPersonalInfo} from "@/components/surveyengine/steps/step1.tsx";
import {useStep2, validateStep2, Step2Advantages} from "@/components/surveyengine/steps/step2.tsx";

const MAX_STEP = 4

function NextStepButton({setStep, validate}: { setStep: () => void, validate: () => boolean }) {
    if (!validate()) {
        return <div className="mt-8 flex justify-center">
            <Button onClick={() => {
            }} disabled={true}>Weiter</Button>
        </div>
    }
    return <div className="mt-8 flex justify-center">
        <Button onClick={() => setStep()}>Weiter</Button>
    </div>
}

function RenderStep({step, setStep}: { step: number, setStep: (n: number) => void }) {
    const step1State = useStep1()
    const step2State = useStep2()

    switch (step) {
        case 0:
            return <>
                <Intro/>
                <NextStepButton setStep={setStep.bind(null, 1)} validate={() => true}/>
            </>
        case 1:
            return <>
                <Step1GetPersonalInfo/>
                <NextStepButton setStep={setStep.bind(null, 2)} validate={validateStep1.bind(null, step1State)}/>
            </>
        case 2:
            return <>
                <Step2Advantages/>
                <NextStepButton setStep={setStep.bind(null, 3)} validate={validateStep2.bind(null, step2State)}/>
            </>
        default:
            return <>
                Step ID undefined! <br/>
                Data: <br/>
                step1: {JSON.stringify(step1State)}
                <br/>
                step2: {JSON.stringify(step2State)}
            </>
    }
}

function StepBar({step}: { step: number }) {
    const stepPercent = step / MAX_STEP * 100
    return <div className="absolute top-0 left-0 w-full h-1">
        <div className="bg-primary h-full w-1/5 transition-all" style={{width: `${stepPercent}%`}}/>
    </div>
}

function CurrentStep() {
    const [step, setStep] = useState(0)

    return <>
        <StepBar step={step}/>
        <div className="w-full">
            <RenderStep step={step} setStep={setStep}/>
        </div>
    </>
}

export default CurrentStep