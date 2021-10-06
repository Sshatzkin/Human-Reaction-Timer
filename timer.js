titleText = document.getElementById("Title");

// 0 - Not Started
// 1 - Timer Started
// 2 - Press Now!
// 3 - Pressed Too Early
// 4 - Pressed after prompt -> display time
timerStatus = 0;
startTime = null;
elapsedMillis = null;
currentTimeout = null;

document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
    console.log('Space pressed'); //whatever you want to do when space is pressed

    // If timer is pressed from home
    if (timerStatus == 0){
      max_delay = 2000;
      min_delay = 500;
      
      timerStatus = 1;
      updateHeader();
      currentTimeout = setTimeout(() => {  
        timerStatus = 2;
        updateHeader();
        startTime = Date.now();
      }, Math.random() * (max_delay - min_delay) + min_delay);
    }
    // If timer is pressed during Wait...
    else if (timerStatus == 1){
      clearTimeout(currentTimeout);
      timerStatus = 3;
      updateHeader();
    }
    // Pressed while now is active
    else if (timerStatus == 2){
      elapsedMillis = Date.now() - startTime;
      console.log(elapsedMillis);
      timerStatus = 4;
      updateHeader(`${elapsedMillis}ms`);

    }
    else if (timerStatus == 3 || timerStatus == 4){
      timerStatus = 0;
      updateHeader();
    }
  }
})

function updateHeader(msg = "") {
  if (timerStatus == 0){
    titleText.innerText = "Press Space to Begin";
  }
  else if (timerStatus == 1){
    titleText.innerText = "Wait For it...";
  }
  else if (timerStatus == 2) {
    titleText.innerText = "Now!";
  }
  else if (timerStatus == 3){
    titleText.innerText = "Pressed too early! Press Space to return to home.";
  }
  else if (timerStatus == 4){
    titleText.innerText = `Your time was ${msg}. Press Space to return to home.`;
  }
}