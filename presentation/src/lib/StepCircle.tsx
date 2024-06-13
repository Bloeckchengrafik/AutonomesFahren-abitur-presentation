import {Node, NodeProps, signal, Circle, Txt, Rect} from "@motion-canvas/2d";
import {
    all,
    createRef,
    easeInOutCubic,
    PossibleColor,
    SignalValue,
    SimpleSignal, Vector2,
    Vector2Signal
} from "@motion-canvas/core";

export interface StepCircleProps extends NodeProps {
    size?: SignalValue<number>;
    backgroundColor?: SignalValue<PossibleColor>;
    disabledColor?: SignalValue<PossibleColor>;
    activeColor?: SignalValue<PossibleColor>;
    step?: SignalValue<string>;
    animation?: SignalValue<number>;
    opacity?: SignalValue<number>;
}

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export class StepCircle extends Node {
    @signal()
    public declare readonly size: SimpleSignal<number, this>;

    @signal()
    public declare readonly backgroundColor: SimpleSignal<PossibleColor, this>;

    @signal()
    public declare readonly disabledColor: SimpleSignal<PossibleColor, this>;

    @signal()
    public declare readonly activeColor: SimpleSignal<PossibleColor, this>;

    @signal()
    public declare readonly step: SimpleSignal<string, this>;

    @signal()
    public declare readonly animation: SimpleSignal<number, this>;

    @signal()
    public declare readonly opacity: SimpleSignal<number, this>;

    private textOpacity: SimpleSignal<number, Txt>;
    private textSize: Vector2Signal<Txt>;

    public constructor(props?: StepCircleProps) {
        super({
            ...props,
        });

        console.assert(props !== null, "props is required");
        console.assert(props !== undefined, "props is undefined");
        console.assert(props.size !== undefined, "size is undefined");
        console.assert(props.backgroundColor !== undefined, "props.backgroundColor is required");
        console.assert(props.disabledColor !== undefined, "props.disabledColor is required");
        console.assert(props.activeColor !== undefined, "props.activeColor is required");
        console.assert(props.animation !== undefined, "props.animation is required");
        console.assert(props.step !== undefined, "props.step is required");

        const text = createRef<Txt>();

        this.add(
            <Circle
                width={this.size} height={this.size} opacity={this.opacity}
                fill={this.backgroundColor}
                lineWidth={4} stroke={this.disabledColor}
                layout justifyContent={"center"} alignItems={"center"}>

                <Circle width={() => lerp(0, this.size(), this.animation())}
                        height={() => lerp(0, this.size(), this.animation())} opacity={this.opacity}
                        fill={this.activeColor} layout={false}/>

                <Txt fontSize={() => this.size() / 2} fontFamily={"Roboto"} fill={"white"} text={this.step}
                     marginTop={10}
                     marginRight={5} ref={text}/>
            </Circle>
        )

        this.textOpacity = text().opacity;
        this.textSize = text().scale;
    }

    public* playAnimation() {
        yield* all(
            this.animation(1.1, 0.4, easeInOutCubic).to(1, 0.2, easeInOutCubic),
            this.textOpacity(0, 0.1, easeInOutCubic).to(0, 0.2).to(1, 0.3, easeInOutCubic),
            this.textSize(new Vector2(1, 1), 0.2).to(new Vector2(1.1, 1.1), 0.2, easeInOutCubic).to(new Vector2(1, 1), 0.1, easeInOutCubic)
        );
    }
}