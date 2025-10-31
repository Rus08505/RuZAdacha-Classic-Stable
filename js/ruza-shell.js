(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const KEY='ruza.theme';
  function injectShell(){
    if($('#ruzaTopbar')) return;
    const top=document.createElement('div');
    top.id='ruzaTopbar'; top.className='ruza-topbar';
    top.innerHTML=`<button class="ruza-hamb" id="ruzaHamb" aria-label="Открыть меню"><span></span><span></span><span></span></button>
      <button class="ruza-brand" id="ruzaHome" aria-label="Домой"><img src="./assets/logo.png" alt="Логотип"><div class="ruza-title">RuZAdacha</div></button>`;
    document.body.prepend(top);
    const drawer=document.createElement('aside'); drawer.id='ruzaDrawer'; drawer.className='ruza-drawer';
    drawer.innerHTML=`<div class="ruza-drawer-head"><img src="./assets/logo.png" alt="Логотип"><div class="ruza-title">Меню</div></div>
      <nav class="ruza-nav">
        <button class="ruza-item" data-anchor="today">Сегодня</button>
        <button class="ruza-item" data-anchor="ideas">Идеи</button>
        <button class="ruza-item" data-anchor="tasks">Задачи</button>
        <button class="ruza-item" data-anchor="finance">Деньги</button>
        <button class="ruza-item" data-anchor="habits">Привычки</button>
        <button class="ruza-item" data-anchor="analytics">Аналитика</button>
        <div class="spacer"></div>
        <button class="ruza-item" data-anchor="settings">Настройки</button>
      </nav>`;
    document.body.appendChild(drawer);
    const scrim=document.createElement('div'); scrim.id='ruzaScrim'; scrim.className='ruza-scrim'; document.body.appendChild(scrim);
    const settings=document.createElement('section'); settings.id='settings'; settings.innerHTML=`
      <div id="ruza-settings" class="card">
        <div class="card-title">Тема приложения</div>
        <label class="row"><input type="radio" name="ruza-theme" value="neon"> <span>Неоновая</span></label>
        <label class="row"><input type="radio" name="ruza-theme" value="gradient"> <span>Градиентная</span></label>
        <label class="row"><input type="radio" name="ruza-theme" value="black"> <span>Чёрная</span></label>
      </div>`;
    // append near end if main exists
    (document.querySelector('main')||document.body).appendChild(settings);
  }
  function apply(t){const h=document.documentElement;h.classList.remove('theme-neon','theme-gradient','theme-black');h.classList.add('theme-'+t);localStorage.setItem(KEY,t);}
  function openMenu(){ $('#ruzaDrawer').classList.add('open'); $('#ruzaScrim').classList.add('show'); document.documentElement.classList.add('ruza-lock'); document.body.classList.add('ruza-lock'); }
  function closeMenu(){ $('#ruzaDrawer').classList.remove('open'); $('#ruzaScrim').classList.remove('show'); document.documentElement.classList.remove('ruza-lock'); document.body.classList.remove('ruza-lock'); }
  function go(anchor){ const el=document.getElementById(anchor)||document.querySelector(`[data-route="${anchor}"]`); if(el&&el.scrollIntoView){el.scrollIntoView({behavior:'smooth',block:'start'});} closeMenu(); }
  document.addEventListener('DOMContentLoaded',()=>{
    injectShell();
    apply(localStorage.getItem(KEY)||'neon');
    $('#ruzaHamb')?.addEventListener('click',openMenu);
    $('#ruzaScrim')?.addEventListener('click',closeMenu);
    $('#ruzaHome')?.addEventListener('click',()=>go('today'));
    $$('.ruza-item').forEach(b=>b.addEventListener('click',()=>go(b.getAttribute('data-anchor'))));
    $$('input[name="ruza-theme"]').forEach(r=>{ r.checked=(localStorage.getItem(KEY)||'neon')===r.value; r.addEventListener('change',e=>apply(e.target.value)); });
  });
})();