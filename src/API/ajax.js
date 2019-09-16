/*
*   ajax封装
* */

import axios from 'axios';  //引入ajax方法


export default function ajax(url,data={},type='get'){
  return new Promise((resolve,reject) => {
    let promise;
    if(type === 'get' || type === 'GET'){
      let url_Ax = '';
      Object.keys(data).forEach(key => {
        url_Ax += key + '=' + data[key] + '&'
      });
      if(url_Ax !== ''){
        url_Ax = url_Ax.substring(0,url_Ax.lastIndexOf('&'))
        url = url + '?' + url_Ax;
      }
      // console.log(url)
      promise = axios.get(url);
    }else if(type === 'POST' || type === "post"){
      //promise = this.$http.post(url,data)
      // console.log(data)
      promise = axios.post(url,data);
    }

    promise.then(response => {
      resolve(response.data);  // 成功
    }).catch(error => {
      reject(error);  // 失败
    })
  })
}
