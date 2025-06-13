async function enviarFormulario() {
  const form = document.getElementById('formulario');
  const formData = new FormData(form);
  const dados = {};

  formData.forEach((value, key) => {
    // Para checkbox: valor 'on' vira 'Sim'
    if (value === 'on') {
      dados[key] = 'Sim';
    } else {
      dados[key] = value;
    }
  });

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbziSPD8DYOHX5jTsh-TAF-B2lQmW8a4kASIn6rLr41Y4bY2bnvhBjbRvgtcGZGE5CN9/exec', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      alert('✅ Formulário enviado com sucesso!');
      form.reset(); // Limpa o formulário
    } else {
      alert('❌ Erro ao enviar o formulário. Por favor, tente novamente.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('❌ Erro de conexão. Verifique sua internet e tente novamente.');
  }
}
// <<<<<<< nai3ty-codex/criar-formulário-de-admissão-com-validação-e-envio-via-whats

// Busca dados de empresa pelo CNPJ usando API publica
async function buscarCNPJ() {
  const cnpjInput = document.getElementById('empresa_cnpj');
  const cnpj = cnpjInput.value.replace(/\D/g, '');
  if (cnpj.length !== 14) return;
  const url = `https://www.receitaws.com.br/v1/cnpj/${cnpj}`;
  const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  try {
    const resp = await fetch(proxy);
    const data = await resp.json();
    if (data.status === 'OK') {
      document.getElementById('empresa_nome').value = data.nome || '';
      const endereco = `${data.logradouro || ''}, ${data.numero || ''} ${data.bairro || ''} ${data.municipio || ''}-${data.uf || ''}`.trim();
      document.getElementById('empresa_endereco').value = endereco;
    }
  } catch (e) {
    console.error('Erro ao buscar CNPJ', e);
  }
}

document.getElementById('empresa_cnpj').addEventListener('blur', buscarCNPJ);

// Busca dados de endereco pelo CEP usando ViaCEP
async function buscarCEP() {
  const cepInput = document.getElementById('cep');
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) return;
  try {
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await resp.json();
    if (!data.erro) {
      document.getElementById('endereco_rua').value = data.logradouro || '';
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('cidade').value = data.localidade || '';
      document.getElementById('uf').value = data.uf || '';
    }
  } catch (e) {
    console.error('Erro ao buscar CEP', e);
  }
}

document.getElementById('cep').addEventListener('blur', buscarCEP);

// Replica horario de segunda para os demais dias
function replicarHorario() {
  const entrada = document.querySelector('input[name="horario_segunda_entrada"]').value;
  const intervalo = document.querySelector('input[name="horario_segunda_inicio_intervalo"]').value;
  const fim = document.querySelector('input[name="horario_segunda_fim_intervalo"]').value;
  const saida = document.querySelector('input[name="horario_segunda_saida"]').value;
  ['terca','quarta','quinta','sexta','sabado','domingo'].forEach(dia => {
    document.querySelector(`input[name="horario_${dia}_entrada"]`).value = entrada;
    document.querySelector(`input[name="horario_${dia}_inicio_intervalo"]`).value = intervalo;
    document.querySelector(`input[name="horario_${dia}_fim_intervalo"]`).value = fim;
    document.querySelector(`input[name="horario_${dia}_saida"]`).value = saida;
  });
}

document.getElementById('replicar_horario').addEventListener('click', replicarHorario);

// Dados de exemplo para preenchimento rapido
const dadosExemplo = {
  "Outros_Documentos": {
    "Numero_Titulo_Eleitor": "151656",
    "Zona_Eleitoral": "041",
    "Secao_Eleitoral": "181",
    "Numero_Carteira_Reservista": "4465413",
    "Numero_PIS": "94424100081",
    "CNH": "151654641"
  },
  "Endereco_Contato": {
    "CEP": "97110705",
    "Rua": "Rua Antônio Artur Colpo",
    "Numero": 428,
    "Bairro": "Camobi",
    "Cidade": "Santa Maria",
    "UF": "RS"
  },
  "Beneficios": {
    "Vale_Transporte": "Não",
    "Linha_Utilizada": "",
    "Quantidade_Passes_Diarios": "",
    "Valor_do_Passe": "",
    "Autorizacao_Desconto_6%": false,
    "Opcao_pelo_FGTS": true
  },
  "Informacoes_Adicionais": {
    "Cidade_de_Nascimento": "Santa Maria",
    "Escolaridade": "Superior Completo"
  },
  "Termo_Consentimento_LGPD": {
    "Autorizacao_Uso_Dados": true
  },
  "Dados_Pessoais": {
    "Nome_Completo": "Amanda Fogaça",
    "CPF": "94424100081",
    "RG": "358482859",
    "Data_de_Nascimento": "08/03/1995",
    "Estado_Civil": "Solteiro",
    "Filhos_Menores": "Ex.: 5, 7"
  },
  "Carteira_de_Trabalho_CTPS": {
    "Numero_CTPS": "010203",
    "Serie": "0010",
    "UF_CTPS": "RS"
  },
  "Dados_Contratuais": {
    "Data_Admissao": "14/07/2025",
    "Tipo_de_Contrato": "Experiência",
    "Cargo_Funcao": "contabilidade",
    "Salario": 5000,
    "Data_Termino": "",
    "Dias_de_Prova": 45
  },
  "Horario_Semanal": {
    "Segunda-feira": {"Entrada":"08:00","Intervalo":"12:00","Fim_Intervalo":"14:00","Saida":"18:00"},
    "Terca-feira": {"Entrada":"08:00","Intervalo":"12:00","Fim_Intervalo":"14:00","Saida":"18:00"},
    "Quarta-feira": {"Entrada":"08:00","Intervalo":"12:00","Fim_Intervalo":"14:00","Saida":"18:00"},
    "Quinta-feira": {"Entrada":"08:00","Intervalo":"12:00","Fim_Intervalo":"14:00","Saida":"18:00"},
    "Sexta-feira": {"Entrada":"08:00","Intervalo":"12:00","Fim_Intervalo":"14:00","Saida":"18:00"},
    "Sabado": {"Entrada":"00:00","Intervalo":"00:00","Fim_Intervalo":"00:00","Saida":"00:00"},
    "Domingo": {"Entrada":"00:00","Intervalo":"00:00","Fim_Intervalo":"00:00","Saida":"00:00"}
  }
};

function preencherComExemplo() {
  const d = dadosExemplo;
  document.getElementById('titulo_numero').value = d.Outros_Documentos.Numero_Titulo_Eleitor;
  document.getElementById('titulo_zona').value = d.Outros_Documentos.Zona_Eleitoral;
  document.getElementById('titulo_secao').value = d.Outros_Documentos.Secao_Eleitoral;
  document.getElementById('reservista_numero').value = d.Outros_Documentos.Numero_Carteira_Reservista;
  document.getElementById('pis').value = d.Outros_Documentos.Numero_PIS;
  document.getElementById('cnh').value = d.Outros_Documentos.CNH;

  document.getElementById('cep').value = d.Endereco_Contato.CEP;
  document.getElementById('endereco_rua').value = d.Endereco_Contato.Rua;
  document.getElementById('endereco_numero').value = d.Endereco_Contato.Numero;
  document.getElementById('bairro').value = d.Endereco_Contato.Bairro;
  document.getElementById('cidade').value = d.Endereco_Contato.Cidade;
  document.getElementById('uf').value = d.Endereco_Contato.UF;

  document.getElementById('vale_transporte').value = d.Beneficios.Vale_Transporte;
  document.getElementById('linha_transporte').value = d.Beneficios.Linha_Utilizada;
  document.getElementById('quantidade_passes').value = d.Beneficios.Quantidade_Passes_Diarios;
  document.getElementById('valor_passe').value = d.Beneficios.Valor_do_Passe;
  document.getElementById('desconto_vt').checked = d.Beneficios.Autorizacao_Desconto_6%;
  document.getElementById('fgts').checked = d.Beneficios.Opcao_pelo_FGTS;

  document.getElementById('cidade_nascimento').value = d.Informacoes_Adicionais.Cidade_de_Nascimento;
  document.getElementById('escolaridade').value = d.Informacoes_Adicionais.Escolaridade;
  document.getElementById('lgpd').checked = d.Termo_Consentimento_LGPD.Autorizacao_Uso_Dados;

  document.getElementById('nome').value = d.Dados_Pessoais.Nome_Completo;
  document.getElementById('cpf').value = d.Dados_Pessoais.CPF;
  document.getElementById('rg').value = d.Dados_Pessoais.RG;
  document.getElementById('data_nascimento').value = d.Dados_Pessoais.Data_de_Nascimento.split('/').reverse().join('-');
  document.getElementById('estado_civil').value = d.Dados_Pessoais.Estado_Civil;
  document.getElementById('filhos_menores').value = d.Dados_Pessoais.Filhos_Menores;

  document.getElementById('ctps_numero').value = d.Carteira_de_Trabalho_CTPS.Numero_CTPS;
  document.getElementById('ctps_serie').value = d.Carteira_de_Trabalho_CTPS.Serie;
  document.getElementById('ctps_uf').value = d.Carteira_de_Trabalho_CTPS.UF_CTPS;

  document.getElementById('data_admissao').value = d.Dados_Contratuais.Data_Admissao.split('/').reverse().join('-');
  document.getElementById('tipo_contrato').value = d.Dados_Contratuais.Tipo_de_Contrato;
  document.getElementById('cargo').value = d.Dados_Contratuais.Cargo_Funcao;
  document.getElementById('salario').value = d.Dados_Contratuais.Salario;
  document.getElementById('data_termino').value = d.Dados_Contratuais.Data_Termino;
  document.getElementById('prorrogacao').value = d.Dados_Contratuais.Dias_de_Prova;

  const h = d.Horario_Semanal;
  const dias = {
    'Segunda-feira':'segunda','Terca-feira':'terca','Quarta-feira':'quarta','Quinta-feira':'quinta','Sexta-feira':'sexta','Sabado':'sabado','Domingo':'domingo'
  };
  for (const dia in dias) {
    const nome = dias[dia];
    document.querySelector(`input[name="horario_${nome}_entrada"]`).value = h[dia].Entrada;
    document.querySelector(`input[name="horario_${nome}_inicio_intervalo"]`).value = h[dia].Intervalo;
    document.querySelector(`input[name="horario_${nome}_fim_intervalo"]`).value = h[dia].Fim_Intervalo;
    document.querySelector(`input[name="horario_${nome}_saida"]`).value = h[dia].Saida;
  }
}

function togglePrefill() {
  const chk = document.getElementById('prefillToggle');
  if (chk.checked) {
    preencherComExemplo();
  } else {
    document.getElementById('formulario').reset();
  }
}

document.getElementById('prefillToggle').addEventListener('change', togglePrefill);
=======
// >>>>>>>
main