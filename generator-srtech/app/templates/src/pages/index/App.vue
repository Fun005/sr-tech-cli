<template>
  <div id="app">
    <div class="page-stage2">
      <div class="top-box">
        <div class="top">
          <div class="rule" @click="popupRule('stage2')"></div>
          <div class="user-center" @click="popupUserCenter"></div>
          <div v-if="isMgtv || !isOnlineEnv" class="share" @click="popupShare('stage2')"></div>
          <div class="user-name hanyiyahei65W">{{userData.nickname}}</div>
          <div class="user-avatar" :style="{
          'background-image':
            userData === '' ? '' : `url('${userData.avatar.m}')`,
        }" @click="() => (userData === '' ? login() : loginOut())"></div>

        </div>
        <div class="video-box">
          <div id="wrapper" class="player"></div>
        </div>
      </div>

      <div class="footer"></div>

      <toast />
      <popup />
    </div>
  </div>
</template>

<script>
import MGUtils from '@tp/h5utils'
import Toast from '../../components/Toast'
import Popup from '../../components/Popup'

import toast from '../../model/Toast'
import popup from '../../model/Popup'

import { data, methods } from '../../store'
import { parseVideoUrl } from '../../common/utils'

export default {
  name: 'Index',
  data: function() {
    return data
  },

  created() {
    // this.getRank(this.tabType)
    MGUtils.allGetUserData().then(data => {
      if (!data?.ticket) return console.warn('allGetUserData fail') //toast.info('请先登录')
      this.userData = data
      // // this.getCallerInfo(this.tabType)
      // this.getCallerInfo('all')
    })

    setTimeout(() => {
      const vid = parseVideoUrl(this.dashboradVideo)
      this.setPlayer(vid)
    }, 500)
  },
  mounted() {
    MGUtils.getCmsData('https://www.mgtv.com/v/2021/cfpldjjclb2021/stage2/')
      .then(data => {
        let { getRank, alert, alertLink, callerInfo } = data

        this.getRankSwitch = ~~getRank
        this.callerInfoSwitch = ~~callerInfo

        this.pageData.alert = ~~alert
        this.pageData.alertLink = alertLink
        this.pageData.getCmsData = true

        if (this.getRankSwitch === 0) {
          this.showPoint = false
        } else {
          this.showPoint = true
          this.getRank(this.tabType)
        }
      })
      .catch(err => {
        console.log(err)
        this.pageData.getCmsData = false
      })
  },
  methods: {
    ...methods
  },
  components: {
    Toast,
    Popup
  }
}
</script>

<style lang="less">
@import '../../styles/base.less';
@import '../../styles/mixins.less';

@defaultAvatar: 'https://img.mgtv.com/imgotv-member/user/avt.jpg';
body {
  background-color: #620107;
}

.page-stage2 {
  position: relative;
  width: 100vw;
  height: auto;
  overflow: hidden;
  .top-box {
    position: relative;
    width: 100%;
    height: 1872px;
    margin-bottom: -350px;
    padding-top: 20px;
    .background-contain('~resource/v1/bg1.jpg');
    .top {
      position: relative;
      width: 100%;
      height: 1023px;
      overflow: hidden;
      .background-contain('~resource/v1/top.png');

      .user-name {
        position: absolute;
        max-width: 300px;
        height: 45px;
        top: 12px;
        right: 105px;
        color: #ffffff;
        .ellipsis();
        font-size: 26px;
        font-style: oblique;
      }

      .rule {
        position: absolute;
        top: 100px;
        right: 0;
        width: 50px;
        height: 163px;
        .background-contain('~resource/v1/rule-btn.png');
      }

      .user-center {
        position: absolute;
        top: 250px;
        right: 0;
        width: 50px;
        height: 163px;
        .background-contain('~resource/v1/user-center.png');
      }

      .share {
        position: absolute;
        top: 400px;
        right: 0;
        width: 50px;
        height: 163px;
        .background-contain('~resource/v1/share-btn.png');
      }

      .user-avatar {
        position: absolute;
        top: 2px;
        right: 22px;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        .background-cover(@defaultAvatar);
      }
    }
    .video-box {
      position: relative;
      width: 640px;
      height: 370px;
      margin: 20px auto 0;
      padding-top: 3px;
      .background-contain('~resource/v1/video-border.png');
    }
    .player {
      width: 630px;
      height: 365px;
      margin: 0 auto;
    }
  }
  .footer {
    width: 100%;
    height: 346px;
    margin-top: -250px;
    .background-contain('~resource/v1/footer.jpg');
  }
}
</style>
