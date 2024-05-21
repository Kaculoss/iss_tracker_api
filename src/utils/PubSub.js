const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

module.exports = {
  publish(topic, data) {
    return pubsub.publish(topic, data)
  },
  subscribe(topic) {
    return pubsub.asyncIterator(topic)
  }
}
