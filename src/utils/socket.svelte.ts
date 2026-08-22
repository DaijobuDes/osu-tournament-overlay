import WebSocketManager from './socket.js';

export interface TosuData {
	beatmap: any;
	directPath: any;
	folders: any;
}

// Global reactive state using Svelte 5 $state
export const tosuState = $state<{ data: TosuData | null }>({
	data: null
});

const socket = new WebSocketManager('localhost:24050');

export function initSocket() {
	try {
		socket.api_v2((data) => {
			try {
				// Mutate the state directly - Svelte automatically tracks changes
				tosuState.data = {
					beatmap: data.beatmap,
					directPath: data.directPath,
					folders: data.folders
				};
			} catch (err) {
				console.error('[!] Payload update error:', err);
			}
		});
	} catch (err) {
		console.error('[!] Failed to initialize socket listener:', err);
	}
}
