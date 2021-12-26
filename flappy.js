function novoElemento(e,t){const o=document.createElement(e);return o.className=t,o}function Barreira(e=!1){this.elemento=novoElemento("div","barreira");const t=novoElemento("div","borda"),o=novoElemento("div","corpo");this.elemento.appendChild(e?o:t),this.elemento.appendChild(e?t:o),this.setAltura=e=>o.style.height=`${e}px`}function ParDeBarreiras(e,t,o){this.elemento=novoElemento("div","par-de-barreiras"),this.superior=new Barreira(!0),this.inferior=new Barreira(!1),this.elemento.appendChild(this.superior.elemento),this.elemento.appendChild(this.inferior.elemento),this.sortearAbertura=()=>{const o=Math.random()*(e-t),n=e-t-o;this.superior.setAltura(o),this.inferior.setAltura(n)},this.getX=()=>parseInt(this.elemento.style.left.split("px")[0]),this.setX=e=>this.elemento.style.left=`${e}px`,this.getLargura=()=>this.elemento.clientWidth,this.sortearAbertura(),this.setX(o)}function Barreiras(e,t,o,n,i){this.pares=[new ParDeBarreiras(e,o,t),new ParDeBarreiras(e,o,t+n),new ParDeBarreiras(e,o,t+2*n),new ParDeBarreiras(e,o,t+3*n)];this.animar=()=>{this.pares.forEach((e=>{e.setX(e.getX()-4),e.getX()<-e.getLargura()&&(e.setX(e.getX()+n*this.pares.length),e.sortearAbertura());const o=t/2;e.getX()+4>=o&&e.getX()<o&&i()}))}}function Pajaro(e){let t=!1;this.elemento=novoElemento("img","passaro"),this.elemento.src="img/passar0.png",this.getY=()=>parseInt(this.elemento.style.bottom.split("px")[0]),this.setY=e=>this.elemento.style.bottom=`${e}px`;let o=window.onkeydown=e=>t=!0,n=window.onkeyup=e=>t=!1;window.onmousedown=e=>o(),window.onmouseup=e=>n(),this.animar=()=>{const o=this.getY()+(t?8:-5),n=e-this.elemento.clientHeight;o<=0?this.setY(0):o>=n?this.setY(n):this.setY(o)},this.setY(e/2)}function Progresso(){this.elemento=novoElemento("span","progresso"),this.atualizarPontos=e=>{this.elemento.innerHTML=e},this.atualizarPontos(0)}function estaoSobrepostos(e,t){const o=e.getBoundingClientRect(),n=t.getBoundingClientRect(),i=o.left+o.width>=n.left&&n.left+n.width>=o.left,r=o.top+o.height>=n.top&&n.top+n.height>=o.top;return i&&r}function colidiu(e,t){let o=!1;return t.pares.forEach((t=>{if(!o){const n=t.superior.elemento,i=t.inferior.elemento;o=estaoSobrepostos(e.elemento,n)||estaoSobrepostos(e.elemento,i)}})),o}function FlappyBird(){let e=0;const t=document.querySelector("[wm-flappy]"),o=t.clientHeight,n=t.clientWidth,i=new Progresso,r=new Barreiras(o,n,185,550,(()=>i.atualizarPontos(++e))),s=new Pajaro(o);t.appendChild(i.elemento),t.appendChild(s.elemento),r.pares.forEach((e=>t.appendChild(e.elemento))),this.start=()=>{const e=setInterval((()=>{r.animar(),s.animar(),colidiu(s,r)&&clearInterval(e)}),20)}}(new FlappyBird).start();