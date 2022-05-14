
const grupoCart  = document.querySelector('.grupo-cart');
const modalPokedex = document.querySelector('.modal-pokedex');
const wraperPoke = document.querySelector('.wraper__pokemon');

const boxLoading = document.querySelector('.box-loading');
const soundOpen = document.getElementById('sound-open');
const soundExit = document.getElementById('sound-exit');

async function requestPoke() {
    
    await fetch('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0')
    .then(response => response.json())
    .then(data => {
    
        data = data.results;
    
        let pokemons = [];
    
        for(let i = 0; i < data.length; i++) {
            fetch(data[i].url)
            .then(response => response.json())
            .then(json => {
                pokemons.push(json);
                
                grupoCart.innerHTML+= `
    
                <div class="single-cart">
                    <div class="img__cart">
                        <img src="${pokemons[i].sprites.other.home.front_default}" alt="">
                    </div><!--cart-img-->
                    <div class="info__cart">
                        <i class="far fa-heart"></i>
                        <p>${pokemons[i].name}</p>
                    </div><!--info__cart-->
                </div><!--single-cart-->
    
                `;

                let imgCart = document.querySelectorAll('.img__cart');
               

                // console.log('pokeNivel: ', pokeNivel);

                imgCart.forEach( item => {
                    item.addEventListener('click', function() {
                        // soundOpen.play();
                        let srcImg = item.children[0].getAttribute('src');
                        let icone = item.parentNode.children[1].children[0];
                        icone = icone.getAttribute('class');
                        let nomePoke = item.parentNode.children[1].children[1].innerHTML;
                        
                        // console.log(nomePoke);
                        /* 
                            peguei img,nome e classe icone do cartão escolhido
                            agora e passar essas informações para um função assicrona
                            e pegar dados de nivel do pokemon e inserir no modal
                        */
                        
                        nivelPoke(nomePoke, srcImg, icone);
                        
                    });
                    
                });


                setTimeout(() => {
                    boxLoading.style.display = "none";
                }, 2000);

            });

        }

        // console.log('poke: ',pokemons);
        
    });

}

requestPoke();
/*
    --- function async para pegar os nivel do pokemon escolhido
*/
async function nivelPoke(nomePokemon, img, icon) {

    await fetch('https://pokeapi.co/api/v2/pokemon/'+nomePokemon)
    .then(response => response.json())
    .then(data => {
        
        // console.log('ver nivel do pokemon: ',data.stats);
        
        /*
            Peguei os dados das etaticas básica e
            passei para um objeto para melhor acesso da funções
        
        */
       let baseStat = {
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            spcAttack: data.stats[3].base_stat,
            spcDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat
        }
        
        wraperPoke.innerHTML = `
        
            <div class="header__pokemon">
                <i class="${icon}"></i>
                <span>${nomePokemon}</span>
            </div><!--header__pokemon-->

            <div class="img__pokemon">
                <img src="${img}" alt="${nomePokemon}">  
            </div><!--img__pokemon-->

            <div class="box-btn-menu">
                <div class="btn-event-menu">
                    <i class="fas fa-angle-down"></i>
                </div><!--btn-event-menu-->
            </div><!--box-btn-menu-->

            <div class="box-info-pokemon">
                <div class="wraper__info-pokemon">
                    <h4>Estatística básica</h4>
                    <p>Hp: <b>${baseStat.hp}</b></p>
                    <p>Ataque: <b>${baseStat.attack}</b> </p>
                    <p>Defesa:  <b>${baseStat.defense}</b> </p>
                    <p>Ataque Especial: <b>${baseStat.spcAttack}</b> </p>
                    <p>Defesa Especial: <b>${baseStat.spcDefense}</b> </p>
                    <p>Rapidez: <b>${baseStat.speed}</b> </p>
                </div><!--wraper__info-pokemon-->
            </div><!--box-info-pokemon-->
        
        `;

        showInfoPokemon();
        modalPokedex.style.display = 'block';
    });

}

/*
    Função para mostra informações do pokemon como hp - attack e outros
    essa função ativa 'display = block' para mostrar e 'display = none' para esconder;
*/

function showInfoPokemon() {
    let btn = document.querySelector('.btn-event-menu');
    let boxInfo = document.querySelector('.box-info-pokemon');

    btn.addEventListener('click', function() {
        let icon = btn.children[0];

        if(icon.classList == 'fas fa-angle-down') {
            icon.classList.remove('fa-angle-down');
            icon.classList.add('fa-angle-up');
            btn.style.lineHeight = 'calc(15px / 2 + 35px)';
            boxInfo.style.display = 'block';

        }else {
            icon.classList.remove('fa-angle-up');
            icon.classList.add('fa-angle-down');
            btn.style.lineHeight = 'calc(18px / 2 + 35px)';
            boxInfo.style.display = 'none';

        }
    });
}

/**
 *  Função para fechar modal
 */

eventoFecharModal();
function eventoFecharModal() {
    let boxPoke = document.querySelector('.box-pokemon');

    // evitar fechar quando click div
    boxPoke.addEventListener('click',function(e) {e.stopPropagation();});

    // evento de fachar quando clicar fora da div
    modalPokedex.addEventListener('click', function() {
        // soundExit.play(); 
        modalPokedex.style.display = 'none'; 
    });
    
}