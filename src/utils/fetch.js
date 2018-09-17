
export default async (url = '', data = {}, type = 'POST', method = 'fetch') => {
  type = type.toUpperCase()

  // get请求需要进行url和参数的重新拼接
  if (type === 'GET') {
    let dataStr = '' 
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr 
    }
  }
  // 如果支持fecth语法(es7语法)并且请求方式为'fetch'
  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      mode: 'cors',
      cache: 'force-cache'
    }
    // 'POST'请求，将相关的请求参数添加到'body'中。
    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }
    // await fetch,以同步的方式将数据（json形式）进行返回，前端通过变量接收即可；
    try {
      const response = await fetch(url, requestConfig)
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else { // 如果先浏览器不支持fetch语法，则用es6中promise()来封装异步接口请求；
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        let ActiveXObject = window.ActiveXObject
        requestObj = new ActiveXObject()
      }

      let sendData = ''
      if (type === 'POST') {
        sendData = JSON.stringify(data)
      }
      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              console.log(obj)
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
