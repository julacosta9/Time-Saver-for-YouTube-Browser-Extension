let moviePlayer;
let duration;
let playbackRate;
let timeSavedDiv;
let textColor;
let url = window.location.href;

renderTimeSaveText();
toggleDarkModeText();

function renderTimeSaveText() {
    moviePlayer = document.getElementById("movie_player");
    console.log(moviePlayer);
    duration = moviePlayer.getDuration(); // returns duration in seconds
    playbackRate = moviePlayer.getPlaybackRate();

    if (playbackRate == 1) {
        deleteTimeSaveNodes();
        return;
    }

    let adjustedDuration = duration / playbackRate;
    let timeSaved_minutes = ((duration - adjustedDuration) / 60)
        .toString()
        .split(".")[0];
    let timeSaved_seconds = Math.round((duration - adjustedDuration) % 60);

    console.log(
        "adjustedDuration: " +
            adjustedDuration +
            " timeSaved_minutes: " +
            timeSaved_minutes +
            " timeSaved_seconds: " +
            timeSaved_seconds
    );

    deleteTimeSaveNodes();

    let infoTextDiv = document.getElementById("info-text");
    timeSavedDiv = document.createElement("div");

    timeSavedDiv.id = "time-saved";
    timeSavedDiv.className = "style-scope ytd-video-primary-info-renderer";
    timeSavedDiv.style =
        "display:inline; color:" +
        textColor +
        "; font-size: 1.4rem; font-weight: 400;";

    console.log(timeSavedDiv);
    timeSavedDiv.textContent =
        " • Save " +
        timeSaved_minutes +
        "m" +
        timeSaved_seconds +
        "s by watching at " +
        playbackRate +
        "x speed";

    infoTextDiv.append(timeSavedDiv);
}

let counter = 1;
function updatePlaybackRate() {
    // console.log(counter++);
    playbackRate = document.getElementById("movie_player").getPlaybackRate();
    renderTimeSaveText();
}

function toggleDarkModeText() {
    let dark = document.querySelector("html").getAttribute("dark");
    if (dark == "true") {
        document.getElementById("time-saved").style.color = "#aaa";
        textColor = "#aaa";
    } else {
        document.getElementById("time-saved").style.color = "#606060";
        textColor = "#606060";
    }
}

function deleteTimeSaveNodes() {
    if (document.querySelectorAll("#time-saved").length > 0) {
        for (const element of document.querySelectorAll("#time-saved")) {
            element.remove();
        }
    }
}

document.addEventListener("click", function(event) {
    let element = event.target;
    if (
        element.tagName == "DIV" &&
        element.classList.contains("ytp-menuitem-label")
    ) {
        updatePlaybackRate();
    }
});

// Mutation Observer - Currently triggered anytime there's an attribute change on the html element
let targetNode = document.querySelector("html");
let observerOptions = {
    attributes: true,
    childList: false,
    subtree: false,
    characterData: false
};

let observer = new MutationObserver(toggleDarkModeText);
observer.observe(targetNode, observerOptions);
