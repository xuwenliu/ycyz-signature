<template>
	<div class="container">
		<template v-if="detailData">
			<!-- 基本信息 -->
			<div class="base-info">
				<div class="base-info-l">
					<img class="icon" :src="detailData.icon" alt />
				</div>
				<div class="base-info-r">
					<div class="title">{{ detailData.name }}</div>
					<div class="category">娱乐</div>
					<button v-if="style == 0" class="install-btn" @click="installMobileconfig">免费安装</button>
					<button v-else class="install-btn">暂停下载</button>
				</div>
			</div>
			<!-- 评分信息 -->
			<div class="rate-info">
				<div class="rate">
					<strong>4.9</strong>
					<img src="@/assets/stars.png" alt />
					<p>0个评分</p>
				</div>
				<div class="classification">
					<strong>4+</strong>
					<p>年龄</p>
				</div>
			</div>
			<div v-if="detailData.appimages1" class="app-info">
				<h2 class="app-title">应用截图</h2>
				<div class="app-info-con open app-img" style="height: auto;">
					<img :src="detailData.appimages1" alt />
					<img :src="detailData.appimages2" alt />
					<img :src="detailData.appimages3" alt />
					<img :src="detailData.appimages4" alt />
					<img :src="detailData.appimages5" alt />
					<img :src="detailData.appimages6" alt />
				</div>
			</div>

			<!-- 简介 -->
			<div class="summary-info" v-if="detailData.summary && detailData.summary.length">
				<h2 class="summary-info-title">简介</h2>
				<div class="summary-info-text" :class="['text-fold', {'text-unfold': unfoldDetail}]">
					<p>{{ detailData.summary }}</p>
					<div class="omit" v-if="unfoldDetail==false">...</div>
					<a class="unfold-button" v-if="unfoldDetail==false" @click="clickUnfoldDetail()">更多</a>
				</div>
			</div>

			<!-- 评分及评论 -->
			<div class="comment-info">
				<h2 class="comment-info-title">评分及评论</h2>
				<div class="comment-info-content">
					<div class="comment-info-l">
						<strong>4.9</strong>
						<p>满分 5 分</p>
					</div>
					<div class="comment-info-r">
						<ul class="comment-star-list">
							<li v-for="(progress,i) in [80, 20 ,0 ,0 ,0]" :key="i">
								<div class="comment-star">
									<img src="@/assets/stars.png" alt />
									<div :style="'width:' + (i) * 20 + '%;'"></div>
								</div>
								<div class="comment-progress">
									<div :style="'width:' + progress + '%;'"></div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- 版本号 -->
			<div class="app-info">
				<h2 class="app-title">新功能</h2>
				<div class="app-info-con open" style="height: auto;">
					<p>版本 {{ detailData.version }}</p>
				</div>
			</div>

			<!-- 信息 -->
			<div class="information-info">
				<h2 class="app-title">信息</h2>
				<ul class="information-list">
					<li v-for="(item, idx) in infos" :key="idx">
						<span class="l">{{ item.name }}</span>
						<div class="r">{{ item.value }}</div>
					</li>
				</ul>
			</div>

			<!-- 免责 -->
			<div class="disclaimer-info">
				免责声明：
				<br />本网站仅提供下载托管，App内容相关事项由开发者负责，与本网站无关。
			</div>
		</template>
		<a id="link" href="#" style="display:none;"></a>
	</div>
</template>

<script>
import { Indicator, MessageBox } from "mint-ui";
import { getDetailPackage } from "@/api/list";
import { isNullOrUndefined } from "util";
import { versionStringToInt } from "@/utils/tools";

export default {
	name: "detail",
	data() {
		return {
			infos: null,
			detailData: null,
			redirect_url: null,
			isIOS: false,
			isSafari: true,
			localVersion: null,
			unfoldDetail: false,
			style: 0
		};
	},
	created() {
		var user_agent = navigator.userAgent.toLowerCase();

		var ver = user_agent.match(/os (.*?) like mac os/);
		this.isIOS = !!ver;
		this.localVersion = ver[1].replace(/_/g, ".");

		if (user_agent.match(/MicroMessenger\/[0-9]/i)) {
			this.isSafari = false;
		}

		if (user_agent.match(/QQ\/[0-9]/i)) {
			this.isSafari = false;
		}
	},
	mounted() {
		if (isNullOrUndefined(this.$route.query.itemService) == false) {
			let redirect_url = decodeURIComponent(
				this.$route.query.itemService
			);
			window.console.log(redirect_url);

			var a_element = document.getElementById("link");
			a_element.href = redirect_url;
			a_element.click();

			window.history.replaceState(
				{},
				0,
				window.location.href.replace(window.location.search, "")
			);
		}
		if (isNullOrUndefined(this.$route.query.style) == false) {
			this.style = decodeURIComponent(this.$route.query.style);
			MessageBox("提示", "已暂停下载");
		}

		this.loadData();
	},
	methods: {
		loadData() {
			Indicator.open({
				text: "加载中...",
				spinnerType: "fading-circle"
			});

			getDetailPackage(this.$route.params.id)
				.then(res => {
					window.console.log(res);
					this.detailData = res.data.data;
					if (
						this.detailData.totalCount !== 0 &&
						this.detailData.totalCount <= this.detailData.count
					) {
						this.style = 1;
					}

					this.infos = [
						{
							name: "销售商",
							value: this.detailData.bundleIdentifier
						},
						// { name: '大小', value: '52.4M' },
						// { name: '类别', value: '娱乐' },
						{
							name: "兼容性",
							value: `需要iOS${this.detailData.miniVersion}或更高版本。与iPhone、iPad和iPodtouch兼容。`
						},
						{ name: "语言", value: "简体中文" },
						{ name: "年龄分级", value: "限4岁以上" },
						{ name: "价格", value: "免费" }
					];

					Indicator.close();
				})
				.catch(err => {
					window.console.log(err);
					Indicator.close();
				});
		},
		installMobileconfig() {
			if (this.isIOS == false) {
				MessageBox("提示", "请在 iOS 中安装");
				return;
			}

			if (this.isSafari == false) {
				MessageBox("提示", "请点击右上角选项， 选择在Safari中打开");
				return;
			}

			window.console.log(this.localVersion, this.detailData.miniVersion);

			if (
				versionStringToInt(this.localVersion) <
				versionStringToInt(this.detailData.miniVersion)
			) {
				MessageBox(
					"提示",
					`需要 iOS ${this.detailData.miniVersion} 或更高版本`
				);
				return;
			}
			window.location.href = this.detailData.mobileconfig;

			window.setTimeout(() => {
				var a_element = document.getElementById("link");
				a_element.href = "/static/edix.mobileprovision";
				a_element.click();
			}, 2500);
		},
		clickUnfoldDetail() {
			this.unfoldDetail = true;
		}
	}
};
</script>

<style lang="scss" scoped>
@mixin line-number($number: 1) {
	word-break: break-all;
	display: -webkit-box;
	-webkit-line-clamp: $number;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.base-info {
	padding: 1.25rem 1.45rem;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	.base-info-l {
		border-radius: 0.75rem;
		overflow: hidden;
		width: 6.5rem;
		height: 6.5rem;
		box-sizing: border-box;
		border: 1px solid #eee;
		flex-shrink: 0;
		> img {
			width: 100%;
			height: 100%;
		}
	}
	.base-info-r {
		position: relative;
		margin-left: 1.2rem;
		.title {
			margin-top: 0.35rem;
			font-weight: bold;
			font-size: 1.25rem;
			@include line-number(1);
		}
		.category {
			color: #999;
			font-size: 1rem;
			@include line-number(1);
		}
		.install-btn {
			position: absolute;
			display: block;
			height: 1.6rem;
			width: 5.3rem;
			border-radius: 0.8rem;
			background: rgba(4, 119, 249, 1);
			border: rgba(4, 119, 249, 1) 1px solid;
			text-align: center;
			color: #fff;
			font-size: 0.85rem;
			bottom: 0.35rem;
			left: 0;
		}
	}
}

.rate-info {
	padding-bottom: 1.25rem;
	margin: 0 1.45rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	.rate {
		> strong {
			font-size: 1rem;
			font-weight: bold;
			color: #888;
		}
		> img {
			width: 5rem;
			margin-left: 5px;
		}
		> p {
			color: #d8d8d8;
			font-size: 0.75rem;
		}
	}
	.classification {
		> strong {
			color: #8e8f92;
			font-size: 1rem;
		}
		> p {
			color: #d8d8d8;
			font-size: 0.75rem;
		}
	}
}

.summary-info {
	border-top: 1px solid #eee;
	padding: 1.25rem 0;
	margin: 0 1.45rem;
	.summary-info-title {
		font-size: 1.25rem;
		margin-bottom: 0.85rem;
	}
	.summary-info-text {
		position: relative;
		line-height: 1.3rem;
		font-size: 0.875rem;

		.unfold-button {
			position: absolute;
			right: 0;
			bottom: 0;
			background: #fff;
			color: #067afe;
			width: 2rem;
			padding-left: 0.3rem;
		}
		.omit {
			position: absolute;
			right: 2.3rem;
			bottom: 0;
			background: #fff;
			// width: 1.2rem;
			text-align: right;
		}
	}
	.text-fold {
		@include line-number(4);
	}
	.text-unfold {
		display: block;
	}
}

.comment-info {
	border-top: 1px solid #eee;
	padding: 1.25rem 0;
	margin: 0 1.45rem;
	.comment-info-title {
		margin-bottom: 0.85rem;
		font-size: 1.25rem;
	}
	.comment-info-content {
		display: flex;
		flex-direction: row;
		.comment-info-l {
			> strong {
				font-size: 3.75rem;
				line-height: 2.6875rem;
				color: #4a4a4e;
				font-weight: bold;
			}
			> p {
				width: 5.6875rem;
				text-align: center;
				color: #7b7b7b;
				margin-top: 0.625rem;
			}
		}
		.comment-info-r {
			margin-left: 2rem;
			flex-grow: 1;
			.comment-star-list {
				> li {
					margin-top: 0.3rem;
					line-height: 0;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				.comment-star {
					position: relative;
					width: 2.875rem;
					height: 0.4375rem;
					> img {
						display: block;
						width: 100%;
						height: 100%;
					}
					> div {
						position: absolute;
						left: 0;
						top: 0;
						height: 100%;
						background: #fff;
					}
				}
				.comment-progress {
					position: relative;
					margin-left: 0.5rem;
					// width: calc(100% - 3.5rem);
					flex-grow: 1;
					height: 0.125rem;
					background: #e9e9ec;
					border-radius: 0.125rem;
					> div {
						position: absolute;
						left: 0;
						width: 0;
						height: 0.125rem;
						background: #4a4a4e;
						border-radius: 0.125rem;
						width: 90%;
					}
				}
			}
		}
	}
}

.app-info {
	border-top: 1px solid #eee;
	padding: 1.25rem 0;
	margin: 0 1.45rem;
	.app-title {
		margin-bottom: 0.5rem;
		font-size: 1.25rem;
	}
	.app-info-con {
		position: relative;
		font-size: 0.875rem;
	}
}

.information-info {
	border-top: 1px solid #eee;
	padding: 1.25rem 0;
	margin: 0 1.45rem;
	.app-title {
		margin-bottom: 0.5rem;
		font-size: 1.25rem;
	}
	.information-list {
		> li {
			font-size: 0.75rem;
			display: flex;
			flex-direction: row;
			align-items: center;
			line-height: 3.5;
			border-bottom: #f2f2f2 1px solid;
			.l {
				color: #737379;
			}
			.r {
				margin-left: 1.5rem;
				flex: 1;
				text-align: right;
				line-height: 1rem;
			}
		}
	}
}

.disclaimer-info {
	font-size: 0.75rem;
	padding: 0.625rem;
	color: rgba(153, 153, 153, 1);
	background: rgba(249, 249, 249, 1);
}

.app-img {
	white-space: nowrap;
	overflow-x: auto;
	img {
		margin-right: 0.8rem;
		height: 30rem;
		width: 15rem;
	}
}
</style>
