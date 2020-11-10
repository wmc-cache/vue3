<template>
	<div>
		<video
			ref="video"
			autoplay
		></video>
		<!-- <video ref="playmedia"></video> -->
		<audio ref="playmedia"></audio>
		<button
			@click="startBtn"
			ref="start"
		>Start Record</button>
		<button
			@click="playBtn"
			disabled
			ref="play"
		>play</button>
		<button
			@click="downloadBtn"
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
		const playmedia = ref();
		const start = ref();
		const play = ref();
		const download = ref();
		onMounted(() => {
			const constraints = { video:false, audio: true };
			const ePromise = navigator.mediaDevices.getUserMedia(constraints);
			ePromise.then(stream => {
				//const videoplay = video.value;
				window.stream = stream;
				// videoplay.srcObject = stream;
				navigator.mediaDevices.enumerateDevices().then(res => {
					console.log(res);
				});
			});
		});
		//开始录制
		const startBtn = () => {
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
		const playBtn = () => {
			var blob = new Blob(window.buffer, { type: "audio/webm" });
			playmedia.value.src = window.URL.createObjectURL(blob);
			playmedia.value.srcObject = null;
			playmedia.value.controls = true;
			playmedia.value.play();
		};
		//下载视频
		const downloadBtn = () => {
			var blob = new Blob(buffer, { type: "audio/webm" });
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
				mimeType: "audio/webm"
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
		return { video, playmedia, start, play, download, startBtn, playBtn,downloadBtn };
	}
});
</script>


<style>
</style>
