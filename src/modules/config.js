import Vue from 'vue';
import Mint from 'mint-ui';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import http from '../lib/httpclient'
import rem from './rem'

Vue.component('v-icon', Icon)
import 'mint-ui/lib/style.css'
import '../stylesheets/main.scss'

Vue.prototype.$http = http

rem()
Vue.use(Mint);
