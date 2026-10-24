/* Spoken forms (24 Oct 2026). The screen keeps the written text; the voice (recorded clip or device voice) says this form.
   Fill-in hints ("E_ _ _ _") become "the letter E, then four more letters"; endings ("-ing") are spelled; "+" is "plus";
   ALL-CAPS emphasis words are lower-cased so they are not spelled out. Pure function: the clip generator on the box uses the same file. */
(function(root){
  var NUM=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
  function num(n){ return NUM[n]||String(n); }
  function letters(s){ return s.toUpperCase().split("").join(", "); }
  function more(n){ return num(n)+(n===1?" more letter":" more letters"); }
  // one fill-in token: [prefix letters][blanks][suffix letters], blanks written as "_ _ _" or "___"
  function fill(pre, blanks, suf, dash){
    var n=(blanks.match(/_/g)||[]).length;
    if(dash){ // an ending: "-_ _ _", "-_d"
      if(!pre && !suf) return "a "+num(n)+"-letter ending";
      return "a "+num(n+suf.length)+"-letter ending that ends in "+letters(suf);
    }
    if(!pre && !suf) return "blank";
    if(pre && !suf) return letters(pre)+", then "+more(n);
    var out=[]; (pre+blanks.replace(/ /g,"")+suf).split("").forEach(function(ch){ out.push(ch==="_"?"blank":ch.toUpperCase()); });
    return out.join(", ");
  }
  // hand-respelled spelling-chunk hints (the automatic rule reads these clumsily)
  var OVERRIDE={
    "Chunk it: be - l_ _ves. Which comes first, i or e?":"Chunk it: B, E. Then L, blank, blank, V, E, S. Which comes first, I or E?",
    "The ending -f_l has only o_e l.":"The ending F, blank, L has only O, blank, E, letter L.",
    "care + f_l + _y. Count the l's: t_o.":"Care, plus F, blank, L, plus blank, Y. Count the L's: T, blank, O.",
    "Remember 'a fri_ _d to the END'. The word ends with e-n-d.":"Remember: a F, R, I, blank, blank, D, to the end. The word ends with E, N, D.",
    "Remember 'a fri_ _d to the END', then add -s.":"Remember: a F, R, I, blank, blank, D, to the end. Then add S.",
    "an - i - m_ls. Which vowel comes after m?":"A, N. Then I. Then M, blank, L, S. Which vowel comes after M?",
    "Chunk it: be - l_ _ve. It is like 'believes' without the s.":"Chunk it: B, E. Then L, blank, blank, V, E. It is like believes, without the S.",
    "Three chunks: b_ _ _ - t_ - f_l. The ending has one l.":"Three chunks. B, then three more letters. T, then one more letter. F, blank, L. The ending has one L.",
    "Say it slowly: li - BR_R - y. Count the r's.":"Say it slowly: L, I. Then B, R, blank, R. Then Y. Count the R's.",
    "Say it in three chunks: W_d - nes - day. There is a silent letter.":"Say it in three chunks: W, blank, D. Then nes. Then day. There is a silent letter.",
    "Three chunks: c_ _ _ - f_l - _y. Two l's in total.":"Three chunks. C, then three more letters. F, blank, L. Blank, Y. Two L's in total."
  };
  function form(t){
    if(Object.prototype.hasOwnProperty.call(OVERRIDE,t)) return {text:OVERRIDE[t], norm:false};
    // gaps in helper words that are never the answer read better as the whole word
    var s=String(t).replace(/\bh_ppened\b/g,"happened").replace(/\bg_ing\b/g,"going"), respelled=false;
    s=s.replace(/(-?)([A-Za-z]*)(_(?: ?_)*)([A-Za-z]*)/g,function(m,dash,pre,bl,suf,at,all){ respelled=true;
      var r=fill(pre,bl,suf,!!dash); return r+(/^ [A-Za-z]/.test(all.slice(at+m.length))&&r!=="blank"?",":""); });
    s=s.replace(/(^|[\s('"])-([a-z]{1,4})\b/g,function(m,b,suf){ respelled=true; return b+letters(suf); });
    s=s.replace(/\s\+\s/g," plus ").replace(/\s=\s/g," makes ");
    s=s.replace(/\b([A-Z]{2,})\b/g,function(m,w){ return /^(TV|OK)$/.test(w)?w:w.toLowerCase(); });
    s=s.replace(/\s+/g," ").trim();
    return {text:s, norm:!respelled};
  }
  root.SPOKEN={form:form};
})(typeof window!=="undefined"?window:this);
