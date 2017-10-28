/**
 * 网络请求actions
 */

 export const request = (data, refreshState) => {
     if (data instanceof Array) {
         return {                                //并发请求
             type: 'CONCURRENT_REQUEST',         
             data
         }
     }
     return {                                    //单次请求
         type: data.type,                        
         method: data.method,
         params: data.params,
         onSuccess: data.onSuccess,
         onError: data.onError,
		 refreshState
     }
 };