const { runArrivalRoutine } = require('./routines/runArrivalRoutine')
const { runDepartureRoutine } = require('./routines/runDepartureRoutine')


async function executeAction(intent) {
  const action = intent?.action;

  switch (action) {
    case 'run_departure_routine':
      return runDepartureRoutine();

    case 'run_arrival_routine':
      return runArrivalRoutine();

    default:
      throw new Error(`Unsupported action: ${action}`);
    }

}

module.exports = { executeAction };