import {create} from "zustand"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {SliderInput} from "@/components/surveyengine/SliderInput.tsx";
import {useStep1} from "@/components/surveyengine/steps/step1.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

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
    q4: null,

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
                        Vorteile und Nutzen
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SliderInput
                        label="Wie würden Sie sich fühlen, mit einem voll autonom betriebenen Auto zu fahren?"
                        best="Sehr Sicher"
                        worst="Sehr Unsicher"
                        onChange={data.setQ1Result}
                    />

                    {state1.hasChildren && <>
                        <Label>Ab welchem Alter würden Sie ihr Kind alleine mit einem voll autonom betriebenen Auto
                            fahren lassen?</Label>
                        <Input type="number" placeholder="0" min={0} max={17}
                               defaultValue="0"
                               onChange={(e) => data.setQ4Result(parseInt(e.target.value))}
                        />
                    </>}

                    <SliderInput
                        label="Würden Sie der Technologie eines autonomen Autos vertrauen?"
                        best="Sehr Sicher"
                        worst="Sehr Unsicher"
                        onChange={data.setQ2Result}
                    />

                    <SliderInput
                        label="Wie sehr vertrauen Sie generell in Technik?"
                        best="Volles Vertrauen"
                        worst="Kein Vertrauen"
                        onChange={data.setQ3Result}
                    />
                </CardContent>
            </Card>
        </div>
    </div>
}

