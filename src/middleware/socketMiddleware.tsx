import * as SocketActions from '../actions/socket';

const socketMiddleware = (function () {
    const socketWs = null;
    const interval = null;
    const onOpen = (ws, store, token) => evt => {
        // send a handshake, or authenticate with remote end

        // tell the store we're connected
        store.dispatch(SocketActions.socketConnected());
    };

    const onClose = (ws, store) => evt => {
        // tell the store we've disconnected
        store.dispatch(SocketActions.disconnected());
    };

    const onMessage = (ws, store) => evt => {
        // parse the JSON message received on the websocket
        const msg = JSON.parse(evt.data);
        const index = 0;
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

    return store => next => action => {
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
