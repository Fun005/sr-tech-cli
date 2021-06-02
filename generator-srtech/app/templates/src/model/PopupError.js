class PopupError extends Error {
  popup = true
  option = {}
  constructor (message, option = {}) {
    super(message)
    this.option = option
  }
}


export default new PopupError()