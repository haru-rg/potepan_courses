var MAF_CROSS=[];function mafcross(t){Array.isArray(t)&&(MAF_CROSS=t),("string"==typeof t||t instanceof String)&&(MAF_CROSS=[t])}!function(){"use strict";var t,e,n,i={COOKIE_MAX_LENGTH:2e3,COOKIE_ELEMENT_DELIMITER:"-",COOKIE_KEYVALUE_DELIMITER:"_",COOKIE_VALUEPARTS_DELIMITER:".",c_prefix:"MDK_",c_expires:365,param_key:"maf"},o={_config:{},set config(t){this._config=t},_cookieName:function(){return this._config.c_prefix+this._config.param_key},_getMaftagUrlParam:function(){var t=this._config.param_key,e=function(){var t=location.search.substring(1),e=[];if(t)for(var n=t.split("&"),i=0;i<n.length;i++){var o=n[i].split("=");e[o[0]]=o[1]}return e}();return!!e.hasOwnProperty(t)&&e[t]},_validateNumber:function(t){return void 0!==t&&-1!==t.search(/^[0-9]+$/)},_validateMaftagUrlParam:function(){var t=this._getNewValue(),e=this._getPromotionArray(t);if(e.length<=0)return!1;for(var n=0;n<e.length;n++){var i=e[n].split(this._config.COOKIE_KEYVALUE_DELIMITER);if(i.length<2||!this._validateNumber(i[0]))return!1;var o=i[1].split(this._config.COOKIE_VALUEPARTS_DELIMITER);if(!(this._validateNumber(o[0])&&this._validateNumber(o[1])&&this._validateNumber(o[4])&&this._validateNumber(o[5])))return!1}return!0},_getOldCookie:function(){return a(this._cookieName())},_getOldStorage:function(){return s(this._cookieName())},_getNewValue:function(){return decodeURIComponent(this._getMaftagUrlParam())},_getPromotionArray:function(t){return t?t.split(this._config.COOKIE_ELEMENT_DELIMITER):[]},_getValuePromotionId:function(t){var e=t.split(this._config.COOKIE_KEYVALUE_DELIMITER);return!!e[0]&&e[0]},_getPromotionIds:function(t){var e=[];for(var n in t)if(t.hasOwnProperty(n)){var i=this._getValuePromotionId(t[n]);i&&e.push(i)}return e},_getOldPromotionIds:function(){var t=this._getPromotionArray(this._getOldCookie());return this._getPromotionIds(t)},_getValuePromotionIds:function(t){var e=this._getPromotionArray(t);return this._getPromotionIds(e)},_getSettingPromotionIds:function(t,e){var n=this._getValuePromotionIds(t),i=this._getValuePromotionIds(e);if(0<i.length)for(var o=0;o<i.length;o++){var r=n.indexOf(i[o]);-1!==r&&delete n[r]}return t&&t.length>this._config.COOKIE_MAX_LENGTH&&n.shift(),n},_getSettingValue:function(t,e){var n="",i=this._getPromotionArray(t),o=this._getSettingPromotionIds(t,e);for(var r in i)if(i.hasOwnProperty(r)){var a=i[r].split(this._config.COOKIE_KEYVALUE_DELIMITER);if(!a[0])continue;if(-1===o.indexOf(a[0]))continue;n&&(n+=this._config.COOKIE_ELEMENT_DELIMITER),n+=i[r]}return n&&(n+=this._config.COOKIE_ELEMENT_DELIMITER),n+=e},_getSettingCookie:function(){return this._getSettingValue(this._getOldCookie(),this._getNewValue())},_getSettingStorage:function(){return this._getSettingValue(this._getOldStorage(),this._getNewValue())},setMaftagCookie:function(){if(0===Object.keys(this._config).length)return!1;if(this._validateMaftagUrlParam()){var t=this._getSettingCookie();t&&function(t,e,n){if(!t||!e)return;var i=(new Date).getTime(),o=new Date(i+864e5*n).toUTCString(),r=function(t){if(!t)return!1;var e=t.match(/^(.*?)([a-z0-9][a-z0-9\-]{1,61}[a-z0-9]\.[a-z.]{2,6})[:[0-9]*]?([/].*?)?$/i);return null!==e&&"."+e[2]}(document.domain),a="";a+=t+"="+encodeURIComponent(e)+";",a+=" domain="+r+";",a+=" path=/;",n&&(a+="; expires="+o+"; ");document.cookie=a}(this._cookieName(),t,this._config.c_expires)}},setMaftagStorage:function(){if(0===Object.keys(this._config).length)return!1;if(!function(){try{return localStorage.setItem("x","x"),localStorage.removeItem("x"),!0}catch(t){return console.log("Not Available LocalStorage."),!1}}())return!1;if(this._validateMaftagUrlParam()){var t=this._getSettingStorage();t&&localStorage.setItem(this._cookieName(),JSON.stringify(t))}}},r={_config:{},set config(t){this._config=t},_cookieName:function(){return this._config.c_prefix+this._config.param_key},_getMafParamValue:function(){var t=a(this._cookieName());return t||(t=s(this._cookieName())),t},_addMafParamUrl:function(t){var e,n,i=this._getMafParamValue();if(!i)return t;var o=t.match(/(.*)(?!#!)(?=#)(.*)/);o?(e=o[1],n=o[2]):(e=t,n="");var r=e.match(/(.*)(?=\?)(.*)/);return null!=r&&void 0!==r[2]&&0<r[2].indexOf(this._config.param_key+"=")?t:e+(r?"&":"?")+("maf="+encodeURIComponent(i))+n},_isCrossFqdn:function(){return this._config.CROSS_FQDN&&0<this._config.CROSS_FQDN.length},_isCrossTarget:function(t){var e=function(t){if(!t)return!1;var e=t.match(/^https?:\/\/(.*?)([a-z0-9][a-z0-9\-]{1,61}[a-z0-9]\.[a-z.]{2,6})[:[0-9]*]?([/].*?)?$/i);return null!==e&&e[1]+e[2]}(t);return e!==document.domain&&-1!==this._config.CROSS_FQDN.indexOf(e)},_addParamMaf:function(t){var e;if("click"===t.type.toLowerCase()&&"a"===t.target.tagName.toLowerCase()){if(e=t.target.href,!this._isCrossTarget(e))return;t.target.href=this._addMafParamUrl(e)}if("submit"===t.type.toLowerCase()&&"form"===t.target.tagName.toLowerCase()){if(e=t.target.action,!this._isCrossTarget(e))return;t.target.action=this._addMafParamUrl(e)}},crossDomain:function(t){this._isCrossFqdn()&&this._addParamMaf(t)}};function a(t){var e=null,n=t+"=",i=document.cookie,o=i.indexOf(n);if(-1!==o){var r=o+n.length,a=i.indexOf(";",r);-1===a&&(a=i.length),e=decodeURIComponent(i.substring(r,a))}return e}function s(t){var e=null,n=null;try{n=localStorage.getItem(t)}catch(t){console.log("Not Available LocalStorage.")}return n&&(e=JSON.parse(n)),e}(function(){if(!window.hasOwnProperty("dataLayer"))return!1;for(var t=window.dataLayer,e=0;e<t.length;e++)if(t[e].hasOwnProperty("event")&&"gtm.dom"===t[e].event)return!0;return!1})()&&(o.config=i,o.setMaftagCookie(),o.setMaftagStorage()),t=function(){o.config=i,o.setMaftagCookie(),o.setMaftagStorage()},document.addEventListener?document.addEventListener("DOMContentLoaded",t,!1):document.attachEvent?document.attachEvent("onreadystatechange",t):document.onreadystatechange=t,e=function(t){i.CROSS_FQDN=MAF_CROSS,r.config=i,r.crossDomain(t)},document.addEventListener?document.addEventListener("click",e,!1):document.attachEvent?document.attachEvent("onclick",e):document.onclick=e,n=function(t){i.CROSS_FQDN=MAF_CROSS,r.config=i,r.crossDomain(t)},document.addEventListener?document.addEventListener("submit",n,!1):document.attachEvent?document.attachEvent("onsubmit",n):document.onsubmit=n}();MAF_CROSS=[];function mafcross(t){Array.isArray(t)&&(MAF_CROSS=t),("string"==typeof t||t instanceof String)&&(MAF_CROSS=[t])}!function(){"use strict";var t,e,n,i={COOKIE_MAX_LENGTH:2e3,COOKIE_ELEMENT_DELIMITER:"-",COOKIE_KEYVALUE_DELIMITER:"_",COOKIE_VALUEPARTS_DELIMITER:".",c_prefix:"MDK_",c_expires:365,param_key:"maf"},o={_config:{},set config(t){this._config=t},_cookieName:function(){return this._config.c_prefix+this._config.param_key},_getMaftagUrlParam:function(){var t=this._config.param_key,e=function(){var t=location.search.substring(1),e=[];if(t)for(var n=t.split("&"),i=0;i<n.length;i++){var o=n[i].split("=");e[o[0]]=o[1]}return e}();return!!e.hasOwnProperty(t)&&e[t]},_validateNumber:function(t){return void 0!==t&&-1!==t.search(/^[0-9]+$/)},_validateMaftagUrlParam:function(){var t=this._getNewValue(),e=this._getPromotionArray(t);if(e.length<=0)return!1;for(var n=0;n<e.length;n++){var i=e[n].split(this._config.COOKIE_KEYVALUE_DELIMITER);if(i.length<2||!this._validateNumber(i[0]))return!1;var o=i[1].split(this._config.COOKIE_VALUEPARTS_DELIMITER);if(!(this._validateNumber(o[0])&&this._validateNumber(o[1])&&this._validateNumber(o[4])&&this._validateNumber(o[5])))return!1}return!0},_getOldCookie:function(){return a(this._cookieName())},_getOldStorage:function(){return s(this._cookieName())},_getNewValue:function(){return decodeURIComponent(this._getMaftagUrlParam())},_getPromotionArray:function(t){return t?t.split(this._config.COOKIE_ELEMENT_DELIMITER):[]},_getValuePromotionId:function(t){var e=t.split(this._config.COOKIE_KEYVALUE_DELIMITER);return!!e[0]&&e[0]},_getPromotionIds:function(t){var e=[];for(var n in t)if(t.hasOwnProperty(n)){var i=this._getValuePromotionId(t[n]);i&&e.push(i)}return e},_getOldPromotionIds:function(){var t=this._getPromotionArray(this._getOldCookie());return this._getPromotionIds(t)},_getValuePromotionIds:function(t){var e=this._getPromotionArray(t);return this._getPromotionIds(e)},_getSettingPromotionIds:function(t,e){var n=this._getValuePromotionIds(t),i=this._getValuePromotionIds(e);if(0<i.length)for(var o=0;o<i.length;o++){var r=n.indexOf(i[o]);-1!==r&&delete n[r]}return t&&t.length>this._config.COOKIE_MAX_LENGTH&&n.shift(),n},_getSettingValue:function(t,e){var n="",i=this._getPromotionArray(t),o=this._getSettingPromotionIds(t,e);for(var r in i)if(i.hasOwnProperty(r)){var a=i[r].split(this._config.COOKIE_KEYVALUE_DELIMITER);if(!a[0])continue;if(-1===o.indexOf(a[0]))continue;n&&(n+=this._config.COOKIE_ELEMENT_DELIMITER),n+=i[r]}return n&&(n+=this._config.COOKIE_ELEMENT_DELIMITER),n+=e},_getSettingCookie:function(){return this._getSettingValue(this._getOldCookie(),this._getNewValue())},_getSettingStorage:function(){return this._getSettingValue(this._getOldStorage(),this._getNewValue())},setMaftagCookie:function(){if(0===Object.keys(this._config).length)return!1;if(this._validateMaftagUrlParam()){var t=this._getSettingCookie();t&&function(t,e,n){if(!t||!e)return;var i=(new Date).getTime(),o=new Date(i+864e5*n).toUTCString(),r=function(t){if(!t)return!1;var e=t.match(/^(.*?)([a-z0-9][a-z0-9\-]{1,61}[a-z0-9]\.[a-z.]{2,6})[:[0-9]*]?([/].*?)?$/i);return null!==e&&"."+e[2]}(document.domain),a="";a+=t+"="+encodeURIComponent(e)+";",a+=" domain="+r+";",a+=" path=/;",n&&(a+="; expires="+o+"; ");document.cookie=a}(this._cookieName(),t,this._config.c_expires)}},setMaftagStorage:function(){if(0===Object.keys(this._config).length)return!1;if(!function(){try{return localStorage.setItem("x","x"),localStorage.removeItem("x"),!0}catch(t){return console.log("Not Available LocalStorage."),!1}}())return!1;if(this._validateMaftagUrlParam()){var t=this._getSettingStorage();t&&localStorage.setItem(this._cookieName(),JSON.stringify(t))}}},r={_config:{},set config(t){this._config=t},_cookieName:function(){return this._config.c_prefix+this._config.param_key},_getMafParamValue:function(){var t=a(this._cookieName());return t||(t=s(this._cookieName())),t},_addMafParamUrl:function(t){var e,n,i=this._getMafParamValue();if(!i)return t;var o=t.match(/(.*)(?!#!)(?=#)(.*)/);o?(e=o[1],n=o[2]):(e=t,n="");var r=e.match(/(.*)(?=\?)(.*)/);return null!=r&&void 0!==r[2]&&r[2].match("[?&]"+this._config.param_key+"=")?t:e+(r?"&":"?")+("maf="+encodeURIComponent(i))+n},_isCrossFqdn:function(){return this._config.CROSS_FQDN&&0<this._config.CROSS_FQDN.length},_isCrossTarget:function(t){var e=function(t){if(!t)return!1;var e=t.match(/^https?:\/\/(.*?)([a-z0-9][a-z0-9\-]{1,61}[a-z0-9]\.[a-z.]{2,6})[:[0-9]*]?([/].*?)?$/i);return null!==e&&e[1]+e[2]}(t);return e!==document.domain&&-1!==this._config.CROSS_FQDN.indexOf(e)},_addParamMaf:function(t){var e;if("click"===t.type.toLowerCase()&&"a"===t.target.tagName.toLowerCase()){if(e=t.target.href,!this._isCrossTarget(e))return;t.target.href=this._addMafParamUrl(e)}if("submit"===t.type.toLowerCase()&&"form"===t.target.tagName.toLowerCase()){if(e=t.target.action,!this._isCrossTarget(e))return;t.target.action=this._addMafParamUrl(e)}},crossDomain:function(t){this._isCrossFqdn()&&this._addParamMaf(t)}};function a(t){var e=null,n=t+"=",i=document.cookie,o=i.indexOf(n);if(-1!==o){var r=o+n.length,a=i.indexOf(";",r);-1===a&&(a=i.length),e=decodeURIComponent(i.substring(r,a))}return e}function s(t){var e=null,n=null;try{n=localStorage.getItem(t)}catch(t){console.log("Not Available LocalStorage.")}return n&&(e=JSON.parse(n)),e}(function(){if(!window.hasOwnProperty("dataLayer"))return!1;for(var t=window.dataLayer,e=0;e<t.length;e++)if(t[e].hasOwnProperty("event")&&"gtm.dom"===t[e].event)return!0;return!1})()&&(o.config=i,o.setMaftagCookie(),o.setMaftagStorage()),t=function(){o.config=i,o.setMaftagCookie(),o.setMaftagStorage()},document.addEventListener?document.addEventListener("DOMContentLoaded",t,!1):document.attachEvent?document.attachEvent("onreadystatechange",t):document.onreadystatechange=t,e=function(t){i.CROSS_FQDN=MAF_CROSS,r.config=i,r.crossDomain(t)},document.addEventListener?document.addEventListener("click",e,!1):document.attachEvent?document.attachEvent("onclick",e):document.onclick=e,n=function(t){i.CROSS_FQDN=MAF_CROSS,r.config=i,r.crossDomain(t)},document.addEventListener?document.addEventListener("submit",n,!1):document.attachEvent?document.attachEvent("onsubmit",n):document.onsubmit=n}();