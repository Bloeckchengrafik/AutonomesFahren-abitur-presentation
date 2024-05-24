import {Label} from "@/components/ui/label.tsx";
import {Slider} from "@/components/ui/slider.tsx";

export function SliderInput(props: {label: string, best: string, worst: string, onChange: (value: number) => void}) {
    return <div className="mb-8">
        <p className="text-lg font-medium">
            {props.label}
        </p>
        <Slider min={0} max={1} step={0.01} defaultValue={[0.5]} onValueChange={(e) => props.onChange(1-e[0])} className="my-1"/>
        <div className="flex justify-between">
            <Label>{props.best}</Label>
            <Label>{props.worst}</Label>
        </div>
    </div>
}