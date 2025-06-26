/**
 * @fileoverview 多行骨架样式计算工具
 * 处理lineWidths和lineHeights配置，生成对应的CSS样式
 */

import * as React from 'react';

/**
 * 标准化样式值 - 数字自动添加px单位
 */
const normalizeValue = (value: string | number): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  // 字符串处理
  const trimmed = value.trim();

  // 检查是否是纯数字字符串
  if (/^\d+(\.\d+)?$/.test(trimmed)) {
    return `${trimmed}px`;
  }
  return trimmed;
};

/**
 * 从配置中获取指定索引的值
 * 数组模式：返回对应索引值，超出时使用最后一个值
 * 单值模式：所有索引都返回相同值
 */
const getValueFromConfig = (index: number, config: (string | number)[] | string | number): string => {
  // 如果是数组，返回对应索引的值
  if (Array.isArray(config)) {
    if (index < config.length) {
      return normalizeValue(config[index]);
    }
    // 超出数组长度，使用最后一个值
    return normalizeValue(config[config.length - 1]);
  }

  // 如果是单个值，直接使用
  return normalizeValue(config);
};

/**
 * 计算指定行的样式对象
 * @param index 行索引(从0开始)
 * @param widths 宽度配置
 * @param heights 高度配置
 * @returns CSS样式对象
 */
export const calculateLineStyles = (
  index: number,
  widths?: (string | number)[] | string | number,
  heights?: (string | number)[] | string | number,
): React.CSSProperties => {
  const styles: React.CSSProperties = {};

  // 处理宽度
  if (widths !== undefined) {
    styles.width = getValueFromConfig(index, widths);
  }

  // 处理高度
  if (heights !== undefined) {
    styles.height = getValueFromConfig(index, heights);
  }

  return styles;
};
