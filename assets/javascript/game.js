
var guessHistory = new Array();
var gameFlag = true;

function clickFunction(){
    alert("Rule 1: Type any key to start");
}

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
        console.log("add history num" , this.historyNum ,inputLetter);      
      //  console.log("guesshistory ",this.guessHistory);
        
        guessHistory.push(inputLetter);   
     
       console.log("history array",       guessHistory);
       console.log("history array len",guessHistory.length);
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
         
            // for (i=0; i<guessHistory.length;i++){
            //     //guessHistory[i]="";
            //     delete.guessHistory[i];
            // }
            guessHistory=[];
           console.log("guesshistory ",this.guessHistory);
        }
        
        console.log("round win"+ this.round+" " + this.winTimes);
        this.currentWord = "";      
        this.historyNum = 0;
        this.guessHistory = "";  
        document.getElementById("winCount").innerHTML=this.winTimes;
        document.getElementById("remainingCount").innerHTML=this.remainingTimes;
        document.getElementById("guessedLetters").innerHTML=guessHistory;


        var wordId=this.pickRandomWord(this.remainingTimes);
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
       
            console.log("userletter",userLetter);
            console.log("input num inside", this.inputNum);         
            if (userLetter === this.currentWord[this.inputNum-1]){
                console.log("guess good ", userLetter);                 
                this.displayArray[this.inputNum-1] = userLetter;         
           
                document.getElementById("currentWord").innerHTML = this.displayArray;
                console.log("inside input num mid", this.inputNum);
             //   if (this.inputNum === this.currentWordArray.length ){
                if (this.inputNum === this.currentWord.length ){     
                   //when add to length, wins +1              
                   this.winTimes++;      
                   document.getElementById("winCount").innerHTML = this.winTimes ;
                   this.round++;
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
   pickRandomWord: function (times) {
       console.log("pick up function ", times);
    var  rand = Math.floor(Math.random()*times);
    console.log(rand);
    return rand;
},

// sucessfully guessed all words, game over and can restart again 
    successProcess: function(){
    console.log("succeeded");
    },

    failProcess: function(){
     console.log("failure");
     //reset all values, including wintimes, remainingTimes, currentWord,guessHistory   
     
     //set gameFlag to false 
     gameFlag = false;
     //display failure info 
     alert("Game over , press the start button to restart");
    }

}

//start the game 
function startFunction() {
    guessGame.round = 1;
    guessGame.newGame();
 
   
}
document.onkeyup = function(event){
    // Determines which key was pressed.
    if (gameFlag === true){
        var userGuess = event.key.toLowerCase();
        //  console.log("input letter ", userGuess);
        //  console.log("word onkey",guessGame.currentWord);
        //  console.log("input Num",guessGame.inputNum);
        guessGame.inputNum++;

        if (guessGame.round <= 5){
    //     if (guessGame.inputNum <= guessGame.currentWordArray.length ){
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


 
