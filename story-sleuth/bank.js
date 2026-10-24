(function(){
var P = {}, I = [];
function Q(o){ I.push(o); }
var TRAIT_CHECK = ["The trait word fits what the character did", "The reason is an ACTION from the story that proves it (not something they saw or noticed)", "Full sentence, past tense for the action, ends with a full stop"];
var QW_OPTS = ["a person","a place","a time","a reason (because ...)"];
P.LP = { title:"The Bird in the Drain", lines:[
 "Ravi and his sister Nina were walking home from school.",
 "Near the bus stop, Nina heard a soft cheeping sound.",
 "It was coming from a drain beside the road.",
 "Inside, a tiny bird was flapping its wet wings.",
 "Ravi lay down on the grass and gently lifted it out.",
 "Nina took off her scarf and wrapped the bird to keep it warm.",
 "At home, Mum gave them two small boxes and some cotton wool.",
 "The children lined one of them with the cotton wool.",
 "For three days, they fed the bird with water and soft seeds.",
 "On the fourth day, it hopped onto the window and flew away.",
 "Nina waved and smiled, but Ravi felt a little sad."]};
Q({id:"E05-L1",passage:"LP",kind:"seq",tag:"CO-SEQ",diff:1,src:"orig",events:["The bird flew away.","Nina heard a cheeping sound.","Ravi lifted the bird out of the drain."],order:[1,2,0],
  why:"First Nina heard the sound, then Ravi lifted the bird out, and last it flew away.",nudge:"Find each event in the story. Which line comes first?",hint:"The sound was heard in line _, the lifting is in line _, and flying away is near the e_ _."});
Q({id:"E05-L2",passage:"LP",kind:"ref",tag:"CO-REF",diff:1,src:"orig",word:"It",line:2,from:[1,2],maxWords:4,
  stem:"In line 3, what does 'It' refer to? Point back and name the thing.",accept:["a soft cheeping sound","soft cheeping sound","cheeping sound"],
  why:"'It' points back to the thing Nina heard in line 2. We name the thing only, not the whole sentence.",nudge:"Look BACK at the line before. What was coming from the drain?",hint:"It is something Nina h_ _ _ _. It is a s_ _ _ _."});
Q({id:"E05-L3",passage:"LP",kind:"ref",tag:"CO-REF",diff:2,src:"orig",word:"them",line:7,from:[6,7],maxWords:4,
  stem:"In line 8, what does 'them' refer to? Name the THING in a few words.",accept:["two small boxes","small boxes","boxes"],
  why:"The children lined one of the boxes that Mum gave them in line 7. Just the thing, in a few words.",nudge:"Find 'them' in line 8. Look back at line 7. What did the children line with cotton wool?",hint:"Mum gave the children two small b_ _ _ _."});
Q({id:"E05-L4",passage:"LP",kind:"trait",tag:"CO-CHAR",diff:2,src:"orig",stem:"Which word best describes Ravi and Nina?",options:["humble","kind-hearted","lazy","careless"],answer:1,lines:[4,5,8],
  why:"They lifted the bird out, kept it warm and fed it for three days. Those actions show they are kind-hearted.",
  nudge:"Do not guess the word. Check what Ravi and Nina DID for the bird.",hint:"They helped a hurt animal. Which word means having a k_ _ _ heart?",
  nudge2:"Find something they DID, not something they heard or saw.",hint2:"Look for a doing word like lifted, wrapped or f_ _."});
Q({id:"E05-L5",passage:"LP",kind:"full",tag:"CO-CHAR",diff:3,src:"orig",stem:"How would you describe Nina? Give a reason from the story.",
  keywords:["because"],starter:"Nina is ___ because she ___.",model:"Nina is caring because she wrapped the bird in her scarf to keep it warm. (Also fine: kind, because she fed the bird for three days.)",
  checklist:TRAIT_CHECK,why:"",nudge:"Say what kind of person she is, then the action that proves it.",hint:"Nina is ____ because she ____ (something she did)."});
P.P1 = { title:"The Rainy Day Fair", lines:[
 "On Saturday, the school held a fair to raise money for a children's home.",
 "Mei Ling and her friend Omar ran a stall selling cupcakes.",
 "They had baked forty of them the night before.",
 "Just after ten o'clock, dark clouds rolled in and it began to pour.",
 "Everyone rushed to the hall, leaving their stalls behind.",
 "Omar noticed that an old man was standing alone in the rain.",
 "He ran back out with his umbrella and walked the man to the hall.",
 "Meanwhile, Mei Ling covered the cupcakes with a plastic sheet and tied it down with string.",
 "When the rain stopped, the stall was still dry, and the cupcakes were sold out by noon.",
 "The principal thanked the two children in front of the whole school.",
 "Omar's cheeks turned red, but he grinned from ear to ear."]};
Q({id:"E05-P1-1",passage:"P1",kind:"qword",tag:"CO-QW",diff:1,src:"orig",ask:"What kind of answer does this question need?",stem:"Where did everyone rush to when it began to pour?",options:QW_OPTS,answer:1,
  why:"'Where' asks for a place: the hall.",nudge:"Look at the first word of the question.",hint:"'Where' is a question about a p_ _ _ _."});
Q({id:"E05-P1-2",passage:"P1",kind:"ref",tag:"CO-REF",diff:1,src:"orig",word:"them",line:2,from:[1,2],maxWords:3,stem:"In line 3, what does 'them' refer to?",accept:["cupcakes"],
  why:"They baked forty cupcakes. 'Them' points back to the thing they were selling.",nudge:"Look back at line 2. What were they selling?",hint:"It is a kind of small c_ _ _."});
Q({id:"E05-P1-3",passage:"P1",kind:"ref",tag:"CO-REF",diff:2,src:"orig",word:"it",line:7,from:[7],maxWords:3,stem:"In line 8, what does 'it' refer to? (Careful: 'it' is ONE thing.)",accept:["a plastic sheet","plastic sheet"],
  why:"She tied down the sheet so the rain could not get in. 'It' is one thing, so it cannot be the cupcakes.",nudge:"'It' means one thing. The cupcakes are many. What else is in line 8?",hint:"She covered the cupcakes with a p_ _ _ _ _ _ s_ _ _ _."});
Q({id:"E05-P1-4",passage:"P1",kind:"trait",tag:"CO-CHAR",diff:2,src:"orig",stem:"Which word best describes Omar?",options:["selfish","boastful","helpful","lazy"],answer:2,lines:[6],
  why:"He ran back into the rain to walk the old man to the hall. That action shows he is helpful.",nudge:"Check what Omar DID when it rained.",hint:"He gave someone a h_ _ _ _ _ _ hand.",
  nudge2:"Line 6 is what Omar NOTICED. Find what he DID next.",hint2:"Look for what he did with his u_ _ _ _ _ _ _."});
Q({id:"E05-P1-5",passage:"P1",kind:"full",tag:"CO-CHAR",diff:3,src:"orig",stem:"How would you describe Mei Ling? Give a reason from the story.",keywords:["because"],starter:"Mei Ling is ___ because she ___.",
  model:"Mei Ling is quick-thinking because she covered the cupcakes with a plastic sheet when it began to rain. (Also fine: sensible, careful.)",checklist:TRAIT_CHECK,why:"",
  nudge:"Say what kind of person she is, then the action that proves it.",hint:"Mei Ling is ____ because she ____ (something she did when it rained)."});
Q({id:"E05-P1-6",passage:"P1",kind:"tf",tag:"CO-TF",diff:1,src:"orig",stem:"The fair was held to raise money for a children's home.",truth:true,reason:false,lines:[0],
  why:"Line 1 says the fair was to raise money for a children's home, so it is true.",nudge:"Read line 1 again.",hint:"Find the words 'raise m_ _ _ _' in line 1."});
Q({id:"E05-P1-7",passage:"P1",kind:"mcq",tag:"CO-INFER",diff:2,src:"orig",stem:"How did Omar feel when the principal thanked him?",options:["angry","shy but pleased","bored","worried"],answer:1,
  why:"Red cheeks show he was shy, and a big grin shows he was pleased.",nudge:"Look at line 11. What did his cheeks and his mouth do?",hint:"Red cheeks mean s_ _, and a big grin means h_ _ _ _."});
Q({id:"E05-P1-8",passage:"P1",kind:"lift",tag:"CO-LIFT",diff:2,src:"orig",from:[10],stem:"Which phrase in line 11 shows that Omar was very happy? Tap the words.",accept:["grinned from ear to ear","from ear to ear"],
  why:"Grinning from ear to ear means a very big smile.",nudge:"Find the words about his smile.",hint:"It is a phrase about his e_ _ _."});
P.P2 = { title:"The Muddy Library Book", lines:[
 "Kumar borrowed a book about sharks from the school library.",
 "He loved it so much that he read it every night.",
 "On Friday, the book was due, but Kumar could not find it anywhere.",
 "He searched under his bed, in his bag and behind the sofa.",
 "Then he remembered that his little brother had been playing with his things.",
 "Kumar found him in the garden, building a fort with cushions and books.",
 "At the very bottom was the shark book, a little muddy.",
 "Kumar did not shout. He wiped the cover clean with a cloth.",
 "The next morning, he went to the librarian and told her the truth.",
 "He offered to use his pocket money to pay for any damage.",
 "The librarian smiled and said, \"Thank you for being so honest.\""]};
Q({id:"E05-P2-1",passage:"P2",kind:"ref",tag:"CO-REF",diff:1,src:"orig",word:"it",line:1,from:[0,1],maxWords:4,stem:"In line 2, what does 'it' refer to? Name the thing.",accept:["a book about sharks","book about sharks","a book","book"],
  why:"Kumar loved the book he borrowed. 'It' points back to the book.",nudge:"Look back at line 1. What did Kumar borrow?",hint:"It is a b_ _ _ about s_ _ _ _ _."});
Q({id:"E05-P2-2",passage:"P2",kind:"ref",tag:"CO-REF",diff:2,src:"orig",word:"him",line:5,from:[4,5],maxWords:3,stem:"In line 6, who does 'him' refer to?",accept:["his little brother","little brother","brother"],
  why:"Kumar remembered his little brother, then found him in the garden.",nudge:"Look back at line 5. Who had been playing with Kumar's things?",hint:"It is Kumar's little b_ _ _ _ _ _."});
Q({id:"E05-P2-3",passage:"P2",kind:"trait",tag:"CO-CHAR",diff:2,src:"orig",stem:"Which word best describes Kumar?",options:["careless","honest","boastful","greedy"],answer:1,lines:[8,9],
  why:"He told the librarian the truth and offered to pay. Those actions show he is honest.",nudge:"Check what Kumar DID about the muddy book.",hint:"He told the t_ _ _ _."},);
I[I.length-1].nudge2="Line 5 is what he remembered. Find what he DID at the library."; I[I.length-1].hint2="Look for what he told the l_ _ _ _ _ _ _ _.";
Q({id:"E05-P2-4",passage:"P2",kind:"full",tag:"CO-CHAR",diff:3,src:"orig",stem:"How would you describe Kumar? Give a reason from the story.",keywords:["because"],starter:"Kumar is ___ because he ___.",
  model:"Kumar is honest because he told the librarian the truth and offered to pay for the damage. (Also fine: patient, because he did not shout at his brother.)",checklist:TRAIT_CHECK,why:"",
  nudge:"Say what kind of person he is, then the action that proves it.",hint:"Kumar is ____ because he ____ (something he did)."});
Q({id:"E05-P2-5",passage:"P2",kind:"seq",tag:"CO-SEQ",diff:1,src:"orig",events:["Kumar wiped the cover clean.","Kumar searched behind the sofa.","Kumar found his brother in the garden."],order:[1,2,0],
  why:"He searched first, then found his brother, then cleaned the book.",nudge:"Find each event in the story and see which line comes first.",hint:"Searching is in line _, the garden is in line _, wiping is in line _."});
Q({id:"E05-P2-6",passage:"P2",kind:"tf",tag:"CO-TF",diff:3,src:"orig",stem:"Kumar shouted at his little brother.",truth:false,reason:true,lines:[7],
  keywords:["false","true"],starter:"False. ...",model:"False. Kumar did not shout; he wiped the cover clean with a cloth.",
  checklist:["Ticked False","The reason comes from the story (he did not shout / he wiped the book clean)","Full sentence with a full stop"],
  why:"Line 8 says Kumar did not shout.",nudge:"Find the part of the story about shouting.",hint:"Look for the words 'did not s_ _ _ _'.",nudge2:"Tap the line that tells you about shouting.",hint2:"It is line _, near the end."});
Q({id:"E05-P2-7",passage:"P2",kind:"full",tag:"CO-FULL",diff:2,src:"orig",stem:"What did Kumar do the next morning? Answer in a full sentence.",keywords:["morning","Kumar","he"],starter:"The next morning, Kumar ...",
  model:"The next morning, Kumar went to the librarian and told her the truth.",checklist:["Says what Kumar did (went to the librarian / told the truth)","Uses words from the question, past tense","Full sentence with a full stop"],why:"",
  nudge:"Find 'the next morning' in the story.",hint:"Start: 'The next morning, Kumar w_ _ _ ...'"});
Q({id:"E05-P2-8",passage:"P2",kind:"mcq",tag:"CO-LIFT",diff:1,src:"orig",stem:"Name ONE place where Kumar searched for the book.",options:["in the library","under his bed","in the garden","in the car"],answer:1,
  why:"Line 4 lists the places he searched: under his bed, in his bag and behind the sofa.",nudge:"Read line 4 again.",hint:"Line 4 starts 'He s_ _ _ _ _ _ _ ...'"});
P.P3 = { title:"Sunny the Bakery Cat", lines:[
 "Every evening, a thin orange cat waited outside Mrs Lim's bakery.",
 "The other shopkeepers shooed it away with their brooms.",
 "Mrs Lim felt sorry for the cat and named it Sunny.",
 "She saved the burnt edges of her buns and put them in a small dish for Sunny.",
 "One night, Mrs Lim forgot to lock the back door of the bakery.",
 "At midnight, Sunny began to yowl loudly outside her window upstairs.",
 "Mrs Lim woke up and saw a man creeping out of the bakery with a bag.",
 "She switched on the lights and shouted for help.",
 "The man dropped the bag and ran away.",
 "The next day, the other shopkeepers bought Sunny a soft new bed.",
 "\"That cat is a hero,\" they said, and nobody chased it away again."]};
Q({id:"E05-P3-1",passage:"P3",kind:"ref",tag:"CO-REF",diff:1,src:"orig",word:"it",line:1,from:[0,1],maxWords:4,stem:"In line 2, what does 'it' refer to?",accept:["a thin orange cat","thin orange cat","orange cat","cat"],
  why:"The shopkeepers shooed the cat away. 'It' points back to the cat in line 1.",nudge:"Look back at line 1. What waited outside the bakery?",hint:"It is a thin orange c_ _."});
Q({id:"E05-P3-2",passage:"P3",kind:"ref",tag:"CO-REF",diff:2,src:"orig",word:"them",line:3,from:[3],maxWords:6,stem:"In line 4, what does 'them' refer to? Name the THINGS, not the whole sentence.",accept:["the burnt edges of her buns","burnt edges of her buns","the burnt edges","burnt edges"],
  why:"She put the burnt edges in the dish. 'Them' points back to those things.",nudge:"Find 'them'. Look back in the same line. What did she put in the dish?",hint:"They are the b_ _ _ _ edges of her buns."});
Q({id:"E05-P3-3",passage:"P3",kind:"trait",tag:"CO-CHAR",diff:2,src:"orig",stem:"Which word best describes Mrs Lim at the start of the story?",options:["cruel","caring","boastful","impatient"],answer:1,lines:[2,3],
  why:"She named the cat and saved food for it every day. Those actions show she is caring.",nudge:"Check what Mrs Lim DID for the cat.",hint:"She took c_ _ _ of a hungry cat.",
  nudge2:"Line 7 is what she SAW. Find what she DID for the cat.",hint2:"Look for what she did with the burnt e_ _ _ _."});
Q({id:"E05-P3-4",passage:"P3",kind:"full",tag:"CO-CHAR",diff:3,src:"orig",stem:"How would you describe Sunny? Give a reason from the story.",keywords:["because"],starter:"Sunny is ___ because Sunny ___.",
  model:"Sunny is brave and loyal because Sunny yowled loudly to wake Mrs Lim when the man was in the bakery.",checklist:TRAIT_CHECK,why:"",
  nudge:"Say what kind of cat Sunny is, then the action that proves it.",hint:"Sunny is ____ because Sunny ____ (something the cat did at midnight)."});
Q({id:"E05-P3-5",passage:"P3",kind:"qword",tag:"CO-QW",diff:1,src:"orig",ask:"What kind of answer does this question need?",stem:"Why did the man run away?",options:QW_OPTS,answer:3,
  why:"'Why' asks for a reason, so the answer has 'because'.",nudge:"Look at the first word of the question.",hint:"'Why' questions are answered with 'b_ _ _ _ _ _ ...'"});
Q({id:"E05-P3-6",passage:"P3",kind:"full",tag:"CO-FULL",diff:2,src:"orig",stem:"Why did the shopkeepers buy Sunny a new bed? Answer in a full sentence.",keywords:["because"],starter:"The shopkeepers bought Sunny a new bed because ...",
  model:"The shopkeepers bought Sunny a new bed because Sunny's yowling helped to stop the thief.",checklist:["The reason: Sunny helped to stop the thief","Uses words from the question and 'because'","Full sentence with a full stop"],why:"",
  nudge:"What did Sunny do that night?",hint:"Start: 'The shopkeepers bought Sunny a new bed because Sunny h_ _ _ _ _ ...'"});
Q({id:"E05-P3-7",passage:"P3",kind:"tf",tag:"CO-TF",diff:1,src:"orig",stem:"Sunny woke Mrs Lim up at midnight.",truth:true,reason:false,lines:[5,6],
  why:"Sunny yowled at midnight, and Mrs Lim woke up. So it is true.",nudge:"Read lines 6 and 7 again.",hint:"Find the word 'm_ _ _ _ _ _ _'."});
Q({id:"E05-P3-8",passage:"P3",kind:"feel2",tag:"CO-INFER",diff:2,src:"orig",stem:"How did Mrs Lim feel at these two points?",
  rows:[{when:"When she saw the man creeping out (line 7)",options:["proud","frightened","bored"],answer:1,nudge:"How would you feel seeing a stranger at midnight?",hint:"Seeing a stranger at night makes us feel sc_ _ _ _."},
        {when:"When the man dropped the bag and ran away (line 9)",options:["jealous","sleepy","relieved"],answer:2,nudge:"The danger is over. How does that feel?",hint:"When danger is over, we feel r_ _ _ _ _ _ _."}],
  why:"First she was frightened, then relieved when the man ran away.",nudge:"Think about what was happening at each point.",hint:"The first is a sc_ _ _ _ word, the second is a 'ph_ _' word."});
P.P4 = { title:"The Class Garden", lines:[
 "Miss Chen's class planted a vegetable garden behind the school canteen.",
 "Each group took care of one bed of soil.",
 "Hafiz's group grew long beans, and Clara's group grew chilli plants.",
 "One hot week, Clara was sick at home and could not water her group's plants.",
 "Hafiz saw that their leaves were turning brown and dry.",
 "After he watered his own beans, he filled two watering cans and watered the chillies too.",
 "He did this every day until Clara came back.",
 "When she saw the green chilli plants, she could not believe her eyes.",
 "\"Who looked after them?\" she asked.",
 "Hafiz only shrugged and said, \"Plants need water. That's all.\"",
 "At the end of term, the class shared the vegetables at a picnic."]};
Q({id:"E05-P4-1",passage:"P4",kind:"ref",tag:"CO-REF",diff:1,src:"orig",word:"their",line:4,from:[3,4],maxWords:4,stem:"In line 5, whose leaves does 'their' refer to?",accept:["her group's plants","group's plants","plants"],
  why:"The leaves belonged to the plants Clara could not water. 'Their' points back to those plants.",nudge:"Look back at line 4. What could Clara not water?",hint:"They are her group's p_ _ _ _ _."});
Q({id:"E05-P4-2",passage:"P4",kind:"ref",tag:"CO-REF",diff:2,src:"orig",word:"them",line:8,from:[7,8],maxWords:4,stem:"In line 9, what does 'them' refer to? Name the THINGS.",accept:["the green chilli plants","green chilli plants","chilli plants"],
  why:"Clara asked who had looked after the chilli plants she saw in line 8.",nudge:"Look back at line 8. What did Clara see?",hint:"They are the green c_ _ _ _ _ plants."});
Q({id:"E05-P4-3",passage:"P4",kind:"mcq",tag:"CO-REF",diff:3,src:"orig",stem:"In line 7, 'He did this every day'. What does 'this' refer to?",options:["growing long beans","watering Clara's chilli plants","being sick at home","having a picnic"],answer:1,
  why:"'This' points back to what Hafiz did in line 6: he watered the chillies too.",nudge:"'This' can point back to an action. Look at line 6.",hint:"In line 6, Hafiz filled two cans and w_ _ _ _ _ _ the chillies."});
Q({id:"E05-P4-4",passage:"P4",kind:"trait",tag:"CO-CHAR",diff:2,src:"orig",stem:"Which word best describes Hafiz?",options:["rude","greedy","helpful","lazy"],answer:2,lines:[5,6],
  why:"He watered Clara's plants every day while she was sick. That action shows he is helpful.",nudge:"Check what Hafiz DID while Clara was away.",hint:"He gave Clara's group a h_ _ _ _ _ _ hand.",
  nudge2:"Line 5 is what Hafiz SAW. Find what he DID next.",hint2:"Look for the watering c_ _ _."});
Q({id:"E05-P4-5",passage:"P4",kind:"full",tag:"CO-CHAR",diff:3,src:"orig",stem:"How would you describe Hafiz? Give a reason from the story.",keywords:["because"],starter:"Hafiz is ___ because he ___.",
  model:"Hafiz is helpful because he watered Clara's chilli plants every day while she was sick. (Also fine: humble, because he only shrugged and did not boast.)",checklist:TRAIT_CHECK,why:"",
  nudge:"Say what kind of person he is, then the action that proves it.",hint:"Hafiz is ____ because he ____ (something he did)."});
Q({id:"E05-P4-6",passage:"P4",kind:"lift",tag:"CO-LIFT",diff:2,src:"orig",from:[7],stem:"Which phrase in line 8 shows that Clara was very surprised? Tap the words.",accept:["could not believe her eyes","she could not believe her eyes"],
  why:"'Could not believe her eyes' means she was very surprised.",nudge:"Find the words about her eyes.",hint:"It ends with 'her e_ _ _'."});
Q({id:"E05-P4-7",passage:"P4",kind:"seq",tag:"CO-SEQ",diff:1,src:"orig",events:["Clara came back to school.","The class planted a garden.","Hafiz watered the chillies."],order:[1,2,0],
  why:"The garden came first, then Hafiz watered the chillies, and then Clara came back.",nudge:"Find each event in the story.",hint:"Planting is in line _, watering is in line _, coming back is in line _."});
Q({id:"E05-P4-8",passage:"P4",kind:"full",tag:"CO-FULL",diff:3,src:"orig",stem:"What lesson can we learn from Hafiz? Answer in a full sentence.",keywords:["we","should","learn"],starter:"We should ...",
  model:"We should help others even when nobody asks us to.",checklist:["The lesson is about helping others or doing good quietly","A full sentence, for example starting 'We should ...'","Ends with a full stop"],why:"",
  nudge:"Think about what Hafiz did without being asked.",hint:"Start: 'We should ...' and think of what Hafiz did for C_ _ _ _."});
P.P5 = { title:"The Wallet at the Food Centre", lines:[
 "Ben and his dad were eating chicken rice at a busy food centre.",
 "Ben spotted a brown wallet lying under the next table.",
 "He picked it up and looked inside.",
 "There was some money and a card with a lady's photo.",
 "Dad said they could take it to the police, but Ben had another idea.",
 "He walked slowly around the food centre, looking at every face.",
 "At last, he saw a lady near the drinks stall searching her handbag with a worried frown.",
 "Her face matched the photo on the card.",
 "Ben handed her the wallet, and she thanked him again and again.",
 "She tried to give him ten dollars, but Ben shook his head politely.",
 "On the way home, Dad patted Ben's shoulder and said he was proud of him."]};
Q({id:"E05-P5-1",passage:"P5",kind:"qword",tag:"CO-QW",diff:1,src:"orig",ask:"What kind of answer does this question need?",stem:"Who did Ben give the wallet to?",options:QW_OPTS,answer:0,
  why:"'Who' asks for a person: the lady.",nudge:"Look at the first word of the question.",hint:"'Who' is a question about a p_ _ _ _ _."});
Q({id:"E05-P5-2",passage:"P5",kind:"ref",tag:"CO-REF",diff:1,src:"orig",word:"it",line:2,from:[1,2],maxWords:3,stem:"In line 3, what does 'it' refer to?",accept:["a brown wallet","brown wallet","wallet"],
  why:"Ben picked up the wallet he spotted. 'It' points back to the wallet.",nudge:"Look back at line 2. What did Ben spot?",hint:"It is a brown w_ _ _ _ _."});
Q({id:"E05-P5-3",passage:"P5",kind:"ref",tag:"CO-REF",diff:2,src:"orig",word:"Her",line:7,from:[6,7],maxWords:3,stem:"In line 8, who does 'Her' refer to?",accept:["a lady","lady"],
  why:"The lady near the drinks stall is the one whose face matched the photo.",nudge:"Look back at line 7. Who did Ben see?",hint:"It is a l_ _ _ near the drinks stall."});
Q({id:"E05-P5-4",passage:"P5",kind:"trait",tag:"CO-CHAR",diff:2,src:"orig",stem:"Which word best describes Ben?",options:["greedy","careless","rude","honest"],answer:3,lines:[8,9],
  why:"He gave the wallet back and would not take the ten dollars. Those actions show he is honest.",nudge:"Check what Ben DID with the wallet and the money.",hint:"He did not keep what was not his. That is being h_ _ _ _ _.",
  nudge2:"Line 2 is what Ben SPOTTED. Find what he DID with the wallet in the end.",hint2:"Look for 'Ben h_ _ _ _ _ her the wallet'."});
Q({id:"E05-P5-5",passage:"P5",kind:"full",tag:"CO-CHAR",diff:3,src:"orig",stem:"How would you describe Ben? Give a reason from the story.",keywords:["because"],starter:"Ben is ___ because he ___.",
  model:"Ben is honest because he returned the wallet to the lady and did not take the ten dollars. (Also fine: clever, because he matched her face to the photo.)",checklist:TRAIT_CHECK,why:"",
  nudge:"Say what kind of person he is, then the action that proves it.",hint:"Ben is ____ because he ____ (something he did)."});
Q({id:"E05-P5-6",passage:"P5",kind:"tf",tag:"CO-TF",diff:3,src:"orig",stem:"Ben kept the ten dollars that the lady offered.",truth:false,reason:true,lines:[9],
  keywords:["false","true"],starter:"False. ...",model:"False. Ben shook his head politely when she tried to give him ten dollars.",
  checklist:["Ticked False","The reason comes from the story (he shook his head / did not take it)","Full sentence with a full stop"],
  why:"Line 10 says Ben shook his head, so he did not keep it.",nudge:"Find the part about the ten dollars.",hint:"Look for 'ten d_ _ _ _ _ _'.",nudge2:"Tap the line about the ten dollars.",hint2:"It is near the end of the story."});
Q({id:"E05-P5-7",passage:"P5",kind:"mcq",tag:"CO-INFER",diff:1,src:"orig",stem:"How did the lady feel before Ben found her?",options:["excited","proud","worried","sleepy"],answer:2,
  why:"She was searching her handbag with a frown, so she was worried.",nudge:"Look at what her face was doing in line 7.",hint:"A frown while searching shows she was w_ _ _ _ _ _."});
Q({id:"E05-P5-8",passage:"P5",kind:"evidence",tag:"CO-INFER",diff:2,src:"orig",stem:"Ben made sure he found the right owner.",lines:[7],
  why:"Line 8 shows he checked her face against the photo on the card.",nudge:"How could Ben know the lady was the owner?",hint:"Find the line about the p_ _ _ _ on the card."});

window.GAME = {
  slug:"story-sleuth", code:"G-E05", key:"eng.sleuth", title:"Story Sleuth", emoji:"🔎",
  level:"P3", tagLine:"P3 · Comprehension · CO-REF · CO-CHAR · CO-*",
  intro:"Be a story detective! Read the story, point back to find what 'it' and 'them' mean, and prove what the characters are like.",
  tags:["CO-REF","CO-CHAR","CO-LIFT","CO-SEQ","CO-TF","CO-INFER","CO-FULL","CO-QW"], focusTags:["CO-REF","CO-CHAR"],
  rule:{ title:"Story Sleuth secret rules",
    list:["Read the whole story first. Tap 🔊 to hear it.",
      "⬅ Point back: for it, they, them, these, find the word, look BACK, and name the THING in a few words. Never copy the whole sentence.",
      "Character words: check what the character DID. Kind-hearted? Show me the kind ACTION.",
      "Question words: Who = a person. Where = a place. When = a time. Why = because ...",
      "Full sentence: use words from the question, past tense, end with a full stop. 'He is ___ because he ___.'"],
    say:"Here are the Story Sleuth rules. Read the whole story first. Point back: when you see it, they, them or these, find the word, look back, and name the thing in a few words. Never copy the whole sentence. For character words, check what the character did. Kind hearted? Show me the kind action. Who means a person, where means a place, when means a time, and why means because. Answer in a full sentence, and end with a full stop." },
  worked:{ passage:["Lina found two shells on the beach.","She washed them and gave one to her friend Dev."], stem:"In line 2, what does 'them' refer to?", options:[],
    steps:[
      {text:"Step 1: Find the word 'them' in line 2.", mark:"them", line:1, say:"Step 1. Find the word them in line 2."},
      {text:"Step 2: ⬅ Look BACK. What did Lina wash? Look at line 1.", line:0, say:"Step 2. Look back. What did Lina wash? Look at line 1."},
      {text:"Step 3: Name the THING in a few words: two shells. Not the whole sentence 'She washed them and gave one'.", say:"Step 3. Name the thing in a few words: two shells. Do not copy the whole sentence."}
    ]},
  passages:P, lessonPassage:"LP", items:I,
  lesson:["E05-L1","E05-L2","E05-L3","E05-L4","E05-L5"],
  paper:{ title:"Paper step: Comprehension on paper",
    instructions:["Get a pencil and paper. Read the story twice.","Write the answers on paper, exactly like in the exam.","For question 2, write a full sentence: 'He is ___ because he ___.'","For question 3, write True or False, then the reason."],
    passage:["Wei and his grandpa went fishing at the pier.","Grandpa gave him a small rod and a box of bait.","Wei dropped it on the floor, and the bait spilled everywhere.","A boy nearby helped Wei to pick up all the bait.","Then the boy showed Wei how to tie the hook."],
    questions:["What does 'it' in line 3 refer to? (Name the thing.)","How would you describe the boy? Give a reason from the story.","Grandpa gave Wei a big rod. True or False? Give a reason."],
    answers:["(1) a box of bait / the box of bait (not 'a small rod'; not the whole sentence)","(2) The boy is kind/helpful because he helped Wei to pick up the bait (or showed him how to tie the hook). Trait + an action, full sentence, full stop.","(3) False. Grandpa gave him a small rod (line 2)."],
    checklist:["Q1 names just the thing, in a few words","Q2 trait word fits","Q2 reason is an ACTION from the story","Full sentences end with a full stop","Q3 has True/False and a reason from the story"] }
};
})();
