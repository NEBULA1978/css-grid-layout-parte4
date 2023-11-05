document.addEventListener("DOMContentLoaded", function () {
  const dragObject = document.querySelector("#draggable-object");
  const dropContainer = document.querySelector("#drop-point");

  let deviceType = "";
  let initialX = 0,
    initialY = 0;
  let moveElement = false;

  function createNewDraggableObject() {
    const newDraggableObject = document.createElement("div");
    newDraggableObject.classList.add("draggable-object");
    newDraggableObject.style.backgroundColor = "#006eff";
    newDraggableObject.style.width = "9em";
    newDraggableObject.style.height = "9em";
    newDraggableObject.style.borderRadius = "0.5em";
    newDraggableObject.style.cursor = "move";
    newDraggableObject.draggable = true;

    dropContainer.appendChild(newDraggableObject);
    adjustDropPointSize();
    addDragListeners(newDraggableObject);
  }

  function adjustDropPointSize() {
    const objectsInDropPoint = document.querySelectorAll("#drop-point .draggable-object");
    const countObjects = objectsInDropPoint.length;
    const dropPointWidth = 10 + countObjects * 11; // Change size according to your design
    const dropPointHeight = 10 + countObjects * 11; // Change size according to your design

    dropContainer.style.width = `${dropPointWidth}em`;
    dropContainer.style.height = `${dropPointHeight}em`;
  }

  function addDragListeners(draggableObject) {
    draggableObject.addEventListener("dragstart", dragStart);
    draggableObject.addEventListener("touchstart", dragStart);
    draggableObject.addEventListener("touchend", drop);
    draggableObject.addEventListener("touchmove", touchMove);
  }

  // Resto del código de detección de dispositivo, dragStart, dragOver, touchMove, etc.

  const drop = (e) => {
    e.preventDefault();

    if (isTouchDevice()) {
      moveElement = false;
      const currentDropBound = dropContainer.getBoundingClientRect();
      if (
        initialX >= currentDropBound.left &&
        initialX <= currentDropBound.right &&
        initialY >= currentDropBound.top &&
        initialY <= currentDropBound.bottom
      ) {
        dragObject.classList.add("hide");
        dropContainer.insertAdjacentHTML(
          "afterbegin",
          '<div class="draggable-object"></div>'
        );
        createNewDraggableObject();
      }
    } else {
      if (e.target.classList.contains("drop-point")) {
        const newDraggableObject = e.target.querySelector(".draggable-object");
        if (newDraggableObject) {
          newDraggableObject.classList.remove("hide");
          dropContainer.appendChild(newDraggableObject);
          adjustDropPointSize();
        }
        dragObject.setAttribute("draggable", "false");
        dragObject.classList.add("hide");
        createNewDraggableObject();
      }
    }
  };

  window.onload = async () => {
    createNewDraggableObject();
    addDragListeners(dragObject);
    dropContainer.addEventListener("dragover", dragOver);
    dropContainer.addEventListener("drop", drop);
  };
});
