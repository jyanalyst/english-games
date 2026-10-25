/* "Test yourself" for Join It Up: ORIGINAL items (25 Oct 2026), exam format: Sentence Combining. One "pick the correct sentence",
   then two written answers with the joining word given (one sentence, same meaning, capital letter and full stop). */
window.CHECKUP = {
about:"sentence combining: pick the correct joined sentence, then write two joined sentences with the word given",
lessons:{
  rule:{label:"How to join two sentences: keep the meaning, drop the repeated words", to:"rule"},
  worked:{label:"Watch me do one: join with the word given", to:"worked"}
},
sets:[{slots:[
 [ // 1. pick the correctly joined sentence
  {kind:"mcq",tag:"SC-BECAUSE",sec:"Sentence Combining",instr:"Which sentence joins the two sentences correctly? The meaning must stay the same.",text:"Ella stayed at home. She had a fever. (because)",
   opts:["Ella stayed at home because she had a fever.","Ella had a fever because she stayed at home.","Because Ella stayed at home, she had a fever.","Ella stayed at home because of she had a fever."],answer:0,go:"rule",
   praise:"Yes! You put 'because' before the reason, the fever, so the meaning stayed the same.",
   diag:{"1":["The meaning changed. Which came first: the fever or staying home? 'Because' goes before the reason.","rule"],"2":["The meaning changed. Staying at home did not cause the fever. Which part is the reason?","worked"],"3":["Read it aloud in your head. 'because of she had' does not sound right.","rule"]},
   sol:[["Find the reason","Why did Ella stay at home? She had a fever."],["Put 'because' before the reason","Ella stayed at home + because + she had a fever."],["Ella stayed at home because she had a fever.","Same meaning, one sentence, one full stop."]]},
  {kind:"mcq",tag:"SC-WHO",sec:"Sentence Combining",instr:"Which sentence joins the two sentences correctly? The meaning must stay the same.",text:"The girl won the race. She is my cousin. (who)",
   opts:["The girl who won the race she is my cousin.","The girl who won the race is my cousin.","The girl is my cousin who won the race she.","The girl who is my cousin won she the race."],answer:1,go:"rule",
   praise:"Yes! You put 'who won the race' right after 'The girl' and dropped the extra 'she'.",
   diag:{"0":["Almost. 'who' already stands for the girl, so drop 'she'.","rule"],"2":["Read it aloud in your head. Put 'who' right after the person it is about.","worked"],"3":["Read it aloud in your head. 'won she the race' does not sound right.","worked"]},
   sol:[["Find the person in both sentences","The girl = She."],["Put 'who' + the first sentence right after 'The girl'","The girl who won the race ..."],["The girl who won the race is my cousin.","'Who' replaces 'She', so drop 'She'."]]},
  {kind:"mcq",tag:"SC-ALTHOUGH",sec:"Sentence Combining",instr:"Which sentence joins the two sentences correctly? The meaning must stay the same.",text:"It was very late. Max was still awake. (Although)",
   opts:["Although it was very late, but Max was still awake.","Although Max was still awake, it was very late.","Although it was very late, Max was still awake.","Although it was very late Max, was still awake."],answer:2,go:"rule",
   praise:"Yes! You started with 'Although', put the comma after the first part, and did not add 'but'.",
   diag:{"0":["'Although' and 'but' do the same job. Use only one of them.","rule"],"1":["The meaning changed. Which part is the surprise? Max being awake.","worked"],"3":["Check the comma. It goes after the whole first part: Although it was very late,","rule"]},
   sol:[["'Although' goes before the first idea","Although it was very late"],["Add a comma, then the surprise","Max was still awake."],["Although it was very late, Max was still awake.","Never use 'although' and 'but' together."]]}
 ],
 [ // 2. write it: because / when / so
  {kind:"type",sentence:true,tag:"SC-WHEN",sec:"Sentence Combining",instr:"Join the two sentences using the word in brackets. Write one sentence.",text:"The bell rang. The children went back to class. (When)",
   accept:["When the bell rang, the children went back to class.","When the bell rang the children went back to class.","The children went back to class when the bell rang."],go:"rule",
   praise:"Yes! You started with 'When', kept every meaning word and wrote one sentence.",
   diag:{"when the bell rang the children went back to class then":["Drop 'then'. 'When' already shows the order.","rule"],"when the children went back to class the bell rang":["The meaning changed. Which happened first? 'When' goes with the first thing.","worked"],"when the bell rang and the children went back to class":["Drop 'and'. 'When' is already the joining word.","rule"]},
   generic:"Start with 'When' and the thing that happened first. Then add a comma and the second part.",
   sol:[["Which happened first?","The bell rang."],["'When' + the first thing, then a comma","When the bell rang,"],["When the bell rang, the children went back to class.","Capital letter, one full stop."]]},
  {kind:"type",sentence:true,tag:"SC-SO",sec:"Sentence Combining",instr:"Join the two sentences using the word in brackets. Write one sentence.",text:"The road was flooded. We took another way. (so)",
   accept:["The road was flooded, so we took another way.","The road was flooded so we took another way."],go:"rule",
   praise:"Yes! You put 'so' before the result: we took another way.",
   diag:{"we took another way so the road was flooded":["The meaning changed. Taking another way did not flood the road. 'So' goes before the result.","worked"],"so the road was flooded we took another way":["'So' goes in the middle, before the result.","rule"],"the road was flooded so and we took another way":["Drop 'and'. 'So' is already the joining word.","rule"]},
   generic:"Which part is the result? Put 'so' just before it.",
   sol:[["Find the cause and the result","Cause: the road was flooded. Result: we took another way."],["Put 'so' before the result","The road was flooded, so ..."],["The road was flooded, so we took another way.","Capital letter, one full stop."]]},
  {kind:"type",sentence:true,tag:"SC-BECAUSE",sec:"Sentence Combining",instr:"Join the two sentences using the word in brackets. Write one sentence.",text:"Tim wore a thick jacket. It was cold outside. (because)",
   accept:["Tim wore a thick jacket because it was cold outside.","Because it was cold outside, Tim wore a thick jacket.","Because it was cold outside Tim wore a thick jacket."],go:"rule",
   praise:"Yes! You put 'because' before the reason, the cold, and kept one sentence.",
   diag:{"it was cold outside because tim wore a thick jacket":["The meaning changed. The jacket did not make it cold. 'Because' goes before the reason.","worked"],"tim wore a thick jacket because of it was cold outside":["Drop 'of'. 'because it was cold' is enough.","rule"],"tim wore a thick jacket because it is cold outside":["Keep the same tense as the question: it WAS cold.","rule"]},
   generic:"Which part is the reason? Put 'because' just before it.",
   sol:[["Find the reason","Why did Tim wear a jacket? It was cold outside."],["Put 'because' before the reason","Tim wore a thick jacket because ..."],["Tim wore a thick jacket because it was cold outside.","Capital letter, one full stop."]]}
 ],
 [ // 3. write it: who / which / although
  {kind:"type",sentence:true,tag:"SC-WHICH",sec:"Sentence Combining",instr:"Join the two sentences using the word in brackets. Write one sentence.",text:"I have a new bag. It has many pockets. (which)",
   accept:["I have a new bag which has many pockets."],go:"rule",
   praise:"Yes! 'which' took the place of 'It', and you dropped the repeated word.",
   diag:{"i have a new bag which it has many pockets":["Almost. 'which' already stands for the bag, so drop 'it'.","rule"],"i have a new bag which has a lot of pockets":["Keep the same words as the question: many pockets.","rule"],"which has many pockets i have a new bag":["Put 'which' right after the thing it is about: the bag.","worked"]},
   generic:"Put 'which' right after the bag, and drop the word it replaces.",
   sol:[["Find the thing in both sentences","a new bag = It"],["Put 'which' right after 'bag'","I have a new bag which ..."],["I have a new bag which has many pockets.","'Which' replaces 'It', so drop 'It'."]]},
  {kind:"type",sentence:true,tag:"SC-WHO",sec:"Sentence Combining",instr:"Join the two sentences using the word in brackets. Write one sentence.",text:"The man fixed our tap. He is a plumber. (who)",
   accept:["The man who fixed our tap is a plumber.","The man who is a plumber fixed our tap."],go:"rule",
   praise:"Yes! You put 'who fixed our tap' right after 'The man' and dropped 'He'.",
   diag:{"the man who fixed our tap he is a plumber":["Almost. 'who' already stands for the man, so drop 'he'.","rule"],"the man is a plumber who fixed our tap":["Put 'who' right after the person it is about: The man who ...","worked"]},
   generic:"Put 'who' right after 'The man', then finish with the other sentence. Drop the word 'who' replaces.",
   sol:[["Find the person in both sentences","The man = He"],["Put 'who' + the first sentence right after 'The man'","The man who fixed our tap ..."],["The man who fixed our tap is a plumber.","'Who' replaces 'He', so drop 'He'."]]},
  {kind:"type",sentence:true,tag:"SC-ALTHOUGH",sec:"Sentence Combining",instr:"Join the two sentences using the word in brackets. Write one sentence.",text:"The test was hard. Zoe passed it. (Although)",
   accept:["Although the test was hard, Zoe passed it.","Although the test was hard Zoe passed it."],go:"rule",
   praise:"Yes! You started with 'Although', added the comma, and did not add 'but'.",
   diag:{"although the test was hard but zoe passed it":["'Although' and 'but' do the same job. Drop 'but'.","rule"],"although zoe passed it the test was hard":["The meaning changed. The surprise is that Zoe passed. Start with the hard test.","worked"],"although the test was hard zoe passed the test":["Close. Keep the words from the question: Zoe passed it.","rule"]},
   generic:"Start with 'Although' and the first sentence, add a comma, then the surprise.",
   sol:[["'Although' goes before the first idea","Although the test was hard"],["Add a comma, then the surprise","Zoe passed it."],["Although the test was hard, Zoe passed it.","Never use 'although' and 'but' together."]]}
 ]
]}]};
