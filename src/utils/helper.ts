import { $settings } from "../stores/settingStores";

export function truncate(text: string): string {
  const length = $settings.get().truncateLength;

  if (length == 0) {
    return text;
  }

  const absLength = Math.abs(length);

  if (absLength >= text.length) {
    return text;
  }

  return text.substring(0, absLength) + "...";
}

export function secondsToHumanReadable(totalSeconds: number): string {
  totalSeconds /= 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
}

// Hide circle size if mode is taiko and mania 4k/7k
export function isCSHidden(): boolean {
  const mode = $settings.get().mode;
  return ![1, 3, 4].includes(mode);
}

export function isMania(): boolean {
  const mode = $settings.get().mode;
  return [3, 4].includes(mode);
}
