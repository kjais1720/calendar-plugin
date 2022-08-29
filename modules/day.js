function renderHourRowsOfADay(dateToDisplay) {
  const dayTableBody = document.getElementById(
    `dayTableBody_${this.uniqueCalendarId}`
  );
  let allRows = ''
  HOURS_IN_A_DAY.forEach((hour) => {
    let singleRow = `<tr class='hourRow'>`;
    singleRow += `<td class="hourCell">${hour}</td>`;
    singleRow += `<td style="flex:4" data-hour=${hour} data-date=${getDateString(
      dateToDisplay
    )} class="hourCell"></td>`;
    allRows += singleRow;
  });
  dayTableBody.innerHTML = allRows;
}

function initDayNavButtons() {
  document
    .getElementById(`nextDay_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.nthDateFromCurrentDate++;
      this.renderDayView();
    });

  document
    .getElementById(`previousDay_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.nthDateFromCurrentDate--;
      this.renderDayView();
    });
}

function renderDayView() {
  const dayDisplay = document.getElementById(
    `dayDisplay_${this.uniqueCalendarId}`
  );
  const dayHeading = document.getElementById(`dayHeading_${this.uniqueCalendarId}`);
  const dateToDisplay = new Date();

  if (this.nthDayFromCurrentDay !== 0) {
    dateToDisplay.setDate(dateToDisplay.getDate() + this.nthDateFromCurrentDate);
  }
  const dateComponents = dateToDisplay.toString().split(" ");
  const yearToDisplay = dateToDisplay.getFullYear();
  const monthStringToDisplay = dateComponents[1];
  let weekDayOfDateToDisplay = dateComponents[0];
  weekDayOfDateToDisplay = WEEK_DAYS.find((day)=>day.short === weekDayOfDateToDisplay)

  dayDisplay.innerText = `${monthStringToDisplay} ${dateToDisplay.getDate()}, ${yearToDisplay}`;
  dayHeading.innerHTML = `<th></th><th>${weekDayOfDateToDisplay.long}</th>`; //Empty cell before the Week dates

  renderHourRowsOfADay.call(this, dateToDisplay);
}
