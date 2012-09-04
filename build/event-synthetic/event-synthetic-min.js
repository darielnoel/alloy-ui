/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
YUI.add("event-synthetic",function(b){var j=b.CustomEvent,k=b.Env.evt.dom_map,d=b.Array,i=b.Lang,m=i.isObject,c=i.isString,e=i.isArray,g=b.Selector.query,l=function(){};function h(o,n){this.handle=o;this.emitFacade=n;}h.prototype.fire=function(t){var u=d(arguments,0,true),r=this.handle,p=r.evt,n=r.sub,q=n.context,v=n.filter,o=t||{},s;if(this.emitFacade){if(!t||!t.preventDefault){o=p._getFacade();if(m(t)&&!t.preventDefault){b.mix(o,t,true);u[0]=o;}else{u.unshift(o);}}o.type=p.type;o.details=u.slice();if(v){o.container=p.host;}}else{if(v&&m(t)&&t.currentTarget){u.shift();}}n.context=q||o.currentTarget||p.host;s=p.fire.apply(p,u);n.context=q;return s;};function f(p,o,n){this.handles=[];this.el=p;this.key=n;this.domkey=o;}f.prototype={constructor:f,type:"_synth",fn:l,capture:false,register:function(n){n.evt.registry=this;this.handles.push(n);},unregister:function(q){var p=this.handles,o=k[this.domkey],n;for(n=p.length-1;n>=0;--n){if(p[n].sub===q){p.splice(n,1);break;}}if(!p.length){delete o[this.key];if(!b.Object.size(o)){delete k[this.domkey];}}},detachAll:function(){var o=this.handles,n=o.length;while(--n>=0){o[n].detach();}}};function a(){this._init.apply(this,arguments);}b.mix(a,{Notifier:h,SynthRegistry:f,getRegistry:function(t,s,q){var r=t._node,p=b.stamp(r),o="event:"+p+s+"_synth",n=k[p];if(q){if(!n){n=k[p]={};}if(!n[o]){n[o]=new f(r,p,o);}}return(n&&n[o])||null;},_deleteSub:function(o){if(o&&o.fn){var n=this.eventDef,p=(o.filter)?"detachDelegate":"detach";this._subscribers=[];if(j.keepDeprecatedSubs){this.subscribers={};}n[p](o.node,o,this.notifier,o.filter);this.registry.unregister(o);delete o.fn;delete o.node;delete o.context;}},prototype:{constructor:a,_init:function(){var n=this.publishConfig||(this.publishConfig={});this.emitFacade=("emitFacade" in n)?n.emitFacade:true;n.emitFacade=false;},processArgs:l,on:l,detach:l,delegate:l,detachDelegate:l,_on:function(t,u){var v=[],p=t.slice(),q=this.processArgs(t,u),r=t[2],n=u?"delegate":"on",o,s;o=(c(r))?g(r):d(r||b.one(b.config.win));if(!o.length&&c(r)){s=b.on("available",function(){b.mix(s,b[n].apply(b,p),true);},r);return s;}b.Array.each(o,function(x){var y=t.slice(),w;x=b.one(x);if(x){if(u){w=y.splice(3,1)[0];}y.splice(0,4,y[1],y[3]);if(!this.preventDups||!this.getSubs(x,t,null,true)){v.push(this._subscribe(x,n,y,q,w));}}},this);return(v.length===1)?v[0]:new b.EventHandle(v);},_subscribe:function(r,p,u,s,q){var w=new b.CustomEvent(this.type,this.publishConfig),t=w.on.apply(w,u),v=new h(t,this.emitFacade),o=a.getRegistry(r,this.type,true),n=t.sub;n.node=r;n.filter=q;if(s){this.applyArgExtras(s,n);}b.mix(w,{eventDef:this,notifier:v,host:r,currentTarget:r,target:r,el:r._node,_delete:a._deleteSub},true);t.notifier=v;o.register(t);this[p](r,n,v,q);return t;},applyArgExtras:function(n,o){o._extra=n;},_detach:function(p){var u=p[2],s=(c(u))?g(u):d(u),t,r,n,q,o;p.splice(2,1);for(r=0,n=s.length;r<n;++r){t=b.one(s[r]);if(t){q=this.getSubs(t,p);if(q){for(o=q.length-1;o>=0;--o){q[o].detach();}}}}},getSubs:function(p,v,o,r){var n=a.getRegistry(p,this.type),w=[],u,q,t,s;if(n){u=n.handles;if(!o){o=this.subMatch;}for(q=0,t=u.length;q<t;++q){s=u[q];if(o.call(this,s.sub,v)){if(r){return s;}else{w.push(u[q]);}}}}return w.length&&w;},subMatch:function(o,n){return !n[1]||o.fn===n[1];}}},true);b.SyntheticEvent=a;b.Event.define=function(p,o,r){var q,s,n;if(p&&p.type){q=p;r=o;}else{if(o){q=b.merge({type:p},o);}}if(q){if(r||!b.Node.DOM_EVENTS[q.type]){s=function(){a.apply(this,arguments);};b.extend(s,a,q);n=new s();p=n.type;b.Node.DOM_EVENTS[p]=b.Env.evt.plugins[p]={eventDef:n,on:function(){return n._on(d(arguments));},delegate:function(){return n._on(d(arguments),true);},detach:function(){return n._detach(d(arguments));}};}}else{if(c(p)||e(p)){b.Array.each(d(p),function(u){b.Node.DOM_EVENTS[u]=1;});}}return n;};},"3.7.1pr1",{requires:["node-base","event-custom-complex"]});