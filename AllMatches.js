const request = require('request');
const cheerio = require('cheerio');
const ScoreCardObj = require('./scorecard')
function getAllMatchesLinks(url){
    request(url,
        function(err,response,html){
            if(err)
        console.log(err);
        else{
            extarctAllLinks(html);
        }
    })
}
function extarctAllLinks(html){
    let $ = cheerio.load(html);
    let scoreCardElems = $("a[data-hover='Scorecard']");
    for(let i=0;i<scoreCardElems.length;i++){
        let link = $( scoreCardElems[i] ).attr("href");
       
        let fullLink = "https://www.espncricinfo.com"+link;
        console.log(fullLink);
        //
        ScoreCardObj.ps(fullLink);
    }
}
module.exports={
    gAllMatches : getAllMatchesLinks
}