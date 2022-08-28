function Calendar(calendarContainerId, userProvidedConfigs) {
  this.activeViewId = `monthView_${calendarContainerId}`;
  this.calendarConfigs = userProvidedConfigs;
  this.uniqueCalendarId = calendarContainerId;

  this.monthNumber = 0;
  this.nthWeekFromCurrentWeek = 0;

  this.render = render.bind(this);
  this.renderMonthView = renderMonthView.bind(this);
  this.renderWeekView = renderWeekView.bind(this);

  this.viewInitialisers = {
    [`monthView_${calendarContainerId}`]: this.renderMonthView,
    [`weekView_${calendarContainerId}`]: this.renderWeekView,
  };

  function render() {
    const uniqueCalendarId = this.uniqueCalendarId;
    const calendarNode = document.getElementById(calendarContainerId);
    calendarNode.innerHTML = `
      <div id="calendar_${uniqueCalendarId}" class="calendar">
        <div class="viewToggleButtonsContainer">
          <button id="viewToggleButton_${uniqueCalendarId}" data-target-id="monthView_${uniqueCalendarId}" class="cal-button viewToggleButton active">Month</button>
          <button id="viewToggleButton_${uniqueCalendarId}" data-target-id="weekView_${uniqueCalendarId}" class="cal-button viewToggleButton">Week</button>
          <button id="viewToggleButton_${uniqueCalendarId}" data-target-id="dayView_${uniqueCalendarId}" class="cal-button viewToggleButton">Day</button>
        </div>
        <hr>
    
        <div id="monthView_${uniqueCalendarId}" class="view active">
          <div class="calendarHeader">
            <div id="monthDisplay_${uniqueCalendarId}"></div>
            <div class="navButtonsContainer">
              <button id="previousMonth_${uniqueCalendarId}" class="cal-button navButton">Back</button>
              <button id="nextMonth_${uniqueCalendarId}" class="cal-button navButton">Next</button>
            </div>
          </div>
          <table class="viewTable">
            <thead id="monthTableHeader_${uniqueCalendarId}">
              <tr class="shortWeekdaysRow tableHeadings">
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
              <tr class="longWeekdaysRow tableHeadings">
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursrday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody id="monthTableBody_${uniqueCalendarId}">
    
            </tbody>
          </table>
        </div>
        <div id="weekView_${uniqueCalendarId}" class="view">
          <div class="calendarHeader">
            <div id="weekDisplay_${uniqueCalendarId}"></div>
            <div class="navButtonsContainer">
              <button id="previousWeek_${uniqueCalendarId}" class="cal-button navButton">Back</button>
              <button id="nextWeek_${uniqueCalendarId}" class="cal-button navButton">Next</button>
            </div>
          </div>
          <table class="viewTable">
            <thead>
              <tr id="weekDatesRow_${uniqueCalendarId}" class="tableHeadings">
    
              </tr>
            </thead>
            <tbody id="weekTableBody_${uniqueCalendarId}" class="weekTableBody">
              
            </tbody>
          </table>
    
        </div>
      </div>
      `;

    const viewToggleButtons = document.querySelectorAll(".viewToggleButton");

    viewToggleButtons.forEach((button) =>
      button.addEventListener("click", toggleView.bind(this))
    );

    this.renderMonthView();
    initMonthNavButtons.call(this);
    initWeekNavButtons.call(this);
  }

  function toggleView(e) {
    if (e.currentTarget.className.includes("active")) {
      return;
    }
    const currentActiveView = document.getElementById(this.activeViewId);
    const currentActiveViewButton = document.querySelector(
      ".viewToggleButton.active"
    );

    const targetViewId = e.target.getAttribute("data-target-id");
    const targetView = document.getElementById(targetViewId);

    currentActiveView.classList.remove("active");
    targetView.classList.add("active");

    currentActiveViewButton.classList.remove("active");
    e.target.classList.add("active");

    this.activeViewId = targetViewId;
    this.viewInitialisers[this.activeViewId]();
  }
}
