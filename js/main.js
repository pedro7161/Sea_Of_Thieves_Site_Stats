

window.onload = function () {

    var baseurl = "https://xapi.us/v2/"//caso a api mude apenas basta alteraar aqui o url iniçial para nao ter que se mudar no codigo todo
    var input = document.getElementById("user")//buscar o que nome que introduziaram no html
    var endpoints = ["/presence", "/activity", "/friends", "/achievements/1717113201"]//fazer o programa de maneira a que nao seja preciso alterar milhares de linhas ,basta apenas juntar ha lista
    var butao = document.getElementById("butao")//para saber qual dos butoes (vai/tem que) ser clickado
    var bluidEndpoints = [] //lista para guardar os links completos
    var objeto = []//ajudar a organizar a lista com as informaçoes todas da api

    //jquery para nos butoes(setas) esconder a lista caso seja muito grande para dar scroll no telemovel
    $("#esconder").click(function () {
        //se o id for frienlist e o display=none no css alterar para display block e vice versa
        if (document.getElementById("Friendlist").style.display == "none") {
            document.getElementById("Friendlist").style.display = "block";
        }
        else {
            document.getElementById("Friendlist").style.display = "none";
        }
    }
    );
    $("#esconder2").click(function () {
        //se o id for content e o display=none no css alterar para display block e vice versa
        if (document.getElementById("content").style.display == "none") {
            document.getElementById("content").style.display = "block";
        }
        else {
            document.getElementById("content").style.display = "none";
        }
    }
    );
    $("#esconder3").click(function () {
        //se o id for desaparece3 e o display=none no css alterar para display block e vice versa
        if (document.getElementById("desaparece3").style.display == "none") {
            document.getElementById("desaparece3").style.display = "block";
        }
        else {
            document.getElementById("desaparece3").style.display = "none";
        }
    }
    );
    //quando clicarem no botao começar a pesquisa do xuid do utelizador para se conseguir ir buscar o resto
    butao.onclick = async () => {

        // receber o id do utelizador
        const xuid = await httprequest("xuid/" + input.value)
        // contruir os url
        urlcontructor(xuid, endpoints)
        // inserçao dos enpoints com a base do url
        for (let index = 0; index < bluidEndpoints.length; index++) {
            const element = bluidEndpoints[index];
            //o element ja tem o id + os endpoint
            const end = await httprequest(element)
            // receber a lista com as informaçoes da api
            var partido = await partirobj(end)

            console.log("array com as informaçoes da api", partido)


        }
        inseridor(partido)

    };

    // input.onchange = async () => {
    //     var xuid = await httprequest("xuid/" + input.value)

    //  var end = await urlcontructor(xuid, endpoints)
    //       console.log(end)
    // };

    //chave da api usada para os requests
    async function httprequest(endpoint) {

        //contrutor de url onde automaticamente pesquisa por todos os endpoinsts metidos na lista do url
        const resposta = await fetch(baseurl + endpoint, {

            method: 'GET',
            headers: {
                "X-AUTH": "428606bdf1acf3c18578a9242bf09d3680f4c661"
            },
        });


        // esperar que a api apanhe tudo
        const resp = await resposta.json();
        //devoolver a resposta
        return resp
    };

    function urlcontructor(xuid, endpoints) {

        endpoints.forEach((element) => {

            var bluid = xuid + element

            //id+finaldolink
            bluidEndpoints.push(bluid)



        });
    }

    function partirobj(achiev) {
        // checkar se recebe os valores da api
        console.log("lista toda: ", achiev)
        // inserir os valores da api na lista
        objeto.push(achiev)



        // devolver a lista

        return objeto

    }


    console.log(input)
    console.log(input.value)

    //inserir as informaçoes no html
    function inseridor(partido) {
        //verificaçao se o utilizador está online ou ofline
        document.getElementById("status").innerHTML = partido[0]['state']
        //devido há api mudar o devices para lastseen quando nao encontra nada adiçionei um try catch para apanhar pelo last seen
        try {
            //verificaçao se o utilizador está a jogar
            if (document.getElementById("jogorec").innerHTML = partido[0]['devices'][0]['titles'][0]['name'] == "Online") {
                document.getElementById("jogorec").innerHTML = "Nao esta a jogar"
            }
            else
                document.getElementById("jogorec").innerHTML = "A jogar: " + partido[0]['devices'][0]['titles'][0]['name']
        }
        catch {
            //verificaçao onde o utelizador fui visto pela ultima ves
            try {
                document.getElementById("jogorec").innerHTML = "Ultima vez visto: " + partido[0]['lastSeen']['titleName']
            }
            catch {
                console.log("erro")
            }


        }
        //adiçionar o icon da conta no site
        document.getElementById("profile_icon").src = partido[1]['activityItems'][0]['userImageUriMd']
        //caso nao encontro atividade recente para nao dar erro
        if (partido[1]['activityItems'] == 0) {
            console.log("nao tem")
        }
        //verificar se está a receber o correto na lista
        console.log(partido[3])
        //passar por todos os achievements na lista e verificar quais o utelizador tem, os que tiver entra-se na funçao addrow na qual adiciona ao html  o seu progresso
        partido[3].forEach(element => {

            if (element["progressState"] == "Achieved") {
                addRow(element)
            }
            else {
                console.log("nao tem")
            }



        });
        partido[2].forEach(element => {
            addRowF(element)
        });

        try {

            if (partido[0]['devices'][0]['titles'][0]['state'] == "Active") {
                document.getElementById("atvjogo").innerHTML = "Está a jogar"
            }
            else {
                document.getElementById("atvjogo").innerHTML = "Nao está a jogar"
            }
        }
        catch {
            document.getElementById("atvjogo").innerHTML = "Nao está a jogar"

        }

        if (partido[0]['state'] == "Online") {
            document.getElementById("status").style.color = "green";
        }
        else {
            document.getElementById("status").style.color = "red";
        }

        // para futuro uso onde deixa o programa mais automatico
        // console.log("status: ", partido[0]["state"])
        // var location = [partido[0]['state'], partido[0]['xuid']]
        // var ide = ["status", "nomeachiev"]

        // location.forEach(element => {
        //     document.getElementById(ide[0]).innerHTML = element
        //     document.getElementById(ide[1]).innerHTML = element
        // });




    }
    //insere o html dos achievments
    function addRow(lista) {
        const div = document.createElement('div');//criaçao da tag div numa variavel

        div.className = 'achievements';//adiçao de class á varivel que é uma div
        //inserimento do html dentro da div criada
        div.innerHTML = "<br>" + "<h3>" + lista["name"] + "</h3>" +
            "<p class='achivsiz'>" + lista["progressState"] + "</p>" +
            "<p class='achivsiz'>" + lista["description"] + "</p>" +
            "<p class='achivsiz'>" + lista["progression"]["timeUnlocked"] + "</p>" +
            "<p class='achivsiz'> Numero de pessoas que tem: " + lista["rarity"]["currentPercentage"] + "%</p>" +
            "<img class='achiev_img' src='" + lista["mediaAssets"][0]["url"] + "'> "
            ;
        //junçao da div criada em cima com o i id criado no ficheiro do html
        document.getElementById('content').appendChild(div);

    }
    //insere o html da friendlist
    function addRowF(lista) {

        const div2 = document.createElement('div');//criaçao da tag div numa variavel

        div2.className = 'FriendL';//adiçao de class á varivel que é uma div
        //inserimento do html dentro da div criada
        div2.innerHTML = "<p class='achivsiz'>" + lista["Gamertag"] + "</p>" + "<img class='achiev_img' src='" + lista["AppDisplayPicRaw"] + "'> ";
        //junçao da div criada em cima com o i id criado no ficheiro do html
        document.getElementById('Friendlist').appendChild(div2);
    }







}




//codigo que serve para ajudar a perceber melhor o que aconteçia de fundo e exemplos

// 0: Object { xuid: 2535432854101579, state: "Online", devices: (1)[…] }

// 1: Object { numItems: 35, pollingToken: 8585943518858376000, pollingIntervalSeconds: 900, … }

// 2: Array(11)[{ … }, { … }, { … }, … ]

// length: 3

// /v2/profile


// (async () => {
//     const rawResponse = await fetch('https://httpbin.org/post', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             a: 1,
//             b: 'Textual content'
//         })
//     });
//     const content = await rawResponse.json();
//     console.log(content);
// });

// object.onchange = function(){myScript};

//var username = tomas1207

// xuid/{gamertag}


// 2535432854101579 user
// 1717113201   title id

// 2535432854101579 user
// 1717113201   title id


// $.ajax({

//     url: (baseurl + endpoint),

//     headers: {
//         "X-AUTH": "428606bdf1acf3c18578a9242bf09d3680f4c661"
//     }

// }).done(function (response) {

//     console.log(response);


