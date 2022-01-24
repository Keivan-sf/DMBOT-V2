// @ts-check

require('dotenv').config();
const TOKEN = process.env?.DEVELOPEMENT === 'TRUE' ? process.env.DTOKEN : process.env.TOKEN;
const Discord = require('discord.js');
const client = new Discord.Client();
require('./modified_modules/discord-buttons/src/index')(client);

client.on('ready' , () => console.log(`logged in as ${client.user.tag}`))

client.on('message' , require('./src/commands/commands').handleMessage );

client.login(TOKEN);