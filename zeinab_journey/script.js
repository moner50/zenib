const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const progress=$("#progressBar"), nav=$(".timeline-nav"), audio=$("#audio"), musicBtn=$("#musicBtn"), musicText=$("#musicText");
const sections=[...$$(".section")];
function go(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"});}
$$("[data-next]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.next)));
$$(".timeline-nav button").forEach(b=>b.addEventListener("click",()=>go(b.dataset.target)));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("seen"); if(e.target.id!=="start")nav.classList.add("show");}}),{threshold:.18});
sections.forEach(s=>io.observe(s));
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:.15});
$$(".reveal").forEach(x=>reveal.observe(x));
const lineObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll(".line-reveal p").forEach((p,i)=>setTimeout(()=>p.classList.add("visible"),i*500));}}),{threshold:.25});
$$(".calmer").forEach(x=>lineObs.observe(x));
function update(){const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/Math.max(1,h)*100)+"%";}
addEventListener("scroll",update,{passive:true});update();
let playing=false;
musicBtn.addEventListener("click",async()=>{try{if(audio.paused){await audio.play();playing=true;musicBtn.textContent="Ⅱ";musicText.textContent="الموسيقى شغالة";}else{audio.pause();playing=false;musicBtn.textContent="♫";musicText.textContent="موسيقى الحكاية";}}catch(e){musicText.textContent="حطي music.mp3 في assets";}});
$$(".yes").forEach(b=>b.addEventListener("click",()=>positive()));
function positive(){
  const r=$("#response"); r.innerHTML="يمكن دي أبسط كلمة... بس بالنسبة لي، معناها بداية حكاية جديدة. ❤️";
  for(let i=0;i<24;i++){const h=document.createElement("span");h.textContent=["♥","✦","•"][i%3];h.style.cssText=`position:fixed;z-index:45;left:${Math.random()*100}vw;top:90vh;font-size:${12+Math.random()*22}px;color:#8fd1ff;pointer-events:none;animation:floatUp ${2+Math.random()*2}s ease-out forwards`;document.body.appendChild(h);setTimeout(()=>h.remove(),4200);}
  setTimeout(()=>$("#modal").classList.add("open"),900);
}
const maybe=$("#maybe");
maybe.addEventListener("mouseenter",moveMaybe); maybe.addEventListener("touchstart",e=>{e.preventDefault();moveMaybe();},{passive:false});
function moveMaybe(){const x=(Math.random()*120)-60,y=(Math.random()*45)-22;maybe.style.transform=`translate(${x}px,${y}px)`;setTimeout(()=>maybe.style.transform="",500);}
$("#close").addEventListener("click",()=>$("#modal").classList.remove("open"));
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")$("#modal").classList.remove("open");});
const style=document.createElement("style");style.textContent="@keyframes floatUp{to{transform:translateY(-100vh) rotate(360deg);opacity:0}}";document.head.appendChild(style);
// Optional music: put your chosen Assala MP3 at assets/music.mp3.
