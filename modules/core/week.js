function getWeekDates(anyDateOfTheWeek) {
  const weekDates = [];
  let referenceDate = new Date(anyDateOfTheWeek);
  for (let i = 0; i < 7; i++) {
    // Get the days before the reference date
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
      // Get the days after the reference date
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
  let allRows = "";
  HOURS_OF_A_DAY.forEach((hour) => {
    let singleRow = `<tr class='hourRow'>`;
    singleRow += `<td class="hourCell">${hour}</td>`;
    for (let i = 0; i < 7; i++) {
      const dateOfCurrentCell = new Date(weekStartDate);
      dateOfCurrentCell.setDate(dateOfCurrentCell.getDate() + i);
      singleRow += `<td data-hour="${hour}" data-date=${getDateString(
        dateOfCurrentCell
      )} class="hourCell"></td>`;
    }
    singleRow += "</tr>";
    allRows += singleRow;
  });
  weekTableBody.innerHTML = allRows;
}

function initWeekNavButtons() {
  document
    .getElementById(`nextWeek_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.diffBetCurrentAndDisplayWeek++;
      this.renderWeekView();
    });

  document
    .getElementById(`previousWeek_${this.uniqueCalendarId}`)
    .addEventListener("click", () => {
      this.diffBetCurrentAndDisplayWeek--;
      this.renderWeekView();
    });
}

function renderWeekView() {
  const weekTableHeadingsRow = document.getElementById(
    `weekTableHeadingsRow_${this.uniqueCalendarId}`
  );
  const weekHeading = document.getElementById(
    `weekHeading_${this.uniqueCalendarId}`
  );
  const aDateOfTheWeek = new Date();

  if (this.diffBetCurrentAndDisplayWeek !== 0) {
    aDateOfTheWeek.setDate(
      new Date().getDate() + this.diffBetCurrentAndDisplayWeek * 7
    );
  }

  const weekDates = getWeekDates(aDateOfTheWeek);

  const year = aDateOfTheWeek.getFullYear();
  const weekStartDate = weekDates[0].getDate();
  const weekStartMonth = weekDates[0].toString().split(" ")[1];
  const weekEndMonth = weekDates[6].toString().split(" ")[1];
  const weekEndDate = weekDates[6].getDate();

  weekHeading.innerText =
    weekStartMonth === weekEndMonth
      ? `${weekStartMonth} ${weekStartDate}-${weekEndDate}, ${year}`
      : `${weekStartMonth} ${weekStartDate} - ${weekEndMonth} ${weekEndDate}, ${year}`;

  let weekTableHeadings = "<th></th>"; //Empty cell before the Week dates

  weekDates.forEach((date) => {
    const day = date.toString().split(" ")[0];
    const dateString = `${day} ${date.getMonth() + 1}/${date.getDate()}`;
    weekTableHeadings += `<th>${dateString}</th>`
  });
  weekTableHeadingsRow.innerHTML = weekTableHeadings;
  renderHourRowsOfAWeek.call(this, weekDates[0]);
}
