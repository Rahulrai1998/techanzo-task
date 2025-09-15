import styled from '@emotion/styled'
import LeftNavigation from './components/LeftNavigation'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <RootWrapper>
      <Toaster />
      <LeftNavigation />
    </RootWrapper>
  )
}

export default App

const RootWrapper = styled("div")({
  width: "100vw",

})