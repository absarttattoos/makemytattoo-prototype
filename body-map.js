(function(root){
 'use strict';
 const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function parts(view){
  const front=view!=='back';
  const left=front?'Right':'Left',right=front?'Left':'Right';
  const forearm=front?'inner forearm':'outer forearm';
  return [
   [front?'Head / face':'Back of head','<ellipse cx="110" cy="34" rx="21" ry="27"/>'],
   [front?'Neck':'Back of neck','<path d="M100 60 L120 60 L121 81 L99 81 Z"/>'],
   [left+' shoulder','<path d="M99 80 L85 81 Q68 81 60 107 L79 115 L89 94 L99 91 Z"/>'],
   [right+' shoulder','<path d="M121 80 L135 81 Q152 81 160 107 L141 115 L131 94 L121 91 Z"/>'],
   [front?'Chest':'Upper back','<path d="M99 81 L121 81 L134 94 L139 137 L81 137 L86 94 Z"/>'],
   [front?'Stomach':'Lower back','<path d="M81 137 L139 137 L132 192 L88 192 Z"/>'],
   [front?'Hip / waist':'Hip / glute','<path d="M88 192 L132 192 L137 234 L111 243 L109 243 L83 234 Z"/>'],
   [left+' upper arm','<path d="M60 108 L79 116 L69 170 L46 163 Z"/>'],
   [right+' upper arm','<path d="M160 108 L141 116 L151 170 L174 163 Z"/>'],
   [left+' '+forearm,'<path d="M46 165 L69 172 L59 223 L38 218 Z"/>'],
   [right+' '+forearm,'<path d="M174 165 L151 172 L161 223 L182 218 Z"/>'],
   [left+' wrist','<path d="M38 220 L59 225 L55 242 L33 236 Z"/>'],
   [right+' wrist','<path d="M182 220 L161 225 L165 242 L187 236 Z"/>'],
   [left+' hand / fingers','<path d="M33 238 L55 244 L50 271 Q47 283 39 278 L30 263 L25 249 Z"/>'],
   [right+' hand / fingers','<path d="M187 238 L165 244 L170 271 Q173 283 181 278 L190 263 L195 249 Z"/>'],
   [left+' thigh','<path d="M83 236 L108 245 L103 322 L76 322 Z"/>'],
   [right+' thigh','<path d="M137 236 L112 245 L117 322 L144 322 Z"/>'],
   [left+(front?' knee':' back of knee'),'<path d="M76 324 L103 324 L102 343 L76 343 Z"/>'],
   [right+(front?' knee':' back of knee'),'<path d="M144 324 L117 324 L118 343 L144 343 Z"/>'],
   [left+(front?' shin':' calf'),'<path d="M76 345 L102 345 L97 416 L77 416 Z"/>'],
   [right+(front?' shin':' calf'),'<path d="M144 345 L118 345 L123 416 L143 416 Z"/>'],
   [left+' ankle','<path d="M77 418 L97 418 L97 439 L76 439 Z"/>'],
   [right+' ankle','<path d="M143 418 L123 418 L123 439 L144 439 Z"/>'],
   [left+' foot','<path d="M76 441 L97 441 L102 456 Q95 463 77 461 L64 455 L65 449 Z"/>'],
   [right+' foot','<path d="M144 441 L123 441 L118 456 Q125 463 143 461 L156 455 L155 449 Z"/>']
  ];
 }
 const allParts=()=>[...new Set([...parts('front'),...parts('back')].map(x=>x[0]))];
 function render(placement,view='front'){
  const list=parts(view),selected=placement||'Not sure yet';
  return `<div class="field placement-field"><div class="label">Placement</div><p class="help">Tap a body part. Switch views to choose the front or back.</p><div class="body-picker"><div class="body-view-switch" role="group" aria-label="Body view">${['front','back'].map(v=>`<button type="button" class="chip" data-action="body-view" data-value="${v}" aria-pressed="${view===v}">${v==='front'?'Front':'Back'}</button>`).join('')}</div><svg class="body-map" viewBox="0 0 220 475" role="group" aria-labelledby="body-map-title body-map-description"><title id="body-map-title">${view==='front'?'Front':'Back'} tattoo placement figure</title><desc id="body-map-description">Choose a body region by clicking or tapping. Keyboard users can tab between regions and press Enter or Space. Left and right refer to your own body.</desc>${list.map(([name,shape])=>`<g role="button" tabindex="0" class="body-region" data-action="placement" data-value="${esc(name)}" aria-label="${esc(name)}" aria-pressed="${selected===name}"><title>${esc(name)}</title>${shape}</g>`).join('')}</svg><div class="placement-selection" aria-live="polite"><span class="small">Selected placement</span><strong data-placement-label>${esc(selected)}</strong></div></div><div class="chips placement-extras" role="group" aria-label="Other placement choices">${['Not sure yet','Other placement'].map(v=>`<button type="button" class="chip" data-action="placement" data-value="${v}" aria-pressed="${selected===v}">${v}</button>`).join('')}</div><input type="hidden" name="placement" value="${esc(selected)}"><details class="placement-list"><summary>Prefer to choose from a list?</summary><label class="label" for="placement-list">Choose a body part</label><select id="placement-list" data-placement-select><option value="Not sure yet">Not sure yet</option>${allParts().map(name=>`<option ${selected===name?'selected':''}>${esc(name)}</option>`).join('')}<option ${selected==='Other placement'?'selected':''}>Other placement</option></select></details></div>`;
 }
 root.TattooBodyMap={parts,allParts,render};
})(typeof window!=='undefined'?window:globalThis);
