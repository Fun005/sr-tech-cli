<template>
  <div class="popup">
    <transition name="fade">
      <div class="mask" v-if="popup.show"></div>
    </transition>
    <div class="popup-body" :class="{animating}" v-show="bodyShow" @click="close">
      <transition-group name="fade" @before-leave="beforeLeave" @after-leave="afterLeave" @before-enter="beforeEnter" @after-enter="afterEnter">
        <div v-for="(component,index) in fadeComponents" :key="'fade' + index">
          <div class="popup-body" :class="{animating}" @click="close">
            <component :is="component.component" v-bind="component.props" />
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
import popup from '../model/Popup'
import { hasClass } from '../common/dom'
export default {
  data() {
    return {
      contentShow: false,
      animating: false,
      popup: popup
    }
  },
  computed: {
    bodyShow() {
      return this.popup.show || this.contentShow
    },
    fadeComponents() {
      return this.popup.components.filter(
        component => component.animation === 'fade'
      )
    }
  },
  watch: {
    bodyShow(val) {
      if (val) {
        this.fixedBody()
      } else {
        this.looseBody()
      }
    }
  },
  methods: {
    fixedBody() {
      let scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px;'
    },
    //清除fixed固定定位和top值；并恢复打开弹窗前滚动位置
    looseBody() {
      let body = document.body
      body.style.position = 'static'
      let top = body.style.top
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
        top
      )
      body.style.top = ''
    },
    beforeEnter() {
      this.contentShow = true
      this.animating = true
    },
    afterEnter() {
      this.animating = false
    },
    beforeLeave() {
      this.animating = true
    },
    afterLeave() {
      this.contentShow = this.popup.show
      this.animating = false
    },
    close(e) {
      if (hasClass(e.target, 'popup-body')) {
        const components = this.popup.components
        if (components.length > 0) {
          const lastComponent = components[components.length - 1]
          if (lastComponent.closeOnMask) {
            this.popup.close(-1)
          }
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.popup {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .popup-body {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    overflow: auto;

    &.animating {
      overflow: hidden;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.5s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateY(100%);
  }
}
</style>