import {Img, makeScene2D, Rect, Txt} from '@motion-canvas/2d';

import {Theme} from '../lib/colors';
import {all, beginSlide, createRef, Direction, easeInOutCubic, slideTransition} from "@motion-canvas/core";

const TITLE = "Autonomes Fahren";
const SUBTITLE = "Rechtslage in Deutschland und der EU";
const AUTHOR = "Christian Bergschneider";

const TITLE_SCALE = 200;
const TITLE_W = 3.3 * TITLE_SCALE;
const TITLE_H = TITLE_SCALE;

export default makeScene2D(function* (view) {
    yield* beginSlide("empty");

    const background = createRef<Img>();

    view.add(
        <Rect ref={background} scale={1.4} opacity={0.01}>
            <Img src="../assets/topography.svg" width={600} height={600} x={-700} y={-300}/>
            <Img src="../assets/topography.svg" width={600} height={600} x={-700} y={300}/>

            <Img src="../assets/topography.svg" width={600} height={600} x={-100} y={-300}/>
            <Img src="../assets/topography.svg" width={600} height={600} x={-100} y={300}/>

            <Img src="../assets/topography.svg" width={600} height={600} x={500} y={-300}/>
            <Img src="../assets/topography.svg" width={600} height={600} x={500} y={300}/>

            <Img src="../assets/topography.svg" width={600} height={600} x={1100} y={-300}/>
            <Img src="../assets/topography.svg" width={600} height={600} x={1100} y={300}/>
        </Rect>
    )

    const title = createRef<Txt>();
    const subtitle = createRef<Txt>();
    const author = createRef<Txt>();

    view.add(<Rect layout justifyContent={"start"} direction={"column"}>
        <Txt ref={title} fontSize={70} fontFamily={"Roboto"} fill={"white"} opacity={0} text={TITLE}></Txt>
        <Txt ref={subtitle} fontSize={30} fontFamily={"Roboto"} fill={"white"} opacity={0} text={SUBTITLE}></Txt>
    </Rect>)

    view.add(<Txt fill={Theme.stroke} ref={author} fontSize={30} y={500} opacity={0} text={AUTHOR}/>)

    const emptySpace = createRef<Rect>();
    const box = createRef<Rect>();
    const line = createRef<Rect>();

    view.add(<Rect layout width={TITLE_W} height={TITLE_H} gap={10} justifyContent={"start"}>
        <Rect ref={emptySpace} grow={0}></Rect>
        <Rect ref={box} fill={Theme.stroke} grow={0} minHeight={TITLE_H}/>
        <Rect ref={line} fill={Theme.stroke} minHeight={TITLE_H} width={4} opacity={0}/>
    </Rect>)

    yield* all(
        box().grow(1, 0.35, easeInOutCubic),
        line().opacity(1, 0.1)
    )

    title().opacity(1)
    subtitle().opacity(1)

    yield* all(
        emptySpace().grow(1, 0.5, easeInOutCubic),
        box().grow(0, 0.5, easeInOutCubic),
        line().opacity(1, 0.4).to(0, 0.1),
        author().opacity(1, 0.4),
        background().opacity(0.4, 0.4),
    )

    yield* beginSlide("1");
});