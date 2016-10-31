NEJ.define([
    'base/util',
    'pro/extend/util'
], function(_u, _cu, _p) {

    _p.dateFormat = function(date, format) {
        return _u._$format(date, format || "yyyy-MM-dd");
    };

    return _p;
});
