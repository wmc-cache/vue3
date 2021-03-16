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
			<div
				class="content"
				style="display:flex;flex-direction: column;"
			>
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
					>开启音频</a-button>

					<a-button
						@click="off"
						class="off"
						type="danger"
					>关闭音频</a-button> -->

					<a-button
						@click="close(uid1,tip1,id1,roleId1)"
						class="item1"
					>法官(左)<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img1}`"
							alt=""
						>{{item1}}:{{tip1}}</a-button>
					<a-button
						@click="close(uid2,tip2,id2,roleId2)"
						class="item2"
					>法官(中)<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img2}`"
							alt=""
						>{{item2}}:{{tip2}}</a-button>
					<a-button
						@click="close(uid3,tip3,id3,roleId3)"
						class="item3"
					>法官(右)<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img3}`"
							alt=""
						>{{item3}}:{{tip3}}</a-button>

					<a-button
						@click="close(uid4,tip4,id4,roleId4)"
						class="item4"
					>书记员(左)<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img4}`"
							alt=""
						>{{item4}}:{{tip4}}</a-button>
					<a-button
						@click="close(uid5,tip5,id5,roleId5)"
						class="item5"
					>书记员(右)<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img5}`"
							alt=""
						>{{item5}}:{{tip5}}</a-button>

					<a-button
						@click="close(uid6,tip6,id6,roleId6)"
						class="item6"
					>被告<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img6}`"
							alt=""
						>{{item6}}:{{tip6}}</a-button>
					<a-button
						@click="close(uid7,tip7,id7,roleId7)"
						class="item7"
					>被告辩护律师<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img7}`"
							alt=""
						>{{item7}}:{{tip7}}</a-button>

					<a-button
						@click="close(uid8,tip8,id8,roleId8)"
						class="item8"
					>原告<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img8}`"
							alt=""
						>{{item8}}:{{tip8}}</a-button>
					<a-button
						@click="close(uid9,tip9,id9,roleId9)"
						class="item9"
					>原告辩护律师<img
							style="width:25px;height:25px"
							:src="`https://peri.xxlun.com/emulation/img/${img9}`"
							alt=""
						>{{item9}}:{{tip9}}</a-button>

				</div>
				<div style="display:flex">
					<a-button
						type="primary"
						@click="showDrawer"
					>打开聊天记录</a-button>
					<a-button
						@click="closeDrawer"
						type="danger"
					>关闭聊天记录</a-button>
				</div>
				<div style="display:flex">
					<a-input v-model:value="message"></a-input>
					<a-button @click="postMessage">发送</a-button>
				</div>

				<room-upload></room-upload>

				<a-drawer
					:mask="false"
					title="聊天记录"
					placement="right"
					:closable="false"
					:visible="visible"
				>

					<div>
						<div v-for="item in  content">
							{{item.username}}:{{item.msg}}
							<img
								v-if="item.url"
								style="width:100px;height:100px"
								:src="`https://peri.xxlun.com/emulation/img/${item.url}`"
							/>

						</div>
					</div>

				</a-drawer>

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
import { notification } from "ant-design-vue";
import roomUpload from "@/views/room/roomUpload";
export default defineComponent({
	name: "room",
	components: {
		Header,
		roomUpload
	},
	setup() {
		const IdRef = ref(null);
		const value1 = ref("1");
		const router = useRouter();
		const route = useRoute();
		let isJudge = ref(false);
		let state = ref(1);
		let visible = ref(false);
		let message = ref(null);
		let item1 = ref(null); //1
		let item2 = ref(null); //1
		let item3 = ref(null); //1
		let item4 = ref(null);
		let item5 = ref(null);
		let item6 = ref(null);
		let item7 = ref(null);
		let item8 = ref(null);
		let item9 = ref(null);
		let tip1 = ref(null); //1
		let tip2 = ref(null); //1
		let tip3 = ref(null); //1
		let tip4 = ref(null);
		let tip5 = ref(null);
		let tip6 = ref(null);
		let tip7 = ref(null);
		let tip8 = ref(null);
		let tip9 = ref(null);
		let img1 = ref(null); //1
		let img2 = ref(null); //1
		let img3 = ref(null); //1
		let img4 = ref(null);
		let img5 = ref(null);
		let img6 = ref(null);
		let img7 = ref(null);
		let img8 = ref(null);
		let img9 = ref(null);
		let uid1 = ref(null); //1
		let uid2 = ref(null); //1
		let uid3 = ref(null); //1
		let uid4 = ref(null);
		let uid5 = ref(null);
		let uid6 = ref(null);
		let uid7 = ref(null);
		let uid8 = ref(null);
		let uid9 = ref(null);
		let id1 = ref(null); //1
		let id2 = ref(null); //1
		let id3 = ref(null); //1
		let id4 = ref(null);
		let id5 = ref(null);
		let id6 = ref(null);
		let id7 = ref(null);
		let id8 = ref(null);
		let id9 = ref(null);
		let roleId1 = ref(null); //1
		let roleId2 = ref(null); //1
		let roleId3 = ref(null); //1
		let roleId4 = ref(null);
		let roleId5 = ref(null);
		let roleId6 = ref(null);
		let roleId7 = ref(null);
		let roleId8 = ref(null);
		let roleId9 = ref(null);
		let content = ref(null);

		onMounted(async () => {
			timer = setInterval(async () => {
				const msg = await Axios.post("emulation/findRoomMsg", {
					roomId: route.params.id
				});
				content.value = msg.data.data;
				//	console.log("??????", msg.data.data);

				console.log(message.value);
				const data = await Axios.post("emulation/findRoomInfos", {
					roomId: route.params.id
				});
				console.log("room", data.data.data);

				data.data.data.forEach(ele => {
					if (ele.userId == localStorage.getItem("ID")) {
						if (ele.prohibit == 1) {
							off();
						} else {
							on();
						}
					}
					if (ele.roleId == 1) {
						//console.log("ele", ele);
						item1.value = ele.username;
						img1.value = ele.picUrl;
						uid1.value = ele.userId;
						id1.value = ele.id;
						roleId1.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip1.value = "禁言中";
						}
						if (ele.prohibit == 0) {
							tip1.value = "发言中";
						}
					}
					if (ele.roleId == 2) {
						item2.value = ele.username;
						img2.value = ele.picUrl;
						uid2.value = ele.userId;
						id2.value = ele.id;
						roleId2.value = ele.roleId;
						isJudge.value = localStorage.getItem("ID") == ele.userId;
						if (ele.prohibit == 1) {
							tip2.value = "禁言中";
						}
						if (ele.prohibit == 0) {
							tip2.value = "发言中";
						}
					}
					if (ele.roleId == 3) {
						item3.value = ele.username;
						img3.value = ele.picUrl;
						uid3.value = ele.userId;
						id3.value = ele.id;
						roleId3.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip3.value = "禁言中";
						} else {
							tip3.value = "发言中";
						}
					}
					if (ele.roleId == 4) {
						item4.value = ele.username;
						img4.value = ele.picUrl;
						uid4.value = ele.userId;
						id4.value = ele.id;
						roleId4.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip4.value = "禁言中";
						} else {
							tip4.value = "发言中";
						}
					}
					if (ele.roleId == 5) {
						item5.value = ele.username;
						img5.value = ele.picUrl;
						uid5.value = ele.userId;
						id5.value = ele.id;
						roleId5.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip5.value = "禁言中";
						} else {
							tip5.value = "发言中";
						}
					}
					if (ele.roleId == 6) {
						item6.value = ele.username;
						img6.value = ele.picUrl;
						uid6.value = ele.userId;
						id6.value = ele.id;
						roleId6.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip6.value = "禁言中";
						} else {
							tip6.value = "发言中";
						}
					}
					if (ele.roleId == 7) {
						item7.value = ele.username;
						img7.value = ele.picUrl;
						uid7.value = ele.userId;
						id7.value = ele.id;
						roleId7.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip7.value = "禁言中";
						} else {
							tip7.value = "发言中";
						}
					}
					if (ele.roleId == 8) {
						item8.value = ele.username;
						img8.value = ele.picUrl;
						uid8.value = ele.userId;
						id8.value = ele.id;
						roleId8.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip8.value = "禁言中";
						} else {
							tip8.value = "发言中";
						}
					}
					if (ele.roleId == 9) {
						item9.value = ele.username;
						img9.value = ele.picUrl;
						uid9.value = ele.userId;
						id9.value = ele.id;
						roleId9.value = ele.roleId;
						if (ele.prohibit == 1) {
							tip9.value = "禁言中";
						} else {
							tip9.value = "发言中";
						}
					}
				});
				//console.log("找房间信息", data.data.data);
			}, 5000);

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
			// let flag;
			// const data = await Axios.post("emulation/findRoomInfos", {
			// 	roomId: IdRef.value.value
			// });
			// data.data.data.forEach(ele => {
			// 	flag = ele.roleId == value1;
			// });
			// console.log("::::", flag);
			// if (flag) {
			// 	return;
			// }

			const findRoomInfo = await Axios.post("emulation/findRoomInfo", {
				roomId: IdRef.value.value
			});
			console.log("房间信息", findRoomInfo.data.data);
			if (findRoomInfo.data.data) {
				notification.success({
					message: "已进入过该房间，恢复角色信息",
					placement: "topRight"
				});
			}

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
			//on();
		};
		//发布资源
		const on = () => {
			const id = localStorage.getItem("ID");
			let user = {
				id: id
			};
			//进入房间
			//console.log("room", room);
			if (!room) {
				alert("连接中断");
				router.push("/room/0");
			}
			room.join(user).then(
				() => {
					console.log(user, "join successfully");
				},
				error => {
					console.log(error);
				}
			);
			stream.get().then(
				function({ mediaStream }) {
					console.log("本机流", mediaStream);
					const id = localStorage.getItem("ID");
					let user = {
						id: id,
						stream: {
							tag: `${id}自定义流标签`,
							type: 0,
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
			if (!room) {
				alert("连接中断");
				router.push("/room/0");
			}
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
		//
		const close = async (uid, tip, id, roleId) => {
			if (!isJudge.value) {
				return;
			}
			if (tip == "发言中") {
				const data = await Axios.post("emulation/upRoomInfo", {
					userId: uid,
					prohibit: 1,
					roomId: route.params.id,
					id: id
				});
				console.log(data);
			} else {
				const data = await Axios.post("emulation/upRoomInfo", {
					userId: uid,
					prohibit: 0,
					roomId: route.params.id,
					id: id
				});
			}
		};

		//返回
		const goBack = () => {
			router.go(-1);
		};

		const goBack2 = () => {
			location.reload();
			if (room) {
				room.leave().then(
					() => {
						console.log("leave successfully");
					},
					error => {
						console.log(error);
					}
				);
			}

			item1.value = null;
			item2.value = null;
			item3.value = null;
			item4.value = null;
			item5.value = null;
			item6.value = null;
			item7.value = null;
			item8.value = null;
			item9.value = null;
			tip1.value = null;
			tip2.value = null;
			tip3.value = null;
			tip4.value = null;
			tip5.value = null;
			tip6.value = null;
			tip7.value = null;
			tip8.value = null;
			tip9.value = null;
			img1.value = null;
			img2.value = null;
			img3.value = null;
			img4.value = null;
			img5.value = null;
			img6.value = null;
			img7.value = null;
			img8.value = null;
			img9.value = null;
			uid1.value = null;
			uid2.value = null;
			uid3.value = null;
			uid4.value = null;
			uid5.value = null;
			uid6.value = null;
			uid7.value = null;
			uid8.value = null;
			uid9.value = null;
			roleId1.value = null;
			roleId2.value = null;
			roleId3.value = null;
			roleId4.value = null;
			roleId5.value = null;
			roleId6.value = null;
			roleId7.value = null;
			roleId8.value = null;
			roleId9.value = null;
			id1.value = null;
			id2.value = null;
			id3.value = null;
			id4.value = null;
			id5.value = null;
			id6.value = null;
			id7.value = null;
			id8.value = null;
			id9.value = null;
			router.go(-2);
		};

		const showDrawer = () => {
			visible.value = true;
		};
		const closeDrawer = () => {
			visible.value = false;
		};
		const postMessage = async () => {
			console.log("???", message.value);
			const data = await Axios.post("emulation/createMsg", {
				roomId: route.params.id,
				url: "",
				msg: message.value
			});
			message.value = "";
			console.log("postMessage", data);
		};
		return {
			visible,
			showDrawer,
			closeDrawer,
			postMessage,
			content,
			value1,
			goBack,
			goBack2,
			sureID,
			IdRef,
			enter,
			route,
			on,
			off,
			message,
			state,
			item1,
			item2,
			item3,
			item4,
			item5,
			item6,
			item7,
			item8,
			item9,
			tip1,
			tip2,
			tip3,
			tip4,
			tip5,
			tip6,
			tip7,
			tip8,
			tip9,
			img1,
			img2,
			img3,
			img4,
			img5,
			img6,
			img7,
			img8,
			img9,
			uid1,
			uid2,
			uid3,
			uid4,
			uid5,
			uid6,
			uid7,
			uid8,
			uid9,
			id1,
			id2,
			id3,
			id4,
			id5,
			id6,
			id7,
			id8,
			id9,
			roleId1,
			roleId2,
			roleId3,
			roleId4,
			roleId5,
			roleId6,
			roleId7,
			roleId8,
			roleId9,
			close
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