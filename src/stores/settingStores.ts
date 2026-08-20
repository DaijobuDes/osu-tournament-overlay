import { atom, map } from "nanostores";

export interface SettingsInterface {
  truncateLength: number;
}

export const $settings = map<SettingsInterface>({
  truncateLength: 0,
});
