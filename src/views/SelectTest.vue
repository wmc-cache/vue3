<template>
	<div>
		<video
			ref="video"
			autoplay
		></video>
		<video ref="reVideo"></video>
		<button ref="start">start</button>
		<button ref="play">play</button>
		<button ref="download">download</button>
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
				videoplay.srcObject = stream;
				navigator.mediaDevices.enumerateDevices().then(res => {
					console.log(res);
				});
			});
    });
    const startVideo =  () =>{

    }
		return { video,reVideo,start,play,download };
	}
});
</script>


<style>
</style>
