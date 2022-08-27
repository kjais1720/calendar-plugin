const WEEK_DAYS = [
  {
    short: "Sun",
    long: "Sunday",
  },
  {
    short: "Mon",
    long: "Monday",
  },
  {
    short: "Tue",
    long: "Tuesday",
  },
  {
    short: "Wed",
    long: "Wednesday",
  },
  {
    short: "Thu",
    long: "Thursrday",
  },
  {
    short: "Fri",
    long: "Friday",
  },
  {
    short: "Sat",
    long: "Saturday",
  },
];
/**
 * 
 * @param {string} calendarContainerId Id of the target container
 * @param {object} userProvidedConfigs {events:Array}
 * @returns A new calendar instance
 */
function Calendar(calendarContainerId, userProvidedConfigs){
  this.clicked = null;
  this.currentTableInitializer;
  this.activeViewId = `monthView_${calendarContainerId}`;
  this.calendarConfigs = userProvidedConfigs;
  this.uniqueCalendarId = calendarContainerId;
  
  this.monthNumber = 0;
  this.weekNumber = 0;
  
  this.render = function(){
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
      </div>
      `;
      
      // const viewToggleButtons = document.querySelectorAll(".viewToggleButton");
      
      // function toggleView(e) {
      //   if (e.currentTarget.className.includes("active")) {
      //     return;
      //   }
      //   const currentActiveView = document.getElementById(activeViewId);
      //   const currentActiveViewButton = document.querySelector(
      //     ".viewToggleButton.active"
      //   );
      //   const targetViewId = e.target.getAttribute("data-target-id");
      //   const targetView = document.getElementById(targetViewId);
      //   currentActiveView.classList.remove("active");
      //   targetView.classList.add("active");
      //   currentActiveViewButton.classList.remove("active");
      //   e.target.classList.add("active");
      //   activeViewId = targetViewId;
      // }
    
      // viewToggleButtons.forEach((button) =>
      //   button.addEventListener("click", toggleView)
      // );

      // this.generateMonthTable();
      // this.initMonthNavButtons();
    }

  this.render = this.render.bind(this);
}