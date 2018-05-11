import CronJobManager from 'cron-job-manager'
import standuply from '../bot/standuply'
import updateCronJobDbClose from './updateCronJobDbClose'
import updateCronJobDbFirst from './updateCronJobDbFirst'
import updateCronJobDbRemind from './updateCronJobDbRemind'

const cronJobManager = new CronJobManager()
const options = {
  start: false,
  completion: () => ('Stoped!!'),
  timeZone: 'Asia/Bangkok'
}

const cronJob = (teamId, cronJobKey, min, hour, dayOfWeek) => {

  const schedule = `0 ${min} ${hour} * * ${dayOfWeek}`
  // const schedule = `0 */1 * * * ${dayOfWeek}`
  const typeCronJob = /(close|first|remind)$/.exec(cronJobKey)

  const isExits = cronJobManager.exists(cronJobKey)

  if(!isExits) {

    cronJobManager.add(
      cronJobKey,
      schedule,
      () => { typeCronJob[0] === 'close' ? console.log('report') : standuply() },
      options)
      cronJobManager.start(cronJobKey)

  } else {

    cronJobManager.update(
      cronJobKey,
      schedule,
      () => { typeCronJob[0] === 'close' ? console.log('report') : standuply() })

  }
  console.log(cronJobManager.listCrons())
  return 'success'
}

export default cronJob