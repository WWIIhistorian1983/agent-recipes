(function(){
var KEY='rw_nl',TH='/thanks.html';
function done(){try{localStorage.setItem(KEY,'subscribed')}catch(e){}}
function track(src){try{window.goatcounter&&window.goatcounter.count&&window.goatcounter.count({path:'newsletter-signup-'+src,title:'Newsletter signup ('+src+')',event:true})}catch(e){}}
document.addEventListener('submit',function(ev){
  var f=ev.target;if(!f.classList||!f.classList.contains('nlform'))return;
  if(!window.fetch||!window.FormData)return; // plain POST fallback
  ev.preventDefault();var b=f.querySelector('button');if(b){b.disabled=true;b.textContent='Sending…'}
  track(f.getAttribute('data-src')||'form');done();
  fetch(f.action,{method:'POST',mode:'no-cors',body:new FormData(f)}).catch(function(){}).then(function(){setTimeout(function(){location.href=TH},300)});
});
var st=null;try{st=localStorage.getItem(KEY)}catch(e){}
if(st||location.pathname.indexOf('thanks')>-1||location.pathname.indexOf('starter-pack')>-1)return;
var shown=false;
function frac(){var d=document.documentElement;var h=d.scrollHeight-d.clientHeight;return h>0?(window.scrollY||d.scrollTop)/h:0}
function show(){
  if(shown)return;shown=true;window.removeEventListener('scroll',onS);
  try{localStorage.setItem(KEY,'seen')}catch(e){}
  var a=document.createElement('aside');a.className='nlslide';a.setAttribute('role','dialog');a.setAttribute('aria-label','Newsletter signup');
  a.innerHTML='<button class="nlx" aria-label="Close">×</button><p class="kicker">🦁 Free Starter Pack</p><p class="nlh">One ready-to-use AI workflow every week, in 5 minutes.</p><form class="nlform" action="https://buttondown.com/api/emails/embed-subscribe/roarworkflows" method="post" data-src="slidein"><label class="sr" for="nl-slide">Email address</label><input id="nl-slide" type="email" name="email" required autocomplete="email" placeholder="you@example.com"><input type="hidden" name="embed" value="1"><input type="hidden" name="tag" value="src-slidein"><button class="btn nlbtn">Send it to me</button></form><button class="nlno">No thanks</button>';
  document.body.appendChild(a);requestAnimationFrame(function(){a.classList.add('in')});
  function close(){a.classList.remove('in');setTimeout(function(){a.remove()},300);document.removeEventListener('keydown',esc)}
  function esc(e){if(e.key==='Escape')close()}
  a.querySelector('.nlx').onclick=close;a.querySelector('.nlno').onclick=close;document.addEventListener('keydown',esc);
}
function onS(){if(frac()>=0.6)show()}
window.addEventListener('scroll',onS,{passive:true});
})();
