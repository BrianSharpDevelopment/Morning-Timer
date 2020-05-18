const tableNames = require('./../constants/tableNames');

exports.createTask = async function (req, res, next) {
    
    const rountineId = req.body.routine_id;
    const totalTimeSec = req.body.total_time_sec;
    
    if (!routineId) return res.status(400).send({message: "Missing parameter: routine_id"});
    if (!totalTimeSec) return res.status(400).send({message: "Missing parameter: total_time_sec"});

    const task = {
        rountineId,
        totalTimeSec
    }

    task.id = await knex(tableNames.task).insert(task);

    return res.status(200).send({message: "success", task: task})

}