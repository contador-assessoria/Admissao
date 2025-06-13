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
