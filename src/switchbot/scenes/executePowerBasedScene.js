const { executeScene } = require('./executeScene')
const { getPowerValue } = require('../devices/isDevicePowerAboveThreshold')

const DEFAULT_MINIPLUG_DEVICE_ID = "3C8427AFD7AA"
const DEFAULT_ABOVE_SCENE_ID = "e58a3284-b929-47c4-b244-868a49c36e85"
const DEFAULT_BELOW_SCENE_ID = "84b8a390-0fb0-4c6a-b256-cbc664db7260"
const DEFAULT_THRESHOLD = 20
/* 
指定したプラグミニデバイスの消費電力(power)が
threshold以上ならaboveThresholdSceneを、
threshold未満ならvelowThresholdSceneを実行する。

引数：
  threshold: 消費電力の閾値
  miniPlugDeviceId: 消費電力の取得元プラグミニデバイスのデバイスID
  aboveThresholdScene:　閾値以上の時に実行されるシーン
　　　　　　　　　　　　 のシーンID　
  belowThresholdScene:　閾値未満の時に実行されるシーン
　　　　　　　　　　　　 のシーンID

返り値：
　各シーンの実行結果
*/

async function executePowerBasedScene({ 
    threshold = DEFAULT_THRESHOLD,
    miniPlugDeviceId = DEFAULT_MINIPLUG_DEVICE_ID,
    aboveThresholdScene = DEFAULT_ABOVE_SCENE_ID,
    belowThresholdScene = DEFAULT_BELOW_SCENE_ID
} = {}) {
  
    const { power } = await getPowerValue({miniPlugDeviceId});
    console.log(`power = ${power}`)
    let result

    if(power >= threshold){
        console.log("abobe-scene is executed");
        result = executeScene({ sceneId: aboveThresholdScene });
    } else {
        console.log("below-scene is executed");
        result = executeScene({ sceneId: belowThresholdScene });
    }
  
    return result;

}

if (require.main === module) {
    (async () => {
        try {
            const result = await executePowerBasedScene();
            console.log(JSON.stringify(result, null, 2));
        } catch (error) {
            console.error(error.message);
            process.exitCode = 1;
        }
    })();
}

module.exports = { executePowerBasedScene };