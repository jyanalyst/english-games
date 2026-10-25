/* Home page: 'My reward points' (stars and Test badges from each game's "Test yourself" check-up) and the 'Show Daddy' card.
   English keys only (eng.rewards, eng.player), kept in this browser's localStorage; this page has no network code. Points never go down. */
(function(){
  "use strict";
  var RKEY="eng.rewards", PKEY="eng.player";
  var TITLES={"tense-time-machine": "Tense Time Machine", "little-words": "Little Words", "word-detective": "Word Detective", "sneaky-mistake": "Spot the Sneaky Mistake", "story-sleuth": "Story Sleuth", "join-it-up": "Join It Up"}, ORDER=Object.keys(TITLES);
  var DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"], MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var ISO=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):\d\d\+08:00$/;
  function $(id){ return document.getElementById(id); }
  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function el(tag, text, cls){ var e=document.createElement(tag); if(text!=null) e.textContent=text; if(cls) e.className=cls; return e; }
  function data(){ var r=null; try{ r=JSON.parse(get(RKEY)||"null"); }catch(e){} return (r && r.players && typeof r.players==="object") ? r.players : {}; }
  function num(v){ v=+v; return isFinite(v)&&v>=0?Math.round(v):0; }
  function day(iso){ var m=ISO.exec(String(iso||"")); if(!m) return ""; var d=new Date(Date.UTC(+m[1],+m[2]-1,+m[3])); return DAYS[d.getUTCDay()]+" "+(+m[3])+" "+MONTHS[+m[2]-1]; }
  function today(){ var d=new Date(Date.now()+8*3600000); return DAYS[d.getUTCDay()]+" "+d.getUTCDate()+" "+MONTHS[d.getUTCMonth()]+" "+d.getUTCFullYear(); }
  function current(){ return (window.ENG && ENG.player) ? ENG.player() : "Player"; }
  var shown=null, sec=null;
  function mount(){ if(sec && sec.parentNode) return true; var anchor=$("history"); if(!anchor) return false;
    sec=el("section",null,"card rewards"); sec.id="rewardSec"; sec.setAttribute("aria-labelledby","rTitle"); anchor.parentNode.insertBefore(sec, anchor); return true; }
  function draw(){
    if(!mount()) return;
    var all=data(), who=shown||current(), P=all[who]||{stars:0,badges:{},tests:[]}, badges=P.badges||{};
    sec.innerHTML="";
    var h=el("h2","🏅 My reward points"); h.id="rTitle"; sec.appendChild(h);
    var top=el("div",null,"rtop");
    var nm=el("b",who,"rwho"); nm.id="rWho"; top.appendChild(nm);
    var st=el("span","⭐ "+num(P.stars)+" reward points","rstars"); st.id="rStars"; top.appendChild(st);
    var db=el("button","🏅 Show Daddy"); db.type="button"; db.id="rDaddy"; db.className="ckbtn gold"; db.onclick=function(){ daddy(who); }; top.appendChild(db);
    sec.appendChild(top);
    sec.appendChild(el("p","Finish a Lesson in any game, then tap 📝 Test yourself for 3 exam-style questions. ⭐⭐ right first try, ⭐ right on a new try, +3 ⭐ for finishing, and 🏅 a Test badge for all 3 right first try.","small rhelp"));
    var ul=el("ul",null,"rbadges"); ul.id="rBadges";
    ORDER.forEach(function(slug){ var b=badges[slug], li=el("li",(b?"🏅 ":"▫️ ")+TITLES[slug]+(b?" · "+day(b.first)+(num(b.count)>1?" · ×"+num(b.count):""):""), b?"got":"");
      li.setAttribute("data-game",slug); li.setAttribute("data-badge",b?"1":"0"); ul.appendChild(li); });
    sec.appendChild(ul);
    var tests=(P.tests||[]).slice(-5).reverse();
    if(tests.length){ sec.appendChild(el("h3","Latest tests")); var tl=el("ul"); tl.id="rTests";
      tests.forEach(function(t){ tl.appendChild(el("li",day(t.at)+" · "+(TITLES[t.game]||t.game)+" · ⭐ "+num(t.stars)+" · right first try "+num(t.first)+" of "+num(t.total)+(t.badge?" · 🏅":""))); }); sec.appendChild(tl); }
    else sec.appendChild(el("p","No tests yet for "+who+".","small rhelp"));
    var others=Object.keys(all).filter(function(n){ return n!==who; }).sort();
    if(others.length){ var op=el("p","Other players: ","small"); op.id="rOthers";
      others.forEach(function(n){ var b=el("button",n+" ⭐ "+num(all[n].stars),"chip"); b.type="button"; b.setAttribute("data-rplayer",n); b.onclick=function(){ shown=n; draw(); }; op.appendChild(b); });
      sec.appendChild(op); }
  }
  function daddy(who){
    var all=data(), P=all[who]||{stars:0,badges:{},tests:[]}, badges=P.badges||{}, got=ORDER.filter(function(s){ return badges[s]; }), last=(P.tests||[]).slice(-1)[0];
    var d=$("ckDaddyView"); if(!d){ d=el("div"); d.id="ckDaddyView"; d.setAttribute("role","dialog"); d.setAttribute("aria-label","Show Daddy"); document.body.appendChild(d); }
    d.innerHTML=""; var c=el("div",null,"ckdcard");
    c.appendChild(el("div",got.length?"🏅":"⭐","ckdbig")); c.appendChild(el("div",who,"ckdname")); c.appendChild(el("div",today(),"ckddate"));
    c.appendChild(el("div","⭐ "+num(P.stars)+" reward points","ckdpts")); c.appendChild(el("div","Test badges: 🏅 "+got.length+" of "+ORDER.length,"ckdline"));
    if(got.length) c.appendChild(el("div",got.map(function(s){ return "🏅 "+TITLES[s]; }).join(" · "),"ckdbadges"));
    if(last) c.appendChild(el("div","Latest test: "+(TITLES[last.game]||last.game)+", "+day(last.at)+", ⭐ "+num(last.stars),"ckdline"));
    var x=el("button","Close"); x.type="button"; x.id="ckDaddyClose"; x.className="ckbtn ghost"; x.onclick=function(){ d.hidden=true; }; c.appendChild(x);
    d.appendChild(c); d.hidden=false;
  }
  // the engine redraws the history after the player changes; redraw the points card with it
  window.addEventListener("eng:historydrawn", function(){ shown=null; draw(); });
  window.addEventListener("storage", function(){ draw(); });
  window.addEventListener("pageshow", function(){ draw(); });
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", draw); else draw();
})();
