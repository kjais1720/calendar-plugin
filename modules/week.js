function getWeekDates(anyDateOfTheWeek) {
  const weekDates = [];
  let referenceDate = new Date(anyDateOfTheWeek);
  for (let i = 0; i < 7; i++) {
    const day = referenceDate.toString().split(" ")[0];
    const dayNumber = WEEK_DAYS.findIndex((weekDay) => weekDay.short === day);
    const temp = new Date(referenceDate);
    weekDates[dayNumber] = temp;
    referenceDate.setDate(referenceDate.getDate() - 1);
    if (day === "Sun") {
      break;
    }
  }
  if (weekDates.length < 7) {
    referenceDate = new Date(anyDateOfTheWeek);
    for (let i = 0; i < 7; i++) {
      referenceDate.setDate(referenceDate.getDate() + 1);
      const day = referenceDate.toString().split(" ")[0];
      const dayNumber = WEEK_DAYS.findIndex((weekDay) => weekDay.short === day);
      const temp = new Date(referenceDate);
      weekDates[dayNumber] = temp;
      if (day === "Sat") {
        break;
      }
    }
  }
  return weekDates;
}

function renderHourRowsOfAWeek(weekStartDate) {
  const weekTableBody = document.getElementById(
    `weekTableBody_${this.uniqueCalendarId}`
  );
  let allRows = '';
  HOURS_IN_A_DAY.forEach((hour) => {
    let singleRow = `<tr class='hourRow'>`;
    singleRow += `<td class="hourCell">${hour}</td>`;
    for (let i = 0; i < 7; i++) {
      const dateOfCurrentCell = new Date(weekStartDate);
      dateOfCurrentCell.setDate(dateOfCurrentCell.getDate() + i);
      singleRow += `<td data-hour=${hour} data-date=${getDateString(
        dateOfCurrentCell
      )} class="hourCell"></td>`;
    }
    singleRow += "</tr>"
    allRows += singleRow;
  });
  weekTableBody.innerHTML = allRows
}

function initWeekNavButtons() {
  document
    .getElementById(`nextWeek_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.nthWeekFromCurrentWeek++;
      this.renderWeekView();
    });

  document
    .getElementById(`previousWeek_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.nthWeekFromCurrentWeek--;
      this.renderWeekView();
    });
}

function renderWeekView() {
  let weekDatesRow = document.getElementById(
    `weekDatesRow_${this.uniqueCalendarId}`
  );
  const currentDate = new Date();

  if (this.nthWeekFromCurrentWeek !== 0) {
    currentDate.setDate(new Date().getDate() + this.nthWeekFromCurrentWeek * 7);
  }

  const weekDates = getWeekDates(currentDate);

  const year = currentDate.getFullYear();
  const weekStartDate = weekDates[0].getDate();
  const weekStartMonth = weekDates[0].toString().split(" ")[1];
  const weekEndMonth = weekDates[6].toString().split(" ")[1];
  const weekEndDate = weekDates[6].getDate();
  const weekDisplay = document.getElementById(
    `weekDisplay_${this.uniqueCalendarId}`
  );
  weekDisplay.innerText =
    weekStartMonth === weekEndMonth
      ? `${weekStartMonth} ${weekStartDate}-${weekEndDate}, ${year}`
      : `${weekStartMonth} ${weekStartDate} - ${weekEndMonth} ${weekEndDate}, ${year}`;

  weekDatesRow.innerHTML = "<th></th>"; //Empty cell before the Week dates

  weekDates.forEach((date) => {
    const dateCell = document.createElement("th");
    const day = date.toString().split(" ")[0];
    const dateString = `${day} ${date.getMonth() + 1}/${date.getDate()}`;
    dateCell.innerText = dateString;
    weekDatesRow.appendChild(dateCell);
  });
  renderHourRowsOfAWeek.call(this, weekDates[0]);
}
