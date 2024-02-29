import { Menu } from "@headlessui/react"
import { Link, routes } from "@redwoodjs/router"
import { DropDownMenu, MenuItem } from "src/components/DropDownMenu/DropDownMenu"

type MainLayoutProps = {
  children?: React.ReactNode
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const MainLayout = ({ children }: MainLayoutProps) => {
  return <>
    <header className="bg-gray-200 flex py-1 px-4 justify-between items-center shadow-lg fixed top-0 left-0 right-0">
      <Link to={routes.home()}>KAPLAN</Link>
      <div className="flex gap-2 items-center">

        <DropDownMenu name="Číselníky" childrenAlign="left">
            <div className="py-1">
              <MenuItem to={routes.resources()} label="Zdroje" />
              <MenuItem to={routes.resourceKinds()} label="Typy zdrojů" />
              <MenuItem to={routes.resourceCapabilities()} label="Kompetence zdrojů" />
            </div>
        </DropDownMenu>

      </div>
      <div></div>
    </header>
    <main className="mt-12 mb-8 max-h-screen overflow-y-hidden">{children || 'obsah stránky'}</main>
    <footer className="bg-gray-200 text-gray-500 p-1 px-4 flex justify-end fixed bottom-0 right-0 left-0">
      <p>© 2024 jbk</p>
    </footer>
  </>
}

export default MainLayout
