const express=require('express')
const router = express.Router()
const {handelGenereateShortURL,handelGetShortURL,handelURLanalytics} =require('../controller/url')
router.post('/',handelGenereateShortURL)
router.get('/:shortId',handelGetShortURL)
router.get('/analytics/:shortId',handelURLanalytics)
module.exports= router