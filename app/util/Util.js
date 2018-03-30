import Toast from 'react-native-root-toast';

///格式化涨跌幅显示样式'+10.00%' '-10.00%' '0.00%'
export function formatChangeRange(crStr) {
    var tmpCr = parseFloat(crStr);
    if (tmpCr > 0) {
        return '+' + tmpCr.toFixed(2) + '%';
    }
    return tmpCr.toFixed(2) + '%';
}

export function showMessage(message) {
    if (message == null)
        return;

    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        shadowColor: '#525252',
        animation: true
    });
}

export function dateFmt(fmt, timeInterval) {
    if (typeof timeInterval === 'string') {
        timeInterval = parseFloat(timeInterval);
    }

    if (timeInterval < 1000000000 * 1000) {
        timeInterval = timeInterval * 1000;
    }

    let date = new Date(timeInterval);
    var o = {
        "M+": date.getMonth() + 1,               //月份   
        "d+": date.getDate(),                    //日   
        "h+": date.getHours(),                   //小时   
        "m+": date.getMinutes(),                 //分   
        "s+": date.getSeconds(),                 //秒   
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
        "S": date.getMilliseconds()              //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
