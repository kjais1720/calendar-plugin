function addEventsPluginToCalendar(calendarInstance, eventConfigs) {
  const { uniqueCalendarId } = calendarInstance;
  const { createNewEvent, openEventDetailsModal } = eventConfigs;
  const navButtons = document.querySelectorAll(
    `#${uniqueCalendarId} .navButton`
  );
  const viewToggleButtons = document.querySelectorAll(
    `#${uniqueCalendarId} .viewToggleButton`
  );

  function renderEvents() {
    const { activeViewId } = calendarInstance;
    const { eventsList } = eventConfigs;
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
      if(userProvidedConfigs.deleteEvent){
        userProvidedConfigs.deleteEvent(event);
        return;
      }
      deleteEvent(event);
    }
  }


  function setEventHandlersToCells(eventsList) {
    const allViewTableBodies = document.querySelectorAll(
      `#${uniqueCalendarId} table tbody`
    );
    allViewTableBodies.forEach((tableBody) => {
      //Delegating events
      tableBody.addEventListener("click", (e) => {
        const { target } = e;
        if (
          target.className.includes("dateCell") ||
          target.className.includes("hourCell")
        ) {
          const cellDate = target.getAttribute("data-date");
          const cellTime = target.getAttribute("data-hour") ?? "All Day";
          
          if(createNewEvent){
            createNewEvent(cellDate, cellTime);
            return;
          }

          const newEventTitle = prompt(`Enter the title of event`);
          if (newEventTitle.trim() !== "") {
            const eventId = `${cellDate}_${cellTime}_${newEventTitle}`
            const newEvent = {
              id:eventId,
              date: cellDate,
              title: newEventTitle,
              time: cellTime,
            };
            eventsList.push(newEvent);
            renderEvents();
          }
        } else if (target.className === "event") {
          const targetEventId = target.getAttribute("data-eventId"); 
          const targetEvent = eventsList.find(({id})=> id === targetEventId);
          if(openEventDetailsModal){
            openEventDetailsModal(targetEvent);
            return;
          }
          alert(target.getAttribute("data-eventTitle"));
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
  setEventHandlersToCells(eventsList);

  return renderEvents;
}
