import InfoDialog from "@/components/InfoDialog.tsx";
import {LOCALE} from "@/lib/locales.ts";

function Intro() {
    return (
        <div>
            <p className="my-8">
                {LOCALE["intro-hello"]}, <br/>
                {LOCALE["intro-whoami"]}
                <br/>
                <br/>
                {LOCALE["intro-what"]}
            </p>

            <InfoDialog title={LOCALE["intro-what-autonomous"]}>
                {LOCALE["intro-what-autonomous-answer"]}
            </InfoDialog>
            <br />
            <InfoDialog title={LOCALE["intro-what-data"]}>
                {LOCALE["intro-what-data-answer"]}

                <br/>
                <br/>

                {LOCALE["intro-what-data-answer-2"]}
            </InfoDialog>
        </div>
    );
}

export default Intro;