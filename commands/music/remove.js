const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class RemoveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      aliases: ['rmvid', 'delvid'],
      group: 'music',
      memberName: 'remove',
      description: 'Removes anything in the queue',
      guildOnly: true,
      format: '<number>',
      throttling: {
        usages: 3,
        duration: 5,
      },
      args: [
        {
          key: 'index',
          prompt: 'What video nyumber?',
          type: 'integer'
        }
      ]
    });
  }

  run(msg, { index }) {
    const { channel } = msg.member.voice;
    const embed = new MessageEmbed().setColor('#ff0000');

    if (!channel) msg.say('Nya need to be in a voice chyannel!');
    if (msg.guild.me.voice.channel !== msg.member.voice.channel) {
      msg.say('Be with me!');
    }
    const serverQueue = this.client.queue.get(msg.guild.id);
    if (!serverQueue) msg.say('Nyothing\'s playing!');

    try {
      if (index < 1 && index >= serverQueue.musics.length) {
        msg.say('Please enter a valid nyumber!');
      }
      const removed = serverQueue.musics.splice(index, 1);
      embed.setDescription(`❌ | Removed **${removed[0].title}**: \`${index}\` from queue!`);
      msg.embed(embed);
    } catch {
      serverQueue.connection.dispatcher.end();
      msg.say('Try again!');
    }
  }
};