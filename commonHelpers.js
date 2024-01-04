import{a as w,i as c,S as L}from"./assets/vendor-56025df1.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const b="41564492-608cbec99b2782b0c7c759bf5",v="https://pixabay.com/api/",I=w.create({baseURL:v}),h=(s,a)=>{const r=new URLSearchParams({key:b,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:a,q:s});return I.get(`?${r}`)};c.settings({position:"topRight",transitionIn:"flipInX",transitionOut:"flipOutX",maxWidth:"250px"});const m=document.getElementById("search-form"),l=document.querySelector(".gallery"),d=document.querySelector(".loader"),t={page:1,searchParams:"",isLoading:!1,totalItems:0,showItems:0,nextPage(){return++this.page},resetState(){this.page=1,this.searchParams="",this.totalItems=0,this.showItems=0,l.textContent=""},updateSearchParams(s){this.searchParams=s},startLoading(){d.classList.remove("visually-hidden"),this.isLoading=!0},finishLoading(){d.classList.add("visually-hidden"),this.isLoading=!1},addShowItems(s){this.showItems+=s},canShowNextPage(){return this.totalItems>this.showItems}},P=new L(".photo_link"),g=s=>{t.finishLoading(),c.error({message:s.message})},u=s=>{const a=s.map(({webformatURL:r,largeImageURL:i,tags:e,likes:o,views:n,comments:p,downloads:y})=>`
    <div class="photo-card">
      <a class="photo_link" href="${i}">
        <img class="photo" src="${r}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <p>${o}</p>
        </div>
        <div class="info-item">
          <b>Views</b>
           <p>${n}</p>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <p>${p}</p>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <p>${y}</p>
        </div>
      </div>
    </div>
  `).join("");t.addShowItems(s.length),l.insertAdjacentHTML("beforeend",a),P.refresh()},S=async s=>{s.preventDefault(),t.resetState();const a=s.target.elements.searchQuery.value.trim();if(!a){m.reset(),c.warning({message:"Text is required for search images"});return}t.updateSearchParams(a),t.startLoading();try{const i=(await h(t.searchParams,t.page)).data;t.totalItems=i.totalHits,t.totalItems?c.success({message:`Hooray! We found ${t.totalItems} images.`}):c.warning({message:"Sorry, there are no images matching your search query. Please try again."}),u(i.hits),t.finishLoading(),window.addEventListener("scroll",f)}catch(r){g(r)}},f=async()=>{if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight&&!t.isLoading){if(!t.canShowNextPage()){window.removeEventListener("scroll",f),l.insertAdjacentHTML("beforeend","<p>We're sorry, but you've reached the end of search results.</p>");return}t.startLoading();try{const a=await h(t.searchParams,t.nextPage());u(a.data.hits),t.finishLoading();const{height:r}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*1.5,behavior:"smooth"})}catch(a){g(a)}}};m.addEventListener("submit",S);
//# sourceMappingURL=commonHelpers.js.map
