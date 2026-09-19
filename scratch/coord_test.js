const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; background: #111; display: flex; justify-content: center; align-items: center; height: 100vh; }
  .wrapper { position: relative; width: 680px; border-radius: 16px; overflow: hidden; }
  img { width: 100%; display: block; }
  canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
</style>
</head>
<body>
  <div class="wrapper">
    <img src="../assets/images/hero-house.webp">
    <canvas id="cv" width="680" height="382"></canvas>
  </div>
  <script>
    const cv = document.getElementById('cv');
    const ctx = cv.getContext('2d');
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '11px monospace';
    ctx.fillStyle = '#00ffcc';
    for(let x=0.05; x<1; x+=0.05) {
      ctx.beginPath();
      ctx.moveTo(x*680, 0);
      ctx.lineTo(x*680, 382);
      ctx.stroke();
      ctx.fillText(x.toFixed(2), x*680 + 2, 14);
    }
    for(let y=0.05; y<1; y+=0.05) {
      ctx.beginPath();
      ctx.moveTo(0, y*382);
      ctx.lineTo(680, y*382);
      ctx.stroke();
      ctx.fillText(y.toFixed(2), 4, y*382 - 2);
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'coord_test.html'), html);
const outPath = path.resolve(__dirname, 'coord_test.png').replace(/\\/g, '/');
const inPath = 'file:///' + path.resolve(__dirname, 'coord_test.html').replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --screenshot="${outPath}" --window-size=800,500 "${inPath}"`);
console.log('Done coord screenshot');
