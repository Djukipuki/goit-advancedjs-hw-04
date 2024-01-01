import{a as p,i as c,S as y}from"./assets/vendor-56025df1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();const w="41564492-608cbec99b2782b0c7c759bf5",b="https://pixabay.com/api/",L=p.create({baseURL:b}),d=(s,o)=>{const r=new URLSearchParams({key:w,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:o,q:s});return L.get(`?${r}`)};c.settings({position:"topRight",transitionIn:"flipInX",transitionOut:"flipOutX",maxWidth:"250px"});const v=document.getElementById("search-form"),l=document.querySelector(".gallery"),t={page:1,searchParams:"",isLoading:!1,totalItems:0,showItems:0,nextPage(){return++this.page},resetState(){this.page=1,this.searchParams="",this.totalItems=0,this.showItems=0,l.textContent=""},updateSearchParams(s){this.searchParams=s},startLoading(){this.isLoading=!0},finishLoading(){this.isLoading=!1},addShowItems(s){this.showItems+=s},canShowNextPage(){return this.totalItems>this.showItems}},I=new y(".photo_link"),h=s=>{c.error({message:s.message})},m=s=>{const o=s.map(({webformatURL:r,largeImageURL:n,tags:e,likes:a,views:i,comments:f,downloads:u})=>`
    <div class="photo-card">
      <a class="photo_link" href="${n}">
        <img class="photo" src="${r}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          <p>${a}</p>
        </div>
        <div class="info-item">
          <b>Views</b>
           <p>${i}</p>
        </div>
        <div class="info-item">
          <b>Comments</b>
          <p>${f}</p>
        </div>
        <div class="info-item">
          <b>Downloads</b>
          <p>${u}</p>
        </div>
      </div>
    </div>
  `).join("");t.addShowItems(s.length),l.insertAdjacentHTML("beforeend",o),I.refresh()},P=async s=>{s.preventDefault(),t.resetState(),t.updateSearchParams(s.target.elements.searchQuery.value),t.startLoading();try{const r=(await d(t.searchParams,t.page)).data;t.totalItems=r.totalHits,t.totalItems?c.success({message:`Hooray! We found ${t.totalItems} images.`}):c.warning({message:"Sorry, there are no images matching your search query. Please try again."}),m(r.hits),t.finishLoading(),window.addEventListener("scroll",g)}catch(o){h(o)}},g=async()=>{if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight&&!t.isLoading){if(!t.canShowNextPage()){window.removeEventListener("scroll",g),l.insertAdjacentHTML("beforeend","<p>We're sorry, but you've reached the end of search results.</p>");return}t.startLoading();try{const o=await d(t.searchParams,t.nextPage());m(o.data.hits),t.finishLoading();const{height:r}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*1.5,behavior:"smooth"})}catch(o){h(o)}}};v.addEventListener("submit",P);
//# sourceMappingURL=commonHelpers.js.map
