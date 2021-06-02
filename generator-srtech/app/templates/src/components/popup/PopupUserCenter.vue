<template>
  <div class="alert">
    <div class="task-top">
      <div class="t-left">
        <img v-if="userData" :src="userData.avatar.m" class="task-avatar" alt="">
        <div class="task-nick hanyiyahei65W">{{userData.nickname}}</div>
      </div>
    </div>
    <div class="alert-content">
      <div class="final-info info-item">
        <div>已投浪花：</div>
        <div>剩余浪花：</div>
      </div>
      <div class="past-info info-item">
        <div>已投浪花：</div>
        <div>剩余浪花：</div>
      </div>
      <div class="team-info info-item">
        <div>已投浪花：</div>
        <div>剩余浪花：</div>
      </div>
    </div>
    <div class="close" @click="closePopup"></div>
  </div>
</template>
<script>
import popup from '../../model/Popup'
import { data } from '../../store'

export default {
  props: ['getCallerInfo'],
  data() {
    return data
  },
  mounted() {
    this.getCallerInfo('all')
  },
  methods: {
    closePopup() {
      popup.close()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/base.less';
@import '../../styles/mixins.less';

.alert {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 653px;
  height: 705px;
  color: white;
  .background-contain('~resource/v1/alert-user.png');

  .task-top {
    position: relative;
    width: 590px;
    height: 80px;
    margin-top: 46px;
    display: flex;
    justify-content: space-between;
    .t-left {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      .task-avatar {
        width: 55px;
        height: 55px;
        margin: 0 15px 0 20px;
        border-radius: 50%;
      }
      .task-nick {
        width: fit-content;
        max-width: 300px;
        text-align: left;
        line-height: 1.5;
        .ellipsis();
        .font-oblique(hanyiyahei65W,30px);
      }
    }
    .t-right {
      width: 50%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      span {
        width: 100%;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .font-oblique(hanyiyahei65W, 24px);
      }
      .ytlh {
        align-items: flex-end;
      }
      .sylh {
        align-items: flex-start;
      }
    }
  }

  .alert-content {
    position: relative;
    width: 653px;
    height: 580px;

    .info-item {
      position: absolute;
      width: 580px;
      height: 120px;
      margin: 0 auto;

      display: flex;
      flex-wrap: wrap;
      align-content: center;
      div {
        width: 100%;
        text-align: right;
        .font-oblique(hanyiyahei65W,24px);
      }
    }
    .final-info {
      top: 150px;
    }

    .past-info {
      top: 270px;
    }

    .team-info {
      top: 390px;
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 57px;
    height: 57px;
    z-index: 2;
  }
}
</style>