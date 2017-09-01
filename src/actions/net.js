/**
 * 网络请求actions
 */

 export const request = (data) => {
     return {
         url: data.url,
         method: data.method,
         params: data.params
     }
 }