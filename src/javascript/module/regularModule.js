/*
 * ------------------------------------------
 * 项目Regualar模块基类实现文件
 * @author   sensen(hzzhaoyusen@corp.netease.com)
 * ------------------------------------------
 */
/** @module util/dispatcher/regularModule */
NEJ.define([
    'base/klass',
    'base/event',
    'base/util',
    'util/template/tpl',
    'util/dispatcher/module',
],function(_k,_v,_u,_t,_dm,_p,_o){
    var _pro;
    /**
     * Regular模块基类对象
     *
     * @class   {_$$RegularModule}
     * @extends {_$$ModuleAbstract}
     */
    _p._$$RegularModule = _k._$klass();
    _pro = _p._$$RegularModule._$extend(_dm._$$ModuleAbstract);

    _pro.__build = function(){
        this._$innerModule = new this._$$InnerModule().$inject(this.__body);

        this._$innerModule.__export = {};
        if (this._$innerModule.__doBuild) {
            this._$innerModule.__doBuild();
            this._$innerModule.$update();
        }
        this.__export = _u._$merge({
            parent: this._$innerModule.$refs.view
        }, this._$innerModule.__export);

        this._$innerModule.__doSendMessage = this.__doSendMessage._$bind(this);
    };

    _pro.__init = function(){
        this.__super();
        this.__nodeKey = _t._$addNodeTemplate('<div></div>');
        this.__body = _t._$getNodeTemplate(this.__nodeKey);

        this.__build();
    };

    _pro.__onShow = function(_options){
        // 如果Regular组件被destroy了，就重新构建
        if(this._$innerModule._watchers === null)
            this.__build();
        this.__super(_options);
        if(this._$innerModule.__onShow) {
            this._$innerModule.data.$param = _options.param;
            this._$innerModule.data.$params = _options.href.split('?')[1];
            this._$innerModule.__onShow(_options);
            this._$innerModule.$update();
        }
    };

    _pro.__onRefresh = function(_options){
        this.__super(_options);
        if(this._$innerModule.__onRefresh){
            this._$innerModule.data.$param = _options.param;
            this._$innerModule.data.$params = _options.href.split('?')[1];
            this._$innerModule.__onRefresh(_options);
            this._$innerModule.$update();
        }
    };

    _pro.__onMessage = function(_options){
        this.__super(_options);
        if(this._$innerModule.__onMessage){
            this._$innerModule.__onMessage(_options);
            this._$innerModule.$update();
        }
    };

    _pro.__onBeforeHide = function(_options){
        this.__super(_options);
        if(this._$innerModule.__onBeforeHide){
            this._$innerModule.__onBeforeHide(_options);
            this._$innerModule.$update();
        }
    };

    _pro.__onHide = function(){
        this.__super();
        if(this._$innerModule.__onHide){
            this._$innerModule.__onHide();
            this._$innerModule.$update();
        }
    };

    _pro.__destroy = function(){
        this.__body = _t._$getNodeTemplate(this.__nodeKey);
        this._$innerModule.destroy();
        delete this.__nodeKey;
        this.__super();
    };

    /**
     * 注册RegularModule
     *
     * @public
     * @method module:util/dispatcher/regularModule._$build
     * @param  {String}  arg0 - 模块UMI或者别名
     * @param  {Regular} arg1 - Regular组件模块
     * @param  {String} arg1 - 入口页面的子页面加载节点，只需在入口页面注册umi时填写
     * @return {_$$RegularModule} RegularModule模块
     */
    _p._$regist = function(_umiAlias, _$$InnerModule, parent){
        /**
         * Regular模块对象
         *
         * @class   {_$$OuterModule}
         * @extends {_$$RegularModule}
         */
        var _$$OuterModule = _k._$klass();
        var _pro = _$$OuterModule._$extend(_p._$$RegularModule);

        _pro.__init = function(){
            this.__umiAlias = _umiAlias;
            this._$$InnerModule = _$$InnerModule;
            this.__super();
        };

        _pro.__onShow = function(_options){
            if(parent) {
                _options.data = _options.data || _o;
                _options.data.parent = parent;
            }
            this.__super(_options);
        };

        _v._$addEvent(document, 'templateready', function(){
            _dm._$regist(_umiAlias, _$$OuterModule);
        });

        return _$$OuterModule;
    };

    return _p;
});
