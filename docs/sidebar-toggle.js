"use strict";
(()=>{
 const shell=document.querySelector('.app-shell'),sidebar=document.getElementById('sidebar'),button=document.getElementById('sidebarToggle'),overlay=document.getElementById('sidebarOverlay');
 const mobile=matchMedia('(max-width:900px)');
 let hidden=false;try{hidden=localStorage.getItem('ats_sidebar_hidden')==='1';}catch{}
 function update(){
  const expanded=mobile.matches?sidebar.classList.contains('open'):!hidden;
  shell.classList.toggle('sidebar-collapsed',!mobile.matches&&hidden);
  button.setAttribute('aria-expanded',String(expanded));button.setAttribute('aria-controls','sidebar');
  button.setAttribute('aria-label',expanded?'ซ่อนแถบด้านข้าง':'แสดงแถบด้านข้าง');button.title=button.getAttribute('aria-label');
  sidebar.inert=!expanded;
 }
 toggleSidebar=function(){if(mobile.matches){sidebar.classList.toggle('open');overlay.classList.toggle('open',sidebar.classList.contains('open'));}else{hidden=!hidden;try{localStorage.setItem('ats_sidebar_hidden',hidden?'1':'0');}catch{}}update();};
 closeSidebar=function(){sidebar.classList.remove('open');overlay.classList.remove('open');update();};
 mobile.addEventListener('change',closeSidebar);
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobile.matches&&sidebar.classList.contains('open')){closeSidebar();button.focus();}});
 update();
})();
