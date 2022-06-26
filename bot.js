const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: ["GUILDS"] });
const DiscordJS = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const token = process.env["token"];
const CLIENT_ID = process.env["client_id"];
const rest = new REST({ version: "9" }).setToken(token);
const commands = [
  /*
         * Template
        {
          name: '',
          description: '',
        },
         */
  {
    name: "time",
    description: "Print current h:m:s.",
  },
  {
    name: "embed",
    description: "Test embedded.",
  },
  {
    name: "randint",
    description: "Return random integer in range.",
    options: [
      {
        name: "min",
        description: "Min integer.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER,
      },
      {
        name: "max",
        description: "Max integer.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER,
      },
    ],
  },
  {
    name: "random",
    description: "Return random value from 0 to 1.",
  },
  {
    name: "roll",
    description: "Roll the bones.",
    options: [
      {
        name: "arg1",
        description: "First arg.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "arg2",
        description: "Second arg.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "arg3",
        description: "Third arg.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "arg4",
        description: "Fourth arg.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "arg5",
        description: "Fifth arg.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "arg6",
        description: "Sixth arg.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "arg7",
        description: "Seventh arg.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "arg8",
        description: "Eighth arg.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "msg",
        description: "Message that will be written on output.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "hide",
        description: "Message that will be written on output.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN,
      },
    ],
  },
  {
    name: "add",
    description: "Sum numbers.",
    options: [
      {
        name: "num1",
        description: "First number.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "num2",
        description: "Second number.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "num3",
        description: "Third number.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "num4",
        description: "Fourth number.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "num5",
        description: "Fifth number.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "num6",
        description: "Sixth number.",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  },
];

async function putCommands(Guilds) {
  try {
    console.log("Started refreshing application (/) commands.");
    Guilds.forEach((guild) => {
      rest.put(Routes.applicationGuildCommands(CLIENT_ID, guild.id), {
        body: commands,
      });
      console.log(`${guild.name} (id: ${guild.id})`);
      console.log(guild);
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const Guilds = client.guilds.cache;
  putCommands(Guilds);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options, channel_id } = interaction;

  const opts = options._hoistedOptions;
  const args_c = opts.length;
  if (commandName === "add") {
    let sum = 0;
    for (let i = 1; i < args_c + 1; i++) {
      sum += options.getNumber(`num${i}`);
    }

    await interaction.reply({
      content: `Sum is: ${sum}`,
      ephemeral: true,
    });
  } else if (commandName === "time") {
    await interaction.reply(`13:37:00`);
  } else if (commandName === "embed") {
    const answer = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Some title")
      .setAuthor("Name of author")
      .setDescription("Description")
      .setThumbnail("https://i.imgur.com/AfFp7pu.png")
      .setFooter("Some footer");
    interaction.reply({
      embeds: [answer],
    });
  } else if (commandName === "randint") {
    const min = parseInt(options.getInteger("min"));
    const max = parseInt(options.getInteger("max"));
    const choice = Math.floor(Math.random() * (max - min + 1) + min);
    if (max < min) {
      await interaction.reply({
        content: "Invalid arguments.",
        // ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `From ${min} to ${max}\nNumber is... ${choice}`,
        // ephemeral: true,
      });
    }
  } else if (commandName === "random") {
    const choice = Math.random();
    await interaction.reply({
      content: `Random number from 0 to 1 is ${choice}`,
    });
  } else if (commandName === "roll") {
    const hide = options.getBoolean("hide");
    const valids = Array.from(Array(8).keys()).map((e, i) => {
      return `arg${i + 1}`;
    });
    const choices = valids.reduce((prev, cur) => {
      t = options.getString(cur);
      if (t != null && t != undefined) prev.push(`${t}`);
      return prev;
    }, []);
    const arg_c = Math.floor(Math.random() * choices.length);
    const msg = options.getString("msg") || "";
    const ans_embed = new MessageEmbed()
      .setColor("b00baa")
      .setTitle("Possible options:")
      .setDescription(
        `---------------\n` +
          `${choices.map((e, i) => `${i + 1}: ${e}`).join("\n")}`
      );
    try {
      const choice = opts[arg_c].value;
      const answer = {
        content: `${msg}\nChoice is ${choice}`,
        // ephemeral: true,
      };
      if (hide != null && hide === false) {
        answer.embeds = [ans_embed];
      }
      await interaction.reply(answer);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  } else {
    await interaction.reply("This commands doesn't implemented");
  }
});

client.login(token);
