function getDateString(date){
  const formattedDate = new Date(date)
  const month = formattedDate.getMonth()+1;
  const day = formattedDate.getDate();
  const year = formattedDate.getFullYear()
  return `${month}/${day}/${year}`
}