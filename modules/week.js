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
