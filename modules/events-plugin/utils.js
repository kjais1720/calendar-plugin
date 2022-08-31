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
