import fetch from "@/utils/fetch";

/**
 * 获取验证码
 */
export const getyancode = (reqData) => fetch("/v2/cotton/user/get_code", reqData);

/**
* 登录
*/
export const login = (reqData) => fetch("/v2/cotton/user/app_login", reqData);
