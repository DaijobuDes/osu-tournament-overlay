import WebSocketManager from "./socket.js";

const socket = new WebSocketManager("localhost:24050");
const env = import.meta.env;

export default function init() {
  try {
    socket.api_v2((data) => {
      try {
        // Dispatch everything in a single event pass
        window.dispatchEvent(
          new CustomEvent("tosu:update", {
            detail: {
              beatmap: data.beatmap,
              directPath: data.directPath,
              folders: data.folders,
            },
          }),
        );
      } catch (err) {
        console.error("[!] Payload dispatch error:", err);
      }
    });
  } catch (err) {
    console.error("[!] Failed to initialize socket listener:", err);
  }
}
