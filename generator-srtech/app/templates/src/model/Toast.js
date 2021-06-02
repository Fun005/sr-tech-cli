class Toast {
  timer
  msg = ''
  timeout = 1500

  info(msg) {
    this.clearToast()
    this.msg = msg
    this.timer = setTimeout(() => {
      this.clearToast()
    }, this.timeout);
  }

  clearToast() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.msg = ''
  }
}

export default new Toast()