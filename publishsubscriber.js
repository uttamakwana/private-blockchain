import redis from "redis";

const CHANNEL = {
  TEST: "TEST",
};

class PubSub {
  constructor() {
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();
    this.subscriber.subscribe(CHANNEL.TEST);
    this.subscriber.on("message", (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    console.log(`Message "${message}" received on channel "${channel}"`);
  }
}

const checkPubSub = new PubSub();

setTimeout(() => {
  checkPubSub.publisher.publish(CHANNEL.TEST, "Hello this is my message");
}, 1000);
