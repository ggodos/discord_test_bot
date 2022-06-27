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
    options: [
      {
        name: "author",
        description: "Set author.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "title",
        description: "Set title.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "description",
        description: "Set description.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "footer",
        description: "Set footer.",
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "thumbnail",
        description: "Set thumbnail link.",
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: "color",
        description: "Set color.",
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
    ],
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
    name: "sum",
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
  const { commandName, options } = interaction;

  const opts = options._hoistedOptions;
  const args_quantity = opts.length;
  if (commandName === "sum") {
    let numbers = [];
    let sum = 0;
    for (let i = 1; i < 7; i++) {
      let n = options.getNumber(`num${i}`);
      if (n != null) {
        numbers.push(n);
        sum += n;
      }
    }

    const answerString = `The sum of ${numbers.join(" ")} is ${sum}`;
    await interaction.reply({
      content: answerString,
    });
  } else if (commandName === "time") {
    await interaction.reply(`00:13:37`);
  } else if (commandName === "embed") {
    const Author = options.getString("author", true);
    const Title = options.getString("title", true);
    const Description = options.getString("description", true);
    let Footer = options.getString("footer", false);
    let Color = options.getString("color", false) ?? "b00baa";
    let Thumbnail =
      options.getString("thumbnail", false) ??
      "https://i.imgur.com/AfFp7pu.png";
    let answer = new MessageEmbed()
      .setTitle(Title)
      .setAuthor(Author)
      .setDescription(Description);
    if (Color != null) {
      answer.setColor(Color);
    }
    if (Thumbnail != null) {
      answer.setThumbnail(Thumbnail);
    }
    if (Footer != null) {
      answer.setFooter(Footer);
    }
    interaction.reply({
      embeds: [answer],
    });
  } else if (commandName === "randint") {
    const min = parseInt(options.getInteger("min"));
    const max = parseInt(options.getInteger("max"));
    const choice = Math.floor(Math.random() * (max - min + 1) + min);
    if (max < min) {
      await interaction.reply({
        content: "Invalid arguments. min >= max",
      });
    } else {
      await interaction.reply({
        content: `In range (${min}, ${max})\nChosen ${choice}`,
      });
    }
  } else if (commandName === "random") {
    const choice = Math.random();
    await interaction.reply({
      content: `Random number from 0 to 1 is ${choice}`,
    });
  } else if (commandName === "roll") {
    const hide = options.getBoolean("hide");
    const valids = Array.from(Array(8).keys()).map((_, i) => {
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
      let answerContent = `${msg}\nFrom ${choices.join(" ")}\nChosen ${choice}`;
      if (hide != null && hide === false) {
        answer.embeds = [ans_embed];
      }
      const answer = {
        content: answerContent,
      };
      await interaction.reply(answer);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  } else {
    await interaction.reply("This commands doesn't implemented");
  }
});

client.login(token);
