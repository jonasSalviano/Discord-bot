const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Pulando uma certa musica #")
        .addNumberOption((option) =>
            option.setName("tracknumber").setDescription("A musica esta pulando para").setMinValue(1).setRequired(true)),

    run: async ({ client, interction }) => {
        const queue = client.player.getQueue(interction.guildId)

        if (!queue) return await interaction.editReply("Sem musicas na fila")

        const trackNum = interction.options.getNumber("tracknumber")
        if (trackNum > queue.track.length)
            return await interction.options.editReply("Numero da musica invalido")

        queue.skipTo(trackNum - 1)

        await interction.editReply(`Pulado para a musica ${trackNum}`)
    },
}