import Vue from 'vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'

// Register a global component, form a named SVG-ICON
Vue.component('svg-icon', SvgIcon);

// Reference SVG icon
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('@/static/svg', true, /\.svg$/);

requireAll(req)
