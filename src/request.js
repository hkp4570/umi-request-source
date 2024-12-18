import Core from './core'
import {mergeRequestOptions} from "./utils";
import CancelToken from './cancel/cancelToken';
import Cancel from './cancel/cancel.js';
import isCancel from './cancel/isCancel';

const request = (initOptions = {}) => {
    const coreInstance = new Core(initOptions);

    const umiInstance = (url, options = {}) => {
        const mergeOptions = mergeRequestOptions(coreInstance.initOptions, options);
        return coreInstance.request(url, mergeOptions);
    }

    // 中间件
    umiInstance.use = coreInstance.use.bind(coreInstance);

    // 拦截器
    umiInstance.interceptors = {
        request: {
            use: Core.requestUse.bind(coreInstance)
        },
        response: {
            use: Core.responseUse.bind(coreInstance)
        }
    }

    // 请求语法糖
    const METHODS = ['get', 'post', 'delete', 'put', 'patch', 'head', 'options', 'rpc'];
    METHODS.forEach(method => {
        umiInstance[method] = (url, options) => {
            return umiInstance(url, {...options, method})
        }
    })

    umiInstance.Cancel = Cancel;
    umiInstance.CancelToken = CancelToken;
    umiInstance.isCancel = isCancel;

    return umiInstance;
}

// 请求前统一添加通用配置
export const extend = initOptions => request(initOptions);

export const fetch = request({parseResponse: false})

export default request({})
