const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_id');
const pokemonGIF = document.querySelector('.pokemon_gif');
const formSearch = document.querySelector('.form');
const inputSearch = document.querySelector('.pokemon_search');
const btnAnterior = document.querySelector('.btn-ant');
const btnProximo = document.querySelector('.btn-prox');
let searchPokemon = 1;

const fecthPokemon = async (pokemon) => {

    const APIResult = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResult.status === 200) {
        const dados = await APIResult.json();
        return dados;
    }

}

const getPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Carregando..."
    pokemonId.innerHTML = "";

    const dados = await fecthPokemon(pokemon);

    if(dados){
        pokemonName.innerHTML = dados.name;
        pokemonId.innerHTML = dados.id;
        pokemonGIF.src = dados["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        pokemonGIF.style.display = "block"; 
        inputSearch.value = "";
        searchPokemon = dados.id;
    } else {
        pokemonName.innerHTML = "Não encontrado";
        pokemonId.innerHTML = "";
        pokemonGIF.style.display = "none";
    }

    
}


formSearch.addEventListener("submit", (event) =>{

    event.preventDefault();

    getPokemon(inputSearch.value.toLowerCase());
    
})

btnAnterior.addEventListener("click", () =>{
    
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        getPokemon(searchPokemon);
    }
})

btnProximo.addEventListener("click", () =>{

    searchPokemon += 1;
    getPokemon(searchPokemon);

})

getPokemon(searchPokemon) 