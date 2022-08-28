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
      this.monthNumber++;
      this.renderMonthView();
    });

  document
    .getElementById(`previousMonth_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.monthNumber--;
      this.renderMonthView();
    });
}

function renderMonthView() {
  const currentDate = new Date();

  if (this.monthNumber !== 0) {
    currentDate.setMonth(new Date().getMonth() + this.monthNumber);
  }

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDateOfMonth = new Date(year, month, 1);
  const lastdateOfMonth = new Date(year, month + 1, 0);

  const monthDisplay = document.getElementById(
    `monthDisplay_${this.uniqueCalendarId}`
  );
  monthDisplay.innerText = `${currentDate.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;

  renderDateRows.call(this, firstDateOfMonth, lastdateOfMonth);
}
