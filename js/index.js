

const grupoCart  = document.querySelector('.grupo-cart');
const modalPokedex = document.querySelector('.modal-pokedex');

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
                let wrapePoke = document.querySelector('.wraper__pokemon');

                // console.log('pokeNivel: ', pokeNivel);

                imgCart.forEach( item => {
                    item.addEventListener('click', function() {
                        let srcImg = item.children[0].getAttribute('src');
                        let icone = item.parentNode.children[1].children[0];
                        icone = icone.getAttribute('class');
                        let nomePoke = item.parentNode.children[1].children[1].innerHTML;
                        console.log(nomePoke);
                        /* 
                            peguei img,nome e classe icone do cartão escolhido
                            agora e passar essas informações para um função assicrona
                            e pegar dados de nivel do pokemon e inserir no modal
                        */

                        nivelPoke(nomePoke, srcImg, icone);

                    });
                    
                });


            });

        }
    
        console.log('poke: ',pokemons);
        
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
        let wraperPoke = document.querySelector('.wraper__pokemon');
        
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

        modalPokedex.style.display = 'block';
    });

}


/*
    <div class="header__pokemon">
                            <i class="far fa-heart"></i>
                            <span>nome sadf sdf</span>
                        </div><!--header__pokemon-->

                        <div class="img__pokemon">
                            <img src="https://i.pinimg.com/originals/f2/95/76/f295769d9bd3c34ffc552e837f5304ae.png" alt="">  
                        </div><!--img__pokemon-->

                        <div class="box-btn-menu">
                            <div class="btn-event-menu">
                                <i class="fas fa-angle-down"></i>
                            </div><!--btn-event-menu-->
                        </div><!--box-btn-menu-->

                        <div class="box-info-pokemon">
                            <div class="wraper__info-pokemon">
                                <h4>Estatística básica</h4>
                                <p>Hp: <b>00</b></p>
                                <p>Ataque: <b>00</b> </p>
                                <p>Defesa:  <b>00</b></p>
                                <p>Ataque Especial: <b>00</b> </p>
                                <p>Defesa Especial: <b>00</b> </p>
                                <p>Rapidez: <b>00</b> </p>
                            </div><!--wraper__info-pokemon-->
                        </div><!--box-info-pokemon-->

*/