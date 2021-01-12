

window.onload = function () {

    var baseurl = "https://xapi.us/v2/"
    var input = document.getElementById("user")
    var endpoints = ["/presence", "/activity", "/friends", "/achievements/1717113201"]
    var butao = document.getElementById("butao")
    var bluidEndpoints = []
    var objeto = []

    butao.onclick = async () => {
        document.getElementById("username").innerHTML = document.getElementById("user").value
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
            inseridor(partido)

        }


    };

    // input.onchange = async () => {
    //     var xuid = await httprequest("xuid/" + input.value)

    //  var end = await urlcontructor(xuid, endpoints)
    //       console.log(end)
    // };

    async function httprequest(endpoint) {


        const resposta = await fetch(baseurl + endpoint, {

            method: 'GET',
            headers: {
                "X-AUTH": "428606bdf1acf3c18578a9242bf09d3680f4c661"
            },
        });



        const resp = await resposta.json();

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



        console.log("status: ", partido[0]["state"])
        var location = [partido[0]['state'], partido[0]['xuid']]
        var ide = ["status", "nomeachiev"]

        location.forEach(element => {
            document.getElementById(ide[0]).innerHTML = element
            document.getElementById(ide[1]).innerHTML = element
        });




    }






}






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


