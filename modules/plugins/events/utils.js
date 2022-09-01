function truncateText(text, maxLength) {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
}

function createEventDiv(eventForTheDay, shouldTruncateText) {
  const eventDiv = document.createElement("div");
  eventDiv.className = "event";
  eventDiv.setAttribute("data-eventTitle",eventForTheDay.title);
  eventDiv.setAttribute("data-eventId",eventForTheDay.id);
  eventDiv.innerText = shouldTruncateText
    ? truncateText(eventForTheDay.title, 20)
    : eventForTheDay.title;
  return eventDiv;
}

function clearEventsFromCells(uniqueTableId){
  const allCells = document.querySelectorAll(`#${uniqueTableId} td`);
  allCells.forEach(cell =>{
    const cellChildren = [...cell.children];
    cellChildren.forEach(node=>{
      if(node.className.includes("event")){
        cell.removeChild(node);
      }
    })
  });
}

function insertEventsInCells(uniqueTableId, eventsList) {
  clearEventsFromCells(uniqueTableId);
  eventsList.forEach((event) => {
    let cellSelector;
    const eventTime = event.time;
    const dateString = getDateString(event.date);
    const isMonthTable = uniqueTableId.includes("month");
    const isDayTable = uniqueTableId.includes("day");

    if (isMonthTable) {
      cellSelector = `#${uniqueTableId} [data-date="${dateString}"]`;
    } else {
      cellSelector = `#${uniqueTableId} [data-date="${dateString}"][data-hour="${eventTime}"]`;
    }
    const cell = document.querySelector(cellSelector);
    if (cell) {
      const truncateEventTitle = !isDayTable
      const eventDiv = createEventDiv(event, truncateEventTitle);
      cell.appendChild(eventDiv);
    }
  });
}

function getEventStartAndEndDate(eventDate, eventTime){
  let eventStartDate = new Date(eventDate);
    let eventEndDate = new Date(eventDate);
    if (eventTime === "All Day") {
      eventEndDate.setDate(eventStartDate.getDate() + 1);
    } else {
      let eventTimeInHours = Number(eventTime.slice(0, -2)); //Removing the postfix( AM/PM )
      eventStartDate.setHours(eventTimeInHours);
      eventEndDate.setHours(eventTimeInHours + 1);
    }
  return {eventStartDate, eventEndDate};
}