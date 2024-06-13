import {Img, Rect, Txt, View2D} from "@motion-canvas/2d";
import {createRef} from "@motion-canvas/core";
import {Theme} from "./colors";

const AUTHOR = "Christian Bergschneider";

export function Topography(view: View2D, opacity = 1) {
    const background = createRef<Rect>();
    view.add(
        <Rect ref={background} scale={1.4} opacity={opacity}>
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

    return background;
}

export function Author(view: View2D, opacity = 1) {
    const author = createRef<Txt>();
    view.add(<Txt fill={Theme.stroke} ref={author} fontSize={30} y={500} opacity={opacity} text={AUTHOR}/>)
    return author;
}