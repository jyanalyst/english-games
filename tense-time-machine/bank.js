(function(){
function mask(w){ return String(w).split(" ").map(function(x){ return x.charAt(0)+x.slice(1).replace(/[a-z]/gi,"_"); }).join(" "); }
var NUDGE = {
  past: "Find the words that tell you WHEN. Did it already happen?",
  pres: "Is this something that happens again and again, like a habit?",
  presCont: "Look for a clue like now, Look! or Listen!",
  pastCont: "Two things happened in the past. Which one started first and kept going?",
  presPerf: "Look for since, already, ever, or so ... now. They join the past to now.",
  future: "Has it happened yet, or is it still to come?",
  base: "Look at the little word just before the blank.",
  ing: "Look at the verb just before the blank. What comes after it?",
  pp: "After have or has, which form of the verb do we use?"
};
var HINT = {
  past: "it already h_ppened, so we use the p_ _ _ form of the verb.",
  pres: "it happens again and again, so we use the pr_ _ _ _ _ form.",
  presCont: "it happens at this very moment, so we need a helper word + a verb ending in -_ _ _.",
  pastCont: "it kept going in the past, so we need a past helper word + a verb ending in -_ _ _.",
  presPerf: "it joins the past to now, so we need a helper word + the 'done' form (like eaten or gone).",
  future: "it has not happened yet, so we need w_ _ _ + the verb.",
  base: "after 'to', the verb stays in its plain, b_ _ _ form.",
  ing: "after 'enjoy', the verb ends in -_ _ _.",
  pp: "after 'have ... ever', we use the 'done' form, like eaten or gone."
};
var I = [];
function M(id, tag, diff, stem, opts, ans, why, meta, src, nudge, hint){
  var f = [].concat(meta.form)[0];
  var clue = meta.clue;
  I.push({ id:id, kind:"mcq", tag:tag, diff:diff, stem:stem, options:opts, answer:ans, why:why,
    nudge: nudge || NUDGE[f], hint: hint || ("Time clue: " + mask(clue) + ". " + HINT[f].charAt(0).toUpperCase() + HINT[f].slice(1)),
    src:src, meta:meta });
}
M("E01-001","GR-TENSE",1,"Yesterday, Ben ___ his bicycle to the park.",["ride","rides","rode","riding"],2,"'Yesterday' means it already happened, so we use the past. Ride is a tricky verb: its past is rode.",{verb:"ride",form:"past",subj:"3s",clue:"Yesterday"},"orig");
M("E01-002","GR-TENSE",1,"Last Saturday, Mia ___ her grandma a birthday card.",["make","makes","made","making"],2,"'Last Saturday' already happened, so we use the past: made.",{verb:"make",form:"past",subj:"3s",clue:"Last Saturday"},"orig");
M("E01-003","GR-TENSE",1,"Look! The puppies ___ in the garden now.",["plays","played","are playing","is playing"],2,"'Look!' and 'now' mean it is happening at this moment. Puppies are many, so: are playing.",{verb:"play",form:"presCont",subj:"pl",clue:"now"},"orig");
M("E01-004","GR-TENSE",1,"Every morning, Ali ___ his teeth after breakfast.",["brush","brushes","brushed","brushing"],1,"'Every morning' is a habit, so we use the present. Ali is one person, so the verb ends in -es: brushes.",{verb:"brush",form:"pres",subj:"3s",clue:"Every morning"},"orig");
M("E01-005","GR-TENSE",1,"Tomorrow, we ___ the science centre with our class.",["visit","visited","will visit","visiting"],2,"'Tomorrow' has not happened yet, so we use will + verb: will visit.",{verb:"visit",form:"future",subj:"pl",clue:"Tomorrow"},"orig");
M("E01-006","GR-TENSE",1,"My sister ___ a big bowl of noodles for lunch yesterday.",["eat","eats","ate","eaten"],2,"'Yesterday' means past. Eat is a tricky verb: its past is ate. (Eaten needs has or have.)",{verb:"eat",form:"past",subj:"3s",clue:"yesterday"},"orig");
M("E01-007","GR-TENSE",1,"I ___ to school by bus every day.",["go","goes","went","going"],0,"'Every day' is a habit, so we use the present. With 'I' the verb has no -s: go.",{verb:"go",form:"pres",subj:"1s",clue:"every day"},"orig");
M("E01-008","GR-TENSE",1,"Last night, the baby ___ for a long time.",["cry","cries","cried","crying"],2,"'Last night' already happened, so we use the past. Cry changes y to i and adds -ed: cried.",{verb:"cry",form:"past",subj:"3s",clue:"Last night"},"orig");
M("E01-009","GR-TENSE",1,"A bird ___ a nest in our mango tree last week.",["build","builds","built","building"],2,"'Last week' means past. Build is a tricky verb: its past is built.",{verb:"build",form:"past",subj:"3s",clue:"last week"},"orig");
M("E01-010","GR-SVA",1,"Every Sunday, my grandparents ___ us for lunch.",["visit","visits","visited","visiting"],0,"'Every Sunday' is a habit, so present. Grandparents are more than one person, so the verb has no -s: visit.",{verb:"visit",form:"pres",subj:"pl",clue:"Every Sunday"},"orig","Is it one grandparent or two? Is it a habit?","Grandparents means m_ _ _ than one, and 'every Sunday' is a h_ _ _ _. Many people take the verb with no -s.");
M("E01-011","GR-SVA",1,"Our cat always ___ on the sofa after lunch.",["sleep","sleeps","slept","sleeping"],1,"'Always' is a habit, so present. One cat, so the verb ends in -s: sleeps.",{verb:"sleep",form:"pres",subj:"3s",clue:"always"},"orig","Is it one cat or many? Is it a habit?","'Always' means it is a h_ _ _ _. One cat takes a verb that ends in -_.");
M("E01-012","GR-TENSE",1,"Shh! Mum ___ a cake in the kitchen right now.",["bake","bakes","baked","is baking"],3,"'Right now' means it is happening at this moment, so we use is + -ing: is baking.",{verb:"bake",form:"presCont",subj:"3s",clue:"right now"},"orig");
M("E01-013","GR-TENSE",2,"Dad ___ dinner when the lights suddenly went out.",["cooks","is cooking","was cooking","has cooked"],2,"Dad was in the middle of cooking in the past when the lights went out, so: was cooking.",{verb:"cook",form:"pastCont",subj:"3s",clue:"when the lights suddenly went out"},"orig",null,"The clue is 'when the lights w_ _ _ out'. The cooking started first and kept g_ing, so we need a past helper word + -ing.");
M("E01-014","GR-SVA",2,"Each of the boys ___ a red cap for Sports Day.",["have","has","having","are having"],1,"'Each' means one at a time, so it takes the verb for one person: has.",{verb:"have",form:"pres",subj:"3s",clue:"Each"},"orig","Is 'each' talking about one boy at a time, or all of them together?","'Each' means o_ _ at a time, so use the verb for one person, like he or she.");
M("E01-015","GR-SVA",2,"Everyone in my class ___ our new teacher.",["like","likes","liking","are liking"],1,"'Everyone' sounds like many, but it takes the verb for one person: likes.",{verb:"like",form:"pres",subj:"3s",clue:"Everyone"},"orig","Everyone is a sneaky word. Do we say 'everyone is' or 'everyone are'?","We say 'everyone i_', so 'everyone' takes the verb for o_ _ person.");
M("E01-016","GR-SVA",2,"Sam and his brother ___ football every Friday.",["play","plays","is playing","playing"],0,"'Sam and his brother' are two people, and 'every Friday' is a habit, so: play.",{verb:"play",form:"pres",subj:"pl",clue:"every Friday"},"orig","How many people are in the subject: Sam AND his brother?","Sam + his brother = t_ _ people. Two people take the verb with no -s.");
M("E01-017","GR-TENSE",2,"We ___ in this flat since 2020.",["live","lives","are living","have lived"],3,"'Since' joins the past to now, so we use have + the 'done' form: have lived.",{verb:"live",form:"presPerf",subj:"pl",clue:"since"},"orig");
M("E01-018","GR-TENSE",2,"Mei ___ her homework already, so she can play now.",["finish","finishes","has finished","will finish"],2,"'Already' and 'so she can play now' join the past to now, so: has finished.",{verb:"finish",form:"presPerf",subj:"3s",clue:"already"},"orig");
M("E01-019","GR-TENSE",2,"Next week, our class ___ the bird park.",["visits","visited","will visit","has visited"],2,"'Next week' has not happened yet, so we use will + verb: will visit.",{verb:"visit",form:"future",subj:"3s",clue:"Next week"},"orig");
M("E01-020","GR-TENSE",2,"The children ___ a song when the bell rang, so they stopped.",["sing","sings","are singing","were singing"],3,"The singing was going on in the past when the bell rang. Children are many, so: were singing.",{verb:"sing",form:"pastCont",subj:"pl",clue:"when the bell rang"},"orig",null,"The clue is 'when the bell r_ _ _'. The singing started first and kept g_ing. Many children: which past helper word + -ing?");
M("E01-021","GR-TENSE",2,"I ___ my lunch box at home yesterday.",["leave","leaves","left","leaving"],2,"'Yesterday' means past. Leave is a tricky verb: its past is left.",{verb:"leave",form:"past",subj:"1s",clue:"yesterday"},"orig");
M("E01-022","GR-SVA",2,"The flowers in the vase ___ fresh yesterday, but now they are dry.",["is","are","was","were"],3,"'Yesterday' means past, and flowers are many, so: were.",{verb:"be",form:"past",subj:"pl",clue:"yesterday"},"orig","Two questions: is it now or before? Is it one flower or many?","'Yesterday' means the p_ _ _, and flowers means m_ _ _. Past + many: which word?");
M("E01-023","GR-SVA",3,"The box of crayons ___ on the table now.",["is","are","was","were"],0,"The subject is 'the box' (one box), not the crayons, and 'now' means present: is.",{verb:"be",form:"pres",subj:"3s",clue:"now"},"orig","What sits on the table: the box, or the crayons inside it?","Only one b_ _ sits on the table, and 'now' means present. One thing + now: which word?");
M("E01-024","GR-TENSE",2,"Look at the dark clouds! It ___ to rain.",["start","starts","started","is starting"],3,"'Look!' tells us it is happening at this moment, so: is starting.",{verb:"start",form:"presCont",subj:"3s",clue:"Look"},"orig");
M("E01-025","GR-TENSE",2,"Last holiday, my family ___ to Malacca by car.",["drive","drives","drove","driving"],2,"'Last holiday' means past. Drive is a tricky verb: its past is drove.",{verb:"drive",form:"past",subj:"3s",clue:"Last holiday"},"orig");
M("E01-026","GR-TENSE",2,"Grandpa ___ the newspaper every morning.",["read","reads","reading","is reading"],1,"'Every morning' is a habit, and Grandpa is one person, so: reads.",{verb:"read",form:"pres",subj:"3s",clue:"every morning"},"orig");
M("E01-027","GR-TENSE",2,"Listen! Someone ___ at the door.",["knock","knocks","knocked","is knocking"],3,"'Listen!' tells us it is happening at this moment, so: is knocking.",{verb:"knock",form:"presCont",subj:"3s",clue:"Listen"},"orig");
M("E01-028","GR-TENSE",2,"I ___ my best friend after school tomorrow.",["see","saw","will see","seen"],2,"'Tomorrow' has not happened yet, so: will see.",{verb:"see",form:"future",subj:"1s",clue:"tomorrow"},"orig");
M("E01-029","GR-TENSE",2,"Our teacher ___ us a funny story yesterday.",["tell","tells","told","telling"],2,"'Yesterday' means past. Tell is a tricky verb: its past is told.",{verb:"tell",form:"past",subj:"3s",clue:"yesterday"},"orig");
M("E01-030","GR-SVA",2,"Two sparrows ___ on the fence right now.",["sit","sits","are sitting","is sitting"],2,"'Right now' means at this moment, and two sparrows are many, so: are sitting.",{verb:"sit",form:"presCont",subj:"pl",clue:"right now"},"orig","Is it one bird or two? Is it happening now?","Two birds = m_ _ _, and it happens n_ _. Many + now: which helper word?");
M("E01-031","GR-TENSE",2,"Last week, Kai ___ his arm while he was climbing a tree.",["break","breaks","broke","broken"],2,"'Last week' means past. Break is a tricky verb: its past is broke. (Broken needs has, have or was.)",{verb:"break",form:"past",subj:"3s",clue:"Last week"},"orig");
M("E01-032","GR-SVA",2,"My parents ___ coffee every morning.",["drink","drinks","drank","drunk"],0,"'Every morning' is a habit, and parents are two people, so the verb has no -s: drink.",{verb:"drink",form:"pres",subj:"pl",clue:"every morning"},"orig","Is it one parent or two? Is it a habit?","Parents are t_ _ people, and 'every morning' is a h_ _ _ _. Many people: no -s.");
M("E01-033","GR-TENSE",2,"Where ___ you go last weekend?",["do","does","did","done"],2,"'Last weekend' means past, so the helper word is in the past too: did.",{verb:"do",form:"past",subj:"pl",clue:"last weekend"},"orig","Find the words that tell you WHEN this question is about.","The clue is 'l_ _ _ weekend'. It already happened, so the helper word goes into the p_ _ _ too.");
M("E01-034","GR-TENSE",2,"The mice ___ away when they saw the cat.",["run","runs","ran","running"],2,"'When they saw the cat' is the past. Run is a tricky verb: its past is ran.",{verb:"run",form:"past",subj:"pl",clue:"saw"},"orig",null,"The clue word is 's_ _', which is the past of see. So this verb is in the p_ _ _ too.");
M("E01-035","GR-TENSE",2,"Lily enjoys ___ pictures of animals.",["draw","draws","drew","drawing"],3,"After 'enjoys', the next verb ends in -ing: drawing.",{verb:"draw",form:"ing",subj:"3s",clue:"enjoys"},"orig");
M("E01-036","GR-TENSE",2,"Arjun likes to ___ his bicycle around the park.",["ride","rides","rode","riding"],0,"After 'to', the verb stays plain: to ride.",{verb:"ride",form:"base",subj:"3s",clue:"to"},"orig");
M("E01-037","GR-TENSE",3,"Raj ___ his water bottle, so he cannot have a drink now.",["lose","loses","has lost","will lose"],2,"He lost it in the past and it is still lost now, so: has lost.",{verb:"lose",form:"presPerf",subj:"3s",clue:"so he cannot have a drink now"},"orig",null,"The clue is 'so he cannot have a drink n_ _'. Something in the past still matters now, so we need a helper word + the 'done' form.");
M("E01-038","GR-TENSE",3,"Have you ever ___ a real panda?",["see","saw","seen","seeing"],2,"After 'have ... ever', we use the 'done' form. See is tricky: see, saw, seen.",{verb:"see",form:"pp",subj:"pl",clue:"Have ... ever"},"orig");
M("E01-039","GR-TENSE",3,"Siti ___ the piano since she was five.",["plays","played","has played","will play"],2,"'Since' joins the past to now, so: has played.",{verb:"play",form:"presPerf",subj:"3s",clue:"since"},"orig");
M("E01-040","GR-SVA",3,"One of my pencils ___ missing now.",["is","are","were","be"],0,"The subject is 'one' (of my pencils), and 'now' means present, so: is.",{verb:"be",form:"pres",subj:"3s",clue:"now"},"orig","How many pencils are missing: one, or all of them?","Only o_ _ pencil got lost, and 'now' means present. One thing + now: which word?");
M("E01-041","GR-SVA",3,"My friends and I ___ hide-and-seek at the moment.",["play","plays","is playing","are playing"],3,"'At the moment' means now, and 'my friends and I' are many people, so: are playing.",{verb:"play",form:"presCont",subj:"pl",clue:"at the moment"},"orig","How many people play? Does it happen now?","My friends + I = m_ _ _ people, and it happens n_ _. Many + now: which helper word?");
M("E01-042","GR-TENSE",3,"She ___ a letter to her pen pal next Monday.",["write","wrote","will write","written"],2,"'Next Monday' has not happened yet, so: will write.",{verb:"write",form:"future",subj:"3s",clue:"next Monday"},"orig");
M("E01-043","GR-TENSE",3,"Aunt Rose ___ durian before, but right now she ___ mangosteen for the first time.",["tastes / tasted","has tasted / is tasting","tasted / tastes","will taste / has tasted"],1,"'Before' (up to now) needs has tasted; 'right now' needs is tasting.",{verb:["taste","taste"],form:["presPerf","presCont"],subj:"3s",clue:"before ... right now"},"orig","Read the whole sentence. Which part runs from before until now, and which part happens right now?","Blank 1: 'b_ _ _ _ _' joins the past to now (helper word + done form). Blank 2: 'r_ _ _ _ now' (helper word + -ing).");
M("E01-044","GR-TENSE",3,"Every Saturday, Hui Min ___ swimming, but last Saturday she ___ at home because it rained.",["go / stays","goes / stayed","went / stays","is going / will stay"],1,"'Every Saturday' is a habit (goes), and 'last Saturday' is the past (stayed).",{verb:["go","stay"],form:["pres","past"],subj:"3s",clue:"Every Saturday ... last Saturday"},"orig","There are two time clues. Find one for each blank.","Blank 1: 'e_ _ _ _ Saturday' is a habit. Blank 2: 'l_ _ _ Saturday' already happened.");
M("E01-045","GR-TENSE",3,"Right now, the twins ___ TV, but yesterday they ___ in the park.",["is watching / play","watch / plays","are watching / played","were watching / will play"],2,"'Right now' needs are watching (twins are two), and 'yesterday' needs the past: played.",{verb:["watch","play"],form:["presCont","past"],subj:"pl",clue:"Right now ... yesterday"},"orig","Find two time clues, one for each blank. Count the twins: one or two?","Blank 1: 'r_ _ _ _ now' + two people. Blank 2: 'y_ _ _ _ _ _ _ _' already happened.");
var cloze = { id:"E01-C1", title:"Ming's Garden", src:"orig",
  box:["waters","watered","planted","have grown","grew","is painting","painted","will invite"],
  parts:["Ming loves plants. Every morning, he ", 1, " his tomato plants before school. Last week, he ", 2,
    " three new seeds in a pot. Since then, the seeds ", 3, " into tiny green shoots. Right now, Ming ", 4,
    " a sign for his garden. Tomorrow, he ", 5, " his grandma to come and see it."],
  blanks:[
    {id:"E01-C1-1",tag:"GR-TENSE",diff:2,answer:"waters",why:"'Every morning' is a habit, and Ming is one person, so: waters.",nudge:"Find the time clue just before this blank.",hint:"The clue is 'E_ _ _ _ morning', a habit. One person + habit: the verb ends in -s.",meta:{verb:"water",form:"pres",subj:"3s",clue:"Every morning"}},
    {id:"E01-C1-2",tag:"GR-TENSE",diff:2,answer:"planted",why:"'Last week' already happened, so: planted.",nudge:"Did this happen already, or is it still to come?",hint:"The clue is 'L_ _ _ week'. It already happened, so the verb ends in -_d.",meta:{verb:"plant",form:"past",subj:"3s",clue:"Last week"}},
    {id:"E01-C1-3",tag:"GR-TENSE",diff:3,answer:"have grown",why:"'Since then' joins the past to now, and seeds are many, so: have grown.",nudge:"Look for since. It joins the past to now.",hint:"The clue is 'S_ _ _ _ then'. Since needs has or have + the 'done' form.",meta:{verb:"grow",form:"presPerf",subj:"pl",clue:"Since then"}},
    {id:"E01-C1-4",tag:"GR-TENSE",diff:2,answer:"is painting",why:"'Right now' means at this moment, so: is painting.",nudge:"Is it happening at this moment?",hint:"The clue is 'R_ _ _ _ now', so we need is + a verb ending in -_ _ _.",meta:{verb:"paint",form:"presCont",subj:"3s",clue:"Right now"}},
    {id:"E01-C1-5",tag:"GR-TENSE",diff:2,answer:"will invite",why:"'Tomorrow' has not happened yet, so: will invite.",nudge:"Has it happened yet?",hint:"The clue is 'T_ _ _ _ _ _ _'. It has not happened yet, so we need w_ _ _ + verb.",meta:{verb:"invite",form:"future",subj:"3s",clue:"Tomorrow"}}
  ]};

window.GAME = {
  slug:"tense-time-machine", code:"G-E01", key:"eng.tense", title:"Tense Time Machine", emoji:"⏰",
  level:"P3", tagLine:"P3 · Grammar · GR-TENSE · GR-SVA",
  intro:"Travel through time with verbs! Find the time clue, then pick the verb that fits.",
  tags:["GR-TENSE","GR-SVA"],
  rule:{ title:"The secret rule: find the time clue first!",
    rows:[["yesterday, last week, ago","already happened","went, played"],
          ["every day, always, usually","happens again and again","goes, play"],
          ["now, right now, Look!, Listen!","happening at this moment","is / are + -ing"],
          ["since, already, ever, so ... now","from the past until now","has / have + done"],
          ["tomorrow, next week","still to come","will + verb"]],
    tip:"Then check: one or many? One: is, was, has, goes. Many: are, were, have, go.",
    say:"Here is the secret rule. Find the time clue first. Yesterday or last week means it already happened, so use the past. Every day or always means a habit, so use the present. Now, look, or listen means it is happening right now, so use is or are, and i n g. Since, already, or ever joins the past to now, so use has or have. Tomorrow or next week means it is still to come, so use will. Then check: is the subject one, or many?" },
  worked:{ stem:"Yesterday, Tom ___ to the library.", options:["go","goes","went","going"], answer:2,
    steps:[
      {text:"Step 1: Find the time clue and underline it.", mark:"Yesterday", say:"Step 1. Find the time clue and underline it. The time clue is: yesterday."},
      {text:"Step 2: 'Yesterday' means it already happened. So we need the past.", say:"Step 2. Yesterday means it already happened. So we need the past."},
      {text:"Step 3: Go is a tricky verb. Its past is not 'goed'. It is went.", pick:2, say:"Step 3. Go is a tricky verb. Its past is not goed. It is went. Yesterday, Tom went to the library."}
    ]},
  items:I, cloze:cloze,
  lesson:["E01-002","E01-004","E01-017","E01-022","E01-043"],
  paper:{ title:"Paper step: Grammar Cloze", 
    instructions:["Get a pencil and paper. Copy the numbers 1, 2 and 3.","Read the whole passage first.","Underline the time clue for each blank.","Write the correct verb from the box next to each number. Each word is used once only."],
    box:["visits","visited","is visiting","will visit","has visited"],
    text:"Grandpa (1) ________ us every Sunday. Last Sunday, he (2) ________ us with a big box of kueh. Next Sunday, he (3) ________ us again with my cousins.",
    answers:["(1) visits","(2) visited","(3) will visit"],
    checklist:["Read the whole passage first","Underlined a time clue for each blank","Wrote each verb neatly next to its number","Used each box word once only","All 3 verbs correct (grown-up marks)"] }
};
})();
