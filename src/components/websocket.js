// src/websocket.js
export class WebSocketService {
    static instance = null;

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.socketRef = null;
    }

    connect(url) {
        this.socketRef = new WebSocket(url);

        this.socketRef.onopen = () => {
            console.log("WebSocket open");
        };

        this.socketRef.onmessage = (event) => {
            console.log("WebSocket message received:", JSON.parse(event.data));
        };

        this.socketRef.onerror = (error) => {
            console.log("WebSocket error:", error);
        };

        this.socketRef.onclose = () => {
            console.log("WebSocket closed. Reconnecting...");
            this.connect(url); // Reconnect on close
        };
    }

    sendMessage(data) {
        if (this.socketRef && this.socketRef.readyState === WebSocket.OPEN) {
            this.socketRef.send(JSON.stringify(data));
        } else {
            console.log("WebSocket is not open.");
        }
    }

    close() {
        if (this.socketRef) {
            this.socketRef.close();
        }
    }
}
