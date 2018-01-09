// var SunriseAppBase="http://localhost:8085/";
// var SunriseAppBase="http://member.esaleb.co/";
var SunriseAppBase="http:192.168.100.231:31080/member-server/";
// var SunriseAppBase="http://crm.demo.esaleb.com/";
var SunriseAppConfig={
    app_base:SunriseAppBase,
    systems:{
        "esaleb-core-member":{
            //前端 URL 地址
            // "ui_base":"http://localhost:8085/",
            // "ui_base":"http://member.esaleb.co/",
            "ui_base":"http:192.168.100.231:31080/member-server/",
            // "ui_base": "http://crm.demo.esaleb.com/member/",
            //后端 接口 地址
            "server_base":"http://dev.sunrizetech.co/member-server/",
            // "server_base":"http://192.168.100.216:9090/",
            // "server_base": "http://crm.demo.esaleb.com/member-server",
            //系统编码
            "code":"esaleb-core-member",
            //系统名称
            "name":"会员",
            //系统标题
            "title":"会员中心",
            //系统图标
            "icon":""
        },
        "esaleb-business-crm":{
            "ui_base": "http://crm.demo.esaleb.com/crm/",
            "server_base": "http://crm.demo.esaleb.com/crm-server",
            "code": "esaleb-business-crm",
            "name": "商机",
            "title": "商机管理",
            "icon": "./static/images/crm.png"
        },
        "esaleb-core-capability":{
            "ui_base":"http://cap.esaleb.co/",
            "server_base":"http://cap.esaleb.co",
            "code":"esaleb-core-capability",
            "name":"能力",
            "title":"能力接入",
            "icon":""
        },
        "esaleb-core-pay":{
            "ui_base":"http://pay.esaleb.co",
            "server_base":"http://pay.esaleb.co",
            "code":"esaleb-core-pay",
            "name":"支付",
            "title":"支付管理",
            "icon":""
        }
    },
    security_params: {
        urls: {
            // login_check: "http://passport.esaleb.co/p3/serviceValidate",
            // login_info: "http://zhangjl.sunrizetech.co/esaleb/!sys/security/~java/LoginState.get",
            // login_page:"http://passport.esaleb.co/login",
            // functions: "http://rap.sunrizetech.cn:81/mockjsdata/7/!member/permit/~java/Permit.tree",
            // permissions: "http://rap.sunrizetech.cn/mockjsdata/7/!member/employee/~java/Employee.getAuthority"
            login_check: "http://crm.demo.esaleb.com/sso/p3/serviceValidate",
            login_info: "http://crm.demo.esaleb.com/member-server/!sys/security/~java/LoginState.get",
            login_page: "http://crm.demo.esaleb.com/sso/login",
            logout_page: "http://crm.demo.esaleb.com/sso/logout",
            functions: "http://crm.demo.esaleb.com/member-server/!member/permit/~java/Permit.tree",
            permissions: "http://crm.demo.esaleb.com/member-server/!member/employee/~java/Employee.getAuthority"
        },
        status_pages: {
            206: SunriseAppBase+"src/libs/sunrise-app/206.html",
            302: SunriseAppBase+"src/libs/sunrise-app/302.html",
            403: "",
            404: "",
            500: ""
        }
    }
};