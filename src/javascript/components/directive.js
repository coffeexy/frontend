/*
 * --------------------------------------------
 * BaseComponent 指令扩展
 * @version  1.0
 * @author
 * --------------------------------------------
 */
define([], function () {
    var dom = Regular.dom;

    var directives = {};

    directives['z-crt'] = RGUI2._.createBoolClassDirective('z-crt');
    directives['z-sel'] = RGUI2._.createBoolClassDirective('z-sel');
    directives['z-chk'] = RGUI2._.createBoolClassDirective('z-chk');
    directives['z-act'] = RGUI2._.createBoolClassDirective('z-act');
    directives['z-dis'] = RGUI2._.createBoolClassDirective('z-dis');
    directives['z-loading'] = RGUI2._.createBoolClassDirective('z-loading');

    /**
     * r-autofocus  元素自动获得焦点，主要用于表单元素
     */
    directives['r-autofocus'] = RGUI2._.createBoolDirective(function (elem, value) {
        value && setTimeout(function() {elem.focus()}, 0);
    });

    directives['z-dis-a'] = function(elem, value) {
        var prevent = function($event) {$event.preventDefault();}
        if(typeof value === 'object' && value.type == 'expression')
                this.$watch(value, function(newValue, oldValue) {
                        dom[newValue ? 'addClass' : 'delClass'](elem, 'z-dis');
                        dom[newValue ? 'on' : 'off'](elem, 'click', prevent);

                });
        else if(!!value || value === '') {
                dom.addClass(elem, 'z-dis');
                dom.on(elem, 'click', prevent);
        }
    }

    // @has problem
    // var preventDefault = function ($event) {$event.preventDefault()};
    // directives['z-dis-a'] = RGUI2._.createBoolDirective(function (elem, value) {
    //     value = !!value;
    //     dom[value ? 'addClass' : 'delClass'](elem, 'z-dis');
    //     dom[value ? 'on' : 'off'](elem, 'click', preventDefault);
    // });

    directives['r-scroll'] = RGUI2._.createBoolDirective(function (elem, value) {
        if(!value)
            return;

        var scrollParent = elem, scrollParentOverflow;
        do {
            scrollParent = scrollParent.parentElement;
            scrollParentOverflow = scrollParent && dom.getComputedStyle(scrollParent)['overflow'];
        } while(scrollParent && !(scrollParentOverflow === 'auto' || scrollParentOverflow === 'scroll'));

        if(typeof value === 'number')
            scrollParent.scrollTop = value;
        else
            scrollParent.scrollTop += dom.getPosition(elem).top - dom.getPosition(scrollParent).top;
        /*
        if(elem.scrollIntoViewIfNeeded)
            elem.scrollIntoViewIfNeeded(true);
        else
            elem.scrollIntoView({block: 'end', behavior: 'smooth'});
        */
    });

    return directives;
});
