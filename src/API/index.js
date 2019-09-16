import ajax from "./ajax";
import {URL} from "./url.js"
//首页请求
export const reqIndex = (p) => ajax(URL+'/api/Index/index',{p},'post');

//发送详情页数据请求
export const reqDateils = (goods_id,token,flash_sale_id) => ajax(URL+'/api/goods/goodsinfo',{goods_id,token:token||'',flash_sale_id:flash_sale_id||''},'post');

//评论详情回复数据请求
export const reqDetailsReply = (comment_id) => ajax(URL+"/api/goods/tp_reply",{comment_id},'post');

//评论详情回复发送数据
export const reqPostDetailsReply = (token,comment_id,content) => ajax(URL+"/api/goods/reply_cz",{token,comment_id,content},'post')

//导航分类列表请求
export const reqClassification = (id) => ajax(URL+'/api/Index/classification',{id},'post');

//商品搜索
export const reqShopsSearch = (q,sort,sort_asc,spec,price,sel) => ajax(URL+'/api/goods/goods_list',{q ,sort:sort||'',sort_asc: sort_asc||'',spec:spec||'',price:price||'',sel: sel||''},'post');

//商品分类搜索
export const reqShopsClassSearch = (id,sort,sort_asc,spec,price,sel) => ajax(URL+"/api/goods/goods_list",{id,sort:sort||'',sort_asc: sort_asc||'',spec:spec||'',price:price||'',sel: sel||''},'post');

//加入购物车
export const reqShopsCart = (token,goods_id,goods_num,spec_key,spec_key_name,selected) => ajax(URL+'/api/cart/add_carts',{token,goods_id,goods_num,spec_key,spec_key_name,selected},'post');

//加入收藏
export const reqCollect = (goods_id,token) => ajax(URL+'/api/goods/collect',{goods_id,token},'post');

//立即购买
export const reqBuyImmediately = (token,goods_id,goods_num,spec_key,spec_key_name,action,cart_id,address_id,type) => ajax(URL+'/api/cart/cart2',{token,goods_id,goods_num,spec_key,spec_key_name,action,cart_id:cart_id||'',address_id,type: type||''},'post');

//提交订单
export const reqOrder = ({token,goods_id,goods_num,spec_key,spec_key_name,action,total_amount,pay_type,user_note,shipping_fee,paypwd,address_id,cart_id,couponId}) => ajax(URL+'/api/cart/order',{token,goods_id,goods_num,spec_key,spec_key_name,action,total_amount,pay_type: pay_type||2,user_note,shipping_fee,address_id,paypwd: paypwd||'',cart_id:cart_id||'',couponId: couponId||''},'post');

//购物车总体数据
export const reqShopCart = (token,goods_id) => ajax(URL+"/api/cart/cart",{token,goods_id:goods_id||''},'post');

//购物车删除商品
export const reqShopCartRemove = (token,id) => ajax(URL+'/api/cart/delete',{token,id},'post');

//购物车商品数量
export const reqShopCartNumber = (token,id,number) => ajax(URL+'/api/cart/cart_num_cz',{token,id,number},'post');

//购物车提交订单
export const reqShopCarSubmit = (token,goods_id,address,total_price) => ajax(URL+'/api/index/submit_shopcart',{token,goods_id,address,total_price},'post');

//获取用户详细地址
export const reqUserAddress = (token) => ajax(URL+"/api/user/address_list",{token},'post');

//评论点赞
export const reqGive = (comment,goods_id,token) => ajax(URL+"/api/goods/givealike",{comment,goods_id,token},'post');

//秒杀
export const reqSpikeclick = (start_time,end_time) => ajax(URL+"/api/Activity/seconds",{start_time,end_time,p: 1},'post');

//默认秒杀数据
export const reqSpike = () => ajax(URL+"/api/Activity/flash_sale",{},'post');

//个人中心
export const reqMint = (token) => ajax(URL+'/api/user/index',token,'post');

//用户评价
export const reqComment = (token,goods_id) => ajax(URL+'/api/goods/comment_list',{token: token||'',goods_id},'post');

//规格库存
export const reqStock = (goods_id,spec_key) => ajax(URL+'/api/goods/get_store_info',{goods_id,spec_key},'post');

//拼团
export const reqAssemble = (p) => ajax(URL+'/api/team/index/p/',{p: p||''},'post');

//领取优惠券中心
export const reqCouponHome = (token) => ajax(URL+'/api/activity/coupon_list',{token: token||''},'post');

//详情领取优惠券
export const reqCouponReceive = (token,coupon_id) => ajax(URL+'/api/activity/getCoupon',{token: token||'',coupon_id},'post');

//优惠券个人中心
export const reqCouponMine = (token,type) => ajax(URL+'/api/activity/mycoupon_list',{token: token||'', type},'post');

//拼团订单
export const reqCollageOrder = ({token,goods_id,spec_key,goods_num,found_id,address_id,action,pay_type,shipping_fee,user_note,paypwd}) => ajax(URL+'/api/team/addOrder',{token,goods_id,spec_key,goods_num,found_id: found_id||'',address_id,action,pay_type,shipping_fee: shipping_fee||'',user_note: user_note||'',paypwd: paypwd||''},'post');

//拼团规格库存
export const reqCollageStock = (goods_id,spec_key) => ajax(URL+'/api/goods/get_teamstore_info',{goods_id,spec_key},'post');

//拼团订单
export const reqCollageOrderMine = (token,type) => ajax(URL+"/api/user/teamorder_list",{token,type: type||''},'post');

//多门店申请
export const reqAddStore = ({token,shop_name,province_id,city_id,district_id,shop_address,longitude,latitude,shop_desc,license,username,email,sfz,zygoods}) => ajax(URL+"/api/login/addPost",{token,shop_name,province_id,city_id,district_id,shop_address,longitude,latitude,shop_desc,license,username,email,sfz,zygoods},'post');

//多门店三级联动地址
export const reqLevelAddress = (token,parent_id) => ajax(URL+"/api/login/getRegion",{token,parent_id: parent_id||''},'post');
