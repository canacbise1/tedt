const Discord = require('discord.js');
const pool = require('./pool');
const client = new Discord.Client();
const discord_bot_token = 'hGX_bVgMvGnwsDsJfo6e4M0q1JVEcIwL';
const discord_guild_id = '719778992340598814';
const discord_verified_role = 'Modo-discord';
const domain = '';

client.on('ready', () => {
    console.log('[Discord] Bot started.')
})

client.on('guildMemberAdd', member => {
    const linkId = pool.createLink(member.id);
   // const embed = new Discord.MessageEmbed()
     //   .setTitle('reCAPTCHA Verification')
    //    .setDescription(`To gain access to this server you must solve a captcha. The link will expire in 15 minutes.\nhttp://${domain == '' ? 'localhost:8080' : domain}/verify/${linkId}`)
    //    .setColor('BLUE')
//    member.send(embed)
    member.send(`to gain access to this server you must solve a captcha. The link will expire in 15 minutes.\nhttp://${domain == '' ? 'localhost:8080' : domain}/verify/${linkId}`);
    console.log("test");
})
client.on('message', message => {
if (message.content = '!captcha') {
  const linkId = pool.createLink(message.author.id);
  message.author.send(`to gain access to this server you must solve a captcha. The link will expire in 15 minutes.\nhttp://${domain == '' ? 'localhost:8080' : domain}/verify/${linkId}`);
}
})

function main() {
    client.login("NzY1MTQ2NDU3NTQ3MzQxODI0.X4QkKw.VpmV8P39gkeYvMOPxl133RqCE0Q").catch(e => {
        console.log('[Discord] Invalid bot t');
        process.exit(0)
    })
}

async function addRole(discordId) {
    try {
        var guild = await client.guilds.fetch(discord_guild_id);
        var member = await guild.members.fetch(discordId);
        var role = await guild.roles.cache.find(r => r.name === discord_verified_role);
        member.roles.add(role)
        console.log(`Added roles to user ${discordId}.`)
    } catch (e) {
        console.log(`Error adding role to user ${discordId}.`);
    }
}

module.exports = {
    run: main,
    addRole
};
