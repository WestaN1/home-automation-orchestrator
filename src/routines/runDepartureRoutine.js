
const { isDevicePowerAboveThreshold } = require('../isDevicePowerAboveThreshold')


/* 
1．電気をOFFにする
2．テレビがON(powerが30以上)なら、テレビの電源をトグルして、ハブミニの電源をOFFにする
　 テレビがOFF(powerが30未満)なら、ハブミニの電源をOFFにする
*/
async function runDepartureRoutine() {
    
    return { executed: true }

}

module.exports = { runDepartureRoutine };