/* ═══════════════════════════════════════════════════════════════
   PATHFINDER — Career Discovery System
   script.js
   ═══════════════════════════════════════════════════════════════ */

"use strict";

/* ───────────────────────────────────────────────────────────────
   DIMENSION KEYS
   A = Analytical   S = Social   C = Creative   P = Practical
─────────────────────────────────────────────────────────────────*/

/* ───────────────────────────────────────────────────────────────
   20 SCENARIO-BASED QUESTIONS
─────────────────────────────────────────────────────────────────*/
const QUESTIONS = [
  {
    category: "Decision Making",
    text: "Your school group needs to present a project on climate change. What role do you naturally take?",
    options: [
      { text: "Research the data, facts, and statistics to make sure our arguments are airtight.", dim: "A" },
      { text: "Make sure everyone contributes and keep the team motivated and on track.", dim: "S" },
      { text: "Design the visual layout and think of a creative way to communicate the message.", dim: "C" },
      { text: "Build a clear plan, assign tasks, and make sure we hit every deadline.", dim: "P" },
    ]
  },
  {
    category: "Problem Solving",
    text: "You discover a bug in your school's online homework system that causes students to lose their work. What's your first move?",
    options: [
      { text: "Try to understand exactly why it's happening — trace the logic and find the root cause.", dim: "A" },
      { text: "Alert other students and teachers so no one else loses their work.", dim: "S" },
      { text: "Think of an unconventional workaround that others might not have considered.", dim: "C" },
      { text: "Document the steps to reproduce the bug and report it systematically to the IT team.", dim: "P" },
    ]
  },
  {
    category: "Work Style",
    text: "You have a free Saturday to work on something personally meaningful. What are you most likely doing?",
    options: [
      { text: "Studying something complex — economics, coding, philosophy — just to understand it deeply.", dim: "A" },
      { text: "Spending time with people, organizing a meetup, or helping a friend through a problem.", dim: "S" },
      { text: "Creating something: music, art, a video, a story, or designing something.", dim: "C" },
      { text: "Tackling a project from your to-do list — building, fixing, or organizing something concrete.", dim: "P" },
    ]
  },
  {
    category: "Social Preference",
    text: "You're about to start a month-long project. Which setup sounds most appealing?",
    options: [
      { text: "Working alone on complex analysis — data, code, or research — with minimal interruptions.", dim: "A" },
      { text: "Collaborating closely with others, constant communication and shared ideas.", dim: "S" },
      { text: "A creative studio setup — brainstorming freely, no rigid structure, lots of experimentation.", dim: "C" },
      { text: "A clear workflow with defined milestones, responsibilities, and measurable outcomes.", dim: "P" },
    ]
  },
  {
    category: "Motivation",
    text: "Which of these would make you feel most accomplished at the end of a day?",
    options: [
      { text: "I solved a really complex problem that took hours of focused thinking.", dim: "A" },
      { text: "I genuinely helped someone and made a real difference in their situation.", dim: "S" },
      { text: "I made something original that didn't exist before — and it turned out great.", dim: "C" },
      { text: "I ticked off every item on my list and everything is organized and running smoothly.", dim: "P" },
    ]
  },
  {
    category: "Learning Style",
    text: "You need to learn something completely new and difficult. What approach works best for you?",
    options: [
      { text: "Understand the theory first — read deeply, take notes, map out how it all connects.", dim: "A" },
      { text: "Find a mentor or a group and learn through conversation and feedback.", dim: "S" },
      { text: "Experiment freely — try things, make mistakes, and discover through exploration.", dim: "C" },
      { text: "Follow a structured tutorial or course with clear steps and practice exercises.", dim: "P" },
    ]
  },
  {
    category: "Conflict & Challenge",
    text: "Two friends in your group are giving conflicting advice on an important decision you face. How do you handle it?",
    options: [
      { text: "Analyze both arguments logically — look for data and evidence to determine which is right.", dim: "A" },
      { text: "Talk to both of them individually, understand their reasoning, and find a way to honor both.", dim: "S" },
      { text: "Trust your gut and think creatively — maybe there's a third option neither suggested.", dim: "C" },
      { text: "Make a pros and cons list, then commit to the most practical and actionable choice.", dim: "P" },
    ]
  },
  {
    category: "Environment",
    text: "You're choosing between two internships. Both are equally prestigious. Which do you pick?",
    options: [
      { text: "A tech or finance firm where you'll analyze data, build models, or work on research.", dim: "A" },
      { text: "A non-profit or community org where you'll work directly with people and create impact.", dim: "S" },
      { text: "A design studio or media company where you'll work on creative briefs and visual projects.", dim: "C" },
      { text: "A logistics or operations team where you'll optimize systems and see direct, tangible results.", dim: "P" },
    ]
  },
  {
    category: "Success Definition",
    text: "Imagine your life at 30 — you feel genuinely successful. What does that look like?",
    options: [
      { text: "I've mastered a highly specialized technical or intellectual field and I'm known for my expertise.", dim: "A" },
      { text: "I've built deep relationships and know that I've positively influenced the people around me.", dim: "S" },
      { text: "I've built something original — a brand, a product, an artwork — that has my fingerprints on it.", dim: "C" },
      { text: "I run a smooth, high-performing team or organization with clear systems and measurable results.", dim: "P" },
    ]
  },
  {
    category: "Pressure & Stress",
    text: "You have a big exam in 3 days, and you realize your notes are incomplete. What do you do?",
    options: [
      { text: "Deep-dive into the core concepts — understand why things work, not just what they are.", dim: "A" },
      { text: "Form a study group immediately and share notes with classmates.", dim: "S" },
      { text: "Create visual mind maps, stories, or diagrams to encode the material creatively.", dim: "C" },
      { text: "Make a focused 3-day study plan with specific topics per session and stick to it strictly.", dim: "P" },
    ]
  },
  {
    category: "Curiosity",
    text: "You're watching a documentary. Which topic would hold your attention completely?",
    options: [
      { text: "How the human brain works, or the mathematics behind the universe.", dim: "A" },
      { text: "How different cultures live, raise children, or resolve conflict.", dim: "S" },
      { text: "How artists or innovators created their most iconic works.", dim: "C" },
      { text: "How businesses, hospitals, or cities operate efficiently at scale.", dim: "P" },
    ]
  },
  {
    category: "Risk & Ambiguity",
    text: "A friend invites you to co-found a startup with a vague but exciting idea. How do you respond?",
    options: [
      { text: "I'd want to research the market, validate assumptions, and run the numbers before deciding.", dim: "A" },
      { text: "I'd focus on whether we have a strong team dynamic and if we share the same values.", dim: "S" },
      { text: "I'm excited — the ambiguity is the fun part. Let's explore and figure it out as we go.", dim: "C" },
      { text: "I'd agree only once we have a clear plan, responsibilities, and an execution timeline.", dim: "P" },
    ]
  },
  {
    category: "Feedback & Criticism",
    text: "You receive harsh feedback on a project you worked hard on. What's your natural reaction?",
    options: [
      { text: "I want to understand precisely what went wrong and how to fix each specific flaw.", dim: "A" },
      { text: "I focus on the relationship — is the feedback delivered with respect? Does this person care?", dim: "S" },
      { text: "I view it as creative fuel — I'll take what's useful and reinterpret the rest.", dim: "C" },
      { text: "I make an action plan to address every point of criticism systematically.", dim: "P" },
    ]
  },
  {
    category: "Leadership Style",
    text: "If you were running a team of 10 peers on an important project, how would you lead?",
    options: [
      { text: "Set a clear intellectual framework and lead through data-driven decisions.", dim: "A" },
      { text: "Focus on building trust, listening to everyone, and creating psychological safety.", dim: "S" },
      { text: "Keep the vision bold and inspiring — give people creative freedom within the goal.", dim: "C" },
      { text: "Create strong systems, assign ownership, and track progress with clear metrics.", dim: "P" },
    ]
  },
  {
    category: "Technology & Tools",
    text: "You discover a new powerful technology (like AI or robotics). What's your instinct?",
    options: [
      { text: "I want to understand how it actually works under the hood — the algorithms and data.", dim: "A" },
      { text: "I think about who this will impact and whether it will help or harm communities.", dim: "S" },
      { text: "I imagine all the creative possibilities — new products, art forms, or experiences it enables.", dim: "C" },
      { text: "I think about how to implement it practically and integrate it into existing systems.", dim: "P" },
    ]
  },
  {
    category: "Values",
    text: "Which of these outcomes would make your career feel most meaningful?",
    options: [
      { text: "I solved problems others couldn't — pushing the limits of what's possible.", dim: "A" },
      { text: "I helped people at a fundamental level — health, education, or emotional wellbeing.", dim: "S" },
      { text: "I changed how people see the world through my creative output.", dim: "C" },
      { text: "I built something that functions at scale and touches millions of lives efficiently.", dim: "P" },
    ]
  },
  {
    category: "Interpersonal Dynamics",
    text: "You're in a meeting and someone proposes a plan you think is flawed. What do you do?",
    options: [
      { text: "Politely but firmly present the logical flaws with specific evidence.", dim: "A" },
      { text: "Wait for the right moment and share my concerns privately, focusing on the person's feelings.", dim: "S" },
      { text: "Suggest a completely different angle — reframe the problem from scratch.", dim: "C" },
      { text: "Point to the implementation risks and suggest concrete changes to make it work.", dim: "P" },
    ]
  },
  {
    category: "Long-term Thinking",
    text: "When you think 10 years into the future, which vision excites you most?",
    options: [
      { text: "I'm a leading expert in a complex field — consulted by companies, writing research.", dim: "A" },
      { text: "I'm leading a team or organization that creates real change in people's lives.", dim: "S" },
      { text: "I've built a brand or creative body of work that is uniquely mine.", dim: "C" },
      { text: "I manage high-performing operations or own a business with proven, scalable systems.", dim: "P" },
    ]
  },
  {
    category: "Energy Source",
    text: "After an intense week at work, what genuinely restores your energy?",
    options: [
      { text: "Diving into an intellectually stimulating book, puzzle, or concept.", dim: "A" },
      { text: "Spending quality time with close friends or family — real conversations.", dim: "S" },
      { text: "Making something: cooking, drawing, playing music, or tinkering with a personal project.", dim: "C" },
      { text: "Getting organized, cleaning your space, or completing a home project.", dim: "P" },
    ]
  },
  {
    category: "Identity",
    text: "If you had to describe yourself in one sentence, which feels truest?",
    options: [
      { text: "I'm someone who figures out how things really work and uses that knowledge strategically.", dim: "A" },
      { text: "I'm someone who builds bridges between people and helps everyone find their best.", dim: "S" },
      { text: "I'm someone who sees the world differently and expresses it in original ways.", dim: "C" },
      { text: "I'm someone who gets things done — reliably, efficiently, and to a high standard.", dim: "P" },
    ]
  }
];

/* ───────────────────────────────────────────────────────────────
   CAREER DATABASE
   Each career: id, title, dims (primary), fit template (uses {profile}),
   skills, future, roadmap phases, backup flag
─────────────────────────────────────────────────────────────────*/
const CAREERS = [
  // ANALYTICAL
  {
    id: "data_scientist",
    title: "Data Scientist / AI Engineer",
    dims: { A: 5, S: 1, C: 2, P: 2 },
    fitTemplate: "Your high analytical score signals that you thrive on pattern recognition and structured problem-solving — exactly what data science demands. You're drawn to understanding how things really work, which translates directly into building and interpreting machine learning models. {profile} This career lets your mind do what it does best: find signal in noise.",
    skills: ["Python / R / SQL", "Machine Learning", "Statistical Analysis", "Data Visualization", "Critical Thinking"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Very strong — AI/ML roles expanding 35%+ by 2030",
      stability: "Strong",
      narrative: "Demand for AI and data roles is accelerating globally. Ironically, AI augments data scientists rather than replacing them — you'll use AI tools to do more sophisticated work, faster. Expertise in this domain becomes more valuable as organizations generate more data."
    },
    roadmap: {
      p1: ["Learn Python basics (variables, loops, functions)", "Complete an intro statistics course", "Explore datasets on Kaggle with guided notebooks", "Understand what ML is with beginner YouTube courses", "Build a simple data analysis project (e.g., sports stats)"],
      p2: ["Master pandas, NumPy, and matplotlib libraries", "Complete a structured ML course (Andrew Ng's ML Specialization)", "Learn SQL for database querying", "Build 3 personal projects: prediction, classification, visualization", "Start competing in beginner Kaggle competitions"],
      p3: ["Apply for data analyst internship or volunteer on open-source ML projects", "Build a GitHub portfolio with documented projects", "Learn deep learning basics (TensorFlow or PyTorch)", "Publish a simple blog post or analysis that demonstrates expertise", "Network in data science communities (LinkedIn, Kaggle, Discord)"],
      p4: ["Specialize: NLP, Computer Vision, MLOps, or AI Ethics", "Contribute to research papers or open-source AI projects", "Build domain expertise in finance, health, or climate — where ML is transformative", "Mentor junior analysts and present at conferences", "Pursue advanced certifications or a Master's in Data Science or CS"]
    }
  },
  {
    id: "software_engineer",
    title: "Software Engineer",
    dims: { A: 4, S: 1, C: 2, P: 3 },
    fitTemplate: "Your analytical-practical combination is the classic engineering profile. You like understanding systems from first principles and you get satisfaction from building things that actually work. {profile} Software engineering gives you a canvas where logic and structure combine to create products used by millions.",
    skills: ["Programming (Python, JS, Java)", "System Design", "Algorithms & Data Structures", "Version Control (Git)", "Problem Decomposition"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Consistent — 25% growth expected, AI tools elevate productivity not replace",
      stability: "Very strong",
      narrative: "Software engineering remains one of the most resilient careers in the face of AI. Tools like GitHub Copilot augment engineers rather than replacing them — the demand for engineers who can architect, review, and deploy systems is growing, not shrinking. Specialists in AI systems, security, and distributed systems are especially sought-after."
    },
    roadmap: {
      p1: ["Pick a first language: JavaScript or Python", "Complete FreeCodeCamp or CS50x online course", "Build 2 beginner projects: a calculator, a to-do app", "Learn Git basics — commits, branches, pull requests", "Understand how the web works (HTML, CSS, HTTP basics)"],
      p2: ["Learn data structures: arrays, trees, graphs, hash maps", "Practice 50+ algorithm challenges on LeetCode", "Build a full-stack web app with a backend and database", "Learn one framework: React, Node.js, Django, or Spring", "Study system design fundamentals (scaling, APIs, databases)"],
      p3: ["Land a software internship or contribute to open-source projects", "Build 2 portfolio projects solving real problems", "Participate in hackathons and coding competitions", "Learn cloud basics (AWS, GCP, or Azure fundamentals)", "Start reading engineering blogs from top tech companies"],
      p4: ["Specialize: backend, frontend, mobile, DevOps, security, or ML engineering", "Contribute meaningfully to major open-source projects", "Develop expertise in system architecture and technical leadership", "Mentor junior devs; become the go-to person for a technical domain", "Pursue senior or staff engineer roles with end-to-end ownership"]
    }
  },
  {
    id: "financial_analyst",
    title: "Financial Analyst / Quantitative Researcher",
    dims: { A: 5, S: 1, C: 1, P: 3 },
    fitTemplate: "Your strong analytical reasoning and preference for structured problem-solving maps perfectly onto finance. You're energized by complexity, precision, and strategic thinking. {profile} Financial analysis rewards people who can decode complexity, spot hidden patterns, and make high-stakes decisions with confidence.",
    skills: ["Financial Modeling", "Excel / Python", "Statistical Analysis", "Economic Reasoning", "Risk Assessment"],
    future: {
      demand: "Medium",
      aiRisk: "Medium",
      growth: "Steady — quant and tech-integrated finance roles growing fast",
      stability: "Strong in specialized areas",
      narrative: "Routine financial analysis is increasingly automated. However, quantitative analysts, investment strategists, and those with coding skills (Python, R) remain in high demand. The highest-value finance professionals combine technical depth with business judgment — a combination AI cannot replicate."
    },
    roadmap: {
      p1: ["Learn Excel advanced functions (VLOOKUP, pivot tables, financial formulas)", "Read 'The Intelligent Investor' by Benjamin Graham", "Understand the three financial statements (income, balance, cash flow)", "Take a free intro course on financial markets (Coursera, Khan Academy)", "Follow financial news daily (FT, Bloomberg, WSJ)"],
      p2: ["Learn Python for finance (pandas, yfinance, matplotlib)", "Build a stock portfolio tracker or analysis tool", "Study valuation methods: DCF, comparables, precedent transactions", "Complete the CFA Level 1 exam prep as a stretch goal", "Simulate a mock investment portfolio and track your thesis"],
      p3: ["Seek internships at investment banks, funds, or fintech startups", "Compete in CFA Research Challenge or stock pitch competitions", "Build models: LBO, merger model, DCF with real company data", "Network at finance events and connect with professionals on LinkedIn", "Develop a thesis-driven view on a sector or stock"],
      p4: ["Specialize: equities, fixed income, quant trading, PE, or venture capital", "Pursue CFA Charter or MBA from a target school if buy-side is the goal", "Build track record with documented investment calls or models", "Develop cross-functional expertise in tech + finance or health + finance", "Position for portfolio management or chief analyst roles"]
    }
  },
  // SOCIAL
  {
    id: "psychologist",
    title: "Clinical Psychologist / Therapist",
    dims: { A: 2, S: 5, C: 1, P: 2 },
    fitTemplate: "Your dominant social profile — high empathy, strong interpersonal instincts, and a desire to make a difference in people's lives — is the precise combination that makes exceptional psychologists. {profile} This career places you at the intersection of science and human connection, where your ability to understand people becomes a force for healing.",
    skills: ["Active Listening", "Empathy & Emotional Intelligence", "Psychological Theory", "Assessment Methods", "Ethical Judgment"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Strong — mental health demand surging globally",
      stability: "Very strong",
      narrative: "Mental health care is experiencing a global crisis of demand that far outpaces supply. AI can supplement therapy tools but cannot replace the trust, attunement, and human connection central to effective therapy. Psychologists specializing in trauma, technology-related stress, or adolescent mental health will be particularly sought-after."
    },
    roadmap: {
      p1: ["Read introductory psychology books (Sapolsky, Frankl, Yalom)", "Take AP Psychology or an online intro course", "Volunteer or shadow at a local counseling center", "Keep a reflective journal to develop self-awareness", "Learn about the major therapeutic frameworks (CBT, DBT, psychodynamic)"],
      p2: ["Pursue a psychology-focused curriculum at university", "Take research methods and statistics courses seriously", "Join a mental health awareness club or peer support group", "Read case studies and published therapy transcripts", "Learn about neuropsychology and the biology of behavior"],
      p3: ["Complete supervised clinical hours (required for licensure)", "Apply for practicum placements at clinics or hospitals", "Begin your master's or doctoral program in clinical or counseling psychology", "Present at a student psychology conference", "Pursue specialized training in a therapeutic modality (e.g., CBT, ACT)"],
      p4: ["Obtain full licensure (LPC, LCSW, Psychologist license)", "Specialize: trauma, addiction, couples, child/adolescent, or sports psychology", "Build a private practice or join an established group practice", "Contribute to research or write accessible mental health content", "Mentor new therapists and supervise clinical interns"]
    }
  },
  {
    id: "educator",
    title: "Education Leader / Learning Designer",
    dims: { A: 2, S: 4, C: 2, P: 2 },
    fitTemplate: "Your social strengths — empathy, communication, and genuine investment in others' growth — combined with your broader profile point strongly toward education and learning design. {profile} The future of education isn't about content delivery; it's about human transformation. That's where people like you create irreplaceable impact.",
    skills: ["Curriculum Design", "Communication", "Facilitation", "Empathy", "Adaptive Teaching Methods"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Strong — EdTech and instructional design expanding fast",
      stability: "Stable",
      narrative: "While basic instruction faces automation pressure, the design of learning experiences, mentorship, and educational leadership are increasingly valued. Education technology companies, corporate L&D departments, and innovative school models are all hiring people who can design transformative learning. Entrepreneurial educators who blend technology with human-centered pedagogy are especially in demand."
    },
    roadmap: {
      p1: ["Tutor classmates or younger students in your strong subjects", "Explore Khan Academy, Coursera, or Duolingo from a designer's perspective", "Read 'The Art and Science of Teaching' by Robert Marzano", "Reflect on your best and worst learning experiences — analyze why", "Volunteer at a library reading program or youth organization"],
      p2: ["Study learning science: cognitive load theory, spaced repetition, retrieval practice", "Learn basic instructional design principles (ADDIE, Bloom's Taxonomy)", "Build a mini-course or tutorial on something you know well", "Explore tools: Notion, Figma, Canva, LMS platforms (Google Classroom)", "Study child and adolescent development psychology"],
      p3: ["Student teach or assist in educational programs", "Design and deliver a workshop or course for peers", "Intern at an EdTech company or curriculum design firm", "Build a portfolio of learning materials, lesson plans, and course designs", "Develop expertise in a subject area where you can add deep value"],
      p4: ["Specialize: corporate L&D, EdTech product design, special education, higher ed, or policy", "Lead curriculum development at a school or organization", "Build your own educational platform, YouTube channel, or podcast", "Present at education conferences and publish learning research", "Move into school leadership, education entrepreneurship, or policy roles"]
    }
  },
  {
    id: "ux_researcher",
    title: "UX Researcher / Human-Centered Designer",
    dims: { A: 2, S: 4, C: 2, P: 2 },
    fitTemplate: "UX research sits at the intersection of people and design — exactly where your social and creative instincts shine. You're driven to understand how people think, feel, and behave, and you care deeply about making things work better for real humans. {profile} Your empathy is a competitive advantage in a field where many designers skip the listening part.",
    skills: ["User Interviews", "Research Methods", "Empathy Mapping", "Data Synthesis", "Communication"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Fast growing — user research now core to all product teams",
      stability: "Strong",
      narrative: "As products become more complex and AI-generated, the human factor in design becomes more critical, not less. Companies are expanding UX research teams because they've learned that building without listening to users is expensive. Mixed-methods researchers who can combine qualitative empathy with quantitative rigor are particularly valued."
    },
    roadmap: {
      p1: ["Read 'Don't Make Me Think' by Steve Krug and 'The Design of Everyday Things'", "Interview 5 people about a problem they face — practice active listening", "Try free UX tools: Figma, Maze, or Optimal Workshop", "Analyze apps and websites you use daily — what works, what doesn't?", "Take a free intro UX course (Google UX Design Certificate on Coursera)"],
      p2: ["Learn research methods: usability testing, card sorting, tree testing, surveys", "Practice affinity mapping and synthesizing qualitative data", "Complete a full UX case study: research → insights → recommendations", "Learn basic Figma for wireframing and prototyping", "Study cognitive psychology and behavioral economics"],
      p3: ["Intern at a product company, agency, or startup in a UX role", "Build a portfolio of 3 in-depth research case studies", "Run a real usability test and present findings to stakeholders", "Network in UX communities (UX Collective, UXPA, LinkedIn)", "Contribute to design critiques and peer learning groups"],
      p4: ["Specialize: enterprise research, accessibility, conversational UX, or healthcare", "Develop a mixed-methods research practice (qual + quant)", "Lead research at scale — set research strategy for product teams", "Publish research insights publicly to build thought leadership", "Mentor junior researchers and advocate for research-led design"]
    }
  },
  // CREATIVE
  {
    id: "product_designer",
    title: "Product Designer / Creative Director",
    dims: { A: 1, S: 2, C: 5, P: 2 },
    fitTemplate: "Your creative dominance is clear — you see possibilities others don't, you think visually, and you're energized by making things that didn't exist before. {profile} Product design combines creative vision with real-world constraints, and creative directors shape the visual and experiential identity of entire organizations. This is where your imagination becomes leverage.",
    skills: ["Visual Design", "Figma / Adobe Creative Suite", "Typography & Color Theory", "Brand Identity", "Creative Strategy"],
    future: {
      demand: "High",
      aiRisk: "Medium",
      growth: "Strong — design leadership and creative strategy increasingly valued",
      stability: "Strong in leadership roles",
      narrative: "AI is changing the execution side of design (Midjourney, Figma AI), but creative direction, taste, and strategy cannot be automated. Senior designers who combine creative vision with product thinking and business acumen are extraordinarily valuable. The designers who lose ground are those who only execute; the ones who thrive are those who think strategically about design."
    },
    roadmap: {
      p1: ["Learn Figma (free tier) — practice components, frames, auto-layout", "Study design fundamentals: typography, color, grid, spacing", "Redesign 3 apps you think are poorly designed — document your reasoning", "Follow designers you admire on Dribbble, Behance, and Are.na", "Read 'The Shape of Design' by Frank Chimero"],
      p2: ["Complete end-to-end product design projects (wireframe → prototype → test)", "Study branding and visual identity design", "Learn design systems — create your own component library", "Practice daily design challenges (Dailyui.co)", "Study human psychology as it applies to visual perception"],
      p3: ["Build a portfolio with 4–5 case studies showing process, not just outcomes", "Intern at a design agency, tech startup, or in-house creative team", "Collaborate with developers on real projects to understand handoff", "Submit work to design awards and student competitions", "Get feedback from senior designers — actively seek critique"],
      p4: ["Specialize: product design, brand identity, motion design, or creative leadership", "Develop a distinctive design perspective and aesthetic point of view", "Lead design teams — move from maker to creative director", "Build design thinking workshops and present at design conferences", "Found a studio or build a personal design brand with global reach"]
    }
  },
  {
    id: "entrepreneur",
    title: "Entrepreneur / Startup Founder",
    dims: { A: 2, S: 2, C: 4, P: 2 },
    fitTemplate: "Your creative drive combined with your ability to generate novel ideas and tolerate ambiguity is the DNA of entrepreneurship. You're not satisfied with the way things are — you always see how they could be different. {profile} The greatest founders in history weren't the most technical or the most connected — they were the most compelled to create something new.",
    skills: ["Creative Problem Solving", "Storytelling & Pitching", "Product Thinking", "Resilience", "Customer Empathy"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Expanding — AI dramatically lowers barriers to starting companies",
      stability: "Variable, but high ceiling",
      narrative: "AI is a massive tailwind for entrepreneurs — it reduces the cost of building software, marketing, and operations. First-time founders can now build in months what used to take years. The best entrepreneurs will be those who combine creative vision with the ability to build with AI tools. The opportunity space is larger than it has ever been."
    },
    roadmap: {
      p1: ["Read 'The Lean Startup' by Eric Ries and 'Zero to One' by Peter Thiel", "Identify 5 problems in your daily life worth solving", "Talk to 20 people about one of those problems — validate the pain", "Launch something tiny: sell handmade items, offer a service, build a landing page", "Study successful startups at your age (e.g., Moziah Bridges, Mikaila Ulmer)"],
      p2: ["Build an MVP — a minimum viable product that tests one core assumption", "Learn the basics of business models and unit economics", "Join a startup accelerator program for youth (YC's Startup School, etc.)", "Learn to pitch: tell a compelling story in under 3 minutes", "Build an audience or community around a problem you care about"],
      p3: ["Apply to startup competitions and pitch events", "Find co-founders or advisors who complement your weaknesses", "Test revenue: can you get someone to pay for what you're building?", "Learn financial basics: revenue, margins, burn rate, runway", "Network with founders 2–3 years ahead of you"],
      p4: ["Raise funding or grow revenue to scale your idea", "Build and lead a team — transition from maker to CEO", "Develop a second-time founder mindset: fail fast, learn, pivot, or double down", "Give back: mentor next-generation founders and share your story", "Consider a portfolio approach — serial entrepreneurship or angel investing"]
    }
  },
  {
    id: "content_media",
    title: "Content Creator / Media Strategist",
    dims: { A: 1, S: 3, C: 5, P: 1 },
    fitTemplate: "Your creative expression combined with a social awareness of audiences and storytelling makes content creation and media strategy a natural home. You think in narratives, formats, and emotions. {profile} The creator economy is one of the fastest-growing sectors in the world, and the most successful creators combine creative authenticity with strategic thinking.",
    skills: ["Storytelling", "Video / Audio Production", "Audience Psychology", "Distribution Strategy", "Brand Building"],
    future: {
      demand: "High",
      aiRisk: "Medium",
      growth: "Explosive — creator economy projected at $500B+ by 2027",
      stability: "Variable, strong for strategic operators",
      narrative: "The creator economy is accelerating. AI generates content but it cannot generate authentic human perspective, which is exactly what audiences are starving for. Creators who build genuine communities and master distribution strategy will be highly valued — both as independent operators and inside media companies and brands."
    },
    roadmap: {
      p1: ["Start creating content on any platform — even imperfect content", "Study creators you admire: analyze what makes their content work", "Learn video editing basics (DaVinci Resolve — free) or audio editing (Audacity)", "Write a weekly essay or newsletter on a topic you care about", "Understand YouTube/Instagram/TikTok algorithms at a basic level"],
      p2: ["Develop a consistent voice, niche, and posting cadence", "Learn video production: lighting, sound, framing, scripting", "Study copywriting and persuasion principles", "Build an email list or community alongside your social presence", "Analyze your analytics — what resonates with your audience?"],
      p3: ["Pitch to brands for sponsorships or collaborations", "Intern at a media company, podcast, or content agency", "Develop a signature content format or series that is distinctly yours", "Build cross-platform distribution (YouTube + newsletter + community)", "Learn the business side: licensing, brand deals, courses, merchandise"],
      p4: ["Build a media company or studio around your brand", "Develop and mentor other creators — become a cultural force", "Expand into speaking, books, courses, or brand partnerships", "Hire a team: editor, strategist, community manager", "Transition from creator to media executive or brand founder"]
    }
  },
  // PRACTICAL
  {
    id: "operations_manager",
    title: "Operations Manager / Supply Chain Leader",
    dims: { A: 2, S: 2, C: 1, P: 5 },
    fitTemplate: "Your practical and execution-focused profile is the backbone of every great organization. You find energy in systems, efficiency, and getting things done. {profile} Operations leaders are the people who turn strategy into reality — and as organizations grow more complex, the value of those who can manage that complexity is only increasing.",
    skills: ["Process Optimization", "Project Management", "Data Analysis", "Team Coordination", "Systems Thinking"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Strong — digital operations and global supply chains expanding",
      stability: "Very strong",
      narrative: "Supply chain disruptions, digital transformation, and global complexity mean that skilled operations leaders are more critical than ever. AI and automation assist with data processing but human judgment is required for vendor relationships, crisis management, and strategic trade-offs. Operations leaders with tech literacy are especially valued."
    },
    roadmap: {
      p1: ["Learn Excel advanced skills — pivot tables, data modeling, dashboards", "Study how a supply chain works (watch explainer series on YouTube)", "Read 'The Goal' by Eliyahu Goldratt", "Volunteer to organize an event, club, or team process at school", "Take a free project management intro course (Google PM Certificate)"],
      p2: ["Learn a project management framework: Agile, Scrum, or PMP", "Master process mapping tools: Lucidchart, Miro, or Visio", "Learn SQL basics for operational data analysis", "Study lean manufacturing and Six Sigma principles", "Take on a logistics or coordination role in a school or community project"],
      p3: ["Intern in operations, logistics, or consulting at any company", "Build a process improvement case study: identify a problem, map it, fix it, measure results", "Get certified: PMP, CAPM, or Google Project Management Certificate", "Learn inventory management or ERP system basics (SAP, Salesforce)", "Network with operations professionals on LinkedIn"],
      p4: ["Specialize: supply chain, manufacturing, logistics, digital ops, or consulting", "Lead end-to-end operational transformations at an organization", "Develop expertise in a specific industry vertical where ops is critical", "Pursue an MBA with operations concentration or an industrial engineering degree", "Move into C-suite operations roles (COO, VP Operations)"]
    }
  },
  {
    id: "healthcare_professional",
    title: "Healthcare Professional / Medical Doctor",
    dims: { A: 3, S: 3, C: 1, P: 3 },
    fitTemplate: "Your balanced profile — analytical rigor combined with genuine social care and practical execution — mirrors the qualities of exceptional healthcare professionals. Medicine demands all three. {profile} Healthcare is one of the most irreplaceable human fields: diagnosis, treatment, and healing require a type of human judgment, ethics, and presence that AI cannot replicate.",
    skills: ["Biology & Chemistry", "Clinical Reasoning", "Patient Communication", "Ethical Decision Making", "Continuous Learning"],
    future: {
      demand: "Very High",
      aiRisk: "Low",
      growth: "Consistently growing — aging populations worldwide",
      stability: "Extremely strong",
      narrative: "Healthcare is structurally demand-driven — populations are aging globally, mental and physical health needs are rising, and new diseases constantly emerge. AI augments diagnostics but the physician-patient relationship, surgical skill, and clinical judgment remain irreplaceable. Specialties combining tech literacy with clinical expertise (telemedicine, AI-assisted diagnosis) are emerging as premium tracks."
    },
    roadmap: {
      p1: ["Excel in Biology, Chemistry, and Mathematics at school — these are foundational", "Shadow a doctor, nurse, or allied health professional", "Volunteer at a hospital, clinic, or health outreach program", "Read 'Do No Harm' by Henry Marsh for an honest view of medicine", "Study anatomy and physiology with free tools (Visible Body, Khan Academy MCAT)"],
      p2: ["Aim for a top undergraduate pre-med or natural sciences program", "Take MCAT preparation seriously from sophomore year", "Join medical research labs, student-run health clinics, or global health clubs", "Develop clinical communication skills through mock patient interactions", "Build a well-rounded profile: research, service, leadership"],
      p3: ["Apply to and matriculate in medical school (MD or DO program)", "Ace your clinical rotations — breadth of exposure is key", "Network with physicians in your areas of interest for mentorship", "Complete a research project or publish a case report", "Begin thinking about specialty — explore broadly before deciding"],
      p4: ["Complete residency in your chosen specialty", "Consider fellowship for subspecialization", "Stay current: medicine evolves fast — continuous learning is non-negotiable", "Develop leadership: department chief, hospital committee, medical education", "Consider research, global health missions, or healthcare entrepreneurship"]
    }
  },
  {
    id: "engineer_civil",
    title: "Civil / Environmental Engineer",
    dims: { A: 3, S: 1, C: 2, P: 4 },
    fitTemplate: "Your analytical-practical combination with a tendency toward concrete, tangible impact describes the engineering mindset precisely. You're someone who doesn't just want to understand the world — you want to build the world. {profile} Civil and environmental engineering lets you leave something permanent: infrastructure, systems, and solutions that outlast you.",
    skills: ["Physics & Mathematics", "CAD & Structural Modeling", "Environmental Systems", "Project Management", "Materials Science"],
    future: {
      demand: "High",
      aiRisk: "Low",
      growth: "Strong — climate adaptation infrastructure creates massive demand",
      stability: "Very strong",
      narrative: "Climate change is creating a multi-trillion-dollar demand for new infrastructure: sea walls, renewable energy grids, water treatment systems, and resilient buildings. Engineers who combine traditional civil skills with environmental sustainability expertise are extraordinarily well-positioned. AI handles simulation and modeling; human engineers direct the vision and bear the professional liability."
    },
    roadmap: {
      p1: ["Strengthen Physics, Math, and Chemistry at school — these are core prerequisites", "Learn AutoCAD basics (free student version) for 2D drafting", "Build physical models: bridges from popsicle sticks, test their load limits", "Explore engineering challenge programs (Science Olympiad, SkillsUSA)", "Read about iconic engineering projects: Panama Canal, Burj Khalifa, Hoover Dam"],
      p2: ["Enroll in a civil or environmental engineering undergraduate program", "Master calculus, differential equations, and structural mechanics", "Learn AutoCAD, Revit, and Civil 3D — industry-standard design tools", "Join your university's ASCE (American Society of Civil Engineers) student chapter", "Complete a surveying or soil mechanics lab project"],
      p3: ["Co-op or intern with a civil engineering firm, government agency, or consultancy", "Work on a real project — even assisting in site surveys or design reviews", "Earn Engineer-in-Training (EIT) certification by taking the FE Exam", "Build relationships with professional mentors in target specializations", "Enter engineering design competitions and present your work"],
      p4: ["Pass the Professional Engineering (PE) exam for full licensure", "Specialize: structural, geotechnical, transportation, environmental, or water resources", "Lead full projects from design to construction completion", "Develop BIM and digital twin expertise for next-gen infrastructure", "Pursue leadership: project director, firm partner, or public infrastructure policy"]
    }
  }
];

/* ───────────────────────────────────────────────────────────────
   PROFILE TYPES  (based on dominant dimension combination)
─────────────────────────────────────────────────────────────────*/
const PROFILES = {
  A: {
    title: "The Analytical Architect",
    summary: "You are a deep, systematic thinker who thrives on complexity, precision, and intellectual mastery. Your mind naturally builds models of how things work, identifies logical flaws, and seeks to understand before acting. In a team, you are the person others turn to when the problem requires real intellectual rigor. You work best with space for focused thinking and access to quality information.",
    traits: ["Logical", "Detail-Oriented", "Strategic", "Evidence-Based", "Independent Thinker"],
    thinking: "Systems & Logic Thinker — you process information by building mental models and testing them against evidence. You're most energized when problems have depth and complexity. You may sometimes prefer solitude for deep focus and can find shallow or emotionally-driven decisions frustrating.",
    thinkingColor: "#2d6ef6"
  },
  S: {
    title: "The Social Catalyst",
    summary: "You are deeply people-oriented, with exceptional emotional intelligence and a genuine desire to understand, help, and connect with others. You read situations and people with unusual accuracy. Your greatest strength is your ability to bring out the best in others and to navigate complex human dynamics with grace. You are energized by collaboration, conversation, and contribution to others' lives.",
    traits: ["Empathetic", "Communicative", "Collaborative", "Influential", "People-Focused"],
    thinking: "Relational & Contextual Thinker — you process information through people and relationships. You intuitively understand how ideas land emotionally, not just logically. You're most energized in environments where your ability to connect with others is valued and where your work creates visible human impact.",
    thinkingColor: "#10b981"
  },
  C: {
    title: "The Creative Visionary",
    summary: "You see the world differently — not as it is, but as it could be. Your thinking is non-linear, associative, and generative. Where others see a finished product, you see ten possible variations. Your energy peaks when you have the freedom to experiment, express, and build something original. You have a high tolerance for ambiguity and thrive in environments that reward imagination and risk-taking.",
    traits: ["Imaginative", "Original", "Expressive", "Intuitive", "Bold"],
    thinking: "Divergent & Associative Thinker — you generate ideas by connecting disparate concepts in surprising ways. You often have insights that others miss because you approach problems laterally rather than linearly. Your greatest challenge is focus; your greatest gift is vision.",
    thinkingColor: "#f59e0b"
  },
  P: {
    title: "The Practical Builder",
    summary: "You are the person who gets things done. Reliable, systematic, and execution-focused, you have an extraordinary ability to translate ideas into action. You find energy in building, organizing, and making things work efficiently. Others trust you because you follow through. You're at your best when given clear goals, adequate resources, and the autonomy to execute with precision.",
    traits: ["Disciplined", "Reliable", "Systematic", "Goal-Oriented", "Results-Driven"],
    thinking: "Sequential & Procedural Thinker — you process information by breaking it into steps and executing them in order. You're energized by checklists, milestones, and measurable progress. You have a natural talent for anticipating operational challenges before they arise.",
    thinkingColor: "#8b5cf6"
  },
  AS: {
    title: "The Strategic Empath",
    summary: "You combine intellectual rigor with genuine human warmth — a rare and powerful combination. You can analyze complex situations while understanding the human dimensions at play. You're equally comfortable with data and with people, and you bring a grounded, thoughtful approach to every challenge. Leaders, researchers, and high-impact professionals often have exactly this profile.",
    traits: ["Analytical", "Empathetic", "Communicative", "Strategic", "Balanced"],
    thinking: "Integrated Analytical-Social Thinker — you evaluate problems both logically and relationally. You ask 'what does the data say?' and 'how will this affect people?' simultaneously. This gives you a sophisticated, complete view of situations that purely analytical or purely social thinkers miss.",
    thinkingColor: "#2d6ef6"
  },
  AC: {
    title: "The Inventive Mind",
    summary: "You have a powerful combination of logical depth and creative imagination. You can think rigorously and dream boldly at the same time. This dual capacity makes you exceptional at finding elegant solutions to complex problems — the kind of solutions that are both technically sound and surprisingly original. Engineers, scientists, architects, and innovators often share this profile.",
    traits: ["Curious", "Inventive", "Rigorous", "Original", "Technical"],
    thinking: "Convergent-Divergent Thinker — you move between rigorous analysis and imaginative exploration, using each to enrich the other. You're energized by problems at the edge of the known — where logic runs out and creativity begins.",
    thinkingColor: "#2d6ef6"
  },
  AP: {
    title: "The Precision Executor",
    summary: "You combine analytical depth with a strong practical drive to implement. You don't just understand problems — you build solutions. You're methodical, thorough, and highly reliable. Your thinking is both rigorous and grounded, which makes you exceptional in engineering, finance, medicine, and any field requiring both intellectual precision and disciplined execution.",
    traits: ["Precise", "Logical", "Disciplined", "Systematic", "Effective"],
    thinking: "Systematic & Applied Thinker — you analyze thoroughly and then execute methodically. You're most effective when given complex problems with clear constraints, because you'll find the optimal solution and implement it reliably. You have little patience for vagueness or inefficiency.",
    thinkingColor: "#2d6ef6"
  },
  SC: {
    title: "The Creative Connector",
    summary: "You bring people together through creative energy — you inspire, communicate, and move others with original ideas and authentic expression. Your social intelligence amplifies your creative impact, and your creativity makes your social interactions memorable and meaningful. You're likely a natural storyteller, teacher, designer, or leader of people.",
    traits: ["Inspiring", "Expressive", "Empathetic", "Original", "Magnetic"],
    thinking: "Narrative & Social Thinker — you make sense of the world through stories and human connection. You understand ideas most deeply when you can relate them to people's experiences, and you express ideas most powerfully through creative formats that resonate emotionally.",
    thinkingColor: "#f59e0b"
  },
  SP: {
    title: "The Organizational Leader",
    summary: "You combine strong interpersonal skills with practical execution ability. You're the person who brings a team together, sets clear expectations, and drives toward results without losing sight of the people involved. This profile is the foundation of great management, operations leadership, and community-building.",
    traits: ["Organized", "People-Oriented", "Dependable", "Clear Communicator", "Team Builder"],
    thinking: "Operational & Relational Thinker — you think naturally about how processes and people interact. You see both the workflow and the human element, which makes you exceptionally effective at running teams, coordinating complex projects, and building organizations that work well and feel good to be part of.",
    thinkingColor: "#10b981"
  },
  CP: {
    title: "The Design-Driven Builder",
    summary: "You're rare: creative in vision and practical in execution. You don't just imagine things — you build them. You have a strong aesthetic sense combined with an ability to follow through, which makes you exceptional at product development, entrepreneurship, and design-led businesses. Your ideas become real, and they look good.",
    traits: ["Resourceful", "Creative", "Hands-On", "Design-Minded", "Self-Starting"],
    thinking: "Prototype-Oriented Thinker — you think best by making things. Your ideas crystallize when you start building, not when you plan. You often learn fastest through iteration: create, test, improve. This build-first mentality is the foundation of great product design and entrepreneurship.",
    thinkingColor: "#f59e0b"
  }
};

/* ───────────────────────────────────────────────────────────────
   BACKUP CAREERS (key = career id)
─────────────────────────────────────────────────────────────────*/
const BACKUP_CAREERS = {
  A_primary: [
    { title: "Cybersecurity Analyst", desc: "Your analytical precision and comfort with complex systems translates directly to security — detecting threats, reverse-engineering attacks, and building defensive systems.", overlap: "High overlap: pattern recognition, systems thinking" },
    { title: "Actuarial Scientist", desc: "If your analytical bent draws you toward risk and probability, actuarial science offers a highly specialized, well-compensated application of your mathematical strengths.", overlap: "High overlap: statistical thinking, risk modeling" }
  ],
  S_primary: [
    { title: "Social Worker / Case Manager", desc: "If therapy or formal psychology isn't the right path, social work offers direct, meaningful impact with people facing the hardest challenges — with lower educational barriers.", overlap: "High overlap: empathy, advocacy, relationship building" },
    { title: "Corporate Trainer / Facilitator", desc: "Your social skills and natural teaching ability translate perfectly into corporate learning and development — designing and delivering programs that develop people at scale.", overlap: "High overlap: communication, facilitation, impact" }
  ],
  C_primary: [
    { title: "Brand Strategist", desc: "If pure creative work feels too unstable, brand strategy lets you combine creative thinking with business acumen — shaping how organizations communicate with the world.", overlap: "High overlap: storytelling, creative thinking, positioning" },
    { title: "Industrial Designer", desc: "If you prefer physical to digital creative work, industrial design lets you create the objects people use every day — combining aesthetics with engineering and user insight.", overlap: "High overlap: visual thinking, design, problem-solving" }
  ],
  P_primary: [
    { title: "Quality Assurance Manager", desc: "Your systematic approach and attention to detail makes you a natural for QA — ensuring that products and processes meet exacting standards before they reach customers.", overlap: "High overlap: precision, process thinking, execution" },
    { title: "Construction Project Manager", desc: "If you prefer tangible, physical results over abstract systems, construction project management lets you build literally — coordinating teams to produce visible, lasting structures.", overlap: "High overlap: planning, execution, systems management" }
  ]
};

/* ───────────────────────────────────────────────────────────────
   APP STATE
─────────────────────────────────────────────────────────────────*/
const state = {
  currentQ: 0,
  answers: [],           // { dim, optionIndex }
  scores: { A: 0, S: 0, C: 0, P: 0 }
};

/* ───────────────────────────────────────────────────────────────
   SCREEN TRANSITIONS
─────────────────────────────────────────────────────────────────*/
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ───────────────────────────────────────────────────────────────
   QUIZ ENGINE
─────────────────────────────────────────────────────────────────*/
function renderQuestion(index) {
  const q = QUESTIONS[index];
  const card = document.getElementById('question-card');

  // Animate out if not first
  if (index > 0 || state.answers.length > 0) {
    card.classList.add('exiting');
    setTimeout(() => {
      card.classList.remove('exiting');
      _paintQuestion(q, index);
    }, 280);
  } else {
    _paintQuestion(q, index);
  }

  // Update progress
  const pct = ((index) / QUESTIONS.length) * 100;
  document.getElementById('progress-bar').style.width = Math.max(pct, 3) + '%';
  document.getElementById('q-current').textContent = index + 1;
  document.getElementById('q-total').textContent = QUESTIONS.length;

  // Back button
  const btnBack = document.getElementById('btn-back');
  btnBack.disabled = (index === 0);

  // Dimension meter
  updateDimMeter();
}

function _paintQuestion(q, index) {
  document.getElementById('q-category').textContent = q.category;
  document.getElementById('q-text').textContent = q.text;

  const container = document.getElementById('q-options');
  container.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'q-option';
    // Mark if already answered
    if (state.answers[index] !== undefined && state.answers[index].optionIndex === i) {
      btn.classList.add('selected');
    }
    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt.text}</span>
    `;
    btn.addEventListener('click', () => selectAnswer(index, i, opt.dim));
    container.appendChild(btn);
  });
}

function selectAnswer(qIndex, optIndex, dim) {
  // Remove old score if re-answering
  if (state.answers[qIndex] !== undefined) {
    state.scores[state.answers[qIndex].dim]--;
  }

  // Record new answer
  state.answers[qIndex] = { dim, optionIndex: optIndex };
  state.scores[dim]++;

  // Visual feedback
  document.querySelectorAll('.q-option').forEach((el, i) => {
    el.classList.toggle('selected', i === optIndex);
  });

  updateDimMeter();

  // Auto-advance after short delay
  setTimeout(() => {
    if (state.currentQ < QUESTIONS.length - 1) {
      state.currentQ++;
      renderQuestion(state.currentQ);
    } else {
      // Complete — show loading screen
      startLoading();
    }
  }, 380);
}

function updateDimMeter() {
  const maxScore = Math.max(...Object.values(state.scores), 1);
  const dims = ['A', 'S', 'C', 'P'];
  dims.forEach(d => {
    const pill = document.querySelector(`.dim-pill[data-dim="${d}"]`);
    if (state.scores[d] > 0) {
      pill.classList.add('active');
      const size = 28 + (state.scores[d] / maxScore) * 8;
      pill.style.fontSize = size + 'px';
    } else {
      pill.classList.remove('active');
    }
  });
}

/* ───────────────────────────────────────────────────────────────
   LOADING ANIMATION
─────────────────────────────────────────────────────────────────*/
function startLoading() {
  showScreen('screen-loading');
  const steps = ['ls-1', 'ls-2', 'ls-3', 'ls-4'];
  let i = 0;

  const tick = () => {
    if (i > 0) document.getElementById(steps[i-1]).classList.replace('active','done');
    if (i < steps.length) {
      document.getElementById(steps[i]).classList.add('active');
      i++;
      setTimeout(tick, 820);
    } else {
      setTimeout(() => {
        buildResults();
        showScreen('screen-results');
      }, 400);
    }
  };
  setTimeout(tick, 300);
}

/* ───────────────────────────────────────────────────────────────
   RESULTS ENGINE
─────────────────────────────────────────────────────────────────*/
function buildResults() {
  const scores = state.scores;
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const pct = { A: scores.A/total, S: scores.S/total, C: scores.C/total, P: scores.P/total };

  // Determine profile type
  const sorted = Object.entries(pct).sort((a, b) => b[1] - a[1]);
  const top1 = sorted[0][0];
  const top2 = sorted[1][0];
  const primaryProfile = pct[top1] - pct[top2] > 0.15 ? top1 : (top1 + top2);

  const profile = PROFILES[primaryProfile] || PROFILES[top1];

  // Profile reasoning snippet
  const reasoningMap = {
    A: "strongly analytical — you consistently chose to dig into root causes, research before acting, and understand systems from first principles",
    S: "powerfully people-oriented — you consistently prioritized connection, empathy, and human impact in your decisions",
    C: "deeply creative — you consistently gravitated toward original thinking, imaginative solutions, and expressive approaches",
    P: "highly practical — you consistently chose structured, execution-focused approaches with measurable, tangible outcomes"
  };
  const profileReason = reasoningMap[top1] || reasoningMap['A'];

  // ── Hero section ──────────────────────────────────────────────
  document.getElementById('hero-title').textContent = profile.title;
  document.getElementById('hero-summary').textContent = profile.summary;

  // ── Radar chart ───────────────────────────────────────────────
  document.getElementById('profile-radar').innerHTML = buildRadarChart(pct);

  // ── Trait pills ───────────────────────────────────────────────
  const traitContainer = document.getElementById('trait-pills');
  traitContainer.innerHTML = '';
  profile.traits.forEach((t, i) => {
    const pill = document.createElement('div');
    pill.className = `trait-pill ${top1}`;
    pill.textContent = t;
    pill.style.animationDelay = (i * 0.08) + 's';
    traitContainer.appendChild(pill);
  });

  // ── Thinking card ─────────────────────────────────────────────
  document.getElementById('thinking-card').innerHTML = `
    <div class="thinking-card-label">Your Cognitive Style</div>
    <div class="thinking-card-title">${profile.thinking.split('—')[0].trim()}</div>
    <div class="thinking-card-body">${profile.thinking.split('—').slice(1).join('—').trim()}</div>
  `;

  // ── Match careers ─────────────────────────────────────────────
  const ranked = rankCareers(pct);
  const top5 = ranked.slice(0, 5);
  const backupKey = top1 + '_primary';

  // ── Career cards ──────────────────────────────────────────────
  const careersGrid = document.getElementById('careers-grid');
  careersGrid.innerHTML = '';
  top5.forEach((career, i) => {
    const fitText = career.fitTemplate.replace(
      '{profile}',
      `Your responses showed you are ${profileReason}.`
    );
    const card = document.createElement('div');
    card.className = 'career-card';
    card.style.animationDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="career-rank">${i + 1}</div>
      <div class="career-title">${career.title}</div>
      <div class="career-fit">${fitText}</div>
      <div class="career-skills">
        ${career.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    `;
    careersGrid.appendChild(card);
  });

  // ── Future outlook ────────────────────────────────────────────
  const futureGrid = document.getElementById('future-grid');
  futureGrid.innerHTML = '';
  top5.forEach((career, i) => {
    const f = career.future;
    const card = document.createElement('div');
    card.className = 'future-card';
    card.style.animationDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <div class="future-left">
        <div class="future-career-name">${career.title}</div>
        <div class="future-narrative">${f.narrative}</div>
      </div>
      <div class="future-metrics">
        <div class="future-metric">
          <span class="metric-label">Demand</span>
          <span class="metric-badge ${f.demand.toLowerCase().replace(' ','')}">${f.demand}</span>
        </div>
        <div class="future-metric">
          <span class="metric-label">AI Risk</span>
          <span class="metric-badge ${f.aiRisk.toLowerCase()}">${f.aiRisk}</span>
        </div>
        <div class="future-metric">
          <span class="metric-label">Stability</span>
          <span class="metric-badge ${f.stability.toLowerCase().replace(/\s.*/,'')}">${f.stability}</span>
        </div>
      </div>
    `;
    futureGrid.appendChild(card);
  });

  // ── Roadmap ───────────────────────────────────────────────────
  const selector = document.getElementById('roadmap-selector');
  const content = document.getElementById('roadmap-content');
  selector.innerHTML = '';
  top5.forEach((career, i) => {
    const btn = document.createElement('button');
    btn.className = 'roadmap-btn' + (i === 0 ? ' active' : '');
    btn.textContent = career.title.split('/')[0].trim();
    btn.addEventListener('click', () => {
      selector.querySelectorAll('.roadmap-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderRoadmap(career);
    });
    selector.appendChild(btn);
  });
  renderRoadmap(top5[0]);

  // ── Backup careers ────────────────────────────────────────────
  const backupGrid = document.getElementById('backup-grid');
  backupGrid.innerHTML = '';
  const backups = BACKUP_CAREERS[backupKey] || BACKUP_CAREERS['A_primary'];
  backups.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'backup-card';
    card.style.animationDelay = (i * 0.1) + 's';
    card.innerHTML = `
      <div class="backup-label">Backup Path ${i + 1}</div>
      <div class="backup-title">${b.title}</div>
      <div class="backup-desc">${b.desc}</div>
      <span class="backup-overlap">${b.overlap}</span>
    `;
    backupGrid.appendChild(card);
  });

  animateResultCards();
}

function rankCareers(pct) {
  return [...CAREERS]
    .map(career => {
      const score =
        pct.A * career.dims.A +
        pct.S * career.dims.S +
        pct.C * career.dims.C +
        pct.P * career.dims.P;
      return { ...career, score };
    })
    .sort((a, b) => b.score - a.score);
}

function renderRoadmap(career) {
  const content = document.getElementById('roadmap-content');
  const phases = [
    { num: 1, name: "Explore & Foundations", timeline: "Months 0–6", items: career.roadmap.p1, cls: "phase-1" },
    { num: 2, name: "Core Skill Building", timeline: "Months 6–18", items: career.roadmap.p2, cls: "phase-2" },
    { num: 3, name: "Real-World Practice", timeline: "Years 1–3", items: career.roadmap.p3, cls: "phase-3" },
    { num: 4, name: "Specialization & Mastery", timeline: "Long-Term", items: career.roadmap.p4, cls: "phase-4" }
  ];

  content.innerHTML = `<div class="roadmap-phases">` +
    phases.map((p, i) => `
      <div class="phase-card ${p.cls}${i === 0 ? ' open' : ''}">
        <div class="phase-header" role="button" tabindex="0">
          <div class="phase-num">P${p.num}</div>
          <div class="phase-meta">
            <div class="phase-name">${p.name}</div>
            <div class="phase-timeline">${p.timeline}</div>
          </div>
          <span class="phase-toggle">▾</span>
        </div>
        <div class="phase-body">
          <ul>
            ${p.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('') +
  `</div>`;

  // Accordion behavior
  content.querySelectorAll('.phase-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.phase-card');
      card.classList.toggle('open');
    });
  });
}

/* ───────────────────────────────────────────────────────────────
   RADAR CHART (SVG)
─────────────────────────────────────────────────────────────────*/
function buildRadarChart(pct) {
  const cx = 100, cy = 100, r = 75;
  const dims = [
    { key: 'A', label: 'Analytical', angle: -90 },
    { key: 'S', label: 'Social', angle: 0 },
    { key: 'C', label: 'Creative', angle: 90 },
    { key: 'P', label: 'Practical', angle: 180 }
  ];
  const colors = { A: '#2d6ef6', S: '#10b981', C: '#f59e0b', P: '#8b5cf6' };

  const toPoint = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  // Grid circles
  const gridCircles = [0.25, 0.5, 0.75, 1].map(f =>
    `<circle cx="${cx}" cy="${cy}" r="${r * f}" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="1"/>`
  ).join('');

  // Axis lines
  const axes = dims.map(d => {
    const [x, y] = toPoint(d.angle, r);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>`;
  }).join('');

  // Data polygon
  const dataPoints = dims.map(d => toPoint(d.angle, r * (pct[d.key] || 0.05)));
  const polyPoints = dataPoints.map(p => p.join(',')).join(' ');

  // Dot color fills
  const dots = dims.map((d, i) => {
    const [x, y] = dataPoints[i];
    return `<circle cx="${x}" cy="${y}" r="5" fill="${colors[d.key]}" stroke="white" stroke-width="2"/>`;
  }).join('');

  // Labels
  const labels = dims.map(d => {
    const dist = r + 18;
    const [x, y] = toPoint(d.angle, dist);
    const textAnchor = x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle';
    return `
      <text x="${x}" y="${y}" text-anchor="${textAnchor}" dominant-baseline="middle"
        font-family="Sora,sans-serif" font-size="10" font-weight="600" fill="${colors[d.key]}">${d.label}</text>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      ${gridCircles}
      ${axes}
      <polygon points="${polyPoints}"
        fill="rgba(45,110,246,0.12)"
        stroke="rgba(45,110,246,0.5)"
        stroke-width="1.5"
        stroke-linejoin="round"/>
      ${dots}
      ${labels}
    </svg>
  `;
}

/* ───────────────────────────────────────────────────────────────
   TAB SYSTEM
─────────────────────────────────────────────────────────────────*/
function initTabs() {
  document.querySelectorAll('.rtab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

/* ───────────────────────────────────────────────────────────────
   RETAKE
─────────────────────────────────────────────────────────────────*/
function resetApp() {
  state.currentQ = 0;
  state.answers = [];
  state.scores = { A: 0, S: 0, C: 0, P: 0 };

  // Reset loading steps
  ['ls-1','ls-2','ls-3','ls-4'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active','done');
  });

  // Reset dim meter
  document.querySelectorAll('.dim-pill').forEach(p => {
    p.classList.remove('active');
    p.style.fontSize = '';
  });

  renderQuestion(0);
  showScreen('screen-quiz');
}

/* ───────────────────────────────────────────────────────────────
   AUTHENTICATION + ANIMATIONS
─────────────────────────────────────────────────────────────────*/
const AUTH_STORAGE_KEY = 'pathfinder_users';
const CURRENT_USER_KEY = 'pathfinder_current_user';

function getSavedUsers() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '[]');
  } catch (err) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  return localStorage.getItem(CURRENT_USER_KEY);
}

function setCurrentUser(username) {
  localStorage.setItem(CURRENT_USER_KEY, username);
}

function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function updateAuthUI() {
  const current = getCurrentUser();
  const authButtons = document.getElementById('nav-auth-buttons');
  const navUser = document.getElementById('nav-user');
  const welcomeText = document.getElementById('nav-welcome');

  if (current) {
    authButtons.classList.add('hidden');
    navUser.classList.remove('hidden');
    welcomeText.textContent = `Welcome, ${current}`;
  } else {
    authButtons.classList.remove('hidden');
    navUser.classList.add('hidden');
    welcomeText.textContent = '';
  }
}

function showAuthModal(mode = 'signin') {
  const modal = document.getElementById('auth-modal');
  const title = document.getElementById('auth-title');
  const submit = document.getElementById('auth-submit');
  const extra = document.getElementById('auth-extra');
  const tabs = document.querySelectorAll('.auth-tab');
  const message = document.getElementById('auth-message');

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.add('visible'), 20);
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  if (mode === 'signup') {
    title.textContent = 'Sign Up';
    submit.textContent = 'Create Account';
    extra.classList.add('visible');
  } else {
    title.textContent = 'Sign In';
    submit.textContent = 'Continue';
    extra.classList.remove('visible');
  }

  message.textContent = '';
  document.getElementById('auth-form').dataset.mode = mode;
  document.getElementById('auth-username').focus();
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.remove('visible');
  setTimeout(() => modal.classList.add('hidden'), 240);
}

function setAuthMessage(text, isError = false) {
  const message = document.getElementById('auth-message');
  message.textContent = text;
  message.style.color = isError ? '#f43f5e' : 'rgba(255,255,255,0.72)';
}

function logoutUser() {
  clearCurrentUser();
  updateAuthUI();
  closeAuthModal();
}

function signUpUser(username, password, confirmPassword) {
  if (!username || !password) {
    setAuthMessage('Please provide both a username and password.', true);
    return;
  }
  if (password.length < 6) {
    setAuthMessage('Password must be at least 6 characters.', true);
    return;
  }
  if (password !== confirmPassword) {
    setAuthMessage('Passwords do not match.', true);
    return;
  }

  const users = getSavedUsers();
  if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
    setAuthMessage('That username is already registered.', true);
    return;
  }

  users.push({ username, password });
  saveUsers(users);
  setCurrentUser(username);
  updateAuthUI();
  setAuthMessage('Account created successfully. You are now logged in.');
  setTimeout(closeAuthModal, 800);
}

function signInUser(username, password) {
  if (!username || !password) {
    setAuthMessage('Enter both username and password.', true);
    return;
  }

  const users = getSavedUsers();
  const existing = users.find(user => user.username.toLowerCase() === username.toLowerCase());
  if (!existing || existing.password !== password) {
    setAuthMessage('Invalid credentials. Please try again.', true);
    return;
  }

  setCurrentUser(existing.username);
  updateAuthUI();
  setAuthMessage('Signed in successfully.');
  setTimeout(closeAuthModal, 600);
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const mode = form.dataset.mode || 'signin';
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value;
  const confirmPassword = document.getElementById('auth-confirm-password').value;

  if (mode === 'signup') {
    signUpUser(username, password, confirmPassword);
  } else {
    signInUser(username, password);
  }
}

function initAuth() {
  updateAuthUI();

  document.getElementById('nav-login').addEventListener('click', () => showAuthModal('signin'));
  document.getElementById('nav-signup').addEventListener('click', () => showAuthModal('signup'));
  document.getElementById('nav-logout').addEventListener('click', logoutUser);
  document.getElementById('auth-close').addEventListener('click', closeAuthModal);
  document.getElementById('auth-backdrop').addEventListener('click', closeAuthModal);
  document.getElementById('auth-form').addEventListener('submit', handleAuthSubmit);
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => showAuthModal(tab.dataset.mode));
  });
}

function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.logo, .landing-content .badge, .landing-content .headline, .landing-content .subheadline, .landing-content .landing-stats, .btn-start, .landing-note', {
    opacity: 0,
    y: 26,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.12
  });

  gsap.utils.toArray('.results-hero, .trait-section, .thinking-style-section, .results-footer').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 38,
      duration: 0.75,
      ease: 'power3.out'
    });
  });
}

function animateResultCards() {
  if (typeof gsap === 'undefined') {
    return;
  }
  gsap.utils.toArray('.career-card, .future-card, .phase-card, .backup-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: i * 0.05 }
    );
  });
}

/* ───────────────────────────────────────────────────────────────
   INIT
─────────────────────────────────────────────────────────────────*/
function init() {
  initAuth();
  initAnimations();

  // Start button
  document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('screen-quiz');
    renderQuestion(0);
  });

  // Back button
  document.getElementById('btn-back').addEventListener('click', () => {
    if (state.currentQ > 0) {
      state.currentQ--;
      renderQuestion(state.currentQ);
    }
  });

  // Retake buttons
  document.getElementById('btn-retake').addEventListener('click', resetApp);
  document.getElementById('btn-retake-bottom').addEventListener('click', resetApp);

  // Tabs
  initTabs();
}

document.addEventListener('DOMContentLoaded', init);