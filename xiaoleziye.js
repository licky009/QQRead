
/*ziye


微信扫码 https://raw.githubusercontent.com/ziye12/JavaScript/master/xiaoleziye.png  获取授权



hostname=minapp.xqrobot.net,

#小乐
############## 圈x

https:\/\/minapp\.xqrobot\.net\/* url script-request-header xiaoleziye.js

#小乐
############## loon

//
http-request https:\/\/minapp\.xqrobot\.net\/* script-path=xiaoleziye.js, requires-body=true


#小乐
############## surge

微打卡 坚持打卡 微早起打卡 = type=http-request,pattern=https:\/\/minapp\.xqrobot\.net\/*,script-path=xiaoleziye.js, requires-body=true




*/





const sy = init()

const jsname='小乐签到'

const logs = 0;   //0为关闭日志，1为开启
const notifyInterval=1//0为关闭通知，1为开启
const jbid=1;


const xiaoleurlKey = 'xiaoleurl'+jbid

const xiaoleheaderKey = 'xiaolehd'+jbid

const xiaolebodyKey = 'xiaolebd'+jbid

const xiaoleurlVal = sy.getdata(xiaoleurlKey)

const xiaoleheaderVal = sy.getdata(xiaoleheaderKey)

const xiaolebodyVal = sy.getdata(xiaolebodyKey)


const xiaoleuserKey = 'xiaoleuser'+jbid
const xiaoleuserVal = sy.getdata(xiaoleuserKey)






var tz=''


let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie()
} else {
   all()
}





function GetCookie() {

if ($request.headers){

   if($request &&$request.url.indexOf("/user.php?mod=sign&")>=0) {

  const xiaoleurlVal = $request.url
if (xiaoleurlVal)        sy.setdata(xiaoleurlVal,xiaoleurlKey)
    sy.log(`[${jsname}] 获取url请求: 成功,xiaoleurlVal: ${xiaoleurlVal}`)
    sy.msg(xiaoleurlKey, `获取url请求: 成功🎉`, ``)
  

   const xiaoleheaderVal = JSON.stringify($request.headers)
    if (xiaoleheaderVal)        sy.setdata(xiaoleheaderVal,xiaoleheaderKey)
    sy.log(`[${jsname}] 获取Cookie: 成功,xiaoleheaderVal: ${xiaoleheaderVal}`)
    sy.msg(xiaoleheaderKey, `获取Cookie: 成功🎉`, ``)
  
   const xiaolebodyVal = $request.body
    if (xiaolebodyVal)        sy.setdata(xiaolebodyVal,xiaolebodyKey)
    sy.log(`[${jsname}] 获取阅读: 成功,xiaolebodyVal: ${xiaolebodyVal}`)
    sy.msg(xiaolebodyKey, `获取阅读请求: 成功🎉`, ``)



  }
  
  

if($request &&$request.url.indexOf("/user.php?mod=index&")>=0) {
const xiaoleuserVal = $request.url
if (xiaoleuserVal)        sy.setdata(xiaoleuserVal,xiaoleuserKey)
    sy.log(`[${xiaoleuserKey}] 获取user请求: 成功,xiaoleurlVal: ${xiaoleuserVal}`)
    sy.msg(xiaoleuserKey, `获取user请求: 成功🎉`, ``)
  




}




  }
 
 






}












 function all()

 {

   for(var i=0;i<3;i++)
 { (function(i) {
            setTimeout(function() {
    
     if(i==0) xiaoletask(i);

else if(i==1) xiaoleuser(i);

else if(i==2) showmsg(i);
}, (i + 1) *1000);
                })(i)


}}



//签到
function xiaoletask() {
return new Promise((resolve, reject) => {

  const toxiaoleurl = {

    url: xiaoleurlVal,

    headers: JSON.parse(xiaoleheaderVal),
    body: xiaolebodyVal
  };
   sy.post(toxiaoleurl,(error, response, data) =>{
     if(logs) sy.log(`${jsname}, 签到信息: ${data}`)
     signinfo =JSON.parse(data)
      if (signinfo.result==true)
 {
tz+='【签到成功】🎉:'+signinfo.show+'\n'
}

else if (signinfo.result==false)
 {
tz+='【重复签到】✖️:'+signinfo.show+'\n'
}



    resolve()
    })
   })
  }  




function xiaoleuser() {
return new Promise((resolve, reject) => {

  const toxiaoleuserurl = {
      url: xiaoleuserVal,
headers: JSON.parse(xiaoleheaderVal),

  };
   sy.post(toxiaoleuserurl,(error, response, data) =>{
if(logs) sy.log(`${jsname}, 用户信息: ${data}`)
     userinfo =JSON.parse(data)
      if (userinfo.result==true)
 {
tz+='【'+userinfo.info.userlevel_name+'】👤：'+userinfo.info.user_name+'\n'+
'【现金余额】🧧：'+userinfo.info.user_money+'元'+'\n'+
'【今日收益】🧧：'+userinfo.info.jiang_day1+'元'+'\n'+
'【本月收益】🧧：'+userinfo.info.jiang_month1+'元'+'\n'+
'【签到任务】⏰：'+userinfo.info.task_list[0].name+'\n'+
'【签到收益】⏰：'+userinfo.info.task_list[0].money+'\n'+
'【签到信息】⏰：'+userinfo.info.task_list[0].desc+'\n'+



'【邀请任务】👥：'+userinfo.info.task_list[1].name+'\n'+
'【邀请收益】👥：'+userinfo.info.task_list[1].money+'\n'+
'【邀请信息】👥：'+userinfo.info.task_list[1].desc+'\n'


}


else if (userinfo.result==false)
 {
tz+=userinfo.show
}



    resolve()
    })
   })
  }  









function showmsg() {

console.log(tz)

if (notifyInterval==1)
sy.msg(jsname,'',tz)
}


function init() {
  isSurge = () => {
    return undefined !== this.$httpClient
  }
  isQuanX = () => {
    return undefined !== this.$task
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle = '', body = '') => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (msg) => {
    console.log(`${msg}\n`)
  }
  get = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == 'string') options = { url: options }
      options['method'] = 'GET'
      return $task.fetch(options).then(
        (response) => {
          response['status'] = response.statusCode
          callback(null, response, response.body)
        },
        (reason) => callback(reason.error, null, null)
      )
    }
    if (isSurge()) return $httpClient.get(options, callback)
  }
  post = (options, callback) => {
    if (isQuanX()) {
      if (typeof options == 'string') options = { url: options }
      options['method'] = 'POST'
      $task.fetch(options).then(
        (response) => {
          response['status'] = response.statusCode
          callback(null, response, response.body)
        },
        (reason) => callback(reason.error, null, null)
      )
    }
    if (isSurge()) $httpClient.post(options, callback)
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}