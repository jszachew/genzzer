const tfjs = require("@tensorflow/tfjs-node")
const path = require("path")
const wordsArray = require("../utils/words.js")

const express = require('express');

const router = express.Router()

const processText = (text, wordsArray) => {
    const preprocessedText = text.toLowerCase().replace(/,/g,"").replace(/\n/g, " ").replace("!","").replace("(","").replace(")","").replace(",","")
    textArray = preprocessedText.split(" ")
    let counter = 0
    let map = {}
    textArray.forEach(item => {
        if(wordsArray.includes(item)){
            counter = counter + 1;
            if(map[item]){
                map[item] = map[item] + 1
            } else {
                map[item] = 1
            }
        }
    })
    let tensor = new Array(5000).fill(0);

    for (const [key, value] of Object.entries(map)){
        let index = wordsArray.indexOf(key)
        tensor[index] = value
    }
    return tensor
}

router.route('/').post(async(req, res) => {
    const model = await tfjs.loadLayersModel("file://" + path.join( __dirname, "../models/model.json"))
    const text = req.body.text
    console.log(text)
    const tensor = tfjs.tensor([processText(text, wordsArray)])
    const result = model.predict(tensor)
    const resutlArr = result.dataSync()
    const genres = ["Blues",
        "Country",
        "Electronic",
        "Folk",
        "International",
        "Jazz",
        "Latin",
        "NewAge",
        "PopRock",
        "Rap",
        "Reggae",
        "RnB",
        "Vocal"]
    const resultObj = {}
    resutlArr.forEach((item, idx) => {
            resultObj[genres[idx]] = item
        }
    )
    console.log(resultObj)
    res.json(resultObj)
});


module.exports = router;