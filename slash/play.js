const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Carregando musica do Youtube")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("musica")
                .setDescription("Carregando a musica da url")
                .addStringOption((option) => option.setName("url").setDescription("A musica da url").setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("playlist")
                .setDescription("Carregando a playlist de musica da url")
                .addStringOption((option) => option.setName("url").setDescription("playlist da url").setRequired(true))

        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("search")
                .setDescription("Procurando a musica")
                .addStringOption((option) => option.setName("searchterms").setDescription("procurando...").setRequired(true))
        ),
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel)
            return interaction.editReply("Vc precisa estar em um canal de voz para usar o comando")

        const queue = await client.player.createQueue(interaction.guild)
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)

        let embed = new MessageEmbed()

        if (interaction.options.getSubcommand() == "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.lenght === 0)
                return interaction.editReply("Sem resultado")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** foi adicionado na fila`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}` })

        } else if (interaction.options.getSubcommand() == "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if (result.tracks.lenght === 0)
                return interaction.editReply("Sem resultado")

            const playlist = result.playlist
            await queue.addTrack(result.tracks)
            embed
                .setDescription(`**${result.tracks.lenght} das musicas [${playlist.title}](${playlist.url})** foram adicionado na fila`)
                .setThumbnail(playlist.thumbnail)

        } else if (interaction.options.getSubcommand() == "search") {
            let url = interaction.options.getString("searchterms")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.lenght === 0)
                return interaction.editReply("Sem resultado")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** foi adicionado na fila`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}` })
        }
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
    }


}