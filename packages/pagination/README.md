# Pagination 分页组件

一个基于 React Hook 的分页逻辑处理组件，提供完善的分页计算和状态管理功能。

## 特性

- 🎯 **完整的 TypeScript 支持** - 提供完整的类型定义
- 🔄 **智能分页算法** - 自动处理省略号和页码显示逻辑
- 🛡️ **边界条件处理** - 自动验证和修正输入参数
- 📦 **零依赖** - 仅依赖 React，无其他第三方依赖
- 🎨 **高度可定制** - 支持自定义最大显示页码数
- 📋 **丰富的状态信息** - 提供上一页/下一页状态判断

## 安装

```bash
npm install @ainvest/pagination
# 或
pnpm add @ainvest/pagination
```

## 基础用法

```tsx
import { usePagination } from '@ainvest/pagination';

function MyPaginationComponent() {
  const { pages, hasPrevious, hasNext, currentPage, totalPages } = usePagination({
    currentPage: 5,
    totalPages: 20,
    maxDisplay: 9 // 可选，默认为 9
  });

  return (
    <div className="pagination">
      {/* 上一页按钮 */}
      <button disabled={!hasPrevious}>
        上一页
      </button>
      
      {/* 页码列表 */}
      {pages.map((page, index) => (
        <span key={index}>
          {page === 'ellipsis' ? '...' : (
            <button 
              className={page === currentPage ? 'active' : ''}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          )}
        </span>
      ))}
      
      {/* 下一页按钮 */}
      <button disabled={!hasNext}>
        下一页
      </button>
    </div>
  );
}
```

## API 参考

### usePagination

#### 参数

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| currentPage | number | 是 | - | 当前选中页码（从1开始） |
| totalPages | number | 是 | - | 总页数 |
| maxDisplay | number | 否 | 9 | 最大显示页码数 |

#### 返回值

| 属性 | 类型 | 描述 |
|------|------|------|
| pages | (number \| 'ellipsis')[] | 页码数组，省略号用字符串 'ellipsis' 表示 |
| hasPrevious | boolean | 是否有上一页 |
| hasNext | boolean | 是否有下一页 |
| currentPage | number | 当前页码（经过验证后的安全值） |
| totalPages | number | 总页数（经过验证后的安全值） |

## 工具函数

### calculateTotalPages

计算总页数。

```tsx
import { calculateTotalPages } from '@ainvest/pagination';

const totalPages = calculateTotalPages(totalItems, pageSize);
```

### formatPageInfo

格式化页码显示文本。

```tsx
import { formatPageInfo } from '@ainvest/pagination';

const info = formatPageInfo(currentPage, totalPages, totalItems, pageSize);
// 输出: "第 1-10 条，共 100 条"
```

### getSafePage

获取安全的页码值。

```tsx
import { getSafePage } from '@ainvest/pagination';

const safePage = getSafePage(inputPage, totalPages);
```

### isValidPage

验证页码是否有效。

```tsx
import { isValidPage } from '@ainvest/pagination';

const valid = isValidPage(page, totalPages);
```

## 分页显示规律

### 基础规则

1. **总页数 ≤ maxDisplay**: 显示所有页码
2. **当前页在前部**: 显示前 maxDisplay-2 页 + 省略号 + 最后一页
3. **当前页在后部**: 显示第一页 + 省略号 + 后 maxDisplay-2 页
4. **当前页在中部**: 显示第一页 + 省略号 + 中间页码 + 省略号 + 最后一页

### 示例

```
总页数: 20, 最大显示: 9

当前页 = 2:  [1, 2, 3, 4, 5, 6, 7, ..., 20]
当前页 = 10: [1, ..., 7, 8, 9, 10, 11, 12, 13, ..., 20]  
当前页 = 19: [1, ..., 14, 15, 16, 17, 18, 19, 20]
```

## 边界处理

- **负数页码**: 自动修正为 1
- **超出范围页码**: 自动修正为最大页码
- **负数总页数**: 自动修正为 0
- **无效输入**: 提供默认安全值

## 常量

```tsx
import { 
  DEFAULT_MAX_DISPLAY,        // 9
  MIN_DISPLAY_PAGES,          // 3
  ELLIPSIS_SYMBOL,            // 'ellipsis'
  DEFAULT_PAGE_SIZE_OPTIONS   // [10, 20, 50, 100]
} from '@ainvest/pagination';
```

## 完整示例

```tsx
import React, { useState } from 'react';
import { 
  usePagination, 
  calculateTotalPages, 
  formatPageInfo 
} from '@ainvest/pagination';

interface PaginationExampleProps {
  totalItems: number;
  pageSize: number;
}

export function PaginationExample({ totalItems, pageSize }: PaginationExampleProps) {
  const totalPages = calculateTotalPages(totalItems, pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  const { 
    pages, 
    hasPrevious, 
    hasNext, 
    currentPage: safePage 
  } = usePagination({
    currentPage,
    totalPages,
    maxDisplay: 7
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const pageInfo = formatPageInfo(safePage, totalPages, totalItems, pageSize);

  return (
    <div className="pagination-container">
      {/* 页码信息显示 */}
      <div className="page-info">{pageInfo}</div>
      
      {/* 分页控件 */}
      <div className="pagination">
        <button 
          disabled={!hasPrevious}
          onClick={() => handlePageChange(safePage - 1)}
        >
          上一页
        </button>
        
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === 'ellipsis' ? (
              <span className="ellipsis">...</span>
            ) : (
              <button
                className={page === safePage ? 'active' : ''}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        
        <button 
          disabled={!hasNext}
          onClick={() => handlePageChange(safePage + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
}
```

## 许可证

MIT
