"use strict";function t(){var t=wx.getSystemInfoSync().windowWidth,i=750/t;return t-Math.ceil(152/i)-20}function i(t){for(var i=Object.create(null),e=t.split(","),s=e.length;s--;)i[e[s]]=!0;return i}function e(t,i){for(var e=t.indexOf("&");-1!==e;){var s=t.indexOf(";",e+3),a=void 0;if(-1===s)break;"#"===t[e+1]?(a=parseInt(("x"===t[e+2]?"0":"")+t.substring(e+2,s)),isNaN(a)||(t=t.substr(0,e)+String.fromCharCode(a)+t.substr(s+1))):(a=t.substring(e+1,s),(r.entities[a]||"amp"===a&&i)&&(t=t.substr(0,e)+(r.entities[a]||"&")+t.substr(s+1))),e=t.indexOf("&",e+1)}return t}function s(t){for(var i=t.length-1,e=i;e>=-1;e--)(-1===e||t[e].c||!t[e].name||"div"!==t[e].name&&"p"!==t[e].name&&"h"!==t[e].name[0]||(t[e].attrs.style||"").includes("inline"))&&(i-e>=5&&t.splice(e+1,i-e,{name:"div",attrs:{},children:t.slice(e+1,i+1)}),i=e-1)}function a(t){this.options=t.data||{},this.tagStyle=Object.assign({},r.tagStyle,this.options.tagStyle),this.imgList=t.imgList||[],this.imgList._unloadimgs=0,this.plugins=t.plugins||[],this.attrs=Object.create(null),this.stack=[],this.nodes=[],this.pre=(this.options.containerStyle||"").includes("white-space")&&this.options.containerStyle.includes("pre")?2:0}function n(t){this.handler=t}var r={trustTags:i("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),blockTags:i("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),ignoreTags:i("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),voidTags:i("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),entities:{lt:"<",gt:">",quot:'"',apos:"'",ensp:" ",emsp:" ",nbsp:" ",semi:";",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…",larr:"←",uarr:"↑",rarr:"→",darr:"↓"},tagStyle:{address:"font-style:italic",big:"display:inline;font-size:1.2em",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",strike:"text-decoration:line-through",u:"text-decoration:underline"},svgDict:{animatetransform:"animateTransform",lineargradient:"linearGradient",viewbox:"viewBox",attributename:"attributeName",repeatcount:"repeatCount",repeatdur:"repeatDur"}},o={},h=wx.getSystemInfoSync(),l=h.windowWidth,c=h.system,d=i(" ,\r,\n,\t,\f"),p=0,u=t(),g={width:100,height:100};a.prototype.parse=function(t){for(var i=this.plugins.length;i--;)this.plugins[i].onUpdate&&(t=this.plugins[i].onUpdate(t,r)||t);for(new n(this).parse(t);this.stack.length;)this.popNode();return this.nodes.length>50&&s(this.nodes),this.nodes},a.prototype.expose=function(){for(var t=this.stack.length;t--;){var i=this.stack[t];if(i.c||"a"===i.name||"video"===i.name||"audio"===i.name)return;i.c=1}},a.prototype.hook=function(t){for(var i=this.plugins.length;i--;)if(this.plugins[i].onParse&&!1===this.plugins[i].onParse(t,this))return!1;return!0},a.prototype.getUrl=function(t){var i=this.options.domain;return"/"===t[0]?"/"===t[1]?t=(i?i.split("://")[0]:"http")+":"+t:i&&(t=i+t):!i||t.includes("data:")||t.includes("://")||(t=i+"/"+t),t},a.prototype.parseStyle=function(t){var i=t.attrs,e=i.alt,s=void 0===e?"":e,a=(this.tagStyle[t.name]||"").split(";").concat((i.style||"").split(";")),n={},r="";i.id&&!this.xml&&(this.options.useAnchor?this.expose():"img"!==t.name&&"a"!==t.name&&"video"!==t.name&&"audio"!==t.name&&(i.id=void 0)),i.width&&(n.width=parseFloat(i.width)+(i.width.includes("%")?"%":"px"),i.width=void 0),i.height&&(n.height=parseFloat(i.height)+(i.height.includes("%")?"%":"px"),i.height=void 0);var o=/#(\d+)px.*?#(\d+)px/.exec(s);if(o&&"img"===t.name){var h=Number(o[1]),c=Number(o[2]);h&&c&&(n.width=h+"px",n.height=c+"px"),h>=u&&(n.width=u+"px",n.height=Math.ceil(u*c/h)+"px")}for(var p=0,g=a.length;p<g;p++){var f=a[p].split(":");if(!(f.length<2)){var m=f.shift().trim().toLowerCase(),v=f.join(":").trim();if("-"===v[0]&&v.lastIndexOf("-")>0||v.includes("safe"))r+=";".concat(m,":").concat(v);else if(!n[m]||v.includes("import")||!n[m].includes("import")){if(v.includes("url")){var y=v.indexOf("(")+1;if(y){for(;'"'===v[y]||"'"===v[y]||d[v[y]];)y++;v=v.substr(0,y)+this.getUrl(v.substr(y))}}else v.includes("rpx")&&(v=v.replace(/[0-9.]+\s*rpx/g,function(t){return parseFloat(t)*l/750+"px"}));n[m]=v}}}return t.attrs.style=r,n},a.prototype.onTagName=function(t){this.tagName=this.xml?t:t.toLowerCase(),"svg"===this.tagName&&(this.xml=(this.xml||0)+1,r.ignoreTags.style=void 0)},a.prototype.onAttrName=function(t){t=this.xml?t:t.toLowerCase(),"data-"===t.substr(0,5)?"data-src"!==t||this.attrs.src?"img"===this.tagName||"a"===this.tagName?this.attrName=t:this.attrName=void 0:this.attrName="src":(this.attrName=t,this.attrs[t]="T")},a.prototype.onAttrVal=function(t){var i=this.attrName||"";"style"===i||"href"===i?this.attrs[i]=e(t,!0):i.includes("src")?this.attrs[i]=this.getUrl(e(t,!0)):i&&(this.attrs[i]=t)},a.prototype.onOpenTag=function(t){var i=Object.create(null);i.name=this.tagName,i.attrs=this.attrs,this.attrs=Object.create(null);var e=i.attrs,s=this.stack[this.stack.length-1],a=s?s.children:this.nodes,n=this.xml?t:r.voidTags[i.name];if(o[i.name]&&(e.class=o[i.name]+(e.class?" "+e.class:"")),"embed"===i.name){var h=e.src||"";h.includes(".mp4")||h.includes(".3gp")||h.includes(".m3u8")||(e.type||"").includes("video")?i.name="video":(h.includes(".mp3")||h.includes(".wav")||h.includes(".aac")||h.includes(".m4a")||(e.type||"").includes("audio"))&&(i.name="audio"),e.autostart&&(e.autoplay="T"),e.controls="T"}if("video"!==i.name&&"audio"!==i.name||("video"!==i.name||e.id||(e.id="v"+p++),e.controls||e.autoplay||(e.controls="T"),i.src=[],e.src&&(i.src.push(e.src),e.src=void 0),this.expose()),n){if(!this.hook(i)||r.ignoreTags[i.name])return void("base"!==i.name||this.options.domain?"source"===i.name&&s&&("video"===s.name||"audio"===s.name)&&e.src&&s.src.push(e.src):this.options.domain=e.href);var c=this.parseStyle(i);if("img"===i.name){if(e.src&&(e.src.includes("webp")&&(i.webp="T"),e.src.includes("data:")&&!e["original-src"]&&(e.ignore="T"),!e.ignore||i.webp||e.src.includes("cloud://"))){for(var d=this.stack.length;d--;){var u=this.stack[d];"table"!==u.name||i.webp||e.src.includes("cloud://")||(!c.display||c.display.includes("inline")?i.t="inline-block":i.t=c.display,c.display=void 0);var f=u.attrs.style||"";if(!f.includes("flex:")||f.includes("flex:0")||f.includes("flex: 0")||c.width&&!(parseInt(c.width)>100))if(f.includes("flex")&&"100%"===c.width)for(var m=d+1;m<this.stack.length;m++){var v=this.stack[m].attrs.style||"";if(!v.includes(";width")&&!v.includes(" width")&&0!==v.indexOf("width")){c.width="";break}}else f.includes("inline-block")&&(c.width&&"%"===c.width[c.width.length-1]?(u.attrs.style+=";max-width:"+c.width,c.width=""):u.attrs.style+=";max-width:100%");else{c.width="100% !important",c.height="";for(var y=d+1;y<this.stack.length;y++)this.stack[y].attrs.style=(this.stack[y].attrs.style||"").replace("inline-","")}"a"===u.name?i.a=u.attrs:u.c=1}i.i=this.imgList.length;var x=e["original-src"]||e.src;if(this.imgList.includes(x)){var b=x.indexOf("://");if(-1!==b){b+=3;for(var w=x.substr(0,b);b<x.length&&"/"!==x[b];b++)w+=Math.random()>.5?x[b].toUpperCase():x[b];w+=x.substr(b),x=w}}this.imgList.push(x),i.t||(this.imgList._unloadimgs+=1)}"inline"===c.display&&(c.display=""),e.ignore&&(c["max-width"]=c["max-width"]||"100%",e.style+=";-webkit-touch-callout:none");var k=parseInt(c.width),N=parseInt(c.height);k>l&&(c.height=void 0),isNaN(k)||(i.w="T"),!isNaN(N)&&(!c.height.includes("%")||s&&(s.attrs.style||"").includes("height"))&&(i.h="T");var T=g.width,O=g.height;k>=T&&N>=O&&(i.imgCanLoading="true")}else if("svg"===i.name)return a.push(i),this.stack.push(i),void this.popNode();for(var C in c)c[C]&&(e.style+=";".concat(C,":").concat(c[C].replace(" !important","")));e.style=e.style.substr(1)||void 0}else("pre"===i.name||(e.style||"").includes("white-space")&&e.style.includes("pre"))&&2!==this.pre&&(this.pre=i.pre=1),i.children=[],this.stack.push(i);a.push(i)},a.prototype.onCloseTag=function(t){t=this.xml?t:t.toLowerCase();var i;for(i=this.stack.length;i--&&this.stack[i].name!==t;);if(-1!==i)for(;this.stack.length>i;)this.popNode();else if("p"===t||"br"===t){var e=this.stack.length?this.stack[this.stack.length-1].children:this.nodes;e.push({name:t,attrs:{class:o[t],style:this.tagStyle[t]}})}},a.prototype.popNode=function(){var t=this.stack.pop(),i=t.attrs,e=t.children,a=this.stack[this.stack.length-1],n=a?a.children:this.nodes;if(!this.hook(t)||r.ignoreTags[t.name])return"title"===t.name&&e.length&&"text"===e[0].type&&this.options.setTitle&&wx.setNavigationBarTitle({title:e[0].text}),void n.pop();if(t.pre&&2!==this.pre){this.pre=t.pre=void 0;for(var o=this.stack.length;o--;)this.stack[o].pre&&(this.pre=1)}if("svg"===t.name){if(this.xml>1)return void this.xml--;var h="",c=i.style;return i.style="",i.xmlns="http://www.w3.org/2000/svg",function t(i){if("text"===i.type)return void(h+=i.text);var e=r.svgDict[i.name]||i.name;h+="<"+e;for(var s in i.attrs){var a=i.attrs[s];a&&(h+=" ".concat(r.svgDict[s]||s,'="').concat(a,'"'))}if(i.children){h+=">";for(var n=0;n<i.children.length;n++)t(i.children[n]);h+="</"+e+">"}else h+="/>"}(t),t.name="img",t.attrs={src:"data:image/svg+xml;utf8,"+h.replace(/#/g,"%23"),style:c,ignore:"T"},t.children=void 0,this.xml=!1,void(r.ignoreTags.style=!0)}var d={};if(i.align&&("table"===t.name?"center"===i.align?d["margin-inline-start"]=d["margin-inline-end"]="auto":d.float=i.align:d["text-align"]=i.align,i.align=void 0),i.dir&&(d.direction=i.dir,i.dir=void 0),"font"===t.name&&(i.color&&(d.color=i.color,i.color=void 0),i.face&&(d["font-family"]=i.face,i.face=void 0),i.size)){var p=parseInt(i.size);isNaN(p)||(p<1?p=1:p>7&&(p=7),d["font-size"]=["x-small","small","medium","large","x-large","xx-large","xxx-large"][p-1]),i.size=void 0}if((i.class||"").includes("align-center")&&(d["text-align"]="center"),Object.assign(d,this.parseStyle(t)),"table"!==t.name&&parseInt(d.width)>l&&(d["max-width"]="100%",d["box-sizing"]="border-box"),r.blockTags[t.name])t.name="div";else if(r.trustTags[t.name]||this.xml)if("a"===t.name||"ad"===t.name)t.children.forEach(function(t){"text"===t.type&&(t.aStyle="color:#2D77E5")}),this.expose();else if("video"===t.name||"audio"===t.name)(d.height||"").includes("auto")&&(d.height=void 0),t.children=void 0;else if("ul"!==t.name&&"ol"!==t.name||!t.c){if("table"===t.name){var u=parseFloat(i.cellpadding),g=parseFloat(i.cellspacing),f=parseFloat(i.border),m=d["border-color"],v=d["border-style"];if(t.c&&(isNaN(u)&&(u=2),isNaN(g)&&(g=2)),f&&(i.style+=";border:".concat(f,"px ").concat(v||"solid"," ").concat(m||"gray")),t.flag&&t.c){t.flag=void 0,d.display="grid",g?(d["grid-gap"]=g+"px",d.padding=g+"px"):f&&(i.style+=";border-left:0;border-top:0");var y=[],x=[],b=[],w={};!function t(i){for(var e=0;e<i.length;e++)"tr"===i[e].name?x.push(i[e]):t(i[e].children||[])}(e);for(var k=1;k<=x.length;k++){for(var N=1,T=0;T<x[k-1].children.length;T++){var O=x[k-1].children[T];if("td"===O.name||"th"===O.name){for(;w[k+"."+N];)N++;O.c=1;var C=O.attrs.style||"",S=C.indexOf("width")?C.indexOf(";width"):0;if(-1!==S){var I=C.indexOf(";",S+6);-1===I&&(I=C.length),O.attrs.colspan||(y[N]=C.substring(S?S+7:6,I)),C=C.substr(0,S)+C.substr(I)}if(C+=";display:flex",-1!==(S=C.indexOf("vertical-align"))){var L=C.substr(S+15,10);L.includes("middle")?C+=";align-items:center":L.includes("bottom")&&(C+=";align-items:flex-end")}else C+=";align-items:center";if(-1!==(S=C.indexOf("text-align"))){var j=C.substr(S+11,10);j.includes("center")?C+=";justify-content: center":j.includes("right")&&(C+=";justify-content: right")}if(C=(f?";border:".concat(f,"px ").concat(v||"solid"," ").concat(m||"gray")+(g?"":";border-right:0;border-bottom:0"):"")+(u?";padding:".concat(u,"px"):"")+";"+C,O.attrs.colspan&&(C+=";grid-column-start:".concat(N,";grid-column-end:").concat(N+parseInt(O.attrs.colspan)),O.attrs.rowspan||(C+=";grid-row-start:".concat(k,";grid-row-end:").concat(k+1)),N+=parseInt(O.attrs.colspan)-1),O.attrs.rowspan){C+=";grid-row-start:".concat(k,";grid-row-end:").concat(k+parseInt(O.attrs.rowspan)),O.attrs.colspan||(C+=";grid-column-start:".concat(N,";grid-column-end:").concat(N+1));for(var A=1;A<O.attrs.rowspan;A++)for(var z=0;z<(O.attrs.colspan||1);z++)w[k+A+"."+(N-z)]=1}C&&(O.attrs.style=C),b.push(O),N++}}if(1===k){for(var q="",U=1;U<N;U++)q+=(y[U]?y[U]:"auto")+" ";d["grid-template-columns"]=q}}t.children=b}else t.c&&(d.display="table"),isNaN(g)||(d["border-spacing"]=g+"px"),(f||u||t.c)&&function i(e){for(var s=0;s<e.length;s++){var a=e[s];t.c&&(a.c=1),"th"===a.name||"td"===a.name?(f&&(a.attrs.style="border:".concat(f,"px ").concat(v||"solid"," ").concat(m||"gray",";").concat(a.attrs.style||"")),u&&(a.attrs.style="padding:".concat(u,"px;").concat(a.attrs.style||""))):a.children&&i(a.children)}}(e);if(this.options.scrollTable&&!(i.style||"").includes("inline")){var F=Object.assign({},t);t.name="div",t.attrs={style:"overflow-x:auto;padding:1px"},t.children=[F],i=F.attrs}}else if("td"!==t.name&&"th"!==t.name||!i.colspan&&!i.rowspan){if("ruby"===t.name){t.name="span";for(var V=0;V<e.length-1;V++)"text"===e[V].type&&"rt"===e[V+1].name&&(e[V]={name:"span",attrs:{style:"display:inline-block;text-align:center"},children:[{name:"div",attrs:{style:"font-size:50%;"+(e[V+1].attrs.style||"")},children:e[V+1].children},e[V]]},e.splice(V+1,1))}}else for(var D=this.stack.length;D--;)if("table"===this.stack[D].name){this.stack[D].flag=1;break}}else{var M={a:"lower-alpha",A:"upper-alpha",i:"lower-roman",I:"upper-roman"};M[i.type]&&(i.style+=";list-style-type:"+M[i.type],i.type=void 0),t.c=1;for(var B=e.length;B--;)"li"===e[B].name&&(e[B].c=1)}else t.name="span";if((d.display||"").includes("flex")&&!t.c)for(var E=e.length;E--;){var P=e[E];P.f&&(P.attrs.style=(P.attrs.style||"")+P.f,P.f=void 0)}var W=a&&((a.attrs.style||"").includes("flex")||(a.attrs.style||"").includes("grid"))&&!t.c&&!(d.display||"").includes("inline");W&&(t.f=";max-width:100%"),e.length>=50&&t.c&&!(d.display||"").includes("flex")&&s(e);for(var Z in d)if(d[Z]){var _=";".concat(Z,":").concat(d[Z].replace(" !important",""));W&&(Z.includes("flex")&&"flex-direction"!==Z||"align-self"===Z||Z.includes("grid")||"-"===d[Z][0]||Z.includes("width")&&_.includes("%"))?(t.f+=_,"width"===Z&&(i.style+=";width:100%")):i.style+=_}i.style=i.style.substr(1)||void 0},a.prototype.onText=function(t){if(!this.pre){for(var i,s="",a=0,n=t.length;a<n;a++)d[t[a]]?(" "!==s[s.length-1]&&(s+=" "),"\n"!==t[a]||i||(i=!0)):s+=t[a];if(" "===s&&i)return;t=s}var r=Object.create(null);if(r.type="text",r.text=e(t),this.hook(r)){"force"===this.options.selectable&&c.includes("iOS")&&!wx.canIUse("rich-text.user-select")&&this.expose();(this.stack.length?this.stack[this.stack.length-1].children:this.nodes).push(r)}},n.prototype.parse=function(t){this.content=t||"",this.i=0,this.start=0,this.state=this.text;for(var i=this.content.length;-1!==this.i&&this.i<i;)this.state()},n.prototype.checkClose=function(t){var i="/"===this.content[this.i];return!!(">"===this.content[this.i]||i&&">"===this.content[this.i+1])&&(t&&this.handler[t](this.content.substring(this.start,this.i)),this.i+=i?2:1,this.start=this.i,this.handler.onOpenTag(i),"script"===this.handler.tagName?(this.i=this.content.indexOf("</",this.i),-1!==this.i&&(this.i+=2,this.start=this.i),this.state=this.endTag):this.state=this.text,!0)},n.prototype.text=function(){if(this.i=this.content.indexOf("<",this.i),-1===this.i)return void(this.start<this.content.length&&this.handler.onText(this.content.substring(this.start,this.content.length)));var t=this.content[this.i+1];if(t>="a"&&t<="z"||t>="A"&&t<="Z")this.start!==this.i&&this.handler.onText(this.content.substring(this.start,this.i)),this.start=++this.i,this.state=this.tagName;else if("/"===t||"!"===t||"?"===t){this.start!==this.i&&this.handler.onText(this.content.substring(this.start,this.i));var i=this.content[this.i+2];if("/"===t&&(i>="a"&&i<="z"||i>="A"&&i<="Z"))return this.i+=2,this.start=this.i,void(this.state=this.endTag);var e="--\x3e";"!"===t&&"-"===this.content[this.i+2]&&"-"===this.content[this.i+3]||(e=">"),this.i=this.content.indexOf(e,this.i),-1!==this.i&&(this.i+=e.length,this.start=this.i)}else this.i++},n.prototype.tagName=function(){if(d[this.content[this.i]]){for(this.handler.onTagName(this.content.substring(this.start,this.i));d[this.content[++this.i]];);this.i<this.content.length&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)}else this.checkClose("onTagName")||this.i++},n.prototype.attrName=function(){var t=this.content[this.i];if(d[t]||"="===t){this.handler.onAttrName(this.content.substring(this.start,this.i));for(var i="="===t,e=this.content.length;++this.i<e;)if(t=this.content[this.i],!d[t]){if(this.checkClose())return;if(i)return this.start=this.i,void(this.state=this.attrVal);if("="!==this.content[this.i])return this.start=this.i,void(this.state=this.attrName);i=!0}}else this.checkClose("onAttrName")||this.i++},n.prototype.attrVal=function(){var t=this.content[this.i],i=this.content.length;if('"'===t||"'"===t){if(this.start=++this.i,this.i=this.content.indexOf(t,this.i),-1===this.i)return;this.handler.onAttrVal(this.content.substring(this.start,this.i))}else for(;this.i<i;this.i++){if(d[this.content[this.i]]){this.handler.onAttrVal(this.content.substring(this.start,this.i));break}if(this.checkClose("onAttrVal"))return}for(;d[this.content[++this.i]];);this.i<i&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)},n.prototype.endTag=function(){var t=this.content[this.i];if(d[t]||">"===t||"/"===t){if(this.handler.onCloseTag(this.content.substring(this.start,this.i)),">"!==t&&(this.i=this.content.indexOf(">",this.i),-1===this.i))return;this.start=++this.i,this.state=this.text}else this.i++},module.exports=a;