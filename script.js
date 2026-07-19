// ATENÇÃO: Substitua a URL abaixo pela URL gerada no Google Apps Script no Passo 3
const SCRIPT_URL = https://script.google.com/macros/s/AKfycbwv27V3rl6DxpKGWcsDMR0kRcxhN5Hyw6Dq3Lv9mlHo9jy6e1H43P3GsviW9VntIV_wgw/exec;

const form = document.getElementById('rsvp-form');
const btnSubmit = document.getElementById('submit-btn');
const btnText = document.querySelector('.btn-text');
const loader = document.getElementById('loader');
const formCard = document.getElementById('form-card');
const successCard = document.getElementById('success-card');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validação extra (Sanitização simples)
    const nome = document.getElementById('nome').value.trim();
    if (!nome) {
        alert('Por favor, preencha o seu nome.');
        return;
    }

    // Estado de Loading
    btnSubmit.disabled = true;
    btnText.style.display = 'none';
    loader.style.display = 'block';

    // Capturando os dados via FormData
    const formData = new FormData(form);

    try {
        // Enviando os dados para o Google Apps Script
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData,
            // mode: 'no-cors' é utilizado para evitar erros de CORS ao enviar para o Google Scripts
            // O lado negativo é que não conseguimos ler o corpo da resposta, mas sabemos que o request foi feito.
            mode: 'no-cors' 
        });

        // Transição suave para mensagem de sucesso
        formCard.style.opacity = '0';
        setTimeout(() => {
            formCard.classList.add('hidden');
            successCard.classList.remove('hidden');
            successCard.style.opacity = '0';
            setTimeout(() => {
                successCard.style.opacity = '1';
                successCard.style.transition = 'opacity 0.5s ease';
            }, 50);
        }, 500);

    } catch (error) {
        console.error('Erro ao enviar!', error.message);
        alert('Ocorreu um erro ao enviar sua confirmação. Por favor, verifique sua conexão e tente novamente.');
        
        // Retornar ao estado normal em caso de erro
        btnSubmit.disabled = false;
        btnText.style.display = 'block';
        loader.style.display = 'none';
    }
});
