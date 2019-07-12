$(document).ready(function () {
    // Reset
    var fighter = 120;
    var enemy = 120;
    var attack = 1;
    var enemyRan = 0;
    var fighterRan = 0;
    var enemyAP = 0;
    var fighterAP = 1;
    var checkEnemyHPNum = 0;
    var checkFighterHPNum = 0;
    var isFighterSelected = false;
    var isEnemySelected = false;
    var selectedFighterAP = "";
    var selectedEnemyAP = "";
    var checkEnemyHP = "";
    var checkFighterHP = "";
    var missingDiv = "";
    var missingDiv2 = "";
    var missingDivIndex = 0;
    var missingDivIndex2 = 0;
    var selectedDefender = "";
    var selectedFighter = "";
    var fighters = ["Harrison","Matthew","Schaen"];
    var enemies = ["Hitler", "Satan", "Carbs"];
    for (var i = 0; i < fighters.length; i++) {
        fighterAP = Math.floor((Math.random() * 6) + 1);
        // Create Player and Assign Player Attack Points
        $('#fighters').append('<div class="col-sm-4"><div class="fighter" data-hitPoints="' + fighterAP + '"><div id="name">' + fighters[i] + '</div><div id="fighterImage"><img src="https://dummyimage.com/200x200.png" class="img-thumbnail" width="200" height="200" alt=""/></div><div id="healthPoints"><span class="healthPoints  text-center">120</span></div></div></div>');
    }
    // Assign Enemy Attack Points
    for (var j = 0; j < enemies.length; j++) {
        enemyRan = Math.floor((Math.random() * 5) + 1);
        enemyAP = enemyRan * 5; // enemy HP will be random (between 5 and 25)
        $('#enemies').append('<div class="col-sm-4"><div class="enemy" data-hitPoints="' + enemyAP +'"><div class="enemyName">' + enemies[j] + '<div class="enemyImage"><img src="https://dummyimage.com/200x200.png" class="img-thumbnail" width="200" height="200" alt=""/></div><div class="HP"><span class="healthPoints  text-center">120</span></div></div></div>');
    }
    // Choose a fighter
    $('.fighter').on("click", function() {
        // add border to selected fighter
        $('.fighter').removeClass('selected');
        $(this).addClass('selected');
        isFighterSelected = true;
        $('#hero').append($(this));
    });
    // Choose an enemy
    $('.enemy').on("click", function() {
        if(isFighterSelected) {
            // add border to selected fighter
            $('.enemy').removeClass('selected');
            $(this).addClass('selected');
            $('#defender').append($(this)); 
            isEnemySelected = true; 
            $('#attack').removeAttr('disabled');
        }
    });
    // Attack function
    $('#attack').on("click", function() {
        selectedFighterAP = $('.fighter.selected').attr('data-hitPoints');
        selectedEnemyAP = $('.enemy.selected').attr('data-hitPoints');
        fighterAttack = selectedFighterAP;
        if(isEnemySelected && isFighterSelected) {
            fighterAttack = attack * selectedFighterAP;
            // Fighter HP
            fighter -= selectedEnemyAP;  
            $('.fighter.selected .healthPoints').text(fighter);      
            // Enemy HP
            enemy -= fighterAttack;

            $('.enemy.selected .healthPoints').text(enemy);
            // Update Play by Play
            $('.pbpTextFighter').text("You attacked and caused " + fighterAttack + " damage");
            $('.pbpTextEnemy').text("You're opponent attacked and caused " + selectedEnemyAP + " damage");
            attack++;
            checkHP();
            $('#reset').show();
        }
        
    });
    // Check HP
    function checkHP() {
        checkEnemyHP =  $('.enemy.selected .healthPoints').text();
        checkFighterHP =  $('.fighter.selected .healthPoints').text();

        checkEnemyHPNum = parseInt(checkEnemyHP);
        checkFighterHPNum = parseInt(checkFighterHP);

        if (checkEnemyHPNum <= 0) {
            alert('Game Over. You Win.');
            $('#attack').prop('disabled',true);

        }
        if (checkFighterHPNum <= 0) {
            alert('Game Over. You Lose.');
            $('#attack').prop('disabled',true);
        } 
    }
    function reset() {
        fighter = 120;
        enemy = 120;
        attack = 1;
        enemyRan = 0;
        fighterRan = 0;
        enemyAP = 0;
        fighterAP = 1;
        checkEnemyHPNum = 0;
        checkFighterHPNum = 0;
        isFighterSelected = false;
        isEnemySelected = false;
        selectedFighterAP = "";
        selectedEnemyAP = "";
        checkEnemyHP = "";
        checkFighterHP = "";
        missingDiv = "";
        missingDiv2 = "";
        missingDivIndex = 0;
        missingDivIndex2 = 0;
        selectedDefender = "";
        selectedFighter = "";
        
        var elems = $('#enemies .col-sm-4');
        var elems2 = $('#fighters .col-sm-4');
        var args = jQuery.makeArray(elems);
        var args2 = jQuery.makeArray(elems2);
        jQuery.each(args, function(k, val) {

        if($(args[k]).html().length == 0) {
            missingDiv = args[k];
            missingDivIndex = $(this).index();
            selectedDefender = $('#defender .enemy.selected');
            $('#enemies .col-sm-4').eq(missingDivIndex).html(selectedDefender);
        }
        });

        jQuery.each(args2, function(l, val) {

            if($(args2[l]).html().length == 0) {
                missingDiv2 = args2[l];
                missingDivIndex2 = $(this).index();
                selectedFighter = $('#hero .fighter.selected');
                console.log(selectedFighter);
                $('#fighters .col-sm-4').eq(missingDivIndex2).html(selectedFighter);
            }
        });
        $('#reset').hide();
        $('#attack').prop('disabled',true);
        $('.enemy.selected').removeClass('selected');
        $('.fighter.selected').removeClass('selected');
        $('.enemy .healthPoints').text("120");
        $('.fighter .healthPoints').text("120");
        $('.pbpTextFighter, .pbpTextEnemy').empty();
    }
    $('#reset').on("click",function() {
        reset();
    });
    reset();
});