import CronJobManager from 'cron-job-manager'
import standuply from '../bot/standuply'

const cronJobManager = new CronJobManager()
const options = {
  start: false,
  timeZone: 'Asia/Bangkok'
}

const cronJob = (cronJobKey, min, hour, dayOfWeek) => {

  const typeCronJob = /(close|first|remind)$/.exec(cronJobKey)

  const isExits = cronJobManager.exists(cronJobKey)

  if(!isExits) {

    cronJobManager.add(
      cronJobKey,
      `0 ${min} ${hour} * * ${dayOfWeek}`,
      () => { typeCronJob[0] === 'close' ? console.log('report') : standuply() },
      options)
    cronJobManager.start(cronJobKey)

  } else {

    cronJobManager.update(
      cronJobKey,
      `0 ${min} ${hour} * * ${dayOfWeek}`,
      () => { typeCronJob[0] === 'close' ? console.log('report') : standuply() })

  }
  console.log(cronJobManager.listCrons())
}

export default cronJob