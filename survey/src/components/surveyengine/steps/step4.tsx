import {create} from "zustand"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useStep1} from "@/components/surveyengine/steps/step1.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {LOCALE} from "@/lib/locales.ts";

interface Step4State {
    freeform: string
    freeformParents: string

    setFreeform: (n: string) => void,
    setFreeformParents: (n: string) => void,
}

export const useStep4 = create<Step4State>((set) => ({
    freeform: "",
    freeformParents: "",

    setFreeform: (n: string) => {
        set((state) => ({...state, freeform: n}))
    },
    setFreeformParents: (n: string) => {
        set((state) => ({...state, freeformParents: n}))
    }
}))

function FreeformInput({label, onChange}: { label: string, onChange: (n: string) => void }) {
    return <div className="mt-8 flex justify-center">
        <div className="w-full">
            <CardTitle className="text-2xl font-bold">
                {label} <span className="text-neutral-500 text-sm">(optional)</span>
            </CardTitle>
            <Textarea
                placeholder={LOCALE["4-your-thoughts"]}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    </div>
}

export function Step4Freeform() {
    const data = useStep4()
    const state1 = useStep1()

    return <div className="mt-8 flex justify-center">
        <div className="w-full">
            <Card className="border-neutral-700">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {LOCALE["4-card-title"]}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {state1.hasChildren && <FreeformInput label={LOCALE["4-freeform-parents-label"]}
                                                          onChange={data.setFreeformParents}/>}
                    <FreeformInput label={LOCALE["4-freeform-label"]} onChange={data.setFreeform}/>
                </CardContent>
            </Card>
        </div>
    </div>
}

