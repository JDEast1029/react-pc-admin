/**
 * 网络请求actions
 */

 export const request = (data) => {
     return {
         type: data.type,
         method: data.method,
         params: data.params
     }
 }