define([
    'pro/module/regularModule',
    'base/util',
    'pro/extend/util',
    'pro/components/base',
    'text!./index.html'
], function(_m, _u, _u1, _base, template, _p) {
    var HeaderModule = RGUI.Component.extend({
        name: 'app-header',
        template: template,
        config: function() {
            Regular.util.extend(this.data, {
                menus: [{url: '/m/home/',name: "首页", state: "home" },
                  {name: "技术服务", state: 'tech', sub: tech_data},
                  {url: '/m/corp/', name: "合作案例", state: 'corp'},
                  {url: '/m/lab/', name: "体验中心", state: 'lab'}]
            });
            this.supr();
        },
        __onShow: function(options) {
        },
        __onHide: function() {
            this.destroy();
        }
    });

    return HeaderModule;
});
