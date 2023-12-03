const resultsArea = document.getElementById("weatherResults");

export function tempBackground(objectTemp) {
    let backgroundChange;
  
    if (objectTemp < 2) {
      backgroundChange =
        "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(0,60,237,1) 70%, rgba(66,165,255,1) 90%, rgba(55,255,254,1) 100%)";
    } else if (objectTemp >= 2 && objectTemp < 8) {
      backgroundChange =
        "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(21,189,255,1) 70%, rgba(14,255,218,1) 90%, rgba(146,255,154,1) 100%)";
    } else if (objectTemp >= 8 && objectTemp < 15) {
      backgroundChange =
        "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(7,133,106,1) 65%, rgba(255,248,98,1) 100%)";
    } else if (objectTemp >= 15 && objectTemp < 24) {
      backgroundChange =
        "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(154,146,18,1) 65%, rgba(255,185,20,1) 100%)";
    } else if (objectTemp >= 24 && objectTemp < 31) {
      backgroundChange =
        "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(255,117,21,1) 70%, rgba(255,210,14,1) 90%, rgba(255,250,8,1) 100%)";
    } else if (objectTemp >= 31 && objectTemp < 38) {
      backgroundChange =
        "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(255,69,21,1) 70%, rgba(255,133,14,1) 90%, rgba(255,220,0,1) 100%)";
    } else {
      backgroundChange =
        "linear-gradient(0deg, rgba(0,0,0,1) 27%, rgba(138,0,0,1) 70%, rgba(255,66,66,1) 90%, rgba(255,154,55,1) 100%)";
    }
  
    return (resultsArea.style.background = backgroundChange);
  }