//const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
const request = require('request');
const cheerio = require('cheerio');
const { is } = require('cheerio/lib/api/traversing');
// home page

function processScoreCard(url){
    request(url, cb);
}


function cb(err, response, html) {
    if (err)
        console.log(err);
    else {
        //console.log(html);
        extarctMatchDetails(html);
    }
}

function extarctMatchDetails(html) {
   
    //ipl
    //    team
    //        player
    //           runs balls fours sixes sr opponent venue date 
    // venue date ->.match-header-info.match-info-MATCH .description 
    //result ->.event .status-text
    let $ = cheerio.load(html);
    let descElem = $(".header-info .description");
    let result = $(".event .status-text");
    let stringArr = (descElem.text().split(','));
    let venue = stringArr[1].trim(); // trim used to remove spaces
    let date = stringArr[2].trim();
    result = (result.text());
    let innings = $(".card.content-block.match-scorecard-table>.Collapsible");
    for (let i = 0; i < innings.length; i++) {
        // team ,opponent
        let teamName = $(innings[i]).find('h5').text();
        teamName = teamName.split('INNINGS')[0].trim();
        let oppIndex = i == 0 ? 1 : 0;
        let oppName = $(innings[oppIndex]).find('h5').text();
        oppName = oppName.split('INNINGS')[0].trim();
         // venue date opponent result runs balls fours sixes sr
        console.log(`${venue}| ${date}| ${oppName}| ${result}`);
        
        let currInning = $(innings[i]);
        let allRows = currInning.find(".table.batsman tr");
        for (let j = 0; j < allRows.length; j++) {
            let allCols = $(allRows[j]).find('td');
            let isWorthy = $(allCols[0]).hasClass('batsman-cell');
            if (isWorthy == true) {
                //player name runs balls fours sixes sr
               let playerName= $(allCols[0]).text().trim();
               let runs= $(allCols[2]).text().trim();
               let balls= $(allCols[3]).text().trim();
               let fours= $(allCols[5]).text().trim();
               let sixes= $(allCols[6]).text().trim();
               let sr= $(allCols[7]).text().trim();
               console.log(`${playerName}| ${runs}| ${balls}| ${fours}| ${sixes}| ${sr}`);
            }
        }
    }
}
module.exports={
    ps: processScoreCard
}