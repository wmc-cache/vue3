<template>
	<div>
		<video
			ref="video"
			autoplay
		></video>
		<video ref="reVideo"></video>
		<button
			@click="startVideo"
			ref="start"
		>Start Record</button>
		<button
			@click="playVideo"
			disabled
			ref="play"
		>play</button>
		<button
			@click="downloadVideo"
			disabled
			ref="download"
		>download</button>
	</div>
</template>


<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
	name: "SelectTest",
	components: {},
	setup() {
		const video = ref();
		const reVideo = ref();
		const start = ref();
		const play = ref();
		const download = ref();
		onMounted(() => {
			const constraints = { video: true, audio: false };
			const ePromise = navigator.mediaDevices.getUserMedia(constraints);
			ePromise.then(stream => {
				const videoplay = video.value;
				window.stream = stream;
				videoplay.srcObject = stream;
				navigator.mediaDevices.enumerateDevices().then(res => {
					console.log(res);
				});
			});
		});
		//开始录制
		const startVideo = () => {
			if (start.value.textContent === "Start Record") {
				startRecord();
				start.value.textContent = "Stop Record";
				play.value.disabled = true;
				download.value.disabled = true;
			} else {
				stopRecord();
				start.value.textContent = "Start Record";
				play.value.disabled = false;
				download.value.disabled = false;
			}
		};
		//开始播放
		const playVideo = () => {
			var blob = new Blob(window.buffer, { type: "video/webm" });
			reVideo.value.src = window.URL.createObjectURL(blob);
			reVideo.value.srcObject = null;
			reVideo.value.controls = true;
			reVideo.value.play();
		};
		//下载视频
		const downloadVideo = () => {
			var blob = new Blob(buffer, { type: "video/webm" });
			var url = window.URL.createObjectURL(blob);
			var a = document.createElement("a");
			a.href = url;
			a.style.display = "none";
			a.download = "wmc.webm";
			a.click();
		};
		const startRecord = () => {
			window.buffer = [];

			const options = {
				mimeType: "video/webm;codecs=vp8"
			};

			if (!MediaRecorder.isTypeSupported(options.mimeType)) {
				console.error(`${options.mimeType} is not supported!`);
				return;
			}
			window.mediaRecorder = new MediaRecorder(window.stream, options);
			window.mediaRecorder.ondataavailable = handleDataAvailable;
			window.mediaRecorder.start(10);
		};

		const handleDataAvailable = e => {
			if (e && e.data && e.data.size > 0) {
				buffer.push(e.data);
			}
		};

		const stopRecord = () => {
			window.mediaRecorder.stop();
		};
		return { video, reVideo, start, play, download, startVideo, playVideo,downloadVideo };
	}
});
</script>


<style>
</style>
