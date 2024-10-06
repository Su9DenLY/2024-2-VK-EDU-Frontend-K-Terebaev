(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const t of i.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function d(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=d(s);fetch(s.href,i)}})();function q(o,c,d){let l=[];const s=localStorage.getItem("username");o.appendChild(S()),o.appendChild(T()),o.appendChild(w()),document.querySelector("img").src=`${p}/cat.jpg`,document.querySelector(".header-recipient-info-username").innerText=`${d}`;const i=document.querySelector("form"),t=document.querySelector(".form-textarea"),b=document.querySelector(".section-messages"),M=document.querySelector(".section"),k=document.getElementById("delete-button"),$=document.getElementById("arrow_back");i.addEventListener("submit",f.bind(this)),i.addEventListener("keypress",N.bind(this)),window.addEventListener("beforeunload",I),t.addEventListener("input",L),a(),h(),k.addEventListener("click",()=>{let e=JSON.parse(localStorage.getItem("chats"))||[],n=e.findIndex(r=>r.id===c);l=[],e[n].messages=l,localStorage.setItem("chats",JSON.stringify(e)),h()}),$.addEventListener("click",()=>{I(),E(`${p}chat`)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&$.click()});function a(){l=JSON.parse(localStorage.getItem("chats")).find(n=>n.id===c).messages||[]}function I(){let e=JSON.parse(localStorage.getItem("chats"))||[],n=e.findIndex(r=>r.id===c);e[n].messages=l,localStorage.setItem("chats",JSON.stringify(e))}function B(e,n,r){l.push({username:e,text:n,time:r});const u=C(e,n,r);b.appendChild(u),setTimeout(()=>{M.scrollTop=M.scrollHeight},0)}function C(e,n,r){const u=document.createElement("div"),m=document.createElement("div"),O=document.createElement("div"),x=document.createElement("div"),H=document.createElement("span");return O.innerText=`${e}`,m.innerText=n,x.innerText=`${r}`,e===s?(u.classList.add("message-my-container"),m.classList.add("message-my-content"),x.classList.add("message-status"),O.classList.add("message-my-username"),H.classList.add("material-symbols-outlined"),H.style.fontSize="14px",H.innerText="check",x.appendChild(H)):(u.classList.add("message-other-container"),m.classList.add("message-other-content"),x.classList.add("message-status"),O.classList.add("message-other-username")),m.appendChild(x),u.appendChild(O),u.appendChild(m),u}function h(){b.innerHTML="",l.forEach(e=>{const{username:n,text:r,time:u}=e,m=C(n,r,u);b.appendChild(m)}),setTimeout(()=>{b.scrollTop=b.scrollHeight},0),t.dispatchEvent(new Event("input"))}function f(e){e.preventDefault();const n=t.value.trim();if(n){let r=new Date;B(s,n,`${r.getHours()}`.padStart(2,"0")+":"+`${r.getMinutes()}`.padStart(2,"0")),t.value=""}}function N(e){if(e.key==="Enter"){if(e.preventDefault(),e.shiftKey){const n=t.selectionStart;t.value=t.value.slice(0,n)+`
`+t.value.slice(n),t.selectionStart=t.selectionEnd=n+1}else i.dispatchEvent(new Event("submit"));t.dispatchEvent(new Event("input")),t.scrollTop=t.scrollHeight}}function L(){t.style.height="0px",t.style.height=t.scrollHeight+"px"}function S(){const e=document.createElement("header");return e.classList.add("header"),e.innerHTML=`
        <button class="button-white" id="arrow_back">
            <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <div class="header-recipient">
            <img class="header-recipient-avatar" alt="avatar"/>
            <div class="header-recipient-info">
                <span class="header-recipient-info-username"></span>
                <span class="header-recipient-info-online">была 2 часа назад</span>
            </div>
        </div>
        <div>
            <button class="button-white">
                <span class="material-symbols-outlined">search</span>
            </button>
            <button class="button-white">
                <span class="material-symbols-outlined" id="delete-button">delete</span>
            </button>
            <button class="button-white">
                <span class="material-symbols-outlined">more_vert</span>
            </button>
        </div>
    `,e}function T(){const e=document.createElement("section");return e.classList.add("section"),e.innerHTML='<section class="section-messages"></section>',e}function w(){const e=document.createElement("form");return e.classList.add("form"),e.innerHTML=`
        <form class="form">
            <button class="button-gray">
                <span class="material-symbols-outlined">attachment</span>
            </button>
            <textarea class="form-textarea" name="message-text" placeholder="Введите сообщение"></textarea>
            <button class="button-send">
                <span>Отправить</span>
            </button>
        </form>`,e}}function K(o,c){let d=JSON.parse(localStorage.getItem("users"))||[];const l=d.find(a=>a.id===c).chats,s=JSON.parse(localStorage.getItem("chats"))||[];o.appendChild(b()),o.appendChild(M()),o.appendChild($());const i=document.querySelector(".section-chats");document.getElementById(".button-add-chat"),document.getElementById("button-logout").addEventListener("click",()=>{localStorage.removeItem("username"),location.replace(`${p}`)}),s.forEach(a=>{l.includes(a.id)&&i.appendChild(k(a.id))});function b(){const a=document.createElement("header");return a.classList.add("header"),a.innerHTML=`
        <div>
            <button class="button-white">
                <span class="material-symbols-outlined">menu</span>
            </button>
            <button class="button-white" id="button-logout">
                <span class="material-symbols-outlined">logout</span>
            </button>
        </div>
        <span class="header-app-name">Messenger</span>
        <button class="button-white">
                <span class="material-symbols-outlined">search</span>
        </button>
        `,a}function M(){const a=document.createElement("section");return a.classList.add("section"),a.innerHTML='<div class="section-chats"></div>',a}function k(a){const I=s.find(m=>m.id===a),B=I.users.find(m=>m!==c),C=d.find(m=>m.id===B).username,h=I.messages.slice(-1)[0],f=document.createElement("div"),N=document.createElement("div"),L=document.createElement("div"),S=document.createElement("div"),T=document.createElement("span"),w=document.createElement("span"),e=document.createElement("div"),n=document.createElement("span"),r=document.createElement("span"),u=document.createElement("img");return f.classList.add("chat-container"),T.classList.add("chat-name"),e.classList.add("chat-last-message-meta"),n.classList.add("chat-last-message-time"),r.classList.add("chat-last-message-check"),r.classList.add("material-symbols-outlined"),L.classList.add("chat-info"),S.classList.add("chat-info-row"),w.classList.add("chat-last-message"),u.classList.add("chat-avatar"),f.id=a,u.src=`${p}/cat.jpg`,T.innerText=`${C}`,w.innerText=`${(h==null?void 0:h.text)||""}`,n.innerText=`${(h==null?void 0:h.time)||""}`,h&&h.username!==C&&(r.innerText="check"),N.appendChild(u),e.appendChild(r),e.appendChild(n),S.appendChild(T),S.appendChild(e),L.appendChild(S),L.appendChild(w),f.appendChild(N),f.appendChild(L),f.addEventListener("click",()=>{E(`${p}chat/${a}`)}),f}function $(){const a=document.createElement("button");return a.classList.add("button-add-chat"),a.innerHTML='<span class="material-symbols-outlined">draw</span>',a}}function D(o){let c;const d=JSON.parse(localStorage.getItem("users"))||[];o.classList.add("login-wrapper"),o.innerHTML=`
        <div class="login-form">
            <input type="text" id="login-input" placeholder="Enter your username">
            <button id="login-button">Login</button>
        </div>
    `,document.getElementById("login-button").addEventListener("click",()=>{var l;if(c=document.getElementById("login-input").value.trim(),c){if(!d.some(s=>s.username===c)){let s=((l=JSON.parse(localStorage.getItem("users")))==null?void 0:l.slice(-1)[0].id)+1||1;d.push({id:s,username:c,chats:[]}),localStorage.setItem("users",JSON.stringify(d))}localStorage.setItem("username",c),o.classList.remove("login-wrapper"),E(`${p}chat`)}})}const p="/2024-2-VK-EDU-Frontend-K-Terebaev/",J=document.querySelector(".wrapper");let y=localStorage.getItem("username"),g=JSON.parse(localStorage.getItem("users"))||[];const v=JSON.parse(localStorage.getItem("chats"))||[];g.length===0&&v.length===0&&(g.push({id:1,username:"Элизабет",chats:[1,3]}),g.push({id:2,username:"Дженнифер",chats:[1,2,4]}),g.push({id:3,username:"Иннокентий",chats:[4]}),g.push({id:4,username:"Евлампий",chats:[2,3]}),v.push({id:1,users:[1,2],messages:[]}),v.push({id:2,users:[2,4],messages:[]}),v.push({id:3,users:[1,4],messages:[]}),v.push({id:4,users:[2,3],messages:[]}),localStorage.setItem("users",JSON.stringify(g)),localStorage.setItem("chats",JSON.stringify(v)));function E(o){history.pushState({},"",o),P(o)}function P(o){if(J.innerHTML="",y=localStorage.getItem("username"),g=JSON.parse(localStorage.getItem("users"))||[],!y&&o!==`${p}`){E(`${p}`);return}if(o===`${p}`||!y)D(J);else if(o===`${p}chat`){const c=g.find(d=>d.username===y).id||0;K(J,c)}else if(o.startsWith(`${p}chat`)){const c=g.find(t=>t.username===y).id||0,d=parseInt(o.split("/chat/")[1]),s=v.find(t=>t.id===d).users.find(t=>t!==c),i=g.find(t=>t.id===s).username;q(J,d,i)}else E(`${p}`)}window.addEventListener("load",()=>{y=localStorage.getItem("username"),y?P(window.location.pathname):E(`${p}`)});window.addEventListener("popstate",()=>{P(window.location.pathname)});
