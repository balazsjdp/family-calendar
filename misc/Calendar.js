const { default: axios } = require("axios");
const errorCodes = require("./errorCodes");
const ICAL = require("ical.js");
const ICalParser  = require("ical-js-parser").default;

module.exports = class Calendar {
    calendarUrl;

    constructor(url){
        this.calendarUrl = url;
    }


    getCalendarData(){
        return new Promise((resolve, reject) => {
            axios.get(this.calendarUrl)
            .then((response) => {
                if(response.status === 200){
                    resolve(response.data)
                }else{
                   throw new Error(`Calendar request returned with status ${response.status}`)
                }
            })
            .catch((err) => {
                reject(err.code)
            })
        })
        .catch((err) => {
            return {
                error: true,
                message: errorCodes[err]
            }
        })
    }


    async calendarEvents(){
        const calendarData = await this.getCalendarData();
        
        if(calendarData.error){
            return calendarData;
        }
        
        // Parse calendar
        //const jcalData = ICAL.parse(calendarData);



        const resultJSON = ICalParser.toJSON(calendarData);

       // const vcalendar = new ICAL.Component(jcalData);
        //const events = vcalendar.getAllSubcomponents('vevent');
        //const json = vcalendar.toJSON()
        return resultJSON;
    }


}