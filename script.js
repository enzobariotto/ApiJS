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

async function buscarDados() {
    const lista = document.querySelector('#apiTeste');
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=50');
    const dados = await res.json();

    lista.innerHTML = '';
    dados.results.forEach(pokemon => {
        const btn = document.createElement('button');
        btn.textContent = pokemon.name;
        btn.onclick = () => {
            document.querySelectorAll('.lista-botoes button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mostrarTudo(pokemon.url);
        };
        lista.appendChild(btn);
    });
}

function statRow(label, value, color) {
    const pct = Math.min(100, Math.round((value / 255) * 100));
    return `
        <div class="stat-row">
            <span class="stat-name">${label}</span>
            <span class="stat-value">${value}</span>
            <div class="stat-bar-bg">
                <div class="stat-bar" style="width:${pct}%; background:${color}"></div>
            </div>
        </div>`;
}

async function mostrarTudo(url) {
    const card = document.getElementById('pokemonCard');
    card.innerHTML = `<div class="empty-state"><div class="pokeball-empty"></div><p>Carregando…</p></div>`;

    const res = await fetch(url);
    const dados = await res.json();

    const imagem    = dados.sprites.front_default;
    const habilidade = (dados.abilities[1] ?? dados.abilities[0]).ability.name;
    const tipo      = dados.types[0].type.name;
    const hp        = dados.stats[0].base_stat;
    const ataque    = dados.stats[1].base_stat;
    const defesa    = dados.stats[2].base_stat;
    const numero    = String(dados.id).padStart(3, '0');
    const nome      = dados.name;

    const cor = typeColors[tipo] || '#facc15';
    const corBg = cor + '18';

    card.style.setProperty('--type-color', cor);
    card.style.setProperty('--type-bg', corBg);
    card.style.borderColor = cor + '40';

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

buscarDados();
