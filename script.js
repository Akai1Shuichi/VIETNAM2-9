const canvas = document.getElementById("flagCanvas");
const ctx = canvas.getContext("2d");
const speedRange = document.getElementById("speedRange");

let waveSpeed = Number(speedRange.value);
let offset = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

speedRange.addEventListener("input", () => {
  waveSpeed = Number(speedRange.value);
});

const flagImg = new Image();
flagImg.src = "https://flagcdn.com/w320/vn.png";

function drawWavingFlag(img, offset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate flag size to fill canvas and keep aspect ratio
  const aspect = img.width / img.height;
  let flagWidth = canvas.width;
  let flagHeight = canvas.height;
  if (canvas.width / canvas.height > aspect) {
    flagHeight = canvas.height;
    flagWidth = flagHeight * aspect;
  } else {
    flagWidth = canvas.width;
    flagHeight = flagWidth / aspect;
  }
  const xStart = (canvas.width - flagWidth) / 2;
  const yStart = (canvas.height - flagHeight) / 2;

  const waveAmplitude = Math.max(20, flagHeight * 0.06);
  const waveLength = Math.max(80, flagWidth * 0.18);

  // Smoother waving: more slices, use cosine for trailing edge
  const slices = Math.max(120, Math.floor(flagWidth / 6));
  const sliceWidth = flagWidth / slices;
  for (let i = 0; i < slices; i++) {
    const sx = i * sliceWidth;
    const sw = sliceWidth;
    const sh = img.height;
    const dx = xStart + sx;
    // Use both sine and cosine for smoother trailing
    const phase = sx / waveLength + offset;
    const dy =
      yStart +
      Math.sin(phase) * waveAmplitude +
      Math.cos(phase * 0.7) * (waveAmplitude * 0.3);
    ctx.drawImage(
      img,
      sx * (img.width / flagWidth),
      0,
      sw * (img.width / flagWidth),
      img.height,
      dx,
      dy,
      sliceWidth,
      flagHeight
    );
  }
}

function animate() {
  offset += 0.02 * waveSpeed;
  drawWavingFlag(flagImg, offset);
  requestAnimationFrame(animate);
}

flagImg.onload = () => {
  animate();
};

const playMusicBtn = document.getElementById("playMusicBtn");
const prevMusicBtn = document.getElementById("prevMusicBtn");
const nextMusicBtn = document.getElementById("nextMusicBtn");
const flagAudio = document.getElementById("flagAudio");
const musicSelect = document.getElementById("musicSelect");

let isPlaying = false;

// Lấy danh sách các bài nhạc từ select
function getMusicOptions() {
  return Array.from(musicSelect.options).map((opt) => ({
    value: opt.value,
    text: opt.text,
  }));
}
function getCurrentMusicIndex() {
  return musicSelect.selectedIndex;
}
function setMusicIndex(idx, autoPlay = true) {
  const options = getMusicOptions();
  if (idx < 0) idx = options.length - 1;
  if (idx >= options.length) idx = 0;
  musicSelect.selectedIndex = idx;
  flagAudio.src = options[idx].value;
  flagAudio.pause();
  flagAudio.currentTime = 0;
  playMusicBtn.textContent = "Phát nhạc";
  isPlaying = false;
  if (autoPlay) {
    flagAudio
      .play()
      .then(() => {
        playMusicBtn.textContent = "Tạm dừng nhạc";
        isPlaying = true;
      })
      .catch(() => {
        playMusicBtn.textContent = "Phát nhạc";
        isPlaying = false;
      });
  }
}

// Sự kiện chuyển bài trước
prevMusicBtn.addEventListener("click", () => {
  let idx = getCurrentMusicIndex();
  setMusicIndex(idx - 1, true);
});

// Sự kiện chuyển bài tiếp
nextMusicBtn.addEventListener("click", () => {
  let idx = getCurrentMusicIndex();
  setMusicIndex(idx + 1, true);
});

// Khi chọn bài từ select, tự động phát
musicSelect.addEventListener("change", () => {
  setMusicIndex(getCurrentMusicIndex(), true);
});

playMusicBtn.addEventListener("click", () => {
  if (isPlaying) {
    flagAudio.pause();
    playMusicBtn.textContent = "Phát nhạc";
  } else {
    flagAudio.play();
    playMusicBtn.textContent = "Tạm dừng nhạc";
  }
  isPlaying = !isPlaying;
});

// Khi hết bài, tự động phát bài tiếp theo, lặp lại danh sách
flagAudio.addEventListener("ended", () => {
  let idx = getCurrentMusicIndex();
  setMusicIndex(idx + 1, true);
});

// Tự động phát nhạc đầu tiên khi load trang
window.addEventListener("DOMContentLoaded", () => {
  setMusicIndex(0, true);
});

const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");
const settingsArrow = document.getElementById("settingsArrow");

let panelOpen = true;
settingsToggle.addEventListener("click", () => {
  panelOpen = !panelOpen;
  if (panelOpen) {
    settingsPanel.classList.remove("hide");
    settingsToggle.classList.add("open");
    settingsArrow.innerHTML = "&#9660;"; // down
  } else {
    settingsPanel.classList.add("hide");
    settingsToggle.classList.remove("open");
    settingsArrow.innerHTML = "&#9650;"; // up
  }
});
