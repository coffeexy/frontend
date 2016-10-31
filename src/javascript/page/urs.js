(function(){
    var _parseQuery = function(_query){
        var string2object = function(_string,_split){
            var _obj = {};
            var _arr = (_string||'').split(_split);
            _arr.forEach(function(_name){
                var _brr = _name.split('=');
                if (!_brr||!_brr.length) return;
                var _key = _brr.shift();
                if (!_key) return;
                _obj[decodeURIComponent(_key)] =
                     decodeURIComponent(_brr.join('='));
            });
            return _obj;
        }
        return string2object(_query,'&');
    }
    var _configdl = {
        parent:document.body,  // 注入节点（可传入节点id如#lgapp）
        // // 测试参数
        // pd:'fc',
        // pkid:'BCKOwDz',
        // pkht:'c.163.com',
        // 线上参数
        pd:'cloudcomb',
        pkid:'rmIjcdV',
        pkht:'c.163.com',
        autoReg:1,      // '注册'按钮是默认链接形式还是回调通知：1-默认注册页链接；0-回调regCallBack
        regText:'去注册',    // '注册'按钮文案
        isPop:1,    // 登录框样式：1-弹窗；0-内嵌；默认弹窗
        // 登录成功回调
        loginCallBack:function(_data){
            window.CURS_DL.destroy();
            if (window.REDIRECT) {
                window.location = "/login/callback?redirect="+encodeURIComponent(window.REDIRECT);
            } else {
                window.location = "/login/callback";
            }
        },
        // 点击关闭按钮回调
        closeCallBack:function(_data){
            window.REDIRECT="";
            window.CURS_DL.destroy();
        }
    };

    // 登录脚本回调
    var callback = function(){
        try {
            window.CURS_DL = new CURS(_configdl);
            var _query = _parseQuery(window.location.search.slice(1));
            if (_query.action === 'login' && window.isLogin!=1) {
                window.CURS_DL.show();
            }
        }catch(_e){
            console.log(_e);
        }
    }

    // 异步加载登录组件js文件
    CURS_MSG.getJs(callback,'head');
})();

