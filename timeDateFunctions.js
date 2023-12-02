export function landingGreeting() {
    const d = new Date();
    let hour = d.getHours();
  
    if (hour >= 0 && hour < 12) {
      return "good morning!";
    } else if (hour >= 12 && hour < 17) {
      return "good afternoon!";
    } else {
      return "good evening!";
    }
  }

  export function timeAndDate() {
    let today = new Date();
    let todayArray = today.toString().split(" ").slice(0, 5);
    let editedTime = todayArray[4].substring(0, todayArray[4].length - 3);
  
    const timeObject = {
      currentTime: editedTime,
      currentDate: `${todayArray[0]} ${todayArray[2]} ${todayArray[1]}`,
      currentYear: todayArray[3],
    };
    return timeObject;
  }