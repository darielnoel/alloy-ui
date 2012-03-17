(function(){YUI.AUI_config=YUI.AUI_config||{};var f=YUI.AUI_config;YUI.prototype.ready=function(){var h=this;var m=Array.prototype.slice;var k=m.call(arguments,0),j=k.length-1;var l=k[j];var i=m.call(arguments,0,j);i.push("event");i.push(function(n){var o=arguments;n.on("domready",function(){l.apply(this,o);});});h.use.apply(h,i);};var b;if(typeof A!="undefined"){b=A;}else{b=YUI(f);}var e=function(h){h.Env._guidp=["aui",h.version,h.Env._yidx].join("_").replace(/\./g,"_");};e(b);var g=b.config;b.config=b.merge(g,YUI.AUI_config);YUI.AUI=function(m){var h=this;var j=window.Alloy;if(m||h instanceof a){var i=b.Array(arguments);i.unshift(b.config);var k=YUI.apply(null,i);a._uaExtensions(k);a._miscExtensions(k);a._guidExtensions(k);var l=k.config.win;if(!l.YUI){l.YUI=YUI;}if(!l.AUI){l.AUI=a;}if(!l.Alloy){l.Alloy=k;}j=k;}return j;};var a=YUI.AUI;a._guidExtensions=e;var d=b.config.win;d.AUI=a;d.Alloy=b;var c=b.UA;b.mix(a,YUI,true,null,2);b.mix(a,{__version:"@VERSION",defaults:f,html5shiv:function(l){var h=this;var i=l||b.config.doc;if(c.ie&&i&&i.createElement){var k=a.HTML5_ELEMENTS,j=k.length;while(j--){i.createElement(k[j]);}}return l;},setDefaults:function(i){var h=this;b.mix(a.defaults,i,true,null,0,true);b.mix(b.config,i,true,null,0,true);},_miscExtensions:function(i){var h=this;var j=i.config.doc;a.html5shiv(j);var l=i.UA.ie;if(l&&l<=6){try{j.execCommand("BackgroundImageCache",false,true);}catch(k){}}},HTML5_ELEMENTS:"abbr,article,aside,audio,canvas,command,datalist,details,figure,figcaption,footer,header,hgroup,keygen,mark,meter,nav,output,progress,section,source,summary,time,video".split(",")},true);a._miscExtensions(b);(function(){var k=/\./g;var h=function(o){var n=0;return parseFloat(o.replace(k,function(){return(n++==1)?"":".";}));};var j=["0","0"];var i=function(o,p){var n=(p.match(o)||j)[1];return h(n);};var m={windows:"win",macintosh:"mac"};var l=["ie","opera","chrome","aol","camino","firefox","flock","mozilla","netscape","icab","konqueror","safari"];a._uaExtensions=function(F){var x=navigator;var L=x.userAgent;var D=F.UA;var q=D.os;var u={aol:0,camino:0,firefox:0,flock:0,mozilla:0,netscape:0,icab:0,konqueror:0,safari:0,browser:0,win:q=="windows",mac:q=="macintosh",rhino:q=="rhino",agent:L};if(D.ie){u.aol=i(/America Online Browser ([^\s]*);/,L);}else{if(D.gecko){u.netscape=i(/(Netscape|Navigator)\/([^\s]*)/,L);u.flock=i(/Flock\/([^\s]*)/,L);u.camino=i(/Camino\/([^\s]*)/,L);u.firefox=i(/Firefox\/([^\s]*)/,L);}else{if(D.webkit){u.safari=i(/Version\/([^\s]*) Safari/,L);}else{u.icab=i(/iCab(?:\/|\s)?([^\s]*)/,L);u.konqueror=i(/Konqueror\/([^\s]*)/,L);}}}if(!u.win&&!u.mac){var z=/Linux/.test(L);var p=/Solaris|SunOS/.test(L);if(z){D.os="linux";u.linux=z;}else{if(p){D.os="sun";u.sun=p;}}}var M=F.config,o=M.doc;u.touch=("ontouchstart" in o);F.mix(D,u);var G=[];var w=0;var K;var s;var I;var v;var y={string:"",major:w};var H=l.length;while(H--){K=l[H];s=D[K];if(s>0){w=parseInt(s,10);I=K+w;v=(K+s);if(String(s).indexOf(".")>-1){v=v.replace(/\.(\d).*/,"-$1");}else{v+="-0";}G.push(K,I,v);y.string=K+"";y.major=w;}}D.version=y;D.renderer="";var J=o.documentElement;D.dir=J.getAttribute("dir")||"ltr";if(D.ie){D.renderer="trident";}else{if(D.gecko){D.renderer="gecko";}else{if(D.webkit){D.renderer="webkit";}else{if(D.opera){D.renderer="presto";}}}}F.UA=D;var t=[D.renderer,D.dir,"js"].concat(G);var B=m[D.os]||D.os;t.push(B);if(D.mobile){t.push("mobile");}if(D.secure){t.push("secure");}if(D.touch){t.push("touch");}D.selectors=t.join(" ");if(!J._yuid){J.className+=" "+D.selectors;var n,E;n=!(E=!!(M.win.SVGAngle||o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")));if(n){var C=o.createElement("div");var r;C.innerHTML='<v:shape adj="1"/>';r=C.firstChild;r.style.behavior="url(#default#VML)";if(!(r&&typeof r.adj=="object")){n=false;}C=null;}a._VML=n;a._SVG=E;F.stamp(J);}D.vml=a._VML;D.svg=a._SVG;};})();a._uaExtensions(b);})();AUI.add("aui-base-core",function(b){var f=b.Lang,c=f.isNumber,a=f.isString,e=b.Array,d=e.indexOf;b.mix(e,{remove:function(g,j,i){var h=g.slice((i||j)+1||g.length);g.length=(j<0)?(g.length+j):j;return g.push.apply(g,h);},removeItem:function(g,i){var h=d(g,i);return e.remove(g,h);}});b.fn=function(j,i,g){var h;var k;if(!c(j)){var l=arguments;if(l.length>2){l=e(l,2,true);}k=(a(j)&&i);h=function(){var n=(!k)?j:i[j];return n.apply(i||j,l);};}else{var m=j;j=i;i=g;k=(a(j)&&i);h=function(){var o=(!k)?j:i[j];i=i||o;var n;if(m>0){n=o.apply(i,e(arguments,0,true).slice(0,m));}else{n=o.call(i);}return n;};}return h;};},"@VERSION@",{skinnable:false,requires:["aui-classnamemanager","aui-node","aui-component","aui-debounce","aui-delayed-task","aui-selector","aui-event-base","oop","yui-throttle"]});