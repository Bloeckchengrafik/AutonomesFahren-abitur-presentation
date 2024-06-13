import {Img, makeScene2D, NodeProps, Rect, signal, Txt, Node} from "@motion-canvas/2d";
import {
    all,
    beginSlide,
    createRef,
    delay,
    easeInOutCubic,
    Reference,
    SignalValue,
    SimpleSignal
} from "@motion-canvas/core";
import {Theme} from "../lib/colors";

interface StatPopupProps extends NodeProps {
    image: SignalValue<string>
}

class StatPopup extends Node {
    @signal()
    public declare readonly image: SimpleSignal<string, this>;

    private rectRef: Reference<Rect>;

    public constructor(props?: StatPopupProps) {
        super({
            ...props,
        });

        this.rectRef = createRef<Rect>();

        this.add(
            <Rect fill={Theme.bg} radius={10} padding={10} opacity={0} layout gap={0} width={0} height={0}
                  justifyContent={"start"}
                  alignItems={"center"} clip ref={this.rectRef}>
                <Img src={this.image()} width={562 * 1.5} height={432 * 1.5}/>
            </Rect>
        );
    }

    public* animateIn() {
        yield* all(
            this.rectRef().width(562 * 1.5, 0.5, easeInOutCubic),
            this.rectRef().height(432 * 1.5, 0.5, easeInOutCubic),
            this.rectRef().opacity(1, 0.5, easeInOutCubic)
        )
    }

    public* animateOut() {
        yield* all(
            this.rectRef().width(0, 0.5, easeInOutCubic),
            this.rectRef().height(0, 0.5, easeInOutCubic),
            this.rectRef().opacity(0, 0.5, easeInOutCubic)
        )
    }
}

export default makeScene2D(function* (view) {
    const title = createRef<Txt>();
    view.add(<Txt ref={title} fontSize={50} opacity={0} text="Soziale Chancen und Risiken" fontFamily={"Roboto"}
                  fill={"white"}/>);

    yield* title().opacity(1, 0.5, easeInOutCubic)
    yield* title().y(-450, 0.4, easeInOutCubic)

    yield* beginSlide("Soziale Chancen und Risiken")

    yield* title().text("Soziale Chancen", 0.5)

    const teilhabeRef = createRef<Rect>();
    const teilhabeTextRef = createRef<Txt>();
    const sicherheitRef = createRef<Rect>();
    const sicherheitTextRef = createRef<Txt>();

    view.add(<Rect ref={teilhabeRef} y={-50} layout gap={0} fill={Theme.bg} padding={10} radius={10} opacity={0}
                   justifyContent={"start"} alignItems={"center"}>
        <Img src="../assets/UsersThree.svg" width={64} height={64}/>
        <Txt ref={teilhabeTextRef} opacity={1} fontFamily={"Roboto"} fill={"white"} fontSize={30}/>
    </Rect>);

    view.add(<Rect ref={sicherheitRef} y={50} layout gap={0} fill={Theme.bg} padding={10} radius={10} opacity={0}
                   justifyContent={"start"} alignItems={"center"}>
        <Img src="../assets/cone.svg" width={64} height={64}/>
        <Txt ref={sicherheitTextRef} opacity={1} fontFamily={"Roboto"} fill={"white"} fontSize={30}/>
    </Rect>);

    yield* all(
        delay(0.2, teilhabeRef().opacity(1, 0.5, easeInOutCubic)),
        delay(0.4, sicherheitRef().opacity(1, 0.5, easeInOutCubic))
    )


    yield* all(
        delay(0.2, all(
            teilhabeTextRef().text("Gesellschaftliche Teilhabe", 0.5),
            teilhabeTextRef().margin.left(20, 0.3, easeInOutCubic),
            teilhabeRef().width(500, 0.3, easeInOutCubic)
        )),
        delay(0.4, all(
            sicherheitTextRef().text("Sicherheit", 0.5),
            sicherheitTextRef().margin.left(20, 0.3, easeInOutCubic),
            sicherheitRef().width(500, 0.3, easeInOutCubic)
        ))
    )

    yield* all(
        teilhabeRef().x(-400, 0.5, easeInOutCubic),
        teilhabeRef().y(-300, 0.5, easeInOutCubic),
        sicherheitRef().x(400, 0.5, easeInOutCubic),
        sicherheitRef().y(-300, 0.5, easeInOutCubic),
        sicherheitRef().opacity(0.7, 0.5, easeInOutCubic)
    )

    const babyIconRef = createRef<Rect>();
    const rollatorIconRef = createRef<Rect>();

    view.add(
        <Rect layout gap={40} justifyContent={"start"} alignItems={"center"} x={-400} y={-150}>
            <Rect ref={babyIconRef} width={0} clip>
                <Img src="../assets/UsersThree.svg" size={100} width={100}/>
            </Rect>
            <Rect ref={rollatorIconRef} width={0} clip>
                <Img src="../assets/rollator.svg" size={100} width={100}/>
            </Rect>
        </Rect>
    );

    yield* babyIconRef().width(100, 0.5, easeInOutCubic)

    yield* beginSlide("Senioren")
    yield* rollatorIconRef().width(100, 0.5, easeInOutCubic)

    yield* beginSlide("SeniorenStats")
    const popupSeniorenRef = createRef<StatPopup>();
        view.add(<StatPopup ref={popupSeniorenRef} image={"../assets/stats/situationen_mit_alten_personen.png"} scale={0.8} y={200} x={-400}/>);
    yield* popupSeniorenRef().animateIn()

    yield* beginSlide("Sicherheit")

    yield* all(
        teilhabeRef().opacity(0.7, 0.5, easeInOutCubic),
        sicherheitRef().opacity(1, 0.5, easeInOutCubic),
    )

    const einschaetzungRef = createRef<Rect>();
    const zeitRef = createRef<Rect>();

    view.add(
        <Rect layout gap={40} justifyContent={"start"} alignItems={"center"} x={400} y={-150}>
            <Rect ref={einschaetzungRef} width={0} clip>
                <Img src="../assets/precision.svg" size={100} width={100}/>
            </Rect>
            <Rect ref={zeitRef} width={0} clip>
                <Img src="../assets/speed.svg" size={100} width={100}/>
            </Rect>
        </Rect>
    );

    yield* beginSlide("Einschätzung von Situationen")

    yield* all(
        einschaetzungRef().width(100, 0.5, easeInOutCubic),
        einschaetzungRef().opacity(1, 0.5, easeInOutCubic),
    )

    yield* beginSlide("Reaktionszeit")

    yield* all(
        zeitRef().width(100, 0.5, easeInOutCubic),
        zeitRef().opacity(1, 0.5, easeInOutCubic),
    )

    yield* beginSlide("SicherheitStats")
    const popupSicherheitRef = createRef<StatPopup>();
    view.add(<StatPopup ref={popupSicherheitRef} image={"../assets/stats/technikvertrauen.png"} scale={0.8} y={200} x={400}/>);
    yield* popupSicherheitRef().animateIn()

    yield* beginSlide("Soziale Risiken")

    yield* all(
        zeitRef().opacity(0, 0.5, easeInOutCubic),
        einschaetzungRef().opacity(0, 0.5, easeInOutCubic),
        teilhabeRef().y(-100, 0.5, easeInOutCubic),
        sicherheitRef().y(-100, 0.5, easeInOutCubic),
        teilhabeRef().opacity(0, 0.5, easeInOutCubic),
        sicherheitRef().opacity(0, 0.5, easeInOutCubic),
        babyIconRef().opacity(0, 0.5, easeInOutCubic),
        rollatorIconRef().opacity(0, 0.5, easeInOutCubic),
        title().text("Soziale Risiken", 0.5),
        popupSeniorenRef().animateOut(),
        popupSicherheitRef().animateOut()
    )

    const trolleyproblemsRef = createRef<Rect>();
    const akzeptanzRef = createRef<Rect>();
    const ueberwachungRef = createRef<Rect>();

    view.add(
        <Rect layout gap={40} justifyContent={"start"} alignItems={"center"}>
            <Rect ref={trolleyproblemsRef} width={0} clip>
                <Img src="../assets/seal-question.svg" size={100} width={100}/>
            </Rect>
            <Rect ref={akzeptanzRef} width={0} clip>
                <Img src="../assets/UsersThree.svg" size={100} width={100}/>
            </Rect>
            <Rect ref={ueberwachungRef} width={0} clip>
                <Img src="../assets/camera.svg" size={100} width={100}/>
            </Rect>
        </Rect>
    );

    const stauSicherheitStatRef = createRef<StatPopup>();
    const akzeptanzStatRef = createRef<StatPopup>();

    view.add(<StatPopup ref={stauSicherheitStatRef} image={"../assets/stats/stau_und_sicherheit.png"}/>);
    view.add(<StatPopup ref={akzeptanzStatRef} image={"../assets/stats/akzeptanz.png"}/>);

    yield* beginSlide("Trolleyproblem")
    yield* trolleyproblemsRef().width(100, 0.5, easeInOutCubic)

    yield* beginSlide("Akzeptanz")
    yield* akzeptanzRef().width(100, 0.5, easeInOutCubic)
    yield* beginSlide("AkzeptanzStat")
    yield* akzeptanzStatRef().animateIn()
    yield* beginSlide("AkzeptanzStat1")
    yield* akzeptanzStatRef().animateOut()

    yield* beginSlide("Überwachung")
    yield* ueberwachungRef().width(100, 0.5, easeInOutCubic)

    yield* beginSlide("GefahrenEnd")
    yield* all(
        delay(0.2, all(
            trolleyproblemsRef().opacity(0, 0.5, easeInOutCubic),
            trolleyproblemsRef().margin.top(-10, 0.2, easeInOutCubic).to(500, 0.5, easeInOutCubic)
        )),
        delay(0.4, all(
            akzeptanzRef().opacity(0, 0.5, easeInOutCubic),
            akzeptanzRef().margin.top(-10, 0.2, easeInOutCubic).to(500, 0.5, easeInOutCubic)
        )),
        delay(0.6, all(
            ueberwachungRef().opacity(0, 0.5, easeInOutCubic),
            ueberwachungRef().margin.top(-10, 0.2, easeInOutCubic).to(500, 0.5, easeInOutCubic)
        )),
        delay(0.8, title().opacity(0, 0.5, easeInOutCubic))
    )
});