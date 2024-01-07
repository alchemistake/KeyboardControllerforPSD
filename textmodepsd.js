function highlightButtons() {
  if (app.curRoom.alchemistake_switching) {
    $("button[name='chooseSwitch']").css("border", "2px solid red");
    $("button[name='chooseMove']").css("border", "");
  } else {
    $("button[name='chooseSwitch']").css("border", "");
    $("button[name='chooseMove']").css("border", "2px solid red");
  }
};

function clickIfExists(selector) {
  const target = $(selector);
  if (target.length > 0) {
    target.click();
    return true;
  }
  return false;
}

// Leftover code from when I was trying to inject into the game.
// app.alchemistake_focusRoom = app.focusRoom;
// app.focusRoom = function (id, focusTextbox) {
//   var output = app.alchemistake_focusRoom(id, focusTextbox);

//   if (!app.curRoom.alchemistake_injected) {
//     app.curRoom.alchemistake_injected = true;
//     app.curRoom.alchemistake_switching = false;

//     // app.curRoom.alchemistake_updateControlsForPlayer = app.curRoom.updateControlsForPlayer
//     // app.curRoom.updateControlsForPlayer = function () {
//     //   highlightButtons();
//     //   return app.curRoom.alchemistake_updateControlsForPlayer();
//     // }
//     // Add highlighting based on events.
//   }

//   highlightButtons();

//   return output;
// };

function controller(event) {
  console.log(event.key);
  const selector = app.curRoom.alchemistake_switching ? "chooseSwitch" : "chooseMove";

  switch (event.key) {
    case "t":
      clickIfExists("button[name='openTimer']");
      clickIfExists("button[name='timerOn']");
      clickIfExists("button[name='timerOff']");
      break;
    case "x":
      app.curRoom.alchemistake_switching = !app.curRoom.alchemistake_switching;
      break;
    case "z":
      clickIfExists("input[name='terastallize']");
      break;
    case "c":
      if (clickIfExists("button[name='clearChoice']")) break
      if (clickIfExists("button[name='undoChoice']")) break
      break;
    case "1":
      if (clickIfExists("button[name='chooseMoveTarget'][value='2']")) break
    case "2":
      if (clickIfExists("button[name='chooseMoveTarget'][value='1']")) break
    case "3":
      if (clickIfExists("button[name='chooseMoveTarget'][value='-1']")) break
      if (clickIfExists("button[name='chooseMoveTarget'][value='-2']")) break
    case "4":
    case "5":
    case "6":
      const key = app.curRoom.alchemistake_switching ? event.key - 1 : event.key;
      $(`button[name='${selector}'][value='${key}']`).click();
      $(`button[name='chooseTeamPreview'][value='${event.key - 1}']`).click();
      break;
    case "a":
      clickIfExists("button[name='closeAndMainMenu']");
      break;
    case "d":
      clickIfExists("button[name='send']");
      break;
  }

  highlightButtons();
}

function toggleMod(event) {
  if ($("#alchemistake").length == 0) {
    $("<textarea id='alchemistake' style='position: absolute;bottom: 10000px'></textarea>").appendTo("body");
  }

  let active = $(document.activeElement);
  console.log(active.context);
  active.blur();

  if (active.context.id == "alchemistake") {
    $(".textbox").focus();
  } else {
    $("#alchemistake").focus();
  }
}

$("body").on("keydown", function (event) {
  if (event.key == "F1") toggleMod(event)
  else {
    let active = $(document.activeElement);
    if (active.context.id == "alchemistake") {
      controller(event);
    }
  }
});