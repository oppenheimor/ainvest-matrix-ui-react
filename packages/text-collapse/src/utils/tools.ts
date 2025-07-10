import React from "react";

/**
 * 将 ReactNode 转换为数组
 * @param children - 需要转换的 ReactNode
 * @returns 转换后的数组
 */
export const toArray = (children: React.ReactNode): React.ReactNode[] => {
  if (children === null || children === undefined) return [];
  return React.Children.toArray(children);
};

// 工具函数：检查是否为有效文本
const isValidText = (val: React.ReactNode): val is string | number =>
  ["string", "number"].includes(typeof val);

// 工具函数：计算节点总长度
export const getNodesLen = (nodeList: React.ReactNode[]): number => {
  let totalLen = 0;
  for (let i = 0; i < nodeList.length; i += 1) {
    const node = nodeList[i];
    if (isValidText(node)) {
      totalLen += String(node).length;
    } else {
      totalLen += 1;
    }
  }
  return totalLen;
};

// 工具函数：切片节点
export const sliceNodes = (
  nodeList: React.ReactNode[],
  len: number
): React.ReactNode[] => {
  let currLen = 0;
  const currentNodeList: React.ReactNode[] = [];

  for (let i = 0; i < nodeList.length; i += 1) {
    if (currLen === len) {
      return currentNodeList;
    }

    const node = nodeList[i];
    const canCut = isValidText(node);
    const nodeLen = canCut ? String(node).length : 1;
    const nextLen = currLen + nodeLen;

    // 需要在当前节点内部切割
    if (nextLen > len) {
      const restLen = len - currLen;
      currentNodeList.push(String(node).slice(0, restLen));
      return currentNodeList;
    }

    currentNodeList.push(node);
    currLen = nextLen;
  }

  return nodeList;
};
