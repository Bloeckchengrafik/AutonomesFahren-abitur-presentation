import {create} from "zustand"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {SliderInput} from "@/components/surveyengine/SliderInput.tsx";
import {useStep1} from "@/components/surveyengine/steps/step1.tsx";
import {Input} from "@/components/ui/input.tsx";
import {LOCALE} from "@/lib/locales.ts";

interface Step2State {
    q1: number | null,
    q2: number | null,
    q3: number | null,
    q4: number | null,

    setQ1Result: (n: number) => void,
    setQ2Result: (n: number) => void,
    setQ3Result: (n: number) => void,
    setQ4Result: (n: number) => void,
}

export const useStep2 = create<Step2State>((set) => ({
    q1: null,
    q2: null,
    q3: null,
    q4: 0,

    setQ1Result: (n: number) => {
        set((state) => ({...state, q1: n}))
    },
    setQ2Result: (n: number) => {
        set((state) => ({...state, q2: n}))
    },
    setQ3Result: (n: number) => {
        set((state) => ({...state, q3: n}))
    },
    setQ4Result: (n: number) => {
        set((state) => ({...state, q4: n}))
    },
}))

export function validateStep2(state: Step2State): boolean {
    return !!state.q1 && !!state.q2 && !!state.q3
}


export function Step2Advantages() {
    const data = useStep2()
    const state1 = useStep1()
    return <div className="mt-8 flex justify-center">
        <div className="w-full">
            <Card className="border-neutral-700">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {LOCALE["2-survey-benefits"]}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SliderInput
                        label={LOCALE["2-survey-q1-label"]}
                        best={LOCALE["2-survey-q1-best"]}
                        worst={LOCALE["2-survey-q1-worst"]}
                        onChange={data.setQ1Result}
                    />

                    {state1.hasChildren && <>
                        <h1 className="text-lg font-medium">
                            {LOCALE["2-survey-q4-label"]}
                        </h1>
                        <Input type="number" placeholder="0" min={0} max={17}
                               defaultValue="0"
                               onChange={(e) => data.setQ4Result(parseInt(e.target.value))}
                        />
                        <br/>
                    </>}

                    <SliderInput
                        label={LOCALE["2-survey-q2-label"]}
                        best={LOCALE["2-survey-q2-best"]}
                        worst={LOCALE["2-survey-q2-worst"]}
                        onChange={data.setQ2Result}
                    />

                    <SliderInput
                        label={LOCALE["2-survey-q3-label"]}
                        best={LOCALE["2-survey-q3-best"]}
                        worst={LOCALE["2-survey-q3-worst"]}
                        onChange={data.setQ3Result}
                    />
                </CardContent>
            </Card>
        </div>
    </div>
}

