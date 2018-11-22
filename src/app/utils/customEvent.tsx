class Event {
  constructor() {
    let CustomEvent = (event, params) => {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    };
    CustomEvent.prototype = (window as any).Event.prototype;
    (window as any).CustomEvent = CustomEvent;

    this.trigger = this.trigger.bind(this);
  }

  trigger(e: any, data: any) {
    window.dispatchEvent(new CustomEvent(e, { 'detail': data }));
  }

}

let customEvent = new Event();

export default customEvent;
