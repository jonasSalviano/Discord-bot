const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pausando a musica"),

    run: async ({ client, interction }) => {
        const queue = client.player.getQueue(interction.guildId)

        if (!queue)
            return await interaction.editReply("Sem musicas na fila")

        queue.setPaused(true)
        await interction.editReply("A musica esta pausada! Use o `/resume` para retomar a musica")
    },
}