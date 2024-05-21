module.exports = class RequestError extends Error {
  constructor(errors) {
    super()
    this.message = errors
      .map((e) => {
        return e.message
      })
      .join(', ')
  }
}
