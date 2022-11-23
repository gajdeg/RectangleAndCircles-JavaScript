import "./style.css";
const svg = document.querySelector("svg");
const btnUndo = document.getElementById("btnUndo");
const btnRedo = document.getElementById("btnRedo");

const coordUndo = [];
const coordRedo = [];

svg.addEventListener("click", (e) => {
  const { pageX, pageY, currentTarget } = e;
  const { left, top } = currentTarget.getBoundingClientRect();
  const { pageXOffset, pageYOffset } = window;
  const x = pageX - left - pageXOffset;
  const y = pageY - top - pageYOffset;
  const diameter = 30;

  coordUndo.push([x, y]);
  svg.innerHTML += createCircle([x, y], diameter);
});

function createCircle(center, diameter) {
  return `
    <circle
        cx="${center[0]}"
      cy="${center[1]}"
      r="${diameter / 2}"
      fill="black"
    ></circle>
  `;
}

function deleteCircle(center, diameter) {
  return `
      <circle
          cx="${center[0]}"
        cy="${center[1]}"
        r="${diameter / 2}"
        fill="white"
      ></circle>
    `;
}

btnUndo.addEventListener("click", () => {
  const a = coordUndo[coordUndo.length - 1];
  svg.innerHTML += deleteCircle(a, 30);
  coordUndo.pop();
  coordRedo.push(a);
});

btnRedo.addEventListener("click", () => {
  const b = coordRedo[coordRedo.length - 1];
  svg.innerHTML += createCircle(b, 30);
  coordRedo.pop();
  coordUndo.push(b);
});

function changeRectangle() {
  let element = document.getElementById("rectangle");
  const minX = document.querySelector('[name="minX"]').value;
  const maxX = document.querySelector('[name="maxX"]').value;
  const minY = document.querySelector('[name="minY"]').value;
  const maxY = document.querySelector('[name="maxY"]').value;

  element.style.right = maxX;
  element.style.left = minX;
  element.style.top = maxY;
  element.style.bottom = minY;
}

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") changeRectangle();
});
