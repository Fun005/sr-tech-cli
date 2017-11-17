var SunriseApp={
    // app_base:"http://zhangjl.sunrizetech.co/esaleb-core-member-ui/",
    // app_base:"http://192.168.100.29:8085/",
    app_base:"http://192.168.100.29:8085/",
    systems:{
        "esaleb-core-member":{
            //前端 URL 地址
            "ui_base":"http://192.168.100.29:8085/",
            //后端 接口 地址
            // "server_base":"http://member.sunrizetech.dev/",
            // "server_base":"http://192.168.100.241:9080/",
            "server_base":"http://192.168.100.29:8085/",
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
            "ui_base":"http://crm.esaleb.co",
            "server_base":"http://crm.server.esaleb.co",
            "code":"esaleb-business-crm",
            "name":"商机",
            "title":"商机管理",
            "icon":""
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
            login_check: "",
            login_info: "http://zhangjl.sunrizetech.co/esaleb/!sys/security/~java/LoginState.get",
            functions: "http://rap.sunrizetech.cn:81/mockjsdata/7/!member/permit/~java/Permit.tree",
            permissions: ""
        },
        status_pages: {
            206: "/esaleb-core-member-ui/src/libs/sunrise-app/206.html",
            302: "/esaleb-core-member-ui/src/libs/sunrise-app/302.html",
            403: "",
            404: "",
            500: ""
        }
    }
};