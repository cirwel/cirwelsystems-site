import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

function getInitialRefined() {
  if (typeof window === 'undefined') return false
  // URL param wins, so a link like ?refined=1 forces the variant for A/B review.
  const params = new URLSearchParams(window.location.search)
  if (params.has('refined')) {
    const v = params.get('refined')
    return v === '' || v === '1' || v === 'true'
  }
  return window.localStorage.getItem('cirwel-refined') === '1'
}

export function ThemeProvider({ children }) {
  const [isDark] = useState(() => {
    document.documentElement.classList.add('dark')
    return true
  })
  const [refined, setRefined] = useState(getInitialRefined)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('refined', refined)
    window.localStorage.setItem('cirwel-refined', refined ? '1' : '0')
  }, [refined])

  const toggleTheme = () => {}
  const toggleRefined = () => setRefined((r) => !r)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, refined, toggleRefined }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
