const { setDevicePower } = 
    require('../../switchbot/devices/setDevicePower')


/* 
1．電気をONにする
2. テレビのハブをONにする
*/
async function runArrivalRoutine() {

    await setDevicePower({ 
        deviceId: process.env.INFRARED_CEILING_LIGHT_ID,
        power: 'on'
    });

    await setDevicePower({ 
        deviceId: process.env.TV_PLUG_ID,
        power: 'on'
    });
    
    return { executed: true }

}

module.exports = { runArrivalRoutine };
