let current=1;
function next(n){
  document.getElementById('s'+current).classList.remove('active');
  document.getElementById('s'+n).classList.add('active');
  current=n;

  handleMusic(n); // ✅ THIS LINE ADDED

  if(n==2) startGame();
  if(n==3) puzzle();
  if(n==5) typing();
}
// GAME
let score=0;
function startGame(){
  let area=document.getElementById('gameArea');
  let interval=setInterval(()=>{
    let heart=document.createElement('div');
    heart.innerHTML='❤️';
    heart.style.position='absolute';
    heart.style.left=Math.random()*90+'%';
    heart.style.top='0px';
    heart.style.fontSize='24px';
    heart.onclick=()=>{
      score++;
      document.getElementById('score').innerText=score;
      heart.remove();
      if(score>=5){
        clearInterval(interval);
        next(3);
      }
    };
    area.appendChild(heart);

    // fall animation
    let pos=0;
    let fall=setInterval(()=>{
      pos+=5;
      heart.style.top=pos+'px';
      if(pos>window.innerHeight){
        heart.remove();
        clearInterval(fall);
      }
    },50);

  },1000);
}

// PUZZLE
function puzzle(){
  let grid=document.getElementById('grid');
  grid.innerHTML='';
  let count=0;
  for(let i=0;i<9;i++){
    let box=document.createElement('div');
    box.onclick=()=>{
      box.style.background='pink';
      count++;
      if(count===9) next(4);
    };
    grid.appendChild(box);
  }
}
function handleMusic(screen){
  const music = document.getElementById('bgMusic');
  if(!music) return;

  if(screen === 4 || screen === 5){
    music.volume = 0.3;
    music.play().catch(() => {});
  } else {
    music.pause();
    music.currentTime = 0;
  }
}

// TYPING MESSAGE
let text="You know what a beautiful thing this journey reminds us off....that with making grow this bond We have also grown indivudually so far having eachother by the side 💖";
function typing(){
  let i=0;
  let el=document.getElementById('msg');
  el.innerHTML='';
  let interval=setInterval(()=>{
    el.innerHTML+=text[i];
    i++;
    if(i===text.length) clearInterval(interval);
  },50);
}

// SECRET CODE
function checkCode(){
  let val=document.getElementById('code').value;
  if(val==='18') next(7);
  else alert('Wrong code 😢');
}
function endProject() {
  window.close();
}