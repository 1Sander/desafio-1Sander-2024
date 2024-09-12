import { RecintosZoo } from "./recintos-zoo.js";

    describe('Recintos do Zoologico', () => {
        test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('LEAO', 0);
            expect(resultado.erro).toBe('Quantidade inválida');
            expect(resultado.recintosViaveis).toBeFalsy();
        });
    
        test('Deve rejeitar bioma incompatível para o crocodilo', () => {
            const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
            expect(resultado.recintosViaveis[0]).toBe("Recinto 4 (espaço livre: 5 total: 8)");
            expect(resultado.recintosViaveis.length).toBe(1); 
        });
    
        test('Deve retornar erro quando não há recintos viáveis', () => {
            const zoo = new RecintosZoo();
            const resultado = zoo.analisaRecintos('LEAO', 5); 
            expect(resultado.erro).toBe('Não há recinto viável');
            expect(resultado.recintosViaveis).toBeFalsy();
        });
        

    });
    



