// Configure a verified contact destination here before using this form for leads.
const contactEmail = 'contato@hodegres.com';
const frames = {
  "clusters": {
    "src": "assets/monitor-clusters.webp",
    "name": "clusters",
    "category": "CLUSTERS",
    "title": "A operação em uma visão.",
    "description": "CPU, memória, disco e conexões. Contexto para identificar onde investigar.",
    "alt": "Visão de clusters do Hodegres.monitor. Interface real com dados fictícios.",
    "height": 880
  },
  "errors": {
    "src": "assets/monitor-logs-errors.webp",
    "name": "logs / erros",
    "category": "LOGS · ERROS",
    "title": "Do erro ao contexto.",
    "description": "Exemplos de chave duplicada, deadlock, timeout e conflitos de transação. Mensagem, aplicação e SQL no mesmo contexto.",
    "alt": "Logs demonstrativos de erros PostgreSQL, com detalhes de uma chave duplicada, deadlock e timeout. Dados fictícios.",
    "height": 900
  },
  "duration": {
    "src": "assets/monitor-logs-duration.webp",
    "name": "logs / duration",
    "category": "LOGS · DURATION",
    "title": "Encontre o que está demorando.",
    "description": "Eventos de duration mostram o tempo registrado no log e a consulta associada. Um ponto de partida para investigar a carga.",
    "alt": "Logs demonstrativos DURATION com tempos de execução e consultas SQL. Dados fictícios.",
    "height": 900
  },
  "health": {
    "src": "assets/monitor-health.webp",
    "name": "health-check / database",
    "category": "HEALTH-CHECK",
    "title": "Saúde com histórico.",
    "description": "Snapshots do database: conexões, cache hit, rollback, distribuição de tuplas e indicadores de I/O.",
    "alt": "Health-check do database com cache hit, conexões e distribuição de tuplas. Dados fictícios.",
    "height": 1000
  },
  "vacuum": {
    "src": "assets/monitor-vacuum.webp",
    "name": "health-check / autovacuum",
    "category": "AUTOVACUUM",
    "title": "Manutenção com contexto.",
    "description": "Tuplas mortas, atividade de atualização e histórico de vacuum ajudam a orientar a revisão de manutenção.",
    "alt": "Health-check de autovacuum com tabelas, tuplas mortas e histórico de manutenção. Dados fictícios.",
    "height": 900
  },
  "bloat": {
    "src": "assets/monitor-bloat.webp",
    "name": "health-check / bloat",
    "category": "BLOAT DE TABELAS",
    "title": "Entenda o espaço das tabelas.",
    "description": "Estimativas de bloat, tamanho do heap e fillfactor para orientar a investigação. Estimativa não é espaço garantido recuperável.",
    "alt": "Health-check de bloat com estimativas de espaço, heap e fillfactor por tabela. Dados fictícios.",
    "height": 900
  },
  "settings": {
    "src": "assets/monitor-settings.webp",
    "name": "health-check / configurações",
    "category": "CONFIGURAÇÕES",
    "title": "Configuração também é diagnóstico.",
    "description": "Compare valores atuais, padrões da versão e contexto de aplicação dos parâmetros. Nenhuma alteração é aplicada pela tela.",
    "alt": "Health-check de parâmetros PostgreSQL com configuração atual, padrão e contexto de aplicação. Dados fictícios.",
    "height": 900
  }
};
const tabs = [...document.querySelectorAll('[data-frame]')];
function selectFrame(tab) {
  const frame = frames[tab.dataset.frame];
  tabs.forEach(item => { item.setAttribute('aria-selected',String(item === tab));item.tabIndex = item === tab ? 0 : -1; });
  const image = document.querySelector('#frame-image');
  image.src = frame.src;image.alt = frame.alt;
  image.width = 1600;image.height = frame.height;
  const position = String(tabs.indexOf(tab)+1).padStart(2,'0');
  document.querySelector('#frame-category').textContent = position+' / '+frame.category;
  document.querySelector('#frame-title').textContent = frame.title;
  document.querySelector('#frame-description').textContent = frame.description;
  document.querySelector('#frame-count').textContent = position+' / '+String(tabs.length).padStart(2,'0');
  document.querySelector('#frame-name').textContent = 'hodegres.monitor / '+frame.name;
  document.querySelector('#frame-panel').setAttribute('aria-labelledby',tab.id);
  const zoom = document.querySelector('#frame-zoom');
  zoom.dataset.image = frame.src;zoom.dataset.caption = frame.alt;
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click',() => selectFrame(tab));
  tab.addEventListener('keydown',event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index+1)%tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index-1+tabs.length)%tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length-1;
    if (next === undefined) return;
    event.preventDefault();selectFrame(tabs[next]);tabs[next].focus();
  });
});
function moveFrame(direction) {
  const current = tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true');
  selectFrame(tabs[(current+direction+tabs.length)%tabs.length]);
}
document.querySelector('#frame-prev').addEventListener('click',() => moveFrame(-1));
document.querySelector('#frame-next').addEventListener('click',() => moveFrame(1));
document.querySelectorAll('[data-proposal]').forEach(button => button.addEventListener('click',() => {
  document.querySelector('#interest').value = button.dataset.proposal;
  document.querySelector('#contato').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  document.querySelector('#name').focus({preventScroll:true});
}));
const dialog = document.querySelector('#image-dialog');
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click',() => {
  document.querySelector('#dialog-image').src = button.dataset.image;
  document.querySelector('#dialog-image').alt = button.dataset.caption;
  document.querySelector('#image-caption').textContent = button.dataset.caption;
  dialog.showModal();
}));
document.querySelector('#close-image').addEventListener('click',() => dialog.close());
dialog.addEventListener('click',event => {if(event.target === dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
if (contactEmail) {
  document.querySelector('#contact-submit').firstChild.textContent = 'Solicitar proposta por e-mail ';
  document.querySelector('#contact-note').textContent = 'Seu aplicativo de e-mail abrirá com o resumo. Revise e envie para '+contactEmail+'.';
}
document.querySelector('#contact-form').addEventListener('submit',event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = 'Consultoria Hodegres — '+data.get('interest');
  const body = 'PEDIDO DE PROPOSTA / HODEGRES\n\nNome: '+data.get('name').trim()+'\nE-mail: '+data.get('email').trim()+'\nInteresse: '+data.get('interest')+'\n\nCenário:\n'+data.get('message').trim();
  const status = document.querySelector('#form-status');status.hidden = false;
  if (contactEmail) {
    window.location.href = 'mailto:'+contactEmail+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    status.textContent = 'Pedido preparado. Conclua o envio no seu aplicativo de e-mail.';
  } else {
    const url = URL.createObjectURL(new Blob([body],{type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');link.href = url;link.download = 'pedido-de-proposta-hodegres.txt';link.click();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    status.textContent = 'Resumo preparado para download. Nenhuma mensagem foi enviada. O canal de contato ainda será configurado nesta prévia.';
  }
});
