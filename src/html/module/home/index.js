define([
    'pro/module/regularModule',
    'pro/components/base',
    'pro/components/header/index',
    'text!./index.html'
], function(_m, _base, header, template, _p) {
    var HomeModule = _base.BaseComponent.extend({
        template: template,
        config: function() {
            Regular.util.extend(this.data, {
            });
            this.supr();
        },
        __onShow: function(options) {
        },
        __onHide: function() {
            this.destroy();
        },
    });

    return _m._$regist('home', HomeModule, 'module-box');
});
