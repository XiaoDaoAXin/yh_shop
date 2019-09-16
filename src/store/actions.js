/**
 * action 模块
 * **/

import {
  RECEIVE_INDEX,
  RECEIVE_CLASSIFICATION,
  RECEIVE_DATEILS,
  RECEIVE_SHOPSSEARCH,
  RECEIVE_SHOPCART,
  RECEIVE_REPLY,
  RECEIVE_REPLYREND,
  RECEIVE_SHOPCLASSSEARCH,
  RECEIVE_SPIKE,
  RECEIVE_MINT,
  RECEIVE_COMMENT,
  RECEIVE_PURCHASE,
  RECEIVE_ASSEMBLE,
  RECEIVE_COLLAGEORDER,
  RECEIVE_COUPONMINE,
  RECEIVE_COUPONHOME,
  RECEIVE_REGION
} from "./mutations-type";
import {
  reqIndex,
  reqClassification,
  reqDateils,
  reqShopsSearch,
  reqShopCart,
  reqDetailsReply,
  reqPostDetailsReply,
  reqShopsClassSearch,
  reqSpike,
  reqSpikeclick,
  reqMint,
  reqComment,
  reqBuyImmediately,
  reqAssemble,
  reqCollageOrderMine,
  reqCouponHome,
  reqCouponMine,
  reqLevelAddress,
} from "../API/index.js";

export default {
  //首页请求
  async getIndex({commit},p){
    const result = await reqIndex(p||'');
    if(result.status === 200){
      commit(RECEIVE_INDEX,{index: result})
    }
  },
  //异步请求商品详情
  async getDateils({commit},{id,token,flash_sale_id}){
    const result = await reqDateils(id,token,flash_sale_id);
    if(result.status === 200){
      commit(RECEIVE_DATEILS,{details: result})
    }
  },

  //异步请求商品分类
  async getClassification({commit},id){
    console.log(id)
    let result;
    if(id !== ""){
      result = await reqClassification(id);
    }else{
      result = await reqClassification();
    }
    if(result.status === 200){
      commit(RECEIVE_CLASSIFICATION,{classification: result});
    }
  },
  //商品搜索
  async getShopsSearch({commit} , {q , int , packages , in_stock , preferential , brand , the_price}){
    console.log(q)
    const result = await reqShopsSearch(q , int , packages , in_stock , preferential , brand , the_price);
    if(result.status === 200){
      commit(RECEIVE_SHOPSSEARCH,{shopssearch: result})
    }
  },
  //分类商品搜索
  async getShopsClassSearch({commit},{id,sort,sort_asc,spec,price}){
    const result = await reqShopsClassSearch(id,sort,sort_asc,spec,price);
    if(result.status === 200){
      commit(RECEIVE_SHOPCLASSSEARCH,{shopssearch: result})
    }
  },
  //购物车
  async getShopCart({commit},{id,goods_id}){
    const result = await reqShopCart(id,goods_id);
    if(result.status === 200){
      commit(RECEIVE_SHOPCART,{shopcart: result});
    }
  },
  //评论详情回复接收数据
  async getReply({commit},comment_id){
    const result = await reqDetailsReply(comment_id);
    if(result.status == 200){
      commit(RECEIVE_REPLY,{reply: result.sql})
    }
  },
  //评论详情回复发送数据
  async getReplySend({commit},{token,comment_id,content}){
    const result = await reqPostDetailsReply(token,comment_id,content);
    if(result.status == 200){
      commit(RECEIVE_REPLYREND,{replysend: result.sql})
    }
  },
  //秒杀点击发送数据
  async getSpikeclick({commit},{start_time,end_time}){
    const result = await reqSpikeclick(start_time,end_time);
    if(result.status == 200){
      commit(RECEIVE_SPIKE,{spike: result})
    }
  },
  //秒杀默认数据
  async getSpike({commit}){
    const result = await reqSpike();
    if(result.status == 200){
      commit(RECEIVE_SPIKE,{spike: result});
    }
  },
  //秒杀默认数据
  async getMint({commit},token){
    const result = await reqMint(token);
    if(result.status == 200){
      commit(RECEIVE_MINT,{mint: result});
    }
  },
  //商品评价数据
  async getComment({commit},{token,goods_id}){
    const result = await reqComment( token,goods_id);
    if(result.status == 200){
      commit(RECEIVE_COMMENT,{comment: result});
    }
  },
  //立即购买数据
  async getBuyImmediately({commit},{token,goods_id,goods_num,spec_key,spec_key_name,action,cartId,address_id,type}){
    console.log(type)
    const result = await reqBuyImmediately(token,goods_id,goods_num,spec_key,spec_key_name,action,cartId,address_id,type);
    if(result.status == 200){
      commit(RECEIVE_PURCHASE,{purchase: result});
    }
  },
  //拼团数据
  async getAssemble({commit},p){
    const result = await reqAssemble(p);
    if(result.status == 200){
      commit(RECEIVE_ASSEMBLE,{assemble: result});
    }
  },
  //拼团订单
  async getCollageOrderMine({commit},{token,type}){
    const result = await reqCollageOrderMine(token,type);
    if(result.status == 200){
      commit(RECEIVE_COLLAGEORDER,{collageorder: result});
    }
  },
  //优惠券首页
  async getCouponHome({commit},token){
    const result = await reqCouponHome(token);
    if(result.status == 200){
      commit(RECEIVE_COUPONHOME,{couponhome: result});
    }
  },
  //优惠券个人中心
  async getCouponMin({commit},{token,type}){
    const result = await reqCouponMine(token,type);
    if(result.status == 200){
      commit(RECEIVE_COUPONMINE,{couponmine: result});
    }
  },
  //三级联动省市区
  async getLevelAddress({commit},{token,parent_id}){
    const result = await reqLevelAddress(token,parent_id);
    if(result.status == 200){
      commit(RECEIVE_REGION,{region: result});
    }
  }
}


