async function buscarDados() {
    const teste = document.querySelector("#apiTeste");

    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=50');
    const dados = await res.json();

    let conteudo = "";

    dados.results.forEach(pokemon => {
        conteudo += `
            <button  onclick="mostrarTudo('${pokemon.url}')">
               ${pokemon.name}
            </button>
        `;
    });

    teste.innerHTML = conteudo;
}

async function mostrarTudo(url) {
    async function mostrarImagem(url) {
        const res = await fetch(url);
        const dados = await res.json();
    
        const imagem = dados.sprites.front_default;
    
    
        document.querySelector("#imagemPokemon").innerHTML = `
            <img src="${imagem}" alt="pokemon"> 
        `;
    };
    
    async function mostrarHabilidade(url) {
        const res = await fetch(url);
        const dados = await res.json();

        const habilidade = dados.abilities[1].ability.name;

        document.querySelector("#habilidadePokemon").innerHTML = `
        <strong>Habilidade:</strong><p>${habilidade}</p>
    `;
        
    };

    async function mostrarTipo(url) {
        const res = await fetch(url);
        const dados = await res.json();

        const tipo = dados.types[0].type.name;

        document.querySelector("#tipoPokemon").innerHTML = `
        <strong>Tipo:</strong><p>${tipo}</p>
    `;
        
    };

    async function mostrarHp(url) {
        const res = await fetch(url);
        const dados = await res.json();

        const hp = dados.stats[0].base_stat;

        document.querySelector("#hpPokemon").innerHTML = `
        <strong>HP:</strong><p>${hp}</p>
    `;
        
    };

     async function mostrarAtaque(url) {
        const res = await fetch(url);
        const dados = await res.json();

        const ataque = dados.stats[1].base_stat;

        document.querySelector("#ataquePokemon").innerHTML = `
        <strong>Ataque:</strong><p>${ataque}</p>
    `;
        
    };

     async function mostrarDefesa(url) {
        const res = await fetch(url);
        const dados = await res.json();

        const defesa = dados.stats[2].base_stat;

        document.querySelector("#defesaPokemon").innerHTML = `
        <strong>Defesa:</strong><p>${defesa}</p>
    `;
        
    };


    mostrarImagem(url);
    mostrarHabilidade(url);
    mostrarTipo(url);
    mostrarHp(url);
    mostrarAtaque(url);
    mostrarDefesa(url);
}



buscarDados();