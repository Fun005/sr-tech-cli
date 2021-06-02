<template>
  <div class="alert">
    <div class="close" @click="closePopup"></div>
    <div class="content">

      <div class="main-title">总赛制及规则</div>
      <div class="tips">《乘风破浪的姐姐》<span class="mini-item">已经全新升级，三大榜单同时开启！</span>最终将产生7位姐姐成团！</div>
      <div class="tips">活动时间：3月26日12:00-4月16日成团夜直播期间</div>

      <div class="sub-title">成团名额产生方式</div>
      <p>· 成团冲浪榜·决赛舞台榜榜单结束时，决赛舞台榜单获累计“浪花”数最多的舞台秀所属冠军候选团将获得<span class="mini-item">【1个成团名额】</span>，决赛舞台榜榜单中舞台秀按所属冠军候选团分数相加，总分最高的冠军候选团将获得<span class="mini-item">【2个成团名额】</span>；</p>
      <p>· 成团冲浪榜·往期公演榜单结束时，姐姐们通过平分参演公演秀获得的“浪花”数将会按归属候选团相加，胜出的候选团将获得【<span class="mini-item">【2个成团名额】</span>；</p>
      <p>· 成团夜直播期间，两团根据现场实时投票将决定<span class="mini-item">【1个成团名额】</span>；</p>
      <p>· 最终将根据冠军候选团获得的具体名额数量，按照成团冲浪榜·个人喜爱度榜的“浪花”排名决定最终成团名单。</p>

      <div class="sub-title">成团冲浪榜活动规则</div>
      <p>· 活动期间，#决赛舞台榜#、#往期舞台榜#、#个人喜爱度榜#三个榜单中，每个榜单每人每日可获得3朵“浪花”，会员用户每日获得及可送“浪花”数量翻倍，各榜单之间“浪花”票数不通用； </p>
      <p>· 每日24:00用户未送出“浪花”将被清零；</p>
      <p>· 4月16日中午12:00用户未投出“浪花”将清零，并暂停投票，成团夜直播期间将开启限时“浪花”投票。</p>

      <div class="sub-title">【决赛舞台榜】分榜规则</div>
      <p>· 4月9日中午12:00至4月16日中午12:00，每人每日可为决赛舞台秀送出3朵“浪花”，成团夜直播期间将获得额外“浪花”放送，会员用户每日获得及可送“浪花”数翻倍；</p>
      <p>· 获得最多“浪花”的决赛舞台秀所在冠军候选团将获得<span class="mini-item">【1个成团名额】</span>，两团决赛舞台秀票获得累计“浪花”最多的冠军候选团将获得<span class="mini-item">【2个成团名额】</span>；</p>
      <p>· 每日24:00未投出“浪花”将被清零；4月16日中午12:00前未投出的“浪花”将被清零。</p>

      <div class="sub-title">【往期舞台榜】分榜规则</div>
      <p>· 4月9日中午12:00至4月16日中午12:00，每人每日可在以往24个公演舞台中选择喜爱的舞台送出3朵“浪花”，成团夜直播期间将获得额外“浪花”放送，会员用户获得及可送“浪花”数翻倍；</p>
      <p>· 每个表演秀获得的总票数将平分给每位参演姐姐，总决赛冠军候选姐姐在每个表演秀中平分的票数将会进行累积。最终个人总票数将累计为团队总票数，票数高的团队将获得<span class="mini-item">【2个成团名额】</span>； </p>
      <p>· 每日24:00未投出“浪花”将被清零；4月16日中午12:00前未投出的“浪花”将被清零。</p>

      <div class="sub-title">【个人喜爱度榜】分榜规则</div>
      <p>· 4月9日中午12:00至4月16日中午12:00，每人每日可给喜欢的姐姐送出3朵“浪花”，成团夜直播期间将获得额外“浪花”放送，会员用户每日获得及可送“浪花”数翻倍；</p>
      <p>· 最终将根据冠军候选团获得的具体名额数量，按照个人喜爱度榜的“浪花”排名决定最终成团名单；</p>
      <p>· 每日24:00未投出“浪花”将被清零；4月16日中午12:00前未投出的“浪花”将被清零。 </p>

      <div class="sub-title">关于防刷机制及其他</div>
      <p>· 活动页面有严格的防刷机制，对以不正当手段（包括但不仅
        限于使用机器脚本、频繁切换账号等）影响活动真实性的用
        户行为，一经发现，芒果TV有权禁止其参与活动，并取消不
        正当手段获取的排名结果。 </p>
      <p>· 活动火爆，出现完成任务未成功加票的情况，请刷新重试。
      <p>· 芒果TV不会以任何方式向用户索要钱财换取奖品，请注意甄别信息。</p>
      <p>如对本活动有疑问，您可进入“ <img class="rule-logo" src='../../assets/v1/rule-logo.png' />-我的-帮助与客服”联系人工客服或拨打客服热线：4009770707进行咨询。</p>
      <p>· 本次活动由湖南省长沙市湘江公证处全程监督。</p>
      <p>· 本活动与Apple.Inc苹果公司无关。</p>
    </div>
  </div>
</template>
<script>
import popup from '../../model/Popup'

export default {
  props: ['type'],
  methods: {
    closePopup() {
      popup.close()
    }
  },
  mounted() {}
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
  height: 1265px;
  max-height: 90%;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  .background-contain('~resource/v1/total-rule-bg.png');
  padding: 116px 0 40px;

  .close {
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
  }

  img {
    width: 100%;
    display: block;
  }

  .content {
    margin-top: -20px;
    color: #ffffff;
    padding: 0 40px;
    height: 100%;
    overflow: auto;
    line-height: 1.4;
  }

  .main-title {
    width: 100%;
    margin-bottom: 50px;
    text-align: center;
    .font-oblique(hanyiyahei85W,44px);
  }
  .sub-title {
    margin: 30px 0 20px 0;
    .font-oblique(hanyiyahei55W,30px);
  }
  .tips {
    color: #ffca90;
    .font-oblique(hanyiyahei55W,22px);
  }
  p {
    color: #ffca90;
    .font-oblique(hanyiyahei55W,22px);
  }
  .mini-item {
    color: #ffffff;
  }
  .rule-logo {
    width: 100px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>