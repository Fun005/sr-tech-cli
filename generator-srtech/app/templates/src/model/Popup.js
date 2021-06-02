class Popup {
  components = []

  get show () {
    return this.components.length > 0
  }

  open (component, props = {}, option = {}, callback = () => { }) {
    // document.body.style.position = 'fixed'
    const openOption = {
      ...{
        closeOnMask: true
      },
      ...option
    }
    this.components.push({
      component,
      props,
      animation: openOption.animation || 'fade',
      closeOnMask: openOption.closeOnMask
    })
    callback()
  }

  close ({ index = -1, callback = () => { } } = {}) {
    // document.body.style.position = 'static'
    if (this.components.length > 0) {
      this.components.splice(index, 1)
      callback()
    }
  }
}

export default new Popup()