// Configure a verified contact destination here before using this form for leads.
const contactEmail = 'contato@hodegres.com';
const frames = {
  clusters: {src:'assets/monitor-clusters.webp',name:'clusters',alt:'Visão de clusters do Hodegres.monitor. Interface real com dados fictícios.'},
  health: {src:'assets/monitor-health.webp',name:'health-check',alt:'Health-check do Hodegres.monitor com indicadores do database. Interface real com dados fictícios.'}
};
const tabs = [...document.querySelectorAll('[data-frame]')];
function selectFrame(tab) {
  const frame = frames[tab.dataset.frame];
  tabs.forEach(item => { item.setAttribute('aria-selected',String(item === tab));item.tabIndex = item === tab ? 0 : -1; });
  const image = document.querySelector('#frame-image');
  image.src = frame.src;image.alt = frame.alt;
  image.width = 1600;image.height = tab.dataset.frame === 'health' ? 1000 : 880;
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
