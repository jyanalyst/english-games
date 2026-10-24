/* ---------- voice tutor: recorded clips (lumen) where we have them, device voice for every other line ----------
   Device-voice part COPIED from Math Game games-src/voice.js; clip layer (lookup, queue, fallback, iPad unlock) COPIED from
   Math Game's voice option B voice.js (24 Oct 2026). English changes: one shared mute key, spoken forms (spoken.js),
   per-game clip map in clips.js (window.CLIPS: spoken text -> ../audio/<hash>.mp3), readLines() with line highlighting. */
var MUTE_KEY = "eng.muted";
var Voice = (function(){
  var CLIPS = (typeof window.CLIPS==="object" && window.CLIPS) ? window.CLIPS : {};
  var ss = ("speechSynthesis" in window) ? window.speechSynthesis : null;
  var hasUtt = typeof window.SpeechSynthesisUtterance === "function";
  var supported = !!(ss && hasUtt);
  var voice = null, last = [], token = 0, started = false, primed = false, aud = null, audOk = false, log = [], clipSeq = 0;
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
  // the line as it is spoken (and the key of its clip)
  function spoken(t){ var c = clean(t); return (window.SPOKEN && c) ? window.SPOKEN.form(c).text : c; }
  function sentences(t){ var m = t.match(/[^.!?]+[.!?]*/g) || [t]; return m.map(function(x){return x.trim();}).filter(Boolean); }
  function utter(text){
    var u = new SpeechSynthesisUtterance(text);
    if(!voice) refresh();
    if(voice){ u.voice = voice; u.lang = voice.lang; } else { u.lang = "en-GB"; }
    u.rate = 0.9; u.pitch = 1.05; u.volume = 1;
    return u;
  }
  // Recorded clips, looked up by the exact spoken line. A line with no clip, or a clip that fails to load or play,
  // is read by the device voice instead. One <audio> element is reused: a play() inside the first tap unlocks it on iPad Safari.
  function clipFor(l){ return Object.prototype.hasOwnProperty.call(CLIPS,l) ? CLIPS[l] : null; }
  function el(){ if(!aud){ try{ aud = new Audio(); aud.preload = "auto"; }catch(e){ aud = null; } } return aud; }
  function unlockAudio(){ // inside a tap: play any clip muted, then stop, so later clips may play
    if(audOk) return; var a = el(), any = null; if(!a) return;
    for(var k in CLIPS){ if(Object.prototype.hasOwnProperty.call(CLIPS,k)){ any = CLIPS[k]; break; } }
    if(!any) return;
    var seq = ++clipSeq;
    try{ a.muted = true; a.removeAttribute("data-line"); a.src = any; var p = a.play(); audOk = true;
      var done = function(){ if(seq!==clipSeq) return; try{ a.pause(); }catch(e){} a.muted = false; };
      if(p && p.then) p.then(done, function(){ a.muted = false; audOk = false; }); else done();
    }catch(e){ a.muted = false; }
  }
  function primeSpeech(){ if(!supported || primed) return; primed = true; try{ var u = new SpeechSynthesisUtterance(" "); u.volume = 0; ss.speak(u); }catch(e){} }
  function speakParts(parts, my, done){
    if(!supported || !parts.length){ if(done) done(); return; }
    var fired = false, tm = null, fin = function(){ if(fired) return; fired = true; if(tm) clearTimeout(tm); if(my===token && done) done(); };
    parts.forEach(function(p, k){ var u = utter(p); if(k===parts.length-1 && done){ u.onend = fin; u.onerror = fin; } try{ ss.speak(u); }catch(e){} });
    // safety net if the browser never fires onend: move on after a generous estimate
    if(done && !fired) tm = setTimeout(fin, 2500 + parts.join(" ").length*95);
  }
  // play a list of spoken lines in order; onLine(i) as line i starts, onLine(-1) at the end (for highlighting)
  function play(lines, immediate, onLine){
    var my = ++token, items = lines.map(function(l){ return {l:l, f:clipFor(l)}; }), i = 0;
    function line(k){ if(onLine && my===token) onLine(k); }
    function next(){
      if(my!==token) return;
      if(i>=items.length){ line(-1); return; }
      var k = i, it = items[i++]; line(k);
      if(it.f){
        var a = el(); if(!a){ fallback(it); return; }
        var fired = false, go = function(ok){ if(fired) return; fired = true; if(my!==token) return; if(ok){ log.push({text:it.l, src:"clip", file:it.f}); next(); } else fallback(it); };
        a.onended = function(){ go(true); }; a.onerror = function(){ go(false); };
        try{ clipSeq++; a.muted = false; a.setAttribute("data-line", it.l); a.src = it.f; var p = a.play(); if(p && p.catch) p.catch(function(){ go(false); }); }catch(e){ go(false); }
      } else { log.push({text:it.l, src:"tts"}); device(it); }
    }
    // device-voice lines: queue them straight away unless a later clip or the highlighter must wait for them to finish
    function device(it){ var wait = !!onLine || items.slice(i).some(function(x){ return !!x.f; });
      speakParts(sentences(it.l), my, wait ? next : null); if(!wait) next(); }
    function fallback(it){ log.push({text:it.l, src:"tts", failed:it.f}); device(it); }
    var busy = false; try{ if(supported){ busy = ss.speaking || ss.pending; ss.cancel(); } }catch(e){}
    if(aud){ try{ aud.pause(); }catch(e){} }
    // iOS sometimes drops a speak() issued in the same tick as cancel(); a short gap avoids that.
    if(immediate || !busy) next(); else setTimeout(next, 60);
  }
  var hasClips = function(){ for(var k in CLIPS) return true; return false; };
  var canSpeak = function(){ return supported || (!!window.Audio && hasClips()); };
  function say(){
    var lines = Array.prototype.slice.call(arguments).filter(Boolean).map(spoken).filter(Boolean);
    if(!lines.length) return;
    last = lines;
    if(muted || !started || !canSpeak()) return;
    play(lines, false);
  }
  return {
    // a device with no speech engine still counts as having a voice when this page has recorded clips
    get supported(){ return canSpeak(); }, say: say,
    again: function(){ if(!muted && started && last.length && canSpeak()) play(last,false); },
    unlock: function(lines){ // must be called inside a tap handler (iPad Safari rule)
      started = true; lines = (lines||[]).map(spoken).filter(Boolean); if(lines.length) last = lines;
      if(muted) return;
      primeSpeech(); unlockAudio();
      if(lines.length) play(lines, true);
    },
    prime: function(){ started = true; if(muted) return; primeSpeech(); unlockAudio(); },
    stop: function(){ token++; if(supported){ try{ ss.cancel(); }catch(e){} } if(aud){ try{ aud.pause(); }catch(e){} } },
    setMuted: function(m){ muted = !!m; try{ localStorage.setItem(MUTE_KEY, muted?"1":"0"); }catch(e){} if(muted) this.stop(); },
    get muted(){ return muted; }, get started(){ return started; },
    get lastLine(){ return last.join(" "); },
    readLines: function(lines, onLine){
      lines = (lines||[]).map(spoken); last = lines.filter(Boolean);
      if(muted || !started || !canSpeak()) return false;
      play(lines.map(function(l){ return l||" "; }), true, onLine); return true;
    },
    clean: clean, spoken: spoken, clipFor: clipFor, get clips(){ return CLIPS; }, get clipLog(){ return log; },
    get clipCount(){ var n=0; for(var k in CLIPS) n++; return n; }
  };
})();
function tell(){ Voice.say.apply(null, arguments); }
