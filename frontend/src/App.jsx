import { Outlet } from "react-router-dom"


function App() {

  return (
    <>
      <div className="bg-[#F7F8F9] min-h-screen flex flex-col">
        <nav>Navbar</nav>
        <div className="flex-grow">
          <Outlet/>
        </div>
        <footer className="mt-auto">Footer</footer>
      </div>
    </>
  )
}

export default App
 