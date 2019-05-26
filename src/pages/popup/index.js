import 'bootstrap/dist/css/bootstrap.min.css';

import 'jquery';
import 'bootstrap';
import 'layui-layer';
import utils from '@/utils';


$(function () {

    const TEST_ENV_URL = 'http://192.168.7.113:7002';
    const VALIDATION_ENV_URL = 'http://192.168.17.231:8680';
    const LOCAL_SERVER_URL = 'http://localhost:9090';

    // 判断还是已登录
    function checkLogin(envUrl) {
        return new Promise((resolve, reject) => {
            $.get(`${envUrl}/staff/1`, function (data) {
                if (utils.isJson(data)) {
                    resolve(data);
                } else {
                    reject('尚未登录!');
                }
            });
        });
    }

    function injectCookie(envUrl) {
        layer.load();

        // 先判断是否已登录
        checkLogin(envUrl).then(() => {

            // 获取cookie
            utils.getChromeCookieValue(envUrl, "JSESSIONID").then((cookie) => {

                // 注入本地
                $.get(`${LOCAL_SERVER_URL}/loginProxy?jsessionId=${cookie}`).always(() => {
                    layer.closeAll('loading');
                }).done(() => {
                    layer.msg('注入成功!');
                }).fail((xhr, err) => {
                    layer.msg(err);
                });
            }).catch((err) => {
                layer.msg(err);
            });
        }).catch(() => {
            // 未登录时跳转到对应的登录页,让用户进行登录操作
            window.open(TEST_ENV_URL);
        });
    }


    // 验证环境cookie注入
    $("#cookieInjectionForValidationEnvBtn").click(() => {
        injectCookie(VALIDATION_ENV_URL);
    });


    // 测试环境cookie注入
    $("#cookieInjectionForTestEnvBtn").click(() => {
        injectCookie(TEST_ENV_URL);
    });


});
