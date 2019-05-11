
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
      
        //check if it's the first word to guess
        if (this.round === 1 ){
           
            this.winTimes = 0;
            this.remainingTimes = 20;
            gameFlag = true;
          
            guessHistory=[];
          
           var imgId = document.getElementById("imgPresent");
           imgId.src=("assets/images/newgame.jpg");
        }
        
        
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
    
        
        
    },

   wordGuessProcess: function(userLetter){
    
      
    
        if (this.remainingTimes <= 0) {
          
            
             //  call fail process
            this.failProcess();
           
        } else if (this.remainingTimes >0 && this.remainingTimes <= 20 ){
           
              
            if (userLetter === this.currentWord[this.inputNum-1]){
                              
                this.displayArray[this.inputNum-1] = userLetter;         
           
                document.getElementById("currentWord").innerHTML = this.displayArray;
                
                if (this.inputNum === this.currentWord.length ){     
                   //when add to current word's length, it means user guesses this word successfully,  winTimes +1              
                   this.winTimes++;      
                   document.getElementById("winCount").innerHTML = this.winTimes ;
                   this.round++;
                   guessHistory=[];
                   guessedLetId.innerHTML=guessHistory;
                  
                }
                
            }
            
        else{
            // Input letter not matched process
                
                this.remainingTimes--;
                //inptNum stores the correct input number of the letters    
                this.inputNum--;
                
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
    popupProcess();
    
    },

    failProcess: function(){
     
          
     //set gameFlag to false 
     gameFlag = false;
     imgId = document.getElementById("imgPresent");
     //display failure info , image and play sound
     imgId.src=("assets/images/lose.png");
     imgId.style.height="150px";
     imgId.style.width="200px";
     document.getElementById("loseAudio").play();    
     popupProcess();
   

    }
}   //end of object 


function popupProcess(){
      // Get the modal
     
      var modal, span;
       if (gameFlag ){
        modal = document.getElementById('myModalSuccess');
        // Get the <span> element that closes the modal
        span = document.getElementsByClassName("closesuccess")[0];
       }else{
        modal = document.getElementById('myModalFail');   
        span = document.getElementsByClassName("closefail")[0];
       }

     
         //  open the modal 
         modal.style.display = "block";
       
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
        
               modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
           
        if (event.target !== modal) {
            modal.style.display = "none";
        }
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
        
        if (guessGame.round <= maxRound){

            
            if (guessGame.inputNum <= guessGame.currentWord.length ){
                guessGame.wordGuessProcess(userGuess);
            } else{
                
                
                guessGame.newGame();
            }
        } else{
            console.log("final round success ");
            guessGame.successProcess();
        }
    } else{
     //   alert("game over, press start button ");
            popupProcess();
    }
}


 
