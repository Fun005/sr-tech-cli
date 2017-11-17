/**
 * sunrise-app-config.js 必需先加载
 */

(function ($) {
    if (SunriseApp == undefined) {
        console.warn("未设置 SunriseApp 配置，将运行不正常");
        return;
    }

    //设置 base 标签
    //$(document.head).prepend($("<base>").attr("href", SunriseApp.app_base));
    // document.write("<base href='"+SunriseApp.app_base+"'>");


    var $ajax_orignal = $.ajax;

    var systemConfig = SunriseApp.systems;


    var getSysHost = function (sys) {
        return systemConfig[sys]["server_base"];
    };

    $.ajax = function (settings) {
        var url = settings["url"];

        // http 或者 https 开头的 url 不进行处理
        if (!/^(([H|h][t|T]{2}[p|P][s|S]?:\/\/)).+/.test(url)) {
            var sys = settings["sys"];
            if (sys == undefined || $.trim(sys) == "") {
                //如果没有定义 sys 选项，则处理 url
                var idx = url.indexOf("/!");
                if (idx != -1) {
                    sys = url.substr(0, idx);
                    url = url.substr(idx + 1);
                }
            }
            var sysHost = getSysHost(sys);
            if (sysHost != undefined && $.trim(sysHost) != "") {
                if (sysHost.lastIndexOf('/') == sysHost.length - 1)
                    sysHost = sysHost.substr(0, sysHost.length - 1);

                if (url.indexOf('/') == 0)
                    url = sysHost + url;
                else
                    url = sysHost + '/' + url;

                settings["url"] = url;
            } else if (settings["sys"] != undefined) {
                console.warn("没有在主机定义文件找到主机 " + settings["sys"] + " 的定义");
                settings["url"] = SunriseApp.app_base + url;
            }
        }

        settings["type"] = settings["type"] || "GET";
        return $ajax_orignal.apply($, [settings]);
    };
})(jQuery);

/**
 * 实现安全控制相关功能，此 js 必需放在业务逻辑代码前面
 *
 * 依赖：
 * jQuery
 *
 * 初始化逻辑：
 * 1. 获取功能定义信息，并存储到本地
 *
 * 运行逻辑：
 * 1. 检测当前页面的 URL 是否需要做授权控制，如果当前页面不需要授权或者不需要登录则不做任何事情
 * 2. 检测当前用户是否已经登录（从本地存储中获取登录信息），如果已经登录，则判断是否有权限，有权限则直接过
 * 3. 如果当前用户已登录，并且没有权限访问当前页面，则显式无权限信息（通过 404 返回）
 * 4. 如果当前用户未登录，则向后台请求登录信息，此时页面显式等待（通过 206 返回）
 * 5. 后台返回未登录，则跳转到 CAS 登录界面进行登录（此 CAS 登录界面中，也需要引入该 js，并且调用登录成功函数）
 * 6. CAS 登录成功后，302 重定向到登录前的页面，这时候重新走第一个逻辑
 *
 *
 * 接口：
 * 1. 状态事件接口
 * 2. 设置登录信息接口
 * 3. 获取权限信息接口
 * 4. 获取功能定义接口
 * 5. 获取用户信息接口
 *
 *
 * 状态编码：
 * 403  无权访问
 * 404  页面不存在
 * 206  等待
 * 500  系统错误
 * 302  系统正在重定向
 */

var Security = (function () {
    console.log("init security.");
    var LOGIN_DATA_KEY = "login_info";
    var FUNC_DATA_KEY = "func_def";
    var PERMINSION_DATA_KEY = "permission_def";

    var STATUS_WAITTING = 206;
    var STATUS_NOT_FOUND = 404;
    var STATUS_DENY = 403;
    var STATUS_ERROR = 500;
    var STATUS_REDIRECT = 302;

    var config = SunriseApp.security_params;

    /**
     * 数据保存接口
     * @param key
     * @param val
     */
    var saveData = function (key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    };

    /**
     * 数据获取接口
     * @param key
     */
    var getData = function (key) {
        var data = localStorage.getItem(key);
        if (data != undefined)
            return JSON.parse(data);

        return data;
    };

    /**
     * 显式指定状态的界面信息
     * @param status
     */
    var showStatusPage = function (status, message, success) {
        console.log("display status page: ", status);

        var $div = $(".security_div");
        if ($div.length == 0) {

            $div = $("<div></div>").addClass("security_div").hide().css("height", document.body.scrollHeight +
                    "px").css("width", document.body.scrollWidth + "px").css("z-index", "999").css("position",
                    "absolute").css("top", 0).css("left", 0);
            $(document.body).append($div);
        }

        $div.show();
        $div.load(config.status_pages[status], "", success);
    };

    /**
     * 隐藏所有的状态界面信息
     */
    var hideStatusPage = function () {
        console.log("隐藏所有的临时界面");

        $(".security_div").remove();
    };

    /**
     * 将所有的功能定义集合到一个数组，不考虑重复
     * @param funcs
     */
    var processFuncs = function (funcs) {
        var allFuncs = {};
        $.each(funcs, function (k, v) {
            var modules = v["modules"];
            $.each(modules, function (k1, v1) {
                var fs = v1["functions"];
                $.each(fs, function (i, f) {
                    allFuncs[f["data"]] = f;
                });
            });
        });
        return allFuncs;
    };

    /**
     * Ajax 请求
     * @param url
     * @param param
     * @param success
     * @param fail
     */
    var ajax = function (url, param, success, fail) {
        console.log("正在请求 ", url);
        $.ajax({
            url: url,
            type: "get",
            // dataType: "json",
            success: function (data, textStatus, jqXHR) {
                success(data);
            },
            complete: function () {
                console.log("请求已完成");
            }
        });
    };

    /**
     * 权限检测
     * @param allow
     * @param deny
     * @param login
     */
    var checkPermission = function (funcs, allow, deny) {
        //先找到当前的 URL
        var url = "";//todo: 获取当前的页面路径

        var func = funcs[url];
        //功能不存在或者模式是不控制权限
        /*
        if (func == undefined || func["mode"] < 0) {
            allow();
            return;
        }
        */

        //获取授权数据

        var permissions = getData(PERMINSION_DATA_KEY);
        if (permissions == undefined) {
            //向后台请求权限数据
            ajax(config.urls.permissions, {}, function (data) {
                //保存权限数据，再次调用权限检测
                saveData(PERMINSION_DATA_KEY, data.body);
                //checkPermission(allow, deny);
            }, function () {
                showStatusPage(STATUS_ERROR);
            });

            return;
        }


        //登录校验，如果已经登录，则进行权限的校验

        checkLogin(function () {
            //判断是否有权限访问当前的 URL
            if (true) {
                //todo: 这里进行权限的校验
                allow();
            } else {
                deny();
            }
        }, function () {

        });

    };

    /**
     * 检查是否已经登录，如果没有登录，则跳转到登录
     * @param {*} success
     * @param {*} fail
     */
    var checkLogin = function (success, fail) {
        console.log("checking login…");
        ajax(config.urls.login_check, {}, function (data) {
            //console.log(data);
            if ("yes" == data) {
                //表示已经登录，向会员中心发送登录请求
                console.log("已经登录");
            } else {
                console.log("还没有登录，跳转到登录页面");
                //没有登录，跳转到登录页面进行跳转
                showStatusPage(STATUS_REDIRECT, "系统正在跳转到登录页面，请稍候…");
            }
        });
        /*
        var user = null;//getData(LOGIN_DATA_KEY);
        console.log(JSON.stringify(user));
        if (user == undefined) {
            showStatusPage(STATUS_WAITTING, "准备进入，请稍候…", function () {
                //TODO：这里还要检查是否超时
                //去后台请求获取登录信息
                ajax(config.urls.login_info, {}, function (data) {
                    //如果已经登录，保存登录信息，并继续校验操作
                    if (data.header.code == 0) {
                        console.log("用户已经登录了，设置用户信息");
                        saveData(LOGIN_DATA_KEY, data.body);
                        success();
                    } else {
                        //跳转到登录页面
                        showStatusPage(STATUS_REDIRECT, "系统正在跳转到登录页面，请稍候…");
                        return;
                    }
                }, function () {
                });
            });
        } else {
            success();
        }
        */
    };


    //定义要返回的结果
    var result = {
        /**
         * 获取登录的用户信息
         */
        getLoginInfo: function () {
            var info = getData(LOGIN_DATA_KEY);

        },

        /**
         * 设置登录的用户信息
         * @param userInfo
         */
        setLoginInfo: function (userInfo) {
        },

        /**
         * 获取所有的权限定义
         */
        getFuncs: function () {
            var funcs = getData(FUNC_DATA_KEY);
            return funcs;
        },

        /**
         * 获取有权限访问的权限数据
         */
        getPermissions: function () {
            var perm = getData(PERMINSION_DATA_KEY);
            return perm == undefined ? [] : perm;
        }
    };

    //获取功能定义数据
    var funcs = result.getFuncs();
    if (funcs == undefined) {
        //还没有权限数据，提示等待界面，并进行请求
        showStatusPage(STATUS_WAITTING, "", function () {
            ajax(config.urls.functions, {}, function (data) {
                //先做保存
                saveData(FUNC_DATA_KEY, processFuncs(data.body));

                //在这里继续往下走
                checkPermission(funcs, function () {
                    hideStatusPage();
                }, function () {
                    showStatusPage(STATUS_DENY);
                });
            }, function () {
                //这里失败了，显式系统错误界面
                showStatusPage(STATUS_ERROR, "");
            });
        });
    } else {
        //继续往下走
        checkPermission(funcs, function () {
            hideStatusPage();
        }, function () {
            showStatusPage(STATUS_DENY);
        });
    }

    //获取权限数据


    return result;
}(jQuery));