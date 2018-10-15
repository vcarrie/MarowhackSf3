function attack(idplayer, idattack){
    $.ajax({
        url: "/attack/"+idplayer+"/"+idattack,
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log("error attack")
        },
        success: function (data) {

            $('#player_1_hp').val(data[0]['hp']);
            $('#player_2_hp').val(data[1]['hp']);
            next_turn(idplayer)

        }
    });
}

function noble_phantasm(idplayer){
    $.ajax({
        url: "/noblephantasm/"+idplayer,
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log("error np")
        },
        success: function (data) {

            $('#player_1_hp').val(data[0]['hp']);
            $('#player_2_hp').val(data[1]['hp']);


            $('#player_1_npg').val(data[0]['npg']);
            $('#player_2_npg').val(data[1]['npg']);
            next_turn(idplayer)

        }
    });
}

function animate_np(idplayer) {


    $.ajax({
        url: "/infonp/"+idplayer,
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log("error np")
        },
        success: function (data) {
            $("#actionsP1").hide();
            $("#actionsP2").hide();

            $('#portrait_player'+idplayer).prop('src', data['np_model_1'])

            setTimeout(function() {
                $('#portrait_player'+idplayer).prop('src', data['np_model_2'])
            }, 1500);

            setTimeout(function() {
                $('#portrait_player'+idplayer).prop('src', data['portrait'])
                noble_phantasm(idplayer)
            }, 3000);


        }
    });

}

function next_turn(actual_player) {

    if(actual_player === 1){
        turn_start(2)

    }else{
        turn_start(1)

    }
}



function turn_start(idplayer) {
    $.ajax({
        url: "/newturn/"+idplayer,
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log("error turn start")
        },
        success: function (data) {


            if(data.length === 1){

                $("#actionsP1").hide();
                $("#actionsP2").hide();
                switch(data[0]) {
                    case 'player1':
                        $('#player1').hide();
                        $("#victory").show();

                        break;
                    case 'player2':
                        $('#player2').hide();
                        $("#victory").show();

                        break;
                    default:

                        if(idplayer === 1){
                            $("#state_player1").show();
                            $("#state_player2").hide();

                        }else{
                            $("#state_player1").hide();
                            $("#state_player2").show();

                        }
                        setTimeout(function() {
                            next_turn(idplayer)
                            $("#state_player2").hide();
                            $("#state_player1").hide();
                        }, 1000);
                }


            }else{
                $('#player_1_hp').val(data[0]['hp']);
                $('#player_2_hp').val(data[1]['hp']);


                $('#player_1_npg').val(data[0]['npg']);
                $('#player_2_npg').val(data[1]['npg']);

                if(data[0]['npg']<100){
                    $('#player1_np').prop('disabled', true)
                }else{
                    $('#player1_np').prop('disabled', false)
                }

                if(data[1]['npg']<100){
                    $('#player2_np').prop('disabled', true)
                }else{
                    $('#player2_np').prop('disabled', false)
                }

                if(idplayer === 1){
                    $("#actionsP1").show();
                    $("#actionsP2").hide();

                }else{
                    $("#actionsP1").hide();
                    $("#actionsP2").show();

                }
            }



        }
    });
}

let player1choice = undefined;
let player2choice = undefined;


function select_player2(elem, id, idplayer) {
    player2choice = id;
    const a = document.getElementsByClassName('img_choice_player2');
    for (i = 0; i < a.length; i++) {
        a[i].classList.remove('selected_player2');
    }
    elem.classList.add('selected_player2');

    $.ajax({
        url: "/createplayer/"+idplayer+'/'+player2choice,
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log("error2")
        },
        success: function (data) {

            check_if_players_selected(id, idplayer)

        }
    });

};

function select_player1(elem, id, idplayer) {
    player1choice = id;
    const a = document.getElementsByClassName('img_choice_player1');
    for (i = 0; i < a.length; i++) {
        a[i].classList.remove('selected_player1');
    }
    elem.classList.add('selected_player1');

    $.ajax({
        url: "/createplayer/"+idplayer+'/'+player1choice,
        type: 'GET',
        dataType: 'json',
        error: function () {
            console.log("error1")
        },
        success: function (data) {
            check_if_players_selected(id, idplayer)

        }
    });

};

function check_if_players_selected(idchar, idplayer) {
    if (idplayer===1){
        player1choice = idchar
    }else{
        player2choice = idchar
    }

    if (player1choice !== undefined && player2choice!==undefined){
        $('#start_game').prop('disabled', false)
    }else {
        $('#start_game').prop('disabled', true)
    }
}