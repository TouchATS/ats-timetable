"use strict";
const ATS_IDLE_MS=30*60*1000;
let atsExpiring=false,atsLastPersist=0;
function atsCheckIdle(){if(!atsSession)return true;if(!Number.isFinite(atsSession.lastActive)||Date.now()-atsSession.lastActive>=ATS_IDLE_MS){atsExpireSession();return false;}return true;}
function atsExpireSession(){if(atsExpiring)return;atsExpiring=true;atsSession=null;_currentUser=null;_token='';sessionStorage.removeItem('ats_session_v2');localStorage.removeItem(LS.users);document.querySelectorAll('.modal-backdrop.open').forEach(e=>e.classList.remove('open'));document.querySelector('.app-shell')?.classList.remove('is-superadmin');for(const id of ['l_pass','pw_old','pw_new','pw_new2']){const e=document.getElementById(id);if(e)e.value='';}enterPublicMode().finally(()=>{showToast('ออกจากระบบอัตโนมัติ เนื่องจากไม่มีการใช้งาน 30 นาที กรุณาเข้าสู่ระบบใหม่',7000);atsExpiring=false;});}
function atsActivity(){if(document.visibilityState==='hidden'||!atsSession)return;if(!atsCheckIdle())return;atsSession.lastActive=Date.now();if(Date.now()-atsLastPersist>=1000){sessionStorage.setItem('ats_session_v2',JSON.stringify(atsSession));atsLastPersist=Date.now();}}
for(const event of ['pointerdown','pointermove','keydown','wheel','touchstart','scroll'])document.addEventListener(event,atsActivity,{passive:true,capture:true});
window.addEventListener('focus',()=>atsCheckIdle());document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')atsCheckIdle();});
window.addEventListener('pagehide',()=>{if(atsSession)sessionStorage.setItem('ats_session_v2',JSON.stringify(atsSession));});
setInterval(atsCheckIdle,1000);
window.addEventListener('DOMContentLoaded',async()=>{let stored;try{stored=JSON.parse(sessionStorage.getItem('ats_session_v2')||'null');}catch{sessionStorage.removeItem('ats_session_v2');}
 if(!stored){await enterPublicMode();return;}
 atsSession=stored;if(!atsCheckIdle())return;
 try{if(!stored.uid||!stored.token||!stored.refresh||!stored.email)throw Error('invalid session');const {value:role}=await atsRequest('/roles/'+stored.uid);if(!role||!['admin','superadmin'].includes(role.role))throw Error('no role');if(!atsSession||!atsCheckIdle())return;_currentUser={id:stored.uid,...role};_token=atsSession.token;_publicMode=false;const shell=document.querySelector('.app-shell');shell.classList.remove('public-mode');shell.classList.toggle('is-superadmin',isSuperAdmin());document.getElementById('publicBadge').style.display='none';document.getElementById('loginScreen').classList.add('hidden');document.getElementById('topbarUser').textContent=role.full_name||role.username;await initApp();}catch{atsSession=null;_currentUser=null;_token='';sessionStorage.removeItem('ats_session_v2');await enterPublicMode();showToast('กรุณาเข้าสู่ระบบใหม่');}
});
