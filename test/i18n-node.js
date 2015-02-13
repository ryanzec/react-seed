var i18n={lc:{"en":function(n){return n===1?"one":"other"}},
c:function(d,k){if(!d)throw new Error("MessageFormat: Data required for '"+k+"'.")},
n:function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: '"+k+"' isn't a number.");return d[k]-(o||0)},
v:function(d,k){i18n.c(d,k);return d[k]},
p:function(d,k,o,l,p){i18n.c(d,k);return d[k] in p?p[d[k]]:(k=i18n.lc[l](d[k]-o),k in p?p[k]:p.other)},
s:function(d,k,p){i18n.c(d,k);return d[k] in p?p[d[k]]:p.other}};
i18n["desktop/desktop"]={
"header":function(d){return "Desktop"}}
i18n["desktop/prevent-double-click"]={
"header":function(d){return "Prevent Double Click"},
"button1":function(d){return "test"},
"button2":function(d){return "Prevent Double Click Other Buttons"}}
i18n["desktop/with-resolves"]={
"header":function(d){return "With Resolves"}}
i18n["menu/menu"]={
"desktop":function(d){return "Desktop"},
"preventDoubleClick":function(d){return "Prevent Double Click"},
"withResolves":function(d){return "With Resolves"}}
module.exports = i18n;
