const LIGHT_MODE_TEXT_COLOR = "#606060";
const DARK_MODE_TEXT_COLOR = "#aaa";

function renderTimeSaveText() {
  const moviePlayer = document.getElementById("movie_player");
  const originalDuration = moviePlayer.getDuration(); // returns duration in seconds
  const playbackRate = moviePlayer.getPlaybackRate();

  if (playbackRate == 1) {
    deleteTimeSavedText();
    return;
  }

  const durationAtNewPlaybackSpeed = originalDuration / playbackRate;
  const minutesSaved = Math.floor(
    Math.abs((originalDuration - durationAtNewPlaybackSpeed) / 60)
  );
  const secondsSaved = Math.abs(
    Math.round((originalDuration - durationAtNewPlaybackSpeed) % 60)
  );

  const infoTextDiv = document.getElementById("owner");
  const timeSavedDiv = document.createElement("div");

  timeSavedDiv.id = "time-saved";
  timeSavedDiv.className = "style-scope ytd-video-primary-info-renderer";
  timeSavedDiv.style = `display:inline; color:${
    isDarkMode() ? DARK_MODE_TEXT_COLOR : LIGHT_MODE_TEXT_COLOR
  }; font-size: 1.4rem; font-weight: 400; margin-left: 6px;`;

  const saveOrLoseText = playbackRate >= 1 ? "Save" : "Lose";

  timeSavedDiv.textContent = `• ${saveOrLoseText} ${minutesSaved}m ${secondsSaved}s by watching at ${playbackRate}x speed`;

  deleteTimeSavedText();
  infoTextDiv.append(timeSavedDiv);
}

function deleteTimeSavedText() {
  if (document.querySelectorAll("#time-saved").length < 1) return;

  for (const element of document.querySelectorAll("#time-saved")) {
    element.remove();
  }
}

function toggleTextColor() {
  if (isDarkMode()) {
    document.getElementById("time-saved").style.color = DARK_MODE_TEXT_COLOR;
  } else {
    document.getElementById("time-saved").style.color = LIGHT_MODE_TEXT_COLOR;
  }
}

function isDarkMode() {
  if (!document.body.contains(document.getElementById("time-saved"))) return;

  const isDark = document.querySelector("html").getAttribute("dark");

  return isDark;
}

const settingsParentContainer = document.getElementById("ytp-id-7");

// fires when changing playback speed in the movie player options menu by clicking
settingsParentContainer.addEventListener("click", function (event) {
  renderTimeSaveText();
  toggleTextColor();
});

// fires when changing playback speed in the movie player options menu using the slider
settingsParentContainer.addEventListener("mouseup", function (event) {
  // delay by 100ms because we need to wait for playbackRate to update
  // otherwise it uses the previously set playback rate
  window.setTimeout(() => {
    renderTimeSaveText();
    toggleTextColor();
  }, 100);
});

// fires when a built in YouTube shortcut is pressed
document.addEventListener("keydown", (event) => {
  if (event.shiftKey && (event.key === "<" || event.key === ">")) {
    renderTimeSaveText();
    toggleTextColor();
  }
});

// fires when an attribute changes on the html tag node
const targetNode = document.querySelector("html");
const observerOptions = {
  attributes: true,
};

const observer = new MutationObserver(toggleTextColor);
observer.observe(targetNode, observerOptions);
