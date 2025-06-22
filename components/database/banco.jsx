import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

export async function abrirBanco() {
    const db = await SQLite.openDatabaseAsync('geral');
    return db;
}

export async function criarBanco() {
    const banco = await abrirBanco();
    
    
    const resultReunioes = await banco.runAsync(`
        CREATE TABLE IF NOT EXISTS reunioes (
            id TEXT PRIMARY KEY,
            numero TEXT NOT NULL,
            grau TEXT NOT NULL,
            data TEXT NOT NULL,
            local TEXT NOT NULL,
            horario_inicio TEXT NOT NULL,
            horario_fim TEXT NOT NULL,
            topicos TEXT,
            observacoes TEXT,
            membros_participantes TEXT NOT NULL
        );
    `);
    console.log("Reuniões", resultReunioes.changes);

    
    const resultMembros = await banco.runAsync(`
        CREATE TABLE IF NOT EXISTS membros (
            id TEXT PRIMARY KEY,
            nome TEXT NOT NULL,
            numero TEXT NOT NULL,
            frequencia INTEGER,
            grau TEXT NOT NULL,
            status TEXT
        );
    `);
    console.log("Membros", resultMembros.changes);
}

export async function excluirBanco() {
    await SQLite.deleteDatabaseAsync('geral');
}

export async function inserirReuniao(data, numero, grau, local, horarioInicio, horarioFim, topicos, observacoes, membrosParticipantes) {
    
    let id = uuid.v4();
    const banco = await abrirBanco();
    const dados = await banco.runAsync(`
        INSERT INTO reunioes (id, numero, grau, data, local, horario_inicio, horario_fim, topicos, observacoes, membros_participantes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [id, numero, grau, data, local, horarioInicio, horarioFim, topicos, observacoes, membrosParticipantes]
    );
    console.log("Reuniao criada", id);
    
    return id;
}

export async function atualizarReuniao(id, numero, grau, data, local, horarioInicio, horarioFim, topicos, observacoes, membrosParticipantes) {
    const banco = await abrirBanco();
    const dados = await banco.runAsync(`
        UPDATE reunioes 
        SET numero = ?, grau = ?, data = ?, local = ?, horario_inicio = ?, horario_fim = ?, topicos = ?, observacoes = ?, membros_participantes = ?
        WHERE id = ?`, 
        [numero, grau, data, local, horarioInicio, horarioFim, topicos, observacoes, membrosParticipantes, id]
    );
    console.log(dados.changes);
    return true;
}

export async function listarReunioes() {
    const banco = await abrirBanco();
    const reunioes = await banco.getAllAsync(`
    SELECT
      id,
      numero,
      grau,
      data,
      local,
      horario_inicio  AS horarioInicio,
      horario_fim     AS horarioFim,
      topicos,
      observacoes,
      membros_participantes AS membrosParticipantes
    FROM reunioes
  `);
    return reunioes;
}

export async function excluirReuniao(id) {
    const banco = await abrirBanco();
    const dados = await banco.runAsync("DELETE FROM reunioes WHERE id = ?", [id]);
    console.log("excluirReuniao", dados.changes);
    return dados.changes;
}

export async function inserirMembro(nome, numero, frequencia, grau, status) {
    
    let id = uuid.v4();
    const banco = await abrirBanco();
    const dados = await banco.runAsync(`
        INSERT INTO membros (id, nome, numero, frequencia, grau, status)
        VALUES (?, ?, ?, ?, ?, ?)`, 
        [id, nome, numero, frequencia, grau, status]
    );
    return id;
}

export async function atualizarMembro(id, nome, numero, grau, status) {
    console.log("Chegou", numero)
    const banco = await abrirBanco();
    const dados = await banco.runAsync(`
        UPDATE membros 
        SET nome = ?, numero = ?, grau = ?, status = ?
        WHERE id = ?`, 
        [nome, numero, grau, status, id]
    );
    console.log(dados.changes);
    return true;
}

export async function listarMembros() {
    const banco = await abrirBanco();
    const membros = await banco.getAllAsync("SELECT * FROM membros");
    return membros;
}

export async function excluirMembro(id) {
    const banco = await abrirBanco();
    const dados = await banco.runAsync("DELETE FROM membros WHERE id = ?", [id]);
    console.log("excluirMembro", dados.changes);
    return dados.changes;
}
