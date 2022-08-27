function renderDateRows(firstDateOfMonth, lastdateOfMonth) {
  const monthTableBody = document.getElementById(
    `monthTableBody_${this.uniqueCalendarId}`
  );
  let i = 1;
  let dateRowsOfAMonth = "";
  const currentDate = new Date();
  const currentDayNumber = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const monthToDisplay = firstDateOfMonth.getMonth();
  const weekDayOfFirstDate = firstDateOfMonth.toString().split(" ")[0];

  while (i <= lastdateOfMonth.getDate()) {
    let dateRowOfWeek = "<tr class='dateRow'>";
    const rowNumber = Math.floor(i / 7);
    for (let j = 0; j < 7; j++) {
      const isCurrentDay =
        i === currentDayNumber && currentMonth === monthToDisplay;
      dateRowOfWeek += `<td id=${
        isCurrentDay
          ? "currentDay"
          : `${this.uniqueCalendarId}_dateCell_${rowNumber}_${j + 1}`
      } class="dateCell">`;
      if (i === 1) {
        if (weekDayOfFirstDate === WEEK_DAYS[j].short) {
          dateRowOfWeek += ` ${i} </td>`;
          i++;
        } else {
          dateRowOfWeek += `</td>`; //padding
        }
      } else if (i > lastdateOfMonth.getDate()) {
        dateRowOfWeek += `</td>`; //padding
      } else {
        dateRowOfWeek += ` ${i} </td>`;
        i++;
      }
    }
    dateRowOfWeek += "</tr>";
    dateRowsOfAMonth += dateRowOfWeek;
  }
  monthTableBody.innerHTML = dateRowsOfAMonth;
}

function initMonthNavButtons() {
  document
    .getElementById(`nextMonth_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.monthNumber++;
      this.renderMonthTable();
    });

  document
    .getElementById(`previousMonth_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.monthNumber--;
      this.renderMonthTable();
    });
}