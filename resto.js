export function renderCircles(rectangle, blue, coords) {
  const innerHTML = coords.reduce((result, coord, index) => {
    result += `<div class='circle' style="top:${coord.y}px;left:${coord.x}px">${index}</div>`;
    return result;
  }, "");

  rectangle.innerHTML = innerHTML + blue.outerHTML;
}

export function updateButtons(btnRedo, btnUndo, coords, undone) {
  btnRedo.disabled = undone.length === 0;
  btnUndo.disabled = coords.length === 0;
}

export function addRectangle(rectangle) {
  const minX = document.querySelector('[name="minX"]').value;
  const maxX = document.querySelector('[name="maxX"]').value;
  const minY = document.querySelector('[name="minY"]').value;
  const maxY = document.querySelector('[name="maxY"]').value;

  const height = maxY - minY;
  const width = maxX - minX;

  const blue = rectangle.querySelector(".blue");

  blue.style.visibility = "visible";
  blue.style.width = width + "px";
  blue.style.height = height + "px";

  blue.style.transform = "translate(" + minX + "px," + minY + "px)";
  return blue;
}

export function getNewCoords(coords) {
  const minX = document.querySelector('[name="minX"]').value;
  const maxX = document.querySelector('[name="maxX"]').value;
  const minY = document.querySelector('[name="minY"]').value;
  const maxY = document.querySelector('[name="maxY"]').value;

  console.log(coords);
  const result = coords.filter((coord) => {
    return coord.x < minX || coord.x > maxX || coord.y < minY || coord.y > maxY;
  });
  return result;
}
