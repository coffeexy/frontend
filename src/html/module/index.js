define([
    'pro/module/regularModule',
    'pro/components/base',
    'text!./index.html'
], function(_m, _base, template, _p, _o) {
    var MModule = _base.BaseComponent.extend({
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
        }
    });

    return _m._$regist('system-layout', MModule, 'module-box');
});
