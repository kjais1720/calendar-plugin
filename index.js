let renderEvents;
let selectedEventId;
let selectedDate;
let selectedTime;
const newEventModal = document.getElementById("newEventModal");
const eventDetailsModal = document.getElementById("eventDetailsModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
let eventsList = localStorage.getItem("eventsList")
  ? JSON.parse(localStorage.getItem("eventsList"))
  : [];

function init() {
  const newCalendar = new Calendar("calendar");
  newCalendar.render();
  renderEvents = addEventsPluginToCalendar(newCalendar)
}

init();
