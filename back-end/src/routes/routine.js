var tableNames = require('./../constants/table_names');
var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'testing',
      database : 'morning_timer'
    }
});

exports.createRoute = async function(req, res, next){
    
    const scheduledDate = req.body.scheduledDate;

    if (!scheduledDate) return res.status(400).send({message: "Missing parameter: schduledDate"});

    const routine = {
        user_id: req.userId,
        scheduled_date: scheduledDate
    }

    routine.id = await knex(tableNames.routine)
        .insert(routine);

    return res.status(200).send({message: "success", routine: routine});
};


