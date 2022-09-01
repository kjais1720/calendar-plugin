function Calendar(calendarContainerId) {
  this.activeViewId = `monthView_${calendarContainerId}`;
  this.uniqueCalendarId = calendarContainerId;

  this.diffBetCurrentAndDisplayMonth = 0; //The difference between the current month and the month to be displayed
  this.diffBetCurrentAndDisplayWeek = 0;
  this.diffBetCurrentAndDisplayDate = 0;

  // To bind the new instance of calendar to the functions
  this.render = render.bind(this);
  this.renderMonthView = renderMonthView.bind(this);
  this.renderWeekView = renderWeekView.bind(this);
  this.renderDayView = renderDayView.bind(this);

  this.viewInitialisers = {
    [`monthView_${calendarContainerId}`]: this.renderMonthView,
    [`weekView_${calendarContainerId}`]: this.renderWeekView,
    [`dayView_${calendarContainerId}`]: this.renderDayView,
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
            <div id="monthHeading_${uniqueCalendarId}"></div>
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
            <div id="weekHeading_${uniqueCalendarId}"></div>
            <div class="navButtonsContainer">
              <button id="previousWeek_${uniqueCalendarId}" class="cal-button navButton">Back</button>
              <button id="nextWeek_${uniqueCalendarId}" class="cal-button navButton">Next</button>
            </div>
          </div>
          <table class="viewTable">
            <thead>
              <tr id="weekTableHeadingsRow_${uniqueCalendarId}" class="tableHeadings">
    
              </tr>
            </thead>
            <tbody id="weekTableBody_${uniqueCalendarId}" class="weekTableBody">
              
            </tbody>
          </table>
    
        </div>
        <div id="dayView_${uniqueCalendarId}" class="view">
          <div class="calendarHeader">
            <div id="dayHeading_${uniqueCalendarId}"> </div>
            <div class="navButtonsContainer">
              <button id="previousDay_${uniqueCalendarId}" class="cal-button navButton">Back</button>
              <button id="nextDay_${uniqueCalendarId}" class="cal-button navButton">Next</button>
            </div>
          </div>
          <table class="viewTable">
            <thead>
              <tr class="tableHeadings">
                <th id="dayTableHeading_${uniqueCalendarId}"></th>
              </tr>
            </thead>
            <tbody id="dayTableBody_${uniqueCalendarId}" class="dayTableBody">
              
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
    initDayNavButtons.call(this);
  }

  function toggleView(e) {
    const isActiveButtonClicked = e.currentTarget.className.includes("active");
    if (isActiveButtonClicked) {
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
