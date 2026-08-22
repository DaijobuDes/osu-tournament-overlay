/**
 *
 * @param mode can be 0-4, where 0 is standard, 1 is taiko, 2 is catch, 3 and 4 is mania
 * @returns true if mode is 3 or 4
 */
export function isMania(mode: number): boolean {
	return [3, 4].includes(mode);
}

/**
 *
 * @param mode can be 0-4, where 0 is standard, 1 is taiko, 2 is catch, 3 and 4 is mania
 * @returns true if mode is 0 or 2
 */
export function supportedCS(mode: number): boolean {
	return [0, 2].includes(mode);
}

/**
 *
 * @param mode can be 0-4, where 0 is standard, 1 is taiko, 2 is catch, 3 and 4 is mania
 * @returns true if mode is 0 or 1 or 2
 */
export function supportedAR(mode: number): boolean {
	return [0, 1, 2].includes(mode);
}

/**
 *
 * @param length truncate up to n length
 * @param text text to truncate
 * @returns string
 */
export function truncate(length: number, text: string): string {
	length = Math.abs(Math.round(length));
	if (length == 0 || length >= text.length) return text;
	return text.substring(0, length) + '...';
}

/**
 *
 * @param totalSeconds takes a number
 * @returns formatted time string
 */
export function secondsToHumanReadable(totalSeconds: number): string {
	totalSeconds /= 1000;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);

	const paddedSeconds = String(seconds).padStart(2, '0');

	return `${minutes}:${paddedSeconds}`;
}
