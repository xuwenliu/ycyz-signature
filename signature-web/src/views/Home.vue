<template>
  <div class="container">
    <div class="list">
      <div class="card" v-for="(item,index) in appList" :key="index">
        <div class="card-left">
          <img class="icon" :src="item.icon" alt="">
          <div class="info">
            <div class="title">{{ item.name }} ({{ item.version }})</div>
            <div class="subtitle">{{ item.bundleIdentifier }}</div>
            <div class="subtitle">需要 iOS {{ item.miniVersion }} 或更高版本</div>
          </div>
        </div>
        <div class="card-right">
          <button v-if="item.totalCount==0 || item.totalCount > item.count" class="card-right-dl" @click="installMobileconfig(item)">安装</button>
          <button v-else class="card-right-dl">暂停安装</button>
        </div>
      </div>
    </div>
    <a id='link' href="#" style='display:none;'></a>
  </div>
</template>

<script>
import { Indicator, MessageBox } from 'mint-ui';
import { getAllPackage } from '@/api/list'
import { isNullOrUndefined } from 'util';
import { versionStringToInt } from '@/utils/tools'

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      appList: null,
      redirect_url: null,
      isIOS: false,
      isSafari: true,
      localVersion: null
    }
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
      let redirect_url = decodeURIComponent(this.$route.query.itemService);
      window.console.log(redirect_url);

      var a_element = document.getElementById('link');
      a_element.href = redirect_url;
      a_element.click();

      window.history.replaceState({}, 0, window.location.href.replace(window.location.search, ''));
    }

    if (isNullOrUndefined(this.$route.query.style) == false) {
      MessageBox('提示', '已暂停下载');
    }

    this.loadData();
  },
  methods: {
    loadData() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      // eslint-disable-next-line
      getAllPackage().then(res => {
        window.console.log(res);
        this.appList = res.data.data;
        Indicator.close();
      }).catch(err => {
        window.console.log(err);
        Indicator.close();
      })
    },
    installMobileconfig(item) {
      if (this.isIOS == false) {
        MessageBox('提示', '请在 iOS 中安装');
        return;
      }

      if (this.isSafari == false) {
        MessageBox('提示', '请点击右上角选项， 选择在Safari中打开');
        return;
      }

      window.console.log(this.localVersion, item.miniVersion);

      if (versionStringToInt(this.localVersion) < versionStringToInt(item.miniVersion)) {
        MessageBox('提示', `需要 iOS ${item.miniVersion} 或更高版本`);
        return;
      }
      window.location.href = item.mobileconfig;
    }
  }
}
</script>



<style lang="scss" scoped>
@mixin line-number($number: 1) {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: $number;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.container {
  // padding-top: 40px;
  .card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.625rem 0.75rem;
    border-bottom: 1px solid #e6e6e6;
    &:last-child {
      // border-bottom: 0;
    }

    .card-left {
      // background: #eee;
      height: 5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        border-radius: 0.75rem;
        width: 4rem;
        height: 4rem;
        box-sizing: border-box;
        border: 1px solid #eee;
        flex-shrink: 0;
      }
      .info {
        margin-left: 0.8rem;
        .title {
          font-size: 1rem;
          line-height: 1.4;
          color: #333;
          font-weight: bolder;
          margin-bottom: 0.2rem;
          @include line-number(1);
        }
        .subtitle {
          font-size: 0.65rem;
          color: #636363;
          line-height: 1.4;
          @include line-number(1);
        }
      }
    }
    .card-right {
      flex-shrink: 0;
      // background: #eee;
      height: 5rem;
      // width: 3.25rem;
      margin-left: 0.75rem;
      display: flex;
      align-items: center;
      .card-right-dl {
        font-size: 0.7rem;
        border: 1px solid #ef4f4f;
        background-color: transparent;
        color: #ef4f4f;
        padding: 0.2rem 0.75rem;
        border-radius: 0.25rem;
        letter-spacing: 0;
      }
    }
  }
}
</style>

