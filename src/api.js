import { get,post } from "./http"

import QS from "qs"
// const url = 'http://localhost:3000/'
// const url = '/api'


// 首页 
export const indexApi = (params) => {
    return get (`/hw/dataReport/getIndexData`,params)
}

export const echartsApi = (params) => {
    return get(`/hw/dataReport/getCharData`,params)
}

export const apiLogin = (params) =>{  //登录接口

    return post(`/hw/login`,QS.stringify(params))
}

export const apiLoOut = (params) =>{  //登出接口

    return get(`/hw/logout`,params)
}

export const shopgettableAll = (params) =>{  //供应商表格获取

    return get(`/hw/customer/getAll`,params)
}

export const shoptabledel = (params) =>{  //供应商删除

    return post(`/hw/customer/del`,QS.stringify(params))
}
export const shopaddtable = (params) =>{  //供应商新增
    return post(`/hw/customer/edit`,params)
}

export const shoppage = (params) =>{  //供应商分页
    return get(`/hw/customer/page`,params)
}

export const searchApi = (params) =>{
    return post(`/hw/customer/pageByKeyWord`,QS.stringify(params))
}

export const dialogAddFrom = (params) =>{
    return post(`/hw/address/edit`,params)
}

// export const dialogtableaddress = (params) => {  //收获地址表格
//     return get(`/hw/address/getAll`,params)
// }
export const dialogtableaddress = (params) => {  //收获地址表格
    return post(`/hw/address/getByCustomerId`,QS.stringify(params))
}
export const dialogtabledel = (id) => {
    return post(`/hw/address/realDel/${id}`) //地址弹框表格删除
}

export  const dialogselectSheng = (params) => {
    return get(`/hw/district/getAll`,params) //省
}

export const dialogtableEdit = (params) => {  //地址弹框表格修改
    return post(`/hw/address/edit`,params)
}

// export const shopedittable = (id) =>{  //供应商编辑

//     return post(`/hw/customer/realDel/${id}`,)
// }

//装箱管理>装箱记录

export const getTableData = (params) => {
    return post(`/hw/package/getPackageInfoPage`,QS.stringify(params))
}
//装箱管理>下拉框
export const getPackageInfoQuerys = (params) => {
    return get(`/hw/package/getPackageInfoQuerys`,params)
}
//装箱管理>查询
// export const getPackageInfoPage = (params) => {
//     return post(`/hw/package/getPackageInfoPage`,params)
// }

//装箱管理>装箱记录>详情
export const getTableDetails = (params) =>{
    return post(`/hw/package/getPackageDetail`,QS.stringify(params))
}
//装箱管理》打印
export const getPrintCode = (params) => {
    return get('/hw/package/generateBoxCodeId',params)
}



//收发货管理>发货记录
// export const logisticsRecordgetTableData = (params) =>{
//     return get(`/hw/logisticsRecord/page`,params)
// }
export const logisticsRecordgetTableData = (params) =>{
    return post(`/hw/logisticsRecord/getRecordByPage`,QS.stringify(params))
}

//收发货管理 >查询>下拉框

// export const getInvoiceRecodeQuerys = (params) => {
//     return get(`/hw/logisticsRecord/getInvoiceRecodeQuerys`,params)
// }

export const getInvoiceRecodeQuerys = (params) => {
    return get(`/hw/logisticsRecord/getSaleAreaQuerys`,params)
}

//收发货管理 >查询
// export const getRecordByPage = (params) => {
//     return post(`/hw/logisticsRecord/getRecordByPage`,QS.stringify(params))
// }

//收发货管理>发货记录>详情
// export const logisticsDetail = (id) =>{
//     return get(`/hw/logisticsDetail/get/${id}`)
// }
export const logisticsDetail = (params) =>{
    return get(`/hw/logisticsRecord/getLogisticDetailPage`,params)
}


// 业务管理 》角色管理

export const getTablesysRole = (params) =>{ //获取table
    return get(`/hw/sysRole/page`,params)
}

export const delTablesysRole = (id) => {  //删除
    return post(`/hw/sysRole/realDel/${id}`)
}

export const getlockOrUnlockRole = (params) =>{
    return get(`/hw/sysRole/lockOrUnlockRole`,params)
}

export const getsaveOrUpdateRole = (params) =>{  //增加修改
    return post(`/hw/sysRole/saveOrUpdateRole`,params)
}

export const rolePagesByKeyWord = (params) => {
    return get(`/hw/sysRole/pagesByKeyWord`,params)
}

export const getRoleAll = (params) => {
    return get(`/hw/sysRole/getAll`,params)
}

export const getTree = (params) => {
    return get(`/hw/sysMenu/getTreeMenuByUser`,params)
}



// 业务管理 》菜单管理
export const getTablesysMenu = (params) => {
    return get(`/hw/sysMenu/page`,params)
}

export const getTablesysMenuKeyWord = (params) => {
    return post(`/hw/sysMenu/pageByKeyWord`,QS.stringify(params))
}

export const delTablesysMenu = (id) =>{
    return post(`/hw/sysMenu/realDel/${id}`)
}

export const getsaveOrUpdateMenu = (params) => {

    return post(`/hw/sysMenu/saveOrUpdateMenu`,QS.stringify(params))
}

export const getParentId = (params) => {
    return get(`/hw/sysMenu/getAll`,params)
}



// 业务管理 》用户管理

export const getTablesysUser = (params) => {
    return get(`/hw/sysUser/getUserExtByPage`,params)
}
export const delTablesysUser = (params) =>{
    return post(`/hw/sysUser/del`,QS.stringify(params))
}
export const getsaveOrUpdateUser = (params) => {

    return post(`/hw/sysUser/saveOrUpdateSysUser`,params)
}

export const resetPassword = (params) => {
    return post(`/hw/sysUser/resetPassWord`,QS.stringify(params))
}

// 业务管理 》组织架构管理

export const getHieraDistrict = (params) =>{
    return get(`/hw/sysOrg/getOrgDistrictTree`,params)
}

// export const getOrgByDistrictPage = (params) => {
//     return get(`/hw/sysOrg/getOrgByDistrictPage`,params)
// }

export const getOrgByDistrictPage = (params) => {
    return get(`/hw/sysOrg/getTreeOrgs`,QS.stringify(params))
}


export const delrealDel = (params) => {
    return post(`/hw/sysOrg/del`,QS.stringify(params))
}

export const saveOrUpdateOrg = (params) => {
    return post(`/hw/sysOrg/saveOrUpdateOrg`,params)
}

export const searchpageByKeyWord = (params) => { //查询
    return post(`/hw/sysOrg/pageByKeyWord`,QS.stringify(params))
}

export const getSysOrgController = (params) => { //部门下拉框
    return get(`/hw/sysOrg/getAllNoSubOrgs`,params)
}
export const getOrgUserQuerya = (params) => { 
    return get( `/hw/sysOrg/getOrgUserQuerys`,params)
}

// export const getSysOrg = (params) => {
//     return get(`/hw/sysOrg/getOrgQuerys`,params)
// }


// 数据报表 》发货数据

export const getdeliveryDataPage = (params) =>{
    return get(`/hw/dataReport/getlogisticsDataPage`,params)
}
export const getTableApiPage = (params) => {
    return post(`/hw/dataReport/getPackDatePageByKeyWord`,QS.stringify(params))
}

export const getSelectApi = (params) => {  //查询下拉框
    return get(`/hw/logisticsRecord/getInvoiceRecodeQuerys`,params)
}
export const getSelectSale = (params) => {
    return get(`/hw/logisticsRecord/getSaleAreaQuerys`,params)
}

//日志管理
export const getLogtablePage = (params) =>{
    return get(`/hw/syslog/getLogsPage`,params)
}