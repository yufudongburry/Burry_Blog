// 封装storage

const useStorage = ($storage: any) => {
  // 根据key获取值
  const get = (key: string) => {
    let value = $storage.getItem(key)
    try {
      value = JSON.parse(value)
      return value
    } catch {
      return value
    }
  }

  // 存储值
  const set = (key: string, value: any) => $storage.setItem(key, value ? JSON.stringify(value) : value)

  // 移除值
  const remove = (key: string) => $storage.removeItem(key)

  // 移除除了key之外的所有值
  const clearExcept = (key: string) => {
    for (let i = 0; i < $storage.length; i++) {
      const itemKey: string | undefined = $storage.key(i)
      if (itemKey && itemKey !== key) {
        $storage.removeItem(itemKey)
      }
    }
  }

  // 移除所有
  const removeAll = () => {
    for (const itemKey in $storage) {
      if (itemKey) {
        $storage.removeItem(itemKey)
      }
    }
  }

  return {
    get,
    set,
    remove,
    removeAll,
    clearExcept,
  }
}

const SessionStorageService = useStorage(window.sessionStorage || sessionStorage)
const LocalStorageService = useStorage(window.localStorage || localStorage)

export {
  SessionStorageService,
  LocalStorageService,
}
