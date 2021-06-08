

class Game{
    constructor(){
        this.playersGuess=5;
        this.pastGuesses=[];
        this.winningNumber= this.generateWinningNumber();

        this.pre0=document.getElementById('pre0')      //each li
        this.pre1=document.getElementById('pre1')
        this.pre2=document.getElementById('pre2')
        this.pre3=document.getElementById('pre3');

        this.message=document.getElementById('hint-box')
        this.playAgain=document.getElementById('playAgain')
        this.hint=document.getElementById('hint')
    }
    
    playersGuessSubmission(num){
        if(isNaN(num)|| num < 1 || num > 100){
            throw 'That is an invalid guess.'
        }else{
            this.playersGuess=num;
            return this.checkGuess()
        }
        
    }
    difference(){
                return Math.abs(this.playersGuess-this.winningNumber)
            }
    checkGuess(){
        if(this.playersGuess===this.winningNumber){
            this.message.innerHTML= 'You Win!';
            //finish
        }else if(this.pastGuesses.includes(this.playersGuess)){
            this.message.innerHTML= "You have already guessed that number."
        }else{
                this.pastGuesses.push(this.playersGuess);
                if(this.pastGuesses.length > 4){
                    this.message.innerHTML= "You Lose."
                }else if(this.difference() < 10){
                    this.message.innerHTML= "You\'re burning up!"
                }else if(this.difference() < 25){
                    this.message.innerHTML= "You're lukewarm."
                }else if(this.difference() < 50){
                    this.message.innerHTML= "You're a bit chilly."
                }else if(this.difference() < 100){
                    this.message.innerHTML= "You're ice cold!"
                }
            
        }
        this.pre0.innerHTML= this.pastGuesses[0] ? this.pastGuesses[0] : "";
        this.pre1.innerHTML= this.pastGuesses[1] ? this.pastGuesses[1] : "";
        this.pre2.innerHTML= this.pastGuesses[2] ? this.pastGuesses[2] : "";
        this.pre3.innerHTML= this.pastGuesses[3] ? this.pastGuesses[3] : "";
       return this.message
    }
    
    generateWinningNumber(){
        return Math.ceil(Math.random()*100)
    }
    getInputAndUpdate(input){
        const newNumber= Number(input.value);           //value: input에 입력한 값
        
        input.value=''
        return this.playersGuessSubmission(newNumber)
    }

    reset(){
        this.pastGuesses=[];
        pre3.innerHTML= '';
        pre2.innerHTML= '';
        pre1.innerHTML= '';
        pre0.innerHTML= '';
        this.message.innerHTML='Take a guess between 1-100'
    }
    shuffle(arr) {
        //Fisher-Yates - https://bost.ocks.org/mike/shuffle/
        for (let i = arr.length - 1; i > 0; i--) {
            console.log('many',i)
          let randomIndex = Math.floor(Math.random() * (i + 1)); //2,1,0  1,0
          let temp = arr[i];  //arr[2]
          arr[i] = arr[randomIndex];       //arr[2]=arr[1]
          arr[randomIndex] = temp;
        }
        return arr
        // return alert(`Choose one of ${arr}`);
      }
    provideHint(){
        let hints=[1,2,3];
        hints[0]=this.winningNumber;
        hints[1]=this.generateWinningNumber()
        hints[2]=this.generateWinningNumber();
        let hintArray=this.shuffle(hints)

        return alert(`Choose one of ${hintArray}`);
    }
}



 
function newGame(){
    return new Game();
}

function playGame(){
    const game=newGame()
    console.log(game)
    const submitButton= document.getElementById('submitButton');
    console.log(submitButton)
    submitButton.addEventListener('click', function(){         // element.method()

        const input= document.querySelector('input');
        console.log(input)
        //call checkGuess function
        game.getInputAndUpdate(input)
        
    })     
    playAgain.addEventListener('click',function(){
        game.reset()
    })
    hint.addEventListener('click', function(){
        game.provideHint()
    })
}

playGame();