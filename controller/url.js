const  shortid  = require("shortid");
const URL = require("../models/url");
async function handelGenereateShortURL(req, res) {
    if (req.body==undefined) {
        return res.status(400).json({ error: "url is required" });
      }
  const shortId = shortid();
  const body = req.body;
  console.log(shortId);
  
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render('home',{id:shortId})
  // return res.json({ id: shortId });
}
async function handelGetShortURL(req,res){
    console.log('handel');
    const shortId=req.params.shortId
    // console.log("type",typeof Date.now());
    const entry=await URL.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}})
    // const redirect=await URL.findOne({shortId:shortId})
    console.log(entry.redirectURL);
    res.redirect(entry.redirectURL)

    // res.redirect(entry.redirectURL)
}
async function handelURLanalytics(req,res){
    const shortId=req.params.shortId
   const result =await URL.findOne({shortId},{visitHistory:1})
  //  console.log(result);
    // return res.render('home',{
    //   totalClicks:result.visitHistory.length,
      
    // })
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}
module.exports = {
  handelGenereateShortURL,handelGetShortURL,handelURLanalytics
};
