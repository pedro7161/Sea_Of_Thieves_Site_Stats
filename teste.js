<<<<<<< HEAD
window.onload = function () {

    var baseurl = "https://xapi.us/v2/"
    var input = document.getElementById("user")
    var endpoints = ["/presence", "/activity"]
var butao=document.getElementById("butao")

butao.onclick = async () => {
  

 var end =  await urlcontructor("2535432854101579", endpoints)
      console.log(end)
};

    // input.onchange = async () => {
    //     var xuid = await httprequest("xuid/" + input.value)

    //  var end = await urlcontructor(xuid, endpoints)
    //       console.log(end)
    // };

    async function httprequest(endpoint) {
       

        const resposta = await fetch(baseurl + endpoint,
            {

                method: 'GET',
                headers:
                {
                    "X-AUTH": "428606bdf1acf3c18578a9242bf09d3680f4c661"
                },
            });



        const resp = await resposta.json();

    
        return  resp
    };

    async function urlcontructor(xuid, endpoints) {

  await  endpoints.forEach( async(element) => {

            console.log(xuid + element)

            var response = await  httprequest(xuid)
            console.log("eu estou aqui")
            return  response

        });
 

    }


    console.log(input)
    console.log(input.value)


    function updatetitle(end) {




        document.getElementById("titulojogo").innerHTML = end["numItems"];



    }




}

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

=======
window.onload = function () {

    var baseurl = "https://xapi.us/v2/"
    var input = document.getElementById("user")
    var endpoints = ["/presence", "/activity"]
var butao=document.getElementById("butao")

butao.onclick = async () => {
  

 var end =  await urlcontructor("2535432854101579", endpoints)
      console.log(end)
};

    // input.onchange = async () => {
    //     var xuid = await httprequest("xuid/" + input.value)

    //  var end = await urlcontructor(xuid, endpoints)
    //       console.log(end)
    // };

    async function httprequest(endpoint) {
       

        const resposta = await fetch(baseurl + endpoint,
            {

                method: 'GET',
                headers:
                {
                    "X-AUTH": "428606bdf1acf3c18578a9242bf09d3680f4c661"
                },
            });



        const resp = await resposta.json();

    
        return  resp
    };

    async function urlcontructor(xuid, endpoints) {

  await  endpoints.forEach( async(element) => {

            console.log(xuid + element)

            var response = await  httprequest(xuid)
            console.log("eu estou aqui")
            return  response

        });
 

    }


    console.log(input)
    console.log(input.value)


    function updatetitle(end) {




        document.getElementById("titulojogo").innerHTML = end["numItems"];



    }




}

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

>>>>>>> 5134387e0b56ea19bf06d2bbb34363c75584bdcb
// });