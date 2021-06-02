
import FastClick from 'fastclick'
import MGUtils from '@tp/h5utils'
// import Eruda from 'eruda'

// Eruda.init()

new FastClick(document.body)

if (window.Bulma) {

  let ac = document.querySelectorAll('body')[0].getAttribute('mg-stat-page')

  Bulma.setConf(
    'pv',
    { url: location.href, ac, istc: 'pro', bid: '4.1.2', act: 'pv', uvip: 0, abroad: 0, ch: MGUtils.parseQuery().cxid || '90f76kbev' },
    ['//d-h5-v1.log.mgtv.com/dispatcher.do']
  )
  window.Bulma.log('pv');

}

// if (document.querySelectorAll('body')[0].getAttribute('em-page') !== '') {
//   ecReport('page');
// }

const domLoaded = (callback) => {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, {
      capture: true,
      once: true,
      passive: true
    })
  }
}

const isProdOnline = () => {
  const isMgtvHost = location.hostname === 'h5.mgtv.com'
  return isMgtvHost
}

const reportTiming = () => {
  const performance = window.performance
  if (performance && performance.timing && performance.timing.toJSON) {
    const originTiming = performance.timing.toJSON()
    const timing = {}
    let minTime = originTiming.navigationStart
    for (const [key, value] of Object.entries(originTiming)) {
      timing[key] = value - minTime
    }
    const MgStat = window.MgStat
    if (MgStat) {
      MgStat.send(
        'click',
        {
          domLoading: timing.domLoading,
          domInteractive: timing.domInteractive,
          domComplete: timing.domComplete
        },
        {
          cont: 'h5性能指标'
        }
      )
    }
  }
}

const handleWindowError = event => {
  const target = event.target
  if (target === window) {
    if (event.error) {
      reportError(event.error, '310301')
    } else if (event.message) {
      reportError(new Error(event.message), '310301')
    }
  } else if (target.tagName && /img|script/.test(target.tagName.toLowerCase())) {
    reportError(new Error(`${target.src}加载失败`), '310302')
  }
}

const reportLoadError = () => {
  const loadError = window.loadError || []
  if (loadError) {
    let event = true
    while (event) {
      event = loadError.shift()
      if (event) {
        handleWindowError(event)
      }
    }
  }
  window.removeEventListener('error', window.handleLoadError, true)
}

const bindGlobalError = () => {
  window.addEventListener('error', handleWindowError, true)
  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason
    reportError(reason)
  })
}

const getCntp = () => {
  return document.body.attributes['mg-stat-page'].value
}

const getErrorMessage = err => {
  try {
    const detail = JSON.stringify(err)
    return detail
  } catch (error) {
    return '错误序列化失败'
  }
}

const reportError = (err, code = '310671') => {
  const MgStat = window.MgStat
  const paid = window.__player_suuid__
  if (MgStat && paid && err) {
    const message = err.message || err.errMsg || 'unknown'
    const detail = getErrorMessage(err)
    const cntp = getCntp()
    const project = 'jmptyfxm'
    MgStat.send('error', { message, detail, paid, cntp, project }, { code })
  }
}

if (isProdOnline()) {
  domLoaded(reportTiming)
  reportLoadError()
  bindGlobalError()
}