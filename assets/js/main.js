const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0
const maxRecords = 151

function loadPokemonsItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons.map((pokemon) =>
      ` <li class="pokemon ${pokemon.typeFirst}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <!-- Adicione o botão para exibir as estatísticas no final do cartão -->
            </div>
            <button class="stats-btn" data-pokemon='${JSON.stringify(pokemon)}'>Mostrar Stats</button>
        </li>
      `
    ).join('')

    pokemonList.innerHTML += newHTML
  })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsNextPage = offset + limit

  if (qtdRecordsNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonsItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonsItens(offset, limit)
  }
})

function displayPokemonStats(pokemon) {
  const pokemonImage = document.getElementById('pokemonImage');
  const pokemonName = document.getElementById('pokemonName');
  const statsList = document.getElementById('statsList');
  const pokemonAba = document.getElementById('pokemonAba');
  const pokemonId = document.getElementById('pokemonId');
  const pokemonList = document.getElementById('tipos');
  const pokemonlarg = document.getElementById('largura')
  const pokemonAlt = document.getElementById('altura')
  const experience = document.getElementById('statsXp');
  const pokemonAbilities = document.getElementById('habilidades');
  const corPoke = document.getElementById('infoPoke-1');

  pokemonAba.className = 'pokemon-aba';
  corPoke.className = 'pokemon-info';

  pokemonAba.classList.add(pokemon.types);

  statsList.innerHTML = '';

  const typeFirst = pokemon.typeFirst;
  if (typeFirst) {
    corPoke.classList.add(typeFirst);
  }

  const stats = [
    { name: 'HP', value: pokemon.stats.hp, max: 255 },
    { name: 'Ataque', value: pokemon.stats.atk, max: 255 },
    { name: 'Defesa', value: pokemon.stats.def, max: 255 },
    { name: 'Ataque Especial', value: pokemon.stats.sAtk, max: 255 },
    { name: 'Defesa Especial', value: pokemon.stats.sDef, max: 255 },
    { name: 'Velocidade', value: pokemon.stats.spd, max: 255 },
  ];

  stats.forEach((stat) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${stat.name}:</strong> <span id="${stat.name.toLowerCase()}Value">${stat.value}</span>`;
    const statBar = document.createElement('div');
    statBar.className = `stat-bar ${typeFirst}`;
    statBar.style.width = `${(stat.value / stat.max) * 100}%`;
    listItem.appendChild(statBar);
    statsList.appendChild(listItem);
  });

  pokemonlarg.innerHTML = `<strong>Largura:</strong> ${pokemon.weight}`;
  pokemonAlt.innerHTML = `<strong>Altura:</strong> ${pokemon.height}`;

  experience.innerHTML = `<strong>Base Experience:</strong> ${pokemon.baseStats}`;
  
  pokemonAbilities.innerHTML = `<strong>Habilidades:</strong> ${pokemon.abilities}`;

  pokemonImage.src = pokemon.photo;

  pokemonName.textContent = pokemon.name;

  pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  pokemonId.textContent = `#${pokemon.number}`

  pokemonList.innerHTML = '<ol>' + pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('') + '</ol>';

  pokemonAba.style.display = 'block';
}


function closeAba() {
  const aba = document.getElementById('pokemonAba');
  aba.style.display = 'none';
}

window.onclick = function (event) {
  const aba = document.getElementById('pokemonAba');
  if (event.target === aba) {
    aba.style.display = 'none';
  }
};

document.addEventListener('click', function (event) {
  const statsBtn = event.target.closest('.stats-btn');
  if (statsBtn) {
    const pokemonData = JSON.parse(statsBtn.dataset.pokemon);
    displayPokemonStats(pokemonData);
    showTab('about');
  }
});

// Função para mostrar a aba correspondente ao clicar em um item do menu
function showTab(tabName) {
  // Esconder todas as abas
  document.querySelectorAll('.aba-content').forEach(tab => {
    tab.style.display = 'none';
  });

  // Mostrar a aba correspondente ao item do menu clicado
  const selectedTab = document.getElementById(`${tabName}Tab`);
  if (selectedTab) {
    selectedTab.style.display = 'block';
  }
}
