const { isDevicePowerAboveThreshold } =
    require('../../switchbot/devices/isDevicePowerAboveThreshold')
const { setDevicePower } = 
    require('../../switchbot/devices/setDevicePower') 
const { toggleInfraredDevicePower } = 
    require('../../switchbot/devices/toggleInfraredDevicePower')

const TV_POWER_OFF_DELAY_MS = 3000

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/* 
1．電気をOFFにする
2．テレビがON(powerが30以上)なら、テレビの電源をトグルして、プラグの電源をOFFにする
　 テレビがOFF(powerが30未満)なら、ハブミニの電源をOFFにする
*/
async function runDepartureRoutine() {

    await setDevicePower({ 
        deviceId: process.env.INFRARED_CEILING_LIGHT_ID,
        power: 'off'
    });
    
    if(await isDevicePowerAboveThreshold({ threshold: 30 })){
        await toggleInfraredDevicePower({
            deviceId: process.env.INFRARED_TV_ID
        })
        await wait(TV_POWER_OFF_DELAY_MS)

    }

    await setDevicePower({
        deviceId: process.env.TV_PLUG_ID,
        power: 'off'
    });
    
    return { executed: true }

}

module.exports = { runDepartureRoutine };

if (require.main === module) {
    (async () => {
        try {
            const result = await runDepartureRoutine();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}
