import {FFmpeg} from "@ffmpeg/ffmpeg";
const coreURL = require('@ffmpeg/core');
const wasmURL = require('@ffmpeg/core/wasm');
// workerURL is not exported from @ffmpeg/core

const ffmpeg = new FFmpeg();

await ffmpeg.load({
    coreURL,
    wasmURL,
});
