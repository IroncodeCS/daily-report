import Team from '../schema/Team'

const updateCronJobDbFirst = async (teamId, cronJobKey, schedule) => {

  const updateField = await Team.findOneAndUpdate(
    { _id : teamId,
    },
    {
      $set : {
          "cronjob.first": {
            'key': cronJobKey,
            'schedule': schedule
          }
      }
    },
  )
  if(updateField!==null)
    return updateField

}

export default updateCronJobDbFirst