import {request} from './request'


//获取首页数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

//获取首页商品数据
//需要传两个参数  1.数据的类型 2.页码
export function getHomeGoods(type , page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}

