const Discord = require("discord.js");
const client = new Discord.Client();
require('discord-reply');
const Dataa = require('st.db');
const db = new Dataa(`/Datas/reports-data.json`);
const randomstring = require("randomstring");
const config = require(`./config.json`)
const disbut = require('discord-buttons');
disbut(client);

///All Copy Right Reserved For: Shuruhatik  in YT
client.on("messageReactionAdd", async (reaction, user) => {
  if(config.only == true){
    if(reaction.message.channel.id != config.onlyChannel) return;
  }
  let message = reaction.message, emoji = reaction.emoji;
  if (emoji.name == config.emoji_1 || emoji.name == config.emoji_2) {
    reaction.remove(user);
    let embed = new Discord.MessageEmbed()
      .setDescription(`Do you want to follow up and submit the **report**?\nهل تريد المتابعة وتقديم **الأبلاغ**؟`)
      .setColor('#5865F2')
    let accept_embed = new Discord.MessageEmbed()///All Copy Right Reserved For: Shuruhatik  in YT
      .setColor("#5865F2")
      .setTitle("Information about reporting")
      .addField(`Reported user`, reaction.message.author.username,true)
      .addField(`Report by`, user.username,true)
      .addField(`Message`, `\`\`\`${reaction.message.content}\`\`\``)
      .addField(`Message Link`,`[click here](https://discord.com/channels/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`,true)
      .addField(`Channel`,`<#${reaction.message.channel.id}>`,true)
      .setFooter(reaction.message.channel.guild.name)
      .setTimestamp()
    let id = randomstring.generate({ length: 20 })
    let did = randomstring.generate({ length: 20 })

    let button = new disbut.MessageButton()///All Copy Right Reserved For: Shuruhatik  in YT
      .setStyle(`gray`)
      .setEmoji("✅")
      .setID(id)
    let d_button = new disbut.MessageButton()///All Copy Right Reserved For: Shuruhatik  in YT
      .setStyle(`gray`)
      .setEmoji("❌")
      .setID(did)
    let msg = await user.send({
      embed: embed, buttons: [
        button, d_button
      ]
    })
    client.on('clickButton', async (button) => {
      if (button.id == did) {
        await button.reply.send(`✅ Report canceled **successfully**`, true)///All Copy Right Reserved For: Shuruhatik  in YT
        msg.delete()
      }
      if (button.id == id) {
        await db.set(`report_${id}`, {
          reported_user: reaction.message.author.id,
          message: reaction.message.content,
          report_by: user.id,
          created_at: new Date(),
          messageID: reaction.message.id,
          channelID: reaction.message.channel.id,
          guildID: reaction.message.channel.guild.id,
        })
        msg.edit({embed:accept_embed})
        await button.reply.send(`🙂 Thank you for your **report**!\n\n> [Go to the message on which the report was submitted](https://discord.com/channels/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`, true);
        client.channels.cache.get(config.logchannel).send({ embed: accept_embed }).catch(err => console.log(`channel log error`))///All Copy Right Reserved For: Shuruhatik  in YT
      }
    })
  }
});

client.on("ready", async () => {
  await client.user.setActivity(config.status || `Bot Created by Shuruhatik.yxz`)
  console.clear()
  console.log(`\u001b[38;5;220m------- ﺩﺭﻮﻜﺴﻳﺪﻠﻟ ﻞﺋﺎﺳﺭ ﻦﻋ ﻍﻼﺑﻹﺍ ﻡﺎﻈﻧ ﺕﻮﺑ -------\n\u001b[38;5;220m> \x1b[32mﺭﺍﺪﺻﺇ: \x1b[37m1.0\n\u001b[38;5;220m> \x1b[32mﺕﻮﺒﻟﺍ ﺔﻟﺎﺣ: \x1b[37m\x1b[7mﻞﺼﺘﻣ\x1b[0m\n\u001b[38;5;220m------- ﺩﺭﻮﻜﺴﻳﺪﻠﻟ ﻞﺋﺎﺳﺭ ﻦﻋ ﻍﻼﺑﻹﺍ ﻡﺎﻈﻧ ﺕﻮﺑ -------\x1b[37m\n\x1b[44mﺮﺸﻨﻟﺍﻭ ﻒﻴﻟﺄﺘﻟﺍ ﻕﻮﻘﺣ:\x1b[0m  \x1b[4mﻰﻟﺇ ﺮﺸﻨﻟﺍ ﻕﻮﻘﺣ ﻊﻴﻤﺟ https://www.shuruhatik.xyz/\x1b[0m \u001b[0m`);
})

///All Copy Right Reserved For: Shuruhatik  in YT
client.login(process.env['token']);
