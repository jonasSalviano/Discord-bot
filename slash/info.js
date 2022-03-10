const { SlashCommandBuilder } = require("@discordjs/builders")
const {MessageEmbed} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Mostrando informações sobre a musica atual"),

    run: async ({ client, interction }) => {
        const queue = client.player.getQueue(interction.guildId)

        if (!queue) return await interaction.editReply("Sem musicas na fila")

        let bar = queue.createProgressBar({
            queue: false,
            length:19
        })

        const song = queue.current

        await interction.editReply({
            embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)
                ,setDescription(`Tocando agora [${song.tittle}](${song.url})\n\n` + bar)
            ]
        })
    },
}