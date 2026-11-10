/* Pure map viewport math; works with SVG xMidYMid meet letterboxing. */
(function(root){'use strict';
function scale(v,r){return Math.max(v[2]/r.width,v[3]/r.height);}
function point(v,r,p){const u=scale(v,r),px=(r.width-v[2]/u)/2,py=(r.height-v[3]/u)/2;return[v[0]+(p.x-r.x-px)*u,v[1]+(p.y-r.y-py)*u];}
function change(v,base,r,from,to,factor){const anchor=point(v,r,from),w=Math.max(base[2]/40,Math.min(base[2]*1.6,v[2]/factor)),h=v[3]*w/v[2],u=Math.max(w/r.width,h/r.height),px=(r.width-w/u)/2,py=(r.height-h/u)/2;return[anchor[0]-(to.x-r.x-px)*u,anchor[1]-(to.y-r.y-py)*u,w,h];}
function midpoint(ps){return{x:(ps[0].x+ps[1].x)/2,y:(ps[0].y+ps[1].y)/2};}
function distance(ps){return Math.hypot(ps[1].x-ps[0].x,ps[1].y-ps[0].y);}
const api={scale,point,change,midpoint,distance};root.GolfMapMath=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
