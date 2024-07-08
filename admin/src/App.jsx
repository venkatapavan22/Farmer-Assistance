import { BrowserRouter } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import DataProvider from './Context/DataProvider'

const App = () => {
  return (
    <DataProvider>
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
