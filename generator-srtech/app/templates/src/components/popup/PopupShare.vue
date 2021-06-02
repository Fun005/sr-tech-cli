<template>
  <div class="alert">
    <button @click="showShare('wechat','stage2')"></button>
    <button @click="showCodeShare"></button>
    <button @click="showShare('qq','stage2')"></button>
    <button @click="showShare('weibo','stage2')"></button>
  </div>
</template>
<script>
import popup from '../../model/Popup'
// import { data } from "../../store";

export default {
  props: ['popupCodeShare', 'showShare', 'type'],
  methods: {
    closePopup() {
      popup.close()
    },
    showCodeShare() {
      popup.close({ callback: this.popupCodeShare })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/base.less';
@import '../../styles/mixins.less';

.alert {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  .background-contain('~resource/v1/share-box2.png');
  padding: 0 4vw;

  button {
    width: 25%;
    float: left;
    display: block;
    height: 100%;
    background: transparent;
  }
}
</style>