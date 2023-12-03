
  export function displayImage(imageData, imageParentElement) {
    const imageElement = document.createElement("img");
    const imageLink = imageData;
    imageElement.src = imageLink;
    imageParentElement.appendChild(imageElement);
  }


  export function displayingData(elementType, data, id, className, parentElement) {
    const element = document.createElement(elementType);
    element.textContent = data;

    if (id !== "") {
        element.id = id;
    }

    if (className !== "") {
        element.classList.add(className);
    }

    parentElement.appendChild(element);
}