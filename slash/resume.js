const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Retomando a musica"),

    run: async ({ client, interction }) => {
        const queue = client.player.getQueue(interction.guildId)

        if (!queue)
            return await interaction.editReply("Sem musicas na fila")

        queue.setPaused(false)
        await interction.editReply("A musica foi retomada! Use o `/pause` para pausar a musica")
    },
}