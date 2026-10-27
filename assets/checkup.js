/* ===== Check-up ("Test yourself"): 3 exam-style questions after the Lesson. Kept ONLY in this browser's localStorage. =====
   Same design as the maths check-up: nothing is timed, no hints during the test, never a gate (always optional).
   Points: right first try = 2, right on a new try = 1, finishing = 3 more, all 3 right first try = the game's Test badge.
   Points never go down. Each check-up is one entry in the practice history (mode "test"). English keys only (eng.*). No network code. */
var EngCheckup=(function(){
"use strict";
var BK=window.CHECKUP, G=window.GAME, SLUG=G.slug, TITLE=G.title, LSN=BK.lessons, NQ=3;
var RKEY="eng.rewards", UKEY="eng.checkup.unlocked", RUNKEY="eng.checkup.run."+SLUG, PKEY="eng.player", HKEY="eng.history", MKEY="eng.medal";
var STAR_FIRST=2, STAR_RETRY=1, STAR_FINISH=3;
// fixed lines (recorded clips); lines with a score or a name are read by the device voice
var SAY={
  intro:"Test yourself. Three questions, like in your exam.",
  mcq:"Choose the best answer. Tap its number.",
  box:"Choose the word from the box. Tap it.",
  type:"Write your answer in the box. Then tap Check.",
  empty:"Write your answer in the box first.",
  pick:"Tap an answer first.",
  cap:"Start your sentence with a capital letter.",
  stop:"End your sentence with a full stop.",
  long:"Too many words. Name just the thing in a few words.",
  right:"Yes, that's right. Read the steps to check how you got it.",
  rightRetry:"Yes, that's right this time. Read the steps to check how you got it.",
  notYet:"Not yet.",
  generic:"Read the question again. Find the clue words first, then check each answer against them.",
  lesson:"Go back to the lesson to see this step again. Then come back to your test.",
  retry:"Here is a new one like it.",
  sol:"Here are the steps. Read why each step is there.",
  back:"Welcome back to your test.",
  end:"You finished the check-up. Every question is done.",
  badge:"All three were right on the first try. You earned the Test badge for this game.",
  daddy:"If you like, you could show Daddy your reward points."
};
function $(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
function jget(k,d){ try{ var v=JSON.parse(get(k)||"null"); return v==null?d:v; }catch(e){ return d; } }
function say(){ var a=Array.prototype.slice.call(arguments).filter(Boolean); if(window.Voice && a.length) try{ Voice.say.apply(null,a); }catch(e){} }
function player(){ return (window.ENG && ENG.player) ? ENG.player() : "Player"; }
function norm(s){ return String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9' ]+/g," ").replace(/\s+/g," ").trim(); }
function sgt(t){ return new Date(t+8*36e5).toISOString().replace(/\.\d+Z$/,"+08:00"); }
var DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function dateLabel(t){ var d=new Date(t+8*3600000); return DAYS[d.getUTCDay()]+" "+d.getUTCDate()+" "+MONTHS[d.getUTCMonth()]+" "+d.getUTCFullYear(); }
function rnd(n){ return Math.floor(Math.random()*n); }

/* ---------- unlock: after a finished Lesson (this visit, the history, or a Lesson medal from before the history existed) ---------- */
function unlocked(){
  var u=jget(UKEY,{}); if(u && u[SLUG]) return true;
  var m=jget(MKEY,{}); if(m && m[SLUG]) return true;
  var h=jget(HKEY,[]); if(!Array.isArray(h)) return false;
  return h.some(function(x){ return x && x.game===SLUG && x.mode==="lesson" && !x.partial && x.done>0; });
}
function unlock(){ var u=jget(UKEY,{}); if(!u || typeof u!=="object") u={}; if(!u[SLUG]){ u[SLUG]=sgt(Date.now()); set(UKEY,JSON.stringify(u)); } drawBtn(); }

/* ---------- reward points (per player, never go down) ---------- */
function rewards(){ var r=jget(RKEY,null); if(!r || typeof r!=="object" || !r.players) r={v:1, players:{}}; return r; }
function me(r, who){ return r.players[who]||(r.players[who]={stars:0, badges:{}, tests:[]}); }
function addStars(n){ if(!(n>0)) return; var r=rewards(), P=me(r, run.player); P.stars=(+P.stars||0)+n; set(RKEY,JSON.stringify(r)); }
function addBadge(){ var r=rewards(), P=me(r, run.player), b=P.badges[SLUG]; if(!b) P.badges[SLUG]={first:sgt(Date.now()), count:1}; else b.count=(+b.count||0)+1; set(RKEY,JSON.stringify(r)); }
function logTest(){ var r=rewards(), P=me(r, run.player);
  P.tests=(P.tests||[]).filter(function(t){ return t.id!==run.id; });
  P.tests.push({id:run.id, game:SLUG, at:sgt(Date.now()), stars:run.stars, first:firstCount(run), done:doneCount(run), total:NQ, badge:!!run.badge});
  if(P.tests.length>50) P.tests=P.tests.slice(P.tests.length-50); set(RKEY,JSON.stringify(r)); }
function myStars(){ var P=rewards().players[player()]; return P?(+P.stars||0):0; }

/* ---------- the run (one check-up): saved so she can visit the lesson and come back ---------- */
var run=null, open=false;
function set_(r){ return BK.sets[r.set]; }
function item(r, s){ r=r||run; s=(s==null)?r.slot:s; return set_(r).slots[s][r.vi[s]]; }
function newVariant(r){ var n=set_(r).slots[r.slot].length, used=r.used[r.slot]; if(used.length>=n) used.length=0;
  var free=[]; for(var i=0;i<n;i++) if(used.indexOf(i)<0 && i!==r.vi[r.slot]) free.push(i); if(!free.length) free=[ (r.vi[r.slot]+1)%n ];
  var v=free[rnd(free.length)]; used.push(v); r.vi[r.slot]=v; }
function fresh(prevSet){
  var t=Date.now(), ns=BK.sets.length, s=rnd(ns); if(ns>1 && prevSet!=null && s===prevSet) s=(s+1)%ns;
  var r={v:1, id:SLUG+"-test-"+t+"-"+rnd(1e6), player:player(), t0:t, set:s, slot:0, attempt:1, vi:[0,0,0], used:[[],[],[]], phase:"intro", pick:null, typed:"",
    res:[0,1,2].map(function(){ return {first:null, got:false, tries:0, stars:0}; }), stars:0, wrongs:0, missTags:{}, diag:null, sol:false, bonus:0, badge:false, done:false};
  for(var i=0;i<NQ;i++){ var n=BK.sets[s].slots[i].length; r.vi[i]=rnd(n); r.used[i]=[r.vi[i]]; }
  return r;
}
function load(){ var r=jget(RUNKEY,null); if(r && r.v===1 && r.res && r.res.length===NQ && BK.sets[r.set] && !r.done && r.player===player()) return r; return null; }
function save(){ if(run) set(RUNKEY,JSON.stringify(run)); }
function firstCount(r){ return r.res.filter(function(x){ return x.first===true; }).length; }
function doneCount(r){ return r.res.filter(function(x){ return x.got || x.tries>0; }).length; }
function finishedSlots(r){ return r.res.filter(function(x){ return x.got || x.skipped; }).length; }
/* practice history entry, mode "test": same fields as a Lesson or Practice round, so the day totals stay right */
function history(final){
  if(!run || !window.ENG || !ENG.histPut) return; var n=finishedSlots(run); if(!(n>0)) return;
  var fc=firstCount(run), top=Object.keys(run.missTags).slice(0,3), t=Date.now();
  ENG.histPut({id:run.id, player:run.player, t:t, when:sgt(t), game:SLUG, title:TITLE, mode:"test", done:n, total:NQ, correct:fc,
    pct:Math.round(100*fc/n), hints:0, top:top, stars:run.stars, badge:!!run.badge, partial:!final});
}

/* ---------- answers ---------- */
function check(){
  var Q=item(), R=run.res[run.slot], ok=false, key=null;
  if(Q.kind==="type"){
    var raw=String(run.typed||"").trim(); if(!raw){ fb(SAY.empty); return; }
    if(Q.sentence){ if(!/^[A-Z]/.test(raw)){ fb(SAY.cap); return; } if(!/\.$/.test(raw)){ fb(SAY.stop); return; } }
    var n=norm(raw); if(Q.maxWords && n.split(" ").length>Q.maxWords){ fb(SAY.long); return; }
    ok=Q.accept.some(function(a){ return norm(a)===n; }); key=n;
  } else { if(run.pick==null){ fb(SAY.pick); return; } ok=(run.pick===Q.answer); key=String(run.pick); }
  R.tries++;
  if(ok){
    var first=(run.attempt===1 && R.tries===1); if(R.first===null) R.first=first;
    var s=first?STAR_FIRST:STAR_RETRY; if(!R.got){ R.got=true; R.stars=s; run.stars+=s; addStars(s); }
    run.phase="right"; run.sol=true; run.fb=null; save(); history(false); draw(); say(Q.praise, first?SAY.right:SAY.rightRetry); return;
  }
  if(R.first===null) R.first=false;
  run.wrongs++; run.missTags[Q.tag]=1;
  var d=(Q.diag||{})[key]; if(!d) d=[Q.generic||SAY.generic, Q.go];
  run.diag={msg:d[0], go:d[1]||Q.go}; run.phase="wrong"; run.sol=false; run.fb=null; save(); history(false); draw(); say(SAY.notYet, run.diag.msg);
}
function fb(msg){ run.fb={cls:"try", msg:msg}; var f=$("ckFb"); if(f){ f.className="ckfb try"; f.textContent=msg; } say(msg); }
function ansShown(Q){ return Q.kind==="type" ? Q.accept[0] : (Q.kind==="box" ? Q.box[Q.answer] : "("+(Q.answer+1)+") "+Q.opts[Q.answer]); }

/* ---------- screens ---------- */
function ov(){ var o=$("ckOverlay"); if(!o){ o=document.createElement("div"); o.id="ckOverlay"; o.setAttribute("role","dialog"); o.setAttribute("aria-modal","true"); o.setAttribute("aria-label","Test yourself"); document.body.appendChild(o); } return o; }
function starsTxt(n){ var s=""; for(var i=0;i<n;i++) s+="⭐"; return s; }
function dots(){ return '<div class="ckdots" id="ckDots">'+run.res.map(function(r,i){ var c=i===run.slot&&run.phase!=="end"?"cur":(r.got&&r.first?"first":(r.got?"got":(r.skipped?"skip":""))); return '<span class="'+c+'">'+(r.got?(r.first?"⭐⭐":"⭐"):("Q"+(i+1)))+'</span>'; }).join("")+'</div>'; }
function stemHtml(Q){ var t=esc(Q.text).replace(/_{3,}/g,'<span class="ckblank">'+(Q.kind==="box"||Q.kind==="mcq"?"(&nbsp;&nbsp;&nbsp;&nbsp;)":"______")+'</span>');
  if(Q.ul) t=t.replace(esc(Q.ul), '<u class="ckul">'+esc(Q.ul)+'</u>'); if(Q.gap) t=t.replace("^", '<span class="ckgap">◯</span>'); return t; }
function passageHtml(){ var P=set_(run).passage; if(!P) return ""; var hl=item().line;
  return '<div class="ckpassage" id="ckPassage"><div class="ckptitle">'+esc(P.title)+'</div>'+P.lines.map(function(l,i){ return '<div class="ckpl'+(i===hl?' hl':'')+'"><span class="ckln">'+(i+1)+'</span>'+esc(l)+'</div>'; }).join("")+'</div>'; }
function answerHtml(live){
  var Q=item(), h="";
  if(Q.kind==="mcq"){ h+='<div class="ckopts" id="ckOpts">'+Q.opts.map(function(o,i){ var c=(run.pick===i?" on":"")+(!live&&i===Q.answer&&run.phase==="right"?" good":""); return '<button type="button" class="ckopt'+c+'" data-o="'+i+'"'+(live?'':' disabled')+'><span class="ckon">('+(i+1)+')</span> '+esc(o)+'</button>'; }).join("")+'</div>'; }
  else if(Q.kind==="box"){ h+='<div class="ckwbox" id="ckBox">'+Q.box.map(function(w,i){ var c=(run.pick===i?" on":""); return '<button type="button" class="ckchip'+c+'" data-o="'+i+'"'+(live?'':' disabled')+'>'+esc(w)+'</button>'; }).join("")+'</div>'; }
  else { h+='<div class="ckans"><input type="text" id="ckInput" class="ckinput'+(Q.sentence?' wide':'')+'" autocomplete="off" autocapitalize="'+(Q.sentence?'sentences':'off')+'" autocorrect="off" spellcheck="false" aria-label="Your answer" value="'+esc(run.typed||"")+'"'+(live?'':' disabled')+'></div>'; }
  return h;
}
function paperQ(){ var Q=item();
  return passageHtml()+'<div class="ckpaper"><div class="ckqhead"><span>'+esc(Q.sec)+'</span><span class="ckmarks">['+(Q.marks||1)+' mark'+((Q.marks||1)>1?'s':'')+']</span>'+(run.attempt>1?'<span class="cknew">A new one like it</span>':'')+'</div>'+
    (Q.instr?'<div class="ckinstr">'+esc(Q.instr)+'</div>':'')+'<div class="cktext"><span class="cknum">'+(run.slot+1)+'.</span>'+stemHtml(Q)+'</div>'; }
function solution(){ var Q=item();
  return '<div class="cksol" id="ckSol"><h3>How to work it out</h3><table class="cklines"><tr><th>Step</th><th>What I do</th><th>Why</th></tr>'+
    Q.sol.map(function(s,i){ return '<tr><td class="ckln">'+(i+1)+'</td><td class="ckst">'+esc(s[0])+'</td><td class="ckwhy">'+esc(s[1])+'</td></tr>'; }).join("")+'</table></div>'; }
function draw(){
  var o=ov(), h='<div class="ckhead"><span class="cktitle">📝 Test yourself · '+esc(TITLE)+'</span><span class="ckpts" id="ckPts">⭐ '+run.stars+'</span>'+
    '<button type="button" class="ckq" id="ckRead">🔊 Read it to me</button><button type="button" class="ckq" id="ckClose">✕ Close</button><button type="button" class="ckq" id="ckHome">🏠 Home</button></div>';
  if(run.phase!=="intro") h+=dots();
  h+='<div class="ckbody'+(set_(run).passage&&run.phase!=="intro"&&run.phase!=="end"?' withp':'')+'">';
  if(run.phase==="intro"){
    h+='<div class="ckpaper ckintro"><div class="ckbig">📝</div><h2>'+esc(SAY.intro)+'</h2><ul class="ckrules">'+
      '<li>Like the exam paper: '+esc(BK.about)+'.</li><li>No hints in the test. If an answer is not right yet, you can go back to the lesson, then try a new one like it.</li>'+
      '<li>⭐⭐ right on the first try, ⭐ right on a new try, +3 ⭐ for finishing.</li><li>🏅 All 3 right on the first try earns the Test badge for this game.</li><li>No timer. Take your time.</li></ul>'+
      '<div class="ckrow"><button type="button" class="ckbtn green" id="ckStart">Start the test ▶</button><button type="button" class="ckbtn ghost" id="ckLater">Not now</button></div></div>';
  } else if(run.phase==="q"){
    h+=paperQ()+answerHtml(true)+'<div class="ckfb'+(run.fb?' '+run.fb.cls:'')+'" id="ckFb">'+(run.fb?esc(run.fb.msg):'')+'</div>'+
      '<div class="ckrow"><button type="button" class="ckbtn green" id="ckCheck">Check ✓</button></div></div>';
  } else if(run.phase==="right"){
    var R=run.res[run.slot], Q=item();
    h+=paperQ()+answerHtml(false)+'<div class="ckfb ok" id="ckFb">✅ '+esc(Q.praise)+' <span class="ckearn">+'+starsTxt(R.stars)+'</span></div>'+solution()+
      '<div class="ckrow"><button type="button" class="ckbtn green" id="ckNext">'+(run.slot<NQ-1?'Next question ➡️':'See my result ➡️')+'</button></div></div>';
  } else if(run.phase==="wrong"){
    var L=LSN[run.diag.go]||LSN[item().go];
    h+=paperQ()+answerHtml(false)+'<div class="ckfb try" id="ckFb"><b>Not yet.</b> '+esc(run.diag.msg)+'</div>'+
      '<div class="cklesson"><button type="button" class="ckbtn blue" id="ckLesson">📘 Go back to the lesson</button><span class="ckll" id="ckLessonLabel">'+esc(L.label)+'</span></div>'+
      '<div class="ckrow"><button type="button" class="ckbtn green" id="ckRetry">🔁 Try a new one like it</button>'+
      (run.sol?'':'<button type="button" class="ckbtn ghost" id="ckShowSol">👀 See how to work it out</button>')+
      '<button type="button" class="ckbtn ghost" id="ckSkip">'+(run.slot<NQ-1?'Next question ➡️':'Finish the test ➡️')+'</button></div>'+(run.sol?solution():'')+'</div>';
  } else if(run.phase==="end"){
    var fc=firstCount(run);
    h+='<div class="ckpaper ckend"><div class="ckbig">'+(run.badge?'🏅':'🌟')+'</div><h2>'+esc(SAY.end)+'</h2>'+
      '<p class="ckres">Right on the first try: <b id="ckFirst">'+fc+' of '+NQ+'</b></p>'+
      '<p class="ckres">Stars from this test: <b id="ckEndStars">⭐ '+run.stars+'</b> (including +'+run.bonus+' for finishing)</p>'+
      (run.badge?'<p class="ckbadge" id="ckBadgeMsg">🏅 '+esc(SAY.badge)+'</p>':'')+
      '<p class="ckres">Your reward points: <b id="ckTotal">⭐ '+myStars()+'</b></p><p class="ckmuted">'+esc(SAY.daddy)+'</p>'+
      '<div class="ckrow"><button type="button" class="ckbtn gold" id="ckDaddy">🏅 Show Daddy</button><button type="button" class="ckbtn ghost" id="ckDone">Close</button><button type="button" class="ckbtn ghost" id="ckAgain">Test again with new questions</button></div></div>';
  }
  h+='</div>'; o.innerHTML=h; o.hidden=false; document.documentElement.classList.add("ckopen"); open=true; bind();
}
function bind(){
  var o=ov();
  if($("ckClose")) $("ckClose").onclick=close;
  if($("ckHome")) $("ckHome").onclick=function(){ if(run && !run.done) save(); if(window.ENG && ENG.goHome) ENG.goHome(); };   // asks once mid-test; the test is kept and resumes
  if($("ckRead")) $("ckRead").onclick=readAloud;
  if($("ckStart")) $("ckStart").onclick=function(){ run.phase="q"; save(); draw(); readQ(); };
  if($("ckLater")) $("ckLater").onclick=close;
  o.querySelectorAll("[data-o]").forEach(function(b){ b.onclick=function(){ run.pick=+b.getAttribute("data-o"); o.querySelectorAll("[data-o]").forEach(function(x){ x.classList.toggle("on", x===b); }); save(); }; });
  var inp=$("ckInput"); if(inp && !inp.disabled){ inp.oninput=function(){ run.typed=inp.value.slice(0,160); save(); }; inp.onkeydown=function(e){ if(e.key==="Enter") check(); }; }
  if($("ckCheck")) $("ckCheck").onclick=check;
  if($("ckNext")) $("ckNext").onclick=next;
  if($("ckSkip")) $("ckSkip").onclick=function(){ run.res[run.slot].skipped=true; next(); };
  if($("ckRetry")) $("ckRetry").onclick=function(){ newVariant(run); run.attempt++; run.pick=null; run.typed=""; run.phase="q"; run.diag=null; run.sol=false; save(); draw(); say(SAY.retry, spokenQ()); };
  if($("ckShowSol")) $("ckShowSol").onclick=function(){ run.sol=true; save(); draw(); var s=$("ckSol"); if(s && s.scrollIntoView) s.scrollIntoView({block:"start"}); say(SAY.sol); };
  if($("ckLesson")) $("ckLesson").onclick=goLesson;
  if($("ckDaddy")) $("ckDaddy").onclick=daddy;
  if($("ckDone")) $("ckDone").onclick=close;
  if($("ckAgain")) $("ckAgain").onclick=function(){ run=fresh(run.set); run.phase="q"; save(); draw(); readQ(); };
}
function spokenQ(){ var Q=item(); return String(Q.say||Q.text).replace(/\^/g,""); }
function readQ(){ var Q=item(); say(Q.instr, spokenQ(), SAY[Q.kind]); }
function readAloud(){
  var P=set_(run).passage;
  if(run.phase==="q"){ if(P && window.Voice && Voice.readLines){ Voice.readLines(P.lines.concat([item().instr||"", spokenQ()]).filter(Boolean)); } else readQ(); }
  else if(run.phase==="wrong") say(SAY.notYet, run.diag.msg);
  else if(run.phase==="right") say(item().praise, SAY.sol);
  else if(run.phase==="end") say(SAY.end, run.badge?SAY.badge:null, SAY.daddy);
  else say(SAY.intro);
}
function next(){
  if(run.slot<NQ-1){ run.slot++; run.attempt=1; run.pick=null; run.typed=""; run.phase="q"; run.diag=null; run.sol=false; save(); draw(); readQ(); return; }
  run.bonus=STAR_FINISH; run.stars+=STAR_FINISH; addStars(STAR_FINISH);
  if(firstCount(run)===NQ){ run.badge=true; addBadge(); }
  run.phase="end"; run.done=true; logTest(); history(true); try{ localStorage.removeItem(RUNKEY); }catch(e){}
  draw(); say(SAY.end, run.badge?SAY.badge:null, SAY.daddy);
}
function close(){ var o=$("ckOverlay"); if(o){ o.hidden=true; o.innerHTML=""; } document.documentElement.classList.remove("ckopen"); open=false; if(window.Voice && Voice.stop) try{ Voice.stop(); }catch(e){} if(run && !run.done) save(); }

/* ---------- back to the lesson at the step that needs another look (the rule card or the worked example) ---------- */
function goLesson(){
  var L=LSN[run.diag.go]||LSN[item().go]; save(); close(); banner(L.label);
  try{ if(L.to==="worked") ENG.workedExample(); else ENG.ruleCard(); }catch(e){}
  setTimeout(function(){ say(SAY.lesson); }, 0);
}
function banner(label){
  var b=$("ckBanner"); if(!b){ b=document.createElement("div"); b.id="ckBanner"; document.body.appendChild(b); }
  b.innerHTML='<span>📘 '+esc(label)+'</span><button type="button" class="ckbtn green" id="ckBackTest">↩ Back to my test</button><button type="button" class="ckx" id="ckBannerX" aria-label="Hide">✕</button>';
  b.hidden=false; $("ckBackTest").onclick=function(){ b.hidden=true; resume(true); }; $("ckBannerX").onclick=function(){ b.hidden=true; };
}
function resume(back){ run=load()||run; if(!run || run.done) run=fresh(); draw(); if(back) say(SAY.back); else if(run.phase==="q") readQ(); else readAloud(); }
function start(){ if(window.Voice && Voice.prime) try{ Voice.prime(); }catch(e){} run=load(); if(!run){ run=fresh(); save(); draw(); say(SAY.intro); } else resume(false); var b=$("ckBanner"); if(b) b.hidden=true; }

/* ---------- Show Daddy: a full-screen card with the date and the points (optional, never required) ---------- */
function daddy(){
  var d=$("ckDaddyView"); if(!d){ d=document.createElement("div"); d.id="ckDaddyView"; d.setAttribute("role","dialog"); d.setAttribute("aria-label","Show Daddy"); document.body.appendChild(d); }
  var P=rewards().players[player()]||{stars:0,badges:{}}, nb=Object.keys(P.badges||{}).length, last=run;
  d.innerHTML='<div class="ckdcard"><div class="ckdbig">'+(last&&last.badge?'🏅':'⭐')+'</div><div class="ckdname">'+esc(player())+'</div>'+
    '<div class="ckdgame">Test yourself · '+esc(TITLE)+'</div><div class="ckddate">'+dateLabel(Date.now())+'</div>'+
    (last?'<div class="ckdpts">⭐ '+last.stars+' points in this test</div><div class="ckdline">Right on the first try: '+firstCount(last)+' of '+NQ+(last.badge?' · Test badge earned':'')+'</div>':'')+
    '<div class="ckdtotal">Reward points: ⭐ '+(+P.stars||0)+' · Test badges: 🏅 '+nb+'</div><button type="button" class="ckbtn ghost" id="ckDaddyClose">Close</button></div>';
  d.hidden=false; $("ckDaddyClose").onclick=function(){ d.hidden=true; };
}

/* ---------- the header button, and the offer under a finished Lesson ---------- */
function drawBtn(){ var b=$("modeTest"); if(!b) return; b.hidden=!unlocked(); b.onclick=start; }
window.addEventListener("eng:lessondone", function(){
  unlock();
  setTimeout(function(){ var card=document.querySelector("#main .card"); if(!card || $("ckOffer")) return; var d=document.createElement("div"); d.id="ckOffer"; d.className="ckoffer";
    d.innerHTML='<p><b>📝 Ready to test yourself?</b> 3 questions, like in your exam. It is up to you.</p><button type="button" class="ckbtn green" id="ckOfferBtn">Test yourself</button>';
    card.appendChild(d); $("ckOfferBtn").onclick=start; }, 0);
});
window.addEventListener("pagehide", function(){ if(run && !run.done){ save(); history(false); } });
document.addEventListener("visibilitychange", function(){ if(document.visibilityState==="hidden" && run && !run.done){ save(); history(false); } });
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", drawBtn); else drawBtn();
return {SAY:SAY, start:start, unlock:unlock, unlocked:unlocked, get open(){ return open; }, get run(){ return run; }, item:function(){ return run?item():null; }, rewards:rewards, bank:BK, daddy:daddy};
})();
