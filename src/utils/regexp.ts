export interface RegObjType {
  regVal: RegExp,
  name: string
}

export const isNumber: RegObjType = {
  regVal: /^[0-9]*$/g,
  name: '匹配数字'
}
export const isNonnegativeInteger : RegObjType = {
  regVal: /^\d+$/g,
  name: '匹配非负整数（正整数 + 0）'
}
export const isPositiveInteger: RegObjType = {
  regVal: /^[0-9]*[1-9][0-9]*$/g,
  name: '匹配正整数'
}