const questions = [
  {
    type:"pg", title:"Soal 1 — Tangga Rumah 🏠",
    text:"Sebuah tangga panjangnya 13 m disandarkan pada dinding. Jarak kaki tangga ke dinding adalah 5 m. Berapa tinggi dinding yang dicapai tangga?",
    options:["8 m","10 m","12 m","14 m"], answer:2,
    explanation:"√(13² − 5²) = √144 = 12 m."
  },
  {
    type:"pg", title:"Soal 2 — Taman Sekolah 🌳",
    text:"Sebuah taman berbentuk persegi panjang memiliki panjang 20 m dan lebar 15 m. Berapa panjang diagonal taman?",
    options:["20 m","25 m","30 m","35 m"], answer:1,
    explanation:"√(20² + 15²) = √625 = 25 m."
  },
  {
    type:"pg", title:"Soal 3 — Tiang Bendera 🗼",
    text:"Sebuah tiang memiliki tinggi 20 m dan tali penyangga 29 m. Berapa jarak kaki tiang ke ujung tali?",
    options:["19 m","20 m","21 m","22 m"], answer:2,
    explanation:"√(29² − 20²) = √441 = 21 m."
  },
  {
    type:"pg", title:"Soal 4 — Jembatan 🌉",
    text:"Sebuah jalur membentuk segitiga siku-siku dengan sisi 16 m dan 30 m. Berapa panjang sisi miringnya?",
    options:["32 m","34 m","36 m","38 m"], answer:1,
    explanation:"√(16² + 30²) = √1156 = 34 m."
  },
  {
    type:"pg", title:"Soal 5 — Layang-layang 🪁",
    text:"Sebuah layang-layang membentuk segitiga siku-siku dengan sisi 24 m dan 10 m. Berapa sisi miringnya?",
    options:["24 m","25 m","26 m","28 m"], answer:2,
    explanation:"√(24² + 10²) = √676 = 26 m."
  },
  {
    type:"essay", title:"Soal 6 — Layar 📺",
    text:"Sebuah layar memiliki panjang 35 cm dan tinggi 12 cm. Hitung panjang diagonal layar. Tuliskan hasil dan langkah perhitungannya.",
    answers:["37","37 cm"], explanation:"√(35² + 12²) = √1369 = 37 cm."
  },
  {
    type:"essay", title:"Soal 7 — Arsitek 🏗️",
    text:"Sebuah konstruksi berbentuk segitiga siku-siku memiliki sisi siku-siku 40 cm dan 9 cm. Hitung panjang sisi miringnya.",
    answers:["41","41 cm"], explanation:"√(40² + 9²) = √1681 = 41 cm."
  },
  {
    type:"essay", title:"Soal 8 — Drone 🚁",
    text:"Sebuah drone berada 15 m secara horizontal dan 36 m secara vertikal dari suatu titik. Berapa jarak drone ke titik tersebut?",
    answers:["39","39 m"], explanation:"√(15² + 36²) = √1521 = 39 m."
  },
  {
    type:"essay", title:"Soal 9 — Harta Karun 💎",
    text:"Sebuah peta menunjukkan jarak horizontal 16 m dan jarak vertikal 30 m menuju harta karun. Berapa jarak langsung menuju harta karun?",
    answers:["34","34 m"], explanation:"√(16² + 30²) = √1156 = 34 m."
  },
  {
    type:"essay", title:"Soal 10 — BOSS LEVEL 👑",
    text:"Sebuah segitiga siku-siku memiliki sisi miring 50 m dan tinggi 48 m. Hitung panjang sisi horizontalnya. Tunjukkan perhitungannya.",
    answers:["14","14 m"], explanation:"√(50² − 48²) = √196 = 14 m."
  }
];

let quizIndex = 0;
let xp = 0;
let correct = 0;
let lives = 5;
let answered = false;

function showPage(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  const page = document.getElementById(id);
  if(page) page.classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

function openChapter(n){
  document.querySelectorAll(".lesson").forEach(x=>x.classList.add("hidden"));
  document.getElementById("chapter"+n).classList.remove("hidden");
  window.scrollTo({top:150,behavior:"smooth"});
}

function practiceAnswer(button, value){
  document.querySelectorAll(".answer-grid button").forEach(b=>b.disabled=true);
  const fb=document.getElementById("practiceFeedback");
  if(value===10){
    fb.textContent="🎉 Benar! 6² + 8² = 36 + 64 = 100, jadi sisi miring = 10 cm.";
    fb.style.color="#63f5a1";
  }else{
    fb.textContent="💡 Belum tepat. Coba gunakan a² + b² = c².";
    fb.style.color="#ffd35a";
  }
}

function checkMiniPractice(){
  const v=document.getElementById("miniAnswer").value.trim();
  const f=document.getElementById("miniFeedback");
  if(v==="15"){
    f.textContent="🎉 Benar! √(9² + 12²) = √225 = 15 cm.";
    f.style.color="#63f5a1";
  }else{
    f.textContent="💡 Belum tepat. Coba hitung 9² + 12² lalu ambil akar kuadratnya.";
    f.style.color="#ffd35a";
  }
}

function startQuiz(){
  quizIndex=0; xp=0; correct=0; lives=5; answered=false;
  showPage("quiz");
  renderQuestion();
  const overlay=document.getElementById("missionOverlay");
  if(overlay) overlay.classList.remove("hidden");
}
function closeMissionOverlay(){
  const overlay=document.getElementById("missionOverlay");
  if(overlay) overlay.classList.add("hidden");
}

function renderQuestion(){
  const q=questions[quizIndex];
  document.getElementById("quizCount").textContent=`Soal ${quizIndex+1} / ${questions.length}`;
  document.getElementById("quizXP").textContent=`XP: ${xp}`;
  document.getElementById("quizLives").textContent="❤️".repeat(lives)+"🖤".repeat(5-lives);
  document.getElementById("quizProgress").style.width=(((quizIndex+1)/questions.length)*100)+"%";

  const card=document.getElementById("quizCard");
  answered=false;

  if(q.type==="pg"){
    card.innerHTML=`
      <span class="question-label">PILIHAN GANDA • +100 XP</span>
      <h2>${q.title}</h2>
      <p>${q.text}</p>
      <div class="answer-grid">
        ${q.options.map((o,i)=>`<button onclick="answerPG(${i})">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}
      </div>
      <div id="feedback" class="feedback"></div>
    `;
  }else{
    card.innerHTML=`
      <span class="question-label">ESAI • +150 XP</span>
      <h2>${q.title}</h2>
      <p>${q.text}</p>
      <textarea id="essayAnswer" class="essay-area" placeholder="Tuliskan jawabanmu di sini..."></textarea>
      <div class="hint">💡 Petunjuk: tentukan terlebih dahulu sisi mana yang diketahui dan apakah yang dicari adalah sisi miring atau sisi siku-siku.</div>
      <button class="essay-submit" onclick="answerEssay()">✓ Periksa Jawaban</button>
      <div id="feedback" class="feedback"></div>
    `;
  }
}

function answerPG(choice){
  if(answered)return;
  answered=true;
  const q=questions[quizIndex];
  const buttons=document.querySelectorAll(".answer-grid button");
  buttons.forEach(b=>b.disabled=true);
  const fb=document.getElementById("feedback");
  if(choice===q.answer){
    correct++; xp+=100;
    fb.innerHTML=`🎉 <b>BENAR!</b> +100 XP<br>${q.explanation}`;
    fb.style.color="#63f5a1";
  }else{
    lives=Math.max(0,lives-1);
    fb.innerHTML=`❌ <b>Belum tepat.</b><br>${q.explanation}`;
    fb.style.color="#ff8f9d";
  }
  updateStatus();
  setTimeout(nextQuestion,1300);
}

function answerEssay(){
  if(answered)return;
  const input=document.getElementById("essayAnswer").value.trim().toLowerCase().replace(/\s+/g," ");
  if(!input){
    document.getElementById("feedback").textContent="✍️ Isi jawaban terlebih dahulu.";
    document.getElementById("feedback").style.color="#ffd35a";
    return;
  }
  answered=true;
  const q=questions[quizIndex];
  const normalized=input.replace(/,/g,".");
  const isCorrect=q.answers.some(a=>normalized===a.toLowerCase() || normalized===a.toLowerCase().replace(" ",""));
  const fb=document.getElementById("feedback");
  document.querySelector(".essay-submit").disabled=true;
  document.getElementById("essayAnswer").disabled=true;

  if(isCorrect){
    correct++; xp+=150;
    fb.innerHTML=`🎉 <b>BENAR!</b> +150 XP<br>${q.explanation}`;
    fb.style.color="#63f5a1";
  }else{
    lives=Math.max(0,lives-1);
    fb.innerHTML=`❌ <b>Belum tepat.</b><br>Jawaban akhir yang benar: ${q.answers[0]}<br>${q.explanation}`;
    fb.style.color="#ff8f9d";
  }
  updateStatus();
  setTimeout(nextQuestion,1500);
}

function updateStatus(){
  document.getElementById("quizXP").textContent=`XP: ${xp}`;
  document.getElementById("quizLives").textContent="❤️".repeat(lives)+"🖤".repeat(5-lives);
}

function nextQuestion(){
  if(lives<=0){
    showGameOver();
    return;
  }
  quizIndex++;
  if(quizIndex>=questions.length){
    finishQuiz();
    return;
  }
  renderQuestion();
}

function showGameOver(){
  document.getElementById("quizCard").innerHTML=`
    <div style="text-align:center;padding:30px 0">
      <div style="font-size:5rem">💔</div>
      <h1>GAME OVER</h1>
      <p>Nyawamu habis. Jangan menyerah, Math Explorer!</p>
      <button class="btn primary" onclick="startQuiz()">🔄 Coba Lagi</button>
    </div>
  `;
}

function finishQuiz(){
  const value=Math.round((correct/questions.length)*100);
  localStorage.setItem("mathQuestResult",JSON.stringify({correct,xp,value,date:new Date().toLocaleString("id-ID")}));
  document.getElementById("finalScore").textContent=xp;
  document.getElementById("finalCorrect").textContent=`${correct}/${questions.length}`;
  document.getElementById("finalValue").textContent=value;
  document.getElementById("resultTitle").textContent=value>=80?"MISSION COMPLETE!":"MISSION SELESAI!";
  document.getElementById("resultMessage").textContent=
    value>=80 ? "Luar biasa! Kamu berhasil menaklukkan Teorema Pythagoras. 🚀" :
    "Hebat, kamu sudah menyelesaikan misi. Baca kembali E-Modul dan coba lagi untuk meningkatkan nilaimu! 💪";
  showPage("result");
  launchConfetti();
  updateProgressPage();
}

function restartQuiz(){ startQuiz(); }

function updateProgressPage(){
  const data=JSON.parse(localStorage.getItem("mathQuestResult")||"null");
  const circle=document.getElementById("progressCircle");
  if(!data){
    circle.textContent="0%";
    document.getElementById("progressText").textContent="Belum ada kuis yang dikerjakan.";
    document.getElementById("progressXP").textContent="XP terakhir: 0";
    return;
  }
  circle.textContent=data.value+"%";
  circle.style.background=`radial-gradient(circle,#100a2e 58%,transparent 59%),conic-gradient(#63e8ff ${data.value*3.6}deg,#211944 0deg)`;
  document.getElementById("progressText").textContent=`Nilai terakhir: ${data.value} (${data.correct}/10 benar)`;
  document.getElementById("progressXP").textContent=`XP terakhir: ${data.xp}`;
}

function launchConfetti(){
  for(let i=0;i<70;i++){
    const c=document.createElement("span");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.animationDelay=Math.random()*1.5+"s";
    c.style.setProperty("--x",(Math.random()*240-120)+"px");
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3200);
  }
}

document.addEventListener("DOMContentLoaded",()=>{
  updateProgressPage();
});
