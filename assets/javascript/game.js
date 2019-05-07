
var guessHistory = new Array();
var gameFlag = true;
const randConst = 80;
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

    addHistory: function(inputLetter) {        
           
        guessHistory.push(inputLetter);       
        this.historyNum++;
        document.getElementById("guessedLetters").innerHTML=guessHistory;
    },

    newGame: function(){
        console.log("new gate start win times",this.winTimes);
        if (this.round === 1 ){
            console.log("round 1");
            this.winTimes = 0;
            this.remainingTimes = 20;
            gameFlag = true;
            guessHistory=[];
          
           var imgId = document.getElementById("imgPresent");
           imgId.src=("assets/images/1.jpg");
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

        console.table("curent word "+this.currentWord);
      
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
    
        console.log("remaining",this.remainingTimes);
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
                console.log("inside input num mid", this.inputNum);
                if (this.inputNum === this.currentWord.length ){     
                   //when add to length, wins +1              
                   this.winTimes++;      
                   document.getElementById("winCount").innerHTML = this.winTimes ;
                   this.round++;
                   guessHistory=[];
                   guessedLetId.innerHTML=guessHistory;
                }
                
            }
            
        else{
            // letter not matched process
                console.log("not matched");
                this.remainingTimes--;
            //inptNum stores the correct input number of the letters    
                this.inputNum--;
                document.getElementById("remainingCount").innerHTML =  this.remainingTimes;
                //add letter guessed
                this.addHistory(userLetter);
        }
                

        } else{
            console.log("invalide times " + this.remainingTimes);
        }
        console.log("inside input num last", this.inputNum);
    },

// pick up Word Randomly
   pickRandomWord: function () {        
       
    var  rand = Math.floor(Math.random()* randConst);
    console.log(rand);
    return rand;
},

// sucessfully guessed all words, game over and can restart again 
    successProcess: function(){
    console.log("succeeded");
    imgId = document.getElementById("imgPresent");
    imgId.src=("assets/images/success.png");
    document.getElementById("myAudio").play();
    alert("Please select start key to start a new game. Good Luck!");
    },

    failProcess: function(){
     console.log("failure");
          
     //set gameFlag to false 
     gameFlag = false;
     imgId = document.getElementById("imgPresent");
     //display failure info , image and play sound
     imgId.src=("assets/images/lose.png");
     document.getElementById("myAudio").play();
     
     alert("Game over , press the start button to restart");
    }

}

//start the game 
function startFunction() {
    guessGame.round = 1;
    guessGame.newGame();
    
}

function clickFunction(){
    alert(" Rule 1: Press start button to start. \n Rule 2: Each game has 5 rounds.\n Rule 3: You have max 20 times try. \n Good Luck! " );
}


document.onkeyup = function(event){
    // Determines which key was pressed.
    if (gameFlag === true){
        var userGuess = event.key.toLowerCase();
        
        guessGame.inputNum++;

        if (guessGame.round <= 5){

            if (guessGame.inputNum <= guessGame.currentWord.length ){
                guessGame.wordGuessProcess(userGuess);
            } else{
                
                console.log("else  start new word");
                guessGame.newGame();
            }
        } else{
            console.log("success final");
            guessGame.successProcess();
        }
    } else{
        alert("game over, press start button ");
    }
}


 
