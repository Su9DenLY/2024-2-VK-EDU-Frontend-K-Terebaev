(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const t of i.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&l(t)}).observe(document,{childList:!0,subtree:!0});function d(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=d(s);fetch(s.href,i)}})();function K(o,c,d){let l=[];const s=localStorage.getItem("username");o.appendChild(C()),o.appendChild(w()),o.appendChild(S()),document.querySelector("img").src=`${m}/cat.jpg`,document.querySelector(".header-recipient-info-username").innerText=`${d}`;const i=document.querySelector("form"),t=document.querySelector(".form-textarea"),f=document.querySelector(".section-messages"),x=document.querySelector(".section"),B=document.querySelector(".button-send"),q=document.getElementById("delete-button"),n=document.getElementById("arrow_back");i.addEventListener("submit",O.bind(this)),i.addEventListener("keypress",E.bind(this)),window.addEventListener("beforeunload",$),t.addEventListener("input",L),M(),g(),B.addEventListener("click",()=>{i.dispatchEvent(new Event("submit")),t.dispatchEvent(new Event("input")),t.scrollTop=t.scrollHeight}),q.addEventListener("click",()=>{let e=JSON.parse(localStorage.getItem("chats"))||[],a=e.findIndex(r=>r.id===c);l=[],e[a].messages=l,localStorage.setItem("chats",JSON.stringify(e)),g()}),n.addEventListener("click",()=>{$(),I(`${m}chat`)}),document.addEventListener("keydown",e=>{e.key==="Escape"&&n.click()});function M(){l=JSON.parse(localStorage.getItem("chats")).find(a=>a.id===c).messages||[]}function $(){let e=JSON.parse(localStorage.getItem("chats"))||[],a=e.findIndex(r=>r.id===c);e[a].messages=l,localStorage.setItem("chats",JSON.stringify(e))}function N(e,a,r){l.push({username:e,text:a,time:r});const u=p(e,a,r);f.appendChild(u),setTimeout(()=>{x.scrollTop=x.scrollHeight},0)}function p(e,a,r){const u=document.createElement("div"),b=document.createElement("div"),H=document.createElement("div"),T=document.createElement("div"),k=document.createElement("span");return H.innerText=`${e}`,b.innerText=a,T.innerText=`${r}`,e===s?(u.classList.add("message-my-container"),b.classList.add("message-my-content"),T.classList.add("message-status"),H.classList.add("message-my-username"),k.classList.add("material-symbols-outlined"),k.style.fontSize="14px",k.innerText="check",T.appendChild(k)):(u.classList.add("message-other-container"),b.classList.add("message-other-content"),T.classList.add("message-status"),H.classList.add("message-other-username")),b.appendChild(T),u.appendChild(H),u.appendChild(b),u}function g(){f.innerHTML="",l.forEach(e=>{const{username:a,text:r,time:u}=e,b=p(a,r,u);f.appendChild(b)}),setTimeout(()=>{f.scrollTop=f.scrollHeight},0),t.dispatchEvent(new Event("input"))}function O(e){e.preventDefault();const a=t.value.trim();if(a){let r=new Date;N(s,a,`${r.getHours()}`.padStart(2,"0")+":"+`${r.getMinutes()}`.padStart(2,"0")),t.value=""}}function E(e){if(e.key==="Enter"){if(e.preventDefault(),e.shiftKey){const a=t.selectionStart;t.value=t.value.slice(0,a)+`
`+t.value.slice(a),t.selectionStart=t.selectionEnd=a+1}else i.dispatchEvent(new Event("submit"));t.dispatchEvent(new Event("input")),t.scrollTop=t.scrollHeight}}function L(){t.style.height="0px",t.style.height=t.scrollHeight+"px"}function C(){const e=document.createElement("header");return e.classList.add("header","header-chat"),e.innerHTML=`
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
    `,e}function w(){const e=document.createElement("section");return e.classList.add("section"),e.innerHTML='<section class="section-messages"></section>',e}function S(){const e=document.createElement("form");return e.classList.add("form"),e.innerHTML=`
        <form class="form">
            <button class="button-gray">
                <span class="material-symbols-outlined">attachment</span>
            </button>
            <textarea class="form-textarea" name="message-text" placeholder="Введите сообщение"></textarea>
            <button class="button-send" type="button">
                <span class="material-symbols-outlined">send</span>
            </button>
        </form>`,e}}function D(o,c){let d=JSON.parse(localStorage.getItem("users"))||[];const l=d.find(n=>n.id===c).chats,s=JSON.parse(localStorage.getItem("chats"))||[];o.appendChild(f()),o.appendChild(x()),o.appendChild(q());const i=document.querySelector(".section-chats");document.getElementById(".button-add-chat"),document.getElementById("button-logout").addEventListener("click",()=>{localStorage.removeItem("username"),location.replace(`${m}`)}),s.forEach(n=>{l.includes(n.id)&&i.appendChild(B(n.id))});function f(){const n=document.createElement("header");return n.classList.add("header","header-chat-list"),n.innerHTML=`
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
        `,n}function x(){const n=document.createElement("section");return n.classList.add("section"),n.innerHTML='<div class="section-chats"></div>',n}function B(n){const M=s.find(u=>u.id===n),$=M.users.find(u=>u!==c),N=d.find(u=>u.id===$).username,p=M.messages.slice(-1)[0],g=document.createElement("div"),O=document.createElement("div"),E=document.createElement("div"),L=document.createElement("div"),C=document.createElement("span"),w=document.createElement("span"),S=document.createElement("div"),e=document.createElement("span"),a=document.createElement("span"),r=document.createElement("img");return g.classList.add("chat-container"),C.classList.add("chat-name"),S.classList.add("chat-last-message-meta"),e.classList.add("chat-last-message-time"),a.classList.add("chat-last-message-check","material-symbols-outlined"),E.classList.add("chat-info"),L.classList.add("chat-info-row"),w.classList.add("chat-last-message"),r.classList.add("chat-avatar"),g.id=n,r.src=`${m}/cat.jpg`,C.innerText=`${N}`,w.innerText=`${(p==null?void 0:p.text)||""}`,e.innerText=`${(p==null?void 0:p.time)||""}`,p&&p.username!==N&&(a.innerText="check"),O.appendChild(r),S.appendChild(a),S.appendChild(e),L.appendChild(C),L.appendChild(S),E.appendChild(L),E.appendChild(w),g.appendChild(O),g.appendChild(E),g.addEventListener("click",()=>{I(`${m}chat/${n}`)}),g}function q(){const n=document.createElement("button");return n.classList.add("button-add-chat"),n.innerHTML='<span class="material-symbols-outlined">draw</span>',n}}function _(o){let c;const d=JSON.parse(localStorage.getItem("users"))||[];o.classList.add("login-wrapper"),o.innerHTML=`
        <div class="login-form">
            <input type="text" id="login-input" placeholder="Enter your username">
            <button id="login-button">Login</button>
        </div>
    `,document.getElementById("login-button").addEventListener("click",()=>{var l;if(c=document.getElementById("login-input").value.trim(),c){if(!d.some(s=>s.username===c)){let s=((l=JSON.parse(localStorage.getItem("users")))==null?void 0:l.slice(-1)[0].id)+1||1;d.push({id:s,username:c,chats:[]}),localStorage.setItem("users",JSON.stringify(d))}localStorage.setItem("username",c),o.classList.remove("login-wrapper"),I(`${m}chat`)}})}const m="/2024-2-VK-EDU-Frontend-K-Terebaev/",J=document.querySelector(".wrapper");let y=localStorage.getItem("username"),h=JSON.parse(localStorage.getItem("users"))||[];const v=JSON.parse(localStorage.getItem("chats"))||[];h.length===0&&v.length===0&&(h.push({id:1,username:"Элизабет",chats:[1,3]}),h.push({id:2,username:"Дженнифер",chats:[1,2,4]}),h.push({id:3,username:"Иннокентий",chats:[4]}),h.push({id:4,username:"Евлампий",chats:[2,3]}),v.push({id:1,users:[1,2],messages:[]}),v.push({id:2,users:[2,4],messages:[]}),v.push({id:3,users:[1,4],messages:[]}),v.push({id:4,users:[2,3],messages:[]}),localStorage.setItem("users",JSON.stringify(h)),localStorage.setItem("chats",JSON.stringify(v)));function I(o){history.pushState({},"",o),P(o)}function P(o){if(J.innerHTML="",y=localStorage.getItem("username"),h=JSON.parse(localStorage.getItem("users"))||[],!y&&o!==`${m}`){I(`${m}`);return}if(o===`${m}`||!y)_(J);else if(o===`${m}chat`){const c=h.find(d=>d.username===y).id||0;D(J,c)}else if(o.startsWith(`${m}chat`)){const c=h.find(t=>t.username===y).id||0,d=parseInt(o.split("/chat/")[1]),s=v.find(t=>t.id===d).users.find(t=>t!==c),i=h.find(t=>t.id===s).username;K(J,d,i)}else I(`${m}`)}window.addEventListener("load",()=>{y=localStorage.getItem("username"),y?P(window.location.pathname):I(`${m}`)});window.addEventListener("popstate",()=>{P(window.location.pathname)});
