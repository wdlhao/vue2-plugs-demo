import fetch from '@/utils/fetch';

export const personalized = (reqData) => fetch('/api/personalized', reqData, 'GET') // 推荐歌单
