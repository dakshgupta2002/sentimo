import { schedule } from 'node-cron';
import User from '../models/User.js';
import Stat from '../models/Stat.js';
import Diary from '../models/Diary.js';
import Note from '../models/Note.js';
import { spawn } from 'child_process';

var dailyStat = schedule('59 23 * * *', async () => { // run every 8 hours to manage all timezones
  const date = new Date().toLocaleDateString(); //the aws ami is set to default Asia/Calcutta
  console.log("===Starting CRON job===", date)
  //at 11:59pm of every day
  //create and save emotions of every user for that date
  const users = await User.find({}).exec(); //get all users
  users.forEach(async user => {
    const diary = await Diary.findOne({ user: user._id }).exec();
    if (diary) {
      const notes = diary?.notes?.map(noteId => Note.findById(noteId).exec())
      if (notes) {
        await Promise.all(notes).then(notes => {
          notes.filter(note => {
            return ((new Date(note?.date)).toLocaleDateString() === date) // notes date is in local client format
          });

          console.log("===User's notes have been found===")
          let text = "";
          notes.forEach(note => {
            text += note?.title + " " + note?.content + " ";
          })
          let data = encodeURI(text);
          data.slice(0, 5000) // sending a string of more than 5k chars can break the server

          let emotion;
          // spawn new child process to call the python script
          const python = spawn('python3', ['scripts/emotion.py', data]);

          python.stdout.on('data', data => {
            emotion = data.toString();
          });

          python.on('close', async (code, signal) => {
            console.log("===Exiting with", code + " signal", signal, "===");
            if (code === null) return;

            const arr = emotion?.split(',')
            let obj = {};
            obj['Happy'] = parseFloat(arr[0]);
            obj['Angry'] = parseFloat(arr[1]);
            obj['Surprise'] = parseFloat(arr[2]);
            obj['Sad'] = parseFloat(arr[3]);
            obj['Fear'] = parseFloat(arr[4]);

            // save the stat of the date to the database
            const oldStat = await Stat.findOne({ user: user._id, date });
            if (oldStat) {
              oldStat.emotion = obj;
              console.log("===Stats UPDATED!===")
              await oldStat.save();
            } else {
              const dailyStat = new Stat({
                user: user._id,
                date,
                emotion: obj
              });
              console.log("===Stats CREATED!===")
              await dailyStat.save();
            }
          })

        })
      }

    }
  });
});

dailyStat.start();
