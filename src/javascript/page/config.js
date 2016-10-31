define([
  '{pro}../html/module/index.js',
  '{pro}../html/module/home/index.js',
  '{pro}../html/module/tech/index.js',
],function(
  _$$MModule,
  _$$HomeModule,
  _$$TechModule,
  _p
){
  _p._$getRulesConfig = function(){
    return {
      rewrite:{
        '404': '/m/home/'
      },
      title:{
        /*'/m/home/'    : '开放平台－智能与感知中心',
        '/m/tech/'    : '开放平台－智能与感知中心',
        '/m/corp/'    : '开放平台－智能与感知中心',
        '/m/lab/'     : '开放平台－智能与感知中心',*/
      },
      alias:{
        'system-layout': '/m',
        'home': '/m/home/',
        'tech': '/m/tech/',
      }
    };
  };
  _p._$getModulesConfig = function(){
    var _module = {
      '/m': _$$MModule,
      '/m/home/': _$$HomeModule,
      '/m/tech/': _$$TechModule,
    };
    return _module;
  };
  return _p;
});
