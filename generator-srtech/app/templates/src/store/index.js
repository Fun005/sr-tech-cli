import MGUtils from '@tp/h5utils'
import axios from 'axios'
// import { Share } from '@tp/h5component'
import CaptchaSdk from 'captcha-sdk'

import toast from '../model/Toast'
import popup from '../model/Popup'

import PopupRule from '../components/popup/PopupRule'
import PopupShare from '../components/popup/PopupShare'
import PopupUserCenter from '../components/popup/PopupUserCenter'

const isOnlineEnv = location.href.includes('h5.mgtv.com')
const testMode = '//10.100.6.7/api/v1/cfpldjj2'
const onlineMode = '//act.api.mgtv.com/api/v1/cfpldjj2'
const API_PRIFIX = isOnlineEnv ? onlineMode : testMode

class Store {
  constructor() {
    this.getDeviceInfo().then(data => {
      this.data.deviceInfo = data
    })
    this.mgSdk = new CaptchaSdk()
  }

  getDeviceInfo () {
    return new Promise(resolve => {
      if (MGUtils.ua.isImgo() && window.MgtvApi) {
        return window.MgtvApi.getDeviceInfo(data => {
          try {
            const parsedDeviceInfo = JSON.parse(data)
            resolve(parsedDeviceInfo)
          } catch (err) {
            // console.warn(`设备信息解析失败:${err.message}`)
            resolve({})
          }
        })
      }
      resolve({})
    })
  }


  data = {
    isOnlineEnv,
    userData: '',
    shareData: {
      title: '乘风破浪的姐姐2·成团冲浪榜已开启',
      desc: '为姐姐送“浪花”，助你喜爱的姐姐成团吧！',
      shareDesc: '为姐姐送“浪花”，助你喜爱的姐姐成团吧！',
      shareUrl: location.href,
      shareIcon: 'https://ugc.hitv.com/platform_oss/4192AF98F10E47AA9B9CE90F4F3F2844.jpeg',
    },
    dashboradVideo: 'https://www.mgtv.com/b/354045/11624245.html',
    // shareComp: new Share(),
    pageData: {
      alert: 0,
      alertLink: '',
      getCmsData: false
    },
    deviceInfo: {},
    player: '',
    isMgtv: MGUtils.ua.isImgo(),
    riskParams: {
      suid: '',
      reqId: '',
      riskToken: ''
    }
  }

  methods = {
    login: () => {
      if (this.data.userData !== '') return this.methods.loginOut()
      MGUtils.allLogin().then(data => {
        this.data.userData = data
        location.reload()
      })
    },
    loginOut: () => {
      if (MGUtils.ua.isImgo()) {
        return toast.info('请在App个人中心切换账户')
      }
      return MGUtils.h5loginOut()
    },

    getDid: () => {
      if (this.data.deviceInfo && this.data.deviceInfo.did) {
        return this.data.deviceInfo.did
      } else {
        const mgDid = MGUtils.getCookie('mg_uuid')
        const mbaDid = MGUtils.getCookie('mba_deviceid')
        return mgDid || mbaDid
      }
    },

    popupRule: (type = "") => {
      popup.open(PopupRule, {
        type
      }, {
        closeOnMask: true
      })
    },
    popupUserCenter: () => {
      if (this.data.userData === '') return this.methods.login()
      if (!this.data.userData.relate_mobile) return toast.info('本活动仅限绑定过手机号的用户参与')
      popup.open(PopupUserCenter, {
        getCallerInfo: this.methods.getCallerInfo,
      }, {
        closeOnMask: true
      })
    },

    popupShare: (type) => {
      popup.open(PopupShare, {
        type,
        popupCodeShare: this.methods.popupCodeShare,
        showShare: this.methods.showShare,
      }, {
        closeOnMask: true
      })
    },

    setPlayer: (vid) => {
      if (this.data.player === '') {
        this.data.player = new ZTMobilePlayer({
          wrapper: "wrapper",
          controls: true,
          loop: true,
          autoplay: true,
          x5VideoPlayerType: "h5",
        })
      } else {
        this.data.player.stopVideo()
      }
      this.data.player.fetchVideoList(vid)
      // this.data.player.video.addEventListener("playing", MgtvApi.callhandler('webviewVedioPlay'))
    },

    getCallerInfo: (type = 'all') => {
      if (this.data.userData === '') return
      if (!this.data.userData.relate_mobile) return
      if (this.data.callerInfoSwitch < 1) {
        this.data.pastData.left = 0
        this.data.pastData.used = 0
        this.data.teamData.left = 0
        this.data.teamData.used = 0
        this.data.finalData.left = 0
        this.data.finalData.used = 0
        return console.log('活动已经结束')
      }
      return new Promise((resolve) => {
        axios.get(`${API_PRIFIX}/callerInfo?ticket=${this.data.userData.ticket}&type=${type}&_t=${new Date().getTime()}`).then(res => {
          if (~~res.code !== 200) {
            // if (~~res.code === -1004) {
            //   return toast.info('成团冲浪榜暂停，请关注成团之夜限时投票！')
            // }
            throw new Error(res.msg + res.code)
          }

          if (type === 'all') {
            this.data.pastData.left = res.data.pastLeftNum
            this.data.pastData.used = res.data.pastCallNum
            this.data.teamData.left = res.data.teamLeftNum
            this.data.teamData.used = res.data.teamCallNum
            this.data.finalData.left = res.data.finalLeftNum
            this.data.finalData.used = res.data.finalCallNum
          } else {
            this.data[type + 'Data'].left = res.data[type + 'LeftNum']
            this.data[type + 'Data'].used = res.data[type + 'CallNum']
          }
        })
      })
    },

    showShare: (type = 'wechat', stage) => {
      if (type !== 'wechat') {
        if (this.data.isMgtv) {
          return MgtvApi.shareTo({
            ...this.data.shareData,
            shareIcon: 'https://i4.hitv.com/p1/20210324/1446464692.jpg',
            type,
          })
        } else {
          // return this.data.shareComp.show()
        }
      }

      MgtvApi.shareTo({
        ...this.data.shareData,
        type,
        miniWX: {
          appId: 'wxbbc6e0adf8944632',
          orginId: 'gh_be6b2bc87f24',
          path: '/pages/common/index?code=25',
        },
      }, (res) => {
        console.log('wechat res', res);
      })
    },
    setShare: () => {
      // MgtvApi.callhandler('showShareMenus', {
      //   ...this.data.shareData,
      //   miniWX: {
      //     appId: 'wxbbc6e0adf8944632',
      //     orginId: 'gh_be6b2bc87f24',
      //     path: '/pages/sisjj/index',
      //   }
      // })
    },

    jumpToAd: (type) => {
      if (type === 'xiaomang') {
        const schemeUrl =
          'imgoecom://dynamic?channel=49&title=姐姐专区&ipid=2&source= jj_rank_banner'
        if (MGUtils.ua.isImgo()) {
          MgtvApi.jumpPage({
            url:
              'https://ecom.mgtv.com/app-simple-info.html?ios_schema=' +
              encodeURIComponent(schemeUrl) +
              '&android_schema=' +
              encodeURIComponent(schemeUrl)
          })
        } else {
          window.location.href = schemeUrl
          setTimeout(() => {
            MGUtils.downloadMGEC()
          }, 2000)
        }
      }
      if (type === 'huiyuan') {
        window.location.href = 'https://d.mgtv.com/V5VSe'
      }
    },

    getSuid: () => {
      let suid = ''
      if (this.data.riskParams.suid) {
        suid = this.data.riskParams.suid
      } else if (MGUtils.getCookie('risk_suid')) {
        suid = MGUtils.getCookie('risk_suid')
      } else {
        suid = ''
      }
      return suid ? suid : ''
    },

    initCaptcha: (cb, p, ...rest) => {
      this.mgSdk.init({
        appid: '1',
        reqId: this.data.riskParams.reqId || '',
        suid: this.methods.getSuid(),
        type: 'slide',
        onSuccess: res => {
          this.data.riskParams.riskToken = res.data
          setTimeout(() => {
            cb(p, ...rest)
            this.mgSdk.close()
          }, 500)
        },
        onFail: err => {
          if (err) {
            if (err.code === 104 || err.code === 102) {
              // suid过期，重走流程
              MGUtils.removeCookie('risk_suid')
              this.data.riskParams = {
                suid: '',
                reqId: '',
                riskToken: ''
              }
              this.mgSdk.close()
              return cb(p, ...rest)
            }
            // 风控引擎服务出错
            if (err.code === 12306) {
              setTimeout(() => {
                this.mgSdk.close()
              }, 1000)
              return toast.info('网络异常，请稍后重试')
              // return Toast('操作成功!')
            }
            return toast.info(err?.msg)
          }
        },
        onRefresh: () => {
          this.mgsdk.refresh()
        },
        onClose: () => { },
        onReady: () => { }
      })
    },
  }
}

const {
  data,
  methods
} = new Store()

export {
  data,
  methods
}