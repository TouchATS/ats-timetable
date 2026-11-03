"use strict";
(()=>{
 const shell=document.querySelector('.app-shell'),sidebar=document.getElementById('sidebar'),button=document.getElementById('sidebarToggle'),overlay=document.getElementById('sidebarOverlay');
 const hideButton=document.createElement('button');hideButton.id='sidebarHideButton';hideButton.type='button';hideButton.textContent='◀ ซ่อนแถบด้านข้าง';hideButton.className='btn btn-gray';hideButton.style.cssText='margin:10px;min-height:40px;flex-shrink:0';hideButton.onclick=()=>toggleSidebar();sidebar.prepend(hideButton);
 const showButton=document.createElement('button');showButton.id='sidebarShowButton';showButton.type='button';showButton.textContent='☰ แสดงแถบด้านข้าง';showButton.className='btn btn-primary';showButton.style.cssText='position:fixed;left:12px;bottom:16px;z-index:85;min-height:44px;box-shadow:0 2px 8px #0003';showButton.onclick=()=>toggleSidebar();shell.append(showButton);
 const mobile=matchMedia('(max-width:900px)');
 let hidden=false;try{hidden=localStorage.getItem('ats_sidebar_hidden')==='1';}catch{}
 function update(){
  const expanded=mobile.matches?sidebar.classList.contains('open'):!hidden;
  shell.classList.toggle('sidebar-collapsed',!mobile.matches&&hidden);
  button.setAttribute('aria-expanded',String(expanded));button.setAttribute('aria-controls','sidebar');
  button.setAttribute('aria-label',expanded?'ซ่อนแถบด้านข้าง':'แสดงแถบด้านข้าง');button.title=button.getAttribute('aria-label');
  sidebar.inert=!expanded;showButton.style.display=expanded?'none':'inline-flex';showButton.setAttribute('aria-controls','sidebar');showButton.setAttribute('aria-expanded',String(expanded));
 }
 toggleSidebar=function(){if(mobile.matches){sidebar.classList.toggle('open');overlay.classList.toggle('open',sidebar.classList.contains('open'));}else{hidden=!hidden;try{localStorage.setItem('ats_sidebar_hidden',hidden?'1':'0');}catch{}}update();};
 closeSidebar=function(){sidebar.classList.remove('open');overlay.classList.remove('open');update();};
 mobile.addEventListener('change',closeSidebar);
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobile.matches&&sidebar.classList.contains('open')){closeSidebar();button.focus();}});
 update();
})();
