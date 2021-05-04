(()=>{"use strict";var e={4007:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.fetchPlayerGrade=t.getPlayerName=t.getChartType=t.getChartDifficulty=t.getChartLevel=t.getSongName=void 0,t.getSongName=function(e){return e.getElementsByClassName("music_name_block")[0].innerText},t.getChartLevel=function(e){return e.getElementsByClassName("music_lv_block")[0].innerText},t.getChartDifficulty=function(e){if(!e.classList.contains("pointer")){const t=e.querySelector(".pointer");e=t||e}const t=e.className.match(/music_([a-z]+)_score_back/)[1].toUpperCase();return 0===t.indexOf("RE")?"Re:MASTER":t},t.getChartType=function(e){return e.id?e.id.includes("sta_")?0:1:e.querySelector("img:nth-child(2)").src.includes("_standard")?0:1},t.getPlayerName=function(e){var t;return null===(t=e.querySelector(".name_block"))||void 0===t?void 0:t.innerText},t.fetchPlayerGrade=function(e){const t=e.querySelector(".user_data_block_line ~ img.h_25");if(t){const e=t.src.lastIndexOf("grade_");return t.src.substring(e+6,e+8)}return null}},2847:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.fetchScores=t.SELF_SCORE_URLS=void 0;const r=n(4007),i=n(4871);t.SELF_SCORE_URLS=new Map([["Re:MASTER","/maimai-mobile/record/musicGenre/search/?genre=99&diff=4"],["MASTER","/maimai-mobile/record/musicGenre/search/?genre=99&diff=3"],["EXPERT","/maimai-mobile/record/musicGenre/search/?genre=99&diff=2"],["ADVANCED","/maimai-mobile/record/musicGenre/search/?genre=99&diff=1"]]),t.fetchScores=function(e,n){return o(this,void 0,void 0,(function*(){const o=t.SELF_SCORE_URLS.get(e);if(!o)return;const c=yield i.fetchPage(o),a=c.querySelectorAll(".main_wrapper.t_c .m_15"),s={genre:"",scoreList:n};return a.forEach((t=>function(e,t,n){const o=e.classList.contains("screw_block"),i=e.classList.contains("w_450")&&e.classList.contains("m_15")&&e.classList.contains("p_r")&&e.classList.contains("f_0");if(o)n.genre=e.innerText;else if(i){const o=r.getSongName(e),i=r.getChartLevel(e),c=1===r.getChartType(e)?"DX":"STANDARD",a=function(e){const t=e.querySelector(".music_score_block.w_120");return t&&t.innerText}(e);if(!a)return;n.scoreList.push([o,n.genre,t,i,c,a].join("\t"))}}(t,e,s))),c}))}},1735:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.LANG=void 0;const n=new URLSearchParams(location.search);let o="en";n.get("hl")?o=n.get("hl").startsWith("zh")?"zh":"en":navigator.language.startsWith("zh")&&(o="zh"),t.LANG=o},6016:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.statusText=void 0;const o={zh:{advStart:"🕓 下載黃譜成績中…",advDone:"✔ 黃譜成績下載完畢！",expStart:"🕓 下載紅譜成績中…",expDone:"✔ 紅譜成績下載完畢！",masStart:"🕓 下載紫譜成績中…",masDone:"✔ 紫譜成績下載完畢！",remStart:"🕓 下載白譜成績中…",remDone:"✔ 白譜成績下載完畢！"},en:{advStart:"🕓 Downloading Advanced scores…",advDone:"✔ Advanced scores downloaded!",expStart:"🕓 Downloading Expert scores…",expDone:"✔ Expert scores downloaded!",masStart:"🕓 Downloading Master scores…",masDone:"✔ Master scores downloaded!",remStart:"🕓 Downloading Re:Master scores…",remDone:"✔ Re:Master scores downloaded!"}}[n(1735).LANG];t.statusText=function(e,t){switch(e){case"Re:MASTER":return t?o.remDone:o.remStart;case"MASTER":return t?o.masDone:o.masStart;case"EXPERT":return t?o.expDone:o.expStart;case"ADVANCED":return t?o.advDone:o.advStart}return""}},868:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.isNicoNicoLink=t.getSongNickname=t.getSongIdx=t.RATING_TARGET_SONG_NAME_PREFIX=t.DX_SONG_NAME_SUFFIX=void 0;const r=n(4871);t.DX_SONG_NAME_SUFFIX=" [DX]",t.RATING_TARGET_SONG_NAME_PREFIX="▶ ",t.getSongIdx=function(e){return e.getElementsByTagName("form")[0].elements.namedItem("idx").value},t.getSongNickname=function(e,n,o){return"Link"===e&&(e=n.includes("niconico")?"Link(nico)":"Link(org)"),o?e+t.DX_SONG_NAME_SUFFIX:e};let i={};t.isNicoNicoLink=function(e){return o(this,void 0,void 0,(function*(){if(i.nico===e)return!0;if(i.original===e)return!1;const t=(yield r.fetchPage("/maimai-mobile/record/musicDetail/?"+new URLSearchParams([["idx",e]]).toString())).body.querySelector(".m_10.m_t_5.t_r.f_12").innerText.includes("niconico");return console.log("Link (idx: "+e+") "+(t?"is niconico":"is original")),t?i.nico=e:i.original=e,t}))}},4871:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getPostMessageFunc=t.fetchNewSongs=t.fetchAllSongs=t.fetchGameVersion=t.fetchPage=t.handleError=t.ALLOWED_ORIGINS=void 0;const r=n(4007),i=n(2847),c=n(868);function a(e){return o(this,void 0,void 0,(function*(){const t=yield fetch(e),n=yield t.text();return(new DOMParser).parseFromString(n,"text/html")}))}function s(e){return o(this,void 0,void 0,(function*(){const t=Array.from(e.querySelectorAll(".w_450.m_15.f_0")),n=[];for(const e of t){const t=c.getSongIdx(e),o=r.getSongName(e),i=r.getChartType(e);let a;"Link"===o&&(a=(yield c.isNicoNicoLink(t))?"Link(nico)":"Link(org)"),n.push({dx:i,name:o,nickname:a})}return n}))}t.ALLOWED_ORIGINS=["https://cdpn.io","https://myjian.github.io","http://localhost:8080"],t.handleError=function(e){alert(e)},t.fetchPage=a,t.fetchGameVersion=function e(t){return o(this,void 0,void 0,(function*(){const n=t.querySelector("select[name=version] option:last-of-type");return n?n.value:e(t=yield a("/maimai-mobile/record/musicVersion/"))}))},t.fetchAllSongs=function(e){return o(this,void 0,void 0,(function*(){if(!e){const t=i.SELF_SCORE_URLS.get("MASTER");e=yield a(t)}return yield s(e)}))},t.fetchNewSongs=function(e){return o(this,void 0,void 0,(function*(){const t=yield a(`/maimai-mobile/record/musicVersion/search/?version=${e}&diff=0`);return yield s(t)}))},t.getPostMessageFunc=function(e,t){return(n,o)=>{const r={action:n,payload:o};e.postMessage(r,t)}}},6494:function(e,t,n){var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{s(o.next(e))}catch(e){i(e)}}function a(e){try{s(o.throw(e))}catch(e){i(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,a)}s((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const r=n(2847),i=n(1735),c=n(6016),a=n(4871);!function(){const e={zh:{pleaseLogIn:"請登入 maimai NET",copy:"複製成績",copied:"已複製到剪貼簿",allDone:"✅ 全部成績下載完畢，請按網頁上的「複製成績」把資料複製到剪貼簿。"},en:{pleaseLogIn:"Please log in to maimai DX NET.",copy:"Copy",copied:"Copied to clipboard",allDone:'✅ All scores are downloaded. Click the "Copy" buton on the page to copy scores.'}}[i.LANG];!function(t,n){o(this,void 0,void 0,(function*(){const o=location.host;if("maimaidx-eng.com"!==o&&"maimaidx.jp"!==o)return void t(e.pleaseLogIn);const i=[];for(const e of r.SELF_SCORE_URLS.keys())n(c.statusText(e,!1)),yield r.fetchScores(e,i),n(c.statusText(e,!0));let a=document.getElementById("outputText");a||(a=function(t){const n=document.createElement("div");n.id="outputArea",n.style.position="relative",n.style.marginBottom="16px";const o=document.createElement("textarea");o.id="outputText",n.append(o);const r=document.createElement("button");r.innerText=e.copy,r.style.backgroundColor="#9f51dc",r.style.border="2px solid black",r.style.borderRadius="5px",r.style.color="white",r.style.fontWeight="700",r.style.padding="8px 12px",n.append(r);const i=document.createElement("span");return i.className="f_16",i.style.position="absolute",i.style.left="300px",i.style.bottom="10px",i.style.fontWeight="700",i.style.color="#fff000",n.append(i),r.addEventListener("click",(()=>{o.select(),document.execCommand("copy"),i.innerText=e.copied,setTimeout((()=>{i.innerText=""}),5e3)})),t.append(n),o}(document.querySelector(".main_wrapper header"))),a.value=i.join("\n"),n(e.allDone)}))}(a.handleError,(function(e){const t=document.querySelector(".comment_block");t?t.innerText=t.innerText+e+"\n":console.log(e)}))}()}},t={};!function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}(6494)})();