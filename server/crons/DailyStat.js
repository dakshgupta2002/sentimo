import { schedule } from 'node-cron';
import User from '../models/User.js';
import Stat from '../models/Stat.js';
import Diary from '../models/Diary.js';
import Note from '../models/Note.js';
import { spawn } from 'child_process';

var dailyStat = schedule('* * * * *', async () => {
  const date = new Date();
  console.log("===Starting CRON job===")
  //at 11:59pm of every day
  //create and save emotions of every user for that date
  const users = await User.find({}).exec(); //get all users
  users.forEach(async user => {
    const diary = await Diary.findOne({ user: user._id }).exec();
    if (diary) {
      const notes = await diary?.notes?.map(noteId => Note.findById(noteId).exec())
      if (notes) {
        //notes is an array of promises, resolve all 
        await Promise.all(notes).then(notes => {
          notes.filter(note => {
            return (new Date(note?.createdAt)).toLocaleDateString() === date.toLocaleDateString();
          });
          
          console.log("===User's notes have been found===")
          let text = "";
          notes.forEach(note => {
            text += note?.title + " " + note?.content + " ";
          })

          let data = encodeURI(text);
          let emotion;
          console.log(data)
          // spawn new child process to call the python script
          console.log("===Calling python script===");
          const python = spawn('python3', ['scripts/emotion.py', data]);

          python.stdout.on('data', data => {
            emotion = data.toString();
            console.log("===Emotion fetched from Python===");
          });

          python.on('close', async (code) => {
            console.log("===Exiting with", code + "===");

            const arr = emotion?.split(',')
            let obj = {};
            obj['Happy'] = parseFloat(arr[0]);
            obj['Angry'] = parseFloat(arr[1]);
            obj['Surprise'] = parseFloat(arr[2]);
            obj['Sad'] = parseFloat(arr[3]);
            obj['Fear'] = parseFloat(arr[4]);

            console.log("===Stats parsed to object Id===")
            // save the stat of the date to the database
            const oldStat = await Stat.findOne({user: user._id, date: new Date(date).toISOString()});
            if (oldStat){
              oldStat.emotion = obj;
              console.log("===Stats updated for future use!===")
              await oldStat.save();
            }else{
              const dailyStat = new Stat({
                user: user._id,
                date: (new Date(date)).toISOString(),
                emotion: obj
              });
              console.log("===New stats saved for future use!===")
              await dailyStat.save();
            }
          })

        })
      }

    }
  });
});

dailyStat.start();