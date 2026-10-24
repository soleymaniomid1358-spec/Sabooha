'use strict';
/* کنکور سبوحا — PWA برنامه مطالعه یازدهم تجربی
   داده‌ها فقط در localStorage همین دستگاه ذخیره می‌شوند. */
const DAYS=['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];
const KEY='konkur-sabooha-v1';
const TYPES=['مرور','تست','پیش‌خوانی','هفتگی','جبرانی'];
// [نام، آیکن، هدف هفتگی (ساعت)، نوع] — زبان انگلیسی عمداً حذف شده است
const BASECATS=[['زیست‌شناسی','🧬',7.5,'study'],['شیمی','⚗️',6.5,'study'],['فیزیک','🧲',6,'study'],['حسابان','📐',6.5,'study'],['زمین‌شناسی','🌍',1,'study'],['ادبیات','📖',2,'study'],['دینی','📘',1.5,'study'],['عربی','📜',1,'study'],['محیط زیست','🌱',0.5,'study'],['تاریخ','🏛️',0.5,'study'],['پیانو','🎹',6,'extra'],['ورزش','🏋️',5,'extra'],['مدرسه','🏫',0,'fixed']];
const BASEACTS=[["مرور زیست‌شناسی","زیست‌شناسی",[[3,"18:30","19:00"]]],["تست زیست‌شناسی","زیست‌شناسی",[[0,"21:30","22:00"],[1,"18:30","19:00"],[1,"20:30","21:00"],[2,"16:30","17:00"],[3,"19:00","19:30"],[3,"20:30","21:00"],[5,"16:30","17:00"],[6,"09:30","10:00"],[6,"15:30","16:00"]]],["پیش‌خوانی زیست‌شناسی","زیست‌شناسی",[[2,"20:30","21:30"]]],["هفتگی زیست‌شناسی","زیست‌شناسی",[[5,"18:00","19:00"],[6,"09:00","09:30"]]],["مرور شیمی","شیمی",[[1,"16:00","16:30"],[4,"19:00","19:30"]]],["مرور آزمون شیمی","شیمی",[[2,"18:30","19:00"]]],["تست شیمی","شیمی",[[1,"16:30","17:00"],[2,"17:30","18:00"],[5,"12:00","12:30"],[5,"14:30","15:00"],[6,"19:30","20:00"]]],["پیش‌خوانی شیمی","شیمی",[[0,"20:30","21:00"],[3,"21:30","22:00"]]],["هفتگی شیمی","شیمی",[[5,"15:00","16:00"],[6,"11:00","11:30"]]],["مرور فیزیک","فیزیک",[[0,"19:00","19:30"],[1,"17:00","17:30"],[4,"18:30","19:00"]]],["تست فیزیک","فیزیک",[[1,"21:00","21:30"],[2,"19:00","19:30"],[4,"21:30","22:00"],[5,"09:00","10:30"],[6,"17:30","18:00"]]],["پیش‌خوانی فیزیک","فیزیک",[[0,"21:00","21:30"],[6,"12:00","12:30"]]],["مرور حسابان","حسابان",[[0,"18:00","18:30"],[4,"18:00","18:30"]]],["تست حسابان","حسابان",[[0,"18:30","19:00"],[1,"17:30","18:00"],[1,"19:00","19:30"],[2,"17:00","17:30"],[2,"18:00","18:30"],[4,"20:30","21:00"],[5,"11:00","12:00"],[5,"16:00","16:30"]]],["پیش‌خوانی حسابان","حسابان",[[3,"21:00","21:30"],[6,"20:30","21:00"]]],["مرور زمین‌شناسی","زمین‌شناسی",[[4,"21:00","21:30"]]],["هفتگی زمین‌شناسی","زمین‌شناسی",[[6,"10:00","10:30"]]],["مرور ادبیات","ادبیات",[[1,"21:30","22:00"],[3,"19:30","20:00"]]],["هفتگی ادبیات","ادبیات",[[2,"21:30","22:00"],[6,"11:30","12:00"]]],["مرور دینی","دینی",[[1,"18:00","18:30"]]],["هفتگی دینی","دینی",[[5,"21:00","21:30"],[6,"16:00","16:30"]]],["مرور عربی","عربی",[[2,"16:00","16:30"]]],["هفتگی عربی","عربی",[[6,"19:00","19:30"]]],["هفتگی محیط زیست","محیط زیست",[[5,"21:30","22:00"]]],["هفتگی تاریخ","تاریخ",[[6,"17:00","17:30"]]],["کلاس پیانو","پیانو",[[3,"15:00","18:00"]]],["تمرین پیانو","پیانو",[[0,"20:00","20:30"],[1,"19:30","20:00"],[2,"19:30","20:00"],[4,"19:30","20:00"],[5,"14:00","14:30"],[6,"15:00","15:30"]]],["باشگاه","ورزش",[[0,"15:00","17:30"],[4,"15:00","17:30"]]],["مدرسه","مدرسه",[[0,"07:00","15:00"],[1,"07:00","15:00"],[2,"07:00","15:00"],[3,"07:00","15:00"],[4,"07:00","15:00"]]]];
const BASESCHOOL=['حسابان×۴، فیزیک×۲، تاریخ، ورزش','دینی×۲، شیمی×۲، نگارش، ادبیات، فیزیک×۲','عربی×۲، مطالعه×۳، تست شیمی، محیط زیست، آزمون','ادبیات×۲، زیست‌شناسی×۴، زبان×۲','زمین‌شناسی×۲ (یک زنگ مشاوره)، شیمی×۲، فیزیک، تست فیزیک، حسابان×۲','',''];
const BASEEXAMS=[['1405/07/06','حسابان'],['1405/07/08','زمین‌شناسی'],['1405/07/13','فیزیک'],['1405/07/15','شیمی'],['1405/07/18','حسابان'],['1405/07/19','ادبیات'],['1405/07/20','زیست‌شناسی'],['1405/07/22','عربی'],['1405/07/25','فیزیک'],['1405/07/26','دینی'],['1405/07/27','زیست‌شناسی'],['1405/07/28','زبان'],['1405/07/29','زمین‌شناسی'],['1405/08/02','حسابان'],['1405/08/03','ادبیات'],['1405/08/04','فیزیک'],['1405/08/05','زیست‌شناسی'],['1405/08/06','شیمی'],['1405/08/09','حسابان'],['1405/08/10','دینی'],['1405/08/11','عربی'],['1405/08/12','زبان'],['1405/08/13','محیط زیست']];

let state,selectedDate='',selectedCat='',setCat='',setId='',draft=null,showPastExams=false,weekOff=0;

/* ---------- ابزارهای تاریخ و عدد ---------- */
const pad=n=>String(n).padStart(2,'0');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function isoOf(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
function dateOf(iso){const [y,m,d]=iso.split('-').map(Number);return new Date(y,m-1,d,12)}
function todayISO(){return isoOf(new Date())}
function shift(iso,n){const d=dateOf(iso);d.setDate(d.getDate()+n);return isoOf(d)}
function dayIdx(iso){return (dateOf(iso).getDay()+1)%7}
function weekStart(iso){return shift(iso,-dayIdx(iso))}
const FAD='۰۱۲۳۴۵۶۷۸۹';
const fa=x=>String(x).replace(/\d/g,d=>FAD[d]).replace(/\./g,'٫');
const toEn=s=>String(s??'').replace(/[۰-۹]/g,d=>FAD.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const JF=new Intl.DateTimeFormat('fa-IR-u-ca-persian',{year:'numeric',month:'2-digit',day:'2-digit'});
function jalali(iso){return JF.format(dateOf(iso)).replace(/[‎‏]/g,'')}
function jday(iso){return jalali(iso).split('/').pop()}
function jshort(iso){const p=jalali(iso).split('/');return p[1]+'/'+p[2]}
function j2g(jy,jm,jd){jy+=1595;let days=-355668+365*jy+Math.floor(jy/33)*8+Math.floor((jy%33+3)/4)+jd+(jm<7?(jm-1)*31:(jm-7)*30+186);let gy=400*Math.floor(days/146097);days%=146097;if(days>36524){gy+=100*Math.floor(--days/36524);days%=36524;if(days>=365)days++}gy+=4*Math.floor(days/1461);days%=1461;if(days>365){gy+=Math.floor((days-1)/365);days=(days-1)%365}let gd=days+1;const ml=[0,31,(gy%4===0&&gy%100!==0)||gy%400===0?29:28,31,30,31,30,31,31,30,31,30,31];let gm=0;for(gm=0;gm<13&&gd>ml[gm];gm++)gd-=ml[gm];return [gy,gm,gd]}
function parseJalali(s){s=toEn(s).trim();const m=s.match(/^(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})$/);if(!m)return null;const jy=+m[1],jm=+m[2],jd=+m[3];if(jm<1||jm>12||jd<1||jd>(jm<=6?31:30))return null;const [gy,gm,gd]=j2g(jy,jm,jd);return gy+'-'+pad(gm)+'-'+pad(gd)}
const toMin=t=>{const [h,m]=String(t).split(':').map(Number);return h*60+m};
const dur=(s,e)=>toMin(e)-toMin(s);
const validTime=t=>/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(t)||t==='24:00';
const fromMin=m=>pad(Math.floor(m/60))+':'+pad(m%60);
const hr=m=>fa(Math.round(m/6)/10);
function fixTime(v){const d=toEn(v).replace(/\D/g,'');if(!d)return '';if(d.length<=2)return pad(+d)+':00';if(d.length===3)return '0'+d[0]+':'+d.slice(1);return d.slice(0,2)+':'+d.slice(2,4)}
function liveTime(el){let d=toEn(el.value).replace(/\D/g,'').slice(0,4);el.value=d.length>2?d.slice(0,2)+':'+d.slice(2):d}
function uid(){return 'a'+Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
const nowMin=()=>{const d=new Date();return d.getHours()*60+d.getMinutes()};

/* ---------- وضعیت ---------- */
function defaultActivities(){return BASEACTS.map((x,i)=>({id:'b'+i,title:x[0],cat:x[1],repeat:'weekly',slots:x[2].map(s=>({day:s[0],start:s[1],end:s[2]})),desc:''}))}
function defaults(){return {v:1,categories:BASECATS.map(c=>({name:c[0],icon:c[1],target:Math.round(c[2]*60),kind:c[3]})),activities:defaultActivities(),school:BASESCHOOL.slice(),exams:BASEEXAMS.map((e,i)=>({id:'e'+i,date:parseJalali(e[0]),subject:e[1]})),logs:[],progress:{},notes:{},carried:{},startDate:todayISO()}}
function normalize(s){const d=defaults();s={...d,...s};['categories','activities','exams','logs'].forEach(k=>{if(!Array.isArray(s[k]))s[k]=d[k]});['progress','notes','carried'].forEach(k=>{if(!s[k]||typeof s[k]!=='object')s[k]={}});if(!s.startDate)s.startDate=todayISO();if(!Array.isArray(s.school)||s.school.length!==7)s.school=d.school;s.categories.forEach(c=>{if(typeof c.target!=='number')c.target=0;if(!c.kind)c.kind='study';if(!c.icon)c.icon='🗂️'});s.activities.forEach(a=>{if(!a.repeat)a.repeat='weekly';if(!Array.isArray(a.slots))a.slots=(a.days||[]).map(day=>({day,start:a.start||'18:00',end:a.end||'18:30'}))});return s}
/* ---------- پروفایل‌ها ---------- */
const PKEY='konkur-sabooha-profiles',pkey=id=>'konkur-sabooha-p-'+id;
let profiles={active:'p1',list:[{id:'p1',name:'سبوحا'}]};
function loadProfiles(){let p=null;try{p=JSON.parse(localStorage.getItem(PKEY))}catch(e){}
  if(!p||!Array.isArray(p.list)||!p.list.length){p={active:'p1',list:[{id:'p1',name:'سبوحا'}]};try{if(!localStorage.getItem(pkey('p1'))){const old=localStorage.getItem(KEY);if(old)localStorage.setItem(pkey('p1'),old)}localStorage.setItem(PKEY,JSON.stringify(p))}catch(e){}}
  if(!p.list.some(x=>x.id===p.active))p.active=p.list[0].id;profiles=p}
function storeProfiles(){try{localStorage.setItem(PKEY,JSON.stringify(profiles))}catch(e){}}
const activeProfile=()=>profiles.list.find(x=>x.id===profiles.active);
function readProfile(id){if(id===profiles.active)return state;try{const raw=localStorage.getItem(pkey(id));return normalize(raw?JSON.parse(raw):defaults())}catch(e){return null}}
function load(){try{const raw=localStorage.getItem(pkey(profiles.active));state=normalize(raw?JSON.parse(raw):defaults())}catch(e){state=defaults()}}
function store(){try{localStorage.setItem(pkey(profiles.active),JSON.stringify(state));return true}catch(e){toast('ذخیره‌سازی ممکن نشد؛ حافظه مرورگر پر یا مسدود است',true);return false}}
function save(){store();renderAll()}
let toastT;function toast(s,warn){const t=document.getElementById('toast');t.textContent=s;t.classList.toggle('warn',!!warn);t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),warn?4200:2200)}

const catOf=n=>state.categories.find(c=>c.name===n);
const isFixed=a=>catOf(a.cat)?.kind==='fixed';
function typeOf(a){if(isFixed(a))return 'ثابت';const t=TYPES.find(t=>a.title.startsWith(t));return t||'فعالیت'}
const tag=t=>`<span class="tag t-${t}">${t}</span>`;
function inst(a,iso,start,end){const key=a.id+'@'+iso+'@'+start,p=state.progress[key]||0;return {...a,start,end,iso,instance:key,progress:p,fixed:isFixed(a),type:typeOf(a),mins:dur(start,end)}}
function instances(iso){const idx=dayIdx(iso),out=[];for(const a of state.activities){if(a.repeat==='once'){if(a.date===iso)out.push(inst(a,iso,a.start,a.end))}else(a.slots||[]).filter(s=>+s.day===idx).forEach(s=>out.push(inst(a,iso,s.start,s.end)))}return out.sort((x,y)=>x.start.localeCompare(y.start)||x.end.localeCompare(y.end))}
function schedMins(cat){return state.activities.filter(a=>a.cat===cat&&a.repeat!=='once').reduce((s,a)=>s+(a.slots||[]).reduce((t,x)=>t+Math.max(0,dur(x.start,x.end)),0),0)}
function actMins(a){return (a.slots||[]).reduce((t,x)=>t+Math.max(0,dur(x.start,x.end)),0)}
function weekActual(cat,start){const end=shift(start,6);return state.logs.filter(l=>l.cat===cat&&l.date>=start&&l.date<=end).reduce((s,l)=>s+(+l.minutes||0),0)}
function dailyPct(iso){const a=instances(iso).filter(x=>!x.fixed);return a.length?a.reduce((s,x)=>s+x.progress,0)/a.length:0}
function weeklyPct(){return weekPct(weekStart(todayISO()))}
function examsOn(iso){return state.exams.filter(e=>e.date===iso)}
function upcomingExams(){const t=todayISO();return state.exams.filter(e=>e.date>=t).sort((a,b)=>a.date.localeCompare(b.date))}
function weekName(o){return o===0?'این هفته':o===-1?'هفته قبل':o===1?'هفته بعد':fa(Math.abs(o))+(o<0?' هفته قبل':' هفته بعد')}
function weekPct(start){let t=0,d=0;state.categories.filter(c=>c.kind!=='fixed'&&c.target>0).forEach(c=>{t+=c.target;d+=Math.min(c.target,weekActual(c.name,start))});return t?d/t*100:0}
function setWeekNav(el,o,ws){el.querySelector('[data-wklabel]').textContent=weekName(o);el.querySelector('[data-wkrange]').textContent=jshort(ws)+' تا '+jshort(shift(ws,6));el.classList.toggle('other',o!==0)}
function daysLeft(iso){return Math.round((dateOf(iso)-dateOf(todayISO()))/864e5)}
const leftLabel=n=>n===0?'امروز':n===1?'فردا':fa(n)+' روز دیگر';

/* ---------- ناوبری ---------- */
function showPage(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('active',b.dataset.page===id));if(id==='today')renderToday();if(id==='category')renderCategory();if(id==='manage')fillCatOptions();if(id==='settings')renderSettings();window.scrollTo({top:0,behavior:'smooth'})}
function openManage(){showPage('manage');if(selectedCat&&catOf(selectedCat))document.getElementById('newCat').value=selectedCat}

function gauge(elid,pct){const e=document.getElementById(elid);if(!e)return;const p=Math.max(0,Math.min(100,pct||0));e.innerHTML=`<svg viewBox="0 0 100 100"><circle class="track" cx="50" cy="50" r="40"></circle><circle class="value" cx="50" cy="50" r="40" style="stroke-dasharray:251.2;stroke-dashoffset:${251.2*(1-p/100)}"></circle></svg><b>${fa(Math.round(p))}٪</b>`}

/* ---------- خانه ---------- */
function renderCats(){document.getElementById('categories').innerHTML=state.categories.map(c=>{const n=state.activities.filter(a=>a.cat===c.name).length,m=schedMins(c.name);return `<button class="cat" data-cat="${esc(c.name)}"><span class="ico">${esc(c.icon||'🗂️')}</span><strong>${esc(c.name)}</strong><small>${fa(n)} فعالیت${m?' · '+hr(m)+' س':''}</small></button>`}).join('')}
function renderHome(){const t=todayISO();gauge('dailyGauge',dailyPct(t));gauge('weeklyGauge',weeklyPct());
  const nm=nowMin(),all=instances(t).filter(x=>!x.fixed),tasks=all.filter(x=>toMin(x.end)>nm&&x.progress<100).slice(0,4);
  document.getElementById('homeTasks').innerHTML=tasks.length?tasks.map(x=>`<div class="task" data-page="today"><div class="time">${fa(x.start)}</div><div><strong>${tag(x.type)}${esc(x.title)}</strong><div class="meta">${esc(x.cat)} · ${fa(x.mins)} دقیقه · ${fa(x.progress)}٪</div><div class="progress"><span style="width:${x.progress}%"></span></div></div><button class="btn" data-page="today">بازکردن</button></div>`).join(''):`<div class="empty">${all.length?'بلوک باقی‌مانده‌ای برای امروز نیست 👏':'برای امروز بلوکی ثبت نشده است.'}</div>`;
  const ex=upcomingExams()[0],b=document.getElementById('nextExamBanner');if(ex){b.classList.remove('hidden');const n=daysLeft(ex.date),same=upcomingExams().filter(e=>e.date===ex.date).map(e=>e.subject).join(' و ');document.getElementById('nextExamTitle').textContent='امتحان بعدی: '+same;document.getElementById('nextExamSub').textContent=DAYS[dayIdx(ex.date)]+' '+jalali(ex.date)+' · '+leftLabel(n)}else b.classList.add('hidden');
  const vals=[];for(let i=6;i>=0;i--){const d=shift(t,-i),m=state.logs.filter(l=>l.date===d).reduce((s,l)=>s+(+l.minutes||0),0);vals.push({d,m})}
  const max=Math.max(60,...vals.map(x=>x.m));document.getElementById('trendChart').innerHTML=vals.map((x,i)=>{const h=x.m/max*95,y=115-h;return `<rect x="${15+i*43}" y="${y}" width="23" height="${Math.max(h,0.5)}" rx="5" fill="${i===6?'#ff842d':'#1474d4'}"/><text x="${26+i*43}" y="${y-4}" font-size="8" text-anchor="middle" fill="#14243b">${x.m?fa(x.m):''}</text><text x="${26+i*43}" y="132" font-size="9" text-anchor="middle" fill="#738096">${jday(x.d)}</text>`}).join('')}

/* ---------- امروز ---------- */
function renderToday(){const sd=selectedDate,t=todayISO();
  document.getElementById('todayDateLabel').textContent=DAYS[dayIdx(sd)]+' · '+jalali(sd);
  const ws=weekStart(sd),wo=Math.round((dateOf(ws)-dateOf(weekStart(t)))/864e5/7);
  document.getElementById('weekLabel').textContent=weekName(wo);
  document.getElementById('weekRange').textContent=jshort(ws)+' تا '+jshort(shift(ws,6));
  document.getElementById('weekLabel').closest('.weeknav').classList.toggle('other',wo!==0);
  document.getElementById('dateStrip').innerHTML=Array.from({length:7},(_,i)=>{const d=shift(weekStart(sd),i);return `<button data-date="${d}" class="${d===sd?'sel':''} ${d===t?'istoday':''}">${DAYS[i]}<br>${jday(d)}</button>`}).join('');
  const lines=[],sc=state.school[dayIdx(sd)];if(sc)lines.push('🏫 کلاس‌ها: '+esc(sc));examsOn(sd).forEach(e=>lines.push('📝 امروز امتحان '+esc(e.subject)));examsOn(shift(sd,1)).forEach(e=>lines.push(`<b style="color:#c25a0c">📝 فردا امتحان ${esc(e.subject)} — پیش‌خوانی امشب را به مرور ${esc(e.subject)} اختصاص بده.</b>`));
  document.getElementById('schoolLine').innerHTML=lines.map(l=>`<div style="margin:3px 0">${l}</div>`).join('');
  const a=instances(sd),st=a.filter(x=>!x.fixed);document.getElementById('todayCount').textContent=`${fa(st.filter(x=>x.progress>=100).length)}/${fa(st.length)} تکمیل`;
  document.getElementById('todayList').innerHTML=a.length?a.map(x=>{if(x.fixed)return `<div class="task fixed"><div class="time">${fa(x.start)}<br>${fa(x.end)}</div><div><strong>${tag(x.type)}${esc(x.title)}</strong>${x.desc?`<div class="meta">${esc(x.desc)}</div>`:''}</div><span class="muted">—</span></div>`;
    const log=state.logs.find(l=>l.instance===x.instance)||{};
    return `<div class="task ${x.progress>=100?'done':''}"><div class="time">${fa(x.start)}<br>${fa(x.end)}</div><div><div class="taskline"><input type="checkbox" data-check="${x.instance}" ${x.progress>=100?'checked':''} aria-label="تکمیل"><strong>${tag(x.type)}${esc(x.title)}</strong></div><div class="meta">${esc(x.cat)} · ${fa(x.mins)} دقیقه${x.desc?' · '+esc(x.desc):''}${log.note?' · 📝':''}</div><div class="progress"><span style="width:${x.progress}%"></span></div></div><div class="pctwrap"><select class="pct" data-pct="${x.instance}" aria-label="درصد پیشرفت">${[0,10,20,30,40,50,60,70,80,90,100].map(p=>`<option value="${p}" ${x.progress===p?'selected':''}>${fa(p)}٪</option>`).join('')}</select><button class="btn notebtn" type="button" data-note-toggle="${x.instance}">+یادداشت</button></div><div class="tasknote" data-note-panel="${x.instance}" hidden><textarea data-lognote="${x.instance}" placeholder="یادداشت این بلوک (تست‌های غلط، مبحث مبهم…)">${esc(log.note||'')}</textarea>${log.note?`<button class="btn danger sm" type="button" data-note-delete="${x.instance}">حذف یادداشت</button>`:''}</div></div>`}).join(''):'<div class="empty">برای این روز بلوکی تعریف نشده است. از «افزودن فعالیت» استفاده کنید.</div>';
  document.getElementById('dayNote').value=state.notes[sd]||''}
function splitInst(instance){const p=instance.split('@');return {id:p[0],date:p[1],start:p[2]}}
function upsertLog(instance,changes){const {id,date,start}=splitInst(instance),a=state.activities.find(x=>x.id===id),it=instances(date).find(x=>x.instance===instance);let log=state.logs.find(l=>l.instance===instance);if(!log){log={id:uid(),instance,date,start,title:a?.title||'فعالیت',cat:a?.cat||'',minutes:0,progress:0};state.logs.push(log)}Object.assign(log,changes);if(a){log.title=a.title;log.cat=a.cat}const p=state.progress[instance]||0;log.progress=p;if(it)log.minutes=Math.round(it.mins*p/100);if(!p&&!(log.note||'').trim())state.logs=state.logs.filter(l=>l!==log);return log}
function setProgress(instance,p){state.progress[instance]=p;if(!p)delete state.progress[instance];upsertLog(instance,{});save()}

/* ---------- درس / دسته ---------- */
function slotSummary(a){if(a.repeat==='once')return 'یک‌باره · '+(a.date?jalali(a.date):'')+' · '+fa(a.start)+'–'+fa(a.end);const by={};(a.slots||[]).forEach(s=>(by[s.day]=by[s.day]||[]).push(fa(s.start)+'–'+fa(s.end)));return Object.keys(by).sort().map(d=>DAYS[d]+' '+by[d].join('، ')).join(' | ')||'بدون زمان'}
function renderCategory(){const c=catOf(selectedCat);document.getElementById('catTitle').textContent=(c?.icon||'')+' '+selectedCat;const a=state.activities.filter(x=>x.cat===selectedCat);
  document.getElementById('catSummary').textContent=c?`برنامه هفتگی ${hr(schedMins(selectedCat))} ساعت${c.target?' · هدف '+hr(c.target)+' ساعت':''} · ثبت این هفته ${hr(weekActual(selectedCat,weekStart(todayISO())))} ساعت`:'';
  document.getElementById('categoryList').innerHTML=a.length?a.map(t=>`<div class="task"><div class="time">${fa(hr(t.repeat==='once'?dur(t.start,t.end):actMins(t)))}<br>ساعت</div><div><strong>${tag(typeOf(t))}${esc(t.title)}</strong><div class="meta">${slotSummary(t)}</div></div><div class="pctwrap"><button class="btn sm" data-edit-act="${t.id}">ویرایش</button><button class="btn danger sm" data-delete-act="${t.id}">حذف</button></div></div>`).join(''):'<div class="empty">در این درس فعالیتی نیست.</div>'}

/* ---------- افزودن فعالیت ---------- */
let newDays=[];
function fillCatOptions(){const sel=document.getElementById('newCat'),v=sel.value;sel.innerHTML=state.categories.map(c=>`<option value="${esc(c.name)}">${esc(c.icon+' '+c.name)}</option>`).join('');if(selectedCat&&catOf(selectedCat))sel.value=selectedCat;else if(v&&catOf(v))sel.value=v;renderNewDays()}
function renderNewDays(){document.getElementById('newDays').innerHTML=DAYS.map((d,i)=>`<button type="button" data-newday="${i}" class="${newDays.includes(i)?'sel':''}">${d}</button>`).join('');const once=document.getElementById('newRepeat').value==='once';document.getElementById('newDateWrap').classList.toggle('hidden',!once);document.getElementById('newDaysWrap').classList.toggle('hidden',once)}
function addCategory(){const n=document.getElementById('newCatName').value.trim();if(!n)return toast('نام درس/دسته را وارد کنید');if(catOf(n))return toast('این دسته وجود دارد');state.categories.push({name:n,icon:'🗂️',target:0,kind:'study'});document.getElementById('newCatName').value='';selectedCat=n;save();fillCatOptions();toast('دسته اضافه شد')}
function saveActivity(){const title=document.getElementById('newTitle').value.trim(),cat=document.getElementById('newCat').value,repeat=document.getElementById('newRepeat').value,date=parseJalali(document.getElementById('newDate').value),s=document.getElementById('newStart'),e=document.getElementById('newEnd');s.value=fixTime(s.value);e.value=fixTime(e.value);const start=s.value,end=e.value;
  if(!title)return toast('عنوان فعالیت را وارد کنید');if(!validTime(start)||!validTime(end)||toMin(end)<=toMin(start))return toast('ساعت‌ها را مثل 18:30 وارد کنید؛ پایان باید بعد از شروع باشد');if(repeat==='once'&&!date)return toast('تاریخ شمسی معتبر وارد کنید (مثلاً ۱۴۰۵/۰۸/۰۲)');if(repeat==='weekly'&&!newDays.length)return toast('حداقل یک روز هفته انتخاب کنید');
  const a={id:uid(),title,cat:cat||state.categories[0].name,repeat,desc:document.getElementById('newDesc').value.trim()};if(repeat==='once'){a.date=date;a.start=start;a.end=end;a.slots=[]}else a.slots=newDays.slice().sort().map(day=>({day,start,end}));
  state.activities.push(a);const cf=conflictsFor(a);document.getElementById('newTitle').value='';document.getElementById('newDesc').value='';newDays=[];save();
  if(repeat==='once'){selectedDate=date;showPage('today')}else{setCat=a.cat;setId=a.id;draft=null;showPage('settings')}toast(cf.length?'ذخیره شد؛ تداخل با: '+cf.slice(0,3).join('، '):'فعالیت ذخیره شد',!!cf.length)}

/* ---------- تداخل زمانی ---------- */
function conflictsFor(a){const res=[];const mine=a.repeat==='once'?[{day:dayIdx(a.date),start:a.start,end:a.end,date:a.date}]:(a.slots||[]);for(const s of mine){for(const o of state.activities){if(o.id===a.id)continue;const os=o.repeat==='once'?(s.date?(o.date===s.date?[{day:s.day,start:o.start,end:o.end}]:[]):[]):(o.slots||[]);for(const x of os){if(+x.day!==+s.day)continue;if(toMin(x.start)<toMin(s.end)&&toMin(s.start)<toMin(x.end))res.push(`${o.title} (${DAYS[s.day]} ${fa(x.start)})`)}}}return [...new Set(res)]}

/* ---------- هفته ---------- */
function renderWeekly(){const t=todayISO(),cur=weekStart(t),start=shift(cur,weekOff*7);
  document.querySelectorAll('#weekly [data-wknav]').forEach(el=>setWeekNav(el,weekOff,start));
  {const nf=state.categories.filter(c=>c.kind!=='fixed'),plan=nf.reduce((x,c)=>x+schedMins(c.name),0),done=nf.reduce((x,c)=>x+weekActual(c.name,start),0);
   document.getElementById('weekStats').innerHTML=`<div><b>${start>t?'—':fa(Math.round(weekPct(start)))+'٪'}</b><small>${start>t?'هنوز شروع نشده':'تحقق کل هفته'}</small></div><div><b>${hr(plan)}</b><small>کل ساعت برنامه</small></div><div><b>${hr(done)}</b><small>کل ساعت محقق‌شده</small></div>`}
  const hist=[];for(let o=0;o>=-7;o--){const ws=shift(cur,o*7);if(o<0&&shift(ws,6)<state.startDate&&!state.logs.some(l=>l.date>=ws&&l.date<=shift(ws,6)))continue;const p=Math.round(weekPct(ws));hist.push(`<button type="button" data-wkgo="${o}" class="${o===weekOff?'sel':''} ${p<50?'lo':p<80?'mid':'hi'}">${o===0?'این هفته':jshort(ws)}<b>${fa(p)}٪</b></button>`)}
  document.getElementById('weekHistory').innerHTML=hist.length>1?hist.join(''):'';let m='<table><thead><tr><th>ساعت</th>'+DAYS.map((d,i)=>`<th>${d}<br><small>${jday(shift(start,i))}</small></th>`).join('')+'</tr></thead><tbody>';const days=Array.from({length:7},(_,i)=>instances(shift(start,i)));
  for(let h=7;h<=23;h++){m+=`<tr><td class="hour">${fa(pad(h))}:۰۰</td>`;for(let di=0;di<7;di++){const items=days[di].filter(a=>toMin(a.start)<(h+1)*60&&toMin(a.end)>h*60&&(!a.fixed||toMin(a.start)>=h*60||h===7));m+=`<td class="${shift(start,di)===t?'today':''}">`+items.map(a=>`<div class="weekblock k-${a.type}" title="${esc(a.start+'-'+a.end)}">${esc(a.title)}<br><small>${fa(a.start)}–${fa(a.end)}${a.progress?' · '+fa(a.progress)+'٪':''}</small></div>`).join('')+'</td>'}m+='</tr>'}
  document.getElementById('weekMatrix').innerHTML=m+'</tbody></table>';
  const goals=state.categories.filter(c=>c.kind!=='fixed'&&(c.target>0||schedMins(c.name)>0));document.getElementById('weeklyList').innerHTML=goals.length?goals.map((c,i)=>{const mins=weekActual(c.name,start),tg=c.target||schedMins(c.name),p=tg?Math.min(100,Math.round(mins/tg*100)):0;return `<div class="task"><div class="time" style="font-size:18px">${esc(c.icon)}</div><div><strong>${esc(c.name)}</strong><div class="meta">هدف ${hr(c.target)} · برنامه ${hr(schedMins(c.name))} · محقق‌شده ${hr(mins)} ساعت</div><div class="progress blue"><span style="width:${p}%"></span></div></div><b>${fa(p)}٪</b></div>`}).join(''):'<div class="empty">هدفی تعریف نشده است.</div>';
  const nm=nowMin(),pend=[];for(let d=cur<state.startDate?state.startDate:cur;d<=t;d=shift(d,1))instances(d).filter(x=>!x.fixed&&x.progress<100&&!state.carried[x.instance]&&(d<t||toMin(x.end)<=nm)).forEach(x=>pend.push(x));pend.reverse();
  document.getElementById('carryList').innerHTML=pend.length?pend.slice(0,20).map(x=>`<div class="task"><div class="time">${DAYS[dayIdx(x.iso)]}<br>${fa(x.start)}</div><div><strong>${tag(x.type)}${esc(x.title)}</strong><div class="meta">${esc(x.cat)} · انجام ${fa(x.progress)}٪ · ${fa(x.mins)} دقیقه</div></div><div class="pctwrap"><button class="btn sm" data-carry="${x.instance}">جبران</button><button class="btn ghost sm" data-skip="${x.instance}" aria-label="نادیده">✕</button></div></div>`).join('')+(pend.length>20?`<div class="muted">و ${fa(pend.length-20)} مورد دیگر…</div>`:''):'<div class="empty">بلوک ناقصی برای جبران وجود ندارد 👏</div>'}
function findFree(iso,mins){const busy=instances(iso).map(x=>[toMin(x.start),toMin(x.end)]),from=dayIdx(iso)>=5?9*60:15*60;for(let s=from;s+mins<=23*60;s+=30){if(!busy.some(([a,b])=>a<s+mins&&s<b))return [fromMin(s),fromMin(s+mins)]}return ['22:00',fromMin(Math.min(24*60,22*60+mins))]}
function carry(instance){const {id,date}=splitInst(instance),x=instances(date).find(i=>i.instance===instance);if(!x)return;const left=Math.max(30,Math.round(x.mins*(100-x.progress)/100/30)*30),tm=shift(todayISO(),1),[s,e]=findFree(tm,left);const a={id:uid(),title:'جبرانی · '+x.title.replace(/^جبرانی · /,''),cat:x.cat,repeat:'once',date:tm,start:s,end:e,slots:[],desc:'جبران '+DAYS[dayIdx(date)]+' '+jalali(date)};state.activities.push(a);state.carried[instance]=a.id;save();toast(`جبران برای فردا ${fa(s)} تا ${fa(e)} برنامه‌ریزی شد`)}

/* ---------- امتحانات ---------- */
function renderExams(){const st=weekStart(todayISO());const main=state.categories.filter(c=>c.kind==='study').sort((a,b)=>b.target-a.target).slice(0,4);document.getElementById('examGauges').innerHTML=main.map((c,i)=>`<div class="metric"><div class="gauge" id="eg${i}"></div><label>${esc(c.icon+' '+c.name)}</label></div>`).join('');main.forEach((c,i)=>gauge('eg'+i,c.target?weekActual(c.name,st)/c.target*100:0));
  const t=todayISO(),all=state.exams.slice().sort((a,b)=>a.date.localeCompare(b.date)),list=showPastExams?all:all.filter(e=>e.date>=t),next=upcomingExams()[0];
  document.getElementById('examCount').textContent=`${fa(upcomingExams().length)} امتحان پیش رو`;document.getElementById('togglePast').textContent=showPastExams?'پنهان‌کردن گذشته':'نمایش گذشته';
  document.getElementById('examList').innerHTML=list.length?list.map(e=>{const n=daysLeft(e.date),past=e.date<t;return `<div class="examrow ${past?'past':''} ${next&&e.date===next.date?'next':''}"><div><b>${jshort(e.date)}</b><div class="muted">${DAYS[dayIdx(e.date)]}</div></div><div><strong>${esc(e.subject)}</strong></div><div class="pctwrap"><span class="pill ${past?'':n<=2?'bad':n<=7?'warn':''}">${past?'گذشته':leftLabel(n)}</span><button class="iconbtn" data-del-exam="${e.id}" aria-label="حذف">✕</button></div></div>`}).join(''):'<div class="empty">امتحانی ثبت نشده است.</div>';
  document.getElementById('examSubjects').innerHTML=state.categories.filter(c=>c.kind==='study').map(c=>`<option value="${esc(c.name)}">`).join('');
  const cats=state.categories.filter(c=>c.kind!=='fixed'),mx=Math.max(60,...cats.map(c=>Math.max(schedMins(c.name),c.target)));document.getElementById('timeBars').innerHTML=cats.map(c=>{const m=schedMins(c.name);return `<div class="barrow"><span>${esc(c.icon+' '+c.name)}</span><div class="progress blue"><span style="width:${m/mx*100}%"></span></div><b>${hr(m)}س</b></div>`}).join('')+`<div class="sumbar"><span>جمع مطالعه دروس</span><b>${hr(state.categories.filter(c=>c.kind==='study').reduce((s,c)=>s+schedMins(c.name),0))} ساعت در هفته</b></div>`}

/* ---------- گزارش ---------- */
function normalizeSearch(s){return String(s??'').toLocaleLowerCase().replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[‌‏ـ]/g,'').replace(/\s+/g,' ').trim()}
function fillFilterCats(){const fc=document.getElementById('filterCat'),v=fc.value;fc.innerHTML='<option value="">همه دروس</option>'+state.categories.map(c=>`<option value="${esc(c.name)}">${esc(c.name)}</option>`).join('');fc.value=v}
function renderLogs(){const ft=document.getElementById('filterFrom').value,tt=document.getElementById('filterTo').value,from=ft?parseJalali(ft):'',to=tt?parseJalali(tt):'',cat=document.getElementById('filterCat').value,q=normalizeSearch(document.getElementById('filterText').value);
  const all=state.logs.slice().sort((a,b)=>(b.date+(b.start||'')).localeCompare(a.date+(a.start||'')));const a=all.filter(l=>(!ft||(from&&l.date>=from))&&(!tt||(to&&l.date<=to))&&(!cat||l.cat===cat)&&(!q||normalizeSearch([l.title,l.cat,l.note].join(' ')).includes(q)));
  const mins=a.reduce((s,l)=>s+(+l.minutes||0),0);document.getElementById('reportCount').textContent=((ft&&!from)||(tt&&!to)?'تاریخ نامعتبر است؛ قالب نمونه: ۱۴۰۵/۰۷/۲۹ · ':'')+`${fa(a.length)} مورد از ${fa(all.length)} ثبت · مجموع ${hr(mins)} ساعت`;
  document.getElementById('logsList').innerHTML=a.length?a.slice(0,300).map(l=>`<div class="task"><div class="time">${jshort(l.date)}<br>${l.start?fa(l.start):''}</div><div><strong>${esc(l.title)}</strong><div class="meta">${esc(l.cat)} · ${fa(l.minutes||0)} دقیقه · پیشرفت ${fa(l.progress||0)}٪</div>${l.note?`<div class="meta">📝 ${esc(l.note)}</div>`:''}</div><span></span></div>`).join(''):'<div class="empty">موردی با این فیلترها پیدا نشد.</div>'}

/* ---------- تنظیمات ---------- */
function renderSettings(){renderProfiles();renderAlloc();renderEditor();renderCatEditor();renderSchoolEditor()}
function allocStatus(c,targetMin){const m=schedMins(c.name),d=m-targetMin;if(!targetMin&&!m)return '<span class="pill">—</span>';if(Math.abs(d)<1)return '<span class="pill ok">✓ برابر</span>';return d<0?`<span class="pill bad">${hr(-d)}− کم</span>`:`<span class="pill warn">${hr(d)}+ زیاد</span>`}
function readTarget(v){const n=parseFloat(toEn(v).replace(/[٫,\/]/g,'.'));return isFinite(n)&&n>=0?Math.round(n*60):null}
function renderAlloc(){const cats=state.categories.filter(c=>c.kind!=='fixed');const study=cats.filter(c=>c.kind==='study');
  document.getElementById('allocTable').innerHTML=`<div class="alloc head"><span>درس</span><span style="text-align:center">هدف (ساعت)</span><span style="text-align:center">برنامه</span><span style="text-align:center">وضعیت</span></div>`+cats.map(c=>`<div class="alloc"><span>${esc(c.icon)} ${esc(c.name)}</span><input inputmode="decimal" data-target="${esc(c.name)}" value="${Math.round(c.target/6)/10}"><b>${hr(schedMins(c.name))}</b><span data-status="${esc(c.name)}" style="text-align:center">${allocStatus(c,c.target)}</span></div>`).join('')+
  `<div class="sumbar"><span>جمع دروس: برنامه <b>${hr(study.reduce((s,c)=>s+schedMins(c.name),0))}</b> از هدف <b id="sumTarget">${hr(study.reduce((s,c)=>s+c.target,0))}</b> ساعت</span></div>`}
function onTargetInput(el){const c=catOf(el.dataset.target),v=readTarget(el.value);if(!c)return;const st=document.querySelector(`[data-status="${CSS.escape(c.name)}"]`);if(st)st.innerHTML=v===null?'<span class="pill bad">نامعتبر</span>':allocStatus(c,v)}
function saveTargets(){const els=[...document.querySelectorAll('[data-target]')];for(const el of els){if(readTarget(el.value)===null)return toast('عدد هدف «'+el.dataset.target+'» معتبر نیست')}els.forEach(el=>{const c=catOf(el.dataset.target);if(c)c.target=readTarget(el.value)});save();toast('اهداف هفتگی ذخیره شد')}

function ensureSel(){if(!catOf(setCat))setCat=(state.categories.find(c=>state.activities.some(a=>a.cat===c.name))||state.categories[0])?.name||'';const acts=state.activities.filter(a=>a.cat===setCat);if(!acts.some(a=>a.id===setId)){setId=acts[0]?.id||'';draft=null}if(setId&&(!draft||draft.id!==setId))draft=JSON.parse(JSON.stringify(state.activities.find(a=>a.id===setId)));if(!setId)draft=null;return acts}
function renderEditor(){const host=document.getElementById('settingsActivities');const acts=ensureSel();
  let h=`<div class="chipbar">${state.categories.map(c=>`<button type="button" data-setcat="${esc(c.name)}" class="${c.name===setCat?'sel':''}">${esc(c.icon+' '+c.name)}</button>`).join('')}</div>`;
  h+=acts.length?`<label class="field">فعالیت<select id="settingActivitySelect">${acts.map(x=>`<option value="${esc(x.id)}" ${x.id===setId?'selected':''}>${esc(x.title)}${x.repeat==='once'?' (یک‌باره)':''}</option>`).join('')}</select></label>`:'<div class="empty">در این درس فعالیتی نیست.</div>';
  if(draft){const d=draft;h+=`<div class="card settings-item"><label class="field">نام<input id="settingTitle" value="${esc(d.title)}"></label><div class="formgrid"><label class="field">درس / دسته<select id="settingCat">${state.categories.map(c=>`<option value="${esc(c.name)}" ${c.name===d.cat?'selected':''}>${esc(c.icon+' '+c.name)}</option>`).join('')}</select></label><label class="field">توضیح<input id="settingDesc" value="${esc(d.desc||'')}" placeholder="اختیاری"></label></div>`;
    if(d.repeat==='once'){h+=`<div class="formgrid"><label class="field full">تاریخ شمسی<input id="settingDate" inputmode="numeric" value="${d.date?jalali(d.date):''}"></label><label class="field">شروع<input class="clock-input" data-once="start" inputmode="numeric" maxlength="5" value="${esc(d.start)}"></label><label class="field">پایان<input class="clock-input" data-once="end" inputmode="numeric" maxlength="5" value="${esc(d.end)}"></label></div>`}
    else{h+=`<div class="settings-slots">${DAYS.map((dn,i)=>{const sl=d.slots.map((s,k)=>({...s,k})).filter(s=>+s.day===i);return `<div class="day-slot ${sl.length?'':'off'}"><label class="day-check"><input type="checkbox" data-slot-day="${i}" ${sl.length?'checked':''}><span>${dn}</span></label><div class="slot-list">${sl.map(s=>`<div class="slot-row"><input aria-label="شروع ${dn}" class="clock-input ${validTime(s.start)?'':'bad'}" inputmode="numeric" maxlength="5" placeholder="18:00" data-slot-k="${s.k}" data-f="start" value="${esc(s.start)}"><span class="sep">تا</span><input aria-label="پایان ${dn}" class="clock-input ${validTime(s.end)&&toMin(s.end)>toMin(s.start)?'':'bad'}" inputmode="numeric" maxlength="5" placeholder="18:30" data-slot-k="${s.k}" data-f="end" value="${esc(s.end)}"><button type="button" class="iconbtn" data-slot-del="${s.k}" aria-label="حذف بازه">✕</button></div>`).join('')}${sl.length?`<button type="button" class="addslot" data-slot-add="${i}">＋ بازه دیگر در ${dn}</button>`:''}</div></div>`}).join('')}</div><div class="sumbar"><span>جمع هفتگی این فعالیت</span><b id="draftTotal">${hr(actMins(d))} ساعت</b></div>`}
    h+=`<div class="actions"><button class="btn primary" id="saveActivitySettings" style="flex:1">ذخیره</button><button class="btn" id="dupActivity">کپی</button><button class="btn danger" id="delActivity">حذف</button></div></div>`}
  host.innerHTML=h}
function draftTotal(){const el=document.getElementById('draftTotal');if(el&&draft)el.textContent=hr(actMins({slots:draft.slots.filter(s=>validTime(s.start)&&validTime(s.end))}))+' ساعت'}
function saveDraft(){const d=draft;if(!d)return;d.title=document.getElementById('settingTitle').value.trim();d.cat=document.getElementById('settingCat').value;d.desc=document.getElementById('settingDesc').value.trim();if(!d.title)return toast('نام فعالیت را وارد کن');
  if(d.repeat==='once'){const dt=parseJalali(document.getElementById('settingDate').value);if(!dt)return toast('تاریخ شمسی معتبر نیست');d.date=dt;if(!validTime(d.start)||!validTime(d.end)||toMin(d.end)<=toMin(d.start))return toast('ساعت معتبر نیست؛ از قالب 18:00 استفاده کن و پایان باید بعد از شروع باشد')}
  else{if(!d.slots.length)return toast('حداقل یک روز و یک بازه انتخاب کن');for(const s of d.slots){if(!validTime(s.start)||!validTime(s.end)||toMin(s.end)<=toMin(s.start))return toast(`ساعت ${DAYS[s.day]} معتبر نیست؛ از قالب 18:00 استفاده کن و پایان باید بعد از شروع باشد`)}
    for(let i=0;i<7;i++){const sl=d.slots.filter(s=>+s.day===i).sort((a,b)=>toMin(a.start)-toMin(b.start));for(let k=1;k<sl.length;k++)if(toMin(sl[k].start)<toMin(sl[k-1].end))return toast(`بازه‌های ${DAYS[i]} روی هم افتاده‌اند`)}
    d.slots.sort((a,b)=>a.day-b.day||toMin(a.start)-toMin(b.start))}
  const i=state.activities.findIndex(a=>a.id===d.id);if(i<0)return;const clean=JSON.parse(JSON.stringify(d));delete clean._stash;state.activities[i]=clean;setCat=clean.cat;setId=clean.id;draft=null;const cf=conflictsFor(clean);save();toast(cf.length?'ذخیره شد؛ تداخل با: '+cf.slice(0,3).join('، '):'تنظیمات ذخیره شد',!!cf.length)}
function renderCatEditor(){document.getElementById('catEditor').innerHTML=state.categories.map((c,i)=>{const n=state.activities.filter(a=>a.cat===c.name).length;return `<div class="catedit"><input class="emo" data-cat-icon="${i}" value="${esc(c.icon)}" maxlength="4" aria-label="آیکن"><input data-cat-name="${i}" value="${esc(c.name)}" aria-label="نام"><button type="button" class="iconbtn" data-cat-del="${i}" ${n?'disabled style="opacity:.35"':''} aria-label="حذف">✕</button></div>`}).join('')}
function saveCats(){const names=[...document.querySelectorAll('[data-cat-name]')].map(el=>el.value.trim());if(names.some(n=>!n))return toast('نام دسته نمی‌تواند خالی باشد');if(new Set(names).size!==names.length)return toast('نام دسته تکراری است');
  state.categories.forEach((c,i)=>{const nn=names[i],ic=document.querySelector(`[data-cat-icon="${i}"]`).value.trim()||'🗂️';if(nn!==c.name){state.activities.forEach(a=>{if(a.cat===c.name)a.cat=nn});state.logs.forEach(l=>{if(l.cat===c.name)l.cat=nn});if(setCat===c.name)setCat=nn;if(selectedCat===c.name)selectedCat=nn;c.name=nn}c.icon=ic});draft=null;save();fillFilterCats();toast('دروس ذخیره شد')}
function renderSchoolEditor(){document.getElementById('schoolEditor').innerHTML=DAYS.map((d,i)=>`<div class="schoolrow"><span>${d}</span><input data-school="${i}" value="${esc(state.school[i]||'')}" placeholder="${i>=5?'تعطیل':'کلاس‌ها'}"></div>`).join('')}

function renderAll(){renderCats();renderHome();renderToday();renderWeekly();renderExams();renderLogs();if(document.getElementById('settings').classList.contains('active'))renderSettings();document.getElementById('profileName').textContent=activeProfile()?.name||'';document.getElementById('todayDateTop').textContent=jalali(todayISO());document.getElementById('dayNameTop').textContent=DAYS[dayIdx(todayISO())]}

/* ---------- پشتیبان ---------- */
async function saveFile(blob,name,title){try{const file=new File([blob],name,{type:blob.type});if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],title});return}}catch(e){if(e&&e.name==='AbortError')return}const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500)}
const profTag=id=>'profile'+(profiles.list.findIndex(p=>p.id===id)+1);
function exportData(){return saveFile(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),'konkur-backup-'+profTag(profiles.active)+'-'+todayISO()+'.json','پشتیبان کنکور سبوحا')}
async function importData(e){try{const j=JSON.parse(await e.target.files[0].text());if(!Array.isArray(j.activities)||!Array.isArray(j.categories))throw Error();if(confirm('اطلاعات پروفایل «'+(activeProfile()?.name||'')+'» با فایل پشتیبان جایگزین شود؟')){state=normalize(j);draft=null;save();fillFilterCats();toast('بازیابی شد')}}catch(_){toast('فایل پشتیبان معتبر نیست',true)}e.target.value=''}

/* ---------- مدیریت پروفایل، قالب و اکسل ---------- */
const clone=o=>JSON.parse(JSON.stringify(o));
const KINDS={study:'درسی',extra:'فوق‌برنامه',fixed:'ثابت'};
function advisorState(){const d=defaults();d.exams=[];return d}
function blankState(){const d=defaults();d.activities=[];d.exams=[];d.school=['','','','','','',''];d.categories.forEach(c=>c.target=0);return d}
function templateOf(src){return {categories:clone(src.categories),activities:clone(src.activities.filter(a=>a.repeat!=='once')),school:src.school.slice()}}
function sourceState(v){if(v==='advisor')return advisorState();if(v==='blank')return blankState();if(v&&v.startsWith('p:'))return readProfile(v.slice(2));return null}
function sourceOptions(withExtra){return (withExtra?'<option value="advisor">قالب پیش‌فرض مشاور</option><option value="blank">خالی (فقط فهرست دروس)</option>':'<option value="advisor">قالب پیش‌فرض مشاور</option>')+profiles.list.map(p=>`<option value="p:${esc(p.id)}">پروفایل ${esc(p.name)}${p.id===profiles.active?' (فعلی)':''}</option>`).join('')+(withExtra?'<option value="excel">فایل اکسل قالب</option>':'')}
function renderProfiles(){document.getElementById('profileList').innerHTML=profiles.list.map(p=>{const on=p.id===profiles.active;return `<div class="profrow ${on?'active':''}"><strong>👤 ${esc(p.name)} ${on?'<span class="pill ok">فعال</span>':''}</strong><div class="pctwrap">${on?'':`<button class="btn sm primary" data-prof-use="${esc(p.id)}">ورود</button>`}<button class="btn sm" data-prof-ren="${esc(p.id)}">تغییر نام</button>${on?'':`<button class="btn sm danger" data-prof-del="${esc(p.id)}">حذف</button>`}</div></div>`}).join('');
  const ns=document.getElementById('newProfSource'),nv=ns.value;ns.innerHTML=sourceOptions(true);if(nv&&[...ns.options].some(o=>o.value===nv))ns.value=nv;
  const xs=document.getElementById('xlsSource'),xv=xs.value;xs.innerHTML=sourceOptions(false);xs.value=xv&&[...xs.options].some(o=>o.value===xv)?xv:'p:'+profiles.active;newProfUI()}
function newProfUI(){const v=document.getElementById('newProfSource').value;document.getElementById('newProfModeWrap').classList.toggle('hidden',!v.startsWith('p:'));document.getElementById('newProfFileWrap').classList.toggle('hidden',v!=='excel')}
function resetView(){selectedDate=todayISO();selectedCat='';setCat='';setId='';draft=null;weekOff=0;newDays=[]}
function switchProfile(id){if(!profiles.list.some(p=>p.id===id))return;store();profiles.active=id;storeProfiles();load();resetView();fillFilterCats();fillCatOptions();renderAll();if(document.getElementById('settings').classList.contains('active'))renderSettings();toast('پروفایل «'+activeProfile().name+'» فعال شد')}
async function createProfile(){const name=document.getElementById('newProfName').value.trim(),src=document.getElementById('newProfSource').value,mode=document.getElementById('newProfMode').value;
  if(!name)return toast('نام پروفایل را وارد کنید');if(profiles.list.some(p=>p.name===name))return toast('پروفایلی با این نام وجود دارد');
  let ns;
  if(src==='excel'){const f=document.getElementById('newProfFile').files[0];if(!f)return toast('فایل اکسل قالب را انتخاب کنید');let tpl;try{tpl=await readTemplateXlsx(f)}catch(e){return toast(e.message||'فایل اکسل خوانده نشد',true)}ns=blankState();Object.assign(ns,tpl)}
  else{const base=sourceState(src);if(!base)return toast('منبع انتخاب‌شده خوانده نشد',true);
    if(src.startsWith('p:')&&mode==='full'){ns=clone(base)}else{ns=blankState();Object.assign(ns,clone(templateOf(base)))}}
  ns.startDate=src.startsWith('p:')&&mode==='full'?ns.startDate:todayISO();ns=normalize(ns);
  const id='p'+Date.now().toString(36);try{localStorage.setItem(pkey(id),JSON.stringify(ns))}catch(e){return toast('ذخیره‌سازی ممکن نشد؛ حافظه مرورگر پر است',true)}
  profiles.list.push({id,name});storeProfiles();document.getElementById('newProfName').value='';document.getElementById('newProfFile').value='';switchProfile(id);showPage('settings')}
function renameProfile(id){const p=profiles.list.find(x=>x.id===id);if(!p)return;const n=(prompt('نام جدید پروفایل:',p.name)||'').trim();if(!n||n===p.name)return;if(profiles.list.some(x=>x.name===n))return toast('این نام تکراری است');p.name=n;storeProfiles();renderAll();renderProfiles()}
function deleteProfile(id){const p=profiles.list.find(x=>x.id===id);if(!p||id===profiles.active)return;if(!confirm('پروفایل «'+p.name+'» و همه داده‌هایش برای همیشه حذف شود؟'))return;profiles.list=profiles.list.filter(x=>x.id!==id);storeProfiles();try{localStorage.removeItem(pkey(id))}catch(e){}renderProfiles();toast('پروفایل حذف شد')}

let xlsxP;function needXLSX(){if(window.XLSX)return Promise.resolve();return xlsxP||(xlsxP=new Promise((res,rej)=>{const sc=document.createElement('script');sc.src='xlsx.mini.min.js';sc.onload=res;sc.onerror=()=>{xlsxP=null;rej(Error('کتابخانه اکسل بارگذاری نشد؛ یک‌بار با اینترنت برنامه را باز کنید'))};document.head.appendChild(sc)}))}
const H_ACT=['عنوان فعالیت','درس','روز','شروع','پایان','توضیح'],H_CAT=['درس','آیکن','هدف هفتگی (ساعت)','نوع'],H_SCH=['روز','کلاس‌ها'];
async function exportTemplateXlsx(){const v=document.getElementById('xlsSource').value,src=sourceState(v);if(!src)return toast('منبع خوانده نشد',true);try{await needXLSX()}catch(e){return toast(e.message,true)}
  const t=templateOf(src),rows=[];t.activities.forEach(a=>(a.slots||[]).forEach(sl=>rows.push([a.title,a.cat,DAYS[sl.day],sl.start,sl.end,a.desc||'',+sl.day])));rows.sort((a,b)=>a[6]-b[6]||a[3].localeCompare(b[3]));
  const mk=(aoa,cols)=>{const ws=XLSX.utils.aoa_to_sheet(aoa);ws['!cols']=cols.map(w=>({wch:w}));return ws};
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,mk([H_ACT,...rows.map(r=>r.slice(0,6))],[24,14,10,8,8,24]),'برنامه هفتگی');
  XLSX.utils.book_append_sheet(wb,mk([H_CAT,...t.categories.map(c=>[c.name,c.icon,Math.round(c.target/6)/10,KINDS[c.kind]||'درسی'])],[16,6,16,12]),'دروس');
  XLSX.utils.book_append_sheet(wb,mk([H_SCH,...DAYS.map((d,i)=>[d,t.school[i]||''])],[10,50]),'کلاس‌های مدرسه');
  XLSX.utils.book_append_sheet(wb,mk([['راهنما'],['هر سطر «برنامه هفتگی» یک بازه زمانی است. فعالیت‌هایی که عنوان و درس یکسان دارند یک فعالیت با چند روز/بازه می‌شوند.'],['روز: یکی از شنبه، یکشنبه، دوشنبه، سه‌شنبه، چهارشنبه، پنجشنبه، جمعه'],['ساعت: به شکل 18:30 (۲۴ ساعته). پایان باید بعد از شروع باشد.'],['عنوانی که با مرور/تست/پیش‌خوانی/هفتگی/جبرانی شروع شود، برچسب همان نوع را می‌گیرد.'],['نوع درس: درسی، فوق‌برنامه یا ثابت (مثل مدرسه؛ بدون درصد پیشرفت).'],['درسی که در «برنامه هفتگی» آمده ولی در برگه «دروس» نیست، خودکار اضافه می‌شود.']],[90]),'راهنما');
  wb.Workbook={Views:[{RTL:true}]};
  const name=v.startsWith('p:')?profTag(v.slice(2)):'advisor';
  await saveFile(new Blob([XLSX.write(wb,{type:'array',bookType:'xlsx'})],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),'konkur-template-'+name+'.xlsx','قالب برنامه هفتگی')}
const normTxt=s=>normalizeSearch(toEn(s)).replace(/\s/g,'');
function cellTime(v){if(typeof v==='number'){const m=Math.round((v%1)*1440);return fromMin(m===0&&v>=1?1440:m)}if(v instanceof Date)return pad(v.getHours())+':'+pad(v.getMinutes());const t=toEn(String(v??'')).trim().replace(/[٫.]/g,':');if(!t)return '';const m=t.match(/^(\d{1,2})(?::(\d{1,2}))?/);return m?pad(+m[1])+':'+pad(+(m[2]||0)):t}
function findSheet(wb,name,head){const n=wb.SheetNames.find(x=>normTxt(x)===normTxt(name));if(n)return wb.Sheets[n];for(const x of wb.SheetNames){const r=XLSX.utils.sheet_to_json(wb.Sheets[x],{header:1})[0]||[];if(normTxt(r[0])===normTxt(head))return wb.Sheets[x]}return null}
async function readTemplateXlsx(file){await needXLSX();const wb=XLSX.read(await file.arrayBuffer(),{type:'array'});
  const sa=findSheet(wb,'برنامه هفتگی',H_ACT[0]);if(!sa)throw Error('برگه «برنامه هفتگی» در فایل پیدا نشد');
  const errs=[],acts=new Map(),cats=[],dayN=DAYS.map(normTxt);
  const sc=findSheet(wb,'دروس',H_CAT[0]);if(sc)XLSX.utils.sheet_to_json(sc,{header:1}).slice(1).forEach((r,i)=>{const n=String(r[0]??'').trim();if(!n||cats.some(c=>c.name===n))return;const tg=parseFloat(toEn(String(r[2]??'0')).replace(/[٫,\/]/g,'.'));const k=normTxt(r[3]);cats.push({name:n,icon:String(r[1]??'').trim()||'🗂️',target:isFinite(tg)&&tg>0?Math.round(tg*60):0,kind:k===normTxt('ثابت')?'fixed':k===normTxt('فوق‌برنامه')?'extra':'study'})});
  XLSX.utils.sheet_to_json(sa,{header:1}).slice(1).forEach((r,i)=>{const row=i+2;if(!r||r.every(x=>String(x??'').trim()===''))return;const title=String(r[0]??'').trim(),cat=String(r[1]??'').trim(),day=dayN.indexOf(normTxt(r[2])),st=cellTime(r[3]),en=cellTime(r[4]);
    if(!title||!cat){errs.push('سطر '+fa(row)+': عنوان یا درس خالی است');return}if(day<0){errs.push('سطر '+fa(row)+': روز «'+(r[2]??'')+'» نامعتبر است');return}
    if(!validTime(st)||!validTime(en)||toMin(en)<=toMin(st)){errs.push('سطر '+fa(row)+': ساعت نامعتبر است');return}
    const k=title+'\u0001'+cat;if(!acts.has(k))acts.set(k,{id:uid()+acts.size,title,cat,repeat:'weekly',slots:[],desc:''});const a=acts.get(k);a.slots.push({day,start:st,end:en});if(!a.desc&&r[5])a.desc=String(r[5]).trim();
    if(!cats.some(c=>c.name===cat))cats.push({name:cat,icon:'🗂️',target:0,kind:'study'})});
  if(errs.length)throw Error(errs.slice(0,3).join(' · ')+(errs.length>3?' · و '+fa(errs.length-3)+' خطای دیگر':''));
  if(!acts.size)throw Error('در برگه «برنامه هفتگی» هیچ فعالیتی نیست');
  const activities=[...acts.values()];activities.forEach(a=>a.slots.sort((x,y)=>x.day-y.day||toMin(x.start)-toMin(y.start)));
  const school=['','','','','','',''],ss=findSheet(wb,'کلاس‌های مدرسه',H_SCH[0]);if(ss)XLSX.utils.sheet_to_json(ss,{header:1}).slice(1).forEach(r=>{const d=dayN.indexOf(normTxt(r[0]));if(d>=0)school[d]=String(r[1]??'').trim()});
  return {categories:cats,activities,school}}
async function importXlsxCurrent(e){const f=e.target.files[0];e.target.value='';if(!f)return;let t;try{t=await readTemplateXlsx(f)}catch(err){return toast(err.message||'فایل اکسل خوانده نشد',true)}
  if(!confirm(`برنامه هفتگی پروفایل «${activeProfile().name}» با ${fa(t.activities.length)} فعالیت فایل اکسل جایگزین شود؟ پیشرفت‌ها، یادداشت‌ها، گزارش‌ها و امتحانات حفظ می‌شوند.`))return;
  t.categories.forEach(c=>{const o=catOf(c.name);if(o){o.icon=c.icon;o.target=c.target;o.kind=c.kind}else state.categories.push(c)});
  state.activities=t.activities.concat(state.activities.filter(a=>a.repeat==='once'));state.school=t.school;setId='';draft=null;save();fillFilterCats();toast('برنامه هفتگی از اکسل بارگذاری شد')}
function initProfiles(){document.getElementById('profileChip').addEventListener('click',()=>{showPage('settings');setTimeout(()=>document.getElementById('profilesCard').scrollIntoView({behavior:'smooth',block:'start'}),60)});
  document.getElementById('profileList').addEventListener('click',e=>{const u=e.target.closest('[data-prof-use]'),r=e.target.closest('[data-prof-ren]'),d=e.target.closest('[data-prof-del]');if(u)switchProfile(u.dataset.profUse);if(r)renameProfile(r.dataset.profRen);if(d)deleteProfile(d.dataset.profDel)});
  document.getElementById('newProfSource').addEventListener('change',newProfUI);
  document.getElementById('createProfile').addEventListener('click',createProfile);
  document.getElementById('exportXlsx').addEventListener('click',exportTemplateXlsx);
  document.getElementById('importXlsx').addEventListener('change',importXlsxCurrent)}

/* ---------- رویدادها ---------- */
function init(){selectedDate=todayISO();loadProfiles();load();initProfiles();try{navigator.storage?.persist?.()}catch(e){}
  document.addEventListener('click',e=>{const p=e.target.closest('[data-page]');if(p&&!e.target.closest('button:not([data-page]),select,input,textarea')){showPage(p.dataset.page);return}if(e.target.closest('[data-open="manage"]'))openManage()});
  document.getElementById('categories').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(b){selectedCat=b.dataset.cat;showPage('category')}});
  document.getElementById('categoryList').addEventListener('click',e=>{const d=e.target.closest('[data-delete-act]'),ed=e.target.closest('[data-edit-act]');if(d&&confirm('این فعالیت حذف شود؟')){state.activities=state.activities.filter(a=>a.id!==d.dataset.deleteAct);save();renderCategory()}if(ed){const a=state.activities.find(x=>x.id===ed.dataset.editAct);setCat=a.cat;setId=a.id;draft=null;showPage('settings')}});
  const tl=document.getElementById('todayList');
  tl.addEventListener('change',e=>{const c=e.target.closest('[data-check]'),s=e.target.closest('[data-pct]');if(c)setProgress(c.dataset.check,c.checked?100:0);if(s)setProgress(s.dataset.pct,+s.value)});
  tl.addEventListener('input',e=>{const ta=e.target.closest('[data-lognote]');if(!ta)return;upsertLog(ta.dataset.lognote,{note:ta.value});store()});
  tl.addEventListener('focusout',e=>{if(e.target.closest('[data-lognote]')){renderHome();renderLogs()}});
  tl.addEventListener('click',e=>{const del=e.target.closest('[data-note-delete]');if(del){const ins=del.dataset.noteDelete;upsertLog(ins,{note:''});save();return}const b=e.target.closest('[data-note-toggle]');if(!b)return;const panel=[...document.querySelectorAll('[data-note-panel]')].find(el=>el.dataset.notePanel===b.dataset.noteToggle);if(panel){panel.hidden=!panel.hidden;if(!panel.hidden)panel.querySelector('textarea')?.focus()}});
  document.getElementById('dateStrip').addEventListener('click',e=>{const b=e.target.closest('[data-date]');if(b){selectedDate=b.dataset.date;renderToday()}});
  document.getElementById('prevWeek').addEventListener('click',()=>{selectedDate=shift(selectedDate,-7);renderToday()});
  document.getElementById('nextWeek').addEventListener('click',()=>{selectedDate=shift(selectedDate,7);renderToday()});
  {let sx=0,sy=0;const card=document.getElementById('todayList');card.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});card.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*2&&!e.target.closest('select,input,textarea')){selectedDate=shift(selectedDate,dx>0?1:-1);renderToday()}},{passive:true})}
  document.getElementById('todayJump').addEventListener('click',()=>{selectedDate=todayISO();renderToday()});
  document.getElementById('focusNote').addEventListener('click',()=>{const n=document.getElementById('dayNote');n.scrollIntoView({behavior:'smooth',block:'center'});n.focus()});
  document.getElementById('saveNote').addEventListener('click',()=>{const v=document.getElementById('dayNote').value;if(v.trim())state.notes[selectedDate]=v;else delete state.notes[selectedDate];save();toast('یادداشت ذخیره شد')});
  // افزودن فعالیت
  document.getElementById('addCategory').addEventListener('click',addCategory);
  document.getElementById('saveActivity').addEventListener('click',saveActivity);
  document.getElementById('newRepeat').addEventListener('change',renderNewDays);
  document.getElementById('newDays').addEventListener('click',e=>{const b=e.target.closest('[data-newday]');if(!b)return;const i=+b.dataset.newday;newDays=newDays.includes(i)?newDays.filter(x=>x!==i):[...newDays,i];renderNewDays()});
  document.getElementById('clearActivity').addEventListener('click',()=>{['newTitle','newDesc','newCatName'].forEach(id=>document.getElementById(id).value='');document.getElementById('newDate').value=jalali(todayISO());newDays=[];renderNewDays();toast('فرم پاک شد')});
  document.addEventListener('input',e=>{if(e.target.classList.contains('clock-input'))liveTime(e.target)});
  document.addEventListener('focusout',e=>{const el=e.target;if(el.classList&&el.classList.contains('clock-input')&&el.value){el.value=fixTime(el.value);el.dispatchEvent(new Event('change',{bubbles:true}))}});
  // هفته
  document.getElementById('weekly').addEventListener('click',e=>{const b=e.target.closest('[data-wk]'),g=e.target.closest('[data-wkgo]');if(b){weekOff+=+b.dataset.wk;renderWeekly()}if(g){weekOff=+g.dataset.wkgo;renderWeekly()}});
  document.getElementById('carryList').addEventListener('click',e=>{const c=e.target.closest('[data-carry]'),s=e.target.closest('[data-skip]');if(c)carry(c.dataset.carry);if(s){state.carried[s.dataset.skip]='skip';save()}});
  // امتحانات
  document.getElementById('addExam').addEventListener('click',()=>{const d=parseJalali(document.getElementById('examDate').value),s=document.getElementById('examSubject').value.trim();if(!d)return toast('تاریخ شمسی معتبر وارد کنید');if(!s)return toast('نام درس را وارد کنید');state.exams.push({id:uid(),date:d,subject:s});document.getElementById('examSubject').value='';save();toast('امتحان اضافه شد')});
  document.getElementById('togglePast').addEventListener('click',()=>{showPastExams=!showPastExams;renderExams()});
  document.getElementById('examList').addEventListener('click',e=>{const b=e.target.closest('[data-del-exam]');if(b&&confirm('این امتحان حذف شود؟')){state.exams=state.exams.filter(x=>x.id!==b.dataset.delExam);save()}});
  // گزارش
  document.getElementById('exportData').addEventListener('click',exportData);
  document.getElementById('importData').addEventListener('change',importData);
  fillFilterCats();['filterFrom','filterTo','filterText'].forEach(id=>document.getElementById(id).addEventListener('input',renderLogs));document.getElementById('filterCat').addEventListener('change',renderLogs);
  document.getElementById('clearFilters').addEventListener('click',()=>{['filterFrom','filterTo','filterText'].forEach(id=>document.getElementById(id).value='');document.getElementById('filterCat').value='';renderLogs()});
  // تنظیمات
  document.getElementById('allocTable').addEventListener('input',e=>{if(e.target.dataset.target!==undefined)onTargetInput(e.target)});
  document.getElementById('saveTargets').addEventListener('click',saveTargets);
  document.getElementById('targetsFromPlan').addEventListener('click',()=>{if(!confirm('هدف هر درس برابر ساعات برنامه فعلی شود؟'))return;state.categories.forEach(c=>{if(c.kind!=='fixed')c.target=schedMins(c.name)});save();toast('اهداف با برنامه هماهنگ شد')});
  const sa=document.getElementById('settingsActivities');
  sa.addEventListener('click',e=>{const t=e.target;const sc=t.closest('[data-setcat]');if(sc){setCat=sc.dataset.setcat;setId='';draft=null;renderEditor();return}
    const add=t.closest('[data-slot-add]');if(add){const day=+add.dataset.slotAdd,sl=draft.slots.filter(s=>+s.day===day),last=sl[sl.length-1],st=last&&validTime(last.end)?last.end:'18:00',en=fromMin(Math.min(24*60,toMin(st)+30));draft.slots.push({day,start:st,end:en});renderEditor();draftTotal();return}
    const del=t.closest('[data-slot-del]');if(del){draft.slots.splice(+del.dataset.slotDel,1);renderEditor();draftTotal();return}
    if(t.closest('#saveActivitySettings'))return saveDraft();
    if(t.closest('#dupActivity')){const src=state.activities.find(a=>a.id===setId);if(!src)return;const c=JSON.parse(JSON.stringify(src));c.id=uid();c.title=src.title+' (کپی)';state.activities.push(c);setId=c.id;draft=null;save();toast('کپی ساخته شد؛ نام و ساعت را ویرایش کن');return}
    if(t.closest('#delActivity')){if(!confirm('«'+draft.title+'» حذف شود؟'))return;state.activities=state.activities.filter(a=>a.id!==setId);setId='';draft=null;save();toast('فعالیت حذف شد')}});
  sa.addEventListener('change',e=>{const t=e.target;if(t.id==='settingActivitySelect'){setId=t.value;draft=null;renderEditor();return}
    if(t.dataset.slotDay!==undefined){const day=+t.dataset.slotDay;draft._stash=draft._stash||{};if(t.checked){const back=draft._stash[day];draft.slots.push(...(back&&back.length?back:[{day,start:'18:00',end:'18:30'}]))}else{draft._stash[day]=draft.slots.filter(s=>+s.day===day);draft.slots=draft.slots.filter(s=>+s.day!==day)}renderEditor();draftTotal();return}
    if(t.dataset.slotK!==undefined){const s=draft.slots[+t.dataset.slotK];if(s){s[t.dataset.f]=t.value;const row=t.closest('.slot-row'),[a,b]=row.querySelectorAll('.clock-input');a.classList.toggle('bad',!validTime(s.start));b.classList.toggle('bad',!(validTime(s.end)&&validTime(s.start)&&toMin(s.end)>toMin(s.start)))}draftTotal();return}
    if(t.dataset.once){draft[t.dataset.once]=t.value}});
  sa.addEventListener('input',e=>{const t=e.target;if(t.dataset.slotK!==undefined){const s=draft.slots[+t.dataset.slotK];if(s)s[t.dataset.f]=t.value;draftTotal()}else if(t.dataset.once)draft[t.dataset.once]=t.value;else if(t.id==='settingTitle')draft.title=t.value;else if(t.id==='settingDesc')draft.desc=t.value});
  document.getElementById('catEditor').addEventListener('click',e=>{const b=e.target.closest('[data-cat-del]');if(!b||b.disabled)return;const c=state.categories[+b.dataset.catDel];if(confirm('دسته «'+c.name+'» حذف شود؟')){state.categories.splice(+b.dataset.catDel,1);save();fillFilterCats()}});
  document.getElementById('saveCats').addEventListener('click',saveCats);
  document.getElementById('saveSchool').addEventListener('click',()=>{document.querySelectorAll('[data-school]').forEach(el=>state.school[+el.dataset.school]=el.value.trim());save();toast('کلاس‌های مدرسه ذخیره شد')});
  document.getElementById('resetPlan').addEventListener('click',()=>{if(!confirm('برنامه هفتگی به برنامه مشاور برگردد؟ فعالیت‌های هفتگی سفارشی حذف می‌شوند.'))return;const once=state.activities.filter(a=>a.repeat==='once');state.activities=defaultActivities().concat(once);BASECATS.forEach(b=>{let c=catOf(b[0]);if(!c)state.categories.push({name:b[0],icon:b[1],target:Math.round(b[2]*60),kind:b[3]});else{c.target=Math.round(b[2]*60);c.kind=b[3]}});state.school=BASESCHOOL.slice();setId='';draft=null;save();toast('برنامه مشاور بازگردانده شد')});
  document.getElementById('newDate').value=jalali(todayISO());
  // تغییر روز هنگام باز ماندن برنامه
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){if(document.getElementById('todayDateTop').textContent!==jalali(todayISO()))selectedDate=todayISO();renderAll()}});
  renderAll()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
