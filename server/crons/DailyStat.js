import { schedule } from 'node-cron';

var dailyStat = schedule('59 59 23 * * *', () => {
  //at 11:59:59 pm of every day
  //create and save emotions of every user 
  //for that date
  
});

dailyStat.start();