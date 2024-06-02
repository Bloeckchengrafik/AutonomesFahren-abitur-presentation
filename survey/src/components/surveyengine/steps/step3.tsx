import {create} from "zustand"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {SliderInput} from "@/components/surveyengine/SliderInput.tsx";
import {useStep1} from "@/components/surveyengine/steps/step1.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {LOCALE} from "@/lib/locales.ts";

interface Step3State {
    situations: {
        pendeln: boolean,
        langeReisen: boolean,
        schlechteSicht: boolean,
        kurzeBesorgungen: boolean,
        fahrtenMitKindern: boolean,
        altePersonen: boolean,
    },
    q2Result: number,
    q3Result: number,


    setSituationResult: (name: keyof Step3State["situations"], n: boolean) => void,
    setQ2Result: (n: number) => void,
    setQ3Result: (n: number) => void,
}

export const useStep3 = create<Step3State>((set) => ({
    situations: {
        pendeln: false,
        langeReisen: false,
        schlechteSicht: false,
        kurzeBesorgungen: false,
        fahrtenMitKindern: false,
        altePersonen: false,
    },
    q2Result: 0,
    q3Result: 0,

    setSituationResult: (name: keyof Step3State["situations"], n: boolean) => {
        set((state) => ({...state, situations: {...state.situations, [name]: n}}))
    },
    setQ2Result: (n: number) => {
        set((state) => ({...state, q2Result: n}))
    },
    setQ3Result: (n: number) => {
        set((state) => ({...state, q3Result: n}))
    }
}))

export function validateStep3(state: Step3State): boolean {
    return state.q2Result !== null
}


export function Step3Usage() {
    const data = useStep3()
    const state1 = useStep1()

    return (
        <div className="mt-8 flex justify-center">
            <div className="w-full">
                <Card className="border-neutral-700">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            {LOCALE["3-card-title"]}  {/* Access translation using LOCALE object */}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-xl">{LOCALE["3-situations-title"]}</h1> {/* Access translation using LOCALE object */}
                        <div className="flex flex-col gap-2 pl-4 pt-2 pb-8">
                            <div className="flex items-center gap-2">
                                <Switch id="pendeln" className="border border-neutral-700" onCheckedChange={(checked) => data.setSituationResult("pendeln", checked)}/>
                                <Label htmlFor="pendeln">{LOCALE["3-situation-pendeln"]}</Label> {/* Access translation using LOCALE object */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch id="langeReisen" className="border border-neutral-700" onCheckedChange={(checked) => data.setSituationResult("langeReisen", checked)}/>
                                <Label htmlFor="langeReisen">{LOCALE["3-situation-langeReisen"]}</Label> {/* Access translation using LOCALE object */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch id="schlechteSicht" className="border border-neutral-700" onCheckedChange={(checked) => data.setSituationResult("schlechteSicht", checked)}/>
                                <Label htmlFor="schlechteSicht">{LOCALE["3-situation-schlechteSicht"]}</Label> {/* Access translation using LOCALE object */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch id="kurzeBesorgungen" className="border border-neutral-700" onCheckedChange={(checked) => data.setSituationResult("kurzeBesorgungen", checked)}/>
                                <Label htmlFor="kurzeBesorgungen">{LOCALE["3-situation-kurzeBesorgungen"]}</Label> {/* Access translation using LOCALE object */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch id="altePersonen" className="border border-neutral-700" onCheckedChange={(checked) => data.setSituationResult("altePersonen", checked)}/>
                                <Label htmlFor="altePersonen">{LOCALE["3-situation-altePersonen"]}</Label> {/* Access translation using LOCALE object */}
                            </div>
                            {state1.hasChildren && (
                                <div className="flex items-center gap-2">
                                    <Switch id="fahrtenMitKindern" className="border border-neutral-700" onCheckedChange={(checked) => data.setSituationResult("fahrtenMitKindern", checked)}/>
                                    <Label htmlFor="fahrtenMitKindern">{LOCALE["3-situation-fahrtenMitKindern"]}</Label> {/* Access translation using LOCALE object */}
                                </div>
                            )}
                        </div>

                        <SliderInput
                            label={LOCALE["3-slider-q2-label"]}
                            best={LOCALE["3-slider-q2-best"]}
                            worst={LOCALE["3-slider-q2-worst"]}
                            onChange={data.setQ2Result}
                        />

                        {state1.hasChildren && (
                            <SliderInput
                                label={LOCALE["3-slider-q3-label"]}
                                best={LOCALE["3-slider-q3-best"]}
                                worst={LOCALE["3-slider-q3-worst"]}
                                onChange={data.setQ3Result}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );

}

