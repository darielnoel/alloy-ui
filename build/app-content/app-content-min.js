/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("app-content",function(d,c){var b=d.PjaxContent;function a(){b.apply(this,arguments);}a.route=["loadContent","_contentRoute"];a.prototype={showContent:function(h,o,m){h=d.one(h);if(typeof o==="function"){o={callback:o};m=null;}o=d.merge({render:false},o);var j=o.view||"",k=typeof j==="string"?j:j.name,g=typeof j!=="string"?j.config:{},n=this.getViewInfo(k),e,l,i,f;delete o.view;if(h&&h.isFragment()&&h.get("childNodes").size()===1){h=h.get("firstChild");}if(h&&h.get("nodeType")===1){e=h;}else{i=(n&&n.type)||d.View;f=typeof i==="string"?d.Object.getValue(d,i.split(".")):i;l=f.prototype.containerTemplate;e=d.Node.create(l);e.append(h);}g=d.merge(g,{container:e});return this.showView(k,g,o,m);},_contentRoute:function(i,f,g){var h=f.content,j=d.config.doc,e;if(!(h&&h.node)){return g();}if(h.title&&j){e=this.onceAfter("activeViewChange",function(){j.title=h.title;});}this.showContent(h.node);if(e){e.detach();}g();}};d.mix(a,b);d.mix(a,b,false,null,1);d.App.Content=a;d.Base.mix(d.App,[a]);},"3.7.1pr1",{"requires":["app-base","pjax-content"]});