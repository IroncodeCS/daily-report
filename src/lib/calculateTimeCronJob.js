const calculateTimeCronjob = (min, hour, firstMin, firstHour) => {
  const time = {
    min : parseInt(min) + parseInt(firstMin),
    hour: parseInt(hour) + parseInt(firstHour)
  }
  return time

}

export default calculateTimeCronjob