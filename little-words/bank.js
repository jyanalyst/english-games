(function(){
var I = [];
var NUDGE = {
  "GR-PREP":"Picture it! Trace the path with your finger. Where does it go?",
  "GR-CONN":"How are the two parts joined: a surprise, a reason, a result, or a time?",
  "GR-QUANT":"Can you count it one by one? Is there a lot or not enough?",
  "GR-DEM":"One thing or many? Near you, or far away?",
  "GR-TAG":"Look at the helper word in the sentence. Then flip it.",
  "GR-PRON":"Who does it belong to? Is a noun written after the blank?"
};
function M(id, tag, diff, stem, opts, ans, why, meta, src, nudge, hint){
  I.push({id:id, kind:"mcq", tag:tag, diff:diff, stem:stem, options:opts, answer:ans, why:why, nudge:nudge||NUDGE[tag], hint:hint, src:src, meta:meta});
}
M("E02-001","GR-PREP",1,"The cat jumped ___ the fence and ran away.",["over","under","into","inside"],0,"To get to the other side of a fence, the cat goes over the top of it.",{sense:"above-across"},"orig",null,"The cat went from one side to the other, above the fence, past its t_ _.");
M("E02-002","GR-PREP",2,"We walked ___ the side of the river, enjoying the breeze.",["into","along","under","between"],1,"We followed the side of the long river, so we walked along it.",{sense:"beside-long"},"orig",null,"A river is long. We followed its side from one part to the next, like walking down a l_ _ _ line.");
M("E02-003","GR-PREP",2,"The train went ___ a long, dark tunnel.",["through","over","onto","between"],0,"The train went in one end of the tunnel and out the other end: through.",{sense:"in-and-out"},"orig",null,"It goes in one e_ _ and comes out the o_ _ _ _ end.");
M("E02-004","GR-PREP",3,"The waves crashed ___ the rocks all night.",["against","above","inside","up"],0,"The waves hit the hard rocks again and again, so they crashed against them.",{sense:"hit-surface"},"orig",null,"The water h_ _ the rocks again and again.");
M("E02-005","GR-PREP",1,"The ball rolled ___ the table, so I crawled down to get it.",["under","over","onto","across"],0,"I had to crawl down to get it, so the ball was below the table: under.",{sense:"below"},"orig",null,"I crawled d_ _ _ to get it, so the ball was b_ _ _ _ the table.");
M("E02-006","GR-PREP",2,"Mei sat ___ her two best friends at the concert.",["between","among","inside","across"],0,"With one friend on each side, Mei was in the middle of two people: between.",{sense:"middle-two"},"orig",null,"Count the friends: t_ _. One on the left, one on the right.");
M("E02-007","GR-PREP",3,"The little monkey hid ___ the many tall trees in the forest.",["between","among","onto","through"],1,"There are many trees around the monkey, so it hid among them. (Between is for two.)",{sense:"middle-many"},"orig",null,"Count the trees: m_ _ _, not two.");
M("E02-008","GR-PREP",1,"Dad dived ___ the swimming pool with a big splash.",["into","under","between","across"],0,"Dad went from outside the water to inside it: into.",{sense:"outside-to-inside"},"orig",null,"He went from o_ _ _ _ _ _ the water to i_ _ _ _ _ it.");
M("E02-009","GR-PREP",2,"The children ran ___ the field to the gate on the other side.",["across","along","into","under"],0,"'To the other side' tells us they went from one side to the other: across.",{sense:"side-to-side"},"orig",null,"Find the clue words 'to the o_ _ _ _ side'.");
M("E02-010","GR-PREP",2,"The kitten climbed ___ the tree and could not get down.",["up","down","off","out"],0,"It could not get down, so it had climbed from low to high: up.",{sense:"low-to-high"},"orig",null,"It could not get d_ _ _, so it went from low to h_ _ _.");
M("E02-011","GR-PREP",2,"A bird flew ___ the open window and into the house.",["through","across","along","over"],0,"The bird went in by the window space and out the other side, into the house: through.",{sense:"in-and-out"},"orig",null,"The window is o_ _ _. The bird passed in one side and out the o_ _ _ _.");
M("E02-012","GR-PREP",3,"Ken put the keys ___ his pocket and zipped it up.",["inside","onto","across","along"],0,"The keys went in the pocket, and then he zipped it shut: inside.",{sense:"in-container"},"orig",null,"He zipped the pocket shut, so the keys are in the m_ _ _ _ _ of it.");
M("E02-013","GR-PREP",1,"The boy hid ___ the door so that nobody could see him.",["behind","across","through","along"],0,"Nobody could see him, so he was at the back of the door: behind.",{sense:"at-back"},"orig",null,"Nobody could see him, so he was at the b_ _ _ of the door.");
M("E02-014","GR-PREP",2,"The duck swam ___ the pond to reach its ducklings on the other side.",["across","along","onto","among"],0,"'On the other side' tells us it went from one side of the pond to the other: across.",{sense:"side-to-side"},"orig",null,"Find the clue words 'on the o_ _ _ _ side'.");
M("E02-015","GR-PREP",2,"The tired dog lay ___ its back with its legs in the air.",["on","at","to","off"],0,"When your back touches the floor, we say you lie on your back.",{sense:"touching-surface"},"orig","Which little word do we use when your back is touching the floor?","We say: 'lie o_ your back'.");
M("E02-016","GR-CONN",1,"I wanted to play outside, ___ it was raining.",["but","so","because","and"],0,"The second part is a surprise that stops the first part, so we use but.",{rel:"contrast"},"orig",null,"Wanting to play and rain do not go together. Use the word for a s_ _ _ _ _ _ _.");
M("E02-017","GR-CONN",1,"Sam was hungry, ___ he ate a sandwich.",["so","but","because","until"],0,"Being hungry made him eat. The second part is the result, so we use so.",{rel:"result"},"orig",null,"Hungry → ate. The second part is what h_ _ _ _ _ _ _ next, the result.");
M("E02-018","GR-CONN",2,"We stayed indoors ___ it was very hot outside.",["because","so","but","or"],0,"'It was very hot' is the reason we stayed in, so we use because.",{rel:"reason"},"orig",null,"Ask 'why did we stay in?' The answer is the r_ _ _ _ _.");
M("E02-019","GR-CONN",2,"Brush your teeth ___ you go to bed.",["before","after","until","but"],0,"Teeth come first, then bed, so we use before.",{rel:"time-first"},"orig",null,"Which comes f_ _ _ _: teeth or bed?");
M("E02-020","GR-CONN",2,"We can only go out to play ___ we have finished our homework.",["after","before","because","but"],0,"Homework is finished first, and play comes next, so we use after.",{rel:"time-next"},"orig",null,"'Have finished' means the homework is done f_ _ _ _. Play comes n_ _ _.");
M("E02-021","GR-CONN",2,"Please wait here ___ the bus comes.",["until","because","so","but"],0,"You keep waiting up to the moment the bus comes, so we use until.",{rel:"up-to-time"},"orig",null,"You keep waiting up to the m_ _ _ _ _ the bus comes.");
M("E02-022","GR-CONN",3,"___ the bell rang, everyone ran out of the classroom.",["When","But","So","Or"],0,"The bell rang, and at that time everyone ran out, so we use When.",{rel:"at-time"},"orig",null,"It tells us at what t_ _ _ everyone ran out.");
M("E02-023","GR-CONN",3,"Would you like apple juice ___ orange juice?",["or","but","so","because"],0,"You can choose one of the two, so we use or.",{rel:"choice"},"orig","Look at the end: there are two drinks. What do you do with two drinks you can pick from?","You pick o_ _ of the two drinks.");
M("E02-024","GR-CONN",1,"Mum bought rice, eggs ___ milk.",["and","but","so","or"],0,"We are adding one more thing to the list, so we use and.",{rel:"add"},"orig",null,"She bought all three things. We a_ _ the last one to the list.");
M("E02-025","GR-QUANT",2,"There is very ___ milk left, so please buy more.",["few","little","many","much"],1,"Milk cannot be counted one by one, and there is not enough, so: little.",{count:false,size:"small"},"orig",null,"Can you count milk: one milk, two milks? No. And there is not e_ _ _ _ _.");
M("E02-026","GR-QUANT",2,"Very ___ children came to school during the storm.",["few","little","much","more"],0,"Children can be counted, and only a small number came, so: few.",{count:true,size:"small"},"orig",null,"You can count children: one, two, three. And only a s_ _ _ _ number came.");
M("E02-027","GR-QUANT",2,"How ___ sugar do you want in your tea?",["much","many","few","lots"],0,"Sugar cannot be counted one by one, so we ask 'how much'.",{count:false,size:"ask"},"orig",null,"Can you count sugar one by one? No. For things we cannot count, we ask 'how m_ _ _'.");
M("E02-028","GR-QUANT",1,"How ___ apples are in the basket?",["many","much","little","lot"],0,"Apples can be counted, so we ask 'how many'.",{count:true,size:"ask"},"orig",null,"You can count apples: one, two, three. For things we count, we ask 'how m_ _ _'.");
M("E02-029","GR-QUANT",3,"We had ___ time left, so we could answer only one more question.",["little","few","many","much"],0,"Time cannot be counted one by one, and there was not enough, so: little.",{count:false,size:"small"},"orig",null,"Time is not counted like 'one time, two times' here. And there was not e_ _ _ _ _.");
M("E02-030","GR-QUANT",3,"There are only a ___ biscuits left in the tin.",["few","little","much","lot"],0,"Biscuits can be counted, and there are not many left: a few.",{count:true,size:"small"},"orig",null,"You can count biscuits, and 'only' means a s_ _ _ _ number.");
M("E02-031","GR-QUANT",2,"There isn't ___ water left in the bottle.",["much","many","few","a few"],0,"Water cannot be counted one by one, and the sentence says 'isn't', so: much.",{count:false,size:"neg"},"orig",null,"Can you count water? No. With 'isn't' we use the word for a l_ _ of something we cannot count.");
M("E02-032","GR-QUANT",3,"She had a ___ money left after buying the book, just enough for a drink.",["little","few","many","much"],0,"Money (not coins) cannot be counted one by one, and there was a small amount: a little.",{count:false,size:"small"},"orig",null,"'Money' is not counted as 'one money, two moneys'. 'Just enough' means a s_ _ _ _ amount.");
M("E02-033","GR-DEM",1,"Look at ___ bird on the roof far away!",["that","this","these","those"],0,"One bird that is far away: that.",{num:"sg",dist:"far"},"orig",null,"One bird, and it is f_ _ away.");
M("E02-034","GR-DEM",1,"I love ___ shoes that I am wearing now.",["these","those","this","that"],0,"Many shoes (a pair) that are near me, on my feet: these.",{num:"pl",dist:"near"},"orig",null,"Shoes are m_ _ _ (two), and they are on my feet, very n_ _ _.");
M("E02-035","GR-DEM",2,"\"Please pass me ___ books on the far shelf,\" said Miss Tan.",["this","that","these","those"],3,"Many books that are far away: those.",{num:"pl",dist:"far"},"orig",null,"Books are m_ _ _, and the shelf is f_ _.");
M("E02-036","GR-DEM",1,"___ pencil in my hand is blunt.",["This","These","Those","That"],0,"One pencil, near me in my hand: This.",{num:"sg",dist:"near"},"orig",null,"One pencil, and it is in my h_ _ _, very near.");
M("E02-037","GR-DEM",2,"Can you see ___ stars high up in the sky tonight?",["those","these","this","that"],0,"Many stars, very far away: those.",{num:"pl",dist:"far"},"orig",null,"Stars are m_ _ _, and they are very f_ _ away.");
M("E02-038","GR-DEM",2,"___ cookies on my plate here are delicious.",["These","This","That","Those"],0,"Many cookies, near me on my plate: These.",{num:"pl",dist:"near"},"orig",null,"Cookies are m_ _ _, and they are h_ _ _ on my plate.");
M("E02-039","GR-DEM",3,"Who left ___ umbrella over there by the door?",["that","this","these","those"],0,"One umbrella, over there (far): that.",{num:"sg",dist:"far"},"orig",null,"One umbrella, and it is 'over t_ _ _ _'.");
M("E02-040","GR-TAG",2,"You are coming to my party, ___?",["aren't you","isn't you","don't you","are you"],0,"The sentence uses 'are' and is positive, so the tag flips it: aren't you?",{aux:"are",neg:false,pron:"you"},"orig",null,"The helper word is 'a_ _'. A yes-sentence gets a 'not' tag with the same helper word.");
M("E02-041","GR-TAG",2,"Sam can swim very well, ___?",["can't he","can he","doesn't he","isn't he"],0,"The helper word is 'can', so the tag flips it: can't he?",{aux:"can",neg:false,pron:"he"},"orig",null,"The helper word is 'c_ _'. Keep it, add 'not', and use he for Sam.");
M("E02-042","GR-TAG",2,"The puppies are very cute, ___?",["aren't they","isn't it","aren't it","don't they"],0,"Puppies are many (they), and the helper word is 'are': aren't they?",{aux:"are",neg:false,pron:"they"},"orig",null,"Puppies = t_ _ _. The helper word is 'a_ _'. Add 'not'.");
M("E02-043","GR-TAG",3,"We were asked to line up quietly, ___?",["weren't we","wasn't we","didn't we","don't we"],0,"The helper word is 'were', so the tag flips it: weren't we?",{aux:"were",neg:false,pron:"we"},"orig",null,"Look at the helper word at the start: w_ _ _. Keep it and add 'not'.");
M("E02-044","GR-TAG",3,"She doesn't like durians, ___?",["does she","doesn't she","is she","did she"],0,"The sentence already has 'not' (doesn't), so the tag has no 'not': does she?",{aux:"does",neg:true,pron:"she"},"orig",null,"The sentence has 'n't' already. A not-sentence gets a tag w_ _ _ _ _ _ 'not'.");
M("E02-045","GR-TAG",3,"They didn't finish the race, ___?",["did they","didn't they","do they","were they"],0,"'Didn't' already has 'not', so the tag is positive, in the past: did they?",{aux:"did",neg:true,pron:"they"},"orig",null,"The sentence has 'n't' already, so the tag has n_ 'not'. Keep the same helper word in the past.");
M("E02-046","GR-TAG",2,"It is a very hot day, ___?",["isn't it","is it","doesn't it","wasn't it"],0,"The helper word is 'is' and the sentence is positive: isn't it?",{aux:"is",neg:false,pron:"it"},"orig",null,"The helper word is 'i_'. Keep it in the present and add 'not'.");
M("E02-047","GR-TAG",3,"Mr Lim will drive us home, ___?",["won't he","will he","doesn't he","isn't he"],0,"The helper word is 'will'. 'Will not' becomes won't: won't he?",{aux:"will",neg:false,pron:"he"},"orig",null,"The helper word is 'w_ _ _'. Will + not makes a special short word that starts with w_.");
M("E02-048","GR-PRON",1,"\"Is this pencil case yours or ___?\" Sam asked his sister.",["she","her","hers","herself"],2,"'Belonging to her' with no noun after it is hers.",{owner:"she",form:"poss"},"orig",null,"No noun comes after the blank. 'Belonging to her' is like 'yours', but for a g_ _ _.");
M("E02-049","GR-PRON",1,"This bag belongs to Ken. It is ___.",["him","he","his","he's"],2,"'Belonging to him (Ken)' with no noun after it: his.",{owner:"he",form:"poss"},"orig",null,"No noun comes after the blank. 'Belonging to Ken' is the word for a b_ _.");
M("E02-050","GR-PRON",2,"We painted the mural ourselves, so it is ___.",["our","us","we","ours"],3,"'Belonging to us' with no noun after it: ours.",{owner:"we",form:"poss"},"orig",null,"No noun after the blank, and it belongs to 'w_'. The word ends in -s.");
M("E02-051","GR-PRON",2,"The twins said that the red kite was ___.",["their","them","theirs","they"],2,"'Belonging to them' with no noun after it: theirs.",{owner:"they",form:"poss"},"orig",null,"No noun after the blank, and it belongs to the twins (t_ _ _). The word ends in -s.");
M("E02-052","GR-PRON",2,"That is my water bottle. It is ___.",["my","me","I","mine"],3,"'Belonging to me' with no noun after it: mine.",{owner:"I",form:"poss"},"orig",null,"No noun after the blank, and it belongs to m_. This one is a special word: m_ _ _.");
M("E02-053","GR-PRON",1,"Mum gave ___ a big hug before school.",["I","me","mine","my"],1,"Mum did the hugging to me, so we use me.",{owner:"I",form:"obj"},"orig","Who got the hug? Is it 'I' doing it, or getting it?","Mum hugged m_. The person who gets the hug uses this small word.");
M("E02-054","GR-PRON",3,"Lily lost ___ hat at the park yesterday.",["hers","her","she","herself"],1,"A noun (hat) comes right after the blank, so we use her, not hers.",{owner:"she",form:"adj"},"orig",null,"Look: a noun comes right after the blank (h_ _). Then there is no -s at the end.");
M("E02-055","GR-PRON",3,"Is this umbrella ___, Ali? I found it on your chair.",["your","you","yours","yourself"],2,"'Belonging to you' with no noun after it: yours.",{owner:"you",form:"poss"},"orig",null,"No noun after the blank, and it belongs to y_ _. The word ends in -s.");
var cloze = { id:"E02-C1", title:"Pip at the Park", src:"orig",
  box:["along","across","under","up","at","through","into","between","off"],
  parts:["Last Sunday, Ravi took his dog Pip to the park. They walked ", 1, " the long river path. Pip saw a ball on the other side of the path and dashed ", 2,
    " it to grab the ball. Then the ball rolled ", 3, " a bench, so Ravi had to crawl down to reach it. A squirrel ran ", 4,
    " a tall tree, and Pip barked ", 5, " it from the ground. On the way home, they walked ", 6, " a short tunnel and came out near their flat."],
  blanks:[
    {id:"E02-C1-1",tag:"GR-PREP",diff:2,answer:"along",why:"The path is long, and they followed it: along.",nudge:"The path is long. Did they cross it or follow it?",hint:"They followed the l_ _ _ path from one part to the next.",meta:{sense:"beside-long"}},
    {id:"E02-C1-2",tag:"GR-PREP",diff:2,answer:"across",why:"The ball was on the other side, so Pip went from one side to the other: across.",nudge:"Find the clue: where was the ball?",hint:"The ball was on the o_ _ _ _ side of the path.",meta:{sense:"side-to-side"}},
    {id:"E02-C1-3",tag:"GR-PREP",diff:2,answer:"under",why:"Ravi had to crawl down, so the ball was below the bench: under.",nudge:"Why did Ravi have to crawl down?",hint:"Ravi crawled d_ _ _, so the ball was b_ _ _ _ the bench.",meta:{sense:"below"}},
    {id:"E02-C1-4",tag:"GR-PREP",diff:1,answer:"up",why:"A squirrel climbs from low to high on a tree: up.",nudge:"Picture the squirrel on the tree. Which way does it go?",hint:"It goes from low to h_ _ _.",meta:{sense:"low-to-high"}},
    {id:"E02-C1-5",tag:"GR-PREP",diff:3,answer:"at",why:"Pip pointed the barking towards the squirrel: barked at it.",nudge:"Pip is aiming the barking towards something. Which little word shows that?",hint:"We say 'bark a_ something', like 'look a_' or 'shout a_'.",meta:{sense:"towards-target"}},
    {id:"E02-C1-6",tag:"GR-PREP",diff:2,answer:"through",why:"They went in one end of the tunnel and came out the other: through.",nudge:"Look at the end of the sentence: they came out.",hint:"In one e_ _ and out the o_ _ _ _.",meta:{sense:"in-and-out"}}
  ]};

window.GAME = {
  slug:"little-words", code:"G-E02", key:"eng.little", title:"Little Words", emoji:"🧩",
  level:"P3", tagLine:"P3 · Grammar · GR-PREP · GR-CONN · GR-QUANT · GR-DEM · GR-TAG · GR-PRON",
  intro:"Small words, big marks! Picture where things go, join ideas, and pick the right little word.",
  tags:["GR-PREP","GR-CONN","GR-QUANT","GR-DEM","GR-TAG","GR-PRON"],
  rule:{ title:"The secret rules for little words",
    rows:[["over, under, along, across, through, against","Where does it go?","Picture it! Trace the path with your finger."],
          ["but, so, because, before, after, until, when","How are the ideas joined?","but = surprise, so = result, because = reason"],
          ["few, many / little, much","Can you count it?","Count it: few, many. Can't count it (milk, time): little, much."],
          ["this, these / that, those","Near or far? One or many?","Near: this (one), these (many). Far: that, those."],
          ["..., isn't it? / ..., can he?","Question tags","Same helper word, then flip it: yes-sentence gets 'not', not-sentence gets no 'not'."],
          ["mine, yours, his, hers, ours, theirs","Whose is it?","No noun after the blank: mine, hers, ours. A noun after: my, her, our."]],
    tip:"Read the WHOLE sentence first. The clue is often at the end.",
    say:"Here are the secret rules for little words. For prepositions, picture it and trace the path with your finger. For joining words: but means a surprise, so means a result, because gives a reason. If you can count it, use few or many. If you cannot count it, like milk or time, use little or much. This and these are near; that and those are far. For question tags, use the same helper word and flip it. And if no noun comes after the blank, use mine, yours, hers, ours or theirs." },
  worked:{ stem:"The cat ran ___ the road to the other side.", options:["along","across","under","into"], answer:1,
    steps:[
      {text:"Step 1: Read the whole sentence. Underline the clue: 'to the other side'.", mark:"other side", say:"Step 1. Read the whole sentence, and underline the clue: to the other side."},
      {text:"Step 2: Picture it. The cat starts on one side of the road and ends on the other side.", say:"Step 2. Picture it. The cat starts on one side of the road, and ends on the other side."},
      {text:"Step 3: From one side to the other side is across. Not along: along means following the road.", pick:1, say:"Step 3. From one side to the other side is across. Not along. Along means following the road."}
    ]},
  items:I, cloze:cloze,
  lesson:["E02-005","E02-016","E02-025","E02-035","E02-043"],
  paper:{ title:"Paper step: Grammar Cloze (prepositions)",
    instructions:["Get a pencil and paper. Copy the numbers 1, 2 and 3.","Read the whole passage first.","Picture each one: where does it go?","Write the correct word from the box next to each number. Each word is used once only."],
    box:["under","out of","from","along","into"],
    text:"A little boat sailed (1) ________ the low bridge. A silver fish jumped (2) ________ the water and splashed back in. The children waved (3) ________ the bank of the river.",
    answers:["(1) under","(2) out of","(3) from"],
    checklist:["Read the whole passage first","Pictured where each thing goes","Wrote each word neatly next to its number","Used each box word once only","All 3 words correct (grown-up marks)"] }
};
})();
