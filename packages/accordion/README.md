# `@oversea/accordion`

## 组件简介

一个带有账号、密码输入、国际化、黑夜模式切换和请求功能的卡片式表单组件，适用于多种业务场景。


## 主要功能

- 支持账号/密码输入
- 支持 GET/POST 请求(可配置 URL 和参数)
- 支持国际化(i18n)，多语言自动切换
- 支持黑夜/白天模式切换
- 支持自定义主题色和回调

## 技术栈要求

- React 18+
- TypeScript 4.5+
- Tailwind CSS(样式依赖)
- axios(请求依赖)
- react-i18next(国际化依赖)

## 典型使用场景

- 后台管理系统的登录、授权、演示表单
- 需要快速集成账号密码验证的业务场景
- 需要支持多语言和主题切换的 UI 场景

## 属性说明

| 属性名          | 类型                          | 说明                 |
| --------------- | ----------------------------- | -------------------- |
| labelKey        | string                        | 按钮文案的 i18n key  |
| primary         | boolean                       | 是否主按钮，影响配色 |
| backgroundColor | string                        | 自定义背景色         |
| getUrl          | string                        | GET 请求地址         |
| postUrl         | string                        | POST 请求地址        |
| postData        | Record<string, any>           | POST 数据体          |
| requestConfig   | AxiosRequestConfig            | axios 请求配置       |
| onSuccess       | (resp: AxiosResponse) => void | 请求成功回调         |
| onError         | (err: any) => void            | 请求失败回调         |
| darkMode        | boolean                       | 是否启用黑夜模式     |

## 使用示例


### 基础用法
```tsx
import Accordion from '@oversea/accordion';

<Accordion
  labelKey="submit"
  getUrl="/api/user"
  postUrl="/api/login"
  postData={{ extra: 'any' }}
  primary
  darkMode={false}
  backgroundColor="bg-white"
  onSuccess={resp => alert(resp.data.message)}
  onError={err => console.error(err)}
/>;
```

### 国际化多语言（需配置 i18n 资源）

```tsx
<Accordion labelKey="submit" />
```


### 黑夜模式

```tsx
<Accordion darkMode />
```

## 国际化配置说明

请在 `src/i18n/locales/en.ts`、`src/i18n/locales/zh.ts` 等文件中维护多语言资源，并确保 i18n 初始化正确。
