(()=>{"use strict";var e={6991:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.removeScrollControl=void 0,o.removeScrollControl=function(e){let o=e.getElementById("page-top");o&&o.remove(),o=e.getElementById("page-bottom"),o&&o.remove()}},4313:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.getScriptHost=void 0,o.getScriptHost=function(e){const o=Array.from(document.querySelectorAll("script"));for(;o.length;){const t=o.pop();if(t.src.includes(e)){const e=new URL(t.src),o=e.pathname;return e.origin+o.substring(0,o.lastIndexOf("/scripts"))}}return"https://myjian.github.io/mai-tools"}}},o={};function t(i){var r=o[i];if(void 0!==r)return r.exports;var n=o[i]={exports:{}};return e[i](n,n.exports,t),n.exports}(()=>{const e=t(6991),o=t(4313);!function(t){const i=o.getScriptHost("all-in-one")+"/scripts/";if(["maimaidx-eng.com","maimaidx.jp"].indexOf(t.location.host)<0)return;function r(e){const o=t.createElement("script");o.src=i+e+"?t="+Math.floor(Date.now()/6e4),t.body.append(o)}const n=t.location.pathname;"/maimai-mobile/record/"===n?r("recent-play-downloader.js"):n.indexOf("/maimai-mobile/record/playlogDetail/")>=0?r("score-converter.js"):n.indexOf("/maimai-mobile/record/musicDetail/")>=0?e.removeScrollControl(t):n.indexOf("/maimai-mobile/record/music")>=0?r("score-sort.js"):n.indexOf("/maimai-mobile/friend/")>=0?(r("analyze-friend-rating-in-new-tab.js"),(n.indexOf("/maimai-mobile/friend/friendGenreVs/battleStart/")>=0||n.indexOf("/maimai-mobile/friend/friendLevelVs/battleStart/")>=0)&&r("score-sort.js")):n.indexOf("/maimai-mobile/home/")>=0||n.indexOf("/maimai-mobile/playerData/")>=0?(e.removeScrollControl(t),r("analyze-rating-in-newtab.js")):n.indexOf("/maimai-mobile/photo/")>=0&&r("album-download-helper.js")}(document)})()})();