(()=>{const e=document.getElementById("videoContainer"),t=document.getElementById("commentForm");t&&t.addEventListener("submit",(async n=>{n.preventDefault();const a=t.querySelector("textarea"),o=a.value,c=e.dataset.id;if(""===o)return;const{status:d}=await fetch(`/api/videos/${c}/comment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:o})});a.value="",201===d&&((e,t)=>{const n=document.querySelector(".video__comments ul"),a=document.createElement("li");a.dataset.id=void 0,a.className="video__comment";const o=document.createElement("i");o.className="fas fa-comment";const c=document.createElement("span");c.innerText=`${e}`,a.appendChild(o),a.appendChild(c),n.prepend(a)})(o)}))})();