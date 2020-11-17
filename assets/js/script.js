$(document).ready(function () {

  // carga un pokemon al inicio
  $.ajax({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/6/`,
    dataType: "json",
    
    success: function (response) {
      let infoPoke = response;

      // nombre pokemon
      let name = infoPoke.forms[0].name;
      // numero del pokemon
      let id = "#" + infoPoke.id;

      //imagenes fontales y traceras 
      let pokeImgFront = infoPoke.sprites.front_default;
      let pokeImgBack = infoPoke.sprites.back_default;

      //imagenes fontales y traceras shiny
      let pokeImgShinyFront = infoPoke.sprites.front_shiny;
      let pokeImgShinyBack = infoPoke.sprites.back_shiny;

      // shine
      let shiny = false;
      let frontImg = true;

      // altura y peso
      let weight = `<span class='stat'>Peso: </span> ${infoPoke.weight/10}  Kg.`;
      let height = `<span class='stat'>Altura: </span> ${infoPoke.height/10} M.`;

      // array vacio de los tipos de cada pokemon
      let types = [];
      // genera el tipo de elementos de un pokemon  
      for (let i = 0; i < infoPoke.types.length; i++) {
        let type = infoPoke.types[i].type.name;
        types.push(type);
      }
      //envia un div al html con los tipos correspondientes a cada pokemon
      function pokemonType(types) {
        $("#types").html("");
        for (let i = 0; i < types.length; i++) {
          $("#types").append( "<div class='pokeType poke-info " + types[i] + "'>" + types[i] + " </div>" );
        }
      };

      // array vacio de las habilidades del pokemon
      let habilities = [];
      // genera las habilidades de un pokemon  
      for (let i = 0; i < infoPoke.abilities.length; i++) {
        let hability = infoPoke.abilities[i].ability.name;
        habilities.push(hability);
      };
      // funcion para cargar las habilidades del pokemon
      function pokemonHability(habilities) { 
        $("#habilitys").html("");        
        for (let i = 0; i < habilities.length; i++) {
          $("#habilitys").append(`          
            <tr>
              <td>${habilities[i]}</td>
            </tr>            
          `);
        }
      };   

      

      // funcion btn imagen pokemon normal
      $("#defaultBtn").click(function () {
        $("#pokeImage").attr("src", pokeImgFront);
        shiny = false;
        frontImg = true;
      });

      // funcion btn imagen pokemon shiny
      $("#shinyBtn").click(function () {
        $("#pokeImage").attr("src", pokeImgShinyFront);
        shiny = true;
        frontImg = true;
      });

      // botones para girar la imagen
      $(".changeBtn").click(function () {
        if (shiny == false && frontImg == true) {
          shiny = false;
          frontImg = false;
          $("#pokeImage").attr("src", pokeImgBack);

        } else if (shiny == false && frontImg == false) {
          shiny = false;
          frontImg = true;
          $("#pokeImage").attr("src", pokeImgFront);

        } else if (shiny == true && frontImg == true) {
          shiny = true;
          frontImg = false;
          $("#pokeImage").attr("src", pokeImgShinyBack);

        } else if (shiny == true && frontImg == false) {
          shiny = true;
          frontImg = true;
          $("#pokeImage").attr("src", pokeImgShinyFront);
        }
      });

      // grafico
      function datosGrafico(response) {
        let hp = response.stats[0].base_stat;
        let attack = response.stats[1].base_stat;
        let defense = response.stats[2].base_stat;
        let spAtk = response.stats[3].base_stat;
        let spDef = response.stats[4].base_stat;
        let speed = response.stats[5].base_stat;
    
        let options = {
          theme: "dark2",
          exportFileName: "Doughnut Chart",
          animationEnabled: true,
          title:{
              text: "Estadisticas"
          },
          legend:{
              cursor: "pointer"
          },
          data: [{
              type: "doughnut",
              innerRadius: 90,
              toolTipContent: "<b>{name}</b>: {y} Pts.",
              indexLabel: "{name} - {y} Pts.",
              dataPoints: [
                  { y: hp, name: "hp" },
                  { y: attack, name: "atk" },
                  { y: defense, name: "def" },
                  { y: spAtk, name: "spAtk" },
                  { y: spDef, name: "spDef" },
                  { y: speed, name: "speed"}
              ]
          }]
        };
    
        $("#chartContainer").CanvasJSChart(options);
      };


      // dstos principales del pokemon
      $(".name").html(name);
      $(".idNum").html(id);
      $("#pokeImage").attr("src", pokeImgFront);

      // altura y peso
      $(".weight").html(weight);
      $(".height").html(height);



      pokemonType(types);
      pokemonHability(habilities);
      datosGrafico(response);

      $('input').val("");
    }

  }); //AJAX

  // busca el pokemon o numero ingresado

  // $('#buscando').on('click',(e)=>{
  // });

  let buscar = (e) => {

    e.preventDefault();
    var entrada = $("#buscarPoke").val();

    $.ajax({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${entrada.toLowerCase()}`,
      dataType: "json",
      
      success: function (response) {   

        let infoPoke = response;
        let name = infoPoke.name;
        
        //imagenes fontales y traceras 
        let pokeImgFront = infoPoke.sprites.front_default;
        let pokeImgBack = infoPoke.sprites.back_default;

        //imagenes fontales y traceras shiny
        let pokeImgShinyFront = infoPoke.sprites.front_shiny;
        let pokeImgShinyBack = infoPoke.sprites.back_shiny;

        // shine
        let shiny = false;
        let frontImg = true;

        // id del pokemon
        let id = "#" + infoPoke.id;

        // altura y peso
        let weight = `<span class='stat'>Peso: </span> ${infoPoke.weight/10}  Kg.`;
        let height = `<span class='stat'>Altura: </span> ${infoPoke.height/10} M.`;
        
        // genera un array con el/los tipo del pokemon
        let types = [];
        // genera el tipo de elementos de un pokemon  
        for (let i = 0; i < infoPoke.types.length; i++) {
          let type = infoPoke.types[i].type.name;
          types.push(type);
        }
        // funcion que envia un div al html con los tipos correspondientes a cada pokemon
        function pokemonType(types) {
          $("#types").html("");
          for (let i = 0; i < types.length; i++) {
            $("#types").append( "<div class='pokeType poke-info " + types[i] + "'>" + types[i] + " </div>" );
          }
        };

        // array vacio de las habilidades del pokemon
        let habilities = [];
        // genera las habilidades de un pokemon  
        for (let i = 0; i < infoPoke.abilities.length; i++) {
          let hability = infoPoke.abilities[i].ability.name;
          habilities.push(hability);
        };
        // funcion para cargar la habilidAD EN HTML
        function pokemonHability(habilities) { 
          $("#habilitys").html(""); 
          if (habilities.length > 0) {
            for (let i = 0; i < habilities.length; i++) {
              $("#habilitys").append(`          
                <tr>
                  <td>${habilities[i]}</td>
                </tr>            
              `);
            }
          } else {
            $("#habilitys").append(`          
                <tr>
                  <td>Sin Habilidades</td>
                </tr>            
              `);
          }          
        };  
        
        // array vacio de los movimiento de cada pokemon
        // let moves = [];
        // // genera todo los movimientos del pokemon
        // for (let i = 0; i < infoPoke.moves.length; i++) {
        //   let move = infoPoke.moves[i].move;
        //   let moveName = move.name;
        //   console.log(moveName)
        //   moves.push(moveName);
        // }

     
        
        // funcion imagen pokemon normal
        $("#defaultBtn").click(function () {
          $("#pokeImage").attr("src", pokeImgFront);
          shiny = false;
          frontImg = true;
        });

        // funcion imagen pokemon shiny
        $("#shinyBtn").click(function () {
          $("#pokeImage").attr("src", pokeImgShinyFront);
          shiny = true;
          frontImg = true;
        });

        // botones para girar la imagen
        $(".changeBtn").click(function () {
          if (shiny == false && frontImg == true) {
            shiny = false;
            frontImg = false;
            $("#pokeImage").attr("src", pokeImgBack);

          } else if (shiny == false && frontImg == false) {
            shiny = false;
            frontImg = true;
            $("#pokeImage").attr("src", pokeImgFront);

          } else if (shiny == true && frontImg == true) {
            shiny = true;
            frontImg = false;
            $("#pokeImage").attr("src", pokeImgShinyBack);

          } else if (shiny == true && frontImg == false) {
            shiny = true;
            frontImg = true;
            $("#pokeImage").attr("src", pokeImgShinyFront);
          }
        });
        
        // grafico
        function datosGrafico(response) {
          let hp = response.stats[0].base_stat;
          let attack = response.stats[1].base_stat;
          let defense = response.stats[2].base_stat;
          let spAtk = response.stats[3].base_stat;
          let spDef = response.stats[4].base_stat;
          let speed = response.stats[5].base_stat;
      
          let options = {
            theme: "dark2",
            exportFileName: "Doughnut Chart",
            animationEnabled: true,
            title:{
                text: "Estadisticas"
            },
            legend:{
                cursor: "pointer"
            },
            data: [{
                type: "doughnut",
                innerRadius: 90,
                toolTipContent: "<b>{name}</b>: {y} Pts.",
                indexLabel: "{name} - {y} Pts.",
                dataPoints: [
                    { y: hp, name: "hp" },
                    { y: attack, name: "atk" },
                    { y: defense, name: "def" },
                    { y: spAtk, name: "spAtk" },
                    { y: spDef, name: "spDef" },
                    { y: speed, name: "speed"}
                ]
            }]
          };
      
          $("#chartContainer").CanvasJSChart(options);
        };

        // estadisticas de los pokemones
        $(".name").html(name);
        $(".idNum").html(id);
        $("#pokeImage").attr("src", pokeImgFront);
        
        // altura y peso
        $(".weight").html(weight);
        $(".height").html(height);

        pokemonType(types);
        pokemonHability(habilities);
        datosGrafico(response);
        
        // reset input
        $('input').val("");
      },
      error: function(error){
        Swal.fire({
          icon: 'error',
          title: `El estado de la busqueda es ${error.status}`,
          text: `El Nombre o Número: ${entrada} buscado no existe, intenta nuevamente`
          // footer: `Ingrese un nunmero o nombre valido`
        })
      }

    }); //AJAX
    
  }
  
  $('.searchBar').on('submit', buscar);

});



