(function(){
  'use strict';
  const menuBtn=document.getElementById('menuBtn');
  const nav=document.getElementById('siteNav');
  if(menuBtn&&nav)menuBtn.addEventListener('click',function(){const opening=!nav.classList.contains('is-open');nav.classList.toggle('is-open',opening);menuBtn.setAttribute('aria-expanded',String(opening));menuBtn.setAttribute('aria-label',opening?'Close menu':'Open menu');});
  if(menuBtn&&nav)nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Open menu');}));
  const cards=Array.from(document.querySelectorAll('.lesson'));
  const filters=Array.from(document.querySelectorAll('.filter-button'));
  const search=document.getElementById('exampleSearch');
  const result=document.getElementById('resultCount');
  const empty=document.getElementById('noResults');
  let active='All';
  function apply(){const term=search.value.trim().toLowerCase();let shown=0;for(const card of cards){const matchesGroup=active==='All'||card.dataset.group===active;const matchesTerm=!term||card.textContent.toLowerCase().includes(term);const visible=matchesGroup&&matchesTerm;card.hidden=!visible;if(visible)shown++;}result.textContent='Showing '+shown+' of '+cards.length+' examples';empty.hidden=shown!==0;}
  filters.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filter;filters.forEach(el=>el.setAttribute('aria-pressed',String(el===btn)));apply();}));
  search.addEventListener('input',apply);
  document.querySelectorAll('.copy-btn').forEach(btn=>btn.addEventListener('click',async function(){const code=this.closest('.code-panel').querySelector('code');const text=code.innerText;try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);this.textContent='Copied';}catch(e){const range=document.createRange();range.selectNodeContents(code);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);this.textContent='Select text';}this.setAttribute('aria-label',this.textContent);this.blur();}));
})();
