function init() {
  const newCalendar = new Calendar("calendar");
  newCalendar.render();
  addEventsPluginToCalendar(newCalendar)
}

init();
