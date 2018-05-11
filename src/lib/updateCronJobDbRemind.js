import Team from '../schema/Team'

const updateCronJobDbRemind = async (teamId, cronJobKey, schedule) => {

  const updateField = await Team.findOneAndUpdate(
    { _id : teamId,
    },
    {
      $set : {
          "cronjob.remind": {
            'key': cronJobKey,
            'schedule': schedule
          }
      }
    },
  )
  if(updateField!==null)
    return updateField
}

export default updateCronJobDbRemind