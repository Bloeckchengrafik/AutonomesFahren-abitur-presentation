import {beginSlide, cancel, loop, PlaybackState, ThreadGenerator, usePlayback, waitUntil} from "@motion-canvas/core";

export function* loopUntilSlide(
    name: string,
    slideLoop: () => ThreadGenerator,
): ThreadGenerator {
    const loopTask = yield loop(Infinity, slideLoop);

    if (usePlayback().state != PlaybackState.Presenting) {
        yield* waitUntil(name);
    }
    yield* beginSlide(name);

    cancel(loopTask);
}