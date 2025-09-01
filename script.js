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
