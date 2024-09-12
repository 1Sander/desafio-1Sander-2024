class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, ocupados: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, ocupados: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, ocupados: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, ocupados: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, ocupados: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        const especies = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnívoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnívoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnívoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnívoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnívoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnívoro: false }
        };

        if (!especies[animal]) {
            return { erro: 'Animal inválido', recintosViaveis: false };
        }

        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida', recintosViaveis: false };
        }

        const biomaAnimal = especies[animal].bioma;
        const tamanhoAnimal = especies[animal].tamanho;
        let recintosViaveis = [];

        for (const recinto of recintos) {
            const biomasRecinto = recinto.bioma.split(' e ');

            let compatívelBioma;
            if (animal === 'CROCODILO') {
                compatívelBioma = biomasRecinto.length === 1 && biomasRecinto[0] === 'rio';
            } else {
                compatívelBioma = biomasRecinto.some(bioma => biomaAnimal.includes(bioma));
            }

            if (!compatívelBioma) continue;

            let espacoOcupado = recinto.ocupados.reduce((total, ocupante) =>
                total + (ocupante.quantidade * especies[ocupante.especie].tamanho), 0);

            let espacoExtra = 0;

            if (recinto.ocupados.length > 1) {
                espacoExtra = 1; 
            } else if (recinto.ocupados.length === 1 && recinto.ocupados[0].especie !== animal) {
                espacoExtra = 1; // Considera espaço extra se a espécie for diferente
            }

            // Verifica se o recinto tem animais carnívoros de outras espécies
            const recintoHostil = recinto.ocupados.some(ocupante => {
                const especieOcupante = especies[ocupante.especie];
                return especieOcupante.carnívoro && especieOcupante !== especies[animal];
            });
            if (recintoHostil) continue;

            // Caso especial dos macacos: se já houver macacos, não precisa de espaço extra
            if (animal === 'MACACO' && recinto.ocupados.some(o => o.especie === 'MACACO')) {
                espacoExtra = 0;
            }

            // Caso especial dos hipopótamos: só dividem recinto em savana e rio
            if (animal === 'HIPOPOTAMO' && recinto.ocupados.length > 0) {
                if (!biomasRecinto.includes('savana') || !biomasRecinto.includes('rio')) {
                    continue;
                }
            }

            let espacoDisponivel = recinto.tamanho - espacoOcupado - espacoExtra;

            if (espacoDisponivel >= tamanhoAnimal * quantidade) {
                recintosViaveis.push({
                    numero: recinto.numero,
                    espacoLivre: espacoDisponivel - (tamanhoAnimal * quantidade),
                    espacoTotal: recinto.tamanho
                });
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável', recintosViaveis: false };
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        const resultado = recintosViaveis.map(r =>
            `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`);

        return { erro: false, recintosViaveis: resultado };
    }
}

export { RecintosZoo as RecintosZoo };
