// ====== Menu / Temas ======
function openMenu() { document.getElementById("menu_aba").style.display = "block"; }
function closeMenu(){ document.getElementById("menu_aba").style.display = "none"; }

function temaLim() {
  document.documentElement.style.setProperty('--cor-click', '#38184C');
  document.documentElement.style.setProperty('--cor-sombra', '#9b0a59');
  document.documentElement.style.setProperty('--cor-text', 'black');
  document.documentElement.style.setProperty('--cor-back1', '#CEF09D');
  document.documentElement.style.setProperty('--cor-back2', '#4f6a93');
  document.documentElement.style.setProperty('--md-sys-color-primary', '#38184C');
}
function temaInatel() {
  document.documentElement.style.setProperty('--cor-click', '#126ae2');
  document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
  document.documentElement.style.setProperty('--cor-text', 'black');
  document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
  document.documentElement.style.setProperty('--cor-back2', '#6a937a');
  document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
}
function temaDark() {
  const cores = {
    '--cor-click': '#CEF09D',
    '--cor-sombra': '#9b0a59',
    '--cor-text': 'black',
    '--cor-back1': '#38184C',
    '--cor-back2': '#4f6a93',
    '--md-sys-color-primary': '#CEF09D'
  };
  for (const [variavel, valor] of Object.entries(cores)) {
    document.documentElement.style.setProperty(variavel, valor);
  }
}

// ====== Home: Eventos / Carousel ======
const eventos = [
  { id: 1, title: 'Semana do Software 2025', date: '12/05', time: '10:00', location: 'Salão de Eventos', type: 'tech', description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400' },
  { id: 2, title: 'Workshop de IoT', date: '12/01', time: '08:00', location: 'Laboratório CS&I', type: 'tech', description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400' },
  { id: 3, title: 'Festa dos Alunos 2025', date: '18/05', time: '19:00', location: 'Área Esportiva', type: 'cultural', description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400' },
  { id: 4, title: 'Feira de Oportunidades', date: '04/05', time: '10:00', location: 'Salão de Eventos', type: 'academic', description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400' }
];
const carousel = document.querySelector('.carousel');

if (carousel) {
  function createCards() {
    eventos.forEach(event => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <div class="info">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
        </div>`;
      carousel.appendChild(card);
    });
  }
  let index = 0;
  function nextCard(){ index = (index + 1) % eventos.length; updateCarousel(); }
  function prevCard(){ index = (index - 1 + eventos.length) % eventos.length; updateCarousel(); }
  function updateCarousel(){ carousel.style.transform = `translateX(-${index * 100}%)`; }
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  nextBtn && nextBtn.addEventListener('click', nextCard);
  prevBtn && prevBtn.addEventListener('click', prevCard);
  setInterval(nextCard, 5000);
  let startX;
  carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
  carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
  });
  createCards();
}

// ====== Componente Aulas ======
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.aulas = [
      { id: 1, disciplina: 'S05 - Interface Homem-máquina', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: false, prova: '12/05', frequencia: '10/25', nota: '10' },
      { id: 2, disciplina: 'E01 - Circuitos Elétricos em Corrente Contínua', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '5' },
      { id: 3, disciplina: 'M02 - Álgebra e Geometria Analítica', data: 'qua', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '7' }
    ];
    this.hoje = "ter";
  }
  connectedCallback(){ this.render(); }
  render(){
    const aulasDia = this.aulas.filter(a => a.data === this.hoje);
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula { position: relative; background-color: white; padding: 15px; margin: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
      .titulo_aula { font-family: "Arimo", sans-serif; font-weight: bold; font-size: 15px; color: var(--cor-text); padding: 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      p { font-family: "Arimo", sans-serif; font-size: 11px; color: var(--cor-text); line-height: 1.5; padding: 0 5px; margin: 0; }
      .lables { display: flex; }
      .lable-prova { background-color: var(--prova); padding: 7px 15px; margin-bottom: 10px; border-radius: 500px; text-align: center }
      .lable-frequencia { background-color: var(--frequencia); padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .lable-nota { background-color: var(--prova); padding: 7px 15px; margin-right: 10px; border-radius: 500px; }
      .p_lable { font-family: "Arimo", sans-serif; font-size: 11px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      </style>
      <div>
        ${aulasDia.map(a => {
          let provaDisplay = a.prova_alert ? '' : 'display: none;';
          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }
}
customElements.define('aulas-component', AulasComponent);

/* ==========================================================
   VAGAS (front-only, com localStorage) + MODAL de detalhes
   ========================================================== */
(function () {
  const jobsListEl = document.getElementById('jobs_list');
  if (!jobsListEl) return;

  // --- Helpers
  const formatDateBR = (iso) => {
    try {
      const d = new Date(iso);
      if (isNaN(d)) return iso;
      const dd = String(d.getDate()).padStart(2,'0');
      const mm = String(d.getMonth()+1).padStart(2,'0');
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    } catch { return iso; }
  };
  const getDateKey = (j) => j.anuncio || j.recente || '1970-01-01';

  // Heurísticas simples p/ techs e salário (evita hardcode 1 por 1)
  const inferTechs = (titulo) => {
    const t = titulo.toLowerCase();
    const tags = new Set();
    if (/front|react|angular|vue/.test(t)) tags.add('HTML/CSS').add('JS/TS').add('React/Vue/Angular');
    if (/back|node|api|go|python|java|\.net/.test(t)) tags.add('APIs REST').add('Node/Java/.NET/Go');
    if (/mobile|android|kotlin|react native|ios/.test(t)) tags.add('Mobile').add('Kotlin/Swift/RN');
    if (/data|dados|analyst|engineer|sql|python/.test(t)) tags.add('SQL').add('Python').add('ETL');
    if (/qa|teste|qualidade/.test(t)) tags.add('Testes').add('Automação/Manual');
    if (/devops|cloud|aws|azure|gcp/.test(t)) tags.add('CI/CD').add('Cloud');
    if (/seguran|sec/.test(t)) tags.add('OWASP').add('Pentest/DevSecOps');
    if (/produto|product/.test(t)) tags.add('Roadmap').add('Discovery');
    if (/redes|infra/.test(t)) tags.add('Redes').add('Linux/Windows');
    if (tags.size === 0) tags.add('Colaboração').add('Git');
    return Array.from(tags);
  };
  const inferSalario = (tipo) => {
    if (tipo === 'Estágio') return 'R$ 1.200 – 1.800 (bolsa)';
    if (tipo === 'Trainee') return 'R$ 2.500 – 3.500';
    return 'R$ 3.500 – 6.000'; // Júnior
  };

  // --- Referências de UI
  const searchEl = document.getElementById('job_search');
  const tipoEl   = document.getElementById('filter_tipo');
  const modalEl  = document.getElementById('filter_modalidade');
  const sortEl   = document.getElementById('sort_by');

  const tabAll     = document.getElementById('tab_all');
  const tabApplied = document.getElementById('tab_applied');
  const tabSaved   = document.getElementById('tab_saved');

  const emptyEl    = document.getElementById('jobs_empty');
  const skeletonEl = document.getElementById('jobs_skeleton');
  const toastEl    = document.getElementById('jobs_toast');
  const clearFiltersBtn = document.getElementById('clear_filters');
  const toolbarEl  = document.getElementById('jobs_toolbar');

  // Bulk actions container
  let bulkActionsEl = document.getElementById('bulk_actions');
  if (!bulkActionsEl && toolbarEl) {
    bulkActionsEl = document.createElement('div');
    bulkActionsEl.id = 'bulk_actions';
    bulkActionsEl.className = 'bulk-actions';
    toolbarEl.appendChild(bulkActionsEl);
  }

  // --- Dados base (com descrição curta) ---
  const DEFAULT_JOBS = [
    { id: 1,  titulo: 'Estágio Front-end',        empresa: 'TechNova',        tipo: 'Estágio', modalidade: 'Remoto',     anuncio: '2025-05-12', applied: false, saved: false, descricao: 'Apoiar telas responsivas em HTML/CSS/JS, correções simples e revisão de PRs.' },
    { id: 2,  titulo: 'Desenvolvedor Júnior',     empresa: 'Inatel Labs',     tipo: 'Júnior',  modalidade: 'Presencial', anuncio: '2025-05-10', applied: false, saved: false, descricao: 'Manutenção de APIs REST, pequenas features e suporte a integrações internas.' },
    { id: 3,  titulo: 'Trainee Backend',          empresa: 'CodeBridge',      tipo: 'Trainee', modalidade: 'Híbrido',    anuncio: '2025-05-08', applied: false, saved: false, descricao: 'Aprender microsserviços, testes unitários, logs e monitoramento básico.' },
    { id: 4,  titulo: 'Estágio QA',               empresa: 'QualySoft',       tipo: 'Estágio', modalidade: 'Presencial', anuncio: '2025-05-06', applied: false, saved: false, descricao: 'Criação de casos de teste, execução manual e registro de bugs.' },
    { id: 5,  titulo: 'Júnior Mobile',            empresa: 'AppWorks',        tipo: 'Júnior',  modalidade: 'Remoto',     anuncio: '2025-05-04', applied: false, saved: false, descricao: 'Implementar telas mobile, consumo de APIs e correções de layout.' },
    { id: 6,  titulo: 'Estágio Data Science',     empresa: 'DataWiz',         tipo: 'Estágio', modalidade: 'Híbrido',    anuncio: '2025-05-03', applied: false, saved: false, descricao: 'Coletar dados, limpeza básica e criação de notebooks exploratórios.' },
    { id: 7,  titulo: 'Júnior DevOps',            empresa: 'CloudEdge',       tipo: 'Júnior',  modalidade: 'Remoto',     anuncio: '2025-05-02', applied: false, saved: false, descricao: 'Pipelines CI/CD, infra como código e observabilidade inicial.' },
    { id: 8,  titulo: 'Trainee Segurança',        empresa: 'SecureIT',        tipo: 'Trainee', modalidade: 'Presencial', anuncio: '2025-05-01', applied: false, saved: false, descricao: 'Apoiar análises de vulnerabilidade e boas práticas de hardening.' },
    { id: 9,  titulo: 'Estágio UX/UI',            empresa: 'PixelCraft',      tipo: 'Estágio', modalidade: 'Remoto',     anuncio: '2025-04-29', applied: false, saved: false, descricao: 'Wireframes, protótipos e testes rápidos com usuários.' },
    { id: 10, titulo: 'Júnior Backend',           empresa: 'APIx',            tipo: 'Júnior',  modalidade: 'Híbrido',    anuncio: '2025-04-28', applied: false, saved: false, descricao: 'CRUDs, endpoints REST e testes básicos.' },
    { id: 11, titulo: 'Júnior Mobile React Native', empresa: 'MobilityOne',   tipo: 'Júnior',  modalidade: 'Híbrido',    anuncio: '2025-04-27', applied: false, saved: false, descricao: 'Novas telas, navegação e integração com push.' },
    { id: 12, titulo: 'Estágio Infraestrutura',   empresa: 'NetCore',         tipo: 'Estágio', modalidade: 'Presencial', anuncio: '2025-04-26', applied: false, saved: false, descricao: 'Suporte a redes, inventário e documentação.' },
    { id: 13, titulo: 'Trainee Full Stack',       empresa: 'StackLab',        tipo: 'Trainee', modalidade: 'Remoto',     anuncio: '2025-04-25', applied: false, saved: false, descricao: 'Aprender front/back com mentoria e pequenas features.' },
    { id: 14, titulo: 'Júnior QA Automação',      empresa: 'Testify',         tipo: 'Júnior',  modalidade: 'Remoto',     anuncio: '2025-04-24', applied: false, saved: false, descricao: 'Scripts E2E, manutenção de suites e reports.' },
    { id: 15, titulo: 'Estágio Mobile',           empresa: 'PocketApps',      tipo: 'Estágio', modalidade: 'Híbrido',    anuncio: '2025-04-23', applied: false, saved: false, descricao: 'Protótipos, ajustes de UI e testes em dispositivos.' },
    { id: 16, titulo: 'Júnior Data Engineer',     empresa: 'DataWiz',         tipo: 'Júnior',  modalidade: 'Híbrido',    anuncio: '2025-04-22', applied: false, saved: false, descricao: 'ETLs simples, modelagem e orquestração.' },
    { id: 17, titulo: 'Estágio Suporte TI',       empresa: 'HelpDesk+',       tipo: 'Estágio', modalidade: 'Presencial', anuncio: '2025-04-21', applied: false, saved: false, descricao: 'Atendimento N1 e checklist de equipamentos.' },
    { id: 18, titulo: 'Trainee Ciência de Dados', empresa: 'InsightAI',       tipo: 'Trainee', modalidade: 'Remoto',     anuncio: '2025-04-20', applied: false, saved: false, descricao: 'Exploração de dados e métricas de modelo.' },
    { id: 19, titulo: 'Júnior Front-end (Vue)',   empresa: 'WebWave',         tipo: 'Júnior',  modalidade: 'Remoto',     anuncio: '2025-04-19', applied: false, saved: false, descricao: 'Componentes Vue, rotas e integração com APIs.' },
    { id: 20, titulo: 'Estágio Redes',            empresa: 'NetLink',         tipo: 'Estágio', modalidade: 'Híbrido',    anuncio: '2025-04-18', applied: false, saved: false, descricao: 'Configurações básicas e testes de conectividade.' },
    { id: 21, titulo: 'Júnior C#/.NET',           empresa: 'SoftHouse',       tipo: 'Júnior',  modalidade: 'Presencial', anuncio: '2025-04-17', applied: false, saved: false, descricao: 'APIs .NET, EF e ajustes de negócio.' },
    { id: 22, titulo: 'Estágio Segurança Offensive', empresa: 'RedShield',    tipo: 'Estágio', modalidade: 'Remoto',     anuncio: '2025-04-16', applied: false, saved: false, descricao: 'Apoiar pentests supervisionados e relatórios.' },
    { id: 23, titulo: 'Trainee Produto',          empresa: 'ProdMind',        tipo: 'Trainee', modalidade: 'Híbrido',    anuncio: '2025-04-15', applied: false, saved: false, descricao: 'Requisitos, priorização e validações.' },
    { id: 24, titulo: 'Júnior Full Stack (Node/React)', empresa: 'CodeFlow',  tipo: 'Júnior',  modalidade: 'Remoto',     anuncio: '2025-04-14', applied: false, saved: false, descricao: 'API Node, telas React e testes.' },
    { id: 25, titulo: 'Estágio Banco de Dados',   empresa: 'DBWorks',         tipo: 'Estágio', modalidade: 'Presencial', anuncio: '2025-04-13', applied: false, saved: false, descricao: 'Consultas SQL, backups e tuning inicial.' },
    { id: 26, titulo: 'Júnior QA Manual',         empresa: 'QualySoft',       tipo: 'Júnior',  modalidade: 'Híbrido',    anuncio: '2025-04-12', applied: false, saved: false, descricao: 'Testes funcionais, exploratórios e evidências.' },
    { id: 27, titulo: 'Trainee Cloud',            empresa: 'Nimbus',          tipo: 'Trainee', modalidade: 'Remoto',     anuncio: '2025-04-11', applied: false, saved: false, descricao: 'Fundamentos AWS/Azure e deploys básicos.' },
    { id: 28, titulo: 'Estágio Python',           empresa: 'PyWorks',         tipo: 'Estágio', modalidade: 'Remoto',     anuncio: '2025-04-10', applied: false, saved: false, descricao: 'Scripts, automações simples e parse de dados.' },
    { id: 29, titulo: 'Júnior Android (Kotlin)',  empresa: 'DroidLab',        tipo: 'Júnior',  modalidade: 'Presencial', anuncio: '2025-04-09', applied: false, saved: false, descricao: 'Jetpack, retrofit, view models e testes.' },
    { id: 30, titulo: 'Estágio React Native',     empresa: 'MobilityOne',     tipo: 'Estágio', modalidade: 'Híbrido',    anuncio: '2025-04-08', applied: false, saved: false, descricao: 'Componentes RN, consumo de API e performance.' },
    { id: 31, titulo: 'Júnior Data Analyst',      empresa: 'InsightAI',       tipo: 'Júnior',  modalidade: 'Híbrido',    anuncio: '2025-04-07', applied: false, saved: false, descricao: 'Dashboards, KPIs e storytelling.' },
    { id: 32, titulo: 'Trainee DevSecOps',        empresa: 'SecureIT',        tipo: 'Trainee', modalidade: 'Presencial', anuncio: '2025-04-06', applied: false, saved: false, descricao: 'Segurança no pipeline e SAST.' },
    { id: 33, titulo: 'Estágio Front-end (Angular)', empresa: 'WebWave',      tipo: 'Estágio', modalidade: 'Remoto',     anuncio: '2025-04-05', applied: false, saved: false, descricao: 'Componentes Angular, serviços e RxJS.' },
    { id: 34, titulo: 'Júnior Backend (Go)',      empresa: 'APIx',            tipo: 'Júnior',  modalidade: 'Remoto',     anuncio: '2025-04-04', applied: false, saved: false, descricao: 'Handlers Go, modelos, testes e logs.' },
    { id: 35, titulo: 'Estágio Suporte Aplicações', empresa: 'AppWorks',      tipo: 'Estágio', modalidade: 'Presencial', anuncio: '2025-04-03', applied: false, saved: false, descricao: 'Monitorar filas, triagem de incidentes e documentação.' }
  ];

  const LS_KEY = 'inatel_vagas_v1';

  function loadState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return DEFAULT_JOBS;
      const arr = JSON.parse(raw);
      const byId = new Map(arr.map(j => [j.id, j]));
      return DEFAULT_JOBS.map(j => ({ ...j, ...(byId.get(j.id) || {}) }));
    } catch { return DEFAULT_JOBS; }
  }
  function saveState(list) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch {}
  }

  let jobs = loadState();
  let activeTab = 'all'; // all | applied | saved
  let renderToken = 0;

  function applyFilters() {
    const q    = (searchEl?.value || '').trim().toLowerCase();
    const tipo = tipoEl?.value || '';
    const mod  = modalEl?.value || '';
    const sort = sortEl?.value || 'recentes';

    let arr = jobs.slice();
    if (activeTab === 'applied') arr = arr.filter(j => j.applied);
    if (activeTab === 'saved')   arr = arr.filter(j => j.saved);

    if (tipo) arr = arr.filter(j => j.tipo === tipo);
    if (mod)  arr = arr.filter(j => j.modalidade === mod);
    if (q)    arr = arr.filter(j =>
      j.titulo.toLowerCase().includes(q) ||
      j.empresa.toLowerCase().includes(q)
    );

    if (sort === 'empresa_az') {
      arr.sort((a, b) => a.empresa.localeCompare(b.empresa, 'pt-BR'));
    } else {
      arr.sort((a, b) => new Date(getDateKey(b)) - new Date(getDateKey(a)));
    }
    return arr;
  }

  function showSkeleton(show) { skeletonEl.style.display = show ? 'block' : 'none'; }

  function showToast(msg) {
    toastEl.textContent = msg || 'Candidatura marcada!';
    toastEl.style.display = 'block';
    setTimeout(() => (toastEl.style.display = 'none'), 1600);
  }

  function buildBulkActions() {
    if (!bulkActionsEl) return;
    const countApplied = jobs.filter(j => j.applied).length;
    const countSaved   = jobs.filter(j => j.saved).length;
    let html = '';
    if (activeTab === 'applied' && countApplied > 0) {
      html = `<div class="chip-btn danger" role="button" tabindex="0" data-action="clear-applied">
                Remover todas as candidaturas (${countApplied})
              </div>`;
    } else if (activeTab === 'saved' && countSaved > 0) {
      html = `<div class="chip-btn danger" role="button" tabindex="0" data-action="clear-saved">
                Remover todos os salvos (${countSaved})
              </div>`;
    }
    bulkActionsEl.innerHTML = html;
    bulkActionsEl.style.display = html ? 'flex' : 'none';
  }

  function render() {
    const token = ++renderToken;
    showSkeleton(true);
    jobsListEl.innerHTML = '';
    emptyEl.style.display = 'none';
    buildBulkActions();

    setTimeout(() => {
      if (token !== renderToken) return;

      const data = applyFilters();
      if (data.length === 0) {
        emptyEl.style.display = 'block';
        showSkeleton(false);
        return;
      }

      const frag = document.createDocumentFragment();
      data.forEach(job => {
        const card = document.createElement('div');
        card.className = 'comp-aula job-card';
        card.dataset.id = job.id;
        card.innerHTML = `
          <div class="meta-row">
            <div>
              <h3 style="margin:0 0 4px 0;">${job.titulo}</h3>
              <p class="font"><b>${job.empresa}</b> · ${job.tipo} · ${job.modalidade}</p>
            </div>
            <div class="meta-right">
              <div class="anuncio font">
                <span class="material-symbols-outlined icon">event</span>
                <span>Anúncio: <b>${formatDateBR(getDateKey(job))}</b></span>
              </div>
              <div class="badges">
                ${job.applied ? '<div class="lable-frequencia p_lable">Candidatado ✓</div>' : ''}
                ${job.saved   ? '<div class="lable-frequencia p_lable">Salva ★</div>'       : ''}
              </div>
            </div>
          </div>
          <p class="desc font">${job.descricao}</p>
          <div class="actions">
            <div class="chip-btn p_lable job-apply" data-id="${job.id}">${job.applied ? 'Remover candidatura' : 'Candidatar'}</div>
            <div class="chip-btn p_lable job-save" data-id="${job.id}">${job.saved ? 'Remover dos salvos' : 'Salvar'}</div>
          </div>`;
        frag.appendChild(card);
      });
      jobsListEl.appendChild(frag);
      showSkeleton(false);
    }, 300);
  }

  function toggleApplied(id) {
    jobs = jobs.map(j => j.id === id ? ({ ...j, applied: !j.applied }) : j);
    saveState(jobs);
    render();
    const j = jobs.find(x => x.id === id);
    showToast(j && j.applied ? 'Candidatura marcada!' : 'Candidatura removida.');
  }
  function toggleSaved(id) {
    jobs = jobs.map(j => j.id === id ? ({ ...j, saved: !j.saved }) : j);
    saveState(jobs);
    render();
  }
  function clearAllApplied() {
    let changed = false;
    jobs = jobs.map(j => j.applied ? (changed = true, { ...j, applied: false }) : j);
    if (changed) { saveState(jobs); render(); showToast('Todas as candidaturas foram removidas.'); }
  }
  function clearAllSaved() {
    let changed = false;
    jobs = jobs.map(j => j.saved ? (changed = true, { ...j, saved: false }) : j);
    if (changed) { saveState(jobs); render(); showToast('Todos os salvos foram removidos.'); }
  }

  function setActiveTab(tab) {
    activeTab = tab;
    [tabAll, tabApplied, tabSaved].forEach(el => el && el.classList.remove('is-active'));
    if (tab === 'all')     tabAll && tabAll.classList.add('is-active');
    if (tab === 'applied') tabApplied && tabApplied.classList.add('is-active');
    if (tab === 'saved')   tabSaved && tabSaved.classList.add('is-active');
    render();
  }

  /* ========= MODAL ========= */
  let modalElRoot = null;
  function ensureModalRoot() {
    if (modalElRoot) return modalElRoot;
    modalElRoot = document.createElement('div');
    modalElRoot.id = 'job_modal';
    modalElRoot.setAttribute('aria-modal', 'true');
    modalElRoot.setAttribute('role', 'dialog');
    modalElRoot.innerHTML = `<div class="job-modal-content" role="document"></div>`;
    document.body.appendChild(modalElRoot);
    // Fechar ao clicar fora
    modalElRoot.addEventListener('click', (e) => {
      if (e.target.id === 'job_modal') closeModal();
    });
    // ESC fecha
    document.addEventListener('keydown', (e) => {
      if (modalElRoot.classList.contains('show') && e.key === 'Escape') closeModal();
    });
    return modalElRoot;
  }

  function openModal(job) {
    const root = ensureModalRoot();
    const content = root.querySelector('.job-modal-content');

    const techs = inferTechs(job.titulo);
    const salario = inferSalario(job.tipo);
    const longDesc =
      `${job.descricao} Responsabilidades: apoiar o time na entrega de features, colaborar no fluxo de code review e testes. ` +
      `Requisitos: boa base na área, versionamento com Git e vontade de aprender. Diferenciais: comunicação e proatividade.`;

    content.innerHTML = `
      <div class="job-modal-header">
        <div class="job-modal-left">
          <h3>${job.titulo}</h3>
          <p class="font"><b>${job.empresa}</b> · ${job.tipo} · ${job.modalidade}</p>
        </div>
        <div class="job-modal-right">
          <div class="anuncio font">
            <span class="material-symbols-outlined icon">event</span>
            <span>Anúncio: <b>${formatDateBR(getDateKey(job))}</b></span>
          </div>
          ${job.applied ? '<div class="lable-frequencia p_lable">Candidatado ✓</div>' : ''}
          ${job.saved   ? '<div class="lable-frequencia p_lable">Salva ★</div>'       : ''}
          <button class="job-modal-close" aria-label="Fechar"><span class="material-symbols-outlined">close</span></button>
        </div>
      </div>

      <div class="job-modal-section">
        <p class="font">${longDesc}</p>
      </div>

      <div class="job-modal-section job-meta-row">
        <div class="job-salario font">
          <span class="material-symbols-outlined icon">payments</span>
          <span><b>${salario}</b></span>
        </div>
        <div class="job-techs">
          ${techs.map(t => `<span class="chip-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="job-modal-section actions">
        <div class="chip-btn p_lable job-apply" data-id="${job.id}">
          ${job.applied ? 'Remover candidatura' : 'Candidatar'}
        </div>
        <div class="chip-btn p_lable job-save" data-id="${job.id}">
          ${job.saved ? 'Remover dos salvos' : 'Salvar'}
        </div>
      </div>
    `;

    // Listeners internos (fechar / aplicar / salvar)
    content.querySelector('.job-modal-close')?.addEventListener('click', closeModal);
    content.addEventListener('click', (e) => {
      const btnApply = e.target.closest('.job-apply');
      const btnSave  = e.target.closest('.job-save');
      if (btnApply) { toggleApplied(parseInt(btnApply.dataset.id, 10)); /* reabre com estado atual */ openModal(jobs.find(j => j.id === job.id)); }
      if (btnSave)  { toggleSaved(parseInt(btnSave.dataset.id, 10));   openModal(jobs.find(j => j.id === job.id)); }
    });

    root.classList.add('show');
    document.body.style.overflow = 'hidden';
    // Acessibilidade: focar no botão de fechar
    setTimeout(() => content.querySelector('.job-modal-close')?.focus(), 0);
  }

  function closeModal() {
    if (!modalElRoot) return;
    modalElRoot.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Listeners de lista (delegação)
  jobsListEl.addEventListener('click', (e) => {
    // Prioridade: cliques de aplicar/salvar NÃO abrem modal
    const btnApply = e.target.closest('.job-apply');
    const btnSave  = e.target.closest('.job-save');
    if (btnApply) { toggleApplied(parseInt(btnApply.dataset.id, 10)); return; }
    if (btnSave)  { toggleSaved(parseInt(btnSave.dataset.id, 10)); return; }

    const card = e.target.closest('.job-card');
    if (card && card.dataset.id) {
      const id = parseInt(card.dataset.id, 10);
      const job = jobs.find(j => j.id === id);
      if (job) openModal(job);
    }
  });

  toolbarEl?.addEventListener('click', (e) => {
    const clearApplied = e.target.closest('[data-action="clear-applied"]');
    const clearSaved   = e.target.closest('[data-action="clear-saved"]');
    if (clearApplied) clearAllApplied();
    if (clearSaved)   clearAllSaved();
  });

  searchEl?.addEventListener('input', render);
  tipoEl?.addEventListener('change', render);
  modalEl?.addEventListener('change', render);
  sortEl?.addEventListener('change', render);

  tabAll?.addEventListener('click',     () => setActiveTab('all'));
  tabApplied?.addEventListener('click', () => setActiveTab('applied'));
  tabSaved?.addEventListener('click',   () => setActiveTab('saved'));

  clearFiltersBtn?.addEventListener('click', () => {
    if (searchEl) searchEl.value = '';
    if (tipoEl)   tipoEl.value = '';
    if (modalEl)  modalEl.value = '';
    if (sortEl)   sortEl.value = 'recentes';
    setActiveTab('all');
  });

  // Inicial
  setActiveTab('all');
})();
