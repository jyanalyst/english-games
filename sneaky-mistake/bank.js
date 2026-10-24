(function(){
var I = [];
var NUDGE = {
  "ED-SPELL":"Say the underlined word slowly in chunks. Which letters look wrong?",
  "ED-GRAM":"Read the sentence aloud in your head. Look for the time clue, and check: one or many?",
  "ED-PUNC":"Read the sentence. What kind of mark is missing at the circle: an end mark, a comma, or an apostrophe?"
};
function E(id, tag, diff, text, accept, why, meta, src, hint, nudge){
  I.push({id:id, kind:"edit", tag:tag, diff:diff, text:text, accept:[].concat(accept), why:why, nudge:nudge||NUDGE[tag], hint:hint, src:src, meta:meta});
}
E("E04-001","ED-SPELL",1,"My mother [[beleives]] that I can do it.","believes","Remember: i before e. Be-lieves.",{},"orig","Chunk it: be - l_ _ves. Which comes first, i or e?");
E("E04-002","ED-SPELL",1,"We saw a big [[elefant]] at the zoo.","elephant","The 'f' sound in this word is spelled 'ph': el-e-phant.",{},"orig","The 'f' sound here is written with two letters: _h.");
E("E04-003","ED-SPELL",1,"The [[bakary]] sells fresh bread every morning.","bakery","A baker works in a bak-er-y. Keep the 'er' from baker.",{},"orig","Think of the word 'bak_r', then add -y.");
E("E04-004","ED-SPELL",2,"Her new shoes were very [[shinny]].","shiny","Shine drops the e and adds -y: shiny. Only one n.",{},"orig","Start from 'shine'. Drop the e, add -y. How many n's? O_e.");
E("E04-005","ED-SPELL",2,"It was a [[beautifull]] sunny day.","beautiful","The ending -ful has only one l: beau-ti-ful.",{},"orig","The ending -f_l has only o_e l.");
E("E04-006","ED-SPELL",2,"Please walk [[carefuly]] on the wet floor.","carefully","Care + ful + ly: careful already has one l, then -ly adds another: care-ful-ly.",{},"orig","care + f_l + _y. Count the l's: t_o.");
E("E04-007","ED-SPELL",2,"My best [[freind]] lives next door.","friend","Fri-end: the i comes before the e. 'A friend to the end.'",{},"orig","Remember 'a fri_ _d to the END'. The word ends with e-n-d.");
E("E04-008","ED-SPELL",2,"We had a picnic on [[Wensday]].","Wednesday","Wed-nes-day has a silent d: Wed + nes + day.",{},"orig","Say it in three chunks: W_d - nes - day. There is a silent letter.");
E("E04-009","ED-SPELL",2,"The [[animels]] at the farm were hungry.","animals","An-i-mals: the last chunk is -mals.",{},"orig","an - i - m_ls. Which vowel comes after m?");
E("E04-010","ED-SPELL",3,"She was [[suprised]] to see the birthday cake.","surprised","Sur-prised: there is an r in the first chunk too.",{},"orig","First chunk: su_. Say it slowly: 'SUR-prised'.");
E("E04-011","ED-SPELL",3,"He could not [[beleave]] his eyes.","believe","Be-lieve: i before e, and it ends in -ieve.",{},"orig","Chunk it: be - l_ _ve. It is like 'believes' without the s.");
E("E04-012","ED-SPELL",3,"We stood in a [[strait]] line.","straight","A line with no bends is straight: s-t-r-a-i-g-h-t.",{},"orig","It has the silent letters 'gh': strai_ _t.");
E("E04-013","ED-SPELL",2,"The cat [[climed]] onto the roof.","climbed","Climb has a silent b: climb, climbed.",{},"orig","There is a silent letter after the m: cli_ _ed.");
E("E04-014","ED-SPELL",3,"The [[libary]] is closed on Mondays.","library","Li-brar-y: there are two r's.",{},"orig","Say it slowly: li - BR_R - y. Count the r's.");
E("E04-015","ED-SPELL",2,"I [[recieved]] a letter from Grandma.","received","After c, the e comes before the i: re-ceived.",{},"orig","Rule: i before e, except after c. So: rec_ _ved.");
E("E04-016","ED-SPELL",3,"She ate her dinner [[quikly]].","quickly","Quick has 'ck': quick + ly.",{},"orig","Start from 'qui_ _' (two letters make the k sound), then add -ly.");
E("E04-017","ED-SPELL",1,"We went to the [[beech]] to build sandcastles.","beach","Sand and sea: beach (b-e-a-ch). A beech is a tree.",{},"orig","Sandcastles are built at the b_ _ch. The middle letters are e and a.");
E("E04-018","ED-GRAM",1,"Every day, my brother [[walk]] to school.","walks","'Every day' is a habit, and my brother is one person, so: walks.",{verb:"walk",form:"pres",subj:"3s"},"orig","Time clue: e_ _ _ _ day. One person + habit: add -_.");
E("E04-019","ED-GRAM",1,"Yesterday, we [[go]] to the zoo.","went","'Yesterday' means past. Go is a tricky verb: its past is went.",{verb:"go",form:"past",subj:"pl"},"orig","Time clue: y_ _ _ _ _ _ _ _. The past of go is a tricky word that starts with w.");
E("E04-020","ED-GRAM",2,"She likes to [[plays]] with her dog.","play","After 'to', the verb stays plain: to play.",{verb:"play",form:"base",subj:"3s"},"orig","After 'to', take away the -_.");
E("E04-021","ED-GRAM",2,"The children [[is]] playing in the field.","are","Children are many, so: are.",{verb:"be",form:"pres",subj:"pl"},"orig","Children = m_ _ _. Many people take a different helper word.");
E("E04-022","ED-GRAM",2,"Last night, Mum [[cook]] a delicious dinner.","cooked","'Last night' means past: cooked.",{verb:"cook",form:"past",subj:"3s"},"orig","Time clue: l_ _ _ night. Add -_ _.");
E("E04-023","ED-GRAM",2,"There are three [[box]] on the table.","boxes","Three means more than one. Box ends in x, so add -es: boxes.",{noun:"box",plural:true},"orig","Three = more than one. Words ending in x add -_ _.");
E("E04-024","ED-GRAM",2,"My sister and I [[was]] late for school.","were","My sister and I are two people, and it is past: were.",{verb:"be",form:"past",subj:"pl"},"orig","My sister + I = t_ _ people, in the past. Which past helper word is for many?");
E("E04-025","ED-GRAM",2,"He enjoys [[swim]] in the pool.","swimming","After 'enjoys', the verb ends in -ing. Swim doubles the m: swimming.",{verb:"swim",form:"ing",subj:"3s"},"orig","After enjoys, add -_ _ _. Short words like swim double the last letter.");
E("E04-026","ED-GRAM",3,"The boy's room [[are]] very messy.","is","The subject is 'the room' (one room), so: is.",{verb:"be",form:"pres",subj:"3s"},"orig","What looks messy: the boy, or his r_ _ _? One thing takes a different helper word.");
E("E04-027","ED-GRAM",3,"I have [[eat]] my lunch already.","eaten","After 'have', we use the 'done' form: eaten.",{verb:"eat",form:"pp",subj:"1s"},"orig","After 'have', use the 'done' form: eat, ate, e_ _ _ _.");
E("E04-028","ED-GRAM",2,"Two [[child]] were waiting at the bus stop.","children","Child is tricky: one child, two children.",{noun:"child",plural:true},"orig","One child, two ch_ _ _ _ _ _.");
E("E04-029","ED-GRAM",3,"Each of the girls [[have]] a red ribbon.","has","'Each' means one at a time, so: has.",{verb:"have",form:"pres",subj:"3s"},"orig","'Each' means o_ _ at a time. Use the word for one person.");
E("E04-030","ED-GRAM",2,"Tomorrow, we [[visited]] our grandparents.","will visit","'Tomorrow' has not happened yet: will visit.",{verb:"visit",form:"future",subj:"pl"},"orig","Time clue: t_ _ _ _ _ _ _. Write two words: w_ _ _ + visit.");
E("E04-031","ED-GRAM",3,"She [[were]] reading a book when the phone rang.","was","She is one person, in the past: was.",{verb:"be",form:"past",subj:"3s"},"orig","She = o_ _ person, in the past. Which past helper word is for one?");
E("E04-032","ED-GRAM",1,"I saw three [[mouses]] in the barn.","mice","Mouse is tricky: one mouse, two mice.",{noun:"mouse",plural:true},"orig","One mouse, many m_ _ _.");
E("E04-033","ED-GRAM",3,"The puppies [[has]] eaten all their food.","have","Puppies are many, so: have.",{verb:"have",form:"pres",subj:"pl"},"orig","Puppies = m_ _ _. Many take the helper word without -s.");
E("E04-034","ED-GRAM",2,"He [[don't]] like vegetables.","doesn't","He is one person, so: doesn't.",{verb:"do",form:"pres",subj:"3s",neg:true},"orig","He = one person. Do becomes d_ _ _ for one person, then add n't.");
E("E04-035","ED-PUNC",1,"Where are you going{{}}","?","It asks something, so it ends with a question mark.",{rule:"question-end"},"orig","The sentence starts with 'W_ _ _ _'. Asking sentences end with a q_ _ _ _ _ _ _ mark.");
E("E04-036","ED-PUNC",1,"We bought apples{{}} pears and grapes.",",","In a list, we put a comma between the things, but not before 'and'.",{rule:"list"},"orig","This is a l_ _ _ of fruits. What goes between the things in a list?");
E("E04-037","ED-PUNC",1,"My dog is called Max{{}}",".","It is a telling sentence, so it ends with a full stop.",{rule:"statement-end"},"orig","It tells us something. Telling sentences end with a f_ _ _ stop.");
E("E04-038","ED-PUNC",2,"What a beautiful rainbow{{}}","!","'What a ...' shows strong feeling, so it ends with an exclamation mark.",{rule:"exclaim"},"orig","'What a ...' shows a big feeling. It ends with an e_ _ _ _ _ _ _ _ _ _ _ mark.");
E("E04-039","ED-PUNC",2,"Mum asked, {{}}Have you finished your homework?\"","\"","Spoken words start and end with speech marks. The opening one is missing.",{rule:"open-quote"},"orig","Mum's spoken words need s_ _ _ _ _ marks at the start AND the end.");
E("E04-040","ED-PUNC",2,"I can{{}}t find my shoes.","'","Can't is short for 'can not'. An apostrophe shows the missing letters.",{rule:"contraction"},"orig","Can't is short for 'can n_t'. A mark shows where letters are missing: an a_ _ _ _ _ _ _ _ _.");
E("E04-041","ED-PUNC",2,"Ravi{{}}s bag is blue.","'","The bag belongs to Ravi, so we write Ravi's with an apostrophe.",{rule:"possessive"},"orig","The bag b_ _ _ _ _ _ to Ravi. Which mark shows belonging?");
E("E04-042","ED-PUNC",2,"We need eggs, flour{{}} sugar and milk.",",","In a list, a comma goes between each thing, except before 'and'.",{rule:"list"},"orig","This is a l_ _ _. Look at what is between eggs and flour.");
E("E04-043","ED-PUNC",3,"After lunch{{}} we went swimming.",",","'After lunch' comes first, so a comma separates it from the rest.",{rule:"intro-comma"},"orig","The 'when' part comes first. Take a short breath there: a c_ _ _ _.");
E("E04-044","ED-PUNC",3,"\"How old are you{{}}\" asked the man.","?","The man's words are a question, so a question mark goes inside the speech marks.",{rule:"quote-question"},"orig","The man is a_ _ _ _ _ something. The mark goes inside the speech marks.");
E("E04-045","ED-PUNC",3,"Did you see the fireworks last night{{}}","?","It starts with 'Did' and asks something, so it ends with a question mark.",{rule:"question-end"},"orig","It starts with 'D_ _'. Asking sentences end with a q_ _ _ _ _ _ _ mark.");
E("E04-046","ED-PUNC",2,"Sam, Kai{{}} Ben and I played football.",",","In a list of names, a comma goes between each name, except before 'and'.",{rule:"list"},"orig","A l_ _ _ of names. Look at what is between Sam and Kai.");
E("E04-047","ED-PUNC",3,"The dog wagged its tail{{}} It was happy to see us.",".","'It' starts a new sentence (capital I), so the first sentence needs a full stop.",{rule:"sentence-break"},"orig","Look at the next word: it starts with a c_ _ _ _ _ _ letter. So one sentence ended here.");
E("E04-048","ED-PUNC",2,"Our teacher{{}}s name is Mrs Lim.","'","The name belongs to our teacher: teacher's.",{rule:"possessive"},"orig","The name b_ _ _ _ _ _ to our teacher. Which mark shows belonging?");
function D(id, word, chunks, sentence, hint){
  I.push({id:id, kind:"dictate", tag:"ED-SPELL", diff:1, practice:false, word:word, chunks:chunks, sentence:sentence, accept:[word],
    why:"Well spelled! Chunks: "+chunks+".", nudge:"Say it slowly in chunks, then write each chunk.", hint:hint, src:"orig"});
}
D("E04-D1","believes","be-lieves","She believes she can win.","It has two chunks. It starts with b_ and ends with -_ _ _ _ _s. Remember i before e.");
D("E04-D2","beautiful","beau-ti-ful","What a beautiful garden.","Three chunks: b_ _ _ - t_ - f_l. The ending has one l.");
D("E04-D3","carefully","care-ful-ly","Carry the eggs carefully.","Three chunks: c_ _ _ - f_l - _y. Two l's in total.");

var editPassage = { id:"E04-EP", title:"Editing: A Trip to the Zoo", src:"orig",
  text:"Last Saturday, Mia and her [[freinds|1]] went to the zoo. They saw monkeys{{2}} zebras and lions. Mia [[like|3]] the penguins best of all. \"Can we come again next week{{4}}\" she asked.",
  errors:[
    {n:1,id:"E04-EP-1",tag:"ED-SPELL",diff:2,accept:["friends"],why:"Fri-ends: i before e, like 'a friend to the end'.",nudge:"Say it in chunks. Which letters are swapped?",hint:"Remember 'a fri_ _d to the END', then add -s.",meta:{}},
    {n:2,id:"E04-EP-2",tag:"ED-PUNC",diff:2,accept:[","],why:"A comma goes between things in a list.",nudge:"This is a list of animals. What goes between them?",hint:"Between things in a l_ _ _ we put a c_ _ _ _.",meta:{rule:"list"}},
    {n:3,id:"E04-EP-3",tag:"ED-GRAM",diff:2,accept:["liked"],why:"The trip was last Saturday, so the verb is past: liked.",nudge:"Find the time clue at the start of the passage.",hint:"Time clue: L_ _ _ Saturday. Add -_.",meta:{verb:"like",form:"past",subj:"3s"}},
    {n:4,id:"E04-EP-4",tag:"ED-PUNC",diff:3,accept:["?"],why:"Mia is asking something, so a question mark goes inside the speech marks.",nudge:"Is Mia telling or asking?",hint:"'Can we ...' is a_ _ _ _ _. The mark goes inside the speech marks.",meta:{rule:"quote-question"}}
  ]};

window.GAME = {
  slug:"sneaky-mistake", code:"G-E04", key:"eng.edit", title:"Spot the Sneaky Mistake", emoji:"🔍",
  level:"P3", tagLine:"P3 · Editing · ED-SPELL · ED-GRAM · ED-PUNC",
  intro:"Some sneaky mistakes are hiding! Fix the underlined word, or add the missing mark at the circle.",
  tags:["ED-SPELL","ED-GRAM","ED-PUNC"],
  warmup:["E04-D1","E04-D2","E04-D3"],
  rule:{ title:"How to catch a sneaky mistake",
    rows:[["Underlined word, spelled wrong","Say it in chunks: be-lieves, care-ful-ly. Write the correct spelling in the box."],
          ["Underlined word, wrong grammar","Check the time clue (yesterday → went) and one or many (children → are)."],
          ["A circle ◯","A mark is missing: . ? ! , ' or speech marks. Write just the mark in the box."]],
    tip:"Read the sentence aloud in your head. Does it sound right?",
    say:"Here is how to catch a sneaky mistake. If the underlined word is spelled wrong, say it in chunks and write the correct spelling in the box. If the grammar is wrong, check the time clue and check one or many. If you see a circle, a punctuation mark is missing, like a full stop, a question mark, a comma or an apostrophe. Write just the mark in the box. Always read the sentence aloud in your head." },
  worked:{ stem:"Yesterday, Tom [[play]] football with his friends.", options:[],
    steps:[
      {text:"Step 1: Look at the underlined word: play. Is it spelled right? Yes. So check the grammar.", say:"Step 1. Look at the underlined word: play. It is spelled correctly, so check the grammar."},
      {text:"Step 2: Find the time clue: 'Yesterday'. It already happened, so we need the past.", mark:"Yesterday,", say:"Step 2. Find the time clue: yesterday. It already happened, so we need the past."},
      {text:"Step 3: Write the correction in the box: played.", say:"Step 3. Write the correction in the box: played."}
    ]},
  items:I, editPassage:editPassage,
  lesson:["E04-001","E04-036","E04-021","E04-040","E04-026"],
  paper:{ title:"Paper step: Editing (exam format)",
    instructions:["Get a pencil and paper. Copy the numbers 1 to 4, each with a box.","Each underlined word is wrong. Write the correct word in the box.","Each circle ◯ needs a punctuation mark. Write the mark in the box.","Read each sentence aloud in your head when you finish."],
    marked:true,
    text:"Every morning, Ben [[feed|1]] his goldfish. He [[have|2]] three of them in a big tank{{3}} They are orange, white and black. His favourite one is called Bubbles{{4}}",
    answers:["(1) feeds","(2) has","(3) .  (full stop: 'They' starts a new sentence)","(4) ."],
    checklist:["Wrote one correction in each box","Spelled each word correctly","Used just a mark for the circles","Read each sentence again","All 4 correct (grown-up marks)"] }
};
})();
