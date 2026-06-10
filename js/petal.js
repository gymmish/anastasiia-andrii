const PETAL_IMAGES = [
  "image/patal1.png",
  "image/patal2.png",
  "image/patal3.png",
  "image/patal4.png",
  "image/patal5.png",
  "image/patal6.png",
  "image/patal7.png",
  "image/patal8.png",
];

function createPetal() {
  const container = document.querySelector(".petals");
  if (!container) return;

  const petal = document.createElement("img");

  petal.src = PETAL_IMAGES[Math.floor(Math.random() * PETAL_IMAGES.length)];

  petal.classList.add("petal");

  const size = Math.random() * 18 + 16;

  let x = Math.random() * window.innerWidth;
  let y = -50;

  const speedY = Math.random() * 0.8 + 0.6;
  const speedX = Math.random() * 0.5 - 0.25;

  const sway = Math.random() * 1.5 + 0.5;

  const baseRotation = Math.random() * 360;
  const tiltAmount = Math.random() * 20 + 10;

  petal.style.width = `${size}px`;

  container.appendChild(petal);

  function animate() {
    y += speedY;

    x += speedX + Math.sin(y / 60) * sway;

    const tilt = Math.sin(y / 60) * tiltAmount;

    petal.style.transform = `
      translate(${x}px, ${y}px)
      rotate(${baseRotation + tilt}deg)
    `;

    petal.style.opacity = Math.max(0.15, 1 - y / (window.innerHeight * 1.2));

    if (y < window.innerHeight + 100) {
      requestAnimationFrame(animate);
    } else {
      petal.remove();
    }
  }

  requestAnimationFrame(animate);
}

setInterval(createPetal, 1200);
