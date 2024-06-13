import {makeScene2D, Rect, Txt, Layout} from '@motion-canvas/2d';

import {DARK_BLUE, Theme} from '../lib/colors';
import {all, beginSlide, createRef, easeInOutCubic} from "@motion-canvas/core";
import {Author, Topography} from "../lib/components";
import {StepCircle} from "../lib/StepCircle";

export const TOP_TITLE = "Die Herausforderung";
export const TITLE = "Autonomes Fahren";
export const SUBTITLE = "in der modernen Gesellschaft";

export const TITLE_SCALE = 200;
export const TITLE_W = 3.3 * TITLE_SCALE;
export const TITLE_H = TITLE_SCALE;

export default makeScene2D(function* (view) {
    yield* beginSlide("Titel");

    const background = Topography(view, 0.001);

    const titleBox = createRef<Rect>();

    view.add(<Rect layout justifyContent={"start"} direction={"column"} ref={titleBox} opacity={0}>
        <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} paddingLeft={10} text={TOP_TITLE}></Txt>
        <Txt fontSize={70} fontFamily={"Roboto"} fill={"white"} text={TITLE}></Txt>
        <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} paddingLeft={190} text={SUBTITLE}></Txt>
    </Rect>)


    const emptySpace = createRef<Rect>();
    const box = createRef<Rect>();
    const line = createRef<Rect>();
    const overlayBox = createRef<Rect>();

    view.add(<Rect layout width={TITLE_W} height={TITLE_H} gap={10} justifyContent={"start"} ref={overlayBox}>
        <Rect ref={emptySpace} grow={0}></Rect>
        <Rect ref={box} fill={Theme.stroke} grow={0} minHeight={TITLE_H}/>
        <Rect ref={line} fill={Theme.stroke} minHeight={TITLE_H} width={4} opacity={0}/>
    </Rect>)

    const author = Author(view, 0);

    yield* all(
        box().grow(1, 0.35, easeInOutCubic),
        line().opacity(1, 0.1)
    )

    titleBox().opacity(1)

    yield* all(
        emptySpace().grow(1, 0.5, easeInOutCubic),
        box().grow(0, 0.5, easeInOutCubic),
        line().opacity(1, 0.4).to(0, 0.1),
        author().opacity(1, 0.4),
        background().opacity(1, 0.4),
    )

    yield* beginSlide("Zentrale Fragestellung");

    // Slide up to reveal "Wie kann autonomes Fahren bei der Lösung aktueller gesellschaftlicher Fragen risikoarm unterstützen?"

    const questionSlidePanel = createRef<Rect>();
    view.add(<Rect ref={questionSlidePanel} layout direction={"column"} height={TITLE_H} gap={10}
                   justifyContent={"start"} opacity={0} y={TITLE_H}>
        <Txt fontSize={30} fontFamily={"Roboto"} fill={Theme.stroke} textAlign={"center"} paddingLeft={10}
             text={"Zentrale Fragestellung"}/>
        <Txt fontSize={50} fontFamily={"Roboto"} fill={"white"} textAlign={"center"} paddingLeft={10}
             text={"Wie kann autonomes Fahren \nbei der Lösung aktueller gesellschaftlicher Fragen \nrisikoarm unterstützen?"}/>
    </Rect>)

    yield* all(
        titleBox().y(TITLE_H * -1, 0.5, easeInOutCubic),
        questionSlidePanel().y(0, 0.5, easeInOutCubic),
        titleBox().opacity(0, 0.5),
        questionSlidePanel().opacity(1, 0.5),
    )

    // optimize by dropping the title box
    titleBox().remove()
    overlayBox().remove()

    yield* beginSlide("Überblick über die Präsentation");

    const overviewPanel = createRef<Rect>();
    const firstStep = createRef<StepCircle>();
    const firstStepLine = createRef<Rect>();
    const secondStep = createRef<StepCircle>();
    const secondStepLine = createRef<Rect>();
    const thirdStep = createRef<StepCircle>();
    const thirdStepLine = createRef<Rect>();
    const fourthStep = createRef<StepCircle>();

    const firstStepText = createRef<Txt>();
    const secondStepText = createRef<Txt>();
    const thirdStepText = createRef<Txt>();
    const fourthStepText = createRef<Txt>();

    const DISTANCE = 350;
    const WIDTH = 400;

    view.add(<Rect ref={overviewPanel} layout direction={"row"} height={TITLE_H} alignItems={"center"}
                   justifyContent={"start"} opacity={0} y={TITLE_H}>
        <StepCircle size={100} backgroundColor={Theme.bg} disabledColor={Theme.stroke} activeColor={DARK_BLUE}
                    step={"1"} animation={0} opacity={0} ref={firstStep} y={50}/>
        <Rect width={DISTANCE} height={3} fill={Theme.stroke} opacity={0} ref={firstStepLine}/>
        <StepCircle size={100} backgroundColor={Theme.bg} disabledColor={Theme.stroke} activeColor={DARK_BLUE}
                    step={"2"} animation={0} opacity={0} ref={secondStep} y={50}/>
        <Rect width={DISTANCE} height={3} fill={Theme.stroke} opacity={0} ref={secondStepLine}/>
        <StepCircle size={100} backgroundColor={Theme.bg} disabledColor={Theme.stroke} activeColor={DARK_BLUE}
                    step={"3"} animation={0} opacity={0} ref={thirdStep} y={50}/>
        <Rect width={DISTANCE} height={3} fill={Theme.stroke} opacity={0} ref={thirdStepLine}/>
        <StepCircle size={100} backgroundColor={Theme.bg} disabledColor={Theme.stroke} activeColor={DARK_BLUE}
                    step={"4"} animation={0} opacity={0} ref={fourthStep} y={50}/>
        <Rect layout={false} height={200} y={130}>
            <Layout layout direction={"row"} alignItems={"center"} justifyContent={"center"} gap={40}>
                <Txt
                    fontSize={40}
                    fontFamily={"Roboto"}
                    fill={"white"}
                    text={"Die SAE-Skala"}
                    width={WIDTH}
                    textAlign={"center"}
                    ref={firstStepText}
                    opacity={0}
                />

                <Txt
                    fontSize={40}
                    fontFamily={"Roboto"}
                    fill={"white"}
                    textAlign={"center"}
                    text={"Politisches Framework\nfür autonomes Fahren"}
                    width={WIDTH}
                    ref={secondStepText}
                    opacity={0}
                />

                <Txt
                    fontSize={40}
                    fontFamily={"Roboto"}
                    fill={"white"}
                    text={"Soziale Chancen\nund Risiken"}
                    width={WIDTH}
                    textAlign={"center"}
                    ref={thirdStepText}
                    opacity={0}
                />

                <Txt
                    fontSize={40}
                    fontFamily={"Roboto"}
                    fill={"white"}
                    text={"Außerhalb des\nPersonenverkehrs"}
                    width={WIDTH}
                    textAlign={"center"}
                    ref={fourthStepText}
                    opacity={0}
                />
            </Layout>
        </Rect>
    </Rect>)

    yield* all(
        questionSlidePanel().y(TITLE_H * -1, 0.5, easeInOutCubic),
        overviewPanel().y(-50, 0.5, easeInOutCubic),
        questionSlidePanel().opacity(0, 0.5),
        overviewPanel().opacity(1, 0.5),

        firstStep().opacity(0, 0.1).to(1, 0.5),
        firstStep().y(50, 0.1).to(-10, 0.5, easeInOutCubic).to(0, 0.2, easeInOutCubic),

        secondStep().opacity(0, 0.3).to(1, 0.5),
        secondStep().y(50, 0.3).to(-10, 0.5, easeInOutCubic).to(0, 0.2, easeInOutCubic),

        thirdStep().opacity(0, 0.5).to(1, 0.5),
        thirdStep().y(50, 0.5).to(-10, 0.5, easeInOutCubic).to(0, 0.2, easeInOutCubic),

        fourthStep().opacity(0, 0.7).to(1, 0.5),
        fourthStep().y(50, 0.7).to(-10, 0.5, easeInOutCubic).to(0, 0.2, easeInOutCubic),
        firstStepLine().opacity(0, 0.1 + 0.5).to(1, 0.5),
        secondStepLine().opacity(0, 0.3 + 0.5).to(1, 0.5),
        thirdStepLine().opacity(0, 0.5 + 0.5).to(1, 0.5),
    )

    yield* beginSlide("SAE");

    yield* all(
        firstStep().playAnimation(),
        firstStep().disabledColor(DARK_BLUE, 0.3),
        firstStepText().opacity(1, 0.3),
    )

    yield* beginSlide("Politisches Framework");

    yield* all(
        secondStep().playAnimation(),
        secondStep().disabledColor(DARK_BLUE, 0.3),
        firstStepLine().fill(DARK_BLUE, 0.3),
        secondStepText().opacity(1, 0.3),
    )

    yield* beginSlide("Soziale Chancen und Risiken");

    yield* all(
        thirdStep().playAnimation(),
        thirdStep().disabledColor(DARK_BLUE, 0.3),
        secondStepLine().fill(DARK_BLUE, 0.3),
        thirdStepText().opacity(1, 0.3),
    )

    yield* beginSlide("Außerhalb des Personenverkehrs");

    yield* all(
        fourthStep().playAnimation(),
        fourthStep().disabledColor(DARK_BLUE, 0.3),
        thirdStepLine().fill(DARK_BLUE, 0.3),
        fourthStepText().opacity(1, 0.3),
    )

    yield* beginSlide("Out");

    yield* all(
        firstStepLine().opacity(0, 0.2),
        secondStepLine().opacity(0, 0.2),
        thirdStepLine().opacity(0, 0.2),

        firstStepText().opacity(1, 0.2).to(0, 0.2),
        secondStepText().opacity(1, 0.4).to(0, 0.2),
        thirdStepText().opacity(1, 0.6).to(0, 0.2),
        fourthStepText().opacity(1, 0.8).to(0, 0.2),

        firstStep().opacity(1, 0.2).to(0, 0.3, easeInOutCubic),
        secondStep().opacity(1, 0.4).to(0, 0.3, easeInOutCubic),
        thirdStep().opacity(1, 0.6).to(0, 0.3, easeInOutCubic),
        fourthStep().opacity(1, 0.8).to(0, 0.3, easeInOutCubic),

        firstStep().y(0, 0.1).to(-50, 0.3, easeInOutCubic),
        secondStep().y(0, 0.3).to(-50, 0.3, easeInOutCubic),
        thirdStep().y(0, 0.5).to(-50, 0.3, easeInOutCubic),
        fourthStep().y(0, 0.7).to(-50, 0.3, easeInOutCubic),

        firstStepText().y(0, 0.1).to(-50, 0.3, easeInOutCubic),
        secondStepText().y(0, 0.3).to(-50, 0.3, easeInOutCubic),
        thirdStepText().y(0, 0.5).to(-50, 0.3, easeInOutCubic),
        fourthStepText().y(0, 0.7).to(-50, 0.3, easeInOutCubic),
    )

    yield* all(
        background().opacity(0, 0.2),
        author().opacity(0, 0.2),
    )

    yield* beginSlide("Done");
});