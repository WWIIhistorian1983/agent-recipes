fetch('recipes.json').then(r=>r.json()).then(D=>{const $=i=>document.getElementById(i),g=$('grid');
[...new Set(D.map(r=>r.use_case))].sort().forEach(u=>$('uc').add(new Option(u,u)));
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function draw(){const q=$('q').value.toLowerCase().trim(),u=$('uc').value,c=$('cost').value,d=$('diff').value;
const L=D.filter(r=>(!u||r.use_case==u)&&(!c||r.cost==c)&&(!d||r.difficulty==d)&&(!q||(r.title+' '+r.problem+' '+r.use_case+' '+r.tools.map(t=>t.name).join(' ')).toLowerCase().includes(q)));
g.innerHTML=L.map(r=>`<a class="card" href="recipes/${r.slug}.html"><span class="b">${r.use_case}</span><h3>${esc(r.title)}</h3><p>${esc(r.problem)}</p><small>${r.tools.map(t=>esc(t.name)).join(' · ')} · ${r.cost} · ${r.difficulty}</small></a>`).join('')||'<p>No recipes match.</p>';
$('count').textContent=L.length+' of '+D.length+' recipes';}
['q','uc','cost','diff'].forEach(i=>$(i).addEventListener('input',draw));draw();});
