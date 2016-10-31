define([
  'base/klass',
  'base/util',
  'util/event',
  'util/dispatcher/dispatcher',
  'util/cache/share',
  'pro/page/config',
], function(_k, _u, _v, _t, _s, _c, _p){

  _p._$$DashboardModule = _k._$klass();
  var _pro = _p._$$DashboardModule._$extend(_v._$$EventTarget);

  _pro.__init = function(_options) {
    this.__super(_options);
    this.__startup();
    this.__redirectBySearch();
  };

  _pro.__startup = function() {
    _t._$startup({
      // 规则配置
      rules: _c._$getRulesConfig(),
      // 模块配置
      modules: _c._$getModulesConfig(),
      onbeforechange: function(_options) {
        location.query = _options.query;    // save query object
        var _umi = _options.path || '';
        if (!!_umi && _umi.indexOf('/?') < 0 && _umi.indexOf('/m/') < 0)
          _umi = '/m' + _umi;
      },
      onnotfound:function(_event){
          // _event -> {path:'/m/a',href:'http://a.b.com/m/a'}
          _event.stopped = !0;
          location.href = '#/m/home/';
      }
    });
  };

  _pro.__redirectBySearch = function(){
    var _search = window.location.search.slice(1);
    var _hash = window.location.hash.slice(1);
    if(!_search || _hash) return;

    var _urlParam = _u._$query2object(_search);
    var _umi, _umiQuery;
    if(_urlParam.m){
      _umi = _urlParam.m;
      delete _urlParam.m;

      _umiQuery = _u._$object2query(_urlParam);
      if(_umiQuery){
        _umi += ('?'+_umiQuery);
      }

      window.dispatcher._$redirect(_umi);
    }
  };

  _p._$$DashboardModule._$allocate();
});
