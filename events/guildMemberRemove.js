const { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json'), gmc = lang.guild_mem_create.split('-')
module.exports = {
	name: 'guildMemberRemove',
	execute(member, client) {
        //console.log(member)
        console.log(`[${new Date(member.joinedTimestamp).toLocaleString('hu-HU')}]${member.user.tag} has left the guild: ${member.guild.name}`)
        let goodbye = client.settings.get(member.guild.id, "goodbye");
        if(goodbye) {} else return
        const channel = member.guild.systemChannel
        if (channel === null) {return console.log(gmc[0] + member.guild.name)}
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setAuthor({ name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL() })
            .setDescription(`**${member.user.tag}**, has left the server.`)
            //.setThumbnail(member.user.displayAvatarURL())
            .setFooter({ text: `Member count: ${member.guild.memberCount+1} => ${member.guild.memberCount}` })
            .setTimestamp()
        channel.send({embeds: [embed]})
	}
};