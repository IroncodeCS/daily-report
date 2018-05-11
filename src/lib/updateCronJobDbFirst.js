import Team from '../schema/Team'

const updateCronJobDbFirst = (teamId, cronJobKey, schedule) => {

  const updateField = await Team.findOneAndUpdate(
    { _id : teamId,
      "cronjob.first": {$exists : true}
    },
    {
      $set : {
        "cronjob" : {
          "first": {
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
      "cronjob.first": {$exists : false}
    },
    {
      $addToSet : {
        "cronjob" : {
          "first": {
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

export default updateCronJobDbFirst