(function(){
var I = [];
var NUDGE = {
  "SC-JOIN":"How do the two ideas fit together: adding, different, a choice, or a result?",
  "SC-REASON":"Which sentence is the reason (why), and which is what happened?",
  "SC-TIME":"Which action happened first? Think about the order.",
  "SC-THOUGH":"The two ideas don't seem to match. Which part is the surprise?",
  "SC-REL":"Who or what is the second sentence about? The joining word goes right after that person or thing.",
  "SC-PAIR":"These joining words come as a pair. Where does each one go?",
  "SC-BEGIN":"The sentence must start with the given word. Where does the first part end?"
};
var ERR = {
  meaning:"Check the meaning. Which part is the reason, and which part is what happened?",
  order:"Check the order. Which action happened first?",
  tense:"Check the doing word: is it the right tense, and does it match one or many?",
  two:"Your answer must be ONE sentence. Count the full stops.",
  stop:"Check the end of the sentence. What does every sentence end with?",
  cap:"Check the capital letters. Only the first word, and names, start with a capital.",
  comma:"When a sentence begins with the joining word, a comma goes where the first part ends.",
  but:"'Although' already does the job of 'but'. Never use both in one sentence.",
  asso:"'As' and 'because' already give the reason. Don't add 'so' as well.",
  extra:"Look for an extra word you do not need. Read the sentence aloud in your head.",
  word:"Use the word given in the brackets.",
  pair:"These words come as pairs: both goes with and, either goes with or, neither goes with nor.",
  whowhich:"Who is for people. Which is for animals and things.",
  notnot:"'Neither' already means 'not'. Don't add another 'not'."
};
function wordChip(word, begin){ return begin? "Begin with: "+word : "("+word+")"; }
function sayWord(word, begin){ var p=word.split(" ... "); if(p.length===2) return "Use the joining pair: "+p[0].toLowerCase()+", then "+p[1]+"."; return begin? "Begin with the word "+word+"." : (/ /.test(word)? "Use the words " : "Use the word ")+word+"."; }
function base(id, kind, tag, diff, given, word, begin, answer, why, hint, meta, nudge, src){
  return {id:id, kind:kind, tag:tag, diff:diff, given:given, word:word, begin:!!begin, chip:wordChip(word,begin), sayWord:sayWord(word,begin),
    sentence:answer, why:why, hint:hint, nudge:nudge||NUDGE[tag], src:src||"orig", meta:meta||{drop:[],add:[]}};
}
function C(id, tag, diff, given, word, begin, answer, dis, why, hint, meta, nudge, src){
  var it=base(id,"combine",tag,diff,given,word,begin,answer,why,hint,meta,nudge,src);
  it.options=[answer].concat(dis.map(function(d){ return d[0]; })); it.errs=[null].concat(dis.map(function(d){ return d[1]; })); it.answer=0; I.push(it);
}
function B(id, tag, diff, given, word, begin, answer, decoys, why, hint, meta, nudge, src, alts){
  var it=base(id,"build",tag,diff,given,word,begin,answer,why,hint,meta,nudge,src);
  it.decoys=decoys; it.alts=alts||[]; I.push(it);
}
var D0={drop:[],add:[]};
B("E06-001","SC-JOIN",1,["Mia likes to swim.","Mia likes to cycle."],"and",false,"Mia likes to swim and cycle.",[["but","word"],["so","word"]],
  "Mia likes both things, so 'and' adds them. We say 'Mia likes to' only once.","Say 'Mia likes to' only once. Then put the two things she likes, with the joining word between them: swim ... c_ _ _ _ _.",{drop:["mia","likes","to"],add:[]});
C("E06-002","SC-JOIN",1,["The shop was closed.","We went home."],"so",false,"The shop was closed, so we went home.",
  [["The shop was closed, so We went home.","cap"],["We went home, so the shop was closed.","meaning"],["The shop was closed, so we went home","stop"]],
  "'So' comes before the result. The shop was closed, and the result was that we went home.","First the reason (the shop was closed), then the joining word, then what we d_ _.",D0);
B("E06-003","SC-JOIN",2,["I wanted to play outside.","It was raining."],"but",false,"I wanted to play outside but it was raining.",[["and","word"],["It","cap"]],
  "'But' joins two ideas that go against each other: I wanted to play, but the rain stopped me.","First what I wanted, then the joining word, then what the w_ _ _ _ _ _ was like.",D0);
C("E06-004","SC-JOIN",2,["We can take the bus to the zoo.","We can take the train to the zoo."],"or",false,"We can take the bus or the train to the zoo.",
  [["We can take the bus and the train to the zoo.","word"],["We can take the bus. Or the train to the zoo.","two"],["we can take the bus or the train to the zoo.","cap"]],
  "'Or' gives a choice. Say 'We can take' and 'to the zoo' once, with the two choices in the middle.","Say 'We can take' only once. Put the two choices together: the bus ... the t_ _ _ _.",{drop:["we","can","take","to","the","zoo"],add:[]});
B("E06-005","SC-JOIN",2,["Ben was very thirsty.","He drank three glasses of water."],"so",false,"Ben was very thirsty, so he drank three glasses of water.",[["He","cap"],["because","word"]],
  "Being thirsty is the reason, and drinking water is the result, so 'so' goes in between.","First how Ben felt, then a comma and the joining word, then what he d_ _ _ _.",D0,null,null,["Ben was very thirsty so he drank three glasses of water."]);
C("E06-006","SC-JOIN",3,["Grandpa likes durians.","Grandma does not like durians."],"but",false,"Grandpa likes durians but Grandma does not.",
  [["Grandpa likes durians, Grandma does not.","word"],["Grandpa likes durians. But Grandma does not.","two"],["Grandpa likes durians but Grandma does not","stop"]],
  "'But' shows two different likes. We don't need to say 'like durians' again at the end.","You don't need 'like durians' twice. The sentence ends with: does n_ _.",{drop:["like","durians"],add:[]});
C("E06-007","SC-REASON",1,["Amy wore a raincoat.","It was raining."],"because",false,"Amy wore a raincoat because it was raining.",
  [["It was raining because Amy wore a raincoat.","meaning"],["Amy wore a raincoat because it is raining.","tense"],["Amy wore a raincoat. Because it was raining.","two"]],
  "'Because' goes just before the reason. The rain is why Amy wore a raincoat.","What happened, then 'because', then the reason: the r_ _ _.",D0);
B("E06-008","SC-REASON",3,["The children were noisy.","The teacher asked them to be quiet."],"because",false,"The teacher asked the children to be quiet because they were noisy.",[["so","word"],["are","tense"]],
  "Being noisy is the reason, so it goes after 'because'. 'They' points back to the children.","Start with what the teacher did. After 'because', give the reason, and say t_ _ _ for the children.",{drop:["them"],add:["they"]});
C("E06-009","SC-REASON",2,["Dad could not drive to work.","His car had a flat tyre."],"because",false,"Dad could not drive to work because his car had a flat tyre.",
  [["His car had a flat tyre because Dad could not drive to work.","meaning"],["Dad could not drive to work because his car has a flat tyre.","tense"],["Dad could not drive to work because His car had a flat tyre.","cap"]],
  "The flat tyre is the reason, so it comes after 'because'. 'His' has a small h in the middle of a sentence.","What Dad could not do, then 'because', then the reason: the flat t_ _ _ _.",D0);
B("E06-010","SC-REASON",2,["Siti stayed at home.","She had a fever."],"because",false,"Siti stayed at home because she had a fever.",[["She","cap"],["so","word"]],
  "The fever is the reason Siti stayed at home, so it comes after 'because'.","What Siti did, then 'because', then the reason: the f_ _ _ _.",D0);
C("E06-011","SC-REASON",3,["The floor was wet.","Ravi slipped and fell."],"because",false,"Ravi slipped and fell because the floor was wet.",
  [["The floor was wet because Ravi slipped and fell.","meaning"],["Ravi slipped and fell because the floor is wet.","tense"],["Ravi slipped and fell because the floor was wet","stop"]],
  "The wet floor made Ravi fall, so the wet floor is the reason. The reason goes after 'because'.","Ask: what made Ravi fall? That is the reason. It goes after 'because': the wet f_ _ _ _.",D0);
B("E06-012","SC-TIME",1,["I brushed my teeth.","I went to bed."],"before",false,"I brushed my teeth before I went to bed.",[["after","word"],["go","tense"]],
  "Brushing came first, so we say 'I brushed my teeth before I went to bed.'","What came first goes at the start, then 'before', then what came next: going to b_ _.",D0);
C("E06-013","SC-TIME",2,["Mum came home.","We had dinner."],"after",false,"We had dinner after Mum came home.",
  [["Mum came home after we had dinner.","order"],["We had dinner after Mum comes home.","tense"],["We had dinner. After Mum came home.","two"]],
  "Mum came home first. 'After' goes before the thing that happened first: after Mum came home.","Put 'after' just before what happened first: Mum came h_ _ _.",D0);
B("E06-014","SC-TIME",2,["Lily was reading a book.","The phone rang."],"when",false,"Lily was reading a book when the phone rang.",[["is","tense"],["and","word"]],
  "Lily was in the middle of reading, and then the phone rang, so we use 'when'.","Start with what Lily was doing, then 'when', then what suddenly happened: the phone r_ _ _.",D0);
C("E06-015","SC-TIME",2,["Ken washed the dishes.","His sister dried them."],"while",false,"Ken washed the dishes while his sister dried them.",
  [["Ken washed the dishes while His sister dried them.","cap"],["Ken washed the dishes while his sister dries them.","tense"],["Ken washed the dishes, his sister dried them.","word"]],
  "'While' means both things happened at the same time. Keep both verbs in the past.","Keep both doing words in the past: washed ... d_ _ _ _.",D0);
B("E06-016","SC-TIME",3,["We waited at the bus stop.","The bus came."],"until",false,"We waited at the bus stop until the bus came.",[["comes","tense"],["before","word"]],
  "'Until' means up to the time something happened: we kept waiting, and then the bus came.","Start with what we did, then 'until', then what happened at last: the bus c_ _ _.",D0);
C("E06-017","SC-TIME",3,["The bell rang.","The pupils lined up at once."],"as soon as",false,"The pupils lined up as soon as the bell rang.",
  [["The bell rang as soon as the pupils lined up.","order"],["The pupils lined up at once as soon as the bell rang.","extra"],["The pupils lined up as soon as the bell rings.","tense"]],
  "'As soon as' already means 'at once', so we drop 'at once'. The bell rang first.","'As soon as' already means at o_ _ _, so leave that part out. Put the joining words before what happened first.",{drop:["at","once"],add:[]});
B("E06-018","SC-TIME",2,["Wash your hands.","Eat your lunch."],"before",false,"Wash your hands before you eat your lunch.",[["after","word"],["Eat","cap"]],
  "Washing comes first, so 'before' goes in front of eating. We add 'you' to make it sound right.","Start with what to do first. After 'before', add the word y_ _, then the next job.",{drop:[],add:["you"]});
C("E06-019","SC-THOUGH",2,["The test was hard.","Wei Ming passed it."],"although",false,"Wei Ming passed the test although it was hard.",
  [["Although the test was hard, but Wei Ming passed it.","but"],["Wei Ming passed the test although it is hard.","tense"],["The test was hard although Wei Ming passed it.","meaning"]],
  "Passing is the surprise even though the test was hard. 'Although' goes before the hard part, and there is no 'but'.","Start with what Wei Ming did. After 'although', say what the test was like: h_ _ _.",D0);
B("E06-020","SC-THOUGH",2,["It was very late.","The children were not sleepy."],"although",false,"The children were not sleepy although it was very late.",[["but","but"],["is","tense"]],
  "Not being sleepy is the surprise. 'Although' goes before 'it was very late', and we never add 'but'.","Start with how the children felt, then 'although', then the time: very l_ _ _.",D0);
C("E06-021","SC-THOUGH",3,["Jun Hao was tired.","He finished his homework."],"although",false,"Jun Hao finished his homework although he was tired.",
  [["Although Jun Hao was tired, but he finished his homework.","but"],["Jun Hao was tired although he finished his homework.","meaning"],["Jun Hao finished his homework although he is tired.","tense"]],
  "Finishing the homework is the surprise. Being tired goes after 'although'.","Start with what Jun Hao did. After 'although', say how he felt: t_ _ _ _.",D0);
B("E06-022","SC-THOUGH",3,["The durian smelled strong.","Aunty Mei loved it."],"although",false,"Aunty Mei loved the durian although it smelled strong.",[["but","but"],["The","cap"]],
  "Loving it is the surprise. The strong smell goes after 'although', and 'it' now means the durian.","Start with Aunty Mei. After 'although', say how it smelled: s_ _ _ _ _.",D0);
B("E06-023","SC-REL",1,["I have a cat.","The cat is black."],"which",false,"I have a cat which is black.",[["who","whowhich"],["it","extra"]],
  "A cat is an animal, so we use 'which'. 'Which' takes the place of 'the cat'.","Start with 'I have a cat', then 'which', then its colour: b_ _ _ _.",{drop:["the","cat"],add:[]});
C("E06-024","SC-REL",2,["The boy won a prize.","He is my cousin."],"who",false,"The boy who won a prize is my cousin.",
  [["The boy which won a prize is my cousin.","whowhich"],["The boy who won a prize he is my cousin.","extra"],["The boy who won a prize is my cousin","stop"]],
  "A boy is a person, so we use 'who'. 'Who' takes the place of 'he', so we don't say 'he' again.","Put 'who' right after 'The boy'. Don't say h_ again.",{drop:["he"],add:[]});
B("E06-025","SC-REL",2,["I met a lady.","She sells flowers at the market."],"who",false,"I met a lady who sells flowers at the market.",[["which","whowhich"],["she","extra"]],
  "A lady is a person, so we use 'who'. 'Who' takes the place of 'she'.","Put 'who' right after 'a lady'. Don't say s_ _ again.",{drop:["she"],add:[]});
C("E06-026","SC-REL",2,["We visited the museum.","It has a dinosaur skeleton."],"which",false,"We visited the museum which has a dinosaur skeleton.",
  [["We visited the museum who has a dinosaur skeleton.","whowhich"],["We visited the museum which it has a dinosaur skeleton.","extra"],["We visited the museum. Which has a dinosaur skeleton.","two"]],
  "A museum is a place, not a person, so we use 'which'. 'Which' takes the place of 'it'.","Put 'which' right after 'the museum'. Don't say i_ again.",{drop:["it"],add:[]});
B("E06-027","SC-REL",3,["The cake was delicious.","Grandma baked it."],"which",false,"The cake which Grandma baked was delicious.",[["it","extra"],["who","whowhich"]],
  "'Which Grandma baked' tells us which cake, so it goes right after 'The cake'. 'Which' takes the place of 'it'.","'Which' goes right after the thing it tells us about. Then say who baked it, then how it t_ _ _ _ _.",{drop:["it"],add:[]});
C("E06-028","SC-REL",3,["The girl is my neighbour.","She is wearing a red dress."],"who",false,"The girl who is wearing a red dress is my neighbour.",
  [["The girl which is wearing a red dress is my neighbour.","whowhich"],["The girl who is wearing a red dress she is my neighbour.","extra"],["The girl who is wearing a red dress is my neighbour","stop"]],
  "'Who is wearing a red dress' tells us which girl, so it goes right after 'The girl'.","'Who' goes right after the person it tells us about. Then what she is wearing, then who she is: my n_ _ _ _ _ _ _ _.",{drop:["she"],add:[]});
B("E06-029","SC-PAIR",2,["Ali likes football.","Sam likes football too."],"both ... and",false,"Both Ali and Sam like football.",[["likes","tense"],["or","pair"]],
  "'Both Ali and Sam' is two people, so the doing word is 'like', not 'likes'. We drop 'too'.","Put 'both' before the first boy's name. Two people, so the doing word has no -s: l_ _ _.",{drop:["likes","likes","football","too"],add:["like"]});
C("E06-030","SC-PAIR",2,["We can have chicken rice for lunch.","We can have noodles for lunch."],"either ... or",false,"We can have either chicken rice or noodles for lunch.",
  [["We can have either chicken rice and noodles for lunch.","pair"],["We can have either chicken rice or noodles for lunch","stop"],["We can have either chicken rice or noodles. For lunch.","two"]],
  "'Either ... or' gives a choice of two. Say 'We can have' and 'for lunch' only once.","Put 'either' before the first food and its partner word before the second food: n_ _ _ _ _ _.",{drop:["we","can","have","for","lunch"],add:[]});
B("E06-031","SC-PAIR",3,["Mei did not eat the vegetables.","Her brother did not eat the vegetables either."],"Neither ... nor",true,"Neither Mei nor her brother ate the vegetables.",[["or","pair"],["not","notnot"]],
  "'Neither ... nor' means not one and not the other. It already has the 'not', so we say 'ate'.","Start with 'Neither Mei', then its partner word and the other person. The doing word is the past of eat: a_ _.",{drop:["did","not","eat","did","not","eat","the","vegetables","either"],add:["ate"]});
C("E06-032","SC-PAIR",3,["Tom cannot swim.","Jack cannot swim."],"Neither ... nor",true,"Neither Tom nor Jack can swim.",
  [["Neither Tom nor Jack cannot swim.","notnot"],["Neither Tom or Jack can swim.","pair"],["Neither Tom nor Jack can swims.","tense"]],
  "'Neither' already means 'not', so we say 'can swim', not 'cannot swim'. Neither goes with nor.","'Neither' already has the 'not' in it, so the doing words are c_ _ swim.",{drop:["cannot","cannot","swim"],add:["can"]});
B("E06-033","SC-PAIR",2,["Dad bought apples.","Dad bought pears."],"both ... and",false,"Dad bought both apples and pears.",[["or","pair"],["buys","tense"]],
  "Dad bought two kinds of fruit. Say 'Dad bought' once, then 'both apples and pears'.","Say 'Dad bought' only once, then the pair of joining words around the two fruits: apples ... p_ _ _ _.",{drop:["dad","bought"],add:[]});
C("E06-034","SC-BEGIN",2,["Zara was hungry.","She ate two bowls of rice."],"Because",true,"Because Zara was hungry, she ate two bowls of rice.",
  [["Because Zara was hungry she ate two bowls of rice.","comma"],["Because she ate two bowls of rice, Zara was hungry.","meaning"],["Because Zara was hungry, she ate two bowls of rice","stop"]],
  "The reason comes right after 'Because'. A comma ends the reason part, then comes what Zara did.","Because, then the reason, then a comma, then what she did: she a_ _ ...",D0,null,"orig");
B("E06-035","SC-BEGIN",2,["It was raining.","The match was cancelled."],"As",true,"As it was raining, the match was cancelled.",[["The","cap"],["so","asso"]],
  "'As' here means 'because'. The reason comes first, then a comma, then what happened.","As, then the reason (the rain), then a comma, then what happened to the m_ _ _ _.",D0,null,"orig");
C("E06-036","SC-BEGIN",3,["My brother wanted to get fit.","My brother jogged every morning."],"As",true,"As my brother wanted to get fit, he jogged every morning.",
  [["As my brother wanted to get fit, so he jogged every morning.","asso"],["As my brother jogged every morning, he wanted to get fit.","meaning"],["As my brother wanted to get fit, he jogs every morning.","tense"]],
  "Wanting to get fit is the reason, so it comes after 'As'. We say 'my brother' once, then 'he'.","As, then why he jogged, then a comma, then h_ jogged every morning.",{drop:["my","brother"],add:["he"]},null,"orig");
B("E06-037","SC-BEGIN",3,["The children were playing.","It started to rain."],"While",true,"While the children were playing, it started to rain.",[["The","cap"],["when","word"]],
  "The children were in the middle of playing, so 'While the children were playing' comes first, then a comma.","While, then what the children were doing, then a comma, then what the w_ _ _ _ _ _ did.",D0,null,"orig");
C("E06-038","SC-BEGIN",2,["Ahmad finished his homework.","He watched TV."],"After",true,"After Ahmad finished his homework, he watched TV.",
  [["After he watched TV, Ahmad finished his homework.","order"],["After Ahmad finished his homework he watched TV.","comma"],["After Ahmad finished his homework, he watches TV.","tense"]],
  "The homework came first, so it goes right after 'After'. A comma ends that part.","After, then what came first (the homework), then a comma, then what came n_ _ _.",D0,null,"orig");
B("E06-039","SC-BEGIN",3,["The road was busy.","Grandma crossed it safely."],"Although",true,"Although the road was busy, Grandma crossed it safely.",[["but","but"],["The","cap"]],
  "The busy road is the hard part, so it comes after 'Although'. Then a comma, and no 'but'.","Although, then what the road was like, then a comma, then what G_ _ _ _ _ _ did.",D0,null,"orig");
C("E06-040","SC-BEGIN",3,["Priya was scared of the dark.","She went into the cave."],"Although",true,"Although Priya was scared of the dark, she went into the cave.",
  [["Although Priya was scared of the dark, but she went into the cave.","but"],["Although Priya was scared of the dark she went into the cave.","comma"],["Although Priya was scared of the dark, she goes into the cave.","tense"]],
  "Going into the cave is the brave surprise. After the 'Although' part comes a comma, and never 'but'.","Although, then how Priya felt, then a comma, then what she did. No extra joining w_ _ _.",D0,null,"orig");
B("E06-041","SC-BEGIN",2,["The lights went out.","We lit some candles."],"When",true,"When the lights went out, we lit some candles.",[["We","cap"],["so","extra"]],
  "First the lights went out, then we lit candles. 'When' starts the first part, and a comma ends it.","When, then what the lights did, then a comma, then what we did: lit some c_ _ _ _ _ _ _.",D0,null,"orig");
C("E06-042","SC-BEGIN",3,["We bought our tickets.","We went into the cinema."],"Before",true,"Before we went into the cinema, we bought our tickets.",
  [["Before we bought our tickets, we went into the cinema.","order"],["Before we went into the cinema we bought our tickets.","comma"],["before we went into the cinema, we bought our tickets.","cap"]],
  "Buying tickets came first. 'Before' goes with the thing that came second: going into the cinema.","Before, then what came second (the cinema), then a comma, then what came f_ _ _ _.",D0,null,"orig");
B("E06-043","SC-BEGIN",2,["Mr Tan was tired.","He went to bed early."],"Because",true,"Because Mr Tan was tired, he went to bed early.",[["so","asso"],["He","cap"]],
  "Being tired is the reason, so it comes right after 'Because'. A comma ends the reason part.","Because, then how Mr Tan felt, then a comma, then what he d_ _.",D0,null,"orig");

window.GAME = {
  slug:"join-it-up", code:"G-E06", key:"eng.join", title:"Join It Up", emoji:"🔗",
  level:"P3", tagLine:"P3 · Sentence Combining · SC-JOIN · SC-REASON · SC-TIME · SC-THOUGH · SC-REL · SC-PAIR · SC-BEGIN",
  intro:"Two short sentences go in. One strong sentence comes out! Use the joining word you are given.",
  tags:["SC-JOIN","SC-REASON","SC-TIME","SC-THOUGH","SC-REL","SC-PAIR","SC-BEGIN"],
  errNudges:ERR,
  rule:{ title:"How to join two sentences",
    rows:[["and, but, or, so","and = add, but = different, or = a choice, so = the result"],
          ["because, as","The REASON comes right after the word."],
          ["when, while, before, after, until, as soon as","Time words: check which happened first."],
          ["although","Never add 'but'. Although ... , ..."],
          ["who, which","who = people, which = animals and things. Drop he/she/it."],
          ["both ... and, either ... or, neither ... nor","They come in pairs. Neither already means not."],
          ["Begin with ...","Because ... , ... : a comma where the first part ends."]],
    tip:"One sentence: a capital letter at the start, one full stop at the end. Keep the same tense. Say a name once, then use he, she, it or they.",
    say:"Here is how to join two sentences. Use the joining word you are given. And adds, but shows something different, or gives a choice, and so gives the result. After because or as comes the reason. With time words, check which happened first. Although never goes with but. Use who for people, and which for animals and things. Some joining words come in pairs, like both and, either or, neither nor. If you must begin with the word, put a comma where the first part ends. Your answer is one sentence, with one full stop, in the same tense." },
  worked:{ stem:"Kai missed the bus. He woke up late. (because)", options:[],
    steps:[
      {text:"Step 1: Find the reason. Why did Kai miss the bus? He woke up late. That is the reason.", mark:"woke up late.", say:"Step 1. Find the reason. Why did Kai miss the bus? He woke up late. That is the reason."},
      {text:"Step 2: 'Because' goes right before the reason: ... because he woke up late.", say:"Step 2. Because goes right before the reason."},
      {text:"Step 3: Put it together: Kai missed the bus because he woke up late.", say:"Step 3. Put it together. Kai missed the bus because he woke up late."},
      {text:"Step 4: Check: one sentence, a capital letter at the start, one full stop, same tense (missed, woke).", say:"Step 4. Check. One sentence, a capital letter at the start, one full stop at the end, and the same tense."}
    ]},
  items:I,
  lesson:["E06-007","E06-012","E06-024","E06-020","E06-040"],
  paper:{ title:"Paper step: Sentence Combining (exam format)",
    instructions:["Get a pencil and paper. Write the numbers 1 and 2.","Join each pair into ONE sentence, using the word given. Keep the meaning the same.","If it says 'Begin with', your sentence must start with that word.","Check: a capital letter at the start, one full stop at the end."],
    questions:["The puppy was hungry. It barked at its empty bowl. (because)","The sea was rough. The fishermen went out to sea. (Begin with: Although)"],
    typed:true,
    models:["The puppy barked at its empty bowl because it was hungry.","Although the sea was rough, the fishermen went out to sea."],
    qchecks:[["Used 'because', with the reason (hungry) after it","One sentence: capital letter, full stop, past tense (barked, was)","Said 'the puppy' once, then 'it'"],
             ["Begins with 'Although', with a comma after 'rough'","No 'but' added","One sentence, same meaning, past tense (was, went)"]],
    answers:["(1) The puppy barked at its empty bowl because it was hungry.  [2 marks]","(2) Although the sea was rough, the fishermen went out to sea.  [2 marks]",
             "Marking: each is worth 2 marks in the exam. Give full marks only if it is one sentence, uses the given word in the right place, keeps the meaning and tense, and has correct spelling, capitals and punctuation. Schools set their own mark scheme, so treat any slip as 'not yet'."],
    checklist:["Used the given word, in the right place","Wrote ONE sentence: a capital at the start, a full stop at the end","(1) The reason comes after 'because'","(2) Begins with 'Although', has a comma, and no 'but'","Kept the same tense (was, barked, went)","Both correct (grown-up marks: 2 marks each)"] }
};
})();
