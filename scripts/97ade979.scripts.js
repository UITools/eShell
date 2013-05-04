"use strict";var App=angular.module("eShellApp",[]);App.config(["$routeProvider",function(t){t.when("/1",{templateUrl:"views/fib.html",controller:"FibCtrl"}).otherwise({redirectTo:"/1"})}]),App.controller("FibCtrl",["$scope","eywa","checker",function(t,e,r){e.worship("data/fib.json").then(function(e){t.data=e.data}),t.validate=function(t){r.setProperty("isSubmit",t)},t.setClass=function(t){return angular.isDefined(t)?t===!0?"success":"error":""},t.submit=function(){var e,n=0,i=r.getProperty("attempt")>=r.getProperty("totalAttempts");t.data.choices.forEach(function(r,i){e=-1!==r.val2.split(",").indexOf(t["input_"+i]),e&&n++,t["input_"+i+"_valid"]=e,t["input_"+i+"_readonly"]=!0}),r.setProperty("isTryagain",n!==t.data.choices.length&&!i),r.setProperty("isShowans",n!==t.data.choices.length&&i),r.setProperty("isSubmit",!1)},t.tryagain=function(){t.data.choices.forEach(function(e,r){t["input_"+r+"_valid"]||(t["input_"+r+"_valid"]=void 0,t["input_"+r+"_readonly"]=!1,t["input_"+r]="")}),r.setProperty("isTryagain",!1),r.setProperty("attempt",r.getProperty("attempt")+1)},t.showans=function(){t.data.choices.forEach(function(e,r){t["input_"+r+"_valid"]||(t["input_"+r+"_valid"]=!0,t["input_"+r+"_readonly"]=!0,t["input_"+r]=e.val2.split(",")[0])}),r.setProperty("isShowans",!1)},r.reset(t)}]),App.directive("parseBracket",["$compile",function(t){return{restrict:"A",link:function(e,r,n){n.$observe("parseBracket",function(n){if(""===n)return!1;var i=angular.fromJson(n),o="<div>"+i.text+"</div>";angular.isDefined(i.choices)&&i.choices.forEach(function(t,e){o=o.replace(RegExp(t.val1.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),"g"),'<span class="control-group" ng-class="setClass(input_'+e+'_valid)">'+'<input type="text" '+'class="input-medium" '+'autocorrect="off" '+'autocapitalize="off" '+'autocomplete="off" '+'ng-change="validate(frmFIB.$valid)" '+'ng-readonly="input_'+e+'_readonly" '+'ng-model="input_'+e+'"'+"required />"+"</span>")}),r.html(o),t(r.contents())(e)})}}}]),App.factory("eywa",["$http",function(t){return{worship:function(e){return t.get(e)}}}]),App.factory("checker",["$location",function(t){return{isSubmit:!1,isTryagain:!1,isShowans:!1,attempt:1,totalAttempts:3,currentTemplate:1,totalTemplates:1,submit:function(){},tryagain:function(){},showAns:function(){},getProperty:function(t){return this[t]},setProperty:function(t,e){this[t]=e},invoke:function(t){this[t]()},reset:function(e){this.setProperty("isSubmit",!1),this.setProperty("isTryagain",!1),this.setProperty("isShowans",!1),this.setProperty("submit",e.submit),this.setProperty("tryagain",e.tryagain),this.setProperty("showans",e.showans),this.setProperty("attempt",1),this.setProperty("currentTemplate",parseInt(t.path().substring(1),!1))}}}]),App.controller("FooterCtrl",["$scope","checker","$location",function(t,e,r){t.isEnable=function(t){return e.getProperty(t)},t.invoke=function(t){e.invoke(t)},t.attempt=function(){return e.getProperty("attempt")},t.totalAttempts=function(){return e.getProperty("totalAttempts")},t.currentTemplate=function(){return e.getProperty("currentTemplate")},t.totalTemplates=function(){return e.getProperty("totalTemplates")},t.prevTemplate=function(){r.path("/"+(e.getProperty("currentTemplate")-1))},t.nextTemplate=function(){r.path("/"+(e.getProperty("currentTemplate")+1))}}]);