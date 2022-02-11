import React, { createContext, useContext, useState, useMemo } from 'react'

export const IsLoginContext = createContext()

// export function IsLoginProvider({ children }) {
//   return <IsLoginContext.Provider>{children}</IsLoginContext.Provider>
// }

export function IsLoginProvider({ children }) {
  const userId = localStorage.getItem('id')
  const token = localStorage.getItem('token')

  const [isLogin, setIsLogin] = useState(userId !== null && token !== null ? true : false)
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin])
  return <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>
}

export function useIsLoginState() {
  const context = useContext(IsLoginContext)
  if (!context) {
    throw new Error('Cannot find IsLoginProvider')
  }
  return context
}
