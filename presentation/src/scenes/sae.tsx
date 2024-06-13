import {makeScene2D, Img, Rect, Txt, Line} from "@motion-canvas/2d";
import {
    all,
    beginSlide,
    createRef,
    delay,
    easeInOutCubic,
    linear,
    Reference,
    Vector2,
    waitFor
} from "@motion-canvas/core";
import {Theme} from "../lib/colors";
import {loopUntilSlide} from "../lib/utils";

function* animateIn(ref: Reference<Img>) {
    yield* all(
        ref().margin.right(0, 0.5, easeInOutCubic),
        ref().opacity(.6, 0.5, easeInOutCubic)
    )
}

function* on(ref: Reference<Img | Txt>) {
    yield* all(
        ref().margin.left(70, 0.5, easeInOutCubic),
        ref().opacity(1, 0.5, easeInOutCubic)
    )
}

function* off(ref: Reference<Img | Txt>) {
    yield* all(
        ref().margin.left(0, 0.5, easeInOutCubic),
        ref().opacity(.6, 0.5, easeInOutCubic)
    )
}


export default makeScene2D(function* (view) {
    // SAE-Skala
    // Level 0: Keine Autonomie
    // Level 1: Assistenzsysteme
    // Level 2: Teilautomation
    // Level 3: Automatisierung unter bestimmten Bedingungen
    // Level 4: Automatisierung unter meisten Bedingungen
    // Level 5: Vollständige Automatisierung

    const level0 = createRef<Img>();
    const level1 = createRef<Img>();
    const level2 = createRef<Img>();
    const level3 = createRef<Img>();
    const level4 = createRef<Img>();
    const level5 = createRef<Img>();

    const level0a = createRef<Img>();
    const level1a = createRef<Img>();
    const level2a = createRef<Img>();
    const level3a = createRef<Img>();
    const level4a = createRef<Img>();
    const level5a = createRef<Img>();

    const activeLevels = [level0a, level1a, level2a, level3a, level4a, level5a];

    const title = createRef<Txt>();
    const level1Title = createRef<Txt>();
    const level2Title = createRef<Txt>();
    const level3Title = createRef<Txt>();
    const level4Title = createRef<Txt>();
    const level5Title = createRef<Txt>();

    view.add(<Rect layout direction={"column"} alignItems={"center"} justifyContent={"center"} gap={50} x={-850}>
        <Img src="../assets/inactive/level0.svg" width={100} height={100} ref={level0} opacity={0} marginRight={50}/>
        <Img src="../assets/inactive/level1.svg" width={100} height={100} ref={level1} opacity={0} marginRight={50}/>
        <Img src="../assets/inactive/level2.svg" width={100} height={100} ref={level2} opacity={0} marginRight={50}/>
        <Img src="../assets/inactive/level3.svg" width={100} height={100} ref={level3} opacity={0} marginRight={50}/>
        <Img src="../assets/inactive/level4.svg" width={100} height={100} ref={level4} opacity={0} marginRight={50}/>
        <Img src="../assets/inactive/level5.svg" width={100} height={100} ref={level5} opacity={0} marginRight={50}/>
    </Rect>);

    view.add(<Rect layout direction={"column"} alignItems={"center"} justifyContent={"center"} gap={50} x={-850}>
        <Img src="../assets/active/level0.svg" width={100} height={100} ref={level0a} opacity={0}/>
        <Img src="../assets/active/level1.svg" width={100} height={100} ref={level1a} opacity={0}/>
        <Img src="../assets/active/level2.svg" width={100} height={100} ref={level2a} opacity={0}/>
        <Img src="../assets/active/level3.svg" width={100} height={100} ref={level3a} opacity={0}/>
        <Img src="../assets/active/level4.svg" width={100} height={100} ref={level4a} opacity={0}/>
        <Img src="../assets/active/level5.svg" width={100} height={100} ref={level5a} opacity={0}/>
    </Rect>);

    view.add(<Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} paddingLeft={10} opacity={0}
                  text={"Die SAE-Skala für autonomes Fahren"} ref={title}/>);
    view.add(<Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} y={-230} x={-540}
                  paddingLeft={10} opacity={0} text={"Assistenzsysteme"} ref={level1Title}/>);
    view.add(<Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} y={-70} x={-580}
                  paddingLeft={10} opacity={0} text={"Teilautomation"} ref={level2Title}/>);
    view.add(<Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} y={70} x={-455} paddingLeft={10}
                  opacity={0} text={"Bestimmte Bedingungen"} ref={level3Title}/>);
    view.add(<Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} y={230} x={-500}
                  paddingLeft={10} opacity={0} text={"Meiste Bedingungen"} ref={level4Title}/>);
    view.add(<Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} y={370} x={-410}
                  paddingLeft={10} opacity={0} text={"Vollständige Automatisierung"} ref={level5Title}/>);


    yield* all(
        title().opacity(1, 0.5),
        delay(0.0, animateIn(level0)),
        delay(0.2, animateIn(level1)),
        delay(0.4, animateIn(level2)),
        delay(0.6, animateIn(level3)),
        delay(0.8, animateIn(level4)),
        delay(1.0, animateIn(level5)),
    );

    yield* beginSlide("Keine Autonomie");

    yield* all(
        on(level0),
        title().y(-380, 0.4, easeInOutCubic),
        title().x(-550, 0.4, easeInOutCubic),
        on(title),
        delay(0.2, title().text("Keine Autonomie", 0.1)),
    )

    yield* beginSlide("Assistenzsysteme");

    yield* all(
        off(level0),
        off(title),
        on(level1),
        on(level1Title),
    )

    yield* beginSlide("Teilautomation");

    yield* all(
        off(level1),
        off(level1Title),
        on(level2),
        on(level2Title),
    )

    yield* beginSlide("Bestimmte Bedingungen");

    yield* all(
        off(level2),
        off(level2Title),
        on(level3),
        on(level3Title),
    )

    yield* beginSlide("Meiste Bedingungen");

    yield* all(
        off(level3),
        off(level3Title),
        on(level4),
        on(level4Title),
    )

    yield* beginSlide("Vollständige Automatisierung");

    yield* all(
        off(level4),
        off(level4Title),
        on(level5),
        on(level5Title),
    )

    yield* beginSlide("Autonomous");

    const autonomousLine = createRef<Line>();
    const officiallyAutonomousLabel = createRef<Rect>();

    view.add(
        <Line points={[new Vector2(-1000, 0), new Vector2(1000, 0)]} zIndex={9} lineDash={[30, 30]} opacity={0} lineWidth={2}
                   stroke={Theme.stroke} ref={autonomousLine}/>
    );

    view.add(
        <Rect ref={officiallyAutonomousLabel} x={740} width={320} height={100} zIndex={10} opacity={0} layout direction={"column"} alignItems={"end"} justifyContent={"center"} gap={50}>
            <Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} paddingLeft={10} text={"Fahrerassistenz"}/>
            <Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} paddingLeft={10} text={"Autonomes Fahren"}/>
        </Rect>
    );

    yield* all(
        off(level5),
        off(level5Title),
    )

    yield* loopUntilSlide("Out", () => all(
        autonomousLine().lineDashOffset(60, 1, linear).to(0, 0),
        autonomousLine().opacity(1, 0.5),
        officiallyAutonomousLabel().opacity(1, 0.5),
        ...activeLevels.map(l => l().opacity(1, 0.5)),
    ));

    console.log(level0())

    yield* all(
        level0().opacity(0, 0.2),
        level0().x(-1000, 0.3),
        level1().opacity(0, 0.2),
        level1().x(-1000, 0.3),
        level2().opacity(0, 0.2),
        level2().x(-1000, 0.3),
        level3().opacity(0, 0.2),
        level3().x(-1000, 0.3),
        level4().opacity(0, 0.2),
        level4().x(-1000, 0.3),
        level5().opacity(0, 0.2),
        level5().x(-1000, 0.3),
        level0a().opacity(0, 0.2),
        level0a().x(-1000, 0.3),
        level1a().opacity(0, 0.2),
        level1a().x(-1000, 0.3),
        level2a().opacity(0, 0.2),
        level2a().x(-1000, 0.3),
        level3a().opacity(0, 0.2),
        level3a().x(-1000, 0.3),
        level4a().opacity(0, 0.2),
        level4a().x(-1000, 0.3),
        level5a().opacity(0, 0.2),
        level5a().x(-1000, 0.3),

        title().opacity(0, 0.2),
        title().x(-1000, 0.3),
        level1Title().opacity(0, 0.2),
        level1Title().x(-1000, 0.3),
        level2Title().opacity(0, 0.2),
        level2Title().x(-1000, 0.3),
        level3Title().opacity(0, 0.2),
        level3Title().x(-1000, 0.3),
        level4Title().opacity(0, 0.2),
        level4Title().x(-1000, 0.3),
        level5Title().opacity(0, 0.2),
        level5Title().x(-1000, 0.3),

        autonomousLine().opacity(0, 0.2),
        officiallyAutonomousLabel().x(1000, 0.2, linear),
        officiallyAutonomousLabel().opacity(0, 0.2),
    )

    yield* beginSlide("Out");
});