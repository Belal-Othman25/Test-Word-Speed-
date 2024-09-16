/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
  ];
  console.log(words[Math.floor(Math.random(words)*words.length)])

//  let arr = words.filter((a)=> a.length <=6)
//  console.log(arr)
//  let arr2= words.filter((a)=> a.length<=7 && a.length>6)
//  console.log(arr2)
//  let arr3 =  words.filter((a)=> a.length<=13 && a.length>7)
//  console.log(arr3)
  //Setting Levels
  const lvls = {
    "Easy":5,
    "Normal":3,
    "Hard":2
  };
 
  // Catch Selector
  let startBtn = document.querySelector(".start");
  let lvlNameSpan =document.querySelector(".meesage .lvl");
  let secondSpan = document.querySelector(".meesage .second");
  let theWord = document.querySelector(".the-word");
  let upComingWord = document.querySelector(".upcoming-words");
  let scoreGot = document.querySelector(".score .got");
  let scoreTotal = document.querySelector(".score .total")
  let input =document.querySelector(".input");
  let timeLeftSpan = document.querySelector(".time span")
  let finishMessage = document.querySelector(".finish")
  let selectLvl = document.querySelector(".select-level #mySelect ");
  let showLevels = document.querySelector(".show-levels");


// create Select Levels

    let arrayOfSelect =Object.keys(lvls)
arrayOfSelect.forEach((level)=>{
    let option = document.createElement("option");
    option.value = level;
    option.textContent = level
    selectLvl.appendChild(option)
    console.log(selectLvl)
})
     // Defulat Level
    let defulatLevelName = selectLvl.value ;// change Level From Here
    let defulatLeveSeconds = lvls[defulatLevelName];
// Set Initial Level and Time
     lvlNameSpan.textContent = defulatLevelName;  
     secondSpan.innerHTML =defulatLeveSeconds;
     timeLeftSpan.innerHTML = defulatLeveSeconds;
     scoreTotal.innerHTML = words.length;
    // set a dynamic select change level and time 
     selectLvl.addEventListener("change", function () {
      defulatLevelName = this.value;
      defulatLeveSeconds = lvls[defulatLevelName];
      lvlNameSpan.textContent = defulatLevelName;
      secondSpan.innerHTML = defulatLeveSeconds;
      timeLeftSpan.innerHTML = defulatLeveSeconds;
  });
  // Disable Paste Event 
   input.onpaste= function(){
    return false
   }

   // Start Game 
   startBtn.onclick = function(){
    this.remove();
    input.focus();
    // Generate Word Fun
    genWords()
   }
   function genWords(){
    // Get Random Word From Array;
    let randomWord = words[Math.floor(Math.random()* words.length)];
   // Get Word Index
   let wordIndex = words.indexOf(randomWord) ;
  // Remove Word From Array
   words.splice(wordIndex , 1);
   // Show The Random Word
   theWord.innerHTML = randomWord
// Empty UpcomingWord
  upComingWord.innerHTML ='';
 // GEnerate Word 
 for(let i=0 ;i<words.length;i++){
 // create Div Elemet
 let div = document.createElement("div");
 let text = document.createTextNode(words[i]);
 div.appendChild(text);
 upComingWord.appendChild(div)
 }
 // Call Start Play Fun
 startPlay()
   }
   function startPlay(){
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === "0"){
            // Stop Time
            clearInterval(start)
            // compareWords
            if(theWord.innerHTML.toLowerCase() === input.value.toLowerCase()){
            // Empty Input valid
            input.value = '';
            scoreGot.innerHTML++;
            if(words.length>0){
           // Call Generate fun
           genWords()
            }else{
                let span = document.createElement("span");
                span.className="good";
                let spanText = document.createTextNode("Congratiolation");
                span.appendChild(spanText);
                finishMessage.appendChild(span)
                //Remove Upcoming Words 
                upComingWord.remove()
            }
            }else{
                let span = document.createElement("span");
                span.className="bad";
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span)
            }
        }
    }, 1000);
   }