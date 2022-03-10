const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Fila aleatoria"),

    run: async ({ client, interction }) => {
        const queue = client.player.getQueue(interction.guildId)

        if (!queue)
            return await interaction.editReply("Sem musicas na fila")

        queue.shuffle()
        await interction.editReply(`A fila ${queue.tracks.length} esta aleatoria`)
    },
}