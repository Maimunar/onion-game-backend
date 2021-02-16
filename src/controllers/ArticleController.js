const fs = require('fs');
const csv = require('csv-parser')

exports.getArticle = async (req,res) => {
    const results = [];
    let lineNum = Math.floor(Math.random() * 23984) + 2;
    fs.createReadStream('./public/OnionOrNot.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            let selectedLine = results[lineNum]
            let endResult = Object.keys(selectedLine).map(key => selectedLine[key]);
            if (endResult[endResult.length - 1][0] == parseInt(endResult[endResult.length - 1][0])){
                let articleDetails = [];
                for (let i=0; i < endResult.length - 1; i++){
                    articleDetails.push(endResult[i])
                }
                let article = {
                    details: articleDetails.join(','),
                    isTheOnion: endResult[endResult.length - 1][0] == 1
                }
                res.send(article)
            }
            else res.send("Error while finding a header. Please try again!")
        }
    );
}

exports.postResult = (req,res) => {
    
}
