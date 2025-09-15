import styled from '@emotion/styled'
import LeftNavigation from './components/LeftNavigation'
import { Toaster } from 'react-hot-toast'
import ContextProvider from './store/ContextProvider'

function App() {
  return (
    <ContextProvider>
      <RootWrapper>
        <Toaster />
        <LeftNavigation />
      </RootWrapper>
    </ContextProvider>
  )
}

export default App

const RootWrapper = styled("div")({
  width: "100vw",

})