
import * as fs from 'fs';

import * as discord from 'discord-interactions';

export const Game = {
  start(req, res){

    var answers = [];
    var user = req.body.member.user;

    for (let i = 0; i < 100; i++) {
      answers.push(this.getRandom(1,1000));
    }

    let data = JSON.stringify(answers);
    fs.writeFileSync(`${this.getPath()}/answer.json`, data);

    console.log(req.body);

    return res.send({
      type: discord.InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        // Fetches a random emoji to send from a helper function
        content: "Game Started",
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "click",
                style: 1,
                custom_id: "click 1"
              }
            ]
          }
        ]
      },
    });
  },

  getRandom(min, max){
    return Math.floor(Math.random() * (max-min)+min);
  },
  getPath(){
    var dir = process.env.DISCORD_STORAGE_PATH;
    
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
  
    return dir;
  }
}