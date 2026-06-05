import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';

export default function App() {
  
  // guardar dados da tela ---
  const [tela, setTela] = useState('Login'); 

  // dados da tela de entrar
  const [userEmail, setUserEmail] = useState('');
  const [userSenha, setUserSenha] = useState('');

  // divisão do treino 
  const [divisaoTreino, setDivisaoTreino] = useState('A');

  // banco de dados dos treinos
  const treinosFicha = {
    A: [
      { id: '1', exercicio: 'Supino Reto com Barra', series: '4x10', carga: '25kg cada lado' },
      { id: '2', exercicio: 'Crucifixo Inclinado', series: '3x12', carga: '14kg' },
      { id: '3', exercicio: 'Desenvolvimento Ombros', series: '4x10', carga: '12kg' },
      { id: '4', exercicio: 'Tríceps Pulley Corda', series: '4x12', carga: '30kg' }
    ],
    B: [
      { id: '1', exercicio: 'Puxada Alta na Polia', series: '4x10', carga: '50kg' },
      { id: '2', exercicio: 'Remada Baixa Sentado', series: '3x12', carga: '45kg' },
      { id: '3', exercicio: 'Rosca Direta com Barra W', series: '4x10', carga: '10kg cada lado' },
      { id: '4', exercicio: 'Rosca Martelo Halteres', series: '3x12', carga: '12kg' }
    ],
    C: [
      { id: '1', exercicio: 'Agachamento Livre', series: '4x10', carga: '30kg cada lado' },
      { id: '2', exercicio: 'Cadeira Extensora', series: '4x12', carga: '45kg' },
      { id: '3', exercicio: 'Leg Press 45°', series: '3x15', carga: '140kg' },
      { id: '4', exercicio: 'Elevação Lateral Ombros', series: '4x12', carga: '10kg' }
    ]
  };

  // agendar avaliacao fisica
  const [tipoAvaliacao, setTipoAvaliacao] = useState('');
  const [diaAgendado, setDiaAgendado] = useState('');
  const [listaAgendamentos, setListaAgendamentos] = useState([
    { id: '1', tipo: 'Avaliação Bioimpedância', quando: '12/10/2026' }
  ]);

  // aniversariantes do mes
  const [aniversariantes, setAniversariantes] = useState([
    { id: '1', nome: 'Carlos Augusto (Treinador)', dia: '05 de Junho', icone: '🎂' },
    { id: '2', nome: 'Mariana Silva', dia: '12 de Junho', icone: '🎈' },
    { id: '3', nome: 'Ricardo Souza', dia: '19 de Junho', icone: '🎉' },
    { id: '4', nome: 'Beatriz Santos', dia: '26 de Junho', icone: '🥳' }
  ]);

  // mensalidades da academia
  const [minhasMensalidades, setMinhasMensalidades] = useState([
    { id: '1', mes: 'Maio/2026', preco: 'R$ 110,00', pago: true, cor: '#064e3b' }, 
    { id: '2', mes: 'Junho/2026', preco: 'R$ 110,00', pago: false, cor: 'orange' },
    { id: '3', mes: 'Julho/2026', preco: 'R$ 110,00', pago: false, cor: 'orange' }
  ]);

  // -funcionalidades do app ---

  const logar = () => {
    if (userEmail === '' || userSenha === '') {
      Alert.alert('Aviso', 'Preencha o e-mail e a senha!');
    } else {
      setTela('Home'); 
    }
  };

  const deslogar = () => {
    setUserSenha(''); 
    setTela('Login'); 
  };

  const salvarAgendamento = () => {
    if (tipoAvaliacao === '' || diaAgendado === '') {
      Alert.alert('Erro', 'Escolha o tipo de avaliação e coloque a data!');
      return;
    }
    const novoAgendamento = { id: Date.now().toString(), tipo: tipoAvaliacao, quando: diaAgendado };
    setListaAgendamentos([...listaAgendamentos, novoAgendamento]);
    setDiaAgendado('');
    Alert.alert('Sucesso', 'Sua avaliação foi marcada com o instrutor!');
  };

  const copiarCodigoBoleto = (mesBoleto) => {
    Alert.alert('Copiado', `Código da mensalidade de ${mesBoleto} copiado para o seu teclado!`);
  };

  const obterFocoTreino = () => {
    if (divisaoTreino === 'A') return 'Foco: Peito, Ombros e Tríceps';
    if (divisaoTreino === 'B') return 'Foco: Costas, Bíceps e Antebraço';
    if (divisaoTreino === 'C') return 'Foco: Pernas Completas e Panturrilha';
    return '';
  };

  // personalização de cada tela

  // TELA 1: LOGIN
  const TelaDeLogin = () => (
    <View style={styles.telaCentro}>
      <Text style={styles.logoApp}>💪 TrainingEasy</Text>
      <Text style={styles.textoInstrucao}>Digite seus dados para treinar</Text>
      <TextInput style={styles.caixaTexto} placeholder="E-mail do Aluno" value={userEmail} onChangeText={setUserEmail} keyboardType="email-address" />
      <TextInput style={styles.caixaTexto} placeholder="Sua senha" value={userSenha} onChangeText={setUserSenha} secureTextEntry={true} />
      <TouchableOpacity style={styles.btnVerdeEscuro} onPress={logar}>
        <Text style={styles.textoBtn}>Entrar no App</Text>
      </TouchableOpacity>
    </View>
  );

  // TELA 2: HOME / MURAL
  const TelaHome = () => (
    <View style={styles.telaCentro}>
      <Text style={styles.tituloSecao}>Mural da Academia</Text>
      <View style={styles.blocoAviso}>
        <Text style={styles.textoAvisoTitulo}>📣 Horário do Feriado</Text>
        <Text style={styles.textoAvisoCorpo}>Nesta próxima sexta-feira a academia funcionará em horário especial, das 08h às 13h. Não haverá aula de spinning.</Text>
      </View>
      <View style={styles.blocoAviso}>
        <Text style={styles.textoAvisoTitulo}>👟 Uso de Toalha Obrigatório</Text>
        <Text style={styles.textoAvisoCorpo}>Por motivos de higiene, lembramos que é obrigatório o uso de toalha individual e a higienização dos aparelhos após o uso.</Text>
      </View>
    </View>
  );

  // TELA 3: MEU TREINO
  const TelaMeuTreino = () => (
    <View style={styles.telaCentro}>
      <Text style={styles.tituloSecao}>Ficha de Treino Diária</Text>
      <Text style={styles.textoSimples}>Selecione a sua ficha de hoje:</Text>
      
      <View style={styles.linhaBotoes}>
        {['A', 'B', 'C'].map((letra) => (
          <TouchableOpacity 
            key={letra} 
            style={[styles.btnSelecao, divisaoTreino === letra && styles.btnSelecaoAtivo]} 
            onPress={() => setDivisaoTreino(letra)}
          >
            <Text style={divisaoTreino === letra ? styles.txtOpcaoAtiva : styles.txtOpcaoInativa}>Treino {letra}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.textoFocoTreino}>{obterFocoTreino()}</Text>

      <FlatList
        data={treinosFicha[divisaoTreino]}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.cardTreino}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#222' }}>{item.exercicio}</Text>
              <Text style={{ color: '#666', fontSize: 13, marginTop: 2 }}>Séries: {item.series}</Text>
            </View>
            <Text style={styles.tagCarga}>{item.carga}</Text>
          </View>
        )}
      />
    </View>
  );

  // TELA 4: AVALIAÇÃO FISICA
  const TelaAgendamentos = () => (
    <View style={styles.telaCentro}>
      <Text style={styles.tituloSecao}>Marcar Avaliação Física</Text>
      <Text style={styles.textoSimples}>Selecione o tipo de exame:</Text>
      <View style={styles.linhaBotoes}>
        {['Bioimpedância', 'Completa', 'Retorno'].map((item) => (
          <TouchableOpacity 
            key={item} 
            style={[styles.btnSelecao, tipoAvaliacao === item && styles.btnSelecaoAtivo]} 
            onPress={() => setTipoAvaliacao(item)}
          >
            <Text style={tipoAvaliacao === item ? styles.txtOpcaoAtiva : styles.txtOpcaoInativa}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput style={styles.caixaTexto} placeholder="Data desejada (ex: 15/07/2026)" value={diaAgendado} onChangeText={setDiaAgendado} />
      <TouchableOpacity style={styles.btnVerdeEscuro} onPress={salvarAgendamento}>
        <Text style={styles.textoBtn}>Agendar com Instrutor</Text>
      </TouchableOpacity>
    </View>
  );

  // TELA 5: ANIVERSARIANTES DO MÊS
  const TelaAniversariantes = () => (
    <View style={styles.telaCentro}>
      <Text style={styles.tituloSecao}>Aniversariantes do Mês</Text>
      <Text style={styles.textoSimples}>Deixe os parabéns para a galera de Junho:</Text>
      <FlatList
        data={aniversariantes}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.cardAniversariante}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>{item.icone}</Text>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#222' }}>{item.nome}</Text>
              <Text style={{ color: '#666', fontSize: 13 }}>Data: {item.dia}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );

  // TELA 6: MENSALIDADES
  const TelaFinanceiro = () => (
    <View style={styles.telaCentro}>
      <Text style={styles.tituloSecao}>Minhas Mensalidades</Text>
      <Text style={styles.textoSimples}>Histórico de pagamentos:</Text>
      <FlatList
        data={minhasMensalidades}
        keyExtractor={(item) => item.id}
        style={{ width: '100%' }}
        renderItem={({ item }) => (
          <View style={styles.cardBoleto}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{item.mes}</Text>
              <Text style={{ color: '#555' }}>Valor do Plano: {item.preco}</Text>
              <Text>Status: <Text style={{ color: item.cor, fontWeight: 'bold' }}>{item.pago ? 'Pago' : 'Pendente'}</Text></Text>
            </View>
            {!item.pago && (
              <TouchableOpacity style={styles.btnCinza} onPress={() => copiarCodigoBoleto(item.mes)}>
                <Text style={styles.txtBtnCinza}>Copiar Cód.</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );

  const roteadorTelas = () => {
    if (tela === 'Login') return <TelaDeLogin />;
    if (tela === 'Home') return <TelaHome />;
    if (tela === 'Treino') return <TelaMeuTreino />; 
    if (tela === 'Reserva') return <TelaAgendamentos />;
    if (tela === 'Aniversariantes') return <TelaAniversariantes />;
    if (tela === 'Boletos') return <TelaFinanceiro />;
    return <TelaDeLogin />;
  };

  return (
    <View style={styles.telaFundo}>
      
      {/* Barra superior-parte de cima da pagina */}
      {tela !== 'Login' && (
        <View style={styles.barraTopo}>
          <Text style={styles.textoTopoApp}>💪 TrainingEasy</Text>
          <TouchableOpacity style={styles.btnSair} onPress={deslogar}>
            <Text style={styles.txtSair}>Sair</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.visorPrincipal}>
        {roteadorTelas()}
      </View>

      {/* Menu de baixo */}
      {tela !== 'Login' && (
        <View style={styles.menuInferior}>
          <TouchableOpacity style={styles.btnMenu} onPress={() => setTela('Home')}>
            <Text style={tela === 'Home' ? styles.menuTxtAtivo : styles.menuTxtInativo}>Mural</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMenu} onPress={() => setTela('Treino')}>
            <Text style={tela === 'Treino' ? styles.menuTxtAtivo : styles.menuTxtInativo}>Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMenu} onPress={() => setTela('Reserva')}>
            <Text style={tela === 'Reserva' ? styles.menuTxtAtivo : styles.menuTxtInativo}>Avaliação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMenu} onPress={() => setTela('Aniversariantes')}>
            <Text style={tela === 'Aniversariantes' ? styles.menuTxtAtivo : styles.menuTxtInativo}>Niver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnMenu} onPress={() => setTela('Boletos')}>
            <Text style={tela === 'Boletos' ? styles.menuTxtAtivo : styles.menuTxtInativo}>Planos</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// CSS do app 
const styles = StyleSheet.create({
  telaFundo: { flex: 1, backgroundColor: '#eeeeee', paddingTop: 35 },
  barraTopo: { height: 50, backgroundColor: '#064e3b', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 },
  textoTopoApp: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  btnSair: { backgroundColor: '#d9534f', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 4 },
  txtSair: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  visorPrincipal: { flex: 1, padding: 15, justifyContent: 'center' },
  telaCentro: { flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' },
  logoApp: { fontSize: 30, fontWeight: 'bold', color: '#064e3b', marginBottom: 5 },
  tituloSecao: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 15, alignSelf: 'flex-start' },
  textoInstrucao: { fontSize: 15, color: '#666', marginBottom: 20 },
  textoSimples: { fontSize: 14, color: '#333', alignSelf: 'flex-start', marginBottom: 8 },
  caixaTexto: { backgroundColor: '#fff', width: '100%', padding: 12, borderRadius: 6, borderColor: '#ccc', borderWidth: 1, marginBottom: 10 },
  btnVerdeEscuro: { backgroundColor: '#064e3b', padding: 12, borderRadius: 6, alignItems: 'center', width: '100%', marginTop: 5 },
  textoBtn: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  blocoAviso: { backgroundColor: '#fff', padding: 14, borderRadius: 8, width: '100%', marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#064e3b' },
  textoAvisoTitulo: { fontSize: 15, fontWeight: 'bold', color: '#064e3b', marginBottom: 4 },
  textoAvisoCorpo: { fontSize: 13, color: '#444' },
  linhaBotoes: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  btnSelecao: { flex: 1, padding: 10, backgroundColor: '#ddd', borderRadius: 6, alignItems: 'center', marginHorizontal: 2 },
  btnSelecaoAtivo: { backgroundColor: '#064e3b' },
  txtOpcaoAtiva: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  txtOpcaoInativo: { color: '#333', fontSize: 12 },
  menuInferior: { flexDirection: 'row', height: 60, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' },
  btnMenu: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  menuTxtAtivo: { color: '#064e3b', fontWeight: 'bold', fontSize: 10 },
  menuTxtInativo: { color: '#777', fontSize: 10 },
  cardBoleto: { backgroundColor: '#fff', padding: 12, borderRadius: 6, marginVertical: 5, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  btnCinza: { backgroundColor: '#555', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 4 },
  txtBtnCinza: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  cardAniversariante: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginVertical: 5, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center', width: '100%' },
  cardTreino: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginVertical: 6, borderWidth: 1, borderColor: '#ddd', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  tagCarga: { backgroundColor: '#f0fdf4', color: '#064e3b', fontWeight: 'bold', fontSize: 12, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: '#bbf7d0', textAlign: 'center' },
  textoFocoTreino: { fontSize: 14, fontWeight: 'bold', color: '#064e3b', alignSelf: 'flex-start', marginBottom: 10, backgroundColor: '#f0fdf4', padding: 8, borderRadius: 4, width: '100%', borderWidth: 1, borderColor: '#bbf7d0' }
});