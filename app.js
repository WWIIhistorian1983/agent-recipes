fetch('recipes.json').then(r=>r.json()).then(D=>{const $=i=>document.getElementById(i),g=$('grid'),C=window.CAT||{},T=window.TASKS||{};
Object.keys(C).forEach(u=>$('uc').add(new Option(C[u][0],u)));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const chip=u=>{const c=C[u]||[u,'#4f46e5',''];return `<span class="b chip" style="--c:${c[1]}">${c[2]} ${esc(c[0])}</span>`};
function draw(){const q=$('q').value.toLowerCase().trim(),u=$('uc').value,c=$('cost').value,d=$('diff').value;
document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.uc===u));
const w=$('whatcan');if(u&&T[u]){w.hidden=false;w.style.setProperty('--c',C[u][1]);w.innerHTML=`<h2>${C[u][2]} What you can do in ${esc(C[u][0])}</h2><ul class="tasks">${T[u].map(([t,h])=>`<li><a href="${h}">${esc(t)}</a></li>`).join('')}</ul>`}else w.hidden=true;
const L=D.filter(r=>(!u||r.use_case==u)&&(!c||r.cost==c)&&(!d||r.difficulty==d)&&(!q||(r.title+' '+r.problem+' '+r.use_case+' '+r.tools.map(t=>t.name).join(' ')).toLowerCase().includes(q)));
g.innerHTML=L.map(r=>`<a class="card" style="--c:${(C[r.use_case]||[0,'#4f46e5'])[1]}" href="recipes/${r.slug}.html">${chip(r.use_case)}<h3>${esc(r.title)}</h3><p>${esc(r.problem)}</p><small>${r.tools.map(t=>esc(t.name)).join(' · ')} · ${r.cost} · ${r.difficulty}</small></a>`).join('')||'<p>No recipes match.</p>';
$('count').textContent=L.length+' of '+D.length+' recipes';}
const set=u=>{$('uc').value=u;draw();};
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>set(b.dataset.uc));
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{set(b.dataset.go);$('tabs').scrollIntoView({behavior:'smooth'})});
['q','uc','cost','diff'].forEach(i=>$(i).addEventListener('input',draw));
const h=location.hash.match(/^#uc-(.+)/);if(h&&C[h[1]])$('uc').value=h[1];draw();});
