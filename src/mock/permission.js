import Mock from 'mockjs'

export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (username === 'admin' || username === 'wp') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menus: [
              {
                id: 1-1,
                path:'/',
                name:'index',
                menuName:'首页',
                icon: 'video-play',
                url: 'index/index',
              },
              {
                id: 1,
                path:'/shopmanagement',
                name:'shopmanagement',
                menuName:'供应商管理',
                icon: 'video-play',
                url: 'shopmanagement/shopmanagement',
              },
              {
                id: 2,
                menuName: '封箱管理',
                icon: 'location',
                children: [
                  {
                    path: '/packagerecording',
                    name: 'packagerecording',
                    menuName: '封箱记录',
                    icon: 'setting',
                    url: 'packagemanagement/packagerecording'
                  },
                ]
              },
              {
                id: 3,
                menuName: '收发货管理',
                icon: 'location',
                children: [
                  {
                    path: '/shiprecirding',
                    name: 'shiprecirding',
                    menuName: '发货记录',
                    icon: 'setting',
                    url: 'shipmanagement/shiprecirding'
                  },
                  {
                    path: '/Receiptrecirding',
                    name: 'Receiptrecirding',
                    menuName: '收获记录',
                    icon: 'setting',
                    url: 'shipmanagement/Receiptrecirding'
                  },
                ]
              },
              {
                id: 4,
                menuName: '数据报表',
                icon: 'location',
                children: [
                  {
                    path: '/boxdatatable',
                    name: 'boxdatatable',
                    menuName: '装箱数据报表',
                    icon: 'setting',
                    url: 'datatable/boxdatatable'
                  },
                  {
                    path: '/shipdatatable',
                    name: 'shipdatatable',
                    menuName: '发货数据报表',
                    icon: 'setting',
                    url: 'datatable/shipdatatable'
                  },
                ]
              },
              {
                id: 5,
                menuName: '业务管理',
                icon: 'location',
                children: [
                  {
                    path: '/role',
                    name: 'role',
                    menuName: '角色管理',
                    icon: 'setting',
                    url: 'businessmanagement/role'
                  },
                  {
                    path: '/user',
                    name: 'user',
                    menuName: '用户管理',
                    icon: 'setting',
                    url: 'businessmanagement/user'
                  },
                  {
                    path: '/organization',
                    name: 'organization',
                    menuName: '组织架构管理',
                    icon: 'setting',
                    url: 'businessmanagement/organization'
                  },
                ]
              },
              {
                id: 6,
                menuName: '日志管理',
                icon: 'location',
                children: [
                  {
                    path: '/operatinglog',
                    name: 'operatinglog',
                    menuName: '操作日志',
                    icon: 'setting',
                    url: 'log/operatinglog'
                  },
                  
                ]
              }
            ],
          
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (username === 'wp' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'index2',
                label: '首页',
                icon: 's-home',
                
                url: 'index/index'
              },
              {
                path: '/setting',
                name: 'setting',
                label: '设置',
                icon: 'video-play',
                url: 'setting/Setting'
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
