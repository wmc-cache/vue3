function startToEnd(nowTime) {
    let replaceTime = nowTime.replace(/-/g, '/');
    let time = new Date(replaceTime);
    const timeNum = time.getTime();
    const date = new Date();
    date.setTime(timeNum + 1000 * 60 * 60 * 24 * 6);
    const endTime = fmt(date)
    console.log(endTime)
    return endTime
}

function fmt(date) {
    let fmt = 'yyyy-MM-dd hh:mm:ss'
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分钟
        's+': date.getSeconds(), // 秒
    }

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear())
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, o[k].toString().length == 1 ? '0' + o[k] : o[k])
        }
    }

    // console.log(fmt)
    return fmt
}