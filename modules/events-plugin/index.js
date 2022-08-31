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
