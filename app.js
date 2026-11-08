// PineNotes — static, no-server notes app. No payments, no backend required.
// Sample notes are built-in. Uploads/favorites/views are saved per-browser in localStorage.
// To share uploads between everyone, add a backend later (see README.md).
const DEPARTMENTS=[
 'Computer Systems and Architecture',
 'Software Development',
 'Networking and Internet Technologies',
 'Electronics and Telecommunication',
 'Professional Accounting',
 'Multimedia Production',
 'Tourism and Hospitality',
 'Food and Beverage Operations',
 'Building and Construction Services'
];
const SAMPLE = [
 {id:'s1',title:'Algebra: Quadratic Equations',subject:'Mathematics',author:'PineNotes Team',date:'2026-01-10',size:'4 KB',downloads:128,views:210,description:'Completing the square, the quadratic formula, and worked examples for exam revision.',content:'Quadratic Equations\n\nax^2 + bx + c = 0\n\nDiscriminant: D = b^2 - 4ac\n- D > 0: two real roots\n- D = 0: one repeated root\n- D < 0: no real roots\n\nFormula: x = (-b ± sqrt(b^2-4ac)) / 2a\n\nExample: x^2 - 5x + 6 = 0 -> (x-2)(x-3)=0 -> x=2 or x=3.'},
 {id:'s2',title:'Newton’s Laws of Motion',subject:'Physics',author:'A. Uwase',date:'2026-01-18',size:'5 KB',downloads:96,views:154,description:'Force, mass and acceleration with simple diagrams described and practice questions.',content:'Newton Laws\n\n1) Inertia: object keeps state unless acted on.\n2) F = ma\n3) Every action has an equal opposite reaction.\n\nPractice: A 2 kg mass under 6 N accelerates at 3 m/s^2.'},
 {id:'s3',title:'Cell Structure & Functions',subject:'Biology',author:'PineNotes Team',date:'2026-02-02',size:'6 KB',downloads:84,views:131,description:'Nucleus, mitochondria, chloroplasts and more — labels, functions and comparisons.',content:'Cell Structure\n\nNucleus: controls cell activities, contains DNA.\nMitochondria: respiration, releases energy.\nChloroplast: photosynthesis (plant cells).\nCell membrane: controls entry/exit.\nCytoplasm: site of many reactions.'},
 {id:'s4',title:'Intro to Computer Systems',subject:'Computer Systems and Architecture',author:'S. Lucky',date:'2026-02-14',size:'5 KB',downloads:142,views:260,description:'Hardware vs software, input/output, storage, and how programs run.',content:'Computer Systems and Architecture\n\nHardware: physical parts (CPU, RAM, storage).\nSoftware: programs and data.\nInput -> Processing -> Output.\n\nCPU fetches, decodes and executes instructions.\nVon Neumann: program and data share memory.'},
 {id:'s5',title:'Acids, Bases and pH',subject:'Chemistry',author:'M. Jean',date:'2026-02-20',size:'4 KB',downloads:57,views:89,description:'pH scale, indicators, and everyday examples with safety notes.',content:'Acids and Bases\n\npH < 7 acid, pH = 7 neutral, pH > 7 alkaline.\nIndicators change colour in acids/alkalis.\n\nAlways follow lab safety rules.'},
 {id:'s6',title:'Essay Writing Structure',subject:'English',author:'PineNotes Team',date:'2026-03-01',size:'3 KB',downloads:63,views:102,description:'Introduction, body paragraphs, topic sentences and conclusion — with a template.',content:'Essay Structure\n\nIntroduction: hook + thesis.\nBody: one idea per paragraph, evidence, link back.\nConclusion: restate and finish strongly.'},
 {id:'s7',title:'Climate Zones of Africa',subject:'Geography',author:'K. Eric',date:'2026-03-08',size:'5 KB',downloads:41,views:67,description:'Tropical, arid and temperate zones, rainfall patterns and human activity.',content:'Climate Zones\n\nTropical: hot and wet near equator.\nArid: low rainfall, deserts.\nTemperate: moderate seasons.\n\nClimate affects farming and settlement.'},
 {id:'s8',title:'Vectors & Scalars',subject:'Physics',author:'A. Uwase',date:'2026-03-15',size:'4 KB',downloads:73,views:118,description:'Magnitude vs direction, addition of vectors, and common exam traps.',content:'Vectors and Scalars\n\nScalar: magnitude only (speed, mass).\nVector: magnitude + direction (velocity, force).\n\nAdd vectors head-to-tail.'},
 {id:'s9',title:'Software Development Life Cycle',subject:'Software Development',author:'S. Lucky',date:'2026-03-20',size:'5 KB',downloads:88,views:143,description:'Planning, design, coding, testing, deployment and maintenance explained simply.',content:'SDLC\n\n1 Requirements 2 Design 3 Code 4 Test 5 Deploy 6 Maintain\n\nGood software is tested, documented and maintainable.'},
 {id:'s10',title:'Networking: OSI & TCP/IP',subject:'Networking and Internet Technologies',author:'PineNotes Team',date:'2026-03-25',size:'6 KB',downloads:110,views:189,description:'Layers, IP, DNS and how the internet moves packets.',content:'Networking\n\nOSI: Physical, Data Link, Network, Transport, Session, Presentation, Application.\nIP moves packets. DNS translates names to IPs.'},
 {id:'s11',title:'Professional Accounting Basics',subject:'Professional Accounting',author:'M. Jean',date:'2026-04-01',size:'4 KB',downloads:35,views:52,description:'Debits, credits, balance sheet and income statement basics.',content:'Accounting Basics\n\nAssets = Liabilities + Equity\nDebit increases assets/expenses. Credit increases liabilities/income.\n\nAlways keep records and receipts.'},
 {id:'s12',title:'Multimedia Production Workflow',subject:'Multimedia Production',author:'K. Eric',date:'2026-04-05',size:'4 KB',downloads:29,views:44,description:'Pre-production, production, post-production for video and audio.',content:'Multimedia Workflow\n\nPre: script, storyboard, shot list.\nProduction: record.\nPost: edit, sound, export, review.'}
];
const KEY='pine_notes_v1', FAV_KEY='pinenotes_favs_v1', VIEW_KEY='pinenotes_views_v1', REPORT_KEY='pinenotes_reports_v1', RECENT_KEY='pinenotes_recent_v1', USER_KEY='pinenotes_users_v1', SESSION_KEY='pinenotes_session_v1';
const BLOCKED_EXT=['exe','bat','cmd','sh','bash','js','mjs','dll','so','dylib','msi','com','scr','ps1','vbs','jar','apk'];
const ALLOWED_EXT=['txt','md','pdf','doc','docx','ppt','pptx','html','htm','csv','json'];
function loadNotes(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'[]');return [...saved, ...SAMPLE];}catch(e){return [...SAMPLE];}}
function loadMap(k){try{return JSON.parse(localStorage.getItem(k)||'{}');}catch(e){return {};}}
let notes=loadNotes();
let favs=loadMap(FAV_KEY); // id:true
let viewCounts=loadMap(VIEW_KEY);
let reports=loadMap(REPORT_KEY);
let recent=(()=>{try{return JSON.parse(localStorage.getItem(RECENT_KEY)||'[]');}catch(e){return [];}})();
let activeSubject='All', query='', sortMode='newest', typeFilter='all', viewMode='grid', previewId=null, shareId=null;
const $=s=>document.querySelector(s);
const grid=$('#notesGrid'), empty=$('#emptyState');
// ===== SHARED BACKEND (Supabase free) — makes notes visible to everyone =====
let supabaseClient=null, sharedMode=false;
(function initSupabase(){
  try{
    const cfg=window.PINENOTES_SUPABASE;
    if(cfg && cfg.url && !cfg.url.includes('YOUR-PROJECT') && cfg.anonKey && !cfg.anonKey.includes('YOUR-ANON') && window.supabase){
      supabaseClient=window.supabase.createClient(cfg.url,cfg.anonKey);
      sharedMode=true;
    }
  }catch(e){console.warn('Supabase init failed',e);}
})();
async function fetchSharedNotes(){
  const el=$('#sharedStatus');
  if(!sharedMode){if(el)el.innerHTML='🌐 <strong>Per-browser mode:</strong> uploads show only on this device. To share with everyone, connect free Supabase — see README “Make notes shared”.';return;}
  try{
    const {data,error}=await supabaseClient.from('notes').select('*').order('created_at',{ascending:false});
    if(error)throw error;
    const remote=(data||[]).map(r=>({id:r.id,title:r.title,subject:r.subject,author:r.author,level:r.level||'',tags:r.tags||'',description:r.description||'',date:r.created_at,size:r.filesize,filename:r.filename,mimetype:r.mimetype,storage_path:r.storage_path,public_url:r.public_url,downloads:r.downloads||0,views:r.views||0,remote:true}));
    const localOnly=notes.filter(n=>!n.remote && !remote.some(r=>r.filename===n.filename&&r.title===n.title));
    notes=[...remote,...localOnly,...SAMPLE.filter(s=>!remote.some(r=>r.id===s.id))];
    if(el)el.innerHTML=`🌐 <strong>Shared library connected:</strong> ${remote.length} note(s) from everyone · Upload up to 50 MB · New uploads appear for all users.`;
    renderFilters();render();
  }catch(e){console.warn(e);if(el)el.innerHTML='⚠️ Shared library could not load — check Supabase URL/key in supabase-config.js, then refresh.';}
}
async function uploadShared(note,file){
  const cfg=window.PINENOTES_SUPABASE;const path=`${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name.replace(/[^\w.-]+/g,'_')}`;
  const {error:upErr}=await supabaseClient.storage.from(cfg.bucket).upload(path,file,{upsert:false});
  if(upErr)throw upErr;
  const {data:pub}=supabaseClient.storage.from(cfg.bucket).getPublicUrl(path);
  const row={id:note.id,title:note.title,subject:note.subject,author:note.author,level:note.level||'',tags:note.tags||'',description:note.description||'',filename:note.filename,filesize:note.size,mimetype:file.type||'',storage_path:path,public_url:pub.publicUrl,downloads:0,views:0,created_at:note.date};
  const {error:insErr}=await supabaseClient.from('notes').insert(row);
  if(insErr)throw insErr;
  return {...note,public_url:pub.publicUrl,storage_path:path,remote:true};
}
async function deleteShared(n){
  if(!sharedMode||!n.remote)return;
  try{await supabaseClient.from('notes').delete().eq('id',n.id);if(n.storage_path)await supabaseClient.storage.from(window.PINENOTES_SUPABASE.bucket).remove([n.storage_path]);}catch(e){console.warn(e);}
}

function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function extOf(n){const name=(n.filename||'').toLowerCase(); if(name.endsWith('.pdf'))return 'pdf'; if(name.endsWith('.txt')||name.endsWith('.md'))return 'txt'; if(name.endsWith('.doc')||name.endsWith('.docx'))return 'doc'; if(name.endsWith('.ppt')||name.endsWith('.pptx'))return 'ppt'; if(!name && n.content)return 'txt'; return 'other';}
function extLabel(e){return {pdf:'PDF',txt:'TXT',doc:'DOC',ppt:'PPT',other:'FILE'}[e]||'FILE';}
function subjects(){const extra=[...new Set(notes.map(n=>n.subject))].filter(s=>!DEPARTMENTS.includes(s));return ['All',...DEPARTMENTS,...extra];}
function renderFilters(){
  $('#filters').innerHTML=subjects().map(s=>`<button class="chip ${s===activeSubject?'active':''}" data-subject="${esc(s)}">${esc(s)}</button>`).join('');
  $('#subjectList').innerHTML=subjects().slice(1).map(s=>`<button class="chip" data-subject="${esc(s)}">${esc(s)} (${notes.filter(n=>n.subject===s).length})</button>`).join('');
}
function sortList(list){
  const a=[...list];
  if(sortMode==='popular')a.sort((x,y)=>(y.downloads||0)-(x.downloads||0));
  else if(sortMode==='az')a.sort((x,y)=>x.title.localeCompare(y.title));
  else if(sortMode==='oldest')a.sort((x,y)=>String(x.date).localeCompare(String(y.date)));
  else a.sort((x,y)=>String(y.date).localeCompare(String(x.date)));
  return a;
}
function filtered(){
  const q=query.trim().toLowerCase();
  return sortList(notes.filter(n=>(activeSubject==='All'||n.subject===activeSubject)&&(typeFilter==='all'||extOf(n)===typeFilter)&&(!q||[n.title,n.subject,n.author,n.description,(n.tags||'')].join(' ').toLowerCase().includes(q))));
}
function cardHTML(n,i){
  const fav=favs[n.id]?'active':'';
  const ext=extOf(n);
  return `<article class="card" data-id="${n.id}" style="animation-delay:${(i||0)*40}ms">
    <button class="fav-btn ${fav}" data-fav="${n.id}" aria-label="Favorite" title="Favorite">⭐</button>
    <div class="card-top"><span class="subject">${esc(n.subject)}</span><span class="downloads">⬇️ ${n.downloads||0} · 👁️ ${(n.views||0)+(viewCounts[n.id]||0)}</span></div>
    <h3>${esc(n.title)}</h3><div class="meta">By ${esc(n.author)}${n.level?` · ${esc(n.level)}`:''} · ${esc(n.date)} · ${esc(n.size)} <span class="file-badge">${extLabel(ext)}</span>${n.tags?` ${String(n.tags).split(',').map(t=>`<span class="tag">#${esc(t.trim())}</span>`).join('')}`:''}</div>
    <p class="desc">${esc(n.description||'Student note.')}</p>
    <div class="card-foot"><span class="meta">📄 ${esc(n.filename||'pinenotes-note.txt')}</span>
    <div class="card-actions"><button class="mini" data-preview="${n.id}">👁 Preview</button><button class="mini" data-share="${n.id}">📤 Share</button><button class="download" data-download="${n.id}">Download ↓</button><button class="report-btn" data-report="${n.id}" title="Report this note">⚑ Report</button></div></div></article>`;
}
function render(){
  const list=filtered();
  $('#resultText').textContent=`Showing ${list.length} of ${notes.length} notes`;
  $('#activeFilterText').textContent=[activeSubject!=='All'?activeSubject:'',typeFilter!=='all'?extLabel(typeFilter):'',query?`“${query}”`:''].filter(Boolean).join(' · ');
  empty.hidden=list.length!==0;
  grid.className='grid'+(viewMode==='list'?' list':'');
  grid.innerHTML=list.map(cardHTML).join('');
  if(typeof refreshAiNotes==='function'&&$('#aiNoteSelect'))refreshAiNotes();
  renderFavorites();updateDashboard();
}
function renderFavorites(){
  const list=notes.filter(n=>favs[n.id]);
  $('#favGrid').innerHTML=list.map(cardHTML).join('');
  $('#favEmpty').hidden=list.length!==0;
  $('#favGrid').hidden=list.length===0;
  $('#recentText').textContent=recent.length?`Recently viewed: ${recent.slice(0,3).map(id=>{const n=notes.find(x=>x.id===id);return n?n.title:'';}).filter(Boolean).join(' · ')}`:'';
}
function updateDashboard(){
  $('#statNotes').textContent=notes.length;
  $('#statSubjects').textContent=new Set(notes.map(n=>n.subject)).size;
  $('#statDownloads').textContent=notes.reduce((a,n)=>a+(n.downloads||0),0);
  $('#statAuthors').textContent=new Set(notes.map(n=>n.author)).size;
  $('#statFavs').textContent=Object.keys(favs).length;
  $('#topList').innerHTML=[...notes].sort((a,b)=>(b.downloads||0)-(a.downloads||0)).slice(0,4).map(n=>`<li>${esc(n.title)} — ${n.downloads||0} downloads</li>`).join('');
  $('#latestList').innerHTML=[...notes].sort((a,b)=>String(b.date).localeCompare(String(a.date))).slice(0,4).map(n=>`<li>${esc(n.title)} <small>(${esc(n.date)})</small></li>`).join('');
  const viewed=[...notes].map(n=>({...n,totalViews:(n.views||0)+(viewCounts[n.id]||0)})).sort((a,b)=>b.totalViews-a.totalViews).slice(0,4);
  $('#viewedList').innerHTML=viewed.map(n=>`<li>${esc(n.title)} — ${n.totalViews} views</li>`).join('');
  const byAuthor={};notes.forEach(n=>byAuthor[n.author]=(byAuthor[n.author]||0)+1);
  $('#contributorList').innerHTML=Object.entries(byAuthor).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([a,c])=>`<li>${esc(a)} — ${c} note${c>1?'s':''}</li>`).join('');
  const max=Math.max(1,...DEPARTMENTS.map(d=>notes.filter(n=>n.subject===d).length));
  $('#deptChart').innerHTML=DEPARTMENTS.map(d=>{const c=notes.filter(n=>n.subject===d).length;return `<div class="chart-row"><span>${esc(d)}<div class="bar"><i style="width:${(c/max)*100}%"></i></div></span><b>${c}</b></div>`;}).join('');
}
function saveUploads(){localStorage.setItem(KEY,JSON.stringify(notes.filter(n=>n.uploaded)));}
function saveFavs(){localStorage.setItem(FAV_KEY,JSON.stringify(favs));}
function trackView(id){viewCounts[id]=(viewCounts[id]||0)+1;localStorage.setItem(VIEW_KEY,JSON.stringify(viewCounts));recent=[id,...recent.filter(x=>x!==id)].slice(0,8);localStorage.setItem(RECENT_KEY,JSON.stringify(recent));}
function exportData(){
  const data={app:'PineNotes',exported:new Date().toISOString(),favorites:favs,uploads:notes.filter(n=>n.uploaded),views:viewCounts,recent};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='pinenotes-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Backup downloaded ⬇');
}
function download(id){
  const n=notes.find(x=>x.id===id);if(!n)return;
  n.downloads=(n.downloads||0)+1;trackView(id);saveUploads();render();
  if(n.public_url){if(sharedMode)supabaseClient.from('notes').update({downloads:n.downloads}).eq('id',n.id).then(()=>{});window.open(n.public_url,'_blank');toast(`Downloading: ${n.title}`);return;}
  if(n.dataUrl){const a=document.createElement('a');a.href=n.dataUrl;a.download=n.filename||'pinenotes-note';a.click();}
  else{const blob=new Blob([n.content||n.title],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=(n.filename||'pinenotes-note.txt');a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  toast(`Downloaded: ${n.title}`);
}
function openPreview(id){
  const n=notes.find(x=>x.id===id);if(!n)return;previewId=id;trackView(id);render();
  $('#previewTitle').textContent=n.title;
  let body='';
  if(n.public_url)body=`<iframe src="${esc(n.public_url)}" title="Preview"></iframe><p class="meta">Shared file preview — use Download for best quality. Size: ${esc(n.size)}</p>`;
  else if(n.dataUrl && n.dataUrl.startsWith('data:application/pdf'))body=`<iframe src="${n.dataUrl}" title="PDF preview"></iframe><p class="meta">PDF preview — use Download for the best quality.</p>`;
  else if(n.dataUrl && n.dataUrl.startsWith('data:text')){body=`<pre>${esc(decodeURIComponent(n.dataUrl.split(',')[1]||''))}</pre>`;}
  else if(n.content)body=`<pre>${esc(n.content)}</pre>`;
  else body=`<p>Preview is not available for this file type in the browser. Use Download to open it on your device.</p><p class="meta">File: ${esc(n.filename||'')} · ${esc(n.size)}</p>`;
  $('#previewBody').innerHTML=`<p class="meta">${esc(n.subject)} · ${esc(n.author)} · ${esc(n.date)}</p>${body}`;
  $('#previewModal').hidden=false;
}
function openShare(id){
  shareId=id||null;
  const n=id?notes.find(x=>x.id===id):null;
  const url=location.origin+location.pathname+(n?`#note-${n.id}`:'');
  $('#shareText').textContent=n?`Share “${n.title}” (${n.subject})`:'Share PineNotes with a friend';
  $('#shareUrl').value=url;
  $('#qrImg').src=`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(url)}`;
  $('#shareModal').hidden=false;
}
function closeModals(){$('#previewModal').hidden=true;$('#shareModal').hidden=true;previewId=null;}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600);}

document.addEventListener('click',e=>{
  const d=e.target.closest('[data-download]');if(d)download(d.dataset.download);
  const p=e.target.closest('[data-preview]');if(p)openPreview(p.dataset.preview);
  const s=e.target.closest('[data-share]');if(s)openShare(s.dataset.share);
  const f=e.target.closest('[data-fav]');if(f){const id=f.dataset.fav;favs[id]=!favs[id];if(!favs[id])delete favs[id];saveFavs();render();toast(favs[id]?'Added to favorites ⭐':'Removed from favorites');}
  const sub=e.target.closest('[data-subject]');if(sub){activeSubject=sub.dataset.subject;renderFilters();render();document.querySelector('#notes').scrollIntoView({behavior:'smooth'});}
  const q=e.target.closest('[data-q]');if(q){query=q.dataset.q;$('#searchInput').value=query;render();}
  const c=e.target.closest('[data-copy]');if(c){navigator.clipboard?.writeText(c.dataset.copy);toast('Copied to clipboard');}
  const r=e.target.closest('[data-report]');if(r){const id=r.dataset.report;reports[id]={date:new Date().toISOString(),note:id};localStorage.setItem(REPORT_KEY,JSON.stringify(reports));toast('Reported — thank you. The PineNotes team will review it. ⚑');}
  if(e.target.closest('[data-close]'))closeModals();
});
$('#searchInput').addEventListener('input',e=>{query=e.target.value;render();});
$('#searchForm').addEventListener('submit',e=>{e.preventDefault();render();document.querySelector('#notes').scrollIntoView({behavior:'smooth'});});
$('#sortSelect').addEventListener('change',e=>{sortMode=e.target.value;render();});
$('#typeSelect').addEventListener('change',e=>{typeFilter=e.target.value;render();});
$('#viewSelect').addEventListener('change',e=>{viewMode=e.target.value;render();});
$('#clearFiltersBtn').addEventListener('click',()=>{activeSubject='All';query='';typeFilter='all';sortMode='newest';$('#searchInput').value='';$('#typeSelect').value='all';$('#sortSelect').value='newest';renderFilters();render();});
$('#exportBtn').addEventListener('click',exportData);
$('#exportFavsBtn').addEventListener('click',exportData);
$('#printFavsBtn').addEventListener('click',()=>window.print());
$('#clearDataBtn').addEventListener('click',()=>{if(!confirm('Clear your uploads, favorites and views from THIS browser? This cannot be undone.'))return;[KEY,FAV_KEY,VIEW_KEY,RECENT_KEY,REPORT_KEY].forEach(k=>localStorage.removeItem(k));location.reload();});
$('#shareLibraryBtn').addEventListener('click',()=>openShare(null));
$('#copyShareBtn').addEventListener('click',()=>{navigator.clipboard?.writeText($('#shareUrl').value);toast('Link copied 📤');});
$('#nativeShareBtn').addEventListener('click',async()=>{const data={title:'PineNotes',text:$('#shareText').textContent,url:$('#shareUrl').value};if(navigator.share){try{await navigator.share(data);}catch(e){}}else{navigator.clipboard?.writeText(data.url);toast('Link copied — share it anywhere 📤');}});
$('#previewDownload').addEventListener('click',()=>{if(previewId){download(previewId);closeModals();}});
$('#previewShare').addEventListener('click',()=>{if(previewId)openShare(previewId);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals();if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();$('#searchInput').focus();}});
if('serviceWorker' in navigator && location.protocol.startsWith('http')){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}
$('#fileInput').addEventListener('change',e=>{const f=e.target.files[0];$('#fileInfo').textContent=f?`${f.name} · ${(f.size/1024).toFixed(1)} KB`:'PDF, DOCX, PPTX, TXT, MD, HTML, CSV, JSON · Max 50 MB recommended';});
const dz=$('#dropZone');
['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.add('drag');}));
['dragleave','drop'].forEach(ev=>dz.addEventListener(ev,e=>{e.preventDefault();dz.classList.remove('drag');}));
dz.addEventListener('drop',e=>{const f=e.dataTransfer.files[0];if(!f)return;const dt=new DataTransfer();dt.items.add(f);$('#fileInput').files=dt.files;$('#fileInfo').textContent=`${f.name} · ${(f.size/1024).toFixed(1)} KB`;});
$('#uploadForm').addEventListener('submit',async e=>{
  e.preventDefault();const f=new FormData(e.target);const file=f.get('file');
  const ext=(file.name.split('.').pop()||'').toLowerCase();
  if(BLOCKED_EXT.includes(ext)){toast('⛔ Blocked for safety: executable files cannot be uploaded');return;}
  if(!ALLOWED_EXT.includes(ext)){toast('⛔ File type not allowed. Use PDF, DOCX, PPTX, TXT, MD, HTML, CSV or JSON');return;}
  if(file.size>50*1024*1024){toast('File is larger than 50 MB — choose a smaller file');return;}
  if(notes.some(n=>n.title.toLowerCase()===String(f.get('title')).toLowerCase()&&n.filename===file.name)){if(!confirm('A note with this title/file already exists. Publish anyway?'))return;}
  const now=new Date().toISOString().slice(0,10);
  const sizeStr=file.size>1024*1024?(file.size/1024/1024).toFixed(1)+' MB':(file.size/1024).toFixed(1)+' KB';
  let newNote={id:'u'+Date.now(),title:f.get('title'),subject:f.get('subject'),author:f.get('author'),level:f.get('level')||'',tags:(f.get('tags')||'').slice(0,120),description:f.get('description'),date:now,size:sizeStr,filename:file.name,downloads:0,views:0,uploaded:true};
  const btn=e.target.querySelector('button[type="submit"]');const orig=btn.textContent;btn.textContent='Uploading…';btn.disabled=true;
  try{
    if(sharedMode){
      newNote=await uploadShared(newNote,file);
      toast('Published to shared library! 🌐 Everyone can see it now.');
    }else{
      if(file.size>4*1024*1024){toast('⚠️ 50 MB works only in Shared mode. In per-browser mode, large files cannot be saved — connect Supabase (README) or use a smaller file.');}
      const dataUrl=await new Promise(res=>{const r=new FileReader();r.onload=()=>res(r.result);r.readAsDataURL(file);});
      if(dataUrl.length>6*1024*1024){toast('⚠️ File too large for browser storage. Connect Supabase for 50 MB shared uploads.');btn.textContent=orig;btn.disabled=false;return;}
      newNote.dataUrl=dataUrl;
      toast('Note published in this browser only. Connect Supabase to share with everyone.');
    }
  }catch(err){console.warn(err);toast('Upload failed: '+(err.message||'check Supabase setup'));btn.textContent=orig;btn.disabled=false;return;}
  notes.unshift(newNote);
  saveUploads();renderFilters();render();e.target.reset();$('#fileInfo').textContent='PDF, DOCX, PPTX, TXT, MD, HTML, CSV, JSON · Max 50 MB recommended';btn.textContent=orig;btn.disabled=false;document.querySelector('#notes').scrollIntoView({behavior:'smooth'});
});
$('#menuBtn').addEventListener('click',()=>document.querySelector('.nav nav').classList.toggle('open'));
document.querySelectorAll('.nav nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav nav').classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&x.target.classList.add('visible')),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ===== AUTH SYSTEM — username + password accounts (Vercel static, per-browser storage) =====
function loadUsers(){try{return JSON.parse(localStorage.getItem(USER_KEY)||'[]');}catch(e){return [];}}
function saveUsers(u){localStorage.setItem(USER_KEY,JSON.stringify(u));}
async function hashPass(pw){
  if(crypto&&crypto.subtle){const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(pw+'pinenotes-salt'));return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');}
  let h=0;for(let i=0;i<pw.length;i++){h=(h<<5)-h+pw.charCodeAt(i);h|=0;}return 'weak'+Math.abs(h)+'_'+pw.length;
}
function currentUser(){const s=localStorage.getItem(SESSION_KEY);if(!s)return null;return loadUsers().find(u=>u.username===s)||null;}
function initialOf(name){return (name||'?').trim().charAt(0).toUpperCase()||'?';}
function showPage(id){
  ['loginPage','registerPage','rolePage','teacherRegisterPage','appPage','teacherPage','accountPage'].forEach(p=>{const el=document.getElementById(p);if(el)el.hidden=(p!==id);});
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='appPage'){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
}
function updateHeader(){
  const u=currentUser();const area=$('#userArea');
  if(u){area.hidden=false;$('#avatarLetter').textContent=initialOf(u.displayName||u.username);$('#navUsername').textContent=u.username;$('#mainNav').style.display='flex';$('#mainLinks').style.display='flex';const pr=$('#publishRoleText');if(pr)pr.textContent=u.role==='teacher'?`Publishing as Teacher 👩‍🏫 (${u.teacherData?.fullName||u.username}) — your note will be marked as teacher content.`:`Publishing as Student 🎓 (${u.username}) — you are about to upload. Are you Teacher or Student? You chose Student.`;}
  else{area.hidden=true;$('#mainLinks').style.display='none';}
}
function afterLogin(){
  updateHeader();const u=currentUser();if(!u){showPage('loginPage');return;}
  if(!u.role){$('#roleUsername').textContent=u.username;showPage('rolePage');}
  else if(u.role==='teacher'&&!u.teacherData){showPage('teacherRegisterPage');}
  else if(u.role==='teacher'){renderTeacher();showPage('teacherPage');}
  else{showPage('appPage');}
}
function renderTeacher(){
  const u=currentUser();if(!u)return;const td=u.teacherData||{};
  $('#teacherName').textContent=td.fullName||u.username;
  $('#teacherAvatarLetter').textContent=initialOf(td.fullName||u.username);
  $('#teacherMeta').textContent=`${td.school||''} · ${td.department||''} · ID: ${td.teacherId||''}`;
  $('#tNotes').textContent=notes.length;
  $('#tMine').textContent=notes.filter(n=>n.author===u.username||n.author===td.fullName).length;
  $('#tDownloads').textContent=notes.reduce((a,n)=>a+(n.downloads||0),0);
  $('#tStudents').textContent=loadUsers().filter(x=>x.role==='student').length;
  const mine=notes.filter(n=>n.uploaded);
  $('#teacherMyNotes').innerHTML=mine.length?mine.map(n=>`<div class="note-row"><span><b>${esc(n.title)}</b> <small class="meta">${esc(n.subject)} · ${esc(n.author)}</small></span><span><button class="mini" data-preview="${n.id}">Preview</button> <button class="mini" data-download="${n.id}">Download</button> <button class="report-btn" data-delete-note="${n.id}">Remove</button></span></div>`).join(''):'<p class="meta">No uploads yet in this browser.</p>';
  $('#teacherAllNotes').innerHTML=mine.length?mine.map(n=>`<div class="note-row"><span><b>${esc(n.title)}</b> <small class="meta">${esc(n.subject)} · ${esc(n.author)} · ⬇️${n.downloads||0}</small></span><button class="report-btn" data-delete-note="${n.id}">Remove</button></div>`).join(''):'<p class="meta">No uploads to moderate.</p>';
}
function renderAccount(){
  const u=currentUser();if(!u)return;
  $('#accountLetter').textContent=initialOf(u.teacherData?.fullName||u.username);
  $('#accountName').textContent=u.teacherData?.fullName||u.username;
  $('#accountRole').textContent=(u.role==='teacher'?'👩‍🏫 Teacher':'🎓 Student')+` · @${u.username}`;
  $('#accountSince').textContent=`Member since ${u.created||''} · Username initial: ${initialOf(u.username)}`;
  $('#accUploads').textContent=notes.filter(n=>n.author===u.username||n.author===u.teacherData?.fullName).length;
  $('#accFavs').textContent=Object.keys(favs).length;
  $('#accDownloads').textContent=notes.reduce((a,n)=>a+(n.downloads||0),0);
  const box=$('#accountTeacherBox');
  if(u.role==='teacher'&&u.teacherData){box.hidden=false;$('#accountTeacherData').innerHTML=Object.entries(u.teacherData).map(([k,v])=>`<p><b>${esc(k)}:</b> ${esc(v)}</p>`).join('');}else box.hidden=true;
}
// Auth UI handlers — Login and Create Account are separate pages
$('#goRegisterBtn').addEventListener('click',()=>showPage('registerPage'));
$('#goLoginBtn').addEventListener('click',()=>showPage('loginPage'));
$('#loginForm').addEventListener('submit',async e=>{
  e.preventDefault();const f=new FormData(e.target);const un=String(f.get('username')).trim().toLowerCase(),pw=String(f.get('password'));
  const users=loadUsers();const u=users.find(x=>x.username===un);
  if(!u||u.passHash!==await hashPass(pw)){$('#loginError').textContent='That username or password doesn’t match. Check your spelling and try again — or create a new account.';$('#loginError').hidden=false;return;}
  localStorage.setItem(SESSION_KEY,u.username);toast(`Welcome back, ${u.username} 👋`);afterLogin();
});
$('#createForm').addEventListener('submit',async e=>{
  e.preventDefault();const f=new FormData(e.target);const un=String(f.get('username')).trim().toLowerCase(),pw=String(f.get('password')),cf=String(f.get('confirm'));
  const err=$('#createError');
  if(!/^[a-z0-9_]{3,24}$/.test(un)){err.textContent='Username must be 3–24 characters: letters, numbers or _. ';err.hidden=false;return;}
  if(pw.length<6){err.textContent='Password must be at least 6 characters.';err.hidden=false;return;}
  if(pw!==cf){err.textContent='Passwords do not match.';err.hidden=false;return;}
  const users=loadUsers();if(users.some(u=>u.username===un)){err.textContent='That username is taken. Choose another.';err.hidden=false;return;}
  users.push({username:un,displayName:String(f.get('displayName')||un).trim(),passHash:await hashPass(pw),created:new Date().toISOString().slice(0,10)});saveUsers(users);
  localStorage.setItem(SESSION_KEY,un);toast('Account created 🎉');afterLogin();
});
$('#chooseStudent').addEventListener('click',()=>{const users=loadUsers();const u=users.find(x=>x.username===localStorage.getItem(SESSION_KEY));u.role='student';saveUsers(users);toast('Welcome, Student 🎓');afterLogin();});
$('#chooseTeacher').addEventListener('click',()=>{showPage('teacherRegisterPage');});
$('#backToStudentBtn').addEventListener('click',()=>{const users=loadUsers();const u=users.find(x=>x.username===localStorage.getItem(SESSION_KEY));u.role='student';saveUsers(users);afterLogin();});
$('#teacherForm').addEventListener('submit',e=>{
  e.preventDefault();const f=new FormData(e.target);const users=loadUsers();const u=users.find(x=>x.username===localStorage.getItem(SESSION_KEY));
  u.role='teacher';u.teacherData={fullName:f.get('fullName'),teacherId:f.get('teacherId'),school:f.get('school'),department:f.get('department'),subjects:f.get('subjects'),phone:f.get('phone')||'—',experience:(f.get('experience')||'—')+' years',registered:new Date().toISOString().slice(0,10)};saveUsers(users);toast('Teacher registered 👩‍🏫');afterLogin();
});
function logout(){localStorage.removeItem(SESSION_KEY);updateHeader();showPage('loginPage');toast('Logged out. See you soon 👋');}
$('#logoutBtn').addEventListener('click',logout);
$('#accountLogoutBtn').addEventListener('click',logout);
$('#avatarBtn').addEventListener('click',()=>{renderAccount();showPage('accountPage');});
$('#accountGoLibrary').addEventListener('click',()=>afterLogin());
$('#teacherGoPublish').addEventListener('click',()=>{showPage('appPage');setTimeout(()=>document.querySelector('#upload').scrollIntoView(),50);});
$('#teacherGoLibrary').addEventListener('click',()=>showPage('appPage'));
$('#teacherGoManage').addEventListener('click',()=>{renderTeacher();toast('Manage below — Remove any unsafe upload');});
$('#teacherExport').addEventListener('click',()=>{exportData();});
$('#teacherViewAccount').addEventListener('click',()=>{renderAccount();showPage('accountPage');});
$('#teacherSwitchStudent').addEventListener('click',()=>showPage('appPage'));
$('#changePassBtn').addEventListener('click',()=>{$('#changePassForm').hidden=false;});
$('#cancelPassBtn').addEventListener('click',()=>{$('#changePassForm').hidden=true;});
$('#changePassForm').addEventListener('submit',async e=>{
  e.preventDefault();const f=new FormData(e.target);if(f.get('newPass').length<6){$('#passError').textContent='At least 6 characters.';$('#passError').hidden=false;return;}if(f.get('newPass')!==f.get('confirmPass')){$('#passError').textContent='Passwords do not match.';$('#passError').hidden=false;return;}
  const users=loadUsers();const u=users.find(x=>x.username===localStorage.getItem(SESSION_KEY));u.passHash=await hashPass(f.get('newPass'));saveUsers(users);$('#changePassForm').hidden=true;toast('Password changed 🔑');
});
$('#deleteAccountBtn').addEventListener('click',async()=>{if(!confirm('Delete your account from this browser?'))return;const users=loadUsers().filter(u=>u.username!==localStorage.getItem(SESSION_KEY));saveUsers(users);logout();});
// Teacher moderation delete (event delegation)
document.addEventListener('click',e=>{const del=e.target.closest('[data-delete-note]');if(del){if(!confirm('Remove this note for everyone?'))return;const id=del.dataset.deleteNote;const n=notes.find(x=>x.id===id);notes=notes.filter(x=>x.id!==id);deleteShared(n);saveUploads();render();renderTeacher();toast('Note removed 🛠');}});
renderFilters();render();
// ===== ASK PINE AI — smart assistant: offline brain + optional real cloud AI =====
const AI_KNOWLEDGE={
 'quadratic':'Quadratic: ax²+bx+c=0. Discriminant D=b²-4ac. D>0 two real roots, D=0 one repeated, D<0 none. Roots x=(-b±√D)/2a. Example x²-5x+6=0 → (x-2)(x-3)=0 → x=2 or 3.',
 'osi':'OSI 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. TCP/IP is 4 layers. IP moves packets, TCP makes delivery reliable, DNS translates names to IPs.',
 'tcp':'TCP = reliable, ordered delivery. UDP = fast, no guarantee. IP just moves packets. DNS = phonebook of the internet.',
 'photosynthesis':'Photosynthesis: plants use sunlight + water + CO₂ → glucose + oxygen, in chloroplasts (chlorophyll). 6CO₂+6H₂O+light → C₆H₁₂O₆+6O₂.',
 'respiration':'Respiration releases energy from glucose using oxygen in mitochondria: glucose+oxygen → CO₂+water+energy.',
 'newton':'Newton: 1) Inertia, 2) F=ma, 3) Action = opposite reaction. F=ma means force = mass × acceleration.',
 'cell':'Cell = smallest living unit. Nucleus controls + DNA, mitochondria = energy, chloroplast = photosynthesis (plants), membrane controls entry/exit, cytoplasm = reactions.',
 'dna':'DNA stores genetic instructions. Genes are sections of DNA. DNA is in the nucleus (and mitochondria).',
 'ph':'pH<7 acid, =7 neutral, >7 alkaline. Indicators change colour. Acids taste sour, turn blue litmus red (handle safely!).',
 'ohm':'Ohm\'s Law: V = I × R. Voltage = Current × Resistance. Power P = V × I. Example: 12V, 2Ω → I=6A.',
 'voltage':'Voltage = electrical pressure, measured in volts (V). Current = flow, amps (A). Resistance = opposition, ohms (Ω).',
 'sdlc':'SDLC: Requirements → Design → Code → Test → Deploy → Maintain. Good software is planned, tested and documented.',
 'variable':'Variable = named storage for a value. In programming: let x = 5. Types: number, string, boolean.',
 'loop':'Loop repeats actions. for = known times, while = until condition false. Example: for(i=0;i<5;i++) runs 5 times.',
 'oop':'OOP: objects + classes. Encapsulation (hide data), Inheritance (reuse), Polymorphism (same name, different behavior), Abstraction (show only needed).',
 'cpu':'CPU fetches, decodes, executes instructions. It has control unit, ALU, registers, cache. RAM is fast short-term memory, storage is long-term.',
 'ram':'RAM = volatile memory, loses data when off. Storage (SSD/HDD) keeps data. CPU + RAM + storage work together.',
 'accounting':'Accounting: Assets = Liabilities + Equity. Debit increases assets/expenses, credit increases liabilities/income. Balance sheet = snapshot, income statement = performance.',
 'balance':'Balance sheet shows what you own (assets), owe (liabilities) and equity at one moment. It must balance.',
 'multimedia':'Multimedia: pre-production (script, storyboard), production (record), post-production (edit, sound, export, review).',
 'tourism':'Tourism & Hospitality: welcoming guests, communication, safety, service quality, cultural respect, managing hotels/travel/events.',
 'food':'Food & Beverage: hygiene, temperature control, storage, cooking, presentation, service and customer care. Safety first!',
 'building':'Building & Construction: foundations, load, structure, materials (concrete, steel, timber), drainage, plumbing, electrical, building codes and safety.',
 'concrete':'Concrete = cement + sand + gravel + water. Strong in compression. Steel is strong in tension. Together reinforced concrete is very strong.',
 'electronics':'Electronics: circuits control current. Components: resistors, capacitors, transistors, diodes, LEDs, sensors, microcontroller (ESP32). Always check voltage/current ratings.',
 'esp32':'ESP32 is a microcontroller with Wi-Fi/Bluetooth, good for IoT, sensors, RTC, control. It needs 3.3V logic, usually 5V USB in, with regulators and protection — never feed mains directly.',
 'internet':'Internet = network of networks using TCP/IP. Web uses HTTP/HTTPS, DNS finds addresses, browsers render HTML/CSS/JS.',
 'algorithm':'Algorithm = step-by-step instructions to solve a problem. Good algorithms are correct, efficient and clear. Example: binary search.',
 'binary':'Binary is base-2 (0/1). 1010 = 8+2 = 10 decimal. Computers store everything as bits.',
 'french':'French basics: Bonjour=hello, Merci=thank you, Oui=yes, Non=no, S\'il vous plaît=please, Au revoir=goodbye. Rwanda: Muraho=hello, Murakoze=thank you.',
 'english':'English tip: read the question slowly, find keywords, answer in full sentences, check spelling. Practice by summarizing notes in your own words.'
};
let aiMemory={lastTopic:'',lastNote:null,history:[]};
function aiStopWords(){return new Set(['what','is','the','a','an','how','why','when','where','in','of','for','to','and','or','do','does','can','you','me','please','tell','about','explain','summarize','summarise','quiz','study','plan','give','show','find']);}
function aiKeywords(q){return q.toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(w=>w.length>2&&!aiStopWords().has(w));}
function aiSentences(text){return String(text||'').replace(/\n+/g,' ').split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(s=>s.length>12);}
function aiIntent(q){
  const l=q.toLowerCase();
  if(/summar|tl;dr|shorten|tldr/.test(l))return 'summarize';
  if(/quiz|test me|exam|flashcard/.test(l))return 'quiz';
  if(/solve|calculate|compute|=|x\^2|quadratic|ohm|f\s*=|v\s*=|percentage|%/.test(l)&&/\d/.test(l))return 'math';
  if(/study plan|revise|revision|timetable|how.*study/.test(l))return 'plan';
  if(/explain|what is|what are|define|meaning|why|how does|how do/.test(l))return 'explain';
  if(/^(hi|hello|hey|muraho|bonjour|good)/.test(l))return 'greet';
  if(/thank/.test(l))return 'thanks';
  if(/help|what can you/.test(l))return 'help';
  if(/example/.test(l))return 'example';
  if(/more|continue|again/.test(l))return 'more';
  return 'answer';
}
function aiMathSolve(q){
  const nums=q.match(/-?\d+\.?\d*/g)?.map(Number)||[];
  if(/x\^2|x²|quadratic|ax/.test(q.toLowerCase())&&nums.length>=3){const [a,b,c]=nums;const D=b*b-4*a*c;if(D<0)return `🔢 For ${a}x²+${b}x+${c}=0, D=${D} <0, so no real roots.`;const r1=(-b+Math.sqrt(D))/(2*a),r2=(-b-Math.sqrt(D))/(2*a);return `🔢 Solving ${a}x²+${b}x+${c}=0:\nD = ${b}²-4×${a}×${c} = ${D}\nRoots: x = ${r1.toFixed(2)} and x = ${r2.toFixed(2)}`;}
  if(/ohm|v\s*=|voltage/.test(q.toLowerCase())&&nums.length>=2){const [v,r]=nums;return `🔢 Ohm's Law V=I×R: I = V/R = ${v}/${r} = ${(v/r).toFixed(2)} A`;}
  if(/f\s*=|force|newton/.test(q.toLowerCase())&&nums.length>=2){const [m,a]=nums;return `🔢 F=m×a = ${m}×${a} = ${m*a} N`;}
  if(/%|percent/.test(q.toLowerCase())&&nums.length>=2){const [p,total]=nums;return `🔢 ${p}% of ${total} = ${(p/100*total).toFixed(2)}`;}
  if(nums.length>=2&&/\+|add|sum/.test(q))return `🔢 ${nums.join(' + ')} = ${nums.reduce((a,b)=>a+b,0)}`;
  if(nums.length>=2&&/×|\*|multiply|times/.test(q))return `🔢 ${nums.join(' × ')} = ${nums.reduce((a,b)=>a*b,1)}`;
  return `🔢 I can solve: quadratic (e.g. solve x^2-5x+6=0), Ohm's law (give V and R), F=ma (give mass and acceleration), percentages. Try: "solve x^2-5x+6=0"`;
}
function aiSummarizeNote(n){
  if(!n)return 'Pick a note from the list above first 📝';
  aiMemory.lastNote=n;aiMemory.lastTopic=n.title;
  const text=(n.content||n.description||'');const sents=aiSentences(text);
  if(!sents.length)return `📝 ${n.title} (${n.subject})\n${n.description||'No detailed content yet.'}\n\nTip: publish a note with more content and I can summarize it better.`;
  const freq={};text.toLowerCase().split(/\W+/).forEach(w=>{if(w.length>3)freq[w]=(freq[w]||0)+1;});
  const scored=sents.map(s=>({s,score:s.toLowerCase().split(/\W+/).reduce((a,w)=>a+(freq[w]||0),0)})).sort((a,b)=>b.score-a.score).slice(0,3);
  const top=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([w])=>w).join(', ');
  return `📝 Summary: ${n.title} (${n.subject})\n\n${scored.map(x=>'• '+x.s).join('\n')}\n\n🔑 Key ideas: ${top}\n\nWant more? Say “more”, “quiz me”, or “explain ${n.title}”.`;
}
function aiSearchAnswer(q){
  const keys=aiKeywords(q);let best=null,bestScore=0;
  notes.forEach(n=>{const hay=(n.title+' '+n.subject+' '+n.description+' '+(n.content||'')+' '+(n.tags||'')).toLowerCase();const score=keys.reduce((a,k)=>a+(hay.includes(k)?2:0),0);if(score>bestScore){bestScore=score;best=n;}});
  for(const k in AI_KNOWLEDGE){if(keys.some(w=>k.includes(w)||w.includes(k)||k.split('').join(' ').includes(w))){aiMemory.lastTopic=k;return `💡 ${AI_KNOWLEDGE[k]}\n\n📚 Related PineNotes note: ${best?best.title+' — '+best.description:'(try searching the library)'}\n\nAsk “more” for an example, or “quiz me” to test yourself on this.`;}}
  if(best&&bestScore>0){
    aiMemory.lastNote=best;aiMemory.lastTopic=best.title;
    const sents=aiSentences(best.content||best.description);
    const rel=sents.filter(s=>keys.some(k=>s.toLowerCase().includes(k))).slice(0,3);
    return `Here's what I found in ${best.title} (${best.subject}):\n\n${(rel.length?rel:[best.description]).map(s=>'• '+s).join('\n')}\n\n💡 In simple words: ${best.description}\n\nWant the full note? Search “${best.title}” and tap Preview. Or say “summarize” for a short version.`;
  }
  return `Hmm, I understood you asked about “${q}”, but I couldn't find it in PineNotes notes yet.\n\nTry:\n• “explain quadratic” / “what is OSI?”\n• “solve x^2-5x+6=0”\n• Publish a note on this topic — then I can summarize and quiz you on it!\n\nOr connect Real AI in ⚙️ for open-ended questions.`;
}
function aiQuiz(){
  const n=notes.find(x=>x.id===$('#aiNoteSelect').value)||aiMemory.lastNote||notes[0];if(!n)return 'No notes yet — publish one first!';
  aiMemory.lastNote=n;const sents=aiSentences(n.content||n.description);const s=sents[Math.floor(Math.random()*sents.length)]||n.description;
  const words=s.split(/\W+/).filter(w=>w.length>5);const answer=words[Math.floor(Math.random()*words.length)]||'—';const blank=s.replace(answer,'______');
  return `🧠 Quiz from “${n.title}”:\n\nFill the blank:\n“${blank}”\n\nThink first, then type: answer: ${answer} — no, type YOUR guess! e.g. answer: energy\nI'll check you next.`;
}
function aiOfflineReply(raw){
  const q=raw.trim(),low=q.toLowerCase(),intent=aiIntent(q);
  if(intent==='greet')return `Hi there! 👋 I'm Pine AI — I understand what you ask and try to help like a study friend.\n\nI can summarize, explain, solve maths, quiz you, and make study plans — all from PineNotes + my built-in knowledge.\n\nTry: “summarize”, “what is OSI?”, “solve x^2-5x+6=0”, “quiz me”`;
  if(intent==='summarize')return aiSummarizeNote(notes.find(n=>n.id===$('#aiNoteSelect').value)||aiMemory.lastNote||notes[0]);
  if(intent==='quiz')return aiQuiz();
  if(intent==='math')return aiMathSolve(q);
  if(intent==='plan')return `🗓️ Your study plan (simple, works):\nDay 1: Pick 2 notes → summarize each with me\nDay 2: Quiz me, star ⭐ the hard ones\nDay 3: Teach it back in your own words + download backup\n\n25 min focus / 5 min break. Want a plan for a specific subject? Say “study plan for Networking”.`;
  if(intent==='thanks')return 'You are so welcome! 🌲 Keep going — ask me anything else.';
  if(intent==='help')return `Here's how to talk to me:\n• “summarize” — short version of a note\n• “explain OSI” / “what is photosynthesis?”\n• “solve x^2-5x+6=0” / “calculate 20% of 500”\n• “quiz me” — test yourself\n• “study plan” — make a plan\n• Follow-ups: “more”, “give example”, “explain more”\n\nI remember our last topic, so you can just say “more” or “example”.`;
  if(intent==='more'&&aiMemory.lastTopic){return `More on “${aiMemory.lastTopic}”:\n${AI_KNOWLEDGE[aiMemory.lastTopic]||(aiMemory.lastNote?aiMemory.lastNote.description:'')}\n\nExample: ${aiMemory.lastNote?aiMemory.lastNote.title:'—'} — try summarizing it for a worked example.`;}
  if(intent==='example'){const n=aiMemory.lastNote||notes[0];return `Example from “${n?n.title:''}”:\n${n?(n.content||n.description).slice(0,300):'Pick a note first.'}\n\nWant a quiz on this example? Say “quiz me”.`;}
  if(low.startsWith('answer:'))return `You answered: “${low.slice(7).trim()}”. Good try! Check the quiz sentence above — if your word fits the blank, you're correct ✅. Say “quiz me” for another one.`;
  return aiSearchAnswer(q);
}
// Real cloud AI (optional)
function aiGetKey(){try{return JSON.parse(localStorage.getItem('pinenotes_ai_key')||'{}');}catch(e){return {};}}
async function aiRealReply(q){
  const {provider,key}=aiGetKey();if(!key)return null;
  const sys='You are Pine AI, a friendly study helper for students. Answer clearly, simply, with examples. Use PineNotes context if helpful. Keep answers concise but complete.';
  try{
    if(provider==='gemini'){
      const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:sys+'\n\nStudent: '+q}]}]})});
      const j=await r.json();if(!r.ok)throw new Error(j.error?.message||'Gemini error');return j.candidates?.[0]?.content?.parts?.[0]?.text||'No answer from Gemini.';
    }else{
      const base=provider==='groq'?'https://api.groq.com/openai/v1/chat/completions':'https://api.openai.com/v1/chat/completions';
      const model=provider==='groq'?'llama-3.1-8b-instant':'gpt-4o-mini';
      const r=await fetch(base,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+key},body:JSON.stringify({model,messages:[{role:'system',content:sys},{role:'user',content:q}],temperature:0.4})});
      const j=await r.json();if(!r.ok)throw new Error(j.error?.message||'AI error');return j.choices?.[0]?.message?.content||'No answer.';
    }
  }catch(e){return `⚠️ Real AI couldn't connect (${e.message}). I've switched to Offline Pine AI:\n\n${aiOfflineReply(q)}`;}
}
function aiAddMsg(text,who){const box=$('#aiMessages');const d=document.createElement('div');d.className='ai-msg '+who;d.textContent=text;box.appendChild(d);box.scrollTop=box.scrollHeight;return d;}
async function aiAsk(text){
  if(!text.trim())return;aiAddMsg(text,'user');aiMemory.history.push(text);
  const typing=aiAddMsg(aiGetKey().key?'Pine AI (real) is thinking…':'Pine AI is thinking…','bot');typing.classList.add('ai-typing');
  const real=await aiRealReply(text);
  typing.textContent=real||aiOfflineReply(text);typing.classList.remove('ai-typing');$('#aiMessages').scrollTop=$('#aiMessages').scrollHeight;
}
function refreshAiNotes(){$('#aiNoteSelect').innerHTML=notes.map(n=>`<option value="${n.id}">${esc(n.title)} — ${esc(n.subject)}</option>`).join('');}
function aiUpdateStatus(){const {provider,key}=aiGetKey();const on=!!key;$('#aiSub').textContent=on?`Real AI connected (${provider})`:'Smart helper · Offline mode';$('#aiNoteText').textContent=on?'Real AI is ON — answers come from the cloud. Your key stays in this browser.':'Offline mode: answers from PineNotes + built-in knowledge. Add a free API key in ⚙️ for a real cloud AI.';$('#aiKeyStatus').textContent=on?`Status: Real AI (${provider}) connected ✅`:'Status: Offline Pine AI';if(on)$('#aiApiKey').value=key;}
$('#aiBtn').addEventListener('click',()=>{const p=$('#aiPanel');p.hidden=!p.hidden;if(!p.hidden){refreshAiNotes();aiUpdateStatus();if(!$('#aiMessages').children.length)aiAddMsg('Hi! 👋 I\'m Pine AI. I understand what you ask — try “summarize”, “what is OSI?”, “solve x^2-5x+6=0”, or “quiz me”.','bot');$('#aiInput').focus();}});
$('#aiClose').addEventListener('click',()=>{$('#aiPanel').hidden=true;});
$('#aiSettingsBtn').addEventListener('click',()=>{$('#aiSettings').hidden=!$('#aiSettings').hidden;});
$('#aiSaveKey').addEventListener('click',()=>{const key=$('#aiApiKey').value.trim();if(!key){toast('Paste your API key first');return;}localStorage.setItem('pinenotes_ai_key',JSON.stringify({provider:$('#aiProvider').value,key}));aiUpdateStatus();aiAddMsg('✅ Real AI connected! Now ask me anything — I\'ll answer with the cloud AI. Try “explain photosynthesis in simple words”.','bot');});
$('#aiClearKey').addEventListener('click',()=>{localStorage.removeItem('pinenotes_ai_key');$('#aiApiKey').value='';aiUpdateStatus();aiAddMsg('Back to Offline Pine AI 🌲 — still smart, no internet needed.','bot');});
$('#aiForm').addEventListener('submit',e=>{e.preventDefault();aiAsk($('#aiInput').value);$('#aiInput').value='';});
document.querySelectorAll('[data-ai]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.ai;if(k==='summarize')aiAsk('summarize');else if(k==='quiz')aiAsk('quiz me');else if(k==='plan')aiAsk('study plan');else if(k==='help')aiAsk('help');else if(k==='explain')aiAsk('explain the selected note');else if(k==='math')aiAsk('solve x^2-5x+6=0');}));
$('#previewAI').addEventListener('click',()=>{if(previewId)$('#aiNoteSelect').value=previewId;closeModals();$('#aiPanel').hidden=false;refreshAiNotes();if(previewId)$('#aiNoteSelect').value=previewId;aiAsk('summarize');});
updateHeader();afterLogin();fetchSharedNotes();
