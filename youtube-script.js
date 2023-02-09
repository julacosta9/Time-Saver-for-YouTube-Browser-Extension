let moviePlayer;
let duration;
let playbackRate;
let timeSavedDiv;
let textColor = "#606060";

function renderTimeSaveText() {
  moviePlayer = document.getElementById("movie_player");
  duration = moviePlayer.getDuration(); // returns duration in seconds
  playbackRate = moviePlayer.getPlaybackRate();

  if (playbackRate == 1) {
    deleteTimeSavedChildElements();
    return;
  }

  let newDuration = duration / playbackRate;
  let timeSaved_minutes = Math.floor(Math.abs((duration - newDuration) / 60));
  let timeSaved_seconds = Math.abs(Math.round((duration - newDuration) % 60));

  deleteTimeSavedChildElements();

  let infoTextDiv = document.getElementById("owner");
  timeSavedDiv = document.createElement("div");

  timeSavedDiv.id = "time-saved";
  timeSavedDiv.className = "style-scope ytd-video-primary-info-renderer";
  timeSavedDiv.style =
    "display:inline; color:" +
    textColor +
    "; font-size: 1.4rem; font-weight: 400; margin-left: 6px;";

  let save_or_lose_text = playbackRate >= 1 ? "Save" : "Lose";

  timeSavedDiv.textContent =
    "• " +
    save_or_lose_text +
    " " +
    timeSaved_minutes +
    "m" +
    timeSaved_seconds +
    "s by watching at " +
    playbackRate +
    "x speed";

  infoTextDiv.append(timeSavedDiv);
}

function toggleDarkModeTextColor() {
  if (document.body.contains(document.getElementById("time-saved"))) {
    let isDark = document.querySelector("html").getAttribute("dark");

    // true
    if (isDark == "") {
      document.getElementById("time-saved").style.color = "#aaa";
      textColor = "#aaa";
    } else {
      // false
      document.getElementById("time-saved").style.color = "#606060";
      textColor = "#606060";
    }
  }
}

function deleteTimeSavedChildElements() {
  if (document.querySelectorAll("#time-saved").length > 0) {
    for (const element of document.querySelectorAll("#time-saved")) {
      element.remove();
    }
  }
}

// fires on youtube's async page loads
window.addEventListener("yt-navigate-finish", function () {
  renderTimeSaveText();
  toggleDarkModeTextColor();
});

// fires when clicking within the movie player settings menu
document.addEventListener("click", function (event) {
  let element = event.target;
  if (
    element.tagName == "DIV" &&
    (element.classList.contains("ytp-menuitem-label") ||
      element.classList.contains("ytp-slider-section") ||
      element.classList.contains("ytp-slider-handle") ||
      element.classList.contains("ytp-speedslider-component") ||
      element.classList.contains("ytp-speedslider-text") ||
      element.classList.contains("ytp-panel"))
  ) {
    renderTimeSaveText();
    toggleDarkModeTextColor();
  }
});

let keysPressed = {};

// fires when a built in YouTube shortcut is pressed
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true; // store which key is pressed

  // if shift + "," or "." are pressed, run function to render text
  if (
    (keysPressed["Shift"] && event.key == "<") ||
    (keysPressed["Shift"] && event.key == ">")
  ) {
    renderTimeSaveText();
    toggleDarkModeTextColor();
  }
});

document.addEventListener("keyup", (event) => {
  delete keysPressed[event.key]; // delete key that is no longer pressed from 'keysPressed' object
});

// mutation observer that fires when an attribute changes on the html tag node
let targetNode = document.querySelector("html");
let observerOptions = {
  attributes: true,
};

let observer = new MutationObserver(toggleDarkModeTextColor);
observer.observe(targetNode, observerOptions);
