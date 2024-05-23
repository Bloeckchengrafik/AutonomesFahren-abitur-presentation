import InfoDialog from "@/components/InfoDialog.tsx";

function Intro() {
    return (
        <div>
            <p className="my-8">
                Hallo,
                ich bin Christian Bergschneider und arbeite aktuell an einer Präsentation,
                in der unter anderem soziale Aktzeptanz von autonomen Fahrzeugen untersucht wird.
                <br/>
                <br/>
                Wenn Sie sich die Zeit nehmen würden, mir ein paar Fragen zu beantworten, würde mir
                das sehr helfen!
            </p>

            <InfoDialog title="Was passiert mit meinen Daten?">
                Ihre eingegebenen Daten werden nicht an Dritte weitergegeben. Sie werden nach
                dem Absenden der Daten auf meinem Server verschlüsselt gespeichert. Nach der Auswertung
                der Daten werden diese gelöscht und nur die Ergebnisse gespeichert und veröffentlicht.

                <br/>
                <br/>

                Es werden keine weiteren personenbezogenen Daten (Name, E-Mail, Telefonnummer, IP-Adresse, etc.)
                verarbeitet, nur
                die Daten, die Sie in der Umfrage eingegeben haben.
            </InfoDialog>

            <br/>

            <InfoDialog title="Was ist voll autonomes Fahren?">
                Voll autonomes Fahren bedeutet, dass überhaupt kein Fahrer benötigt wird. Das Auto muss also auch ohne
                Fahrer jede mögliche Verkehrssituation absolvieren können.
            </InfoDialog>
        </div>
    );
}

export default Intro;