import type {
  DeleteResourceKindMutation,
  DeleteResourceKindMutationVariables,
  FindResourceKinds,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ResourceKind/ResourceKindsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_RESOURCE_KIND_MUTATION: TypedDocumentNode<
  DeleteResourceKindMutation,
  DeleteResourceKindMutationVariables
> = gql`
  mutation DeleteResourceKindMutation($id: String!) {
    deleteResourceKind(id: $id) {
      id
    }
  }
`

const ResourceKindsList = ({ resourceKinds }: FindResourceKinds) => {
  const [deleteResourceKind] = useMutation(DELETE_RESOURCE_KIND_MUTATION, {
    onCompleted: () => {
      toast.success('Typ zdroje byl smazán')
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

  const onDeleteClick = (id: DeleteResourceKindMutationVariables['id'], name: String) => {
    if (confirm('Opravdu chcete smazat typ zdroje ' + name + '?')) {
      deleteResourceKind({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Název</th>
            <th>Hodinová sazba</th>
            <th>Vytvořen</th>
            <th>Aktualizován</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {resourceKinds.map((resourceKind) => (
            <tr key={resourceKind.id}>
              <td>{truncate(resourceKind.id)}</td>
              <td>{truncate(resourceKind.name)}</td>
              <td>{truncate(resourceKind.hourlyCost)}</td>
              <td>{timeTag(resourceKind.createdAt)}</td>
              <td>{timeTag(resourceKind.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.resourceKind({ id: resourceKind.id })}
                    title={'Zobrazit podrobnosti typu zdroje ' + resourceKind.name}
                    className="rw-button rw-button-small"
                  >
                    Zobrazit
                  </Link>
                  <Link
                    to={routes.editResourceKind({ id: resourceKind.id })}
                    title={'Upravit typ zdroje ' + resourceKind.name}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Upravit
                  </Link>
                  <button
                    type="button"
                    title={'Smazat typ zdroje ' + resourceKind.name}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(resourceKind.id, resourceKind.name)}
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

export default ResourceKindsList
