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

    // console.log(
    //     "newDuration: " +
    //         newDuration +
    //         " timeSaved_minutes: " +
    //         timeSaved_minutes +
    //         " timeSaved_seconds: " +
    //         timeSaved_seconds
    // );

    deleteTimeSavedChildElements();

    let infoTextDiv = document.getElementById("info-text");
    timeSavedDiv = document.createElement("div");

    timeSavedDiv.id = "time-saved";
    timeSavedDiv.className = "style-scope ytd-video-primary-info-renderer";
    timeSavedDiv.style =
        "display:inline; color:" +
        textColor +
        "; font-size: 1.4rem; font-weight: 400;";

    // console.log(timeSavedDiv);

    let save_or_lose_text = playbackRate >= 1 ? "Save" : "Lose";

    timeSavedDiv.textContent =
        " • " +
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

        if (isDark == "true") {
            document.getElementById("time-saved").style.color = "#aaa";
            textColor = "#aaa";
        } else {
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

// fires on youtube's asyc page loads
window.addEventListener("yt-navigate-finish", function () {
    renderTimeSaveText();
    toggleDarkModeTextColor();
});

// fires when clicking within the movie player settings menu
document.addEventListener("click", function(event) {
    let element = event.target;
    if (
        element.tagName == "DIV" &&
        (element.classList.contains("ytp-menuitem-label") ||
            element.classList.contains("ytp-slider-handle"))
    ) {
        renderTimeSaveText();
        toggleDarkModeTextColor();
    }
});

// mutation observer that fires when an attribute changes on the html tag node
let targetNode = document.querySelector("html");
let observerOptions = {
    attributes: true
};

let observer = new MutationObserver(toggleDarkModeTextColor);
observer.observe(targetNode, observerOptions);