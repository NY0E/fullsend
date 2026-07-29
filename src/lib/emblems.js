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

export function sisyphus(ctx, cx, cy, color) {
  ctx.save();
  ctx.translate(cx, cy + 20);

  // slope
  ctx.beginPath();
  ctx.moveTo(-95, 55);
  ctx.lineTo(70, -35);
  ctx.lineTo(95, -35);
  ctx.lineTo(95, 60);
  ctx.lineTo(-95, 60);
  ctx.closePath();
  ctx.fillStyle = '#15100f';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-95, 55);
  ctx.lineTo(70, -35);
  ctx.stroke();

  // boulder, part-way up the slope
  ctx.beginPath();
  ctx.arc(28, -6, 26, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(28, -6, 26, 0.4, 2.6);
  ctx.stroke();

  // figure, bent forward, pushing
  ctx.strokeStyle = '#d8d2c8';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  // back leg
  ctx.beginPath();
  ctx.moveTo(-24, 42);
  ctx.lineTo(-6, 18);
  ctx.stroke();
  // front leg
  ctx.beginPath();
  ctx.moveTo(4, 44);
  ctx.lineTo(6, 20);
  ctx.stroke();
  // torso, leaning into the push
  ctx.beginPath();
  ctx.moveTo(-6, 18);
  ctx.lineTo(14, -12);
  ctx.stroke();
  // arm, reaching to the boulder
  ctx.beginPath();
  ctx.moveTo(6, -2);
  ctx.lineTo(4, -14);
  ctx.stroke();
  // head
  ctx.beginPath();
  ctx.arc(18, -20, 7, 0, Math.PI * 2);
  ctx.fillStyle = '#d8d2c8';
  ctx.fill();

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

export function flame(ctx, cx, cy, color) {
  ctx.save();
  ctx.translate(cx, cy + 10);

  // outer flame
  ctx.beginPath();
  ctx.moveTo(0, 65);
  ctx.bezierCurveTo(-40, 30, -34, -10, -8, -50);
  ctx.bezierCurveTo(-16, -30, -4, -20, 4, -34);
  ctx.bezierCurveTo(2, -50, 14, -66, 10, -78);
  ctx.bezierCurveTo(34, -50, 44, -16, 34, 10);
  ctx.bezierCurveTo(44, 0, 46, -14, 46, -14);
  ctx.bezierCurveTo(52, 20, 40, 50, 0, 65);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();

  // inner ember
  ctx.beginPath();
  ctx.moveTo(0, 42);
  ctx.bezierCurveTo(-16, 22, -12, 2, 2, -20);
  ctx.bezierCurveTo(4, -6, 12, -4, 14, -14);
  ctx.bezierCurveTo(22, 4, 22, 24, 0, 42);
  ctx.closePath();
  ctx.fillStyle = '#ffd27a';
  ctx.fill();

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
