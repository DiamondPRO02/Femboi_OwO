const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const sl = lang.info.slash.split('-'), us = lang.info.user.split('-'), s1 = lang.info.server1.split('-'), s2 = lang.info.server2.split('-')
module.exports = {
    guildOnly: true,
    cooldown: 10,
	data: new SlashCommandBuilder()
        .setName('info')
        .setDescription(sl[0])
        .addSubcommand(subcommand => subcommand.setName('user').setDescription(sl[1])
            .addUserOption(option => option.setName('target').setDescription(sl[2]).setRequired(true)))
        .addSubcommand(subcommand => subcommand.setName('server').setDescription(sl[3]))
        .addSubcommand(subcommand => subcommand.setName('server_cheat').setDescription(sl[4])),
    async execute(interaction) {
        const page = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId('delete').setLabel(lang.d).setStyle('DANGER').setEmoji('✖️')
            )
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', filter, time: 10000 });
        collector.on('collect', async i => { await interaction.deleteReply(); collector.stop()})
        //User, server, cheatsheet
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');
            const profilepic = user.displayAvatarURL();
            const usertime = new Date(user.createdTimestamp).toLocaleString();
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle(us[0])
                .setThumbnail(profilepic)
                .setDescription(us[1] + interaction.user.tag)
                .setAuthor({ name: user.tag, iconURL: profilepic })
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
                .addFields(
                    {name: us[2], value: user.username, inline:true},
                    {name: "Tag:", value: user.tag, inline:true},
                    {name: "Bot?", value: (user.bot ? lang.t : lang.f)}
                )
                .addFields(
                    {name: us[3], value: String(usertime), inline:true},
                    {name: "**"+us[4]+"**", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline:true},
                    {name: us[5], value: String(user.id), inline:true},
                )
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getSubcommand() === 'server') {
            const owner = await interaction.guild.fetchOwner(); 
            const afktime = String(interaction.guild.afkTimeout % 60)
            const servertime = new Date(interaction.guild.createdTimestamp).toLocaleString();
            const botservertime = new Date(interaction.guild.joinedTimestamp).toLocaleString();
            const embed = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle(s1[0])
                .setThumbnail(interaction.guild.iconURL())
                .setDescription( s1[1] + interaction.user.tag)
                .setURL('https://discord.gg/CCXgVGTnSh')
                .setAuthor({ name: 'Femboy_OwO: ', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096', url: 'https://github.com/DiamondPRO02/Femboi_OwO' })
                .setTimestamp()
                .setFooter({ text: 'FembOwO#3146', iconURL: 'https://cdn.discordapp.com/avatars/893200883763011594/e95fdc60fb38bb1a44e218c9d43de7e9.png?size=4096' })
                .addField(s1[2],  interaction.guild.name + `\n(${interaction.guild.nameAcronym})`, true)
                .addField(s1[3],  String(owner.user.tag), true)
                .addField(s1[4],  `${interaction.guild.memberCount} / ` + interaction.guild.maximumMembers, true)
                .addField(s1[5], `<t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:R>`, true)
                .addField(s1[6],  (interaction.guild.large ? lang.t : lang.f), true)
                .addField(s1[7],  String(interaction.guild.id), true)
                .addField(s1[9],  String(interaction.guild.description))
                .addField(s1[10],  `${interaction.guild.premiumSubscriptionCount} / ` + String(interaction.guild.premiumTier), true)
                .addField(s1[11],  (interaction.guild.premiumProgressBarEnabled ? lang.t : lang.f), true)
                .addField(s1[12],  servertime)
                .addField('Bot:',  String(interaction.guild.me), true)
                .addField(s1[13],  botservertime, true)
                .addField('\u200B', '\u200B', true)
                .addField(s2[0],  String(interaction.guild.publicUpdatesChannel), true)
                .addField(s2[1],  String(interaction.guild.rulesChannel), true)
                .addField(s2[2],  `${interaction.guild.systemChannel}`, true)
                .addField(s2[3],  String(interaction.guild.afkChannel), true)
                .addField(s2[4],  `${interaction.guild.maximumBitrate}`, true)
                .addField(s2[5],  afktime, true)
                .addField(s2[6],  `${interaction.guild.explicitContentFilter}`, true)
                .addField(s2[7],  `${interaction.guild.mfaLevel} / ` + String(interaction.guild.nsfwLevel), true)
                .addField(s2[8],  String(interaction.guild.verificationLevel), true)
                .addField(s2[9],  String(interaction.guild.preferredLocale), true)
                .addField(s2[10],  (interaction.guild.verified ? lang.t : lang.f), true)
                .addField(s2[11],  (interaction.guild.partnered ? lang.t : lang.f), true)
            await interaction.reply({embeds: [embed], components: [page]})
        } else if (interaction.options.getSubcommand() === 'server_cheat') {
            const embedtest1 = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle(sl[4])
                .setDescription(`(Max25 field per embed) 1/?`)
                .addField('01 afkChannel(VoiceChannel)', String(interaction.guild.afkChannel), true)
                .addField('02 afkTimeout(number)',  String(interaction.guild.afkTimeout), true)
                .addField('03 available(boolean)',  (interaction.guild.available ? lang.t : lang.f), true)
                .addField('04 createdAt(date)',  String(interaction.guild.createdAt), true)
                .addField('05 createdTimestamp(number)',  String(interaction.guild.createdTimestamp), true)
                .addField('06 description',  String(interaction.guild.description), true)
                .addField('07 explicitContentFilter(explicitContentFilterLevel)', String(interaction.guild.explicitContentFilter), true)
                .addField('08 features (array)',  String(interaction.guild.features), true)
                .addField('09 id(snowflake)',  String(interaction.guild.id), true)
                .addField('10 joinedAt(date)[The time the client user joined guild]',  String(interaction.guild.joinedAt), true)
                .addField('11 joinedTimestamp(number)[The stamp the client user joined guild]',  String(interaction.guild.joinedTimestamp), true)
                .addField('12 large(boolean)',  (interaction.guild.large ? lang.t : lang.f), true)
                .addField('13 maximumBitrate(number)',  String(interaction.guild.maximumBitrate), true)
                .addField('14 maximumMembers(number)',  String(interaction.guild.maximumMembers), true)
                .addField('15 me(GuildMember)[The client user as a GuildMember of this guild]',  String(interaction.guild.me), true)
                .addField('16 memberCount(number)',  String(interaction.guild.memberCount), true)
                .addField('17 mfaLevel(MFALevel)',  String(interaction.guild.mfaLevel), true)
                .addField('18 name',  interaction.guild.name, true)
                .addField('19 nameAcronym()',  interaction.guild.nameAcronym, true)
                .addField('20 nsfwLevel(NSFWLevel)',  String(interaction.guild.nsfwLevel), true)
                .addField('21 partnered(boolean)',  (interaction.guild.partnered ? lang.t : lang.f), true)
                .addField('22 preferredLocale',  String(interaction.guild.preferredLocale), true)
                .addField("23 PremiumProgressBarEnabled(boolean)",  (interaction.guild.premiumProgressBarEnabled ? lang.t : lang.f), true)
                .addField("24 PremiumSubscriptionCount(number)",  String(interaction.guild.premiumSubscriptionCount), true)
                .addField("25 PremiumTier(PremiumTier)",  String(interaction.guild.premiumTier), true)
            const embedtest2 = new MessageEmbed()
                .setColor('#00FF00')
                .setTitle(sl[4])
                .setDescription(`(Max25 field per embed) 2/?`)
                .addField('26 Presences(PresenceManager)', String(interaction.guild.presences), true)
                .addField('27 PublicUpdatesChannel(TextChannel)', String(interaction.guild.publicUpdatesChannel), true)
                .addField('28 PublicUpdatesChannelId(snowflake)', String(interaction.guild.publicUpdatesChannelId), true)
                .addField('29 Roles(RoleManager)', String(interaction.guild.roles), true)
                .addField('30 RulesChannel(TextChannel)', String(interaction.guild.rulesChannel), true)
                .addField('31 ScheduledEvents(GuildScheduledEventManager)', String(interaction.guild.scheduledEvents), true)
                .addField('32 Shard(WebSocketShard)', String(interaction.guild.shard), true)
                .addField('33 ShardId(number)', String(interaction.guild.shardId), true)
                .addField('34 Splash', String(interaction.guild.splash), true)
                .addField('35 StageInstances(StageInstanceManager)', String(interaction.guild.stageInstances), true)
                .addField('36 Stickers(GuildStickerManager)', String(interaction.guild.stickers), true)
                .addField('37 SystemChannel(TextChannel)', String(interaction.guild.systemChannel), true)
                .addField('38 SystemChannelFlags(Type: Readonly<SystemChannelFlags>)', String(interaction.guild.systemChannelFlags), true)
                .addField('39 SystemChannelId(snowflake)', String(interaction.guild.systemChannelId), true)
                .addField('40 VanityURLCode', String(interaction.guild.vanityURLCode), true)
                .addField('41 VerificationLevel(VerificationLevel)', String(interaction.guild.verificationLevel), true)
                .addField('42 Verified(boolean)', (interaction.guild.verified ? lang.t : lang.f), true)
                .addField('43 VoiceAdapterCreator(Function)', String(interaction.guild.voiceAdapterCreator), true)
                .addField('44 VoiceStates(VoiceStateManager)', String(interaction.guild.voiceStates), true)
                .addField('45 WidgetChannel(TextChannel)', String(interaction.guild.widgetChannel), true)
                .addField('46 WidgetChannelId', String(interaction.guild.widgetChannelId), true)
                .addField('47 WidgetEnabled(boolean)', (interaction.guild.widgetEnabled ? lang.t : lang.f), true)
                .addField('-- OwnerId(snowflake)', String(interaction.guild.ownerId), true)
                .addField('-- Invites(GuildInviteManager)', String(interaction.guild.invites), true)
            await interaction.reply({content: sl[4], embeds: [embedtest1, embedtest2], components: [page]})
        }
    }
}