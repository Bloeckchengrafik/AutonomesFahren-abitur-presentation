import Nav from "./components/Nav"
import CurrentStep from "./surveyengine/Steps"

function App() {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4">
        <Nav />
        <div className="mt-4">
          <CurrentStep />
        </div>
      </div>
    </div>
  )
}

export default App
