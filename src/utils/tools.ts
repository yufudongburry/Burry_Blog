// 禁用某一种类型
type notDate<T> = T extends Date ? never : T
type notSpecify<T, E> = T extends E ? never : T
function log<T>(data : notSpecify<T, string>) {}
log('l')

// 实现Readonly，接收一个泛型参数，并返回一个完全一样的类型，只是所有属性都会被readonly所修饰
type myReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
interface toDo {
  name: string,
  age: number
}
const obj: myReadonly<toDo> = {
  name: 'ssss',
  age:50
}
obj.age = 65

// 实现First，他接受一个数组 T 并返回它的第一个元素类型
type First<T extends any[]> = T extends [] ? never : T[0]
type a = [string, never, Date]
type a1 = First<a>
let a: a1 = 52

// 实现TupleToObject，传入元组类型，将元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来
// as const 作用演示
// function asConst(){
//   let a:string = "abc";
//   let b = (firstname:string,lastname:string):string => firstname + lastname;
//   return [a,b] as const;
// }
// let [m,n] = asConst()
// m = '555'
// n('ll','kk')
const tuple = ['sss', 52, 'modeX'] as const
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
type result = TupleToObject<typeof tuple>
let c: result = {
  sss:66,
  52:52,
  modeX:"modeX"
}

// 创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度
type Length<T extends readonly any[]> = T['length']
type lengthArr = ['sss','kkal','pop','lll']
type xx = Length<lengthArr>

// 实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型
type IF<C extends boolean, T ,F> = C extends true ? T : F

// 这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组
type Concat<T extends any[], F extends any[]> = [...T, ...F]

// 实现 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false
type Includes<T, F  extends readonly any[]> = T extends F[number] ? true : false

// 实现通用的Array.push类型
type Push<T extends unknown[], F> = [...T, F]

// 实现类型 Array.unshift类型
type Unshift<T extends unknown[], F> = [F, ...T]

// 实现内置Parameters类型
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer U) => any ? U : never

// 实现内置awaited
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer U> ? (U extends Promise<unknown> ? MyAwaited<U> : U) : never
