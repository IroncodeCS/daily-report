import Team from '../schema/Team'

const updateCronJobDbClose = async (teamId, cronJobKey, schedule) => {

  const updateField = await Team.findOneAndUpdate(
    { _id : teamId,
    },
    {
      $set : {
          "cronjob.close": {
            'key': cronJobKey,
            'schedule': schedule
          }
      }
    },
  )
  if(updateField!==null)
    return updateField

}

export default updateCronJobDbClose