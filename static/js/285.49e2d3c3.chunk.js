"use strict";(self.webpackChunkspyfall=self.webpackChunkspyfall||[]).push([[285],{4285:function(e,i,n){n.r(i),n.d(i,{default:function(){return l}});var s=n(1413),c=n(885),t=n(2791),o=n(622),a=n(184),l=function(e){var i=e.playersList,n=e.onClickKick,l=e.isHost,r=e.hostUid,u=e.ongoingGame,d=e.minPlayerCount,m=e.spyCount,f=e.putToVote,h=e.uuid,p=e.isSpy,k=e.isMidGamePlayer,v=e.showJoinForm,x=(0,t.useState)(i),j=(0,c.Z)(x,2),y=j[0],C=j[1];return(0,t.useEffect)((function(){C(i)}),[i]),(0,a.jsxs)("div",{className:"names-list",children:[(0,a.jsx)("div",{className:"block-title",children:"Players"}),y.map((function(e,i){var c=e.uid===h;return(0,a.jsxs)("div",{className:"".concat(c?"itsI":""," ").concat(i===y.length-1?"last-item":"list-item"),children:[!u||k||v?(0,a.jsxs)("div",{className:"name-block",children:[(0,a.jsxs)("div",{children:[e.username,l&&!(e.uid===r)&&!u&&(0,a.jsx)(o.Z,{text:"Kick",colorOne:"#f06966",colorTwo:"#ca3e47",onClick:function(){return n(i)}})]}),(0,a.jsx)("div",{children:e.points})]}):(0,a.jsx)("div",{onClick:function(){return!c&&!p&&(i=e,void C((function(e){return e.map((function(e){return e.uid===i.uid?(0,s.Z)((0,s.Z)({},e),{},{checked:!i.checked}):e}))})));var i},className:"name-item ".concat(c||p?"":"pointer"," ").concat(e.checked?"line-through":""),children:e.username}),u&&!c&&!p&&!k&&!v&&(0,a.jsx)(o.Z,{text:"Put To Vote",colorOne:"#755bea",colorTwo:"#ff72c0",onClick:function(){return f(e)}})]},i)})),!u&&l&&(0,a.jsxs)("div",{className:"info-block",children:[(0,a.jsxs)("div",{className:"info-item",children:["minimum players: ",d]}),(0,a.jsxs)("div",{className:"info-item",children:[1===parseInt(m)?"spy: ":"spies: ",m]})]})]})}}}]);
//# sourceMappingURL=285.49e2d3c3.chunk.js.map