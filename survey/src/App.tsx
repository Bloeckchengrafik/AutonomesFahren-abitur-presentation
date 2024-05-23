import Nav from "./components/Nav"
import CurrentStep from "@/components/surveyengine/Steps"
import {logEventToDefaultSink} from "@/lib/firebase.ts";

function App() {
    logEventToDefaultSink("app-start");
    return (
        <div className="w-full min-h-screen bg-background flex flex-col">
            <div className="max-w-4xl w-full mx-auto p-4 flex-1 flex flex-col">
                <Nav/>
                <div className="mt-4 flex-1 flex flex-col w-full">
                    <CurrentStep/>
                </div>
            </div>
        </div>
    )
}

export default App
