const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();

const token = process.env['token']


require('./index.js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName, options, channel_id } = interaction

    const opts = options._hoistedOptions
    const args_c = opts.length
  if (commandName === 'add') {
    let sum = 0
    for (let i = 1; i < args_c+1; i++) {
      sum += options.getNumber(`num${i}`)
    }

    await interaction.reply({
        content: `Sum is: ${sum}`,
        ephemeral: true,
    })
  } else if (commandName === 'time') {
        await interaction.reply(`13:37:00`)
  } else if (commandName === 'embed') {
        const answer = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setAuthor('Name of author')
            .setDescription('Description')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .setFooter('Some footer')
        interaction.reply({
          embeds: [answer]
      })
  } else if (commandName === 'random') {
      const min = parseInt(options.getNumber('num1'))
      const max = parseInt(options.getNumber('num2'))
      const choice =  Math.floor(min + Math.random() * (max-min+1))
      if (max < min) {
        await interaction.reply({
              content: 'Invalid arguments.',
              // ephemeral: true,
          })
      } else {
        await interaction.reply({
              content: `From ${min} to ${max}\nNumber is... ${choice}`,
              // ephemeral: true,
          })
      }
  } else if (commandName === 'roll') {
      const hide = options.getBoolean('hide')
      const valids = Array.from(Array(8).keys()).map((e, i) => {
          return `arg${i+1}`
      })
        const choises = valids.reduce((prev, cur) => {
            t = options.getString(cur)
            if (t != null && t != undefined) prev.push(`${t}`)
            return prev
        }, [])
      const arg_c =  Math.floor(Math.random() * choises.length)
      const msg = options.getString('msg') || ""
      const ans_embed = new MessageEmbed()
            .setColor('b00baa')
            .setTitle('Possible options:')
            .setDescription(
                `---------------\n`+
                `${choises.map((e, i) => `${i+1}: ${e}`).join('\n')}`)
      try
      {
        const choice = opts[arg_c].value
        const answer = {
            content: `${msg}\n...${choice}`,
            // ephemeral: true,
        }
        if (hide != null && hide === false) {
          answer.embeds = [ans_embed]
        }
        await interaction.reply(answer)
      }
      catch (e)
      {
          console.log(`Error: ${e}`)
      }

  } else {
      await interaction.reply('This commands doesn\'t implemented')
  }
});

client.login(token);

