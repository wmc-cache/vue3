<template>
	<div>
		<Header></Header>
		<div v-if="route.params.id==0">
			<div
				class="content"
				style="display:flex;flex-direction: column;margin-top:40px"
			>
				<a-button
					@click="goBack"
					type="danger"
					style="width:100px"
				>返回</a-button>

				<div
					v-show="state==1"
					style="display:flex;flex-direction: column;margin-top:40px"
				>
					<input
						ref="IdRef"
						style="margin-top:40px"
						placeholder="输入房间号"
					/>
					<a-button
						style="margin-top:40px"
						@click="sureID"
					>确认房间号</a-button>
				</div>

				<div
					v-show="state==2"
					style="display:flex;flex-direction: column;margin-top:40px"
				>
					<a-radio-group
						style="margin-top:40px"
						v-model:value="value1"
					>
						<a-radio-button value="1">法官(左)</a-radio-button>
						<a-radio-button value="2">法官(中)</a-radio-button>
						<a-radio-button value="3">法官(右)</a-radio-button>
						<a-radio-button value="4">书记员(左)</a-radio-button>
						<a-radio-button value="5">书记员(右)</a-radio-button>
						<a-radio-button value="6">被告</a-radio-button>
						<a-radio-button value="7">被告辩护律师</a-radio-button>
						<a-radio-button value="8">原告</a-radio-button>
						<a-radio-button value="9">原告辩护律师</a-radio-button>

					</a-radio-group>
					<a-button
						@click="enter"
						style="margin-top:40px"
					>进入</a-button>
				</div>

			</div>
		</div>
		<div v-else>
			<div class="content">
				<div class="bg">
					<div style="color:#ffbb33">房间号:{{route.params.id}}

					</div>
					<a-button
						type="danger"
						class="back"
						@click="goBack2"
					>离开房间</a-button>

					<!-- <a-button
						@click="on"
						class="on"
						type="danger"
					>开启音频</a-button> -->

					<!-- <a-button
						@click="off"
						class="off"
						type="danger"
					>关闭音频</a-button> -->

					<a-button class="item1">法官(左):{{item1}}</a-button>
					<a-button class="item2">法官(中):{{item2}}</a-button>
					<a-button class="item3">法官(右):{{item3}}</a-button>

					<a-button class="item4">书记员(左):{{item4}}</a-button>
					<a-button class="item5">书记员(右):{{item5}}</a-button>

					<a-button class="item6">被告:{{item6}}</a-button>
					<a-button class="item7">被告辩护律师:{{item7}}</a-button>

					<a-button class="item8">原告:{{item8}}</a-button>
					<a-button class="item9">原告辩护律师:{{item9}}</a-button>

				</div>
			</div>
			<!-- <a-button></a-button> -->
		</div>

	</div>
</template>

<script>
let rongRTC, room, stream, timer;
import Header from "@/views/room/header";
import Axios from "axios";
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
	name: "room",
	components: {
		Header
	},
	setup() {
		const IdRef = ref(null);
		const value1 = ref("1");
		const router = useRouter();
		const route = useRoute();
		let state = ref(1);

		let item1 = ref(null); //1
		let item2 = ref(null); //1
		let item3 = ref(null); //1
		let item4 = ref(null);
		let item5 = ref(null);
		let item6 = ref(null);
		let item7 = ref(null);
		let item8 = ref(null);
		let item9 = ref(null);

		onMounted(async () => {
			//console.log(route.params);
			timer = setInterval(async () => {
				const data = await Axios.post("emulation/findRoomInfos", {
					roomId: route.params.id
				});

				data.data.data.forEach(ele => {
					//	console.log("ele", ele);
					if (ele.roleId == 1) {
						item1.value = ele.username;
					}
					if (ele.roleId == 2) {
						item2.value = ele.username;
					}
					if (ele.roleId == 3) {
						item3.value = ele.username;
					}
					if (ele.roleId == 4) {
						item4.value = ele.username;
					}
					if (ele.roleId == 5) {
						item5.value = ele.username;
					}
					if (ele.roleId == 6) {
						item6.value = ele.username;
					}
					if (ele.roleId == 7) {
						item7.value = ele.username;
					}
					if (ele.roleId == 8) {
						item8.value = ele.username;
					}
					if (ele.roleId == 9) {
						item9.value = ele.username;
					}
				});
				//console.log("找房间信息", data.data.data);
			}, 2000);

			// appKey 可在融云开发者后台获取
			const im = RongIMLib.init({ appkey: "pvxdm17jpw3wr" });
			const token = localStorage.getItem("rongToken");

			// 添加事件监听器
			im.watch({
				// 连接状态监听
				status(evt) {
					console.log("连接状态码:", evt.status);
				},
				// 消息监听
				message(evt) {
					console.log("收到新消息:", evt.message);
				}
			});

			//连接服务器，在整个应用程序全局，只需要调用一次。IM 服务连接
			im.connect({ token })
				.then(user => {
					console.log("链接成功, 链接用户 id 为: ", user.id);
				})
				.catch(error => {
					console.log("链接失败: ", error.code, error.msg);
				});
		});
		onUnmounted(() => {
			clearInterval(timer);
			//rongRTC.destroy();
		});
		//确认房间号
		const sureID = async () => {
			if (IdRef.value.value == 0) {
				alert("非法房间");
				return;
			}
			const findRoom = await Axios.post("emulation/findRoom", {
				roomId: IdRef.value.value
			});
			console.log("找房间", findRoom.data.data);
			if (findRoom.data.data == null) {
				const data = await Axios.post("emulation/createRoom", {
					roomId: IdRef.value.value
				});
			}

			state.value = 2;

			localStorage.setItem("roomID", IdRef.value.value);
			//console.log(IdRef.value.value, value1);

			rongRTC = new RongRTC({
				RongIMLib: RongIMLib
			});

			let { Room, Stream, Message, Device, Storage, StreamType } = rongRTC;

			//实例化 Room 后可获得 room 实例
			room = new Room({
				// 音视频房间 ID
				id: IdRef.value.value, // 设置房间 ID
				joined: function(user) {
					// user.id 加入房间
					console.log("加入房间", user);
				},
				left: function(user) {
					// user.id 离开房间
				},
				kick: function(msg) {
					// 当前登录 user 被踢出房间
				}
			});

			stream = new Stream({
				// 成员已发布资源，此时可按需订阅
				published: function(user) {
					console.log("user???", user);
					stream.subscribe(user).then(user => {
						let {
							id,
							stream: { tag, mediaStream }
						} = user;
						console.log("收到流");
						// 订阅成功后会获取到对方媒体流，将媒体流添加到页面上的 video 节点即可展示对方音视频画面
						let node = document.createElement("audio");
						node.autoplay = true;
						node.srcObject = mediaStream;
						node.id = id;
						document.body.appendChild(node);
					});
				},
				// 成员已取消发布资源，此时需关闭流
				unpublished: function(user) {
					// 当对方成员取消订阅后，会自动触发此函数，此时己方取消订阅对方音视频流，然后做页面移除对方 video 节点即可
					stream.unsubscribe(user).then(function() {
						let node = document.getElementById(user.id);
						node.remove();
					});
				}
			});
		};
		//进入房间
		const enter = async () => {
			const findRoomInfo = await Axios.post("emulation/findRoomInfo", {
				roomId: IdRef.value.value
			});
			console.log("房间信息", findRoomInfo.data.data);

			if (findRoomInfo.data.data == null) {
				const data = await Axios.post("emulation/createRoomInfo", {
					roomId: IdRef.value.value,
					roleId: value1.value
				});
			}

			router.push({ path: `${IdRef.value.value}` });
			const id = localStorage.getItem("ID");
			let user = {
				id: id
			};
			//进入房间
			//console.log("room", room);
			room.join(user).then(
				() => {
					console.log(user, "join successfully");
				},
				error => {
					console.log(error);
				}
			);
			on();
		};
		//发布资源
		const on = () => {
			stream.get().then(
				function({ mediaStream }) {
					console.log("本机流", mediaStream);
					const id = localStorage.getItem("ID");
					let user = {
						id: id,
						stream: {
							tag: "自定义流标签",
							type: 1,
							mediaStream: mediaStream
						}
					};
					//发布流
					stream.publish(user).then(
						() => {
							console.log("发布成功");
						},
						error => {
							console.log("streamPublish", error);
						}
					);
				},
				error => {
					console.error(error);
				}
			);

			//获取房间信息
			room.get().then(
				room => {
					console.log("111111", room);
				},
				error => {
					console.log(error);
				}
			);
		};
		//off
		const off = () => {
			console.log(room);
			room.leave().then(
				() => {
					console.log("leave successfully");
				},
				error => {
					console.log(error);
				}
			);
		};
		//返回
		const goBack = () => {
			router.go(-1);
		};

		const goBack2 = () => {
			room.leave().then(
				() => {
					console.log("leave successfully");
				},
				error => {
					console.log(error);
				}
			);
			item1.value = null;
			item2.value = null;
			item3.value = null;
			item4.value = null;
			item5.value = null;
			item6.value = null;
			item7.value = null;
			item8.value = null;
			item9.value = null;
			router.go(-2);
		};

		return {
			value1,
			goBack,
			goBack2,
			sureID,
			IdRef,
			enter,
			route,
			on,
			off,
			state,
			item1,
			item2,
			item3,
			item4,
			item5,
			item6,
			item7,
			item8,
			item9
		};
	}
});
</script>

<style scoped>
.content {
	width: 1200px;
}
.bg {
	width: 1200px;
	height: 600px;
	background-image: url("https://www.xxlun.com/website/file/room.jpg");
	background-size: cover;
	display: flex;
	position: relative;
}
.back {
	position: absolute;
	right: 0;
}
.on {
	position: absolute;
	right: 0;
	bottom: 0;
}
.off {
	position: absolute;
	left: 0;
	bottom: 0;
}
.item1 {
	position: absolute;
	right: 690px;
	bottom: 300px;
}
.item2 {
	position: absolute;
	right: 570px;
	bottom: 400px;
}
.item3 {
	position: absolute;
	right: 450px;
	bottom: 300px;
}
.item4 {
	position: absolute;
	right: 700px;
	bottom: 180px;
}
.item5 {
	position: absolute;
	right: 450px;
	bottom: 180px;
}
.item6 {
	position: absolute;
	right: 850px;
	bottom: 120px;
}
.item7 {
	position: absolute;
	right: 950px;
	bottom: 60px;
}
.item8 {
	position: absolute;
	right: 250px;
	bottom: 120px;
}
.item9 {
	position: absolute;
	right: 150px;
	bottom: 60px;
}
</style>