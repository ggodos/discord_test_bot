const DiscordJS = require('discord.js')
const {REST} = require('@discordjs/rest')
require('dotenv').config()
const {Routes} = require('discord-api-types/v9')

token = process.env['token']
const CLIENT_ID = process.env['client_id']
const GUILD_ID = process.env['guild_id']
const rest = new REST({version: '9'}).setToken(token)
const commands =  [
        /*
         * Template
        {
          name: '',
          description: '',
        },
         */
        {
          name: 'time',
          description: 'Print current h:m:s.',
        },
        {
          name: 'embed',
          description: 'Test',
        },
        {
          name: 'random',
          description: 'Return random number from arg 1 to arg 2',
            options: [
                {
                    name: 'num1',
                    description: 'First number.',
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
                {
                    name: 'num2',
                    description: 'Second number.',
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
            ]
        },
        {
          name: 'roll',
          description: 'Roll the bones.',
            options: [
                {
                    name: 'arg1',
                    description: 'First arg.',
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'arg2',
                    description: 'Second arg.',
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'arg3',
                    description: 'Third arg.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'arg4',
                    description: 'Fourth arg.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'arg5',
                    description: 'Fifth arg.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'arg6',
                    description: 'Sixth arg.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'arg7',
                    description: 'Seventh arg.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'arg8',
                    description: 'Eighth arg.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'msg',
                    description: 'Message that will be written on output.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
                },
                {
                    name: 'hide',
                    description: 'Message that will be written on output.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN
                },
            ]
        },
        {
          name: 'add',
          description: 'Sum numbers.',
            options: [
                {
                    name: 'num1',
                    description: 'First number.',
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
                {
                    name: 'num2',
                    description: 'Second number.',
                    required: true,
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
                {
                    name: 'num3',
                    description: 'Third number.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
                {
                    name: 'num4',
                    description: 'Fourth number.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
                {
                    name: 'num5',
                    description: 'Fifth number.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
                {
                    name: 'num6',
                    description: 'Sixth number.',
                    type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
                },
            ]
        },
    ]
;(async () => {
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
})()
