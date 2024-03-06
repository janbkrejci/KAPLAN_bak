import type {
  DeleteResourceMutation,
  DeleteResourceMutationVariables,
  FindResources,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Resource/ResourcesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_RESOURCE_MUTATION: TypedDocumentNode<
  DeleteResourceMutation,
  DeleteResourceMutationVariables
> = gql`
  mutation DeleteResourceMutation($id: String!) {
    deleteResource(id: $id) {
      id
    }
  }
`

const ResourcesList = ({ resources }: FindResources) => {
  const [deleteResource] = useMutation(DELETE_RESOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('Zdroj byl smazán')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteResourceMutationVariables['id'], name: string) => {
    if (confirm('Opravdu chcete smazat zdroj ' + name + '?')) {
      deleteResource({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Název</th>
            <th>Nadřízený</th>
            <th>Typ</th>
            <th>Vytvořen</th>
            <th>Aktualizován</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td>{truncate(resource.id)}</td>
              <td>{truncate(resource.name)}</td>
              <td>{truncate(resource.parent?.name || '')}</td>
              <td>{truncate(resource.kind.name)}</td>
              <td>{timeTag(resource.createdAt)}</td>
              <td>{timeTag(resource.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.resource({ id: resource.id })}
                    title={'Zobrazit podrobnosti zdroje ' + resource.name}
                    className="rw-button rw-button-small"
                  >
                    Zobrazit
                  </Link>
                  <Link
                    to={routes.editResource({ id: resource.id })}
                    title={'Upravit zdroj ' + resource.name}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Upravit
                  </Link>
                  <button
                    type="button"
                    title={'Smazat zdroj ' + resource.name}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(resource.id, resource.name)}
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

export default ResourcesList
