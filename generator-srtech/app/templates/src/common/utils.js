/**
    * 获取URL中的参数
    */
//获取url的html页面名称
/*type=1，只获取页面名称，不带.html后缀
 *type=2， 取页面名称，同时带.html后缀
 *type=3， 获取html父级路径与html名称，同时带.html后缀
 *type=4， 获取html父级路径与html名称，不带.html后缀
 *type= undefined，type没有值，什么也不传，获取html父级路径与当前html页面名称，不带.html后缀
 */

export const parseVideoUrl = (url = window.location.href, type = 1) => {
  //获取url地址
  let ts_href = url;
  let ts_mainText = "";
  if (type === 1) {
    //获取地址最后一个“/”的下标
    let ts_indexof = ts_href.lastIndexOf("/");
    //获取地址“/”之后的的内容
    let ts_indexText = ts_href.substring(ts_indexof + 1);
    //获取地址“.html”的下标
    let ts_htmlBeforeText = ts_indexText.indexOf(".html");
    //获取 “/”到".html"之间的内容
    ts_mainText = ts_indexText.substring(0, ts_htmlBeforeText);
  } else if (type === 2) {
    //获取地址“/”的下标
    let ts_indexof = ts_href.lastIndexOf("/");
    //获取地址“/”之后的的内容
    let ts_indexText = ts_href.substring(ts_indexof + 1);
    ts_mainText = ts_indexText;
  } else if (type === 3) {
    //获取地址中倒数二个“/”下标的位置的之后的内容
    let urlParents = ts_href.substr(ts_href.lastIndexOf('/', ts_href.lastIndexOf('/') - 1) + 1);
    ts_mainText = urlParents
  } else if (type === 4) {
    //获取地址中倒数二个“/”的下标之后的内容
    let urlParents = ts_href.substr(ts_href.lastIndexOf('/', ts_href.lastIndexOf('/') - 1) + 1);
    //取到倒数二个“/”的下标的位置和.html之间的内容
    var beforeHtml = urlParents.indexOf(".html");
    if (beforeHtml === -1) {
      ts_mainText = urlParents;

    } else {
      ts_mainText = urlParents.substring(0, beforeHtml);
    }
  } else {
    let urlParents = ts_href.substr(ts_href.lastIndexOf('/', ts_href.lastIndexOf('/') - 1) + 1);
    let beforeHtml = urlParents.indexOf(".html");
    if (beforeHtml === -1) {
      ts_mainText = urlParents;

    } else {
      ts_mainText = urlParents.substring(0, beforeHtml);
    }
  }
  return ts_mainText;
}

// 下载mgtv
export const downloadMGTV = (...{ url = location.href, fromac = $('body').attr('mg-stat-page') }) => {
  location.href = `https://d.mgtv.com/dl?url=${encodeURIComponent(url)}&fromac=${encodeURIComponent(fromac)}`
}

// 关闭webview
export const closeWebView = () => MgtvApi.closeWebView()

export const preLoadImg = (imgArr = []) => {
  let loadNth = 0
  imgArr.map((item) => {
    let element = new Image()
    element.onload = () => {
      loadNth++
      if (loadNth >= imgArr.length) {
        $('#loading').remove()
      }
    }
    element.src = item
  })
}

export const loadFonts = () => {
  const url = `https://ugc.hitv.com/platform_oss/1616393867588/hanyiyahei65W.ttf`;
  window.onload = () => {
    setTimeout(() => {
      const hanyiyahei65W = new FontFace("hanyiyahei65W", `url(${url})`);
      // 添加到全局的 FontFaceSet 中
      document.fonts.add(hanyiyahei65W);
      hanyiyahei65W.load().then(() => {
        // 当字体加载完之后，我们就可以通过替换 class 的方法替换掉默认的字体
        // 此处的逻辑也可以是你的字体渲染策略
        const el = document.querySelector(".hanyiyahei65W");
        el.style.fontFamily = "hanyiyahei65W";
      });
    }, 0);
  };
}