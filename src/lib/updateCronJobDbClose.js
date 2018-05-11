import Team from '../schema/Team'

const updateCronJobDbClose = (teamId, cronJobKey, schedule) => {

  const updateField = await Team.findOneAndUpdate(
    { _id : teamId,
      "cronjob.close": {$exists : true}
    },
    {
      $set : {
        "cronjob" : {
          "close": {
            'key': cronJobKey,
            'schedule': schedule
          }
        }
      }
    },
  )
  if(updateField!==null)
    return updateField

  const addField = await Team.findOneAndUpdate(
    { _id : teamId,
      "cronjob.close": {$exists : false}
    },
    {
      $addToSet : {
        "cronjob" : {
          "close": {
            'key': cronJobKey,
            'schedule': schedule
          }
        }
      }
    },
  )
  if(addField!==null)
    return addField

}

export default updateCronJobDbClose