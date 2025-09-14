import styled from '@emotion/styled'
import LeftNavigation from './components/LeftNavigation'
import LeftPanelProfileCard from './components/LeftPanelProfileCard'

function App() {
  return (
    <RootWrapper>
      <LeftNavigation />

    </RootWrapper>
  )
}

export default App

const RootWrapper = styled("div")({
  width: "100vw",

})