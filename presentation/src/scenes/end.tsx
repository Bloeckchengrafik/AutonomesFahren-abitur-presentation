import {makeScene2D, Rect, Txt, Img, Node, Layout, LayoutProps, NodeProps} from "@motion-canvas/2d";
import {all, beginSlide, createRef, linear, loop, range, Reference} from "@motion-canvas/core";
import {loopUntilSlide} from "../lib/utils";
import {SUBTITLE, TITLE, TOP_TITLE} from "./intro";

const URL = "https://github.com/Bloeckchengrafik/AutonomesFahren-abitur-presentation"

const YELLOW = '#FFC66D';
const RED = '#FF6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';

const Trail = (props: LayoutProps) => (
    <Layout layout direction={'column'} gap={30} offsetY={-1} {...props} />
);

class MotionCanvasLogo extends Node {
    private star: Reference<Node>;
    private trail1: Reference<Layout>;
    private trail2: Reference<Layout>;
    private trail3: Reference<Layout>;
    private dot: Reference<Rect>;

    constructor(props?: NodeProps) {
        super({
            ...props,
        });

        this.star = createRef<Node>();
        this.trail1 = createRef<Layout>();
        this.trail2 = createRef<Layout>();
        this.trail3 = createRef<Layout>();
        this.dot = createRef<Rect>();

        this.add(
            <>
                <Node rotation={-45} position={44} scale={0.8} cache>
                    <Node cache y={-270}>
                        <Trail ref={this.trail1}>
                            {range(3).map(_ => (
                                <Rect width={40} radius={20} height={120} fill={YELLOW}/>
                            ))}
                        </Trail>
                        <Rect
                            width={40}
                            radius={20}
                            height={270}
                            fill={'white'}
                            offsetY={-1}
                            compositeOperation={'destination-in'}
                        />
                    </Node>
                    <Node cache x={-70} y={-200}>
                        <Trail ref={this.trail2}>
                            {range(3).map(_ => (
                                <Rect width={40} height={120} radius={20} fill={RED}/>
                            ))}
                        </Trail>
                        <Rect
                            width={40}
                            radius={20}
                            height={180}
                            fill={'white'}
                            offsetY={-1}
                            compositeOperation={'destination-in'}
                        />
                    </Node>
                    <Node cache x={70} y={-300}>
                        <Trail ref={this.trail3}>
                            {range(4).map(i => (
                                <Rect
                                    ref={i === 1 ? this.dot : undefined}
                                    width={40}
                                    radius={20}
                                    height={100}
                                    fill={i === 0 ? GREEN : BLUE}
                                    offsetY={1}
                                />
                            ))}
                        </Trail>
                        <Rect
                            width={40}
                            radius={20}
                            height={220}
                            fill={'white'}
                            offsetY={-1}
                            y={60}
                            compositeOperation={'destination-in'}
                        />
                    </Node>
                    <Node ref={this.star}>
                        {range(5).map(i => (
                            <Rect
                                width={100}
                                radius={50}
                                height={150}
                                fill={'white'}
                                offsetY={1}
                                rotation={(360 / 5) * i}
                                compositeOperation={'destination-out'}
                            />
                        ))}
                        {range(5).map(i => (
                            <Rect
                                width={40}
                                radius={20}
                                height={120}
                                fill={'white'}
                                offsetY={1}
                                rotation={(360 / 5) * i}
                            />
                        ))}
                    </Node>
                </Node>
            </>,
        );
    }

    public* animateInAndWait() {
        const trail1 = this.trail1;
        const trail2 = this.trail2;
        const trail3 = this.trail3;
        const dot = this.dot;
        yield* loopUntilSlide("done", () => all(
            loop(2, function* () {
                yield* all(
                    trail3().position.y(-130, 2, linear),
                    dot().fill(GREEN, 2, linear),
                );
                dot().fill(BLUE);
                trail3().position.y(0);
            }),
            loop(2, function* () {
                yield* trail2().position.y(-150, 2, linear);
                trail2().position.y(0);
            }),
            loop(4, function* () {
                yield* trail1().position.y(-150, 1, linear);
                trail1().position.y(0);
            }),
            this.star().rotation(360, 4, linear).to(0, 0),
        ))
    }
}

export default makeScene2D(function* (view) {
    const urlbar = createRef<Rect>();
    view.add(<Rect layout gap={5} ref={urlbar} opacity={0} y={450}>
        <Img src={"../assets/gh.svg"} width={30} height={30}/>
        <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} paddingLeft={10} text={URL}/>
    </Rect>);

    const title = createRef<Rect>();
    view.add(<Rect layout justifyContent={"start"} direction={"column"} ref={title} opacity={0}>
        <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} paddingLeft={10} text={TOP_TITLE}></Txt>
        <Txt fontSize={70} fontFamily={"Roboto"} fill={"white"} text={TITLE}></Txt>
        <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} paddingLeft={190} text={SUBTITLE}></Txt>
    </Rect>)

    const logo = createRef<MotionCanvasLogo>();
    const logoContainer = createRef<Rect>();
    view.add(
        <Rect layout gap={5} y={380} ref={logoContainer} opacity={0}>
            <Rect layout={false} x={-200}>
                <MotionCanvasLogo ref={logo} scale={0.2}/>
            </Rect>
            <Txt fontSize={30} fontFamily={"Roboto"} fill={"white"} textAlign={"left"} paddingLeft={100}
                 text={"Made with Motion Canvas"}/>
        </Rect>
    );

    yield* all(
        logo().animateInAndWait(),
        urlbar().opacity(1, 0.5),
        logoContainer().opacity(1, 0.5),
        title().opacity(1, 0.5),
    );

    const blackScreen = createRef<Rect>();
    view.add(<Rect ref={blackScreen} opacity={0} fill={"black"} zIndex={100} width={10000} height={10000} />);

    yield* blackScreen().opacity(1, 2);

    yield* beginSlide("fin");
})