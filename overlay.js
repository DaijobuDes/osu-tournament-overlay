import Alpine from "alpinejs";
import WebSocketManager from "./socket.js";

const socket = new WebSocketManager("localhost:24050");
const env = import.meta.env;
window.Alpine = Alpine;

Alpine.data("overlay", () => ({
  title: "No artist - No title",
  mapperName: "No mapper",
  difficultyName: "No difficulty selected",
  odValue: NaN,
  hpValue: NaN,
  stars: NaN,
  beatmapLength: "0:00",
  bpm: NaN,
  imageUrl: env.VITE_APP_BASE_URL + "/card@2x.jpg",
  currentBeatmapChecksum: null,
  currentGamemode: 0,
  bgcolor: "#000000",
  titleTruncateLength: 0,
  diffTruncateLength: 0,

  // For mania
  circlesValue: NaN,
  holdsValue: NaN,

  // Map types and hashes
  // NOTE: Do not erase the example below
  // The mappack is located on https://discord.com/channels/375294829837418506/995600112392871966/1389438429875671061
  items: {
    row1: [
      // { col: "RC1", hash: "b5c2d96718027bab862d9e0a2e3b54d0" },
      // { col: "RC2", hash: "a59d3ef18c4e0324b451df79001eac7f" },
      // { col: "RC3", hash: "aa5f8a0f0190fd8c8416a410e68d9e70" },
      // { col: "RC4", hash: "3ccd516d1e80a3d2eaded7298aa6fbef" },
      // { col: "RC5", hash: "cf7faed09491adca31b4626cf0681b89" },
      // { col: "RC6", hash: "8b8a5d3a029b294fe5330e169ed89a27" },
      // { col: "RC7", hash: "3fd2bcc56483fe8517f8e3f374844418" },
      // { col: "LN1", hash: "442358c0a5e803adb0949edc8f780297" },
      // { col: "LN2", hash: "3fd754b2b76439251c1f4a3ae6b63616" },
    ], // for first column
    row2: [
      // { col: "LN3", hash: "e0915840dcaf00ab1422a9ff7b6c0eb6" },
      // { col: "LN4", hash: "1ed3faedb48b3a16ea07dd18b8b4d22c" },
      // { col: "LN5", hash: "3dde9c455e2e650bf16e385aa0648c47" },
      // { col: "HB1", hash: "1f4457eea1b7d79dcb8af671f7d2aabc" },
      // { col: "HB2", hash: "552dd121133f30c7f0cc478281769f39" },
      // { col: "HB3", hash: "d2b59af3998c0f7ecaf6edbc6e54ece4" },
      // { col: "EX1", hash: "44b9430e8f501be55280aa955c28e44a" },
      // { col: "EX2", hash: "7bbc444e6ac5fdbfc21b1ef5a99d77c0" },
      // { col: "EX3", hash: "3a5e8a5014787c0a66ac84e84315bd73" },
      // { col: "TB", hash: "126a787bc7b190b78a921c1c3e894792" },
    ], // for second column
  },

  init() {
    try {
      socket.api_v2(({ /* state, settings, session, profile, performance, resultsScreen, play, */ beatmap, directPath, folders }) => {
        const beatmapArtist = beatmap.artist;
        const beatmapTitle = beatmap.title;
        const untruncatedMusicMetadata = `${beatmapArtist} - ${beatmapTitle}`;
        const beatmapMusicMetadata = this.truncate(untruncatedMusicMetadata, this.titleTruncateLength);

        const beatmapMapper = beatmap.mapper;
        const beatmapDifficulty = this.truncate(beatmap.version, this.diffTruncateLength);

        // If vscode or any IDE complains about od/hp does not exist on type, do NOT change it to OD or HP.
        // The JSDoc on socket.js is not correct and may need to be edited.
        const od = beatmap.stats.od.converted;
        const hp = beatmap.stats.hp.converted;
        const circles = beatmap.stats.objects.circles;
        const holds = beatmap.stats.objects.holds;

        const stars = beatmap.stats.stars.total;

        const timeFirstObject = beatmap.time.firstObject;
        const timeLastObject = beatmap.time.lastObject;
        const drainTime = beatmap.time.lastObject - beatmap.time.firstObject;
        const beatmapLength = this.secondsToHumanReadable(drainTime);

        const bpmCommon = beatmap.stats.bpm.common;
        const bpmMin = beatmap.stats.bpm.min;
        const bpmMax = beatmap.stats.bpm.max;
        let bpmFormatted = bpmCommon;

        const beatmapChecksum = beatmap.checksum;

        if (bpmMin != bpmMax) {
          bpmFormatted = `${bpmMin}-${bpmMax} (${bpmCommon})`;
        }

        // NOTE: For future reference: https://www.urlencoder.org/
        // TODO: Sanitize the image URL path, symbols that requires sanitization (#)
        // FIXME: Create better sanitizer for this that does not use external libraries
        const backgroundPath = directPath.beatmapBackground.replace(folders.songs, "").replaceAll("\\", "/").replaceAll("'", "%27");
        // http://127.0.0.1:24050/files/beatmap/24840 David Wise - Krook's March/Castle_Crush.jpg
        // http://127.0.0.1:24050/files/beatmap/723624 The Flashbulb - Back of the Yards\back.jpg
        const filePath = "http://127.0.0.1:24050/files/beatmap/" + backgroundPath;

        this.title = beatmapMusicMetadata;
        this.mapperName = beatmapMapper;
        this.difficultyName = beatmapDifficulty;
        this.odValue = od;
        this.hpValue = hp;
        this.circlesValue = circles;
        this.holdsValue = holds;
        this.stars = stars;
        this.beatmapLength = beatmapLength;
        this.bpm = bpmFormatted;
        this.updateImage(filePath);
        this.currentBeatmapChecksum = beatmapChecksum;
      });
    } catch (e) {
      console.error(e);
    }
  },

  secondsToHumanReadable(totalSeconds) {
    totalSeconds /= 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${minutes}:${paddedSeconds}`;
  },

  updateImage(filePath) {
    try {
      const img = new Image();
      img.src = filePath;

      img.onload = () => {
        this.imageUrl = filePath;
        this.loading = false;
      };

      img.onerror = () => {
        console.error("Image failed to load");
        this.loading = false;
      };
    } catch (e) {
      console.error(e);
    }
  },

  // For truncating strings
  truncate(string, length) {
    if (length == 0) {
      return string;
    }

    length = Math.abs(length);
    return string.substring(0, length) + "...";
  },

  // For setting gamemode on settings
  setGamemode(value) {
    if (value < 0 || value > 4) {
      value = 0;
    }
    this.currentGamemode = value;
  },

  // Add entries for hashes
  addMapAndHash(value) {
    console.log(value);
    const objectToPush = { col: "", hash: "" };
    if (value == 0) this.items.row1.push(objectToPush);
    else this.items.row2.push(objectToPush);
  },

  // Remove entries for hashes
  removeMapAndHash(value) {
    if (value == 0) this.items.row1.pop();
    else this.items.row2.pop();
  },

  // Show all entries (for debugging)
  showMapAndHash(value) {
    if (value == 0) console.log(this.items.row1);
    else console.log(this.items.row2);
  },

  // Save data to JSON for later use
  saveToJsonFile() {
    // Build JSON blob and automatically rename to current timestamp
    let jsonData = JSON.stringify(this.items, null, 4);
    const blob = new Blob([jsonData], { type: "application/json" });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `items-${timestamp}.json`;

    // Create link + download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // Append + click + cleanup afterwards
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Load data from JSON generated from save
  loadJsonFile(event) {
    // Reset items object
    this.items = { row1: [], row2: [] };

    // Handle file
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // event.target.value = "";

    reader.onload = (e) => {
      try {
        // Parse the JSON
        this.items = JSON.parse(e.target.result);
        console.log("Loaded data:", this.rawData);
      } catch (error) {
        alert("Invalid JSON file!");
        console.error(error);
      }
    };

    reader.readAsText(file);
  },
}));
