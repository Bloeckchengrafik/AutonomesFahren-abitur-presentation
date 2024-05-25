import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import Lottie from "lottie-react";
import thankyou from "@/assets/lottie/thankyou.json";
import {useEffect} from "react";
import {logEventToDefaultSink, submitToFirestore} from "@/lib/firebase.ts";
import {useStep1} from "@/components/surveyengine/steps/step1.tsx";
import {useStep2} from "@/components/surveyengine/steps/step2.tsx";
import {useStep3} from "@/components/surveyengine/steps/step3.tsx";
import {LOCALE} from "@/lib/locales.ts";

function Step5SendAndThankYou() {
    function filterData(data: any): any {
        // remove all functions
        for (const key in data) {
            if (typeof data[key] === "function") {
                delete data[key];
            }
        }

        return data;
    }

    const data1 = filterData(useStep1())
    const data2 = filterData(useStep2())
    const data3 = filterData(useStep3())
    const data4 = filterData(useStep3())

    useEffect(() => {
        // @ts-ignore
        if (window.submitted) {
            logEventToDefaultSink("alreadySubmitted");
            return;
        }

        logEventToDefaultSink("confirmed");

        const combinedData = {
            data1, data2, data3, data4,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
        }

        submitToFirestore(combinedData as never);

        // @ts-ignore
        window.submitted = true;
    }, [])

    return <div className="mt-8 flex justify-center">
        <div className="w-full">
            <Card className="border-neutral-700">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {LOCALE["5-card-title"]}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Lottie
                        animationData={thankyou}
                        loop={false}
                        style={{
                            height: "300px",
                        }}
                    />

                    <p className="text-lg">
                        {LOCALE["5-thankyou-text"]}
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
}

export default Step5SendAndThankYou