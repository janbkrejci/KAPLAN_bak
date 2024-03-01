import type {
  DeleteResourceCapabilityMutation,
  DeleteResourceCapabilityMutationVariables,
  FindResourceCapabilities,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ResourceCapability/ResourceCapabilitiesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_RESOURCE_CAPABILITY_MUTATION: TypedDocumentNode<
  DeleteResourceCapabilityMutation,
  DeleteResourceCapabilityMutationVariables
> = gql`
  mutation DeleteResourceCapabilityMutation($id: String!) {
    deleteResourceCapability(id: $id) {
      id
    }
  }
`

const ResourceCapabilitiesList = ({
  resourceCapabilities,
}: FindResourceCapabilities) => {
  const [deleteResourceCapability] = useMutation(
    DELETE_RESOURCE_CAPABILITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Kompetence byla smazána')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (
    id: DeleteResourceCapabilityMutationVariables['id'],
    name: String
  ) => {
    if (
      confirm('Opravdu chcete smazat kompetenci ' + name + '?')
    ) {
      deleteResourceCapability({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Název</th>
            <th>Vytvořena</th>
            <th>Aktualizována</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {resourceCapabilities.map((resourceCapability) => (
            <tr key={resourceCapability.id}>
              <td>{truncate(resourceCapability.id)}</td>
              <td>{truncate(resourceCapability.name)}</td>
              <td>{timeTag(resourceCapability.createdAt)}</td>
              <td>{timeTag(resourceCapability.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.resourceCapability({
                      id: resourceCapability.id,
                    })}
                    title={
                      'Zobrazit podrobnosti kompetence ' +
                      resourceCapability.name
                    }
                    className="rw-button rw-button-small"
                  >
                    Zobrazit
                  </Link>
                  <Link
                    to={routes.editResourceCapability({
                      id: resourceCapability.id,
                    })}
                    title={'Upravit kompetenci ' + resourceCapability.name}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Upravit
                  </Link>
                  <button
                    type="button"
                    title={'Smazat kompetenci ' + resourceCapability.name}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(resourceCapability.id, resourceCapability.name)}
                  >
                    Smazat
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ResourceCapabilitiesList
