import {Img, makeScene2D, Txt, Node, Rect, Line, Circle} from "@motion-canvas/2d";
import {
    all,
    beginSlide,
    chain,
    createRef, delay,
    easeInOutCubic,
    linear,
    sequence,
    Vector2,
    waitFor
} from "@motion-canvas/core";
import {Theme} from "../lib/colors";
import {loopUntilSlide} from "../lib/utils";

export default makeScene2D(function* (view) {
    const title = createRef<Txt>()
    view.add(<Txt ref={title} fontSize={50} fontFamily={"Roboto"} fill={"white"}
                  text={"Autonomes Fahren in der Logistik"} opacity={0}/>)

    yield* title().opacity(1, 0.5);
    yield* title().y(-450, 0.4, easeInOutCubic);
    yield* beginSlide("Stefan Thömmes");
    const interviewImageRef = createRef<Node>();
    view.add(<Rect opacity={0} y={50} ref={interviewImageRef} padding={20} layout gap={20} radius={40} fill={Theme.bg}>
        <Img src="../assets/sthoemmes.jpg" width={200} height={200} radius={20}/>
        <Rect layout gap={20} direction="column" justifyContent="center" alignItems="start">
            <Txt fontSize={40} fontFamily={"Roboto"} fill={"white"} textAlign={"left"}
                 text={"Stefan Thömmes"}/>
            <Txt fontSize={25} fontFamily={"Roboto"} fill={"#ccc"} textAlign={"left"}
                 text={"Operative Entwicklung \nTrans-o-Flex Express GmbH"}/>
        </Rect>
    </Rect>);

    yield* all(
        interviewImageRef().opacity(1, 0.5, easeInOutCubic),
        interviewImageRef().y(-5, 0.3, easeInOutCubic).to(0, 0.2, easeInOutCubic),
    )

    yield* beginSlide("In der Halle");
    yield* all(
        interviewImageRef().opacity(0, 0.5, easeInOutCubic),
        interviewImageRef().y(50, 0.5, easeInOutCubic),
    )

    function points(dx: number, dy: number) {
        return [
            new Vector2(-1200, 200+dy),
            new Vector2(dx, 200+dy),
            new Vector2(dx, -200+dy),
            new Vector2(1200, -200+dy)
        ]
    }

    const roadLeftRef = createRef<Line>();
    const roadRightRef = createRef<Line>();
    const roadMiddleRef = createRef<Line>();
    view.add(<Line ref={roadLeftRef} radius={20} opacity={0} points={points(50, 50)} stroke={'white'} lineWidth={8} />);
    view.add(<Line ref={roadRightRef} radius={20} opacity={0} points={points(-50, -50)} stroke={'white'} lineWidth={8} />);
    view.add(<Line ref={roadMiddleRef} radius={20} opacity={0} points={points(0, 0)} stroke={'white'} lineWidth={8} lineDash={[30, 30]} />);

    const paletteBotRef = createRef<Circle>();
    view.add(<Circle ref={paletteBotRef} size={120} opacity={0} fill={"#24211dcc"} stroke={Theme.stroke} lineWidth={6} y={200} x={-800}/>);

    yield chain(
        waitFor(1),
        all(
            paletteBotRef().opacity(1, 0.5, easeInOutCubic),
            paletteBotRef().x(0, 4, linear),
        ),
        paletteBotRef().y(-200, 4, linear),
        paletteBotRef().x(700, 4, linear),
        paletteBotRef().opacity(0, 0.5, easeInOutCubic),
    )

    yield* all(
        roadLeftRef().opacity(0.7, 0.5, easeInOutCubic),
        roadRightRef().opacity(0.7, 0.5, easeInOutCubic),
        roadMiddleRef().opacity(0.7, 0.5, easeInOutCubic),
        loopUntilSlide("fixedRouteEnd", () => roadMiddleRef().lineDashOffset(-60, 1, linear).to(0, 0)),
    )

    yield* all(
        roadLeftRef().opacity(0, 0.5, easeInOutCubic),
        roadRightRef().opacity(0, 0.5, easeInOutCubic),
        roadMiddleRef().opacity(0, 0.5, easeInOutCubic),
    )

    yield* beginSlide("LKWs");

    paletteBotRef().opacity(0)

    const lkwRef = createRef<Img>();
    const trainRef = createRef<Img>();
    view.add(<Img ref={lkwRef} src="../assets/truck.svg" size={100} radius={20} opacity={0} x={-100} y={50}/>);
    view.add(<Img ref={trainRef} src="../assets/train.svg" size={100} radius={20} opacity={0} x={100} y={50}/>);

    yield* all(
        delay(0.2, lkwRef().opacity(1, 0.5, easeInOutCubic)),
        delay(0.4, trainRef().opacity(1, 0.5, easeInOutCubic)),
        delay(0.2, lkwRef().y(-5, 0.3, linear).to(0, 0.2, linear)),
        delay(0.4, trainRef().y(-5, 0.3, linear).to(0, 0.2, linear)),
    )

    yield* beginSlide("train bad");
    yield* trainRef().opacity(0.4, 0.5, easeInOutCubic);

    yield* beginSlide("out");
    yield* all(
        delay(0.2, lkwRef().opacity(0, 0.5, easeInOutCubic)),
        delay(0.4, trainRef().opacity(0, 0.5, easeInOutCubic)),
        title().opacity(0, 0.5),
    )
})