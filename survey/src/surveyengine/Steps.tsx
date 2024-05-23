import { useState } from "react"
import Intro from "../components/Intro"
import {Button} from "../components/ui/button";

function Step1GetPersonalInfo() {
    return <></>
}

function CurrentStep() {
  const [step, setStep] = useState(0)

    switch (step) {
        case 0:
            return <>
                <Intro />

                <div className="mt-8 flex justify-center">
                    <Button onClick={() => setStep(1)}>Weiter</Button>
                </div>
            </>
        case 1:
        return <Step1GetPersonalInfo />
        default:
        return <>Step ID undefined!</>
    }
}

export default CurrentStep