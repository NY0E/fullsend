// Each emblem function draws into a ~220x180 area centered at (cx, cy).
// These are intentionally simple pictograms — placeholders until real
// patch artwork replaces them, per the "we'll get a designer eventually"
// conversation.

export function sunriseHills(ctx, cx, cy, color) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(cx - 110, cy - 90, 220, 150);
  ctx.clip();

  const sunGrad = ctx.createRadialGradient(cx, cy - 6, 4, cx, cy - 6, 46);
  sunGrad.addColorStop(0, '#ffd27a');
  sunGrad.addColorStop(1, color);
  ctx.beginPath();
  ctx.arc(cx, cy - 6, 40, 0, Math.PI * 2);
  ctx.fillStyle = sunGrad;
  ctx.fill();

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 46, cy - 6 + Math.sin(a) * 46);
    ctx.lineTo(cx + Math.cos(a) * 58, cy - 6 + Math.sin(a) * 58);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(cx - 110, cy + 40);
  ctx.quadraticCurveTo(cx - 40, cy - 10, cx + 20, cy + 20);
  ctx.quadraticCurveTo(cx + 70, cy + 40, cx + 110, cy + 10);
  ctx.lineTo(cx + 110, cy + 90);
  ctx.lineTo(cx - 110, cy + 90);
  ctx.closePath();
  ctx.fillStyle = '#1b2432';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx - 110, cy + 60);
  ctx.quadraticCurveTo(cx - 30, cy + 15, cx + 40, cy + 55);
  ctx.quadraticCurveTo(cx + 80, cy + 78, cx + 110, cy + 45);
  ctx.lineTo(cx + 110, cy + 90);
  ctx.lineTo(cx - 110, cy + 90);
  ctx.closePath();
  ctx.fillStyle = '#0f1520';
  ctx.fill();
  ctx.restore();
}

export function spartanHelmet(ctx, cx, cy, color) {
  ctx.save();
  ctx.translate(cx, cy + 15);
  ctx.scale(1.05, 1.05);

  ctx.beginPath();
  ctx.moveTo(-58, -78);
  ctx.bezierCurveTo(-40, -108, 30, -108, 66, -80);
  ctx.bezierCurveTo(78, -70, 78, -58, 64, -54);
  ctx.bezierCurveTo(30, -78, -30, -78, -50, -60);
  ctx.bezierCurveTo(-56, -66, -58, -72, -58, -78);
  ctx.closePath();
  ctx.fillStyle = '#c7c9cf';
  ctx.fill();

  ctx.strokeStyle = 'rgba(0,0,0,0.25)';
  ctx.lineWidth = 1.5;
  for (let x = -50; x < 62; x += 7) {
    ctx.beginPath();
    ctx.moveTo(x, -100 + Math.abs(x) * 0.15);
    ctx.lineTo(x + 3, -58);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(-52, -58);
  ctx.bezierCurveTo(-56, -20, -54, 10, -44, 34);
  ctx.bezierCurveTo(-38, 52, -20, 62, 2, 60);
  ctx.bezierCurveTo(10, 58, 8, 44, 2, 40);
  ctx.bezierCurveTo(20, 36, 34, 24, 40, 4);
  ctx.bezierCurveTo(46, -10, 44, -26, 34, -40);
  ctx.bezierCurveTo(26, -50, 8, -58, -14, -60);
  ctx.bezierCurveTo(-28, -61, -42, -60, -52, -58);
  ctx.closePath();
  ctx.fillStyle = '#c7c9cf';
  ctx.fill();

  const shade = ctx.createLinearGradient(-50, -60, 40, 40);
  shade.addColorStop(0, 'rgba(255,255,255,0.10)');
  shade.addColorStop(0.5, 'rgba(255,255,255,0)');
  shade.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = shade;
  ctx.fill();

  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.moveTo(6, -18);
  ctx.bezierCurveTo(16, -22, 30, -20, 36, -12);
  ctx.bezierCurveTo(30, -6, 16, -6, 6, -10);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(14, -12);
  ctx.lineTo(20, -12);
  ctx.lineTo(16, 10);
  ctx.lineTo(11, 10);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  ctx.restore();
}

export function snowflake(ctx, cx, cy, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.rotate((i / 6) * Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -55);
    ctx.stroke();
    for (const off of [-32, -18]) {
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(0, off);
      ctx.lineTo(-12, off - 10);
      ctx.moveTo(0, off);
      ctx.lineTo(12, off - 10);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();
}

export function sunBadge(ctx, cx, cy, color) {
  ctx.save();
  const grad = ctx.createRadialGradient(cx, cy, 6, cx, cy, 44);
  grad.addColorStop(0, '#fff0c2');
  grad.addColorStop(1, color);
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * 46, cy + Math.sin(a) * 46);
    ctx.lineTo(cx + Math.cos(a) * 62, cy + Math.sin(a) * 62);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
  }
  ctx.restore();
}

export function raindrop(ctx, cx, cy, color) {
  ctx.save();
  for (const [dx, s] of [[-40, 0.7], [0, 1], [40, 0.75]]) {
    ctx.save();
    ctx.translate(cx + dx, cy - 10);
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.bezierCurveTo(28, 0, 28, 34, 0, 34);
    ctx.bezierCurveTo(-28, 34, -28, 0, 0, -50);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.9;
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

export function yetiTrack(ctx, cx, cy, color) {
  ctx.save();
  ctx.fillStyle = color;
  function footprint(x, y, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    for (let i = -2; i <= 2; i++) {
      ctx.beginPath();
      ctx.ellipse(i * 12, -40, 7, 9, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
  footprint(cx - 34, cy + 10, -0.15);
  footprint(cx + 34, cy - 24, 0.15);
  ctx.restore();
}

export function globe(ctx, cx, cy, color, ringCount) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 55, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 1; i < ringCount; i++) {
    const rx = 55 * (1 - i / ringCount) + 8;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, 55, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(-55, 0);
  ctx.lineTo(55, 0);
  ctx.stroke();
  ctx.restore();
}

export function bootsAndPack(ctx, cx, cy, color) {
  ctx.save();
  ctx.fillStyle = color;
  // simple backpack silhouette
  ctx.beginPath();
  ctx.roundRect(cx - 26, cy - 50, 52, 66, 10);
  ctx.fill();
  ctx.fillStyle = '#0f1520';
  ctx.beginPath();
  ctx.roundRect(cx - 16, cy - 40, 32, 22, 6);
  ctx.fill();
  // straps
  ctx.strokeStyle = color;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy - 50);
  ctx.lineTo(cx - 14, cy + 30);
  ctx.moveTo(cx + 14, cy - 50);
  ctx.lineTo(cx + 14, cy + 30);
  ctx.stroke();
  ctx.restore();
}

export function litterPickup(ctx, cx, cy, color) {
  ctx.save();
  ctx.translate(cx, cy);
  // leaf/broom sweep motif — a simple curved sprig with two leaves
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(-40, 40);
  ctx.quadraticCurveTo(0, -50, 40, -40);
  ctx.stroke();
  for (const t of [0.35, 0.65]) {
    const x = -40 + (40 - -40) * t;
    const y = 40 + (-40 - 40) * t;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.6 + t);
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}
