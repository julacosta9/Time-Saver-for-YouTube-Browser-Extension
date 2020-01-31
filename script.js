let moviePlayer;
let duration;
let playbackRate;
let timeSavedDiv;
let textColor = "#606060";
// let url = window.location.href;

setTimeout(function() {
    console.log(document.getElementById("info-text"));
    renderTimeSaveText();
    toggleDarkModeText();
}, 700);

function renderTimeSaveText() {
    moviePlayer = document.getElementById("movie_player");
    duration = moviePlayer.getDuration(); // returns duration in seconds
    playbackRate = moviePlayer.getPlaybackRate();

    if (playbackRate == 1) {
        deleteTimeSaveNodes();
        return;
    }

    let newDuration = duration / playbackRate;
    let timeSaved_minutes = Math.floor(Math.abs((duration - newDuration) / 60));
    let timeSaved_seconds = Math.abs(Math.round((duration - newDuration) % 60));

    console.log(
        "newDuration: " +
            newDuration +
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

    let save_or_lose_text = playbackRate >= 1 ? "Save" : "Lose";

    console.log(timeSavedDiv);
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

let counter = 1;
function updatePlaybackRate() {
    // console.log(counter++);
    playbackRate = document.getElementById("movie_player").getPlaybackRate(); // can probably delete this line. it's useless because i do it again in renderTimeSaveText();
    renderTimeSaveText();
    // toggleDarkModeText();
}

function toggleDarkModeText() {
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
        (element.classList.contains("ytp-menuitem-label") ||
            element.classList.contains("ytp-slider-handle"))
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
