import Team from '../schema/Team'

const updateCronJobDbRemind = (teamId, cronJobKey, schedule) => {

  const updateField = await Team.findOneAndUpdate(
    { _id : teamId,
      "cronjob.remind": {$exists : true}
    },
    {
      $set : {
        "cronjob" : {
          "remind": {
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
      "cronjob.remind": {$exists : false}
    },
    {
      $addToSet : {
        "cronjob" : {
          "remind": {
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

export default updateCronJobDbRemind