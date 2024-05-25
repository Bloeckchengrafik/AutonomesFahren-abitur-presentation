import {create} from "zustand"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {useEffect} from "react";
import {LOCALE} from "@/lib/locales.ts";

export type AgeRange = "-24" | "25-34" | "35-44" | "45-54" | "55-64" | "65+"

export enum Gender {
    Male = "m",
    Female = "f",
    Other = "o",
}

interface Step1State {
    country: string | null,
    zipcode: string | null,
    ageRange: AgeRange | null,
    gender: Gender | null,
    hasChildren: boolean,

    setCountry: (country: string) => void,
    setZipcode: (zipcode: string) => void,
    setAgeRange: (ageRange: AgeRange) => void,
    setGender: (gender: Gender) => void,
    setHasChildren: (hasChildren: boolean) => void,
}

export const useStep1 = create<Step1State>((set) => ({
    country: null,
    zipcode: "0",
    ageRange: null,
    gender: null,
    hasChildren: false,

    setCountry: (country: string | null) => {
        set((state) => ({...state, country}))
    },
    setZipcode: (zipcode: string | null) => {
        set((state) => ({...state, zipcode}))
    },
    setAgeRange: (ageRange: AgeRange | null) => {
        set((state) => ({...state, ageRange}))
    },
    setGender: (gender: Gender | null) => {
        set((state) => ({...state, gender}))
    },
    setHasChildren: (hasChildren: boolean) => {
        set((state) => ({...state, hasChildren}))
    }
}))

export function validateStep1(state: Step1State): boolean {
    return !!state.country && !!state.zipcode && !!state.ageRange && !!state.gender
}


export function Step1GetPersonalInfo() {
    const data = useStep1()

    const split = navigator.language.split("-")
    let country = split[0]
    if (split.length > 1) {
        country = split[1]
    }

    useEffect(() => {
        data.setCountry(country)
    }, [])

    return <div className="mt-8 flex justify-center">
        <div className="w-full">
            <Card className="border-neutral-700">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {LOCALE["1-about-me"]}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Label htmlFor="country">{LOCALE["1-country"]}</Label>
                    <Input id="country" type="text" placeholder="..."
                           defaultValue={country}
                           onInput={(e) => data.setCountry((e.target as HTMLInputElement).value)}
                    />
                    <br/>
                    <div className="flex items-center gap-2">
                        <Label>{LOCALE["1-urban"]}</Label> <Switch id="urban" className="border border-neutral-700 data-[state=checked]:bg-input" onCheckedChange={(checked) => data.setZipcode(checked ? "1" : "0")}/> <Label>{LOCALE["1-rural"]}</Label>
                    </div>
                    <br/>
                    <Label htmlFor="ageRange">{LOCALE["1-age"]}</Label>
                    <Select onValueChange={(value) => data.setAgeRange(value as AgeRange)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={LOCALE["select-label"]}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="-24">{LOCALE["1-age-0"]}</SelectItem>
                            <SelectItem value="25-34">25-34</SelectItem>
                            <SelectItem value="35-44">35-44</SelectItem>
                            <SelectItem value="45-54">45-54</SelectItem>
                            <SelectItem value="55-64">55-64</SelectItem>
                            <SelectItem value="65+">65+</SelectItem>
                        </SelectContent>
                    </Select>
                    <br/>
                    <Label htmlFor="gender">{LOCALE["1-gender"]}</Label>
                    <Select onValueChange={(value) => data.setGender(value as Gender)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={LOCALE["select-label"]}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={Gender.Male}>{LOCALE["1-male"]}</SelectItem>
                            <SelectItem value={Gender.Female}>{LOCALE["1-female"]}</SelectItem>
                            <SelectItem value={Gender.Other}>{LOCALE["1-other"]}</SelectItem>
                        </SelectContent>
                    </Select>
                    <br/>
                    <div className="flex gap-2 items-center">
                        <Switch id="hasChildren" className="border border-neutral-700" onCheckedChange={(checked) => data.setHasChildren(checked)}/>
                        <Label htmlFor="hasChildren">{LOCALE["1-has-children"]}</Label>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
}

