/* ============================================================
   main.js — WebBuilder Landing Page

   TABLE OF CONTENTS
   1.  Manual page switching
   2.  Scroll progress bar
   3.  Scroll reveal (IntersectionObserver)
   4.  Animated stat counters
   5.  Bilingual i18n (EN / ES)
   ============================================================ */


/* ============================================================
   1. MANUAL PAGE SWITCHING
   ============================================================ */
function showPage(pageId, el) {
  document.querySelectorAll('.manual-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-item').forEach(s => s.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  if (el)     el.classList.add('active');

  if (window.innerWidth < 900) {
    document.querySelector('.manual-shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


/* ============================================================
   2. SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });


/* ============================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ============================================================ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 80);
});


/* ============================================================
   4. ANIMATED STAT COUNTERS
   ============================================================ */
function animateCount(el, target, suffix) {
  const duration = 1400;
  const start = performance.now();

  const update = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + (suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const strong = entry.target.querySelector('[data-count]');
      if (strong && !strong.dataset.animated) {
        strong.dataset.animated = '1';
        animateCount(
          strong,
          parseInt(strong.dataset.count, 10),
          strong.dataset.suffix || ''
        );
      }
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));


/* ============================================================
   5. BILINGUAL i18n (EN / ES)
   ============================================================ */
const translations = {
  en: {
    /* ── Navbar ── */
    'nav.how':          'How it works',
    'nav.examples':     'Examples',
    'nav.features':     'Features',
    'nav.automations':  'Automations',
    'nav.manual':       'Manual',
    'nav.cta':          'Get started',

    /* ── Hero ── */
    'hero.badge':   'AI-POWERED · FINAL DEGREE PROJECT 2026',
    'hero.title1':  'Turn any API into a',
    'hero.title2':  'full website',
    'hero.title3':  '— automatically',
    'hero.sub':     'Paste a public API URL, review the AI-generated plan, and download a ready-to-deploy Django project. No boilerplate, no setup.',
    'hero.cta1':    'Start the manual',
    'hero.cta2':    'See how it works',
    'hero.cta3':    'Open WebBuilder',
    'hero.chip1':   'Multi-format input',
    'hero.chip2':   'Editable AI schema',
    'hero.chip3':   'Django code generation',

    /* ── App mockup ── */
    'mock.detected':    'Detected schema',
    'mock.detectedSub': '6 fields · collection view',
    'mock.ready':       'ready',

    /* ── Stats ── */
    'stat.analyses': 'Analyses run',
    'stat.sites':    'Sites generated',
    'stat.workflows':'n8n automation workflows',
    'stat.success':  'Analysis success rate',

    /* ── How it works ── */
    'how.label': 'HOW IT WORKS',
    'how.title': 'Four steps from raw data to deployed site.',
    'how.sub':   'A guided workflow where the AI proposes and you decide. No black box, no surprises.',
    'how.s1.t':  'Paste the API URL',
    'how.s1.d':  'JSON or XML — WebBuilder detects and safely parses the format automatically.',
    'how.s2.t':  'Review the AI plan',
    'how.s2.d':  'The LLM proposes a site type, relevant fields and layout. Accept or regenerate with your prompt.',
    'how.s3.t':  'Generate the project',
    'how.s3.d':  'Full Django project: models, views, templates with Tailwind, and a Dockerfile.',
    'how.s4.t':  'Download & deploy',
    'how.s4.d':  'Get a ZIP ready to run locally or deploy in one command with Docker.',

    /* ── Media placeholders ── */
    'media.videoFlow':      'VIDEO PLACEHOLDER — Full flow demo',
    'media.videoFlowHint':  'Replace with a ~60s screen recording: URL input → AI plan → generation → downloaded ZIP running',
    'media.screenshot':     'SCREENSHOT PLACEHOLDER',
    'media.video':          'VIDEO PLACEHOLDER',
    'media.hint.home':      'Replace with screenshot of WebBuilder home page',
    'media.hint.quickstart':'Replace with 60-second full demo video',
    'media.hint.register':  'Replace with screenshot of the registration form',
    'media.hint.login':     'Replace with screenshot of the login form',
    'media.hint.step1':     'Replace with screenshot of the URL input screen',
    'media.hint.step2a':    'Replace with screenshot of the AI proposal screen',
    'media.hint.step2b':    'Replace with video showing the regeneration flow',
    'media.hint.step3':     'Replace with screenshot of the generation progress screen',
    'media.hint.step4':     'Replace with screenshot of the generated site running in the browser',
    'media.hint.history':   'Replace with screenshot of the history listing',

    /* ── Examples ── */
    'ex.label':    'OUTPUT EXAMPLES',
    'ex.title':    'Real sites generated by WebBuilder.',
    'ex.sub':      'These are actual Django projects produced from public APIs — downloaded as a ZIP and deployed with one Docker command.',
    'ex.ph':       'SCREENSHOT — replace with actual generated site',
    'ex.histLabel':'47 PUBLISHED SITES IN THE SYSTEM',
    'ex.e1.t':     'Rick & Morty Catalog',
    'ex.e1.d':     'Character catalog with image, name, species and status. Detail page per character. Responsive with Tailwind.',
    'ex.e2.t':     'Crypto Dashboard',
    'ex.e2.d':     'Dashboard with top 100 coins, price, 24h change and market cap. Live data loaded on startup.',
    'ex.e3.t':     'Cocktail Recipes',
    'ex.e3.d':     'Recipe catalog with image, name, category and instructions. Clean card layout, ready to extend.',
    'ex.tag.catalog':   'catalog',
    'ex.tag.dashboard': 'dashboard',
    'ex.tag.blog':      'blog',
    'ex.tag.portfolio': 'portfolio',

    /* ── LLM providers ── */
    'llm.label':     'COMPATIBLE PROVIDERS',
    'llm.title':     'Works with any OpenAI-format LLM.',
    'llm.sub':       'Switch model and provider with three environment variables. No code changes needed.',
    'llm.openai':    'GPT-4o & GPT-4 Turbo. Connect your own key for higher-quality output.',
    'llm.groq':      'Llama 4 Scout & Llama 3.3 70B. Fastest inference, free tier.',
    'llm.openrouter':'Llama 3.3 70B, Qwen3 Coder and 100+ models with one API key.',
    'llm.local':     'Ollama or LM Studio. Full privacy, no external calls.',
    'llm.envLabel':  'Switch provider in seconds — just update your .env:',

    /* ── Features ── */
    'feat.label': 'CORE FEATURES',
    'feat.title': 'Built around the LLM as a guided developer.',
    'feat.sub':   'Every step is supervised. The model proposes, you approve. The output is real, runnable code.',
    'feat.f1.t':  'Multi-LLM support',
    'feat.f1.d':  'Compatible with any OpenAI-format provider: OpenRouter, Groq, local models. Switch with three env variables.',
    'feat.f2.t':  'Safe parsing',
    'feat.f2.d':  'XML protected with defusedxml against XXE attacks. JSON via standard library. No surprises.',
    'feat.f3.t':  'Per-user history',
    'feat.f3.d':  'Every analysis is saved: URL, date, status, raw data, parsed data, LLM summary and errors.',
    'feat.f4.t':  'Real Django output',
    'feat.f4.d':  'Not a template stuffed with placeholders: models, views, urls and templates adapted to your dataset.',
    'feat.f5.t':  'Custom prompts',
    'feat.f5.d':  "Don't like the AI plan? Regenerate it with a natural language instruction in plain English or Spanish.",
    'feat.f6.t':  'Ready to deploy',
    'feat.f6.d':  'Each generated project ships with a Dockerfile and entrypoint script. One command to run it.',

    /* ── Automations ── */
    'auto.label': 'N8N AUTOMATIONS',
    'auto.title': 'Decoupled workflows for everything outside Django.',
    'auto.sub':   'From welcome emails to auto-shutdown of inactive containers — handled by n8n, not bolted into the core app.',
    'auto.i1': 'On register',
    'auto.i2': 'On login',
    'auto.i3': 'Project ready',
    'auto.i4': 'Docker build & run',
    'auto.i5': 'Idle containers, hourly',
    'auto.i6': 'Daily 11:00 report',

    /* ── Manual divider ── */
    'div.label': 'USER MANUAL',
    'div.title': 'Step-by-step guide.',
    'div.sub':   'Everything you need to know before using WebBuilder for the first time.',

    /* ── Sidebar ── */
    'sb.overview': 'OVERVIEW',
    'sb.intro':    'Introduction',
    'sb.quick':    'Quick start',
    'sb.account':  'ACCOUNT',
    'sb.register': 'Register',
    'sb.login':    'Login',
    'sb.usage':    'USAGE',
    'sb.step1':    'Paste your URL',
    'sb.step2':    'Review the plan',
    'sb.step3':    'Generate project',
    'sb.step4':    'Download & deploy',
    'sb.more':     'MORE',
    'sb.apis':     'Tested APIs',
    'sb.history':  'History',
    'sb.config':   'Configuration',
    'sb.errors':   'Common errors',

    /* ── Breadcrumbs ── */
    'bc.intro':    'Introduction',
    'bc.quick':    'Quick start',
    'bc.register': 'Register',
    'bc.login':    'Login',
    'bc.step1':    'Paste your URL',
    'bc.step2':    'Review the plan',
    'bc.step3':    'Generate project',
    'bc.step4':    'Download & deploy',
    'bc.apis':     'Tested APIs',
    'bc.history':  'History',
    'bc.config':   'Configuration',
    'bc.errors':   'Common errors',

    /* ── Manual pages ── */
    'p.intro.title': 'Welcome to WebBuilder',
    'p.intro.lead':  'WebBuilder is a web platform that converts any public API into a deployable website using generative AI to analyze the data, propose an architecture and write the code.',
    'p.intro.h1':    'What can you do with it?',
    'p.intro.p1':    "Skip the repetitive work of turning a dataset into a usable site. Paste a URL, supervise the AI's proposal, and download a real Django project ready to run.",
    'p.intro.l1':    'Generate blogs, catalogs, dashboards, portfolios — whatever fits your data.',
    'p.intro.l2':    "Customize the AI's plan with natural language if you don't like the default.",
    'p.intro.l3':    'Get models, views, templates with Tailwind, and a Dockerfile in one ZIP.',
    'p.intro.l4':    'Save every analysis to your personal history for later review.',
    'p.intro.note':  'This is a Final Degree Project. The platform is in active development — expect rough edges. Your feedback helps.',

    'p.quick.title': 'Quick start',
    'p.quick.lead':  'From zero to deployed site in under five minutes.',
    'p.quick.s1t':   'Register an account',
    'p.quick.s1d':   "Sign up with email and password. You'll receive a welcome email via n8n.",
    'p.quick.s2t':   'Paste a public API URL',
    'p.quick.s2d':   'Any endpoint returning JSON or XML. WebBuilder detects the format automatically.',
    'p.quick.s3t':   'Review the AI proposal and generate',
    'p.quick.s3d':   'Accept the LLM plan or regenerate with a custom prompt. Click generate.',
    'p.quick.s4t':   'Download the ZIP and run it',
    'p.quick.s4d':   "Unzip, build the Docker image, and you're online.",

    'p.reg.title': 'Creating your account',
    'p.reg.lead':  'Registration is required to save your generations and access the history.',
    'p.reg.h1':    "What you'll need",
    'p.reg.l1':    "A valid email address (you'll get a welcome message via n8n).",
    'p.reg.l2':    'A password (use a strong one — your analyses are stored under this account).',
    'p.reg.l3':    'A username for display.',
    'p.reg.note':  "After registering, an n8n workflow sends a welcome email. If you don't receive it within a few minutes, check your spam folder.",

    'p.log.title': 'Logging in',
    'p.log.lead':  'Once registered, log in with your credentials. Each session triggers an automatic notification email.',
    'p.log.warn':  "If you can't access your account, password recovery is being implemented. For now, contact the administrator.",

    'p.s1.title': 'Step 1 — Paste your API URL',
    'p.s1.lead':  'The first step is to provide a public API endpoint that returns JSON or XML data.',
    'p.s1.h1':    'URL requirements',
    'p.s1.h2':    'Examples that work well',
    'p.s1.l1':    'Must be publicly accessible (no auth headers supported yet).',
    'p.s1.l2':    'Must return JSON (application/json) or XML (application/xml).',
    'p.s1.l3':    'Should ideally return a list/array of structured records.',
    'p.s1.tip':   'Tip: The more structured the data, the better the AI proposal. APIs with consistent fields across records work best.',

    'p.s2.title': 'Step 2 — Review the AI plan',
    'p.s2.lead':  'The LLM analyzes the dataset and proposes a complete plan. Your job is to review it and decide.',
    'p.s2.h1':    "What's in the proposal",
    'p.s2.h2':    'Edit the schema before generating',
    'p.s2.l1':    'Site type — blog, catalog, portfolio, dashboard, etc.',
    'p.s2.l2':    'Relevant fields — what to show and what to ignore.',
    'p.s2.l3':    'Human-readable labels — clean names for each field.',
    'p.s2.l4':    'Data preview — first few normalized records.',
    'p.s2.p1':    "If the proposal doesn't match what you want, use the editor to adjust fields, labels and site type — or write a natural language instruction to regenerate the plan entirely.",

    'p.s3.title': 'Step 3 — Generate the project',
    'p.s3.lead':  'Once the plan is approved, WebBuilder generates the complete source code.',
    'p.s3.h1':    'What gets generated',
    'p.s3.l1':    'models.py — Django models adapted to your data.',
    'p.s3.l2':    'views.py & urls.py — routes and view logic.',
    'p.s3.l3':    'templates/ — HTML with Tailwind CSS, responsive.',
    'p.s3.l4':    'load_data — management command that fetches and loads the data.',
    'p.s3.l5':    'Dockerfile & entrypoint.sh — ready for deployment.',
    'p.s3.tip':   "Generation takes 20–60 seconds depending on the LLM provider. You'll receive an email notification when it's done.",

    'p.s4.title': 'Step 4 — Download and deploy',
    'p.s4.lead':  'Download the ZIP, unzip it, and you have a full Django project ready to run.',
    'p.s4.h1':    'Run it locally',
    'p.s4.h2':    'Or with Docker',
    'p.s4.p1':    'Visit http://localhost:8000 and your generated site is live.',

    'p.apis.title':      'APIs tested with WebBuilder',
    'p.apis.lead':       "These public APIs have been verified to work well. Use them as a starting point if you're not sure where to begin.",
    'p.apis.col.api':    'API',
    'p.apis.col.url':    'Endpoint',
    'p.apis.col.format': 'Format',
    'p.apis.col.type':   'Site type',
    'p.apis.col.notes':  'Notes',
    'p.apis.n1':         'No key required',
    'p.apis.n2':         'No key required, ideal for testing',
    'p.apis.n3':         'No key required, 250 records',
    'p.apis.tip':        'Tip: Add ?limit=20 or similar parameters to keep the dataset small during your first test — generation is faster and the AI proposal is more accurate with focused data.',

    'p.h.title': 'Analysis history',
    'p.h.lead':  'Every analysis you run is saved to your personal history. Review past generations, re-download projects, or inspect errors.',
    'p.h.h1':    'Stored for each entry',
    'p.h.l1':    'URL and date of the analysis',
    'p.h.l2':    'Status (success, error, in progress)',
    'p.h.l3':    'Raw data downloaded from the API',
    'p.h.l4':    'Parsed data and LLM summary',
    'p.h.l5':    'Errors, if any',

    'p.c.title': 'Configuration',
    'p.c.lead':  'WebBuilder reads its LLM configuration from a .env file. Change provider with three variables.',
    'p.c.h1':    '.env example',
    'p.c.h2':    'Supported providers',
    'p.c.p1':    'Any provider implementing the OpenAI /chat/completions format. Tested with:',
    'p.c.l1':    'Groq — fast inference, free tier.',
    'p.c.l2':    'OpenRouter — broad model catalog with one API.',
    'p.c.l3':    'OpenAI — original endpoint, GPT-4 models.',
    'p.c.l4':    'Local models — via Ollama or LM Studio with OpenAI-compatible API.',
    'p.c.warn':  'Never commit your .env file to git. Use .env.example as a template instead.',

    'p.err.title': 'Common errors & fixes',
    'p.err.lead':  'Something went wrong? Here are the most frequent issues and how to solve them.',
    'p.err.e1.t':  'The API URL returns an error or empty data',
    'p.err.e1.d':  'Check that the URL is publicly accessible and returns JSON or XML. Some APIs require an API key or specific query params. Try opening the URL in your browser first.',
    'p.err.e2.t':  'The AI plan generation fails or times out',
    'p.err.e2.d':  'Usually a provider issue — check your LLM_API_KEY is valid and the model name is correct. Try switching to Groq (fastest) or OpenRouter if your primary provider is down.',
    'p.err.e3.t':  'The generated code has a syntax error',
    'p.err.e3.d':  'This can happen with smaller models on complex datasets. Use the regenerate button with a corrective prompt like "Fix any syntax errors and keep the same structure." GPT-4 or Claude produce fewer of these.',
    'p.err.e4.t':  'The Docker build fails after downloading the ZIP',
    'p.err.e4.d':  "Ensure Docker is running locally. Check the requirements.txt inside the ZIP — sometimes the LLM adds a package that doesn't exist. Remove any unknown package and rebuild.",
    'p.err.e5.t':  'The AI proposes wrong fields or misidentifies the site type',
    'p.err.e5.d':  'Use the regenerate prompt to guide the AI. For example: "This is a list of products. Use name, price and category. Generate a catalog layout." The more specific, the better.',
    'p.err.note':  'If you find an error not listed here, check the analysis history — the full error message is stored there for each failed generation.',

    'p.faq.title': 'Frequently asked questions',
    'p.faq.lead':  'Common questions about WebBuilder.',
    'p.faq.q1':    'Does WebBuilder support private APIs with authentication?',
    'p.faq.a1':    'Not yet. The first version only supports public endpoints. Auth support (headers, OAuth) is on the roadmap.',
    'p.faq.q2':    'Can I edit the generated code?',
    'p.faq.a2':    'Absolutely. The generated project is a regular Django project — edit, refactor, and deploy as you would any other.',
    'p.faq.q3':    'Which LLM gives the best results?',
    'p.faq.a3':    "GPT-4 and Claude give the most coherent output, but Groq's Llama 3.3 70B is much faster and usually good enough. The prompts are tuned to work well across providers.",
    'p.faq.q4':    'What happens if the LLM produces broken code?',
    'p.faq.a4':    'The system includes validation checks. If a syntax error is detected, you can regenerate the project with a corrective prompt.',
    'p.faq.q5':    'Is my data shared with the LLM provider?',
    'p.faq.a5':    'Yes — a sample of the parsed data is sent to the LLM so it can analyze the structure. Use local models if you need full privacy.',
    'p.faq.q6':    'How large can the dataset be?',
    'p.faq.a6':    "WebBuilder sends a sample (not the full dataset) to the LLM for analysis. The full data is loaded by the generated management command at runtime. There's no hard limit, but very large APIs may need pagination.",

    /* ── Academic resources ── */
    'ac.label':   'ACADEMIC RESOURCES',
    'ac.title':   'Project documentation.',
    'ac.sub':     'Full academic materials behind WebBuilder — thesis and defense presentation.',
    'ac.mem.t':   'Final Degree Project',
    'ac.mem.d':   'Complete thesis document covering the research, design, development and evaluation of WebBuilder.',
    'ac.mem.btn': 'Download thesis',
    'ac.pres.t':  'Defense Presentation',
    'ac.pres.d':  'Slides used during the tribunal defense. Key findings, architecture overview and live demo summary.',
    'ac.pres.btn':'View presentation',

    'vid.pipeline': 'FULL PIPELINE — FROM API URL TO GENERATED SITE',
    'vid.local':    'LOCAL DEPLOYMENT WALKTHROUGH',
    'vid.local.cmd': 'RUN IT LOCALLY',
    'vid.title': 'See it in action.',
    'how.steplabel': 'FOUR STEPS',

    /* ── Instalation ── */
    'sb.install':     'Installation',
    'bc.install':     'Installation',
    'p.inst.title':   'Installation',
    'p.inst.lead':    'How to run WebBuilder on your local machine from scratch.',
    'p.inst.h0':      'Prerequisites',
    'p.inst.l1':      'Python 3.11 or higher',
    'p.inst.l2':      'PostgreSQL 14 or higher',
    'p.inst.l3':      'Git',
    'p.inst.l4':      'A valid API key for any OpenAI-compatible LLM provider (Groq, OpenRouter, OpenAI…)',
    'p.inst.h1':      '1. Clone the repository',
    'p.inst.h2':      '2. Create and activate a virtual environment',
    'p.inst.h3':      '3. Install dependencies',
    'p.inst.h4':      '4. Configure the environment',
    'p.inst.p4':      'Copy the example file and fill in your values:',
    'p.inst.p4b':     'Minimum required variables:',
    'p.inst.note1':   'To generate a valid FIELD_ENCRYPTION_KEY run:',
    'p.inst.h5':      '5. Create the database',
    'p.inst.h6':      '6. Run migrations',
    'p.inst.h7':      '7. Start the server',
    'p.inst.p5':      'Open http://localhost:8000 and WebBuilder is ready.',
    'p.inst.note2':   'n8n is optional for local development. Without it, email notifications and automated deploys won\'t work, but the core generation flow works fine.',
    
    'p.inst.p4b':       'Full .env reference — edit each value before running the app:',
    'p.inst.env.db':    'PostgreSQL credentials. You must have PostgreSQL running locally and the database created (step 5 below). Leave HOST and PORT as-is unless your setup differs.',
    'p.inst.env.llm':   'The AI provider WebBuilder uses to analyze APIs and generate code. Groq is recommended to start — it has a free tier and is the fastest. Just set your key and leave the URL and model as shown.',
    'p.inst.env.n8n':   'Optional webhooks for automations (welcome emails, deploy, notifications). If you don\'t have n8n running locally, leave the default values — the app will start fine without them.',
    'p.inst.env.token': 'A static token to protect internal metric endpoints. Set any random string.',
    'p.inst.env.fernet':'Fernet key used to encrypt user API keys stored in the database. Required. Generate one with:',
    
    /* ── Footer ── */
    'footer.tag': 'Final Degree Project · API-to-Website with generative AI'
  },

  es: {
    /* ── Navbar ── */
    'nav.how':          'Cómo funciona',
    'nav.examples':     'Ejemplos',
    'nav.features':     'Funcionalidades',
    'nav.automations':  'Automatizaciones',
    'nav.manual':       'Manual',
    'nav.cta':          'Empezar',

    /* ── Hero ── */
    'hero.badge':   'IA GENERATIVA · TRABAJO DE FIN DE GRADO 2026',
    'hero.title1':  'Convierte cualquier API en una',
    'hero.title2':  'web completa',
    'hero.title3':  '— automáticamente',
    'hero.sub':     'Pega la URL de una API pública, revisa el plan generado por IA y descarga un proyecto Django listo para desplegar. Sin boilerplate, sin configuración.',
    'hero.cta1':    'Ir al manual',
    'hero.cta2':    'Ver cómo funciona',
    'hero.cta3':    'Abrir WebBuilder',
    'hero.chip1':   'Entrada multi-formato',
    'hero.chip2':   'Schema IA editable',
    'hero.chip3':   'Generación de código Django',

    /* ── App mockup ── */
    'mock.detected':    'Schema detectado',
    'mock.detectedSub': '6 campos · vista colección',
    'mock.ready':       'listo',

    /* ── Stats ── */
    'stat.analyses': 'Análisis realizados',
    'stat.sites':    'Sitios generados',
    'stat.workflows':'Workflows de automatización n8n',
    'stat.success':  'Tasa de éxito en análisis',

    /* ── How it works ── */
    'how.label': 'CÓMO FUNCIONA',
    'how.title': 'Cuatro pasos del dato crudo al sitio desplegado.',
    'how.sub':   'Un flujo guiado donde la IA propone y tú decides. Sin cajas negras, sin sorpresas.',
    'how.s1.t':  'Pega la URL de la API',
    'how.s1.d':  'JSON o XML — WebBuilder detecta y parsea el formato automáticamente de forma segura.',
    'how.s2.t':  'Revisa el plan de la IA',
    'how.s2.d':  'El LLM propone un tipo de sitio, campos relevantes y layout. Acepta o regenera con tu prompt.',
    'how.s3.t':  'Genera el proyecto',
    'how.s3.d':  'Proyecto Django completo: modelos, vistas, templates con Tailwind y un Dockerfile.',
    'how.s4.t':  'Descarga y despliega',
    'how.s4.d':  'Obtén un ZIP listo para ejecutar en local o desplegar con un solo comando Docker.',

    /* ── Media placeholders ── */
    'media.videoFlow':      'HUECO PARA VÍDEO — Demo del flujo completo',
    'media.videoFlowHint':  'Sustituir por grabación de pantalla de ~60s: entrada de URL → plan IA → generación → ZIP corriendo',
    'media.screenshot':     'HUECO PARA CAPTURA',
    'media.video':          'HUECO PARA VÍDEO',
    'media.hint.home':      'Sustituir por captura de la página principal de WebBuilder',
    'media.hint.quickstart':'Sustituir por vídeo demo de 60 segundos',
    'media.hint.register':  'Sustituir por captura del formulario de registro',
    'media.hint.login':     'Sustituir por captura del formulario de login',
    'media.hint.step1':     'Sustituir por captura de la pantalla de entrada de URL',
    'media.hint.step2a':    'Sustituir por captura de la pantalla de propuesta de la IA',
    'media.hint.step2b':    'Sustituir por vídeo mostrando el flujo de regeneración',
    'media.hint.step3':     'Sustituir por captura de la pantalla de progreso de generación',
    'media.hint.step4':     'Sustituir por captura del sitio generado corriendo en el navegador',
    'media.hint.history':   'Sustituir por captura del listado de historial',

    /* ── Examples ── */
    'ex.label':    'EJEMPLOS DE OUTPUT',
    'ex.title':    'Sitios reales generados por WebBuilder.',
    'ex.sub':      'Estos son proyectos Django reales producidos a partir de APIs públicas — descargados como ZIP y desplegados con un solo comando Docker.',
    'ex.ph':       'CAPTURA — sustituir por el sitio generado real',
    'ex.histLabel':'47 SITIOS PUBLICADOS EN EL SISTEMA',
    'ex.e1.t':     'Catálogo Rick & Morty',
    'ex.e1.d':     'Catálogo de personajes con imagen, nombre, especie y estado. Página de detalle por personaje. Responsive con Tailwind.',
    'ex.e2.t':     'Dashboard de Criptomonedas',
    'ex.e2.d':     'Dashboard con las 100 principales monedas, precio, variación 24h y capitalización. Datos cargados en tiempo real al arrancar.',
    'ex.e3.t':     'Recetas de Cócteles',
    'ex.e3.d':     'Catálogo de recetas con imagen, nombre, categoría e instrucciones. Layout de tarjetas limpio, listo para extender.',
    'ex.tag.catalog':   'catálogo',
    'ex.tag.dashboard': 'dashboard',
    'ex.tag.blog':      'blog',
    'ex.tag.portfolio': 'portfolio',

    /* ── LLM providers ── */
    'llm.label':     'PROVEEDORES COMPATIBLES',
    'llm.title':     'Compatible con cualquier LLM en formato OpenAI.',
    'llm.sub':       'Cambia de modelo y proveedor con tres variables de entorno. Sin modificar el código.',
    'llm.openai':    'GPT-4o y GPT-4 Turbo. Conecta tu propia clave para mayor calidad.',
    'llm.groq':      'Llama 4 Scout y Llama 3.3 70B. La inferencia más rápida, capa gratuita.',
    'llm.openrouter':'Llama 3.3 70B, Qwen3 Coder y más de 100 modelos con una sola API.',
    'llm.local':     'Ollama o LM Studio. Privacidad total, sin llamadas externas.',
    'llm.envLabel':  'Cambia de proveedor en segundos — solo actualiza tu .env:',

    /* ── Features ── */
    'feat.label': 'FUNCIONALIDADES PRINCIPALES',
    'feat.title': 'Construido alrededor del LLM como desarrollador guiado.',
    'feat.sub':   'Cada paso es supervisado. El modelo propone, tú apruebas. El output es código real y ejecutable.',
    'feat.f1.t':  'Soporte multi-LLM',
    'feat.f1.d':  'Compatible con cualquier proveedor en formato OpenAI: OpenRouter, Groq, modelos locales. Cambia con tres variables de entorno.',
    'feat.f2.t':  'Parsing seguro',
    'feat.f2.d':  'XML protegido con defusedxml contra ataques XXE. JSON vía librería estándar. Sin sorpresas.',
    'feat.f3.t':  'Historial por usuario',
    'feat.f3.d':  'Cada análisis se guarda: URL, fecha, estado, datos crudos, datos parseados, resumen del LLM y errores.',
    'feat.f4.t':  'Output Django real',
    'feat.f4.d':  'No un template lleno de placeholders: modelos, vistas, urls y templates adaptados a tu dataset.',
    'feat.f5.t':  'Prompts personalizados',
    'feat.f5.d':  '¿No te convence el plan de la IA? Regeneralo con una instrucción en lenguaje natural.',
    'feat.f6.t':  'Listo para desplegar',
    'feat.f6.d':  'Cada proyecto generado incluye un Dockerfile y script de entrypoint. Un comando para ejecutarlo.',

    /* ── Automations ── */
    'auto.label': 'AUTOMATIZACIONES N8N',
    'auto.title': 'Flujos desacoplados para todo lo que va fuera de Django.',
    'auto.sub':   'Desde emails de bienvenida hasta el apagado automático de contenedores inactivos — gestionado por n8n, no pegado al core.',
    'auto.i1': 'Al registrarse',
    'auto.i2': 'Al iniciar sesión',
    'auto.i3': 'Proyecto listo',
    'auto.i4': 'Build y run en Docker',
    'auto.i5': 'Contenedores inactivos, cada hora',
    'auto.i6': 'Informe diario a las 11:00',

    /* ── Manual divider ── */
    'div.label': 'MANUAL DE USUARIO',
    'div.title': 'Guía paso a paso.',
    'div.sub':   'Todo lo que necesitas saber antes de usar WebBuilder por primera vez.',

    /* ── Sidebar ── */
    'sb.overview': 'VISIÓN GENERAL',
    'sb.intro':    'Introducción',
    'sb.quick':    'Inicio rápido',
    'sb.account':  'CUENTA',
    'sb.register': 'Registro',
    'sb.login':    'Login',
    'sb.usage':    'USO',
    'sb.step1':    'Pega tu URL',
    'sb.step2':    'Revisa el plan',
    'sb.step3':    'Genera el proyecto',
    'sb.step4':    'Descarga y despliega',
    'sb.more':     'MÁS',
    'sb.apis':     'APIs probadas',
    'sb.history':  'Historial',
    'sb.config':   'Configuración',
    'sb.errors':   'Errores frecuentes',

    /* ── Breadcrumbs ── */
    'bc.intro':    'Introducción',
    'bc.quick':    'Inicio rápido',
    'bc.register': 'Registro',
    'bc.login':    'Login',
    'bc.step1':    'Pega tu URL',
    'bc.step2':    'Revisa el plan',
    'bc.step3':    'Genera el proyecto',
    'bc.step4':    'Descarga y despliega',
    'bc.apis':     'APIs probadas',
    'bc.history':  'Historial',
    'bc.config':   'Configuración',
    'bc.errors':   'Errores frecuentes',

    /* ── Manual pages ── */
    'p.intro.title': 'Bienvenido a WebBuilder',
    'p.intro.lead':  'WebBuilder es una plataforma web que convierte cualquier API pública en una web desplegable usando IA generativa para analizar los datos, proponer una arquitectura y escribir el código.',
    'p.intro.h1':    '¿Qué puedes hacer con esto?',
    'p.intro.p1':    'Olvídate del trabajo repetitivo de convertir un dataset en un sitio usable. Pega una URL, supervisa la propuesta de la IA y descarga un proyecto Django real listo para ejecutar.',
    'p.intro.l1':    'Genera blogs, catálogos, dashboards, portfolios — lo que mejor encaje con tus datos.',
    'p.intro.l2':    'Personaliza el plan de la IA con lenguaje natural si no te convence el de por defecto.',
    'p.intro.l3':    'Recibe modelos, vistas, templates con Tailwind y Dockerfile en un solo ZIP.',
    'p.intro.l4':    'Guarda cada análisis en tu historial personal para revisarlo después.',
    'p.intro.note':  'Esto es un Trabajo de Fin de Grado. La plataforma está en desarrollo activo — pueden aparecer bugs. Tu feedback ayuda.',

    'p.quick.title': 'Inicio rápido',
    'p.quick.lead':  'De cero a sitio desplegado en menos de cinco minutos.',
    'p.quick.s1t':   'Regístrate',
    'p.quick.s1d':   'Crea una cuenta con email y contraseña. Recibirás un correo de bienvenida vía n8n.',
    'p.quick.s2t':   'Pega la URL de una API pública',
    'p.quick.s2d':   'Cualquier endpoint que devuelva JSON o XML. WebBuilder detecta el formato automáticamente.',
    'p.quick.s3t':   'Revisa la propuesta de la IA y genera',
    'p.quick.s3d':   'Acepta el plan del LLM o regenéralo con un prompt personalizado. Pulsa generar.',
    'p.quick.s4t':   'Descarga el ZIP y ejecútalo',
    'p.quick.s4d':   'Descomprime, construye la imagen Docker y estás online.',

    'p.reg.title': 'Crear tu cuenta',
    'p.reg.lead':  'El registro es necesario para guardar tus generaciones y acceder al historial.',
    'p.reg.h1':    'Qué necesitas',
    'p.reg.l1':    'Un email válido (recibirás un mensaje de bienvenida vía n8n).',
    'p.reg.l2':    'Una contraseña (usa una fuerte — tus análisis se guardan bajo esta cuenta).',
    'p.reg.l3':    'Un nombre de usuario para mostrar.',
    'p.reg.note':  'Tras registrarte, un workflow de n8n dispara un email automático. Si no lo recibes en unos minutos, revisa la carpeta de spam.',

    'p.log.title': 'Iniciar sesión',
    'p.log.lead':  'Una vez registrado, accede con tus credenciales. Cada sesión dispara un email de notificación automático.',
    'p.log.warn':  'Si no puedes acceder a tu cuenta, el flujo de recuperación de contraseña está en desarrollo. Por ahora, contacta con el administrador.',

    'p.s1.title': 'Paso 1 — Pega la URL de la API',
    'p.s1.lead':  'El primer paso es proporcionar un endpoint de API pública que devuelva datos en JSON o XML.',
    'p.s1.h1':    'Requisitos de la URL',
    'p.s1.h2':    'Ejemplos que funcionan bien',
    'p.s1.l1':    'Debe ser accesible públicamente (no se soportan headers de autenticación aún).',
    'p.s1.l2':    'Debe devolver JSON (application/json) o XML (application/xml).',
    'p.s1.l3':    'Idealmente devuelve una lista/array de registros estructurados.',
    'p.s1.tip':   'Consejo: Cuanto más estructurados estén los datos, mejor será la propuesta de la IA. Las APIs con campos consistentes entre registros funcionan mejor.',

    'p.s2.title': 'Paso 2 — Revisa el plan de la IA',
    'p.s2.lead':  'El LLM analiza el dataset y propone un plan completo. Tu trabajo es revisarlo y decidir.',
    'p.s2.h1':    'Qué incluye la propuesta',
    'p.s2.h2':    'Editar el schema antes de generar',
    'p.s2.l1':    'Tipo de sitio — blog, catálogo, portfolio, dashboard, etc.',
    'p.s2.l2':    'Campos relevantes — qué mostrar y qué ignorar.',
    'p.s2.l3':    'Etiquetas legibles — nombres limpios para cada campo.',
    'p.s2.l4':    'Vista previa de los datos — los primeros registros normalizados.',
    'p.s2.p1':    'Si la propuesta no encaja con lo que quieres, usa el editor para ajustar campos, etiquetas y tipo de sitio — o escribe una instrucción en lenguaje natural para regenerar el plan.',

    'p.s3.title': 'Paso 3 — Genera el proyecto',
    'p.s3.lead':  'Una vez aprobado el plan, WebBuilder genera el código fuente completo.',
    'p.s3.h1':    'Qué se genera',
    'p.s3.l1':    'models.py — modelos Django adaptados a tus datos.',
    'p.s3.l2':    'views.py & urls.py — rutas y lógica de las vistas.',
    'p.s3.l3':    'templates/ — HTML con Tailwind CSS, responsive.',
    'p.s3.l4':    'load_data — management command que descarga y carga los datos.',
    'p.s3.l5':    'Dockerfile y entrypoint.sh — listos para desplegar.',
    'p.s3.tip':   'La generación puede tardar 20-60 segundos según el proveedor del LLM. Recibirás un email cuando termine.',

    'p.s4.title': 'Paso 4 — Descarga y despliega',
    'p.s4.lead':  'Descarga el ZIP, descomprímelo y tendrás un proyecto Django completo listo para ejecutar.',
    'p.s4.h1':    'Ejecutar en local',
    'p.s4.h2':    'O con Docker',
    'p.s4.p1':    'Visita http://localhost:8000 y tu sitio generado estará online.',

    'p.apis.title':      'APIs probadas con WebBuilder',
    'p.apis.lead':       'Estas APIs públicas han sido verificadas y funcionan bien. Úsalas como punto de partida si no sabes por dónde empezar.',
    'p.apis.col.api':    'API',
    'p.apis.col.url':    'Endpoint',
    'p.apis.col.format': 'Formato',
    'p.apis.col.type':   'Tipo de sitio',
    'p.apis.col.notes':  'Notas',
    'p.apis.n1':         'Sin clave requerida',
    'p.apis.n2':         'Sin clave requerida, ideal para pruebas',
    'p.apis.n3':         'Sin clave requerida, 250 registros',
    'p.apis.tip':        'Consejo: Añade ?limit=20 o parámetros similares para mantener el dataset pequeño en tu primera prueba — la generación es más rápida y la propuesta de la IA más precisa con datos acotados.',

    'p.h.title': 'Historial de análisis',
    'p.h.lead':  'Cada análisis que lanzas se guarda en tu historial personal. Revisa generaciones pasadas, vuelve a descargar proyectos o inspecciona errores.',
    'p.h.h1':    'Qué se guarda en cada entrada',
    'p.h.l1':    'URL y fecha del análisis',
    'p.h.l2':    'Estado (éxito, error, en proceso)',
    'p.h.l3':    'Datos crudos descargados de la API',
    'p.h.l4':    'Datos parseados y resumen del LLM',
    'p.h.l5':    'Errores, si los hay',

    'p.c.title': 'Configuración',
    'p.c.lead':  'WebBuilder lee su configuración del LLM desde un archivo .env. Cambia de proveedor con tres variables.',
    'p.c.h1':    'Ejemplo de .env',
    'p.c.h2':    'Proveedores soportados',
    'p.c.p1':    'Cualquier proveedor que implemente el formato /chat/completions de OpenAI. Probado con:',
    'p.c.l1':    'Groq — inferencia rápida, capa gratuita.',
    'p.c.l2':    'OpenRouter — catálogo amplio de modelos con una sola API.',
    'p.c.l3':    'OpenAI — endpoint original, modelos GPT-4.',
    'p.c.l4':    'Modelos locales — vía Ollama o LM Studio con API compatible OpenAI.',
    'p.c.warn':  'Nunca subas tu archivo .env a git. Usa .env.example como plantilla.',

    'p.err.title': 'Errores frecuentes y soluciones',
    'p.err.lead':  '¿Algo ha salido mal? Aquí están los problemas más habituales y cómo resolverlos.',
    'p.err.e1.t':  'La URL de la API devuelve error o datos vacíos',
    'p.err.e1.d':  'Verifica que la URL sea accesible públicamente y devuelva JSON o XML. Algunas APIs requieren clave o parámetros específicos. Prueba abrir la URL en el navegador primero.',
    'p.err.e2.t':  'La generación del plan de IA falla o expira',
    'p.err.e2.d':  'Suele ser un problema del proveedor — comprueba que LLM_API_KEY es válida y el nombre del modelo es correcto. Prueba cambiar a Groq (más rápido) u OpenRouter si tu proveedor principal falla.',
    'p.err.e3.t':  'El código generado tiene un error de sintaxis',
    'p.err.e3.d':  'Puede ocurrir con modelos pequeños en datasets complejos. Usa el botón de regenerar con un prompt correctivo como "Corrige cualquier error de sintaxis manteniendo la misma estructura." GPT-4 o Claude generan menos de estos.',
    'p.err.e4.t':  'El build de Docker falla después de descargar el ZIP',
    'p.err.e4.d':  'Asegúrate de que Docker está corriendo en local. Revisa el requirements.txt dentro del ZIP — a veces el LLM añade un paquete que no existe. Elimina cualquier paquete desconocido y reconstruye.',
    'p.err.e5.t':  'La IA propone campos incorrectos o identifica mal el tipo de sitio',
    'p.err.e5.d':  'Usa el prompt de regeneración para guiar a la IA. Por ejemplo: "Esto es una lista de productos. Usa nombre, precio y categoría. Genera un layout de catálogo." Cuanto más específico, mejor.',
    'p.err.note':  'Si encuentras un error no listado aquí, revisa el historial de análisis — el mensaje de error completo se guarda para cada generación fallida.',

    'p.faq.title': 'Preguntas frecuentes',
    'p.faq.lead':  'Preguntas comunes sobre WebBuilder.',
    'p.faq.q1':    '¿WebBuilder soporta APIs privadas con autenticación?',
    'p.faq.a1':    'Todavía no. La primera versión solo soporta endpoints públicos. El soporte de auth (headers, OAuth) está en el roadmap.',
    'p.faq.q2':    '¿Puedo editar el código generado?',
    'p.faq.a2':    'Por supuesto. El proyecto generado es un proyecto Django normal — edítalo, refactorízalo y despliégalo como cualquier otro.',
    'p.faq.q3':    '¿Qué LLM da los mejores resultados?',
    'p.faq.a3':    'GPT-4 y Claude dan el output más coherente, pero Llama 3.3 70B en Groq es mucho más rápido y normalmente suficiente. Los prompts están ajustados para funcionar bien entre proveedores.',
    'p.faq.q4':    '¿Qué pasa si el LLM genera código roto?',
    'p.faq.a4':    'El sistema incluye comprobaciones de validación. Si se detecta un error de sintaxis, puedes regenerar el proyecto con un prompt correctivo.',
    'p.faq.q5':    '¿Se comparten mis datos con el proveedor del LLM?',
    'p.faq.a5':    'Sí — se envía una muestra de los datos parseados al LLM para que analice la estructura. Usa modelos locales si necesitas privacidad total.',
    'p.faq.q6':    '¿Qué tamaño máximo puede tener el dataset?',
    'p.faq.a6':    "WebBuilder envía una muestra (no el dataset completo) al LLM para el análisis. Los datos completos los carga el management command generado en tiempo de ejecución. No hay límite fijo, pero las APIs muy grandes pueden necesitar paginación.",

    /* ── Recursos académicos ── */ 
    'ac.label':   'RECURSOS ACADÉMICOS',
    'ac.title':   'Documentación del proyecto.',
    'ac.sub':     'Materiales académicos completos de WebBuilder — memoria y presentación ante el tribunal.',
    'ac.mem.t':   'Trabajo de Fin de Grado',
    'ac.mem.d':   'Documento completo de la memoria con el diseño, desarrollo y evaluación de WebBuilder.',
    'ac.mem.btn': 'Descargar memoria',
    'ac.pres.t':  'Presentación de defensa',
    'ac.pres.d':  'Diapositivas usadas ante el tribunal. Hallazgos clave, arquitectura y resumen de la demo.',
    'ac.pres.btn':'Ver presentación',

    'vid.pipeline': 'PIPELINE COMPLETO — DE URL DE API A SITIO GENERADO',
    'vid.local':    'DESPLIEGUE EN LOCAL — PASO A PASO',
    'vid.local.cmd': 'EJECUTAR EN LOCAL',
    'vid.title': 'Míralo en acción.',
    'how.steplabel': 'CUATRO PASOS',
    
    /* ── Instalation ── */
    'sb.install':     'Instalación',
    'bc.install':     'Instalación',
    'p.inst.title':   'Instalación',
    'p.inst.lead':    'Cómo ejecutar WebBuilder en tu máquina local desde cero.',
    'p.inst.h0':      'Requisitos previos',
    'p.inst.l1':      'Python 3.11 o superior',
    'p.inst.l2':      'PostgreSQL 14 o superior',
    'p.inst.l3':      'Git',
    'p.inst.l4':      'Una API key válida de cualquier proveedor compatible con OpenAI (Groq, OpenRouter, OpenAI…)',
    'p.inst.h1':      '1. Clonar el repositorio',
    'p.inst.h2':      '2. Crear y activar el entorno virtual',
    'p.inst.h3':      '3. Instalar dependencias',
    'p.inst.h4':      '4. Configurar el entorno',
    'p.inst.p4':      'Copia el archivo de ejemplo y rellena tus valores:',
    'p.inst.p4b':     'Variables mínimas necesarias:',
    'p.inst.note1':   'Para generar un FIELD_ENCRYPTION_KEY válido ejecuta:',
    'p.inst.h5':      '5. Crear la base de datos',
    'p.inst.h6':      '6. Aplicar migraciones',
    'p.inst.h7':      '7. Arrancar el servidor',
    'p.inst.p5':      'Abre http://localhost:8000 y WebBuilder estará listo.',
    'p.inst.note2':   'n8n es opcional para desarrollo local. Sin él no funcionarán las notificaciones por email ni el despliegue automático, pero el flujo principal de generación sí funciona.',

    'p.inst.p4b':       'Referencia completa del .env — edita cada valor antes de arrancar la app:',
    'p.inst.env.db':    'Credenciales de PostgreSQL. Debes tener PostgreSQL corriendo en local y la base de datos creada (paso 5). Deja HOST y PORT como están salvo que tu configuración sea diferente.',
    'p.inst.env.llm':   'El proveedor de IA que usa WebBuilder para analizar APIs y generar código. Groq es el recomendado para empezar — tiene tier gratuito y es el más rápido. Solo pon tu clave y deja la URL y el modelo tal como están.',
    'p.inst.env.n8n':   'Webhooks opcionales para automatizaciones (emails de bienvenida, despliegue, notificaciones). Si no tienes n8n corriendo en local, deja los valores por defecto — la app arranca sin ellos.',
    'p.inst.env.token': 'Token estático para proteger los endpoints internos de métricas. Pon cualquier string aleatorio.',
    'p.inst.env.fernet':'Clave Fernet para cifrar las API keys de los usuarios en la base de datos. Obligatoria. Genera una con:',
    
    /* ── Footer ── */
    'footer.tag': 'Trabajo de Fin de Grado · API a web con IA generativa'
  }
};

/**
 * Apply a language to the whole page.
 */
function setLang(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key   = el.getAttribute('data-i18n');
    const value = translations[lang][key];
    if (value !== undefined) el.textContent = value;
  });

  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  document.getElementById('lang-es').classList.toggle('active', lang === 'es');

  try { localStorage.setItem('wb-lang', lang); } catch (e) {}
}

// Restore saved language on load
(function initLang() {
  try {
    const saved = localStorage.getItem('wb-lang');
    if (saved && translations[saved]) setLang(saved);
  } catch (e) {}
})();