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
    for (let j = 0; j < 7; j++) {
      const dateOfCurrentCell = new Date(firstDateOfMonth);
      dateOfCurrentCell.setDate(dateOfCurrentCell.getDate() + (i - 1));
      const isCurrentDay =
        i === currentDayNumber && currentMonth === monthToDisplay;
      if (i === 1) {
        if (weekDayOfFirstDate === WEEK_DAYS[j].short) {
          dateRowOfWeek += `
            <td data-date="${getDateString(dateOfCurrentCell)}"
                class="dateCell ${isCurrentDay ? "currentDay" : ""}"
            >
              ${i}
            </td>`;
          i++;
        } else {
          dateRowOfWeek += `<td class="dateCell"></td>`; //padding before the first date of month
        }
      } else if (i > lastdateOfMonth.getDate()) {
        dateRowOfWeek += `<td class="dateCell"></td>`; //padding after the last date of month
      } else {
        dateRowOfWeek += `
            <td data-date="${getDateString(dateOfCurrentCell)}"
                class="dateCell ${isCurrentDay ? "currentDay" : ""}"
            >
              ${i}
            </td>`;
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
      this.nthMonthFromCurrentMonth++;
      this.renderMonthView();
    });

  document
    .getElementById(`previousMonth_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.nthMonthFromCurrentMonth--;
      this.renderMonthView();
    });
}

function renderMonthView() {
  const firstDateOfDisplayMonth = new Date();
  firstDateOfDisplayMonth.setDate(1); //To avoid the edge case at 31st of a month
  if (this.nthMonthFromCurrentMonth !== 0) {
    firstDateOfDisplayMonth.setMonth(firstDateOfDisplayMonth.getMonth() + this.nthMonthFromCurrentMonth);
  }
  const month = firstDateOfDisplayMonth.getMonth()
  const year = firstDateOfDisplayMonth.getFullYear();

  const lastDateOfDisplayMonth = new Date(year, month + 1, 0);

  const monthDisplay = document.getElementById(
    `monthDisplay_${this.uniqueCalendarId}`
  );
  monthDisplay.innerText = `${firstDateOfDisplayMonth.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;

  renderDateRows.call(this, firstDateOfDisplayMonth, lastDateOfDisplayMonth);
}
