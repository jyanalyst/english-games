/* English Game engine v1 (24 Oct 2026). Pattern copied from Math Game's games-src (5-item rounds,
   nudge -> fill-in hint, device voice); rewritten for English item kinds. No timers, no network. */
(function(){
"use strict";
var GAME = window.GAME || null;
var ROUND = 5, PER_SESSION = 3, CAP_SESSIONS = 2;
var TAGS = {"GR-TENSE":"Tenses (time clues)","GR-SVA":"One or many (subject-verb)","GR-PREP":"Prepositions","GR-CONN":"Connectors",
  "GR-QUANT":"Few / little / much","GR-DEM":"This / that / these / those","GR-TAG":"Question tags","GR-PRON":"Pronouns",
  "VO-CTX":"Word meaning from clues","VO-FEEL":"Feeling words","VO-SIM":"Similes","VO-FORM":"Word forms (-ful, -ly, -ment)",
  "ED-SPELL":"Editing: spelling","ED-GRAM":"Editing: grammar","ED-PUNC":"Editing: punctuation",
  "CO-REF":"Who or what 'it/they' means","CO-SEQ":"Order of events","CO-TF":"True or false (+ reason)","CO-LIFT":"Lift a word or phrase",
  "CO-INFER":"Feelings and proof lines","CO-CHAR":"Character trait from actions","CO-FULL":"Full-sentence answers","CO-QW":"Question words (who, where, why...)",
  "SC-JOIN":"Joining: and, but, or, so","SC-REASON":"Joining: because, as (reason)","SC-TIME":"Joining: when, while, before, after, until",
  "SC-THOUGH":"Joining: although (no 'but')","SC-REL":"Joining: who, which","SC-PAIR":"Pairs: both/and, either/or, neither/nor","SC-BEGIN":"Begin with the given word (comma)"};
/* ---------- storage (device only) ---------- */
var LS = { get:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:JSON.parse(v); }catch(e){ return d; } },
           set:function(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } };
function pad(n){ return (n<10?"0":"")+n; }
function dayStr(d){ d=d||new Date(); return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate()); }
function daysBetween(a,b){ var A=new Date(a+"T00:00:00"), B=new Date(b+"T00:00:00"); return Math.round((B-A)/864e5); }
function weekKey(s){ var d=new Date(s+"T00:00:00"); var day=(d.getDay()+6)%7; d.setDate(d.getDate()-day); return dayStr(d); }
function $(id){ return document.getElementById(id); }
function el(tag, cls, text){ var e=document.createElement(tag); if(cls) e.className=cls; if(text!=null) e.textContent=text; return e; }
function btn(text, cls, fn){ var b=el("button", cls||"", text); b.type="button"; if(fn) b.addEventListener("click", fn); return b; }
function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function norm(s){ return String(s).toLowerCase().replace(/[^a-z0-9' ]+/g," ").replace(/\s+/g," ").trim(); }
function say(){ if(window.Voice) Voice.say.apply(null, arguments); }

/* ---------- validation (same rules the tests check independently) ---------- */
function hasWord(text, w){ if(!w) return false; var re=new RegExp("(^|[^a-z])"+String(w).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"($|[^a-z])"); return re.test(String(text).toLowerCase()); }
function answerText(it){
  if(it.kind==="mcq"||it.kind==="qword") return it.options[it.answer];
  if(it.kind==="lift") return it.accept[0];
  return null;
}
function validItem(it){
  var e=[];
  if(!it.id||!it.tag||!TAGS[it.tag]) e.push("tag");
  if(!(it.diff>=1&&it.diff<=3)) e.push("diff");
  if(!it.nudge||!it.hint) e.push("nudge/hint");
  if(!it.why && it.kind!=="full") e.push("why");
  if(!it.src) e.push("src");
  if(it.kind==="mcq"||it.kind==="qword"){
    var o=it.options||[]; if(o.length<3) e.push("options");
    if(!(it.answer>=0&&it.answer<o.length)) e.push("answer index");
    var seen={}; o.forEach(function(x){ var k=norm(x); if(seen[k]) e.push("duplicate option"); seen[k]=1; });
    var a=o[it.answer]; if(a && (hasWord(it.nudge,a)||hasWord(it.hint,a))) e.push("nudge/hint shows answer");
  }
  if(it.kind==="trait"){ if(!(it.answer>=0&&it.answer<(it.options||[]).length)) e.push("answer index"); var ta=it.options[it.answer];
    if(hasWord(it.nudge,ta)||hasWord(it.hint,ta)||hasWord(it.nudge2,ta)||hasWord(it.hint2,ta)) e.push("nudge/hint shows answer"); if(!(it.lines||[]).length) e.push("action lines"); }
  if(it.kind==="edit"||it.kind==="dictate"){ if(!(it.accept||[]).length) e.push("accept");
    (it.accept||[]).forEach(function(x){ if(/[a-z]/i.test(x) && (hasWord(it.nudge,x)||hasWord(it.hint,x))) e.push("nudge/hint shows answer"); });
    if(it.kind==="edit" && !/\[\[[^\]]+\]\]|\{\{\}\}/.test(it.text)) e.push("no underline or circle"); }
  if(it.kind==="combine"){ var co=it.options||[]; if(co.length<3) e.push("options"); if(!(it.answer>=0&&it.answer<co.length)) e.push("answer index");
    if((it.errs||[]).length!==co.length) e.push("errs"); if(!(it.given||[]).length) e.push("given");
    var sa=co[it.answer]; if(sa && (hasWord(it.nudge,sa)||hasWord(it.hint,sa))) e.push("nudge/hint shows answer"); }
  if(it.kind==="build"){ if(!it.sentence||!tokens(it.sentence).length) e.push("sentence"); if(!(it.given||[]).length) e.push("given");
    if(hasWord(it.nudge,it.sentence)||hasWord(it.hint,it.sentence)) e.push("nudge/hint shows answer"); }
  if(it.kind==="ref"||it.kind==="lift"){ var a0=it.accept&&it.accept[0]; if(!a0) e.push("accept");
    else if(String(it.nudge+" "+it.hint).toLowerCase().indexOf(a0.toLowerCase())>=0) e.push("nudge/hint shows answer"); }
  return e;
}

function tokens(s){ return String(s).match(/[A-Za-z']+|[,.?!]/g)||[]; }
function joinTokens(t){ return t.join(" ").replace(/ ([,.?!])/g,"$1"); }
/* ---------- logging, Leitner, XP, streak, daily cap ---------- */
var K = { player:"eng.player", players:"eng.players", hist:"eng.history", cur:"eng.cursession", log:"eng.log", box:"eng.leitner", xp:"eng.xp", streak:"eng.streak", daily:"eng.daily", medal:"eng.medal", open:"eng.open", paper:"eng.paper", mins:"eng.minutes" };
var lastAct = 0;
function logAnswer(item, first, hints){
  var now=Date.now(), log=LS.get(K.log,[]);
  log.push({d:dayStr(), t:now, game:GAME?GAME.slug:"", id:item.id, tag:item.tag, first:!!first, hints:hints});
  if(log.length>3000) log=log.slice(-3000);
  LS.set(K.log, log);
  // minutes played (active time only, gaps over 3 minutes ignored)
  var m=LS.get(K.mins,{}); var gap = lastAct? Math.min(now-lastAct, 180000) : 30000; lastAct=now;
  m[dayStr()] = (m[dayStr()]||0) + gap/60000; LS.set(K.mins, m);
  // Leitner: box 0 = missed (back this session after 2 items), 1 = next session, 2 = 2 days, 3 = learned
  var bx=LS.get(K.box,{}), key=(GAME?GAME.slug:"")+"|"+item.id, b=bx[key];
  var wasMiss = b && b.box===0;
  if(!first){ bx[key]={box:0, due:now}; }
  else { var nb = b? Math.min(3,b.box+1) : 3; var due = nb===1? now+6*36e5 : nb===2? now+2*864e5 : now+7*864e5; bx[key]={box:nb, due:due}; }
  LS.set(K.box, bx);
  return wasMiss && first;
}
function addXP(n){ var x=LS.get(K.xp,0)+n; LS.set(K.xp,x); var s=$("xp"); if(s) s.textContent="⭐ "+x+" XP"; }
function boxFor(id){ return (LS.get(K.box,{}))[(GAME?GAME.slug:"")+"|"+id]; }
function tagStats(days, slug){
  var since=Date.now()-days*864e5, st={};
  LS.get(K.log,[]).forEach(function(r){ if(r.t<since) return; if(slug && r.game!==slug) return; var s=st[r.tag]||(st[r.tag]={n:0,ok:0}); s.n++; if(r.first) s.ok++; });
  return st;
}
function weakTags(slug){ var st=tagStats(7, slug), a=Object.keys(st).filter(function(t){ return st[t].n>=2; });
  a.sort(function(x,y){ return st[x].ok/st[x].n - st[y].ok/st[y].n; }); return a.filter(function(t){ return st[t].ok<st[t].n; }); }
function bumpStreak(){
  var s=LS.get(K.streak,{last:null,n:0,shieldWeek:null}), t=dayStr();
  if(s.last===t) return s;
  if(!s.last) s.n=1;
  else { var g=daysBetween(s.last,t);
    if(g===1) s.n++;
    else if(g===2 && s.shieldWeek!==weekKey(t)){ s.n++; s.shieldWeek=weekKey(t); s.usedShield=t; }
    else s.n=1; }
  s.last=t; LS.set(K.streak,s); return s;
}
function daily(){ var d=LS.get(K.daily,{date:null,rounds:0}); if(d.date!==dayStr()) d={date:dayStr(),rounds:0}; return d; }
function capReached(){ return false; }   // daily limit removed (24 Oct 2026)
function roundDone(){ var d=daily(); d.rounds++; LS.set(K.daily,d); bumpStreak(); return d; }

/* ---------- player + session history (this device only: localStorage, never sent anywhere) ---------- */
var HIST_MAX = 200;
function cleanName(n){ return String(n==null?"":n).replace(/[\u0000-\u001f<>]/g,"").replace(/\s+/g," ").trim().slice(0,20); }
function player(){ var n=cleanName(LS.get(K.player,"")); return n||"Player"; }
function setPlayer(n){ n=cleanName(n)||"Player"; LS.set(K.player,n); var ps=LS.get(K.players,[]).filter(function(x){ return x!==n; }); ps.unshift(n); LS.set(K.players, ps.slice(0,8)); return n; }
function sgt(t){ var d=new Date(t+8*36e5); return d.toISOString().replace(/\.\d+Z$/,"+08:00"); }   // wall-clock time in Singapore
var SES=null;
function sesSave(){ if(SES) LS.set(K.cur,SES); else { try{ localStorage.removeItem(K.cur); }catch(e){} } }
function sesStart(mode, total){ sesClose(true); if(!GAME) return;
  SES={id:GAME.slug+"-"+Date.now()+"-"+Math.floor(Math.random()*1e6), player:player(), game:GAME.slug, title:GAME.title, mode:mode, t0:Date.now(), total:total, done:0, correct:0, hints:0, mistakes:{}}; sesSave(); }
function sesItem(tag, first){ if(!SES) return; SES.done++; if(first) SES.correct++; else SES.mistakes[tag]=(SES.mistakes[tag]||0)+1; sesSave(); }
function sesHint(){ if(!SES) return; SES.hints++; sesSave(); }
function histAdd(r){ var h=LS.get(K.hist,[]); if(h.some(function(x){ return x.id===r.id; })) return false;   // dedupe by session id
  h.push(r); if(h.length>HIST_MAX) h=h.slice(-HIST_MAX); LS.set(K.hist,h); return true; }
function entryOf(x, partial){ var top=Object.keys(x.mistakes||{}).sort(function(a,b){ return x.mistakes[b]-x.mistakes[a]; }).slice(0,3);
  return {id:x.id, player:x.player, t:x.t1||Date.now(), when:sgt(x.t1||Date.now()), game:x.game, title:x.title, mode:x.mode, done:x.done, total:x.total,
    correct:x.mode==="paper"?null:x.correct, pct:x.mode==="paper"||!x.done?null:Math.round(100*x.correct/x.done), hints:x.hints, top:top, ticks:x.ticks, partial:!!partial}; }
// finish the open session: complete=true (round finished), or partial (left partway). A partial session with nothing done is dropped.
function sesClose(partial){ if(!SES) return; var x=SES; SES=null; sesSave(); x.t1=Date.now(); if(partial && !x.done) return; histAdd(entryOf(x, partial)); }
function sesPaper(ticks){ if(!GAME||!GAME.paper) return; var P=GAME.paper, n=(P.questions||P.answers).length;
  histAdd(entryOf({id:GAME.slug+"-paper-"+Date.now(), player:player(), game:GAME.slug, title:GAME.title, mode:"paper", total:n, done:n, hints:0, mistakes:{}, ticks:ticks.filter(Boolean).length+"/"+ticks.length}, false)); }
// a session left open by a page that closed without pagehide (e.g. Safari killed the tab) is saved as partial on the next visit
function sesRecover(){ var old=LS.get(K.cur,null); if(old && old.id){ try{ localStorage.removeItem(K.cur); }catch(e){} old.t1=old.t1||Date.now(); if(old.done) histAdd(entryOf(old,true)); } }

/* ---------- picking a Practice round (exposed for the seeded sweep test) ---------- */
function eligible(){ return GAME.items.filter(function(it){ return it.practice!==false && validItem(it).length===0; }); }
function pickRound(opts){
  opts=opts||{}; var pool=eligible(), now=Date.now(), recent=opts.recent||[];
  if(GAME.passages){ // comprehension: one passage, 5 of its questions, in passage order
    var pids=Object.keys(GAME.passages).filter(function(p){ return p!==GAME.lessonPassage; });
    var dueCount=function(p){ return pool.filter(function(it){ var b=boxFor(it.id); return it.passage===p && b && b.box<3 && b.due<=now; }).length; };
    var pick=null, best=0;
    pids.forEach(function(p){ var c=dueCount(p); if(c>best){ best=c; pick=p; } });
    if(!pick){ var fresh=pids.filter(function(p){ return recent.indexOf(p)<0; }); pick=shuffle(fresh.length?fresh:pids)[0]; }
    var qs=pool.filter(function(it){ return it.passage===pick; });
    var due=shuffle(qs.filter(function(it){ var b=boxFor(it.id); return b && b.box<3 && b.due<=now; }));
    var weak=weakTags(GAME.slug);
    var focus=(GAME.focusTags||[]).concat(weak.filter(function(t){ return (GAME.focusTags||[]).indexOf(t)<0; }).slice(0,1));
    var chosen=due.slice(0,2);
    var rest=shuffle(qs.filter(function(it){ return chosen.indexOf(it)<0; }));
    var nf=chosen.filter(function(it){ return focus.indexOf(it.tag)>=0; }).length;
    rest.forEach(function(it){ if(chosen.length<ROUND && nf<3 && focus.indexOf(it.tag)>=0){ chosen.push(it); nf++; } });   // ~60% focus tags
    rest.forEach(function(it){ if(chosen.length<ROUND && chosen.indexOf(it)<0 && focus.indexOf(it.tag)<0) chosen.push(it); });
    rest.forEach(function(it){ if(chosen.length<ROUND && chosen.indexOf(it)<0) chosen.push(it); });
    chosen.sort(function(a,b){ return qs.indexOf(a)-qs.indexOf(b); });
    return chosen;
  }
  var used={}, out=[];
  function take(it){ if(it && !used[it.id] && out.length<ROUND){ used[it.id]=1; out.push(it); } }
  var due=shuffle(pool.filter(function(it){ var b=boxFor(it.id); return b && b.box<3 && b.due<=now && (opts.missed||[]).indexOf(it.id)<0; }));
  var weak=weakTags(GAME.slug);
  var fromWeak = weak.length? shuffle(pool.filter(function(it){ return it.tag===weak[0]; })) : [];
  var others=shuffle(pool.slice());
  // 2 fresh items first, then this session's misses / due items (so a miss comes back after 2 others), weak-tag items (~60%), then random
  var head=[]; others.forEach(function(it){ if(head.length<2 && (boxFor(it.id)||{}).box!==0 && (opts.missed||[]).indexOf(it.id)<0) head.push(it); });
  head.forEach(take);
  (opts.missed||[]).forEach(function(id){ take(pool.filter(function(i){ return i.id===id; })[0]); });
  due.slice(0,2).forEach(take);
  fromWeak.slice(0,3).forEach(take);
  others.forEach(take);
  if(opts.reviewOnly){ out=[]; used={}; (opts.missed||[]).concat(due.map(function(i){return i.id;})).forEach(function(id){ take(pool.filter(function(i){ return i.id===id; })[0]); }); }
  return out;
}

/* ---------- UI state ---------- */
var S = { mode:"lesson", queue:[], idx:0, score:0, firstTries:[], missed:[], recent:[], step:null };
var main;
function setMain(cls){ main.innerHTML=""; main.className="main "+(cls||""); window.scrollTo(0,0); }
function feedbackBox(){ var f=el("div","fb"); f.id="fb"; f.setAttribute("aria-live","polite"); return f; }
function showFb(kind, text, voice){ var f=$("fb"); if(!f) return; f.className="fb "+kind; f.textContent=text; if(Array.isArray(voice)) say.apply(null, voice); else say(voice||text); }   // voice: reusable spoken pieces
function progress(){ var p=el("div","progress"); for(var i=0;i<S.queue.length;i++){ var d=el("span","dot"+(i<S.idx?" done":"")+(i===S.idx?" now":"")); p.appendChild(d); } return p; }
function header(){ var l=$("modeLesson"), p=$("modePractice"); if(l) l.classList.toggle("on", S.mode==="lesson"); if(p) p.classList.toggle("on", S.mode!=="lesson"); }

/* stem with tappable words so she can underline the clue (exam technique) */
function stemNode(text, cls){
  var p=el("p", cls||"stem");
  String(text).split(/(\s+)/).forEach(function(tok){
    if(/^\s+$/.test(tok)){ p.appendChild(document.createTextNode(tok)); return; }
    if(/^_{3,}/.test(tok)){ var b=el("span","blank","_____"); var rest=tok.replace(/^_+/,""); p.appendChild(b); if(rest) p.appendChild(document.createTextNode(rest)); return; }
    var w=el("span","w",tok); w.addEventListener("click", function(){ w.classList.toggle("ul"); }); p.appendChild(w);
  });
  return p;
}

/* ---------- generic attempt handling: nudge first, then the fill-in hint; never the answer ---------- */
function Attempt(item, onDone){
  this.item=item; this.misses=0; this.onDone=onDone; this.finished=false;
}
Attempt.prototype.wrong=function(nudge, hint){
  this.misses++;
  if(this.misses===1){ var n=nudge||this.item.nudge; showFb("no","Not yet. "+n, ["Not yet.", n]); }
  else { var h=hint||this.item.hint; sesHint(); showFb("hint","Hint: "+h, ["Hint:", h]); }
};
Attempt.prototype.right=function(extra){
  if(this.finished) return; this.finished=true;
  var it=this.item, first=this.misses===0;
  var fixed=logAnswer(it, first, Math.min(this.misses,2)); sesItem(it.tag, first);
  var gain = first? 10 : 5; if(fixed) gain+=5; addXP(gain);
  showFb("yes", (first?"Yes! ":"You got it! ")+(it.why||"")+(extra?" "+extra:"")+"  (+"+gain+" XP"+(fixed?", you fixed a past mistake!":"")+")",
    [first?"Yes!":"You got it!", it.why, extra]);
  if(this.onDone) this.onDone(first);
};

/* ---------- screens ---------- */
function startScreen(){
  setMain("start");
  var c=el("div","card center");
  c.appendChild(el("div","bigemoji",GAME.emoji));
  c.appendChild(el("h2",null,GAME.title));
  c.appendChild(el("p",null,GAME.intro));
  var pl=el("p","small playing","Playing as "+player()+". (Change the player on the home page.)"); pl.id="playingAs"; c.appendChild(pl);
  if(capReached()) c.appendChild(el("p","rest","Great work today! Your brain grows while you rest. Come back tomorrow. You can still do an optional review."));
  var b1=btn("Start with my tutor 🔊","big",function(){ Voice.setMuted(false); updMute(); go(); });
  var b2=btn("Play without sound","quiet",function(){ Voice.setMuted(true); updMute(); go(); });
  b1.id="startTutor"; b2.id="startQuiet";
  function go(){ Voice.unlock([]); if(capReached()) startReview(); else ruleCard(); }
  c.appendChild(b1); c.appendChild(b2); main.appendChild(c);
}
function ruleCard(){
  S.mode="lesson"; header(); setMain("rule");
  var c=el("div","card"); c.appendChild(el("h2",null,"🔑 "+GAME.rule.title));
  if(GAME.rule.rows){
    var t=el("table","ruletable"); GAME.rule.rows.forEach(function(r){ var tr=el("tr"); r.forEach(function(x,i){ tr.appendChild(el(i===0?"th":"td",null,x)); }); t.appendChild(tr); });
    c.appendChild(t);
  }
  if(GAME.rule.list){ var ul=el("ul","rulelist"); GAME.rule.list.forEach(function(x){ ul.appendChild(el("li",null,x)); }); c.appendChild(ul); }
  if(GAME.rule.tip) c.appendChild(el("p","tip",GAME.rule.tip));
  var n=btn("Show me an example ▶","big",workedExample); n.id="nextBtn"; c.appendChild(n);
  main.appendChild(c); say(GAME.rule.say);
}
function workedExample(){
  setMain("worked"); var W=GAME.worked, k=0;
  var c=el("div","card"); c.appendChild(el("h2",null,"👀 Watch me do one"));
  if(W.passage){ var pl=el("div","mini-passage"); W.passage.forEach(function(l,i){ var d=el("div","pline",l); d.dataset.i=i; pl.appendChild(d); }); c.appendChild(pl); }
  var stem=/\[\[|\{\{/.test(W.stem)? markedNode(W.stem) : stemNode(W.stem,"stem"); c.appendChild(stem);
  var opts=el("div","opts"); (W.options||[]).forEach(function(o){ opts.appendChild(el("span","opt static",o)); }); c.appendChild(opts);
  var stepBox=el("div","steps"); c.appendChild(stepBox);
  var nb=btn("Next step ▶","big",next); nb.id="nextBtn"; c.appendChild(nb);
  main.appendChild(c);
  function next(){
    if(k>=W.steps.length){ startLesson(); return; }
    var st=W.steps[k++]; stepBox.appendChild(el("p","step",st.text));
    if(st.mark) Array.prototype.forEach.call(stem.querySelectorAll(".w"), function(w){ if(st.mark.split(" ").indexOf(w.textContent.replace(/[,.!?]/g,""))>=0) w.classList.add("ul"); });
    if(st.line!=null){ var ln=c.querySelector('.pline[data-i="'+st.line+'"]'); if(ln) ln.classList.add("proof"); }
    if(st.pick!=null) opts.children[st.pick].classList.add("good");
    say(st.say||st.text);
    if(k>=W.steps.length) nb.textContent="Start the Lesson ▶";
  }
  next();
}
function lessonTotal(){ return (GAME.warmup&&!S.warmDone?GAME.warmup.length:0)+GAME.lesson.length+(GAME.cloze?GAME.cloze.blanks.length:0)+(GAME.editPassage?GAME.editPassage.errors.length:0); }
function startLesson(){
  if(S.contWarm) S.contWarm=false; else sesStart("lesson", lessonTotal());   // after the warm-up the same Lesson session goes on
  if(GAME.warmup && !S.warmDone){ S.mode="lesson"; S.phase="warmup"; header(); S.queue=GAME.warmup.map(byId); S.idx=0; S.score=0; showItem(); return; }
  S.phase=null; S.mode="lesson"; header();
  S.queue=GAME.lesson.map(function(id){ return byId(id); }); S.idx=0; S.score=0; S.missed=[];
  showItem();
}
function startPractice(){
  if(capReached()){ startReview(); return; }
  S.mode="practice"; header();
  S.queue=pickRound({missed:S.missed, recent:S.recent}); S.idx=0; S.score=0; sesStart("practice", S.queue.length);
  if(GAME.passages && S.queue[0]) S.recent.push(S.queue[0].passage);
  S.missed=[]; showItem();
}
function startReview(){
  S.mode="review"; header();
  S.queue=pickRound({missed:S.missed, recent:S.recent, reviewOnly:true}); S.idx=0; S.score=0; S.missed=[]; if(S.queue.length) sesStart("practice", S.queue.length);
  if(!S.queue.length){ setMain("rest"); var c=el("div","card center"); c.appendChild(el("div","bigemoji","🌙"));
    c.appendChild(el("h2",null,"Great work! Your brain grows while you rest."));
    c.appendChild(el("p",null,"Come back tomorrow. Nothing to review right now."));
    c.appendChild(hubLink()); main.appendChild(c); say("Great work! Your brain grows while you rest. Come back tomorrow."); return; }
  showItem();
}
function byId(id){ return GAME.items.filter(function(i){ return i.id===id; })[0]; }
function hubLink(){ var a=el("a","btnlink","🏠 All games"); a.href="../"; return a; }

function showItem(){
  if(S.idx>=S.queue.length){ afterItems(); return; }
  var it=S.queue[S.idx];
  setMain(GAME.passages?"withpassage":"single");
  var wrap=el("div","cols");
  if(it.passage){ wrap.appendChild(passageCard(it)); }
  var c=el("div","card qcard"); c.appendChild(progress());
  c.appendChild(el("div","qnum",(S.phase==="warmup"?"Warm-up ":S.mode==="lesson"?"Lesson ":S.mode==="review"?"Review ":"Practice ")+"question "+(S.idx+1)+" of "+S.queue.length));
  var area=el("div","qarea"); c.appendChild(area); c.appendChild(feedbackBox());
  var nx=btn("Next ▶","big hidden",function(){ S.idx++; showItem(); }); nx.id="nextBtn"; c.appendChild(nx);
  wrap.appendChild(c); main.appendChild(wrap);
  var att=new Attempt(it, function(first){ if(first) S.score++; else S.missed.push(it.id); nx.classList.remove("hidden"); nx.focus(); });
  (KINDS[it.kind]||KINDS.mcq)(it, area, att);
  window.__item = it.id;
}

/* passage panel with numbered lines and "read it to me" */
function passageCard(it){
  var P=GAME.passages[it.passage]; var c=el("div","card passage");
  c.appendChild(el("h3",null,P.title));
  var box=el("div","plines"); box.id="plines";
  P.lines.forEach(function(l,i){ var d=el("div","pline"); d.dataset.i=i; d.appendChild(el("span","ln",String(i+1))); d.appendChild(el("span","lt",l)); box.appendChild(d); });
  c.appendChild(box);
  var rb=btn("🔊 Read it to me","ctl",function(){
    var ok=Voice.readLines(P.lines, function(i){ Array.prototype.forEach.call(box.children,function(d){ d.classList.toggle("reading", +d.dataset.i===i); }); });
    if(!ok) showFb("no","Voice is off. Read it in your head, slowly.");
  }); rb.id="readBtn"; c.appendChild(rb);
  return c;
}

/* ---------- item kinds ---------- */
var KINDS = {};
KINDS.mcq = function(it, area, att){
  if(it.ask) area.appendChild(el("p","ask",it.ask));
  area.appendChild(stemNode(it.stem));
  var opts=el("div","opts");
  shuffle(it.options.map(function(o,i){ return i; })).forEach(function(i){ var o=it.options[i];   // shown in a random order; data-i keeps the bank index
    var b=btn(o,"opt",function(){
      if(att.finished) return;
      if(i===it.answer){ b.classList.add("good"); Array.prototype.forEach.call(opts.children,function(x){ x.disabled=true; }); att.right(); }
      else { b.classList.add("tried"); att.wrong(); }
    }); b.dataset.i=i; opts.appendChild(b);
  });
  area.appendChild(opts);
  say(it.ask, String(it.stem).replace(/_{3,}/g,"blank"));
};
KINDS.qword = KINDS.mcq;
function passageLines(){ return Array.prototype.slice.call(document.querySelectorAll("#plines .pline")); }
KINDS.evidence = function(it, area, att){
  area.appendChild(el("p","ask","🔎 Tap the line in the story that proves it."));
  area.appendChild(stemNode(it.stem));
  passageLines().forEach(function(d){ d.classList.add("tappable"); d.addEventListener("click", function(){
    if(att.finished) return; var i=+d.dataset.i;
    if(it.lines.indexOf(i)>=0){ d.classList.add("proof"); att.right(); passageLines().forEach(function(x){ x.classList.remove("tappable"); }); }
    else { d.classList.add("tried"); att.wrong(); }
  }); });
  say(it.stem, "Tap the line in the story that proves it.");
};
KINDS.ref = function(it, area, att){
  area.appendChild(el("p","ask","⬅ Point back: find the word, look BACK, then tap the words that name the thing. Then press Check."));
  KINDS.lift(it, area, att, true);
};
KINDS.trait = function(it, area, att){
  area.appendChild(el("p","ask","🧑 Pick the word. Then prove it with an ACTION from the story."));
  area.appendChild(stemNode(it.stem));
  var opts=el("div","opts"), part=1, sub=el("div","sub");
  shuffle(it.options.map(function(o,i){ return i; })).forEach(function(i){ var o=it.options[i]; var b=btn(o,"opt",function(){
    if(part!==1) return;
    if(i===it.answer){ b.classList.add("good"); part=2; Array.prototype.forEach.call(opts.children,function(x){ x.disabled=true; });
      sub.appendChild(el("p","ask","🔎 Which ACTION proves it? Tap the line where the character DOES something."));
      showFb("yes","Good word! Now prove it: tap the line with an action that shows it.");
      passageLines().forEach(function(d){ d.classList.add("tappable"); d.addEventListener("click", function(){
        if(part!==2) return; var li=+d.dataset.i;
        if(it.lines.indexOf(li)>=0){ d.classList.add("proof"); part=3; passageLines().forEach(function(x){ x.classList.remove("tappable"); }); att.right(); }
        else { d.classList.add("tried"); att.wrong(it.nudge2, it.hint2); } }); });
    } else { b.classList.add("tried"); att.wrong(); } }); b.dataset.i=i; opts.appendChild(b); });
  area.appendChild(opts); area.appendChild(sub);
  say(it.stem);
};
KINDS.lift = function(it, area, att, isRef){
  if(!isRef) area.appendChild(el("p","ask","✂️ "+(it.ask||"Tap the word or words in the story. Then press Check.")));
  area.appendChild(stemNode(it.stem));
  var picked=[], words=[];
  it.from.forEach(function(li){
    var d=passageLines()[li]; if(!d) return; var lt=d.querySelector(".lt"); var txt=lt.textContent; lt.textContent="";
    var marked=false;
    txt.split(/(\s+)/).forEach(function(tok){ if(/^\s+$/.test(tok)){ lt.appendChild(document.createTextNode(tok)); return; }
      var w=el("span","pw",tok); w.dataset.k=words.length; words.push(w);
      if(isRef && li===it.line && !marked && tok.replace(/[^A-Za-z]/g,"").toLowerCase()===it.word.toLowerCase()){ marked=true; w.classList.add("refword"); w.setAttribute("data-arrow","⬅ look back"); }
      w.addEventListener("click", function(){ if(att.finished) return; w.classList.toggle("sel"); }); lt.appendChild(w); });
    d.classList.add("liftline");
  });
  var chk=btn("Check ✔","big",function(){
    if(att.finished) return;
    var sel=words.filter(function(w){ return w.classList.contains("sel"); });
    var ks=sel.map(function(w){ return +w.dataset.k; }), contiguous=ks.every(function(k,i){ return i===0||k===ks[i-1]+1; });
    var got=norm(sel.map(function(w){ return w.textContent; }).join(" "));
    if(isRef && sel.length>(it.maxWords||3)){ words.forEach(function(w){ w.classList.remove("sel"); }); att.wrong("Too many words! Name just the THING in a few words, not the whole sentence.", it.hint); return; }
    var ok=contiguous && it.accept.some(function(a){ return norm(a)===got; });
    if(ok){ sel.forEach(function(w){ w.classList.add("good"); }); att.right(); chk.disabled=true; }
    else { words.forEach(function(w){ w.classList.remove("sel"); }); att.wrong(sel.length===0?"Tap a word in the shaded line first.":null); }
  }); chk.id="checkBtn"; area.appendChild(chk);
  say(it.stem);
};
KINDS.seq = function(it, area, att){
  area.appendChild(el("p","ask","🔢 "+(it.ask||"Tap the events in the order they happened: first, second, third.")));
  var order=[], list=el("div","opts seq");
  var shown=it.events.map(function(e,i){ return {t:e,i:i}; }); // shown in a fixed scrambled order from the bank
  shown.forEach(function(e){ var b=btn(e.t,"opt",function(){
      if(att.finished||b.dataset.n) return; order.push(e.i); b.dataset.n=order.length; b.insertBefore(el("b","num",order.length+" "), b.firstChild);
      if(order.length===it.events.length){
        var ok=order.every(function(x,k){ return x===it.order[k]; });
        if(ok){ att.right(); } else { att.wrong(); order=[]; Array.prototype.forEach.call(list.children,function(x){ delete x.dataset.n; var n=x.querySelector(".num"); if(n) n.remove(); }); }
      } }); b.dataset.i=e.i; list.appendChild(b); });
  area.appendChild(list); say(it.ask||"Tap the events in the order they happened.");
};
/* true/false: tick (auto), then the proof line (auto), then (if reason:true) a reason in her own words (parent-marked) */
KINDS.tf = function(it, area, att){
  area.appendChild(el("p","ask","✅ True or false? "+(it.reason?"Then find the proof and give a reason.":"")));
  area.appendChild(stemNode("“"+it.stem+"”"));
  var row=el("div","opts tf"), part=1, firstMiss=0;
  var sub=el("div","sub");
  [["True",true],["False",false]].forEach(function(p){ var b=btn(p[0],"opt",function(){
    if(part!==1) return;
    if(p[1]===it.truth){ b.classList.add("good"); part=2; if(!it.reason){ att.right(); return; } showFb("yes","Good! Now tap the line in the story that proves it."); proof(); }
    else { b.classList.add("tried"); att.wrong(); } }); b.dataset.v=String(p[1]); row.appendChild(b); });
  area.appendChild(row); area.appendChild(sub);
  function proof(){
    passageLines().forEach(function(d){ d.classList.add("tappable"); d.addEventListener("click", function(){
      if(part!==2) return; var i=+d.dataset.i;
      if(it.lines.indexOf(i)>=0){ d.classList.add("proof"); part=3; passageLines().forEach(function(x){ x.classList.remove("tappable"); }); reason(); }
      else { d.classList.add("tried"); att.wrong(it.nudge2, it.hint2); } }); });
  }
  function reason(){
    sub.appendChild(el("p","ask","✏️ Write your reason in your own words. Start with True or False."));
    openBox(it, sub, att, function(){ att.right("Grown-up will check your reason."); });
  }
  say("True or false?", it.stem);
};
/* open answer: format checks are automatic; the content is parent-marked against a model answer + checklist */
function openBox(it, area, att, done){
  var ta=el("textarea","answer"); ta.rows=3; ta.setAttribute("autocapitalize","sentences"); ta.id="answerBox";
  ta.setAttribute("aria-label","Your answer"); area.appendChild(ta);
  var go=btn("Check my sentence ✔","big",function(){
    var v=ta.value.trim(), words=v.split(/\s+/).filter(Boolean);
    var minW=it.minWords||4;
    if(words.length<minW){ att.wrong("Write a whole sentence, not just a few words.","A full sentence has a who, a doing word and more, like: 'He felt ____ because ____.'"); return; }
    if(!/^[A-Z]/.test(v)){ att.wrong("Start your sentence with a capital letter.","The first letter of a sentence is a c_ _ _ _ _ _ letter."); return; }
    if(!/[.!]$/.test(v)){ att.wrong("Check the end of your sentence.","Every sentence ends with a f_ _ _ stop."); return; }
    if(it.keywords && !it.keywords.some(function(k){ return hasWord(v,k); })){ att.wrong("Use words from the question in your answer.","Start with words from the question, like: '"+it.starter+"'"); return; }
    go.disabled=true; ta.readOnly=true;
    var rec={d:dayStr(), t:Date.now(), game:GAME.slug, id:it.id, q:it.stem, typed:v, model:it.model, checklist:it.checklist, marks:null};
    var all=LS.get(K.open,[]); all.push(rec); if(all.length>200) all=all.slice(-200); LS.set(K.open,all);
    var m=el("div","model"); m.appendChild(el("p",null,"Good sentence shape! Now compare with this answer:"));
    m.appendChild(el("p","modeltext",it.model));
    var ul=el("ul","check"); it.checklist.forEach(function(x){ ul.appendChild(el("li",null,"☐ "+x)); }); m.appendChild(ul);
    m.appendChild(el("p","small","A grown-up will tick these on the For Grown-ups page."));
    area.appendChild(m); done();
  }); go.id="checkBtn"; area.appendChild(go);
}
KINDS.full = function(it, area, att){
  area.appendChild(el("p","ask","✏️ Answer in a full sentence. Use words from the question. End with a full stop."));
  area.appendChild(stemNode(it.stem));
  openBox(it, area, att, function(){ att.right("Grown-up will check the answer."); });
  say(it.stem, "Answer in a full sentence.");
};
/* feelings table: pick a feeling word at two points (auto) */
KINDS.feel2 = function(it, area, att){
  area.appendChild(el("p","ask","💛 How did the character feel at each point? Pick a feeling word for each row."));
  area.appendChild(stemNode(it.stem));
  var done=0;
  it.rows.forEach(function(r,ri){
    var box=el("div","feelrow"); box.appendChild(el("p","rowq",r.when));
    var opts=el("div","opts small"); r.options.forEach(function(o,i){ var b=btn(o,"opt",function(){
      if(att.finished||box.dataset.ok) return;
      if(i===r.answer){ b.classList.add("good"); box.dataset.ok="1"; done++; if(done===it.rows.length) att.right(); else showFb("yes","Good! Now the next row."); }
      else { b.classList.add("tried"); att.wrong(r.nudge, r.hint); } }); b.dataset.i=i; b.dataset.row=ri; opts.appendChild(b); });
    box.appendChild(opts); area.appendChild(box);
  });
  say(it.stem);
};

/* ---------- sentence combining: pick the joined sentence, or build it from word tiles ---------- */
function givenNode(it){
  var g=el("div","given"); it.given.forEach(function(x){ g.appendChild(el("p","givenline",x)); });
  g.appendChild(el("span","connchip",it.chip)); return g;
}
function errNudge(k){ return (GAME.errNudges||{})[k]||null; }
KINDS.combine = function(it, area, att){
  area.appendChild(el("p","ask","🔗 Which is the correct way to join them into ONE sentence?"));
  area.appendChild(givenNode(it));
  var opts=el("div","opts long");
  shuffle(it.options.map(function(o,i){ return i; })).forEach(function(i){
    var b=btn(it.options[i],"opt long",function(){
      if(att.finished) return;
      if(i===it.answer){ b.classList.add("good"); Array.prototype.forEach.call(opts.children,function(x){ x.disabled=true; }); att.right(); }
      else { b.classList.add("tried"); att.wrong(errNudge(it.errs[i])); }
    }); b.dataset.i=i; opts.appendChild(b); });
  area.appendChild(opts);
  say("Join the two sentences into one.", it.given.join(" "), it.sayWord);
};
KINDS.build = function(it, area, att){
  area.appendChild(el("p","ask","🧱 Tap the tiles to build ONE sentence. Tap a tile in your sentence to take it back."));
  area.appendChild(givenNode(it));
  var ans=tokens(it.sentence), tiles=ans.concat(it.decoys.map(function(d){ return d[0]; }));
  var line=el("div","buildline"); line.id="buildLine"; var ph=el("span","placeholder","Your sentence goes here"); line.appendChild(ph);
  var pool=el("div","wordbox tiles"); pool.id="tilePool"; var built=[];
  function redraw(){ line.innerHTML=""; if(!built.length) line.appendChild(ph);
    built.forEach(function(k,pos){ var t=btn(tiles[k],"tile in",function(){ if(att.finished) return; built.splice(pos,1); pool.querySelector('[data-t="'+k+'"]').classList.remove("used"); pool.querySelector('[data-t="'+k+'"]').disabled=false; redraw(); }); t.dataset.t=k; line.appendChild(t); }); }
  shuffle(tiles.map(function(x,k){ return k; })).forEach(function(k){
    var t=btn(tiles[k],"tile",function(){ if(att.finished||t.disabled) return; built.push(k); t.disabled=true; t.classList.add("used"); redraw(); }); t.dataset.t=k; pool.appendChild(t); });
  function clear(){ built=[]; Array.prototype.forEach.call(pool.children,function(x){ x.disabled=false; x.classList.remove("used"); }); redraw(); }
  area.appendChild(line); area.appendChild(pool);
  var row=el("div","row");
  var cl=btn("↩ Clear","quiet",function(){ if(!att.finished) clear(); }); cl.id="clearBtn";
  var chk=btn("Check ✔","big",function(){
    if(att.finished) return;
    if(!built.length){ showFb("no","Tap the tiles to build your sentence first."); return; }
    var toks=built.map(function(k){ return tiles[k]; }), got=joinTokens(toks);
    var ok=[it.sentence].concat(it.alts||[]).some(function(a){ return joinTokens(tokens(a))===got; });
    if(ok){ chk.disabled=true; cl.disabled=true; Array.prototype.forEach.call(pool.children,function(x){ x.disabled=true; }); line.classList.add("good"); att.right(); return; }
    var dec=built.filter(function(k){ return k>=ans.length; }).map(function(k){ return it.decoys[k-ans.length][1]; })[0];
    var n= dec? errNudge(dec) : (ans.indexOf(",")>=0 && toks.indexOf(",")<0)? errNudge("comma") : toks[toks.length-1]!=="."? errNudge("stop") : toks.filter(function(x){ return x==="."; }).length>1? errNudge("two") : null;
    clear(); att.wrong(n);
  }); chk.id="checkBtn";
  row.appendChild(cl); row.appendChild(chk); area.appendChild(row);
  say("Build one sentence with the tiles.", it.given.join(" "), it.sayWord);
};

/* ---------- editing: [[word]] = underlined, [[word|n]] numbered, {{}} or {{n}} = circle for a missing mark ---------- */
function markedNode(text, cls){
  var p=el("p", cls||"stem edittext"); var re=/\[\[([^\]|]+)(?:\|(\d+))?\]\]|\{\{(\d*)\}\}/g, last=0, m;
  while((m=re.exec(text))){ if(m.index>last) p.appendChild(document.createTextNode(text.slice(last,m.index)));
    if(m[1]!=null){ var u=el("u","err",m[1]); p.appendChild(u); if(m[2]) p.appendChild(el("sup","enum","("+m[2]+")")); }
    else { var c=el("span","circle","◯"); p.appendChild(c); if(m[3]) p.appendChild(el("sup","enum","("+m[3]+")")); }
    last=re.lastIndex; }
  if(last<text.length) p.appendChild(document.createTextNode(text.slice(last)));
  return p;
}
function editMatch(typed, accept){
  var t=String(typed).trim().replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"');
  return accept.some(function(a){ return /[a-z]/i.test(a) ? t.toLowerCase().replace(/[.!?,]+$/,"").replace(/\s+/g," ")===a.toLowerCase() : t===a; });
}
function correctionBox(label, onCheck){
  var row=el("div","corr"); row.appendChild(el("span","corrlabel",label));
  var inp=el("input","corrbox"); inp.type="text"; inp.setAttribute("autocapitalize","off"); inp.setAttribute("autocomplete","off"); inp.setAttribute("spellcheck","false"); inp.setAttribute("aria-label",label);
  var b=btn("Check ✔","ctl",function(){ onCheck(inp.value, inp, b); });
  inp.addEventListener("keydown",function(e){ if(e.key==="Enter") b.click(); });
  row.appendChild(inp); row.appendChild(b); return {row:row, inp:inp, btn:b};
}
KINDS.edit = function(it, area, att){
  var punc=/\{\{\}\}/.test(it.text);
  area.appendChild(el("p","ask", punc? "◯ A punctuation mark is missing at the circle. Write just the mark in the box." : "✏️ The underlined word has a mistake. Write the correct word in the box."));
  area.appendChild(markedNode(it.text));
  var cb=correctionBox("Correction:", function(v, inp, b){
    if(att.finished) return;
    if(!String(v).trim()){ showFb("no","Write your correction in the box first."); return; }
    if(editMatch(v, it.accept)){ inp.readOnly=true; b.disabled=true; inp.classList.add("good"); att.right(); }
    else { att.wrong(); inp.select(); } });
  cb.inp.id="answerBox"; cb.btn.id="checkBtn"; area.appendChild(cb.row);
  say(punc?"A punctuation mark is missing.":"Find the mistake in the underlined word.", String(it.text).replace(/\[\[([^\]|]+)(\|\d+)?\]\]/g,"$1").replace(/\{\{\d*\}\}/g,""));
};
KINDS.dictate = function(it, area, att){
  area.appendChild(el("p","ask","👂 Spelling warm-up: listen, then write the word."));
  var hear=btn("🔊 Hear the word","big",function(){ if(Voice.muted){ showFb("no","Voice is off. Ask a grown-up to read the word (it is on the For Grown-ups page), or skip."); return; } say("Spell "+it.word+". "+it.sentence+" "+it.word+"."); });
  hear.id="hearBtn"; area.appendChild(hear);
  var cb=correctionBox("Your spelling:", function(v, inp, b){
    if(att.finished) return;
    if(!String(v).trim()){ showFb("no","Write the word in the box first."); return; }
    if(editMatch(v, it.accept)){ inp.readOnly=true; b.disabled=true; att.right(); } else { att.wrong(); inp.select(); } });
  cb.inp.id="answerBox"; cb.btn.id="checkBtn"; area.appendChild(cb.row);
  var sk=btn("Skip warm-up","quiet",function(){ S.idx=S.queue.length; showItem(); }); sk.id="skipBtn"; area.appendChild(sk);
  if(!Voice.muted) say("Spell "+it.word+". "+it.sentence+" "+it.word+".");
};
function editPassageStep(){
  var P=GAME.editPassage; setMain("cloze");
  var c=el("div","card"); c.appendChild(el("h2",null,"📝 "+P.title));
  c.appendChild(el("p","ask","Read the whole passage. Each underlined word is wrong: write the correct word. Each circle needs a mark: write just the mark."));
  c.appendChild(markedNode(P.text,"passage-text"));
  var left=P.errors.length;
  var nx=btn("Next ▶","big hidden",paperStep); nx.id="nextBtn";
  P.errors.forEach(function(er){
    var a=new Attempt({id:er.id,tag:er.tag,why:er.why,nudge:er.nudge,hint:er.hint}, null);
    var cb=correctionBox("("+er.n+")", function(v, inp, b){
      if(a.finished) return; if(!String(v).trim()){ showFb("no","Write your correction in box ("+er.n+") first."); return; }
      if(editMatch(v, er.accept)){ inp.readOnly=true; b.disabled=true; inp.classList.add("good"); a.right(); if(a.misses===0) S.score++; left--; if(!left) nx.classList.remove("hidden"); }
      else { a.wrong(); } });
    cb.inp.id="ep"+er.n; cb.btn.id="epBtn"+er.n; c.appendChild(cb.row);
  });
  c.appendChild(feedbackBox()); c.appendChild(nx); main.appendChild(c);
  say(P.title+".", "Read the whole passage, then fix each mistake.");
  window.__item=P.id;
}
/* ---------- grammar cloze (word box, each word used once) ---------- */
function clozeStep(){
  var C=GAME.cloze; setMain("cloze");
  var c=el("div","card"); c.appendChild(el("h2",null,"🧩 Cloze challenge: "+C.title));
  c.appendChild(el("p","ask","Read the whole passage first. Tap a blank, then tap the word from the box. Each word is used once only."));
  var box=el("div","wordbox"); box.id="wordbox";
  shuffle(C.box.slice()).forEach(function(w){ var b=btn(w,"chip",function(){ choose(w,b); }); b.dataset.w=w; box.appendChild(b); });   // box order random, so it never hints at the blank order
  var p=el("p","passage-text"); var blanks={}; var sel=null; var att={}; var filled=0;
  C.parts.forEach(function(x){
    if(typeof x==="number"){ var bl=C.blanks[x-1]; var s=btn("("+x+") ______","cblank",function(){ if(s.dataset.ok) return; select(x); }); s.dataset.n=x; blanks[x]=s; p.appendChild(s);
      att[x]=new Attempt({id:bl.id,tag:bl.tag,why:bl.why,nudge:bl.nudge,hint:bl.hint}, null); }
    else p.appendChild(document.createTextNode(x));
  });
  c.appendChild(p); c.appendChild(box); c.appendChild(feedbackBox());
  var nx=btn("Next ▶","big hidden",paperStep); nx.id="nextBtn"; c.appendChild(nx);
  main.appendChild(c);
  function select(n){ sel=n; Object.keys(blanks).forEach(function(k){ blanks[k].classList.toggle("sel", +k===n); }); }
  function choose(w,chip){
    if(sel==null){ var first=Object.keys(blanks).filter(function(k){ return !blanks[k].dataset.ok; })[0]; if(!first) return; select(+first); }
    var bl=C.blanks[sel-1], a=att[sel];
    if(w===bl.answer){ blanks[sel].textContent="("+sel+") "+w; blanks[sel].dataset.ok="1"; blanks[sel].classList.add("good"); chip.disabled=true; chip.classList.add("used");
      a.right(); filled++; if(a.misses===0) S.score++;
      var nextOpen=Object.keys(blanks).filter(function(k){ return !blanks[k].dataset.ok; })[0];
      if(nextOpen) select(+nextOpen); else { sel=null; nx.classList.remove("hidden"); } }
    else { a.wrong(); }
  }
  select(1);
  say("Cloze challenge. Read the whole passage first.", C.parts.map(function(x){ return typeof x==="number"?" blank "+x+" ":x; }).join(""));
  window.__item=C.id;
}

/* ---------- exam-format paper step + printable checklist ---------- */
function paperStep(){
  if(SES && SES.mode==="lesson") sesClose(false);
  var P=GAME.paper; setMain("paper");
  var c=el("div","card sheet"); c.id="paperSheet";
  c.appendChild(el("h2",null,"📝 "+P.title));
  var ol=el("ol","instr"); P.instructions.forEach(function(x){ ol.appendChild(el("li",null,x)); }); c.appendChild(ol);
  if(P.box){ var b=el("div","wordbox paperbox"); P.box.forEach(function(w){ b.appendChild(el("span","chip static",w)); }); c.appendChild(b); }
  if(P.passage){ var pp=el("div","plines paperlines"); P.passage.forEach(function(l,i){ var d=el("div","pline"); d.appendChild(el("span","ln",String(i+1))); d.appendChild(el("span","lt",l)); pp.appendChild(d); }); c.appendChild(pp); }
  if(P.text) c.appendChild(P.marked? markedNode(P.text,"passage-text paper") : el("p","passage-text paper",P.text));
  var typed=[];
  if(P.questions){ var qo=el("ol","paperq"); P.questions.forEach(function(q,qi){ var li=el("li",null,q);
      if(P.typed){ li.appendChild(el("div","writeline","____________________________________________")); var ta=el("textarea","answer typed noprint"); ta.rows=2; ta.id="typed"+(qi+1);
        ta.setAttribute("autocapitalize","sentences"); ta.setAttribute("aria-label","Type answer "+(qi+1)+" (optional)"); ta.placeholder="Optional: type it here too, for a grown-up to check"; typed.push(ta); li.appendChild(ta); }
      qo.appendChild(li); }); c.appendChild(qo); }
  c.appendChild(el("h3",null,"Grown-up checklist (tick on paper or here)"));
  var ul=el("ul","check paper-check");
  P.checklist.forEach(function(x,i){ var li=el("li"); var lb=el("label"); var cb=el("input"); cb.type="checkbox"; cb.dataset.i=i; lb.appendChild(cb); lb.appendChild(document.createTextNode(" "+x)); li.appendChild(lb); ul.appendChild(li); });
  c.appendChild(ul);
  c.appendChild(el("p","small","Answers for the grown-up are on the For Grown-ups page (press and hold the button at the bottom)."));
  var row=el("div","row noprint");
  var pr=btn("🖨 Print this sheet","ctl",function(){ window.print(); }); pr.id="printBtn";
  var dn=btn("I wrote it on paper ✔","big",function(){
    var ticks=Array.prototype.map.call(ul.querySelectorAll("input"),function(x){ return x.checked; });
    var all=LS.get(K.paper,[]); all.push({d:dayStr(), game:GAME.slug, ticks:ticks}); LS.set(K.paper,all); sesPaper(ticks);
    if(typed.length){ var op=LS.get(K.open,[]), t0=Date.now(); typed.forEach(function(ta,qi){ var v=ta.value.trim(); if(!v) return;
      op.push({d:dayStr(), t:t0+qi, game:GAME.slug, id:"paper-"+(qi+1), q:P.questions[qi], typed:v, model:P.models[qi], checklist:P.qchecks[qi], marks:null}); });
      if(op.length>200) op=op.slice(-200); LS.set(K.open,op); }
    summary(); }); dn.id="paperDone";
  row.appendChild(pr); row.appendChild(dn); c.appendChild(row);
  main.appendChild(c);
  say(P.title+". "+P.instructions.join(" "));
}

function afterItems(){
  if(S.phase==="warmup"){ S.phase=null; S.warmDone=true; S.contWarm=true; startLesson(); return; }
  if(S.mode==="lesson"){ S.lessonScore=S.score; if(GAME.cloze){ clozeStep(); return; } if(GAME.editPassage){ editPassageStep(); return; } paperStep(); return; }
  summary();
}
function medalFor(n){ return n>=5?"Gold":n>=4?"Silver":n>=3?"Bronze":null; }
function summary(){
  if(SES) sesClose(false);
  var d=roundDone(); var cap = false;
  setMain("summary"); var c=el("div","card center");
  var n = S.mode==="lesson"? S.lessonScore : S.score, total = S.queue.length;
  var medal=null;
  if(S.mode==="lesson"){ medal=medalFor(n); var m=LS.get(K.medal,{}); var rank={Bronze:1,Silver:2,Gold:3};
    if(medal && (!m[GAME.slug] || rank[medal]>rank[m[GAME.slug]])){ m[GAME.slug]=medal; LS.set(K.medal,m); } }
  c.appendChild(el("div","bigemoji", medal==="Gold"?"🥇":medal==="Silver"?"🥈":medal==="Bronze"?"🥉":"🌱"));
  c.appendChild(el("h2",null, n+" of "+total+" right on the first try"));
  c.appendChild(el("p",null, medal? medal+" level! " : "Every try makes your brain stronger. "));
  var st=LS.get(K.streak,{n:1}); c.appendChild(el("p","small","Day streak: "+st.n+(st.usedShield===dayStr()?" (your streak shield kept it safe)":"")));
  var row=el("div","row");
  if(cap){ c.appendChild(el("p","rest","Great work! Your brain grows while you rest. Come back tomorrow."));
    var rv=btn("Optional review","quiet",startReview); rv.id="reviewBtn"; row.appendChild(rv); }
  else if(S.mode==="lesson"){ var pb=btn("🎲 Practice: 5 questions","big",startPractice); pb.id="practiceBtn"; row.appendChild(pb); }
  else { var mb=btn("5 more ▶","big",startPractice); mb.id="moreBtn"; row.appendChild(mb); }
  row.appendChild(hubLink()); c.appendChild(row); main.appendChild(c);
  say(n+" of "+total+" right on the first try.", medal?medal+" level!":null, cap?"Great work! Your brain grows while you rest. Come back tomorrow.":null);   // the score line stays on the device voice
}

/* ---------- For Grown-ups page (press and hold) ---------- */
function holdButton(b, fn){
  var t0=0;
  b.addEventListener("pointerdown", function(e){ t0=Date.now(); b.classList.add("holding"); });
  b.addEventListener("pointerup", function(){ b.classList.remove("holding"); if(t0 && Date.now()-t0>=1200) fn(); t0=0; });
  b.addEventListener("pointerleave", function(){ b.classList.remove("holding"); t0=0; });
  b.addEventListener("contextmenu", function(e){ e.preventDefault(); });
}
function parentPage(){
  var ov=$("parent"); ov.innerHTML=""; ov.classList.remove("hidden");
  var c=el("div","card"); c.appendChild(el("h2",null,"For Grown-ups"));
  c.appendChild(el("p","small","Everything here stays on this device. No account, nothing is sent anywhere."));
  var st=tagStats(7), keys=Object.keys(st).sort();
  c.appendChild(el("h3",null,"Accuracy by tag (first try, last 7 days)"));
  if(!keys.length) c.appendChild(el("p",null,"No answers yet."));
  else { var t=el("table","tagtable"); t.id="tagTable"; var hr=el("tr"); ["Tag","Skill","Right first try","%"].forEach(function(h){ hr.appendChild(el("th",null,h)); }); t.appendChild(hr);
    keys.forEach(function(k){ var tr=el("tr"); tr.appendChild(el("td",null,k)); tr.appendChild(el("td",null,TAGS[k]||"")); tr.appendChild(el("td",null,st[k].ok+" / "+st[k].n)); tr.appendChild(el("td",null,Math.round(100*st[k].ok/st[k].n)+"%")); t.appendChild(tr); });
    c.appendChild(t); }
  var weak=weakTags().slice(0,3);
  c.appendChild(el("p",null,"Top weak tags: "+(weak.length?weak.join(", "):"none yet")));
  var bx=LS.get(K.box,{}), learning=Object.keys(bx).filter(function(k){ return bx[k].box<2; });
  c.appendChild(el("p",null,"Items still learning: "+learning.length+(learning.length?" ("+learning.slice(0,12).map(function(k){ return k.split("|")[1]; }).join(", ")+(learning.length>12?" ...":"")+")":"")));
  var s=LS.get(K.streak,{n:0}); var mins=LS.get(K.mins,{}), m7=0; Object.keys(mins).forEach(function(d){ if(daysBetween(d,dayStr())<7) m7+=mins[d]; });
  c.appendChild(el("p",null,"Streak: "+(s.n||0)+" day(s). Minutes played (7 days): "+Math.round(m7)+". Rounds today: "+daily().rounds+"."));
  var medals=LS.get(K.medal,{}); c.appendChild(el("p",null,"Medals: "+(Object.keys(medals).map(function(k){ return k+" "+medals[k]; }).join(", ")||"none yet")));
  // paper-step answers
  var GS=window.GAMES_META||[]; if(GAME && GAME.paper){ c.appendChild(el("h3",null,"Paper step answers ("+GAME.title+")")); var pu=el("ul"); GAME.paper.answers.forEach(function(a){ pu.appendChild(el("li",null,a)); }); c.appendChild(pu); }
  if(GAME && GAME.warmup){ c.appendChild(el("p",null,"Spelling warm-up words (read aloud if the voice is off): "+GAME.warmup.map(function(id){ var x=byId(id); return x.word+" ("+x.chunks+")"; }).join(", "))); }
  // open answers to mark
  var open=LS.get(K.open,[]); var todo=open.filter(function(r){ return !r.marks; });
  c.appendChild(el("h3",null,"Open answers to mark ("+todo.length+")"));
  todo.slice(-10).forEach(function(r){ var d=el("div","markcard");
    d.appendChild(el("p",null,"Q: "+r.q)); d.appendChild(el("p",null,"Her answer: "+r.typed)); d.appendChild(el("p","modeltext","Model: "+r.model));
    var cbs=[]; r.checklist.forEach(function(x){ var lb=el("label","blk"); var cb=el("input"); cb.type="checkbox"; cbs.push(cb); lb.appendChild(cb); lb.appendChild(document.createTextNode(" "+x)); d.appendChild(lb); });
    d.appendChild(btn("Save marks","ctl",function(){ var all=LS.get(K.open,[]); all.forEach(function(x){ if(x.t===r.t && x.id===r.id) x.marks=cbs.map(function(c){ return c.checked; }); }); LS.set(K.open,all); d.classList.add("marked"); d.appendChild(el("p","small","Saved.")); }));
    c.appendChild(d); });
  c.appendChild(el("h3",null,"Practice history"));
  c.appendChild(el("p","small","The practice history is kept on this device only (in this browser). Clearing Safari's website data, private browsing or another device will not show it."));
  var ch=btn("Clear history (press and hold)","ctl danger"); ch.id="clearHistory"; var chMsg=el("span","small"); chMsg.id="clearMsg";
  holdButton(ch, function(){ LS.set(K.hist,[]); try{ localStorage.removeItem(K.cur); }catch(e){} chMsg.textContent=" History cleared."; if($("history")) renderHistory(); });
  c.appendChild(ch); c.appendChild(chMsg);
  var sum=summaryText(); var pre=el("textarea","sumtext"); pre.value=sum; pre.readOnly=true; pre.rows=6; pre.id="sumText";
  c.appendChild(el("h3",null,"Copy summary for chat")); c.appendChild(pre);
  var row=el("div","row");
  row.appendChild(btn("📋 Copy summary","ctl",function(){ try{ if(navigator.clipboard) navigator.clipboard.writeText(sum); }catch(e){} pre.select(); try{ document.execCommand("copy"); }catch(e){} }));
  var cl=btn("Close","big",function(){ ov.classList.add("hidden"); }); cl.id="closeParent"; row.appendChild(cl);
  c.appendChild(row); ov.appendChild(c);
}
function summaryText(){
  var st=tagStats(7), s=LS.get(K.streak,{n:0}), mins=LS.get(K.mins,{}), m7=0; Object.keys(mins).forEach(function(d){ if(daysBetween(d,dayStr())<7) m7+=mins[d]; });
  var parts=Object.keys(st).sort().map(function(k){ return k+" "+st[k].ok+"/"+st[k].n; });
  var open=LS.get(K.open,[]).filter(function(r){ return !r.marks; }).length;
  return "English games summary ("+dayStr()+"): first-try by tag (7 days): "+(parts.join(", ")||"none")+". Weak: "+(weakTags().slice(0,3).join(", ")||"none")+
    ". Streak "+(s.n||0)+". Minutes (7 days) "+Math.round(m7)+". Rounds today "+daily().rounds+". Open answers to mark: "+open+".";
}

/* ---------- hub: who is playing + my practice history ---------- */
function playerBox(ask){
  var box=$("playerBox"); if(!box) return; box.innerHTML="";
  var known=LS.get(K.player,null)!==null;
  if(known && !ask){ var row=el("div","card hello"); var h=el("h2",null,"Hi, "+player()+"!"); h.id="hello"; row.appendChild(h);
    var ch=btn("Change player","linkbtn",function(){ playerBox(true); }); ch.id="changePlayer"; row.appendChild(ch); box.appendChild(row); return; }
  var c=el("div","card center ask-name"); c.id="namePrompt";
  c.appendChild(el("h2",null,"Who is playing?"));
  var inp=el("input","namebox"); inp.type="text"; inp.id="nameInput"; inp.maxLength=20; inp.setAttribute("autocomplete","off"); inp.setAttribute("autocapitalize","words"); inp.setAttribute("spellcheck","false"); inp.setAttribute("aria-label","Your name");
  inp.placeholder="Type your name"; c.appendChild(inp);
  var go=btn("Let's go! ▶","big",function(){ setPlayer(inp.value); playerBox(false); renderHistory(); }); go.id="nameGo";
  inp.addEventListener("keydown",function(e){ if(e.key==="Enter") go.click(); });
  c.appendChild(go);
  var ps=LS.get(K.players,[]); if(ps.length){ var r=el("div","row"); r.appendChild(el("span","small","Or tap your name: "));
    ps.forEach(function(n,i){ var b=btn(n,"chip",function(){ setPlayer(n); playerBox(false); renderHistory(); }); b.id="pick"+i; r.appendChild(b); }); c.appendChild(r); }
  c.appendChild(el("p","small","Your name stays on this device only. It is not sent anywhere."));
  box.appendChild(c);
}
function dayOf(iso){ return iso.slice(0,10); }
function niceDay(d){ var dt=new Date(d+"T12:00:00+08:00"); var M=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"], W=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  return W[(dt.getUTCDay())]+" "+(+d.slice(8,10))+" "+M[+d.slice(5,7)-1]+" "+d.slice(0,4); }
var histFilter="all";
function renderHistory(){
  var sec=$("history"); if(!sec) return; sec.innerHTML="";
  sec.appendChild(el("h2",null,"📒 My practice history"));
  var all=LS.get(K.hist,[]).slice().sort(function(a,b){ return b.t-a.t; });
  var names=[]; all.forEach(function(r){ if(names.indexOf(r.player)<0) names.push(r.player); });
  if(histFilter!=="all" && names.indexOf(histFilter)<0) histFilter="all";
  var fr=el("div","row left filterrow"); fr.id="playerFilter"; fr.setAttribute("role","group"); fr.setAttribute("aria-label","Show player"); fr.appendChild(el("span","small","Show: "));
  [["all","Everyone"]].concat(names.map(function(n){ return [n,n]; })).forEach(function(o,i){ var b=btn(o[1],"chip"+(o[0]===histFilter?" on":""),function(){ histFilter=o[0]; renderHistory(); });
    b.dataset.p=o[0]; b.setAttribute("aria-pressed", o[0]===histFilter?"true":"false"); fr.appendChild(b); });   // buttons, not a <select> (WebKit's select injects an inline style our CSP blocks)
  sec.appendChild(fr);
  var rows=all.filter(function(r){ return histFilter==="all"||r.player===histFilter; });
  if(!rows.length) sec.appendChild(el("p",null,"No sessions yet. Finish a round and it will show up here! ⭐"));
  var days=[]; rows.forEach(function(r){ var d=dayOf(r.when); if(days.indexOf(d)<0) days.push(d); });
  days.forEach(function(d){
    var rs=rows.filter(function(r){ return dayOf(r.when)===d; }), items=0, sc=[]; rs.forEach(function(r){ items+=r.done; if(r.pct!=null) sc.push(r.pct); });
    var avg=sc.length? Math.round(sc.reduce(function(a,b){ return a+b; },0)/sc.length)+"%" : "–";
    var h=el("h3","histday",niceDay(d)); sec.appendChild(h);
    var tot=el("p","histtot","Sessions: "+rs.length+" · Questions: "+items+" · Average score: "+avg); tot.dataset.day=d; sec.appendChild(tot);
    var wrap=el("div","tablewrap"); var t=el("table","histtable"); t.dataset.day=d; var hr=el("tr");
    ["Time","Player","Game","Mode","Done","Right first try","Score","Hints","Tricky tags"].forEach(function(x){ hr.appendChild(el("th",null,x)); }); t.appendChild(hr);
    rs.forEach(function(r){ var tr=el("tr", r.partial?"partial":null);
      [r.when.slice(11,16), r.player, r.title, (r.mode==="paper"?"📝 paper":r.mode==="lesson"?"📘 lesson":"🎲 practice")+(r.partial?" (stopped early)":""),
       r.done+" / "+r.total, r.correct==null?"–":String(r.correct), r.pct==null?(r.ticks?"ticks "+r.ticks:"–"):r.pct+"%", String(r.hints||0), (r.top||[]).join(", ")||"–"]
        .forEach(function(x){ tr.appendChild(el("td",null,x)); }); t.appendChild(tr); });
    wrap.appendChild(t); sec.appendChild(wrap);
  });
  sec.appendChild(el("p","small parentnote","For grown-ups: this history is saved on this iPad only, in this browser. Clearing Safari's website data, private browsing or using another device will not show it. Times are Singapore time. Clear it from the For Grown-ups page (press and hold)."));
}

/* ---------- mute / say again ---------- */
function updMute(){ var b=$("muteBtn"); if(!b) return; b.textContent=Voice.muted?"🔇 Voice off":"🔊 Voice on"; b.setAttribute("aria-pressed", Voice.muted?"true":"false"); }

/* ---------- boot ---------- */
function boot(){
  main=$("main");
  var mb=$("muteBtn"); if(mb){ mb.addEventListener("click", function(){ Voice.setMuted(!Voice.muted); updMute(); }); updMute(); }
  var ab=$("againBtn"); if(ab) ab.addEventListener("click", function(){ Voice.again(); });
  var gb=$("grownups"); if(gb) holdButton(gb, parentPage);
  addXP(0);
  sesRecover();
  window.addEventListener("pagehide", function(){ sesClose(true); });
  if(!GAME){ playerBox(false); renderHistory(); return; }
  $("modeLesson").addEventListener("click", function(){ if(capReached()){ startReview(); return; } ruleCard(); });
  $("modePractice").addEventListener("click", function(){ startPractice(); });
  startScreen();
}
window.ENG = { tokens:tokens, joinTokens:joinTokens, pickRound:pickRound, validItem:validItem, eligible:eligible, TAGS:TAGS, LS:LS, K:K, ROUND:ROUND,
  playItem:function(id){ sesClose(true); var it=byId(id); S.mode="practice"; S.queue=[it]; S.idx=0; S.score=0; showItem(); },
  playCloze:function(){ S.mode="lesson"; clozeStep(); }, paperStep:paperStep, parentPage:parentPage, startLesson:startLesson, summaryText:summaryText,
  state:S, player:player, history:function(){ return LS.get(K.hist,[]); }, session:function(){ return SES; } };
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
