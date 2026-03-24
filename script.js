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

    mostrarImagem(url);
    mostrarHabilidade(url);
}



buscarDados();