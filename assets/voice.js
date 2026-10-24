/* ---------- voice tutor (device voice only). COPIED from Math Game games-src/voice.js on 24 Oct 2026;
   English changes: one shared mute key, readLines() for "read it with me" line highlighting. ---------- */
var MUTE_KEY = "eng.muted";
var Voice = (function(){
  var ss = ("speechSynthesis" in window) ? window.speechSynthesis : null;
  var hasUtt = typeof window.SpeechSynthesisUtterance === "function";
  var supported = !!(ss && hasUtt);
  var voice = null, last = [], token = 0, started = false;
  var muted = false;
  try{ muted = localStorage.getItem(MUTE_KEY)==="1"; }catch(e){}
  var PREFS = [["karen","en-au"],["moira","en-ie"],["tessa","en-za"],["samantha","en-us"],["serena","en-gb"],["kate","en-gb"],["martha","en-gb"]];
  var FEMALE = /female|woman|girl|samantha|victoria|karen|moira|tessa|fiona|serena|kate|martha|susan|zira|hazel|libby|sonia|aria|jenny|natasha|catherine|allison|ava|nicky/i;
  function quality(v){ return /premium/i.test(v.name)?2:(/enhanced/i.test(v.name)?1:0); }
  function pick(){
    if(!supported) return null;
    var vs = []; try{ vs = ss.getVoices() || []; }catch(e){}
    if(!vs.length) return null;
    var en = vs.filter(function(v){ return /^en/i.test(v.lang||""); });
    for(var i=0;i<PREFS.length;i++){
      var m = en.filter(function(v){ return v.name.toLowerCase().indexOf(PREFS[i][0])===0 && (v.lang||"").toLowerCase().replace("_","-").indexOf(PREFS[i][1])===0; });
      if(!m.length) m = en.filter(function(v){ return v.name.toLowerCase().indexOf(PREFS[i][0])===0; });
      if(m.length){ m.sort(function(a,b){return quality(b)-quality(a);}); return m[0]; }
    }
    var f = en.filter(function(v){ return FEMALE.test(v.name) && !/\bmale\b/i.test(v.name.replace(/female/ig,"")); });
    if(f.length){ f.sort(function(a,b){return quality(b)-quality(a);}); return f[0]; }
    var g = en.filter(function(v){ return /en[-_](gb|au)/i.test(v.lang||""); });
    if(g.length) return g[0];
    return null;
  }
  function refresh(){ voice = pick(); }
  if(supported){
    refresh();
    try{ if(ss.addEventListener) ss.addEventListener("voiceschanged", refresh); else ss.onvoiceschanged = refresh; }catch(e){ ss.onvoiceschanged = refresh; }
  }
  function clean(t){ return String(t).replace(/<[^>]+>/g,"").replace(/&amp;/g,"and").replace(/\s*[—–]\s*/g,", ").replace(/…/g,".").replace(/[\uD800-\uDFFF]/g,"").replace(/[\u2190-\u27BF\u2B00-\u2BFF\uFE0F\u200D]/g,"").replace(/\s+/g," ").trim(); }
  function sentences(t){ var m = t.match(/[^.!?]+[.!?]*/g) || [t]; return m.map(function(x){return x.trim();}).filter(Boolean); }
  function utter(text){
    var u = new SpeechSynthesisUtterance(text);
    if(!voice) refresh();
    if(voice){ u.voice = voice; u.lang = voice.lang; } else { u.lang = "en-GB"; }
    u.rate = 0.9; u.pitch = 1.05; u.volume = 1;
    return u;
  }
  function play(lines, immediate){
    var my = ++token, parts = [];
    lines.forEach(function(l){ parts = parts.concat(sentences(l)); });
    function go(){ if(my!==token) return; parts.forEach(function(p){ try{ ss.speak(utter(p)); }catch(e){} }); }
    var busy = false; try{ busy = ss.speaking || ss.pending; ss.cancel(); }catch(e){}
    if(immediate || !busy) go(); else setTimeout(go, 60);
  }
  function say(){
    var lines = Array.prototype.slice.call(arguments).filter(Boolean).map(clean).filter(Boolean);
    if(!lines.length) return;
    last = lines;
    if(!supported || muted || !started) return;
    play(lines, false);
  }
  return {
    supported: supported, say: say,
    again: function(){ if(supported && !muted && started && last.length) play(last,false); },
    unlock: function(lines){ started = true; lines = (lines||[]).map(clean).filter(Boolean); if(lines.length) last = lines; if(supported && !muted && lines.length) play(lines, true); },
    stop: function(){ token++; if(supported){ try{ ss.cancel(); }catch(e){} } },
    setMuted: function(m){ muted = !!m; try{ localStorage.setItem(MUTE_KEY, muted?"1":"0"); }catch(e){} if(muted) this.stop(); },
    get muted(){ return muted; }, get started(){ return started; },
    get lastLine(){ return last.join(" "); },
    readLines: function(lines, onLine){
      lines = (lines||[]).map(clean); last = lines.slice();
      if(!supported || muted || !started) return false;
      var my = ++token; try{ ss.cancel(); }catch(e){}
      lines.forEach(function(l, i){ if(!l) return; var u = utter(l);
        u.onstart = function(){ if(my===token && onLine) onLine(i); };
        if(i===lines.length-1) u.onend = function(){ if(my===token && onLine) onLine(-1); };
        try{ ss.speak(u); }catch(e){} });
      return true;
    }
  };
})();
function tell(){ Voice.say.apply(null, arguments); }
