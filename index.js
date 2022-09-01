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

  function getEventStartAndEndDate(eventDate, eventTime) {
    let eventStartDate = new Date(eventDate);
    let eventEndDate = new Date(eventDate);
    if (eventTime === "All Day") {
      eventEndDate.setDate(eventStartDate.getDate() + 1);
    } else {
      const eventTimeInHours = Number(time.slice(0, -2));
      eventStartDate.setHours(eventTimeInHours);
      eventEndDate.setHours(eventTimeInHours + 1);
    }
    return { eventStartDate, eventEndDate };
  }

  function closeModal() {
    eventTitleInput.classList.remove("error");
    newEventModal.style.display = "none";
    eventDetailsModal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = "";
  }
  
  function saveEvent() {
    if (eventTitleInput.value) {
      const eventId = `${selectedDate}_${selectedTime}_${eventTitleInput.value}`;
      eventsList.push({
        id: eventId,
        date: selectedDate,
        title: eventTitleInput.value,
        time: selectedTime,
      });
      eventTitleInput.classList.remove("error");
      localStorage.setItem("eventsList", JSON.stringify(eventsList));
      renderEvents();
      closeModal();
    } else {
      eventTitleInput.classList.add("error");
    }
  }
  
  function createNewEvent(date, time) {
    const modalHeading = document.getElementById("modalHeading");
    const { eventStartDate, eventEndDate } = getEventStartAndEndDate(date, time);
    const modalHeadingText = `Create an event from ${eventStartDate} to ${eventEndDate}`;
    modalHeading.innerText = modalHeadingText;
    newEventModal.style.display = "block";
    backDrop.style.display = "block";
    eventTitleInput.focus();
    selectedDate = date;
    selectedTime = time;
  }

  function initButtons() {
    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document.getElementById("cancelButton").addEventListener("click", closeModal);
  }
  
  function init() {
    const newCalendar = new Calendar("calendar");
    newCalendar.render();
    const eventConfigs = {
      eventsList,
      createNewEvent,
    };
    renderEvents = addEventsPluginToCalendar(newCalendar, eventConfigs);
    initButtons();
  }
  
  init();
  