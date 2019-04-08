import Login from './views/Login.vue'
import register from './views/register.vue'
import NotFound from './views/404.vue'
// import changePsw from './views/changePsw.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import team from './views/nav1/team.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import userInformation from './views/nav2/userInformation.vue'
import self from './views/nav2/self.vue'
import approval from './views/nav3/approval.vue'
import echarts from './views/charts/echarts.vue'
import { userInfo } from 'os';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/register',
        component: register,
        name: '',
        hidden: true
    },
    // {
    //     path: '/changePsw',
    //     component: changePsw,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '个人信息',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         // { path: '/table', component: Table, name: 'Table' },
    //         // { path: '/form', component: Form, name: '个人信息' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '信息查询',
        iconCls: 'fa fa-id-card-o',
        // leaf: true,
        children: [
            { path: '/userInformation', component: userInformation, name: '个人基本信息' },
            { path: '/self', component: self, name: '个人奖惩情况'},
            { path: '/team', component: team, name: '区队信息' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/approval', component: approval, name: '申请审批' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        leaf: true,
        children: [
            { path: '/echarts', component: echarts, name: '信息展示' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;