export function displayDataId(elementType, data, id, parentElement) {
    const element = document.createElement(elementType);
    element.textContent = data;
    element.id = id;
    parentElement.appendChild(element);
  }
  
  export function displayDataClassId(elementType, data, id, className, parentElement) {
    const element = document.createElement(elementType);
    element.textContent = data;
    element.id = id;
    element.classList.add(className);
    parentElement.appendChild(element);
  }
  
  export function displayData(elementType, data, parentElement) {
    const element = document.createElement(elementType);
    element.textContent = data;
    parentElement.appendChild(element);
  }
  
  export function displayImage(imageData, imageParentElement) {
    const imageElement = document.createElement("img");
    const imageLink = imageData;
    imageElement.src = imageLink;
    imageParentElement.appendChild(imageElement);
  }