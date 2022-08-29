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
