/**
 * Regular Component 基类，用于启动整页component
 * author
 */
define([
    'base/element',
    './directive.js',
    './filter.js'
], function(_e, _directives, _filters, _p) {
    Regular.prototype.$once = function (event, fn) {
        var call = function () {
            fn && fn.apply(this, arguments);
            this.$off(event, call);
        };
        return this.$on(event, call);
    };

    var defaults = function () {
        Array.prototype.forEach.call(arguments, function(arg) {
            for (var key in arg) {
                if (arg.hasOwnProperty(key) && this.data[key] === undefined)
                    this.data[key] = arg[key];
            }
        }, this);
        return this.data;
    };

    _p.BaseComponent = Regular.extend({
        // TODO
        config: function(data) {
            if (data && data.css) {
                data.css = e._$pushCSSText(data.css)
            }
        },
        defaults: defaults,
    })
    .directive(_directives)
    .filter(_filters)

    if(typeof RGUI !== 'undefined') {
        RGUI.Component.filter(_filters);

        // 表单验证最大字符长度实时规则
        RGUI.Validation.ruleMethods = {
            maxLength: function(maxLength) {
                var lastLength = 0;
                return function(value) {
                    var result = lastLength === maxLength && value.length === maxLength;
                    lastLength = value.length;
                    return !result;
                }
            }
        }

        RGUI.Component.prototype.defaults = RGUI.Component.prototype.defaults || defaults;
    }

    if(typeof RGUI2 !== 'undefined') {
        RGUI2.Component.prototype.defaults = RGUI2.Component.prototype.defaults || defaults;
        RGUI2.Component.filter(_filters);
        RGUI2.Component.directive('z-dis-a', _directives['z-dis-a']);

        RGUI2.Toast.toast.data.single = true;
        RGUI2.Toast.toast.data.duration = 3000;
    }

    return _p;
});
