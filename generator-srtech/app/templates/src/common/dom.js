export function createElement (tagName, className) {
  const elment = document.createElement(tagName)
  elment.className = className
  return elment
}

export function hasClass (el, className) {
  let classList = Array.from(el.classList)
  return classList.includes(className)
}

export function addClass (el, className) {
  el.classList.add(className)
}

export function removeClass (el, className) {
  el.classList.remove(className)
}

export function removeNodes (parent) {
  //当parent下还存在子节点时 循环继续
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }
}