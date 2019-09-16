/**
 * mutations 模块
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
  RECEIVE_COUPONHOME,
  RECEIVE_COUPONMINE,
  RECEIVE_REGION
} from "./mutations-type";

export default {
  //将商品数据更新state
  [RECEIVE_INDEX](state,{index}){
    state.index = index;
  },
  //将商品详情数据更新state
  [RECEIVE_DATEILS](state,{details}){
    state.details = details;
  },
  //将分类数据更新state
  [RECEIVE_CLASSIFICATION](state,{classification}){
    state.classification = classification;
  },
  //将搜索到的商品信息更新到state
  [RECEIVE_SHOPSSEARCH](state,{shopssearch}){
    state.shopssearch = shopssearch;
  },
  //将购物车信息更新到state
  [RECEIVE_SHOPCART](state,{shopcart}){
    state.shopcart = shopcart
  },
  //将评论回复数据信息更新到state
  [RECEIVE_REPLY](state,{reply}){
    state.reply = reply;
  },
  //将评论回复数据信息更新到state
  [RECEIVE_REPLYREND](state,{replysend}){
  state.replysend = replysend;
  },
  //将评论回复数据信息更新到state
  [RECEIVE_SHOPCLASSSEARCH](state,{shopssearch}){
    state.shopssearch = shopssearch;
  },
  //将秒杀数据信息更新到state
  [RECEIVE_SPIKE](state,{spike}){
    state.spike = spike;
  },
  //将个人中心信息更新到state
  [RECEIVE_MINT](state,{mint}){
    state.mint = mint;
  },
  //将商品评价信息更新到state
  [RECEIVE_COMMENT](state,{comment}){
    state.comment = comment;
  },
  //将立即购买信息更新到state
  [RECEIVE_PURCHASE](state,{purchase}){
    state.purchase = purchase;
  },
  //将拼团信息更新到state
  [RECEIVE_ASSEMBLE](state,{assemble}){
    state.assemble = assemble;
  },
  //将拼团信息更新到state
  [RECEIVE_COLLAGEORDER](state,{collageorder}){
    state.collageorder = collageorder;
  },
  //将优惠券首页信息更新到state
  [RECEIVE_COUPONHOME](state,{couponhome}){
    state.couponhome = couponhome;
  },
  //将优惠券个人中心信息更新到state
  [RECEIVE_COUPONMINE](state,{couponmine}){
    state.couponmine = couponmine;
  },
  //将省市区三级联动信息更新到state
  [RECEIVE_REGION](state,{region}){
    state.region = region;
  },
}

