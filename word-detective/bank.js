(function(){
var I = [];
var NUDGE = {
  "VO-CTX":"Find the clue words in the sentence. Then try each word in the blank. Which one makes sense?",
  "VO-FEEL":"Find what the person DID or how their body showed it. What feeling does that show?",
  "VO-SIM":"This is a famous 'as ... as a ...' saying. Which one do you know?",
  "VO-FORM":"Look at the word in brackets. Which form fits the blank: a thing, a describing word, or a 'how' word?"
};
function M(id, tag, diff, stem, opts, ans, why, meta, src, hint, nudge){
  I.push({id:id, kind:"mcq", tag:tag, diff:diff, stem:stem, options:opts, answer:ans, why:why, nudge:nudge||NUDGE[tag], hint:hint, src:src, meta:meta});
}
M("E03-001","VO-CTX",1,"Bees live in a ___.",["den","stable","hive","kennel"],2,"A bee's home is a hive. (Den = fox or lion, stable = horse, kennel = dog.)",{group:"home-bee"},"orig","Match the animal to its home. The bee's home starts with h_.");
M("E03-002","VO-CTX",1,"At the farm, the horse sleeps in a ___.",["stable","hive","burrow","nest"],0,"A horse's home on a farm is a stable.",{group:"home-horse"},"orig","A horse's home starts with s_ _ and rhymes with 'table'.");
M("E03-003","VO-CTX",1,"The rabbit dug a deep ___ under the ground.",["nest","burrow","stable","hive"],1,"A rabbit digs a hole under the ground to live in: a burrow.",{group:"home-rabbit"},"orig","It is a hole d_ _ under the ground. It starts with b_.");
M("E03-004","VO-CTX",2,"The lift was out of order, so we had no ___ but to take the stairs.",["chance","choice","rule","plan"],1,"'Had no choice but to' means there was no other way.",{group:"no-other-way"},"orig","There was only o_ _ way to go up. We had no ch_ _ _ _ but to walk.");
M("E03-005","VO-CTX",2,"The T-shirt was so ___ that it cost only two dollars.",["expensive","inexpensive","heavy","famous"],1,"It cost only two dollars, so it was cheap: inexpensive.",{group:"cheap"},"orig","Only two dollars is not a lot of money. The word means 'not costing m_ _ _'.");
M("E03-006","VO-CTX",2,"Many ___ queued at the bakery to buy fresh bread.",["patients","passengers","customers","audience"],2,"People who buy things at a shop are customers.",{group:"shop-buyers"},"orig","They came to b_ _ bread at a shop.");
M("E03-007","VO-CTX",2,"Ravi ___ his friend in the crowd and waved to him.",["hid","spotted","forgot","followed"],1,"He saw his friend and waved, so he spotted him.",{group:"saw"},"orig","He w_ _ _ _ to his friend, so first he must have s_ _ him.");
M("E03-008","VO-CTX",3,"Ken was late because he helped an old lady, so the teacher ___ him.",["punished","excused","scolded","ignored"],1,"He had a good reason, so the teacher let him off: excused.",{group:"let-off"},"orig","He had a g_ _ _ reason. The teacher did not punish him; she let him o_ _.");
M("E03-009","VO-CTX",2,"The baby was sleeping, so we spoke ___.",["loudly","softly","angrily","proudly"],1,"We did not want to wake the baby, so we spoke quietly: softly.",{group:"quiet"},"orig","We did not want to w_ _ _ the baby.");
M("E03-010","VO-CTX",2,"The old tortoise moved ___ across the garden.",["quickly","noisily","slowly","angrily"],2,"Tortoises are not fast, so it moved slowly.",{group:"slow"},"orig","Think about how a tortoise moves: not f_ _ _.");
M("E03-011","VO-CTX",3,"After the long hike, the children were ___ and fell asleep at once.",["energetic","exhausted","excited","noisy"],1,"They fell asleep at once after a long hike, so they were very tired: exhausted.",{group:"tired"},"orig","They fell a_ _ _ _ _ at once, so they were very t_ _ _ _.");
M("E03-012","VO-CTX",3,"The old bridge was ___, so nobody was allowed to cross it.",["sturdy","unsafe","crowded","beautiful"],1,"Nobody was allowed to cross, so it was dangerous: unsafe.",{group:"dangerous"},"orig","Nobody was a_ _ _ _ _ _ to cross. The bridge could break, so it was not s_ _ _.");
M("E03-013","VO-CTX",2,"The firefighter ___ the cat from the burning house.",["chased","rescued","scolded","painted"],1,"The firefighter saved the cat from danger: rescued.",{group:"saved"},"orig","The cat was in d_ _ _ _ _. The firefighter s_ _ _ _ it.");
M("E03-014","VO-CTX",2,"The fridge was ___, so we went to the shop to buy food.",["full","empty","cold","new"],1,"We had to buy food, so there was nothing in the fridge: empty.",{group:"nothing-inside"},"orig","We had to b_ _ food, so there was n_ _ _ _ _ _ in the fridge.");
M("E03-015","VO-CTX",1,"Mrs Tan always helps her neighbours and feeds the stray cats. She is ___.",["humble","kind-hearted","cunning","lazy"],1,"She helps people and feeds hungry cats. Those actions show she is kind-hearted.",{group:"kind",trait:true},"orig","Look at what she DOES: she helps and feeds. She has a k_ _ _ heart.","Do not guess the word. Check what Mrs Tan DOES.");
M("E03-016","VO-CTX",2,"Ali won first prize, but he did not boast about it to anyone. He was ___.",["proud","humble","greedy","cunning"],1,"He did not show off about winning. Not boasting shows he is humble.",{group:"modest",trait:true},"orig","He did not b_ _ _ _ or show off. The word means 'not showing off'.","Check what Ali did NOT do after winning.");
M("E03-017","VO-CTX",2,"The fox tricked the crow into dropping its cheese. The fox was ___.",["honest","humble","cunning","clumsy"],2,"Tricking someone to get what you want is cunning.",{group:"sly",trait:true},"orig","The fox played a t_ _ _ _ to get the cheese. The word means 'good at tricking'.","What did the fox DO to get the cheese?");
M("E03-018","VO-CTX",2,"Hui Min solved the hardest puzzle in just a few minutes. She is ___.",["careless","clever","selfish","timid"],1,"Solving a very hard puzzle quickly shows she is clever.",{group:"smart",trait:true},"orig","She s_ _ _ _ _ a very hard puzzle fast. The word means 'quick at thinking'.","What did she DO with the puzzle?");
M("E03-019","VO-CTX",2,"The boy ran into the rough sea to save the puppy. He was ___.",["timid","brave","lazy","greedy"],1,"Running into a rough sea to save someone shows he was brave.",{group:"brave",trait:true},"orig","He did something d_ _ _ _ _ _ _ _ to save the puppy. The word means 'not afraid'.","What did the boy DO?");
M("E03-020","VO-CTX",2,"Kai found a wallet on the bus and gave it back to the owner. He is ___.",["greedy","rude","honest","selfish"],2,"Giving back something that is not yours shows he is honest.",{group:"honest",trait:true},"orig","He gave it b_ _ _. He did not keep what was not his.","What did Kai DO with the wallet?");
M("E03-021","VO-CTX",3,"Zara would not share her sweets with anyone, not even her little brother. She was ___.",["generous","humble","selfish","patient"],2,"Keeping everything for yourself and not sharing is selfish.",{group:"selfish",trait:true},"orig","She kept everything for h_ _ _ _ _ _. She would not s_ _ _ _.","What did Zara NOT do?");
M("E03-022","VO-CTX",3,"Grandma waited calmly in the long, slow queue without complaining. She is ___.",["impatient","cunning","careless","patient"],3,"Waiting calmly without complaining shows she is patient.",{group:"patient",trait:true},"orig","She waited c_ _ _ _ _ and did not c_ _ _ _ _ _ _.","How did Grandma wait?");
M("E03-023","VO-CTX",3,"Omar shared his lunch with a classmate who forgot hers. He is ___.",["greedy","timid","boastful","generous"],3,"Sharing what you have with others shows he is generous.",{group:"generous",trait:true},"orig","He s_ _ _ _ _ his own lunch. The word means 'happy to give'.","What did Omar DO with his lunch?");
M("E03-024","VO-CTX",3,"Jun practised the violin for an hour every single day. He is ___.",["lazy","hardworking","cunning","careless"],1,"Practising every day shows he is hardworking.",{group:"hardworking",trait:true},"orig","He p_ _ _ _ _ _ _ _ every day. The word means 'working hard'.","What did Jun DO every day?");
M("E03-025","VO-CTX",2,"Wei tripped over his own feet three times today. He is so ___!",["graceful","clever","clumsy","humble"],2,"Tripping over and over shows he is clumsy.",{group:"clumsy",trait:true},"orig","He t_ _ _ _ _ _ three times. The word means 'often falling or dropping things'.","What happened to Wei three times?");
M("E03-026","VO-FEEL",1,"When the lights went off in the storm, Ken was so ___ that he hid under his blanket.",["excited","frightened","proud","bored"],1,"Hiding under a blanket in a storm shows fear: frightened.",{group:"afraid"},"orig","He h_ _ under his blanket. That shows he was sc_ _ _ _.");
M("E03-027","VO-FEEL",1,"Mei jumped up and down with ___ when she won the prize.",["anger","fear","joy","boredom"],2,"Jumping up and down after winning shows great happiness: joy.",{group:"happy"},"orig","She w_ _ the prize and jumped up and down. That is a h_ _ _ _ feeling.");
M("E03-028","VO-FEEL",2,"\"Thank you so much for helping me!\" said Amy, full of ___.",["anger","gratitude","jealousy","boredom"],1,"Saying thank you shows she is thankful: gratitude.",{group:"thankful"},"orig","She said 't_ _ _ _ you'. The feeling is being th_ _ _ _ _ _.");
M("E03-029","VO-FEEL",2,"Tom was ___ when his best friend moved to another country.",["delighted","miserable","proud","amused"],1,"Losing a best friend nearby makes you very sad: miserable.",{group:"sad"},"orig","His best friend m_ _ _ _ away. That is a s_ _ feeling.");
M("E03-030","VO-FEEL",2,"Siti felt ___ before her piano exam, and her hands were shaking.",["bored","lazy","nervous","proud"],2,"Shaking hands before an exam show she was worried: nervous.",{group:"worried"},"orig","Her hands were s_ _ _ _ _ _ before the e_ _ _. She was w_ _ _ _ _ _.");
M("E03-031","VO-FEEL",2,"Dad was ___ when he saw the big mess in the kitchen.",["delighted","sleepy","furious","grateful"],2,"A big mess would make Dad very angry: furious.",{group:"angry"},"orig","A big m_ _ _ makes grown-ups very a_ _ _ _.");
M("E03-032","VO-FEEL",3,"When the lost puppy was found safe, the whole family sighed with ___.",["fear","jealousy","relief","pride"],2,"The worry was over, so they felt relief.",{group:"relieved"},"orig","The worry was o_ _ _. They said 'ph_ _!'");
M("E03-033","VO-FEEL",3,"Lily felt ___ when her sister got a new bicycle and she did not.",["grateful","relieved","jealous","proud"],2,"Wanting what someone else got is feeling jealous.",{group:"jealous"},"orig","She w_ _ _ _ _ what her sister got.");
M("E03-034","VO-FEEL",2,"The crowd watched in ___ as the magician pulled a rabbit out of an empty hat.",["boredom","sadness","amazement","anger"],2,"A rabbit from an empty hat is a big surprise: amazement.",{group:"surprised"},"orig","The hat was e_ _ _ _! That is a big s_ _ _ _ _ _ _.");
M("E03-035","VO-FEEL",3,"Ben felt ___ of himself after he finished the long race.",["jealous","bored","proud","frightened"],2,"Finishing a long race is a big success, so he felt proud.",{group:"proud"},"orig","He f_ _ _ _ _ _ _ a long race. He felt g_ _ _ about what he did.");
M("E03-036","VO-SIM",1,"My little sister never stops moving around. She is as busy as a ___.",["snail","bee","rock","cat"],1,"'As busy as a bee' is a well-known simile.",{adj:"busy"},"orig","Which small insect is always working? It makes honey: b_ _.");
M("E03-037","VO-SIM",2,"Grandpa cannot see anything without his glasses. He is as blind as a ___.",["owl","eagle","bat","cat"],2,"'As blind as a bat' is a well-known simile.",{adj:"blind"},"orig","This animal flies at night and hangs upside down: b_ _.");
M("E03-038","VO-SIM",2,"The old man gave very good advice. He was as wise as an ___.",["ox","owl","ant","eel"],1,"'As wise as an owl' is a well-known simile.",{adj:"wise"},"orig","This bird says 'hoo-hoo' at night: o_ _.");
M("E03-039","VO-SIM",2,"The strong man pulled the heavy cart by himself. He was as strong as an ___.",["ox","owl","ant","eel"],0,"'As strong as an ox' is a well-known simile.",{adj:"strong"},"orig","This big farm animal pulls ploughs: o_.");
M("E03-040","VO-SIM",3,"During the test, the room was as quiet as a ___.",["lion","drum","mouse","storm"],2,"'As quiet as a mouse' is a well-known simile.",{adj:"quiet"},"orig","This tiny animal creeps about without a sound: m_ _ _ _.");
M("E03-041","VO-SIM",3,"After playing in the snow, her hands were as cold as ___.",["fire","ice","toast","soup"],1,"'As cold as ice' is a well-known simile.",{adj:"cold"},"orig","Frozen water: i_ _.");
M("E03-042","VO-SIM",2,"The baby's cheeks were as soft as ___.",["stone","silk","wood","sand"],1,"'As soft as silk' is a well-known simile.",{adj:"soft"},"orig","It is a smooth cloth that feels lovely: s_ _ _.");
M("E03-043","VO-FORM",1,"Please be ___ when you cross the road. (care)",["care","careful","carefully","cares"],1,"After 'be' we need a describing word: careful.",{base:"care",suffix:"ful"},"orig","After 'be', use a describing word that ends in -_ _ _.");
M("E03-044","VO-FORM",2,"The children played ___ in the garden. (happy)",["happy","happiness","happily","happier"],2,"It tells us HOW they played, so it ends in -ly: happily.",{base:"happy",suffix:"ly"},"orig","It tells us h_ _ they played. 'How' words often end in -_ _.");
M("E03-045","VO-FORM",2,"We watched the show with great ___. (enjoy)",["enjoy","enjoyed","enjoyable","enjoyment"],3,"After 'great' we need a thing (a noun): enjoyment.",{base:"enjoy",suffix:"ment"},"orig","After 'with great', we need a t_ _ _ _ word. It ends in -_ _ _ _.");
M("E03-046","VO-FORM",2,"The garden was full of ___ flowers. (beauty)",["beauty","beautiful","beautifully","beauties"],1,"It describes the flowers, so it ends in -ful: beautiful.",{base:"beauty",suffix:"ful"},"orig","It describes the f_ _ _ _ _ _. Describing words like this end in -_ _ _.");
M("E03-047","VO-FORM",3,"Thank you for your ___ to my grandma. (kind)",["kind","kindly","kindness","kinder"],2,"After 'your' we need a thing (a noun): kindness.",{base:"kind",suffix:"ness"},"orig","After 'your', we need a t_ _ _ _ word. It ends in -_ _ _ _.");
M("E03-048","VO-FORM",3,"Mr Lee is our maths ___. He helps us learn every day. (teach)",["teach","teacher","teaching","taught"],1,"A person who teaches is a teacher.",{base:"teach",suffix:"er"},"orig","It is a p_ _ _ _ _. People who do a job often end in -_ _.");
M("E03-049","VO-FORM",3,"The boy ran ___ to catch the bus. (quick)",["quick","quickly","quickness","quicker"],1,"It tells us HOW he ran, so it ends in -ly: quickly.",{base:"quick",suffix:"ly"},"orig","It tells us h_ _ he ran. 'How' words often end in -_ _.");
M("E03-050","VO-FORM",2,"It is ___ to leave your bag on the floor where people can trip over it. (care)",["careful","careless","carefully","care"],1,"Leaving a bag where people trip is not careful, so: careless (-less means 'without').",{base:"care",suffix:"less"},"orig","People could t_ _ _. That is not taking care. -less means 'w_ _ _ _ _ _'.");
var cloze = { id:"E03-C1", title:"Nadia and the Puppy", src:"orig",
  box:["whimpering","trembling","approached","grateful","cheerfully","rescued","angry","glanced"],
  parts:["On her way home, Nadia heard a small puppy ", 1, " softly in the rain. Its tiny legs were ", 2,
    " with cold. She ", 3, " it slowly so that it would not run away, and carried it home in her jacket. The next day, its owner came to fetch it. She was so ", 4,
    " that she gave Nadia a big hug. Nadia ", 5, " waved goodbye to the puppy."],
  blanks:[
    {id:"E03-C1-1",tag:"VO-CTX",diff:2,answer:"whimpering",why:"Nadia HEARD it, so it is a sound: a puppy whimpering (crying softly).",nudge:"Nadia heard it. Which word is a sound?",hint:"It is a soft crying s_ _ _ _ a puppy makes.",meta:{group:"cry-softly"}},
    {id:"E03-C1-2",tag:"VO-CTX",diff:2,answer:"trembling",why:"Legs that are cold shake: trembling.",nudge:"What do legs do when they are very cold?",hint:"Cold legs s_ _ _ _.",meta:{group:"shaking"}},
    {id:"E03-C1-3",tag:"VO-CTX",diff:3,answer:"approached",why:"She moved slowly towards it: approached.",nudge:"What did she do slowly, so it would not run away?",hint:"She came c_ _ _ _ _ to it, slowly.",meta:{group:"came-near"}},
    {id:"E03-C1-4",tag:"VO-FEEL",diff:2,answer:"grateful",why:"She hugged Nadia for keeping her puppy safe, so she was thankful: grateful.",nudge:"Why would the owner hug Nadia?",hint:"She wanted to say t_ _ _ _ you.",meta:{group:"thankful"}},
    {id:"E03-C1-5",tag:"VO-FORM",diff:2,answer:"cheerfully",why:"It tells us HOW she waved, so it ends in -ly: cheerfully.",nudge:"This word tells us HOW Nadia waved.",hint:"'How' words often end in -_ _.",meta:{group:"happily"}}
  ]};

window.GAME = {
  slug:"word-detective", code:"G-E03", key:"eng.vocab", title:"Word Detective", emoji:"🕵️",
  level:"P3", tagLine:"P3 · Vocabulary · VO-CTX · VO-FEEL · VO-SIM · VO-FORM",
  intro:"Crack the case of the missing word! Find the clue words, then pick the word that fits.",
  tags:["VO-CTX","VO-FEEL","VO-SIM","VO-FORM"],
  rule:{ title:"How a word detective works",
    list:["Read the WHOLE sentence first.",
      "Find the clue words and underline them: 'hid under his blanket' means scared.",
      "Character words: what did the person DO? Helps others = kind-hearted. Does not boast = humble. Tricks others = cunning.",
      "Similes: as busy as a bee, as blind as a bat, as wise as an owl, as strong as an ox.",
      "Word forms: -ful describes (careful), -ly tells how (quickly), -ment and -ness are things (enjoyment, kindness).",
      "Try your word in the blank and read it again. Does it make sense?"],
    say:"Here is how a word detective works. Read the whole sentence first. Find the clue words and underline them. For character words, ask: what did the person do? Helping others means kind hearted. Not boasting means humble. Tricking others means cunning. Learn the similes: as busy as a bee, as blind as a bat, as wise as an owl. For word forms, f u l describes, l y tells how, and m e n t or n e s s are things. Then put your word in the blank and read it again." },
  worked:{ stem:"When she saw the huge spider, Mia screamed and ran out of the room. She was ___.", options:["brave","terrified","proud","calm"], answer:1,
    steps:[
      {text:"Step 1: Underline the clue words: 'screamed and ran out'.", mark:"screamed ran out", say:"Step 1. Underline the clue words: screamed, and ran out."},
      {text:"Step 2: What feeling makes you scream and run? Fear.", say:"Step 2. What feeling makes you scream and run away? Fear."},
      {text:"Step 3: The word for very scared is terrified. Not brave: a brave girl would not run away.", pick:1, say:"Step 3. The word for very scared is terrified. Not brave. A brave girl would not run away."}
    ]},
  items:I, cloze:cloze,
  lesson:["E03-026","E03-036","E03-016","E03-046","E03-008"],
  paper:{ title:"Paper step: Vocabulary Cloze",
    instructions:["Get a pencil and paper. Copy the numbers 1, 2 and 3.","Read the whole passage first.","Underline the clue words for each blank.","Write the correct word from the box next to each number. Each word is used once only."],
    box:["shivering","delighted","gently","enormous","rude"],
    text:"The kitten was (1) ________ in the cold wind. Anna picked it up (2) ________ and dried it with a towel. When its owner came, she was (3) ________ to see it safe and warm.",
    answers:["(1) shivering","(2) gently","(3) delighted"],
    checklist:["Read the whole passage first","Underlined a clue for each blank","Wrote each word neatly next to its number","Used each box word once only","All 3 words correct (grown-up marks)"] }
};
})();
