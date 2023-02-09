const router = require('express').Router();
const {google} = require('googleapis');


const GOOGLE_CLINT_ID = '464483303820-uc9u7ds8ht4f1aguvfr34s4qr5a5lfuq.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const REFRESH_TOKENS = '1//0e44SgVlrEcL1CgYIARAAGA4SNwF-L9Irv_JbHxifhEOALf9Z4GOcMBVRyOW4ygO09BJ41Pr7wjoXlMnXypGrPY1118cbGj73NSE';

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLINT_ID,
  GOOGLE_CLIENT_SECRET,
  'http://localhost:3000',
)


router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens', async (req, res, next) => {

  try {
    const {code} = req.body;
    const {tokens} = await oauth2Client.getToken(code)
    res.send(tokens);
  }catch (error){
    console.log(error,'error')
    next(error)
  }
  // res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-event', async (req, res, next) => {
  try {
    const {summary,description,location,startDateTime,endDateTime} = req.body;
    oauth2Client.setCredentials({refresh_token : REFRESH_TOKENS});
    const calendar = google.calendar('v3');
    const response = await calendar.events.insert({
      auth: oauth2Client,
      calendarId : 'primary',
      requestBody : {
        summary,
        description,
        location,
        colorId : '6',
        start : {
          dateTime : new Date(startDateTime)
        },
        end : {
          dateTime : new Date(endDateTime)
        }
      }
    })

    res.send(response)
  }catch (error){
    console.log(error,'error')
    next(error)
  }
  // res.send({ message: 'Ok api is working 🚀' });
});


router.post('/update-event', async (req, res, next) => {

  try {
    const {summary,description,location,startDateTime,endDateTime} = req.body;
    oauth2Client.setCredentials({refresh_token : REFRESH_TOKENS});
    const calendar = google.calendar('v3');

    const response = await calendar.events.update({
      auth: oauth2Client,
      calendarId : 'primary',
      requestBody : {
        summary,
        description,
        location,
        colorId : '6',
        start : {
          dateTime : new Date(startDateTime)
        },
        end : {
          dateTime : new Date(endDateTime)
        }
      },
      eventId : '51ohn8lig3jse7rs20adhsgdqo',
    })

    res.send(response)
  }catch (error){
    console.log(error,'error')
    next(error)
  }
  // res.send({ message: 'Ok api is working 🚀' });
});

router.get('/list-event', async (req, res, next) => {

  try {
    const {summary,description,location,startDateTime,endDateTime} = req.body;
    oauth2Client.setCredentials({refresh_token : REFRESH_TOKENS});
    const calendar = google.calendar('v3');

    const response = await calendar.events.list({
      auth: oauth2Client,
      calendarId : 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })
    const events = response.data.items;

    if (!events || events.length === 0) {
      console.log('No upcoming events found.');
      return;
    }
    console.log('Upcoming 10 events:');
    // events.map((event, i) => {
    //   const start = event.start.dateTime || event.start.date;
    //   console.log(`${start} - ${event.summary}`);
    // });

    res.send(events)
  }catch (error){
    console.log(error,'error')
    next(error)
  }
  // res.send({ message: 'Ok api is working 🚀' });
});

module.exports = router;
