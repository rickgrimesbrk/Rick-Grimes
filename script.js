const audio = document.getElementById("audio");
const play = document.getElementById("play");
const progress = document.getElementById("progress");
const clock = document.getElementById("clock");

// music.mp3 has already been physically trimmed: it starts at 00:24
function fmt(s) {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

play.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      play.textContent = "Ⅱ";
    } else {
      audio.pause();
      play.textContent = "▶";
    }
  } catch (e) {
    alert("The music file could not be played.");
  }
});

audio.addEventListener("timeupdate", () => {
  const duration = audio.duration || 0;
  progress.style.width = `${duration ? (audio.currentTime / duration) * 100 : 0}%`;
  clock.textContent = fmt(audio.currentTime);
});

audio.addEventListener("ended", () => {
  play.textContent = "▶";
  progress.style.width = "0%";
  clock.textContent = "0:00";
});
