// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import MainLayout from './layouts/MainLayout/MainLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={MainLayout}>
        <Set wrap={ScaffoldLayout} title="Kompetence zdrojů" titleTo="resourceCapabilities" buttonLabel="Nová kompetence" buttonTo="newResourceCapability">
          <Route path="/resource-capabilities/new" page={ResourceCapabilityNewResourceCapabilityPage} name="newResourceCapability" />
          <Route path="/resource-capabilities/{id:String}/edit" page={ResourceCapabilityEditResourceCapabilityPage} name="editResourceCapability" />
          <Route path="/resource-capabilities/{id:String}" page={ResourceCapabilityResourceCapabilityPage} name="resourceCapability" />
          <Route path="/resource-capabilities" page={ResourceCapabilityResourceCapabilitiesPage} name="resourceCapabilities" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Typy Zdrojů" titleTo="resourceKinds" buttonLabel="Nový typ zdroje" buttonTo="newResourceKind">
          <Route path="/resource-kinds/new" page={ResourceKindNewResourceKindPage} name="newResourceKind" />
          <Route path="/resource-kinds/{id:String}/edit" page={ResourceKindEditResourceKindPage} name="editResourceKind" />
          <Route path="/resource-kinds/{id:String}" page={ResourceKindResourceKindPage} name="resourceKind" />
          <Route path="/resource-kinds" page={ResourceKindResourceKindsPage} name="resourceKinds" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Zdroje" titleTo="resources" buttonLabel="Nový zdroj" buttonTo="newResource">
          <Route path="/resources/new" page={ResourceNewResourcePage} name="newResource" />
          <Route path="/resources/{id:String}/edit" page={ResourceEditResourcePage} name="editResource" />
          <Route path="/resources/{id:String}" page={ResourceResourcePage} name="resource" />
          <Route path="/resources" page={ResourceResourcesPage} name="resources" />
        </Set>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
