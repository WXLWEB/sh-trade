let isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
let isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
let isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0
// At least Safari 3+: "[object HTMLElementConstructor]"
let isChrome = !!window.chrome && !isOpera              // Chrome 1+
let isIE = /*@cc_on!@*/false || !!document.documentMode // At least IE6

navigator.sayswho = (function(){
  let ua= navigator.userAgent, tem, M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if(/trident/i.test(M[1])){
    tem=  /\brv[ :]+(\d+)/g.exec(ua) || []
    return 'IE '+(tem[1] || '')
  }
  if(M[1]=== 'Chrome'){
    tem= ua.match(/\bOPR\/(\d+)/)
    if(tem!= null) return 'Opera '+tem[1]
  }
  M = M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?']
  if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1])
  return M.join(' ')
})()

let version = navigator.sayswho.split(' ')[1]
if(isIE && +version < 11) {
  window.location.href = 'https://exchange.btcc.com/index/unsupported.browser'
}
