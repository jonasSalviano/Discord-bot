const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Pulando a musica atual"),

    run: async ({ client, interction }) => {
        const queue = client.player.getQueue(interction.guildId)

        if (!queue) return await interaction.editReply("Sem musicas na fila")


        const currentSong = queue.current
        queue.skip()
        await interction.editReply({
            embeds: [new MessageEmbed()
                .setDescription(`${currentSong.title} foi pulado`)
                .setThumbnail(currentSong.thumbnail)

            ]
        })
    },
}