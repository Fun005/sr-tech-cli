<template>
  <transition name="fade">
    <div class="toast" v-if="toast.msg">{{toast.msg}}</div>
  </transition>
</template>
<script>
import toast from '../model/Toast'

export default {
  data() {
    return {
      toast
    }
  }
}
</script>
<style lang="less" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.65);
  color: #fff;
  border-radius: 20px;
  font-size: 28px;
  text-align: center;
  padding: 15px 25px;
  z-index: 200;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>