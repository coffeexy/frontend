define([
    'pro/module/regularModule',
    'pro/components/base',
    'text!./index.html'
], function(_m, _base, template, _p) {
    var SliderModule = RGUI.Component.extend({
        name: 'slider',
        template: template,
        config: function() {
            Regular.util.extend(this.data, {
                left: 0,
                t: null,
                i: 0,
            });
            this.supr();
            this.data.t = setTimeout(this.slide(), 3000);
        },
        stopSlide: function() {
            clearTimeout(this.data.t);
        },
        slide: function() {
            this.data.left = -this.data.itemwidth*this.data.i + 'px';
            this.$update();
            this.data.i = (this.data.i+1)%this.data.list.length;
            this.data.t = setTimeout(this.slide._$bind(this), 3000);
        },
    });

    return SliderModule;
});
