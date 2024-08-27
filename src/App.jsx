import { useState } from 'react'
import CourseTable from './CourseTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <CourseTable />
    </div>
  );
}

export default App
