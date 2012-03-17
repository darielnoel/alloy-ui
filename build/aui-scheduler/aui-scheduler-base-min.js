AUI.add("aui-scheduler-base",function(aa){var N=aa.Lang,at=N.isString,a=N.isArray,d=N.isDate,H=N.isNumber,G=function(A){return(A instanceof aa.Scheduler);},s=function(A){return(A instanceof aa.SchedulerView);},Y=function(A){return(A instanceof aa.SchedulerEvent);},t=function(A){return(aa.SchedulerCalendar&&(A instanceof aa.SchedulerCalendar));},h=aa.DataType.DateMath,U=aa.WidgetStdMod,S=".",o="",p=" ",r="scheduler-base",af="data-view-name",E="activeView",ar="clearfix",D="controls",ah="controlsNode",ak="current",Z="currentDate",W="currentDateNode",ag="date",ae="endDate",au="events",az="hd",v="header",aq="headerNode",m="helper",Q="icon",j="iconNextNode",an="iconPrevNode",ax="locale",l="name",O="nav",L="navNode",am="navigationDateFormat",n="next",b="nextDate",ap="prev",ai="prevDate",ay="rendered",K="scheduler",av="startDate",C="strings",e="today",ab="todayNode",u="triggerNode",y="view",M="viewStack",aA="views",V="viewsNode",z=aa.getClassName,ac=z(m,ar),i=z(Q),al=z(r,D),R=z(r,ak,ag),f=z(r,az),T=z(r,Q,n),B=z(r,Q,ap),aw=z(r,O),x=z(r,e),X=z(r,y),g=z(r,y,o),q=z(r,aA),aj='<div class="'+al+'"></div>',w='<div class="'+R+'"></div>',c='<div class="'+f+'"></div>',aB='<a href="#" class="'+[i,T].join(p)+'">Next</a>',ad='<a href="#" class="'+[i,B].join(p)+'">Prev</a>',k='<div class="'+aw+'"></div>',P='<a href="#" class="'+x+'">{today}</a>',ao='<a href="#" class="'+[X,g].join(p)+'{name}" data-view-name="{name}">{label}</a>',I='<div class="'+q+'"></div>';var J=function(){};J.ATTRS={events:{value:[],setter:"_setEvents",validator:a}};aa.mix(J.prototype,{addEvent:function(aC){var A=this;var aD=A.get(au);if(aa.Array.indexOf(aD,aC)>-1){aa.Array.removeItem(aD,aC);}aD.push(aC);A.set(au,aD);},addEvents:function(aC){var A=this;aa.Array.each(A._normalizeEvents(aC),aa.bind(A.addEvent,A));},eachEvent:function(aD){var A=this;var aC=A.get(au);aa.Array.each(aC,aD,A);},removeEvent:function(aC){var A=this;var aD=A.get(au);aa.Array.removeItem(aD,aC);A.set(au,aD);},removeEvents:function(aC){var A=this;aa.Array.each(A._normalizeEvents(aC),aa.bind(A.removeEvent,A));},_normalizeEvents:function(aD){var A=this;var aC=[];aD=aa.Array(aD);aa.Array.each(aD,function(aE){if(Y(aE)){aC.push(aE);}else{if(t(aE)){aC=aC.concat(A._normalizeEvents(aE.get(au)));}else{aE=new aa.SchedulerEvent(aE);aC.push(aE);}}if(G(A)){aE.set(K,A);}});return aC;},_setEvents:function(aC){var A=this;return A._normalizeEvents(aC);}});aa.SchedulerEventSupport=J;var F=aa.Component.create({NAME:r,ATTRS:{activeView:{validator:s},eventRecorder:{setter:"_setEventRecorder"},strings:{value:{day:"Day",month:"Month",today:"Today",week:"Week",year:"Year"}},navigationDateFormat:{getter:function(aD){var A=this;var aC=A.get(E);if(aC){return aC.get(am);}return aD;},value:"%A - %d %b %Y",validator:at},views:{setter:"_setViews",value:[]},currentDate:{valueFn:function(){return new Date();},validator:d},firstDayOfWeek:{value:0,validator:H},controlsNode:{valueFn:function(){return aa.Node.create(aj);}},currentDateNode:{valueFn:function(){return aa.Node.create(w);}},headerNode:{valueFn:function(){return aa.Node.create(c);}},iconNextNode:{valueFn:function(){return aa.Node.create(aB);}},iconPrevNode:{valueFn:function(){return aa.Node.create(ad);}},navNode:{valueFn:function(){return aa.Node.create(k);}},todayNode:{valueFn:function(){return aa.Node.create(this._processTemplate(P));}},viewsNode:{valueFn:function(){return aa.Node.create(I);}}},HTML_PARSER:{controlsNode:S+al,currentDateNode:S+R,headerNode:S+f,iconNextNode:S+T,iconPrevNode:S+B,navNode:S+aw,todayNode:S+x,viewsNode:S+q},UI_ATTRS:[Z],AUGMENTS:[aa.SchedulerEventSupport,aa.WidgetStdMod],prototype:{viewStack:null,initializer:function(){var A=this;A[M]={};A[ah]=A.get(ah);A[W]=A.get(W);A[v]=A.get(aq);A[j]=A.get(j);A[an]=A.get(an);A[L]=A.get(L);A[ab]=A.get(ab);A[V]=A.get(V);A.after({activeViewChange:A._afterActiveViewChange,render:A._afterRender});},bindUI:function(){var A=this;A._bindDelegate();},syncUI:function(){var A=this;A.syncStdContent();},flushEvents:function(){var A=this;aa.Array.each(A.get(au),function(aC){aC.eachRepeatedEvent(function(aD){delete aD._filtered;});delete aC._filtered;});},getEventsByDay:function(aC,aD){var A=this;aC=h.safeClearTime(aC);return A._getEvents(aC,function(aE){return h.compare(aE.getClearStartDate(),aC)||(aD&&h.compare(aE.getClearEndDate(),aC));});},getIntersectEvents:function(aC){var A=this;aC=h.safeClearTime(aC);return A._getEvents(aC,function(aE){var aD=aE.getClearStartDate();var aF=aE.getClearEndDate();return(h.compare(aC,aD)||h.compare(aC,aF)||h.between(aC,aD,aF));});},sortEventsByDateAsc:function(aC){var A=this;aC.sort(function(aG,aE){var aF=aG.get(ae);var aD=aE.get(ae);var aI=aG.get(av);var aH=aE.get(av);if(h.after(aI,aH)||(h.compare(aI,aH)&&h.before(aF,aD))){return 1;}else{return -1;}});},getViewByName:function(aC){var A=this;return A[M][aC];},getStrings:function(){var A=this;return A.get(C);},getString:function(aC){var A=this;return A.getStrings()[aC];},renderView:function(aC){var A=this;if(aC){aC.show();if(!aC.get(ay)){if(!A.bodyNode){A.setStdModContent(U.BODY,o);}aC.render(A.bodyNode);}}},plotViewEvents:function(aC){var A=this;aC.plotEvents(A.get(au));},syncEventsUI:function(){var A=this;A.plotViewEvents(A.get(E));},_afterActiveViewChange:function(aE){var aC=this;if(aC.get(ay)){var aD=aE.newVal;var A=aE.prevVal;if(A){A.hide();}aC.renderView(aD);}},_afterRender:function(aC){var A=this;A.renderView(A.get(E));},_bindDelegate:function(){var A=this;A[V].delegate("click",A._onClickViewTrigger,S+X,A);A[ah].delegate("click",A._onClickPrevIcon,S+B,A);A[ah].delegate("click",A._onClickNextIcon,S+T,A);A[ah].delegate("click",A._onClickToday,S+x,A);},_createViewTriggerNode:function(aC){var A=this;if(!aC.get(u)){var aD=aC.get(l);aC.set(u,aa.Node.create(N.sub(ao,{name:aD,label:(A.getString(aD)||aD)})));}return aC.get(u);},_getEvents:function(aC,aF){var A=this;var aE=A.get(au);var aD=[];aa.Array.each(aE,function(aG){if(aF.apply(A,[aG])){aD.push(aG);}else{if(aG.isRepeatableDate(aC)){var aH=aG.repeatByDate(aC);
aD.push(aH);}}});A.sortEventsByDateAsc(aD);return aD;},_onClickToday:function(aC){var A=this;A.set(Z,A.get(E).getToday());aC.preventDefault();},_onClickNextIcon:function(aC){var A=this;A.set(Z,A.get(E).get(b));aC.preventDefault();},_onClickPrevIcon:function(aC){var A=this;A.set(Z,A.get(E).get(ai));aC.preventDefault();},_onClickViewTrigger:function(aC){var A=this;var aD=aC.currentTarget.attr(af);A.set(E,A.getViewByName(aD));aC.preventDefault();},_processTemplate:function(aC){var A=this;return N.sub(aC,A.getStrings());},_setEventRecorder:function(aC){var A=this;if(aC){aC.set(K,A);}},_setViews:function(aD){var A=this;var aC=[];aa.Array.each(aD,function(aE){if(s(aE)&&!aE.get(ay)){aE.set(K,A);aC.push(aE);A[M][aE.get(l)]=aE;}});if(!A.get(E)){A.set(E,aD[0]);}return aC;},syncStdContent:function(){var A=this;var aC=A.get(aA);A[L].append(A[an]);A[L].append(A[j]);A[ah].append(A[ab]);A[ah].append(A[L]);A[ah].append(A[W]);aa.Array.each(aC,function(aD){A[V].append(A._createViewTriggerNode(aD));});A[v].append(A[ah]);A[v].append(A[V]);A[v].addClass(ac);A.setStdModContent(U.HEADER,A[v].getDOM());},_uiSetCurrentDate:function(aE){var A=this;var aD=aa.DataType.Date.format(aE,{format:A.get(am),locale:A.get(ax)});A[W].html(aD);if(A.get(ay)){var aC=A.get(E);if(aC){aC._uiSetCurrentDate(aE);}A.syncEventsUI();}}}});aa.Scheduler=F;},"@VERSION@",{skinnable:true,requires:["aui-scheduler-view","datasource"]});