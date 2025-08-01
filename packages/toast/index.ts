import { Toast } from './src/index'
import { toaster } from './src/hooks/useToaster'

export default Toast // 默认导出 Toast 组件，供直接引入使用
export { Toast, toaster } // 导出 toast 函数，支持函数式全局弹出 Toast