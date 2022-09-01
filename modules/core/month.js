function renderDateRowsOfAMonth(firstDateOfMonth, lastdateOfMonth) {
  const monthTableBody = document.getElementById(
    `monthTableBody_${this.uniqueCalendarId}`
  );
  let i = 1;
  let allDateRowsOfAMonth = "";
  const currentDate = new Date();
  const currentDayNumber = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthToDisplay = firstDateOfMonth.getMonth();
  const weekDayOfFirstDate = firstDateOfMonth.toString().split(" ")[0];

  while (i <= lastdateOfMonth.getDate()) {
    let dateRowOfWeek = "<tr class='dateRow'>";
    for (let j = 0; j < 7; j++) {
      const dateOfCurrentCell = new Date();
      dateOfCurrentCell.setDate(firstDateOfMonth.getDate() + (i - 1));
      const isCurrentDay =
        i === currentDayNumber &&
        currentMonth === monthToDisplay &&
        dateOfCurrentCell.getFullYear() === currentYear;
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
          dateRowOfWeek += `<td class="dateCell"></td>`; //Empty cells in a week before the first date of month
        }
      } else if (i > lastdateOfMonth.getDate()) {
        dateRowOfWeek += `<td class="dateCell"></td>`; //Empty cells in a week after the last date of month
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
    allDateRowsOfAMonth += dateRowOfWeek;
  }
  monthTableBody.innerHTML = allDateRowsOfAMonth;
}

function initMonthNavButtons() {
  document
    .getElementById(`nextMonth_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.diffBetCurrentAndDisplayMonth++;
      this.renderMonthView();
    });

  document
    .getElementById(`previousMonth_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.diffBetCurrentAndDisplayMonth--;
      this.renderMonthView();
    });
}

function renderMonthView() {
  const firstDateOfDisplayMonth = new Date();
  firstDateOfDisplayMonth.setDate(1); //To avoid the edge case at 31st of a month

  if (this.diffBetCurrentAndDisplayMonth !== 0) {
    firstDateOfDisplayMonth.setMonth(
      firstDateOfDisplayMonth.getMonth() + this.diffBetCurrentAndDisplayMonth
    );
  }
  const displayMonth = firstDateOfDisplayMonth.getMonth();
  const displayYear = firstDateOfDisplayMonth.getFullYear();

  const lastDateOfDisplayMonth = new Date(displayYear, displayMonth + 1, 0);

  const monthHeading = document.getElementById(
    `monthHeading_${this.uniqueCalendarId}`
  );
  monthHeading.innerText = `${firstDateOfDisplayMonth.toLocaleDateString(
    "en-us",
    {
      month: "long",
    }
  )} ${displayYear}`;

  renderDateRowsOfAMonth.call(
    this,
    firstDateOfDisplayMonth,
    lastDateOfDisplayMonth
  );
}
