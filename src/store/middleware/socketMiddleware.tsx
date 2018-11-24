import * as SocketActions from '../actions/socket';

const socketMiddleware = (function () {
    let socketWs = null;
    let interval = null;
    const onOpen = (ws: any, store: any, token: any) => (evt: any) => {
        // send a handshake, or authenticate with remote end

        // tell the store we're connected
        store.dispatch(SocketActions.socketConnected());
    };

    const onClose = (ws: any, store: any) => (evt: any) => {
        // tell the store we've disconnected
        store.dispatch(SocketActions.disconnected());
    };

    const onMessage = (ws: any, store: any) => (evt: any) => {
        // parse the JSON message received on the websocket
        const msg = JSON.parse(evt.data);
        let index = 0;
        if (interval !== null) {
          clearInterval(interval);
        }
        interval = setInterval(function () {
          index++;
          if (index > 10) {
            store.dispatch(SocketActions.disconnected());
            clearInterval(interval);
          };
        }, 1000);
        switch (msg.MsgType) {
            case 'Ping':
                // heartbeat connect websocket
                break;
            default:
                store.dispatch(SocketActions.receiveMessage(msg));
                break;
        }
    };

    return (store: any) => (next: any) => (action: any) => {
        switch (action.type) {
            // the user wants us to connect
            case 'CONNECT':
                // start a new connection to the server
                if (socketWs != null) {
                    socketWs.close();
                }
                // send an action that shows a 'connecting...' status for now
                store.dispatch(SocketActions.connecting());
                // attempt to connect (we could send a 'failed' action on error)
                socketWs = new WebSocket(action.payload.url);
                socketWs.onmessage = onMessage(socketWs, store);
                socketWs.onclose = onClose(socketWs, store);
                socketWs.onopen = onOpen(socketWs, store, action.token);

                break;

            // the user wants us to disconnect
            case 'DISCONNECT':
                if (socketWs != null) {
                    socketWs.close();
                }
                socketWs = null;

                // set our state to disconnected
                store.dispatch(SocketActions.disconnected());
                store.dispatch(SocketActions.connectSocket());
                break;

            // send the 'SEND_MESSAGE' action down the websocket to the server
            case 'SENDMESSAGE':
                socketWs.send(action.payload);
                break;

            // this action is irrelevant to us, pass it on to the next middleware
            default:
                return next(action);
        }
    };

})();

export default socketMiddleware;
