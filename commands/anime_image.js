const { SlashCommandBuilder } = require('@discordjs/builders'), { MessageEmbed } = require('discord.js');
const {language} = require('../config.json'), lang = require('../languages/' + language + '.json')
const wait = require('node:timers/promises').setTimeout;
const API = require('anime-images-api')
const images = new API() 
module.exports = {
    cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('anime_image')
		.setDescription('Pictures from anime-images')
        .addSubcommand(subcommand => subcommand
            .setName('sfw')
            .setDescription("Get a random SFW image")
            .addStringOption(option => option.setName("category")
                .setDescription("Choose from a list of categories")
                .addChoice('hug', 'hug')
                .addChoice('kiss', 'kiss')
                .addChoice('slap', 'slap')
                .addChoice('punch', 'punch')
                .addChoice('wink', 'wink')
                .addChoice('pat', 'pat')
                .addChoice('kill', 'kill')
                .addChoice('cuddle', 'cuddle')
                .addChoice('waifu', 'waifu')
                .setRequired(true))
            .addUserOption(option => option.setName('target').setDescription('Select a user'))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        ).addSubcommand(subcommand => subcommand
            .setName('nsfw')
            .setDescription("Get a random NSFW image")
            .addStringOption(option => option.setName("category")
                .setDescription("Choose from a list of categories")
                .addChoice('hentai', 'hentai')
                .addChoice('boobs', 'boobs')
                .addChoice('lesbian', 'lesbian')
                .setRequired(true))
            .addNumberOption(option => option.setName('repeat').setDescription(lang.amount).setMinValue(1).setMaxValue(10))
        ),
	async execute(interaction, client) {
        try {
            const type = interaction.options.getSubcommand();
            const category = interaction.options.getString('category');
            const enableNSFW = client.settings.get(interaction.guild.id, "enableNSFW");
            if (type=="sfw") { }
            else { if(enableNSFW) { if (!interaction.channel.nsfw && interaction.channel.type === 'GUILD_TEXT') { return interaction.reply(lang.nsfw)} } else {return interaction.reply(lang.nsfwdisable)}  }
            if (interaction.options.getNumber('repeat')) { var amount = Number(interaction.options.getNumber('repeat')) } else var amount = 1
            await interaction.reply("Anime images []~(?????????)~*")
            for (let a = 0; a < amount; a++ ) {
                if (category === 'hug') {img = await images.sfw.hug()}
                if (category === 'kiss') {img = await images.sfw.kiss()}
                if (category === 'slap') {img = await images.sfw.slap()}
                if (category === 'punch') {img = await images.sfw.punch()}
                if (category === 'wink') {img = await images.sfw.wink()}
                if (category === 'pat') {img = await images.sfw.pat()}
                if (category === 'kill') {img = await images.sfw.kill()}
                if (category === 'cuddle') {img = await images.sfw.cuddle()}
                if (category === 'waifu') {img = await images.sfw.waifu()}
                if (category === 'hentai') {img = await images.nsfw.hentai()}
                if (category === 'boobs') {img = await images.nsfw.boobs()}
                if (category === 'lesbian') {img = await images.nsfw.lesbian()}
                console.log(img)
                const embed = new MessageEmbed()
                    .setImage(img.image)
                    .setFooter({text: `${category} - ${a+1}/${amount}`})
                if (interaction.options.getUser('target')) {
                    const user = interaction.options.getUser('target'), from = interaction.user
                    embed.setDescription(from.toString() + " sends you a nice " + category + ", " + user.toString() + ". :3")
                    await interaction.followUp({ content: user.toString(), embeds: [embed]})
                } else {
                    await interaction.followUp({ embeds: [embed]})
                }
                await wait(1000);
            }
        }catch(error) {
            console.log(error)
        }
    }
};