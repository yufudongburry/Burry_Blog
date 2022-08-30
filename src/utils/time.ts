import moment from 'moment'
import { monthAbbList } from '@/jsonData/monthAbbList'

// 时间处理函数
// eslint-disable-next-line max-len
export const dateFormat = (val: number | string, format = 'YYYY-MM-DD HH:mm:ss'): string => moment(Number(val)).format(format)

// 转化英文月份缩写
export const monthAbb = (month: string | number): string => {
  let data = monthAbbList.find(item => item.month == month)
  return data!.abb
}
