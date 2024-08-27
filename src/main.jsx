import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider attribute="class">
    <Theme accentColor="teal" panelBackground="solid" grayColor="mauve">
      <App />
    </Theme>
    </ThemeProvider>
  </StrictMode>,
)
