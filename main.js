import {
  addRectangle,
  getNewCoords,
  renderCircles,
  updateButtons,
} from "./resto";
import "./style.css";

const rectangle = document.querySelector(".rectangle");

const btnUndo = document.getElementById("btnUndo");
const btnRedo = document.getElementById("btnRedo");
const btnSave = document.getElementById("btnSave");
const btnClear = document.getElementById("btnClear");
const form = document.getElementById("myform");

let blue = document.querySelector(".blue");

let coords = [];
let undone = [];

render();

function render() {
  renderCircles(rectangle, blue, coords);
  updateButtons(btnRedo, btnUndo, btnClear, coords, undone, blue);
}

rectangle.addEventListener("click", (e) => {
  const { pageX, pageY, currentTarget, target } = e;
  const { left, top } = currentTarget.getBoundingClientRect();
  const { pageXOffset, pageYOffset } = window;
  const x = pageX - left - pageXOffset;
  const y = pageY - top - pageYOffset;
  if (currentTarget !== target) {
    return;
  }
  coords.push({ x, y });
  render();
  undone = [];
});

btnUndo.addEventListener("click", () => {
  const last = coords.pop();
  undone.push(last);
  render();
});

btnRedo.addEventListener("click", () => {
  const last = undone.pop();
  coords.push(last);
  render();
});

// btnSave.addEventListener("click", () => {
//   blue = addRectangle(rectangle);
//   coords = getNewCoords(coords);
//   undone = [];
//   render();
// });

// btnClear.addEventListener("click", () => {
//   blue.style.visibility = "hidden";
//   undone = [];
//   render();
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnSave.disabled = true;
  blue = addRectangle(rectangle);
  coords = getNewCoords(coords);
  undone = [];
  render();
});

form.addEventListener("reset", () => {
  btnSave.disabled = false;
  blue.style.visibility = "hidden";
  undone = [];
  render();
});

form.addEventListener("change", function () {
  btnSave.disabled = false;
});
