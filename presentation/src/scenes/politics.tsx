import {colorSignal, makeScene2D, Node, NodeProps, Rect, signal, Txt, Img, Circle, Layout} from "@motion-canvas/2d";
import {
    all, beginSlide,
    ColorSignal,
    createRef, delay,
    easeInOutCubic, linear,
    PossibleColor, Reference,
    SignalValue,
    SimpleSignal, waitFor, waitUntil
} from "@motion-canvas/core";
import {Theme} from "../lib/colors";
import {loopUntilSlide} from "../lib/utils";

interface LawBoxProps extends NodeProps {
    law: SignalValue<string>;
    borderColor: SignalValue<PossibleColor>;
    animationState: SignalValue<number>;
}

class LawBox extends Node {
    @signal()
    public declare readonly law: SimpleSignal<string, this>;

    @colorSignal()
    public declare readonly borderColor: ColorSignal<this>;

    @signal()
    public declare readonly animationState: SimpleSignal<number, this>;

    private rectRef: Reference<Rect>;
    private standInRef: Reference<Rect>;
    private prevX: number;
    private prevY: number;
    private oldTitle: string;

    public constructor(props?: LawBoxProps) {
        super({
            ...props,
        });

        console.assert(props !== null, "props is required");

        this.rectRef = createRef<Rect>();
        this.standInRef = createRef<Rect>();

        this.add(<>
                <Rect width={500} height={400} ref={this.standInRef} layout={false}> </Rect>
                <Rect width={500} height={400}
                      padding={20}
                      stroke={this.borderColor} lineWidth={2} radius={5}
                      layout justifyContent="center" alignItems="center"
                      opacity={this.animationState}
                      scale={() => this.animationState() / 2 + 0.5}
                      lineDash={[30, 0]}
                      ref={this.rectRef}
                >
                    <Txt fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"center"}
                         text={this.law}/>
                </Rect>
            </>
        );
    }

    public* animateIn() {
        yield* this.animationState(1, 0.5, easeInOutCubic);
    }

    public* highlightUntilEOS(name: string) {
        yield* all(
            this.rectRef().scale(1.1, 0.5, easeInOutCubic),
            this.rectRef().lineDash([30, 30], 0.5, easeInOutCubic),
            loopUntilSlide(name, () => this.rectRef().lineDashOffset(60, 1, linear).to(0, 0)),
        )

        yield* all(
            this.rectRef().scale(1, 0.5, easeInOutCubic),
            this.rectRef().lineDash([30, 0], 0.5, easeInOutCubic),
        )
    }

    public* makeTitle(newTitle: string | null = null) {
        this.oldTitle = this.law();
        this.prevX = this.rectRef().computedPosition().x;
        this.prevY = this.rectRef().computedPosition().y;
        this.rectRef().x(this.prevX)
        this.rectRef().y(this.prevY)
        this.rectRef().layout(false)
        this.standInRef().layout(true)

        if (newTitle == null) {
            newTitle = this.oldTitle;
        }

        yield* all(
            this.rectRef().lineWidth(0, 0.5, easeInOutCubic),
            this.rectRef().x(0, 0.5, easeInOutCubic),
            this.rectRef().y(-450, 0.5, easeInOutCubic),
            this.law(newTitle, 0.5),
        )
    }

    public* unmakeTitle() {
        yield* all(
            this.law(this.oldTitle, 0.2),
            this.rectRef().lineWidth(2, 0.5, easeInOutCubic),
            this.rectRef().x(this.prevX, 0.5, easeInOutCubic),
            this.rectRef().y(this.prevY, 0.5, easeInOutCubic),
        )
    }
}

export default makeScene2D(function* (view) {
    const title = createRef<Txt>();
    view.add(<Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                  text={"Politisches Framework"} ref={title} opacity={0}/>);

    yield* title().opacity(1, 0.5)
    yield* title().y(-450, 0.4, easeInOutCubic)

    // main laws
    /*
    1. Verordnung (EU) 2019/2144
    2. AFGBV (DE) - implementiert in deutsches Recht
    3. DSGVO (DE) - Datenschutz-Grundverordnung
     */

    const lawBoxEU20192144 = createRef<LawBox>();
    const lawBoxAFGBV = createRef<LawBox>();
    const lawBoxDSGVO = createRef<LawBox>();
    view.add(<Rect layout gap={60}>
        <LawBox law={"EU 2019/2144 \nGeneral Safety Regulation"} borderColor={Theme.stroke} ref={lawBoxEU20192144}
                animationState={0}/>
        <LawBox law={"AFGBV"} borderColor={Theme.stroke} ref={lawBoxAFGBV} animationState={0}/>
        <LawBox law={"EU 2016/679 - DSGVO"} borderColor={Theme.stroke} ref={lawBoxDSGVO} animationState={0}/>
    </Rect>);

    yield* all(
        delay(0.2, lawBoxEU20192144().animateIn()),
        delay(0.4, lawBoxAFGBV().animateIn()),
        delay(0.6, lawBoxDSGVO().animateIn()),
    )

    yield* beginSlide("Politisches Framework - EU 2019/2144")

    yield* lawBoxEU20192144().highlightUntilEOS("EU 2019/2144")
    yield* lawBoxAFGBV().highlightUntilEOS("AFGBV")
    yield* lawBoxDSGVO().highlightUntilEOS("DSGVO")

    yield* beginSlide("Politisches Framework - General Safety Regulation Detail")

    yield* all(
        lawBoxEU20192144().makeTitle(),
        title().opacity(0, 0.5),
        lawBoxAFGBV().opacity(0, 0.5),
        lawBoxDSGVO().opacity(0, 0.5),
    )

    const titleCh2A6 = createRef<Txt>();
    const titleCh2A11 = createRef<Txt>();
    const titleAnh2 = createRef<Txt>();

    const boxCh2A6 = createRef<Rect>();
    const boxCh2A11 = createRef<Rect>();
    const boxAnh2 = createRef<Rect>();

    view.add(
        <Rect layout gap={60} direction="column">
            <Txt fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                 text={"Kap. 2 Art. 6: Hochentwickelte Fahrerassistenzsysteme für alle Kraftfahrzeugklassen"}
                 ref={titleCh2A6} opacity={0}/>
            <Rect layout gap={20} ref={boxCh2A6} direction="column" clip paddingLeft={20}>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text={"Betrifft vorallem nicht vollautonome Fahrzeuge"}/>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text={"Definiert Assistenzsysteme"}/>
            </Rect>
            <Txt fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                 text={"Kap. 2 Art. 11: Besondere Anforderungen an automatisierte und vollautomatisierte Fahrzeuge"}
                 ref={titleCh2A11} opacity={0}/>
            <Rect layout gap={20} ref={boxCh2A11} direction="column" clip paddingLeft={20}>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text={"Zulassung wie bei nichtautomatisierten Fahrzeugen"}/>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text={"Sensorik zu Umwelt und Fahrzeugstatus"}/>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text={"Fahrerverfügbarkeitsüberwachung (wenn erforderlich)"}/>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text={"Eventbasierte Datenaufzeichnung"}/>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text="Kommunikation zwischen Fahrzeugen"/>
            </Rect>
            <Txt fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                 text={"Anhang 2: Technische Anforderungen"} ref={titleAnh2} opacity={0}/>
            <Rect layout gap={20} ref={boxAnh2} direction="column" clip paddingLeft={20}>
                <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                     text="Definiert technische Features"/>
            </Rect>
        </Rect>
    )

    const boxCh2A6InitHeight = boxCh2A6().height();
    boxCh2A6().height(0);

    const boxCh2A11InitHeight = boxCh2A11().height();
    boxCh2A11().height(0);

    const boxAnh2InitHeight = boxAnh2().height();
    boxAnh2().height(0);

    yield* all(
        titleCh2A6().opacity(.7, 0.5),
        titleCh2A11().opacity(.7, 0.5),
        titleAnh2().opacity(.7, 0.5),
    )

    yield* beginSlide("Politisches Framework - General Safety Regulation Detail 2 6")

    yield* all(
        boxCh2A6().height(boxCh2A6InitHeight, 0.5, easeInOutCubic),
        titleCh2A6().opacity(1, 0.5, easeInOutCubic),
    )

    yield* beginSlide("Politisches Framework - General Safety Regulation Detail 2 11")

    yield* all(
        boxCh2A6().height(0, 0.5, easeInOutCubic),
        titleCh2A6().opacity(.7, 0.5, easeInOutCubic),
        boxCh2A11().height(boxCh2A11InitHeight, 0.5, easeInOutCubic),
        titleCh2A11().opacity(1, 0.5, easeInOutCubic),
    )

    yield* beginSlide("Politisches Framework - General Safety Regulation Detail Anh")

    yield* all(
        boxCh2A11().height(0, 0.5, easeInOutCubic),
        titleCh2A11().opacity(.7, 0.5, easeInOutCubic),
        boxAnh2().height(boxCh2A11InitHeight, 0.5, easeInOutCubic),
        titleAnh2().opacity(1, 0.5, easeInOutCubic),
    )

    yield* beginSlide("Politisches Framework - General Safety Regulation Pre Out")

    yield* all(
        boxAnh2().height(0, 0.5, easeInOutCubic),
        titleAnh2().opacity(.7, 0.5, easeInOutCubic),
    )

    yield* beginSlide("Politisches Framework - General Safety Regulation Out")

    yield* all(
        titleCh2A6().opacity(0, 0.5, easeInOutCubic),
        titleCh2A11().opacity(0, 0.5, easeInOutCubic),
        titleAnh2().opacity(0, 0.5, easeInOutCubic),
        lawBoxEU20192144().unmakeTitle(),
        lawBoxAFGBV().opacity(1, 0.5, easeInOutCubic),
        lawBoxDSGVO().opacity(1, 0.5, easeInOutCubic),
    )

    yield* all(
        lawBoxEU20192144().opacity(0, 0.5, easeInOutCubic),
        lawBoxAFGBV().makeTitle("\nVerordnung zur Genehmigung und zum Betrieb von Kraftfahrzeugen mit \nautonomer Fahrfunktion in festgelegten Betriebsbereichen"),
        lawBoxDSGVO().opacity(0, 0.5, easeInOutCubic),
    )

    const implRef = createRef<Rect>();
    const definesRef = createRef<Rect>();
    const techRef = createRef<Rect>();

    view.add(
        <Rect layout gap={60} direction="row">
            <Rect layout gap={20} direction="column" justifyContent="center" alignItems="center" opacity={0}
                  marginTop={20}
                  ref={implRef}>
                <Txt
                    fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"center"}
                    text={"Implementiert\nEU-Verordnung"}
                    opacity={1}
                />
                <Circle width={100} height={100} fill={Theme.bg} layout justifyContent="center" alignItems="center">
                    <Img src={"../assets/de-impl.svg"} width={70} height={70} opacity={0.7}/>
                </Circle>
            </Rect>
            <Rect layout gap={20} direction="column" justifyContent="center" alignItems="center" opacity={0}
                  marginTop={20}
                  ref={definesRef}>
                <Txt
                    fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"center"}
                    text={"Vorraussetzungen für\nautonomes Fahren"}
                    opacity={1}
                />
                <Circle width={100} height={100} fill={Theme.bg} layout justifyContent="center" alignItems="center">
                    <Img src={"../assets/de-defines.svg"} width={70} height={70} opacity={0.7}/>
                </Circle>
            </Rect>
            <Rect layout gap={20} direction="column" justifyContent="center" alignItems="center" opacity={0}
                  marginTop={20}
                  ref={techRef}>
                <Txt
                    fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"center"}
                    text={"Definiert technischen\nRahmen"}
                    opacity={1}
                />
                <Circle width={100} height={100} fill={Theme.bg} layout justifyContent="center" alignItems="center">
                    <Img src={"../assets/de-tech.svg"} width={70} height={70} opacity={0.7}/>
                </Circle>
            </Rect>
        </Rect>
    )

    yield* all(
        delay(0.2, implRef().opacity(1, 0.5, easeInOutCubic)),
        delay(0.4, definesRef().opacity(1, 0.5, easeInOutCubic)),
        delay(0.6, techRef().opacity(1, 0.5, easeInOutCubic)),
        delay(0.2, implRef().margin.top(-10, 0.3, easeInOutCubic).to(0, 0.2, easeInOutCubic)),
        delay(0.4, definesRef().margin.top(-10, 0.3, easeInOutCubic).to(0, 0.2, easeInOutCubic)),
        delay(0.6, techRef().margin.top(-10, 0.3, easeInOutCubic).to(0, 0.2, easeInOutCubic)),
    )

    yield* beginSlide("PF - DSGVO")

    yield* all(
        delay(0.2, implRef().opacity(0, 0.5, easeInOutCubic)),
        delay(0.4, definesRef().opacity(0, 0.5, easeInOutCubic)),
        delay(0.6, techRef().opacity(0, 0.5, easeInOutCubic)),
        delay(0.2, implRef().margin.top(20, 0.3, easeInOutCubic)),
        delay(0.4, definesRef().margin.top(20, 0.3, easeInOutCubic)),
        delay(0.6, techRef().margin.top(20, 0.3, easeInOutCubic)),
        delay(0.6, lawBoxDSGVO().opacity(1, 0.5, easeInOutCubic)),
        delay(0.6, lawBoxAFGBV().unmakeTitle()),
        delay(0.6, lawBoxEU20192144().opacity(1, 0.5, easeInOutCubic)),
    )

    yield* all(
        lawBoxEU20192144().opacity(0, 0.5, easeInOutCubic),
        lawBoxAFGBV().opacity(0, 0.5, easeInOutCubic),
        lawBoxDSGVO().makeTitle("Datenschutz-Grundverordnung"),
    )

    /*
     * DSGVO im Bezug auf autonomes Fahren
     * - Weniger diskutiert als z.B. Trolley-Problem
     * - Massive Mengen an Daten (vs Datenminimierung)
     * - DSGVO fordert sichere Datenzugriffe
     * - Konflikt mit Data-Retention und Data-Sharing
     * - Wer darf Daten verarbeiten? Wie sind PPE gesichert?
     */

    const centralCarRef = createRef<Img>();
    const frontCameraRef = createRef<Circle>();
    const backCameraRef = createRef<Circle>();
    const frontFocusCameraRef = createRef<Circle>();
    const backFocusCameraRef = createRef<Circle>();
    const leftFrontCameraRef = createRef<Circle>();
    const rightFrontCameraRef = createRef<Circle>();
    const cameras = [frontCameraRef, backCameraRef, frontFocusCameraRef, backFocusCameraRef, leftFrontCameraRef, rightFrontCameraRef];

    view.add(<Img src="../assets/car_top.svg" ref={centralCarRef} rotation={90} scale={1.5} size={200} opacity={0}/>);
    view.add(<Circle size={700} ref={frontCameraRef} fill={Theme.stroke} opacity={0} closed startAngle={-45}
                     endAngle={45}/>);
    view.add(<Circle size={700} ref={backCameraRef} fill={Theme.stroke} opacity={0} closed startAngle={135}
                     endAngle={-135}/>);
    view.add(<Circle size={800} ref={frontFocusCameraRef} fill={Theme.stroke} opacity={0} closed startAngle={-35}
                     endAngle={35}/>);
    view.add(<Circle size={800} ref={backFocusCameraRef} fill={Theme.stroke} opacity={0} closed startAngle={145}
                     endAngle={-145}/>);
    view.add(<Circle size={600} ref={leftFrontCameraRef} fill={Theme.stroke} opacity={0} closed startAngle={-100}
                     endAngle={-10}/>);
    view.add(<Circle size={600} ref={rightFrontCameraRef} fill={Theme.stroke} opacity={0} closed startAngle={10}
                     endAngle={100}/>);

    yield* all(
        centralCarRef().opacity(1, 0.5, easeInOutCubic),
        ...cameras.map((c, i) => delay(i/100, c().opacity(0.1, 0.5, easeInOutCubic))),
    )

    yield* beginSlide("DSGVO - 'Ne Menge Kameras")

    yield* all(
        ...cameras.map(c => c().opacity(0.05, 0.5, easeInOutCubic)),
    )

    const lockRef = createRef<Img>();
    const lockOpenRef = createRef<Img>();
    view.add(<Img src="../assets/lock.svg" ref={lockRef} size={500} y={-50} opacity={0}/>);
    view.add(<Img src="../assets/lock-open.svg" ref={lockOpenRef} size={500} y={-50} opacity={0}/>);

    yield* all(
        lockRef().opacity(1, 0.5, easeInOutCubic),
        centralCarRef().opacity(0.5, 0.5, easeInOutCubic),
    )

    yield* beginSlide("DSGVO - Wer darf Daten verarbeiten?")

    lockOpenRef().opacity(1)
    lockRef().src("../assets/lock-nobg.svg")

    yield* all(
        lockRef().opacity(0, 0.5, linear),
    )

    yield* beginSlide("DSGVO - Out")

    yield* all(
        lockOpenRef().opacity(0, 0.5, easeInOutCubic),
        ...cameras.map(c => c().opacity(0, 0.5, easeInOutCubic)),
        centralCarRef().opacity(0, 0.5, easeInOutCubic),
        lawBoxDSGVO().opacity(0, 0.5, easeInOutCubic),
    )
});