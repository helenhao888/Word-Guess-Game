var i;
// predefined word list

function clickFunction(){
    alert("Rule 1: Type any key to start");
}

//object defination
var guessGame = {
    currentWord: "",
    currentWordArray:[],
    displayArray:[],
    winTimes: 0,
    remainingTimes:0 ,
    inputNum:0,
    guessHistory: [""],
    guessWord:[""],
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
       this.guessHistory.push(inputLetter);      
    },

    newGame: function(){
        this.currentWord = "";
        this.winTimes = 0;
        this.remainingTimes = 20;
        document.getElementById("winCount").innerHTML=this.winTimes;
        document.getElementById("remainingCount").innerHTML=this.remainingTimes;

        for (i=0; i<this.guessHistory.length;i++){
            this.guessHistory[i]="";
        }
        var wordId=this.pickRandomWord(this.remainingTimes);
        this.currentWord=this.wordLibrary[wordId];

        console.table(this);
        console.table("curent word "+this.currentWord);

        len =  this.currentWord.length;
        initResult =[];
        this.inputNum = 0;
    
        for( var i = 0; i < len; i++ ) {
       		
        // //    initResult [i]  = '<span>' + "_" + '</span>';	
             this.currentWordArray.push(this.currentWord[i])     
        //     console.log("i=",i);
        //     console.log("currentArray "+ this.currentWordArray[i]);
        initResult.push("_");
        }	
        console.log("initResult ", initResult);
       // document.getElementById("currentWord").innerHTML = initResult.join(' ');
       document.getElementById("currentWord").innerHTML = initResult;
        this.displayArray=initResult.join(' ');
        console.log("display ", this.displayArray);
        
    },

   wordGuessProcess: function(userLetter){
  
    if (this.remainingTimes <= 0) {
        console.log("fail display")
    } else if (this.remainingTimes >0 && this.remainingTimes <= 20 ){
        console.log("guess process");
        console.log("word array ",this.currentWordArray);

        if (userLetter === this.currentWordArray[this.inputNum]){
            console.log("guess good ", userLetter);
            this.displayArray[this.inputNum]=userLetter;
            console.log("inputNum final ",this.inputNum);
            console.log("display array ",this.displayArray[this.inputNum]);
            document.getElementById("currentWord").innerHTML = this.displayArray;

            //when add to length, wins +1 
        }
       else{
            console.log("not matched");
            this.remainingTimes--;
            document.getElementById("remainingCount").innerHTML =  this.remainingTimes;
            //add letter guessed
       }
        
       
            
       

    } else{
        console.log("invalide times " + this.remainingTimes);
    }
           
   },

// pick up Word Randomly
   pickRandomWord: function (times) {
       console.log("pick up function ", times);
    var  rand = Math.floor(Math.random()*times);
    console.log(rand);
    return rand;
}
}

//start the game 
function startFunction() {
    guessGame.newGame();
  /*  document.getElementById("winCount").innerHTML="0";
    document.getElementById("remainingCount").innerHTML="20";*/
   
}
document.onkeyup = function(event){
    // Determines which key was pressed.
    var userGuess = event.key.toLowerCase();
     console.log("input letter ", userGuess);
     console.log("word array onkey",guessGame.currentWordArray);
    guessGame.wordGuessProcess(userGuess);

}


 
