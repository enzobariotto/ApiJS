// Mapeamento de tipo de Pokémon → cor hexadecimal
// Usado para colorir o card dinamicamente conforme o tipo
const typeColors = {
    fire:     '#f97316',
    water:    '#3b82f6',
    grass:    '#22c55e',
    electric: '#eab308',
    psychic:  '#ec4899',
    ice:      '#06b6d4',
    dragon:   '#7c3aed',
    dark:     '#4b5563',
    fairy:    '#f472b6',
    normal:   '#9ca3af',
    fighting: '#dc2626',
    flying:   '#818cf8',
    poison:   '#a855f7',
    ground:   '#d97706',
    rock:     '#78716c',
    bug:      '#84cc16',
    ghost:    '#6366f1',
    steel:    '#94a3b8',
};

// Busca a lista de Pokémons na API e cria um botão para cada um
// "async" permite usar "await" dentro da função (esperar respostas da API)
async function buscarDados() {
    const lista = document.querySelector('#apiTeste'); // seleciona o container dos botões

    // fetch() faz uma requisição HTTP para a URL informada
    // offset=20 → começa do 21º Pokémon | limit=50 → traz 50 resultados
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=50');

    // .json() converte a resposta (texto) em um objeto JavaScript
    const dados = await res.json();

    lista.innerHTML = ''; // limpa qualquer conteúdo anterior

    // Percorre o array de resultados e cria um botão para cada Pokémon
    dados.results.forEach(pokemon => {
        const btn = document.createElement('button'); // cria elemento <button>
        btn.textContent = pokemon.name;               // define o texto do botão

        btn.onclick = () => {
            // Remove a classe "active" de todos os botões antes de marcar o clicado
            document.querySelectorAll('.lista-botoes button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active'); // destaca o botão selecionado

            mostrarTudo(pokemon.url); // carrega os detalhes do Pokémon clicado
        };

        lista.appendChild(btn); // adiciona o botão ao DOM
    });
}

// Gera o HTML de uma linha de estatística com barra de progresso
// label  → nome da stat (ex: "HP")
// value  → valor numérico (ex: 45)
// color  → cor da barra em hex
function statRow(label, value, color) {
    // Converte o valor para porcentagem (máximo possível na API é 255)
    const pct = Math.min(100, Math.round((value / 255) * 100));

    // Retorna uma string de HTML que será inserida no card
    return `
        <div class="stat-row">
            <span class="stat-name">${label}</span>
            <span class="stat-value">${value}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar" style="width:${pct}%; background:${color}"></div>
            </div>
        </div>`;
}

// Busca e exibe todos os detalhes de um Pokémon específico
// url → endereço da API para aquele Pokémon (ex: .../pokemon/25/)
async function mostrarTudo(url) {
    const card = document.getElementById('pokemonCard');

    // Mostra estado de carregamento enquanto a requisição não termina
    card.innerHTML = `<div class="empty-state"><div class="pokeball-empty"></div><p>Carregando…</p></div>`;

    // Uma única requisição traz todos os dados necessários
    const res = await fetch(url);
    const dados = await res.json();

    // Extrai as informações do objeto retornado pela API
    const imagem     = dados.sprites.front_default;           // URL da imagem
    const habilidade = (dados.abilities[1] ?? dados.abilities[0]).ability.name; // ?? = "se não existir, usa o anterior"
    const tipo       = dados.types[0].type.name;              // tipo principal
    const hp         = dados.stats[0].base_stat;              // pontos de vida
    const ataque     = dados.stats[1].base_stat;
    const defesa     = dados.stats[2].base_stat;
    const numero     = String(dados.id).padStart(3, '0');     // ex: 7 → "007"
    const nome       = dados.name;

    // Busca a cor do tipo no objeto typeColors; usa amarelo como fallback
    const cor   = typeColors[tipo] || '#facc15';
    const corBg = cor + '18'; // adiciona opacidade baixa (hex 18 ≈ 9% de opacidade)

    // CSS custom properties (variáveis CSS) definidas via JavaScript
    // Permitem que o CSS use "var(--type-color)" e receba o valor dinâmico
    card.style.setProperty('--type-color', cor);
    card.style.setProperty('--type-bg', corBg);
    card.style.borderColor = cor + '40'; // borda semi-transparente do card

    // Template literal: string multilinha com interpolação de variáveis (${ })
    // innerHTML substitui todo o conteúdo do card pelo novo HTML
    card.innerHTML = `
        <div class="card-header">
            <p class="pokemon-number">#${numero}</p>
            <p class="pokemon-name">${nome}</p>
            <span class="type-badge">${tipo}</span>
            <img class="pokemon-image" src="${imagem}" alt="${nome}">
        </div>
        <div class="card-body">
            <div class="ability-section">
                <p class="section-label">Habilidade</p>
                <p class="ability-name">${habilidade}</p>
            </div>
            <div class="stats-section">
                <p class="section-label">Estatísticas</p>
                ${statRow('HP',  hp,     '#22c55e')}
                ${statRow('ATK', ataque, '#ef4444')}
                ${statRow('DEF', defesa, '#3b82f6')}
            </div>
        </div>`;
}

// Chama buscarDados() assim que o script é carregado,
// populando a lista de botões automaticamente ao abrir a página
buscarDados();
