export default class NotificationMessage {

  static currentNotification = null;

  constructor(notification = '', {duration = '', type = '', target = ''} = {}) {
    this.notification = notification;
    this.duration = duration;
    this.type = type;
    this.target = target;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return `<div class="notification ${this.type}" style="--value: ${this.delay}ms">
                <div class="timer"></div>
                <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.notification}
                </div>
                </div>
            </div>`;
  }

  show(target = document.body) {
    if (NotificationMessage.currentNotification) {
      NotificationMessage.currentNotification.remove();
    }

    target.append(this.element)
    NotificationMessage.currentNotification = this;

    this.removeByTimer(this.duration);
  }

  removeByTimer(duration){
    this.timerId  = setTimeout(this.destroy, duration);
  }

  remove = () => {
    this.element.remove();
  }

  destroy = () => {
    clearTimeout(this.timerId);
    this.remove();
  }
}
