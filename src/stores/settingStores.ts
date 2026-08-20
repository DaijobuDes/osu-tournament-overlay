import { atom, map } from "nanostores";

export interface SettingsInterface {
  truncateLength: number;
  mode: number;
}

export const $settings = map<SettingsInterface>({
  truncateLength: 0,
  mode: 0,
});
