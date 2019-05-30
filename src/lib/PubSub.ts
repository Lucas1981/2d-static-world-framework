export default class PubSub {
  private topics: any;
  private subUid: number;

  constructor() {
    this.topics = {};
    this.subUid = -1;
  }

  publish(topic, args): PubSub {
    if (!this.topics[topic]) return null;

    const subscribers = this.topics[topic];
    let len = subscribers.length || 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  }

  subscribe(topic, func) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    const token = (++this.subUid).toString();
    this.topics[topic].push({ token, func });

    return token;
  }

  unsubscribe(token) {
    for (const topic in this.topics) {
      if (this.topics[topic]) {
        for (let i = 0; i < this.topics[topic].length; i++) {
          if (this.topics[topic][i].token === token) {
            this.topics[topic].splice(i, 1);
            return token;
          }
        }
      }
    }
    return null;
  }
}
