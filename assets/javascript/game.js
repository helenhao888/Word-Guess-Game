
var guessHistory = new Array();
var gameFlag = true;
const randomConst = 80;
const maxRound = 5;
var guessedLetId;
var imgId;



//object definition
var guessGame = {
    currentWord: "",
    displayArray:[],
    winTimes: 0,
    round:0,
    remainingTimes:0 ,
    inputNum:0,
    historyNum:0,
  //  guessHistory:new Array(), why defined here , can't use in addHistory function by push
  
    // predefined word list
    wordLibrary: [ "respect","frighten","wicked","reward","wooden","swanky","powerful","righteous",
                    "overrated","abstracted","embarrassed","view","juice","beds","gather","rude",
                    "hate","liquid","metal","gate","learn","water","irate","hallowed","goofy","separate",
                    "work","attend","scale","miss","zip","sticks","careless","stain","glib","hurry",
                    "furtive","kettle","brainy","delay","unwieldy","station","sort","glistening",
                    "mere","material","purple","clammy","warm","obey","boring","pan","honorable","twist",
                    "null","canvas","ludicrous","part","questionable","board","ladybug","recess","jealous",
                    "phone","face","gun","teeth","business","hammer","guess","burst","rely","scent","sneeze",
                    "sticky","vivacious","noisy","unaccountable","perfect","oafish"],

  
    newGame: function(){
        console.log("new gate start win times",this.winTimes);
        if (this.round === 1 ){
            console.log("round 1");
            this.winTimes = 0;
            this.remainingTimes = 20;
            gameFlag = true;
            guessHistory=[];
          
           var imgId = document.getElementById("imgPresent");
           imgId.src=("assets/images/newgame.jpg");
        }
        
        console.log("round win"+ this.round+" " + this.winTimes);
        this.currentWord = "";      
        this.historyNum = 0;
       // this.guessHistory = "";  
        document.getElementById("winCount").innerHTML=this.winTimes;
        document.getElementById("remainingCount").innerHTML=this.remainingTimes;
        guessedLetId = document.getElementById("guessedLetters")
        guessedLetId.innerHTML=guessHistory;


        var wordId=this.pickRandomWord();
        this.currentWord=this.wordLibrary[wordId];

        console.table("current word "+this.currentWord);
      
        len =  this.currentWord.length;
        initResult =[];
        this.inputNum = 0;
    
        for( var i = 0; i < len; i++ ) {
             
             initResult.push("_");
        }	
             
        document.getElementById("currentWord").innerHTML = initResult;
        this.displayArray=initResult;
        console.log("display ", this.displayArray);
        
    },

   wordGuessProcess: function(userLetter){
    
        console.log(" word process remaining",this.remainingTimes);
        if (this.remainingTimes <= 0) {
            console.log("fail display")
             //  call fail process
            this.failProcess();
           
        } else if (this.remainingTimes >0 && this.remainingTimes <= 20 ){
            console.log("guess process");
              
            if (userLetter === this.currentWord[this.inputNum-1]){
                console.log("guess good ", userLetter);                 
                this.displayArray[this.inputNum-1] = userLetter;         
           
                document.getElementById("currentWord").innerHTML = this.displayArray;
              
                if (this.inputNum === this.currentWord.length ){     
                   //when add to current word's length, it means user guesses this word successfully,  winTimes +1              
                   this.winTimes++;      
                   document.getElementById("winCount").innerHTML = this.winTimes ;
                   this.round++;
                   guessHistory=[];
                   guessedLetId.innerHTML=guessHistory;
                   console.log("in word process wintimes ",this.winTimes);
                   console.log(" word process remaining times ", this.remainingTimes);
                }
                
            }
            
        else{
            // Input letter not matched process
                console.log("not matched");
                console.log("in word process else wintimes ",this.winTimes);
                   console.log(" word process else remaining times ", this.remainingTimes);
                this.remainingTimes--;
                //inptNum stores the correct input number of the letters    
                this.inputNum--;
                console.log("in word process else wintimes ",this.winTimes);
                console.log(" word process else before display remaining times ", this.remainingTimes);
                document.getElementById("remainingCount").innerHTML =  this.remainingTimes;
                //add letter guessed
                this.addHistory(userLetter);
        }
                

        } else{
            console.log("invalid times " + this.remainingTimes);
        }
        
    },

// pick up Word Randomly
   pickRandomWord: function () {        
       
    var  rand = Math.floor(Math.random()* randomConst);
    console.log(rand);
    return rand;
},

    addHistory: function(inputLetter) {        
           
    guessHistory.push(inputLetter);       
    this.historyNum++;
    document.getElementById("guessedLetters").innerHTML=guessHistory;
},

// Successfully guessed all words, game over, present win image and play sound, then can restart again 
    successProcess: function(){
  
    imgId = document.getElementById("imgPresent");
    imgId.src=("assets/images/success.png");
    imgId.style.height="150px";
    imgId.style.width="200px";
    document.getElementById("successAudio").play();
    alert("You Win!!! Please select start key to start a new game. Good Luck!");
    },

    failProcess: function(){
     console.log("failure");
          
     //set gameFlag to false 
     gameFlag = false;
     imgId = document.getElementById("imgPresent");
     //display failure info , image and play sound
     imgId.src=("assets/images/lose.png");
     imgId.style.height="150px";
     imgId.style.width="200px";
     document.getElementById("loseAudio").play();
     
     alert("Game over , press the start button to restart");
    }

}

//start the game 
function startClickFunction() {
    guessGame.round = 1;
    guessGame.newGame();
    
}

function ruleClickFunction(){
    alert(" Rule 1: Press start button to start. \n Rule 2: Each game has 5 rounds.\n Rule 3: You have max 20 times try. \n Good Luck! " );
}


document.onkeyup = function(event){
    // Determines which key was pressed. Repeats check guessed word till reaches max round or remaining times equal 0
    // game flag indicate whether the remaining times reaches 0 , fail process function should be called.

    if (gameFlag === true){
        var userGuess = event.key.toLowerCase();
    // each time , user input a letter, input letter number add 1    
        guessGame.inputNum++;
        console.log("key up input num",guessGame.inputNum);
        console.log("key up round",guessGame.round);
        if (guessGame.round <= maxRound){

            console.log("key up word len",guessGame.currentWord.length);
            if (guessGame.inputNum <= guessGame.currentWord.length ){
                guessGame.wordGuessProcess(userGuess);
            } else{
                
                console.log("else  start new word");
                guessGame.newGame();
            }
        } else{
            console.log("final round success ");
            guessGame.successProcess();
        }
    } else{
        alert("game over, press start button ");
    }
}


 
