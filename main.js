const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request  = require('request');
const cheerio  = require('cheerio');

const AllMatchobj = require('./AllMatches');
// home page
request(url,cb);
function cb(err,response,html){
    if(err)
    console.log(err);
    else{
        //console.log(html);
        extractLink(html);
    }
}
function extractLink(html){
   let $ = cheerio.load(html); //parse ,$ = interface
   let anchorElem = $("a[data-hover='View All Results']");
   let link = anchorElem.attr("href");
   //console.log(link);
   let fullLink = "https://www.espncricinfo.com"+link;
   //console.log(fullLink);
   AllMatchobj.gAllMatches(fullLink);
}
