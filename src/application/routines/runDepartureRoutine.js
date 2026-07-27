const { isDevicePowerAboveThreshold } =
    require('../../switchbot/devices/isDevicePowerAboveThreshold')
const { setDevicePower } = 
    require('../../switchbot/devices/setDevicePower') 
const { toggleInfraredDevicePower } = 
    require('../../switchbot/devices/toggleInfraredDevicePower')

/* 
1．電気をOFFにする
2．テレビがON(powerが30以上)なら、テレビの電源をトグルして、ハブミニの電源をOFFにする
　 テレビがOFF(powerが30未満)なら、ハブミニの電源をOFFにする
*/
async function runDepartureRoutine() {

    await setDevicePower({ 
        deviceId: process.env.INFRARED_CEILING_LIGHT_ID,
        power: 'off'
    });
    
    if(await isDevicePowerAboveThreshold({ threshold: 30 })){
        await toggleInfraredDevicePower()

    }

    await setDevicePower({
        deviceID: process.env.TV_PLUG_ID,
        power: 'off'
    });
    // TODO: 現状、テレビがONの時はTV_PLUGをトグルした直後にハブの電源をOFFにする。
    //       これで動作しない場合は、sleepさせるなどで時間を空ける必要があるかも
    
    return { executed: true }

}

module.exports = { runDepartureRoutine };