// Shared canvas primitives for rendering patches/badges.
// Every badge (Full Send, Elements, One Is Enough, and whatever gets
// added later) should render through renderPatch() rather than
// duplicating this drawing code per page.

export function drawArcText(ctx, str, cx, cy, radius, angleSpan, dir, font, color) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.translate(cx, cy);
  const step = (angleSpan / str.length) * dir;
  ctx.rotate(-step * (str.length - 1) / 2);
  for (let i = 0; i < str.length; i++) {
    ctx.save();
    ctx.translate(0, -radius);
    ctx.fillText(str[i], 0, 0);
    ctx.restore();
    ctx.rotate(step);
  }
  ctx.restore();
}

function drawFabricBase(ctx, cx, cy, R, tint) {
  const fabric = ctx.createRadialGradient(cx, cy - R * 0.3, 20, cx, cy, R);
  fabric.addColorStop(0, tint.inner);
  fabric.addColorStop(1, tint.outer);
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fillStyle = fabric;
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let i = -R * 2; i < R * 2; i += 6) {
    ctx.beginPath();
    ctx.moveTo(cx - R + i, cy - R);
    ctx.lineTo(cx - R + i + R * 2, cy + R);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMerrowedBorder(ctx, cx, cy, R, color, bg) {
  const stitchCount = 90;
  for (let i = 0; i < stitchCount; i++) {
    const a = (i / stitchCount) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (R - 2), y1 = cy + Math.sin(a) * (R - 2);
    const x2 = cx + Math.cos(a) * (R + 9), y2 = cy + Math.sin(a) * (R + 9);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = i % 2 === 0 ? color : bg;
    ctx.lineWidth = 3.2;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, R - 16, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.setLineDash([4, 5]);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPipRing(ctx, cx, cy, R, total, filled, color) {
  const pipRadius = R - 34;
  const pipSize = total > 24 ? 3.5 : 5;
  for (let i = 0; i < total; i++) {
    const a = -Math.PI / 2 + (i / total) * Math.PI * 2;
    const px = cx + Math.cos(a) * pipRadius;
    const py = cy + Math.sin(a) * pipRadius;
    ctx.beginPath();
    ctx.arc(px, py, pipSize, 0, Math.PI * 2);
    if (i < filled) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }
}

function drawRibbon(ctx, cx, ribbonY, color, bg, name, dateStr) {
  const ribbonW = 340, ribbonH = 54;
  ctx.beginPath();
  ctx.moveTo(cx - ribbonW / 2, ribbonY);
  ctx.lineTo(cx - ribbonW / 2 - 16, ribbonY + ribbonH / 2);
  ctx.lineTo(cx - ribbonW / 2, ribbonY + ribbonH);
  ctx.lineTo(cx + ribbonW / 2, ribbonY + ribbonH);
  ctx.lineTo(cx + ribbonW / 2 + 16, ribbonY + ribbonH / 2);
  ctx.lineTo(cx + ribbonW / 2, ribbonY);
  ctx.closePath();
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = 'bold 22px "Courier New", monospace';
  ctx.fillStyle = '#eef1f6';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(name, cx, ribbonY + 30);
  ctx.font = '11px "Courier New", monospace';
  ctx.fillStyle = '#6b7c94';
  ctx.fillText('SELF-REPORTED · ' + dateStr.toUpperCase(), cx, ribbonY + 46);
}

/**
 * Render a full patch onto a canvas.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} opts
 * @param {string} opts.color            tier/badge accent color
 * @param {string} [opts.fabricInner]     inner fabric gradient stop (defaults derived from color)
 * @param {string} [opts.fabricOuter]     outer fabric gradient stop
 * @param {string} opts.topText           arched text along the top rim
 * @param {string} [opts.bottomText]      arched text along the bottom rim
 * @param {function(CanvasRenderingContext2D, number, number): void} opts.drawEmblem
 *        callback that draws the center emblem at (cx, emblemY)
 * @param {Object} [opts.pipRing]         optional { total, filled } to draw an AO pip ring
 * @param {string} opts.name              name/nickname for the ribbon
 * @param {string} [opts.subtext]         small caption under the emblem
 */
export function renderPatch(canvas, opts) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2 - 60;
  const R = 250;
  const color = opts.color;
  const fabricInner = opts.fabricInner || '#232d3d';
  const fabricOuter = opts.fabricOuter || '#151b26';
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#0c0f15';
  ctx.fillRect(0, 0, W, H);

  drawFabricBase(ctx, cx, cy, R, { inner: fabricInner, outer: fabricOuter });
  drawMerrowedBorder(ctx, cx, cy, R, color, '#0c0f15');

  if (opts.pipRing) {
    drawPipRing(ctx, cx, cy, R, opts.pipRing.total, opts.pipRing.filled, color);
  }

  drawArcText(ctx, opts.topText, cx, cy, R - 46, opts.topAngleSpan || 1.9, 1,
    'italic 900 24px Impact, "Arial Black", sans-serif', '#eef1f6');

  if (opts.bottomText) {
    drawArcText(ctx, opts.bottomText, cx, cy, R - 46, opts.bottomAngleSpan || 1.4, -1,
      'bold 15px "Courier New", monospace', '#c7d1de');
  }

  const emblemY = cy + 24;
  opts.drawEmblem(ctx, cx, emblemY, color);

  if (opts.subtext) {
    ctx.textAlign = 'center';
    ctx.font = '13px "Courier New", monospace';
    ctx.fillStyle = '#aab6c8';
    ctx.fillText(opts.subtext, cx, emblemY + 118);
  }

  const ribbonY = cy + R + 34;
  drawRibbon(ctx, cx, ribbonY, color, '#1b2432', (opts.name || 'ANONYMOUS PAX').toUpperCase(), dateStr);

  return canvas;
}
