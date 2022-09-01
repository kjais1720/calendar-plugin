function addEventsPluginToCalendar(calendarInstance, userProvidedConfigs) {
  const { uniqueCalendarId } = calendarInstance;
  let eventsList = userProvidedConfigs?.eventsList ?? [];
  const navButtons = document.querySelectorAll(
    `#${uniqueCalendarId} .navButton`
  );
  const viewToggleButtons = document.querySelectorAll(
    `#${uniqueCalendarId} .viewToggleButton`
  );

  function renderEvents() {
    const { activeViewId } = calendarInstance;
    if(userProvidedConfigs?.eventsList){
      eventsList = userProvidedConfigs.eventsList;
    }
    switch (activeViewId) {
      case `monthView_${uniqueCalendarId}`:
        insertEventsInCells(`monthView_${uniqueCalendarId}`, eventsList);
        break;
      case `weekView_${uniqueCalendarId}`:
        insertEventsInCells(`weekView_${uniqueCalendarId}`, eventsList);
        break;
      case `dayView_${uniqueCalendarId}`:
        insertEventsInCells(`dayView_${uniqueCalendarId}`, eventsList);
        break;
      default:
        break;
    }
  }

  function createNewEvent(date, time) {
    const { eventStartDate, eventEndDate } = getEventStartAndEndDate(
      date,
      time
    );
    const promptMessage = `Create an event from ${eventStartDate} to ${eventEndDate}`;

    const newEventTitle = prompt(promptMessage);
    if (newEventTitle.trim() !== "") {
      const eventId = `${date}_${time}_${newEventTitle}`;
      const eventAlreadyExists = eventsList.some(({ id }) => id === eventId);

      if (eventAlreadyExists) return;

      const newEvent = {
        id: eventId,
        date,
        title: newEventTitle,
        time
      };
      eventsList.push(newEvent);
      renderEvents();
    }
  }

  function openEventDetailsModal(event) {
    const { date, time, title } = event;
    const { eventStartDate, eventEndDate } = getEventStartAndEndDate(
      date,
      time
    );
    const modalDisplayText = `Title: ${title} 
                              \nDuration: ${eventStartDate} to ${eventEndDate} 
                              \n\nTo DELETE the event, press "OK", else press "Cancel"`;
    const shouldDeleteEvent = confirm(modalDisplayText);
    if(shouldDeleteEvent){
      if(userProvidedConfigs?.deleteEvent){
        userProvidedConfigs?.deleteEvent(event);
        return;
      }
      deleteEvent(event);
    }
  }

  function deleteEvent(event){
    const indexOfEventToDelete = eventsList.findIndex(
      ({ id }) => id === event.id
    );
    eventsList.splice(indexOfEventToDelete, 1);
    renderEvents();
  }

  function setEventHandlersToCells() {
    const allViewTableBodies = document.querySelectorAll(
      `#${uniqueCalendarId} table tbody`
    );
    allViewTableBodies.forEach((tableBody) => {
      //Delegating events
      tableBody.addEventListener("click", (e) => {
        const { target } = e;
        const isDateOrHourCell =
          target.getAttribute("data-date") &&
          (target.className.includes("dateCell") ||
            target.className.includes("hourCell"));

        if (isDateOrHourCell) {
          const cellDate = target.getAttribute("data-date");
          const cellTime = target.getAttribute("data-hour") ?? "All Day";

          if (userProvidedConfigs?.createNewEvent) {
            userProvidedConfigs?.createNewEvent(cellDate, cellTime);
            return;
          }

          createNewEvent(cellDate, cellTime);

        } else if (target.className === "event") {
          const targetEventId = target.getAttribute("data-eventId");
          const targetEvent = eventsList.find(({ id }) => id === targetEventId);
          if (userProvidedConfigs?.openEventDetailsModal) {
            userProvidedConfigs?.openEventDetailsModal(targetEvent);
            return;
          }

          openEventDetailsModal(targetEvent);
        
        }
      });
    });
  }

  navButtons.forEach((button) =>
    button.addEventListener("click", renderEvents)
  );
  viewToggleButtons.forEach((button) =>
    button.addEventListener("click", renderEvents)
  );
  
  renderEvents();
  setEventHandlersToCells();

  return renderEvents;
}