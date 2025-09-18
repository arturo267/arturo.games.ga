// perlin noise inspired by: https://iquilezles.org/articles/warp/ and https://thebookofshaders.com/13/ . made by arturo267
const canvas = document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

var R1 = localStorage.getItem("R1");
var G1 = localStorage.getItem("G1");
var B1 = localStorage.getItem("B1");
      
var R2 = localStorage.getItem("R2");
var G2 = localStorage.getItem("G2");
var B2 = localStorage.getItem("B2");
      
var R3 = localStorage.getItem("R3");
var G3 = localStorage.getItem("G3");
var B3 = localStorage.getItem("B3");

const scaleFactor = 15; // controls detail vs performance (do not set to low or your computer will suffer.)
const lowResCanvas = document.createElement("canvas");
const lowResCtx = lowResCanvas.getContext("2d");

let value2 = 0;
let time = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  lowResCanvas.width = Math.floor(canvas.width / scaleFactor);
  lowResCanvas.height = Math.floor(canvas.height / scaleFactor);
}
window.addEventListener("resize", resize);
resize();

// permutation for te noise
const P = (() => {
  const p = Array.from({length:256}, (_,i) => i);
  for(let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return p.concat(p);
})();

function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a, b, t) { return a + t * (b - a); }
function grad(hash, x, y, z) {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : (h === 12 || h === 14 ? x : z);
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// noise generation
function noise3D(x, y, z) {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;

  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const zf = z - Math.floor(z);

  const u = fade(xf);
  const v = fade(yf);
  const w = fade(zf);

  const aaa = P[P[P[X] + Y] + Z];
  const aba = P[P[P[X] + Y + 1] + Z];
  const aab = P[P[P[X] + Y] + Z + 1];
  const abb = P[P[P[X] + Y + 1] + Z + 1];
  const baa = P[P[P[X + 1] + Y] + Z];
  const bba = P[P[P[X + 1] + Y + 1] + Z];
  const bab = P[P[P[X + 1] + Y] + Z + 1];
  const bbb = P[P[P[X + 1] + Y + 1] + Z + 1];

  const x1 = lerp(grad(aaa, xf, yf, zf), grad(baa, xf - 1, yf, zf), u);
  const x2 = lerp(grad(aba, xf, yf - 1, zf), grad(bba, xf - 1, yf - 1, zf), u);
  const y1 = lerp(x1, x2, v);

  const x3 = lerp(grad(aab, xf, yf, zf - 1), grad(bab, xf - 1, yf, zf - 1), u);
  const x4 = lerp(grad(abb, xf, yf - 1, zf - 1), grad(bbb, xf - 1, yf - 1, zf - 1), u);
  const y2 = lerp(x3, x4, v);

  return lerp(y1, y2, w);
}

// fractial brownian motion with domain warping inspired by Inigo Quilez (totally not stolen equations) https://iquilezles.org/articles/warp/
// 
function fbm(x, y, z, octaves = 1) { 
  let value = 0 + value2; // default value, setting it to -1 or 1 will make it go to the first or last color on the color pallette more
  let amplitude = 0.6; // controlss the amplitude (no shit)
  let frequency = 0.6; // controls the frequency of the noise (NO MAMMES??!?!)

  // reduce axial bias
  const cosA = Math.cos(0.5);
  const sinA = Math.sin(0.5);

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise3D(x * frequency, y * frequency, z);
    // rotate and scale the coords to the next ocatave
    const nx = cosA * x * frequency - sinA * y * frequency;
    const ny = sinA * x * frequency + cosA * y * frequency;
    x = nx;
    y = ny;
    frequency *= 0.01;
    amplitude *= 1;
  }
  return value;
}

// color change to depending height
const palette3 = [
  [0, 0, 0],      
  [230, 50, 50], 
  [0, 0, 0],  
  [230, 50, 50],  
  [0, 0, 0],
];

const palette = [
  [R3 ?? 0, G3 ?? 0, B3 ?? 0],
  [R1 ?? 255, G1 ?? 0, B1 ?? 0],
  [R3 ?? 0, G3 ?? 0, B3 ?? 0],
  [R2 ?? 230, G2 ?? 230, B2 ?? 50],
  [R3 ?? 0, G3 ?? 0, B3 ?? 0],
];

// basic linear interpolation for pro
function lerpColor(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function render() {
  const w = lowResCanvas.width;
  const h = lowResCanvas.height;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x / w * 3;
      const py = y / h * 3;

      // DOMAIN EXPANSION (domain warping)
      const qx = fbm(px + 0.0, py + 0.0, time);
      const qy = fbm(px + 5.2, py + 1.3, time);

      const rx = fbm(px + 4.0 * qx + 1.7, py + 4.0 * qy + 9.2, time);
      const ry = fbm(px + 4.0 * qx + 8.3, py + 4.0 * qy + 2.8, time);

      let f = fbm(px + 4.0 * rx, py + 4.0 * ry, time);

      // normalize ([-1,1] to [1,0]) so we dont get to low numbers
      f = (f + 1) * 0.5;

      // pick corresponding colors from the "f" value
      const segments = palette.length - 1;
      const scaledF = f * segments;
      const index = Math.floor(scaledF);
      const t = scaledF - index;

      const c1 = palette[index] || palette[palette.length - 1];
      const c2 = palette[Math.min(index + 1, palette.length - 1)] || c1;
      const [r, g, b] = lerpColor(c1, c2, t);

      lowResCtx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
      lowResCtx.fillRect(x, y, 1, 1);
    }
  }
  // yipee drawing :D
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false; //disabled smoothing and smoothing quality. 
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(lowResCanvas, 0, 0, canvas.width, canvas.height);

  time += 0.005; // adds the time the more the faster
  value2 = Math.sin(time); // interpolate between -1 and 1 added to the value to make it change troughout all the colors in the table.
  requestAnimationFrame(render);
}

// starts the loop and the function
render();
