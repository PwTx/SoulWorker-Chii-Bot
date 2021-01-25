const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'say',
      aliases: ['say'],
      group: 'fun',
      memberName: 'say',
      description: 'Returns a statement',
      throttling: {
        usages: 3,
        duration: 5,
      }
    });
  }

  run(msg) {
    let replies = ['Nya', 'I hope you are doing well', 'I am the best SoulWorker', 'My Master is the best programmer', 
      'I love you, nya', 'I wuv my Master	(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', 'I\'m proud', '♡＾▽＾♡', '┐( ˘_˘ )┌'
    ];
    const reply = Math.floor(Math.random() * replies.length);
    msg.say(replies[reply]);
  }
};