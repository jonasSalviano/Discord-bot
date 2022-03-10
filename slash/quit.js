const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("quit")
        .setDescription("Pare o bot e limpe a fila"),

    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
            return await interaction.editReply("Sem musicas na fila")

        queue.destroy()
        await interction.editReply("Eu irei voltar algum dia")
    },
}