/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("anim-curve",function(a){a.Anim.behaviors.curve={set:function(f,c,i,h,b,g,e){i=i.slice.call(i);h=h.slice.call(h);var d=e(b,0,100,g)/100;h.unshift(i);f._node.setXY(a.Anim.getBezier(h,d));},get:function(c,b){return c._node.getXY();}};a.Anim.getBezier=function(f,e){var g=f.length;var d=[];for(var c=0;c<g;++c){d[c]=[f[c][0],f[c][1]];}for(var b=1;b<g;++b){for(c=0;c<g-b;++c){d[c][0]=(1-e)*d[c][0]+e*d[parseInt(c+1,10)][0];d[c][1]=(1-e)*d[c][1]+e*d[parseInt(c+1,10)][1];}}return[d[0][0],d[0][1]];};},"3.7.1pr1",{requires:["anim-xy"]});