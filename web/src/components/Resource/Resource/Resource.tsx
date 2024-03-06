import type {
  DeleteResourceMutation,
  DeleteResourceMutationVariables,
  FindResourceById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  resource: NonNullable<FindResourceById['resource']>
}

const Resource = ({ resource }: Props) => {
  const [deleteResource] = useMutation(DELETE_RESOURCE_MUTATION, {
    onCompleted: () => {
      toast.success('Zdroj byl smazán')
      navigate(routes.resources())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteResourceMutationVariables['id'], name: string) => {
    if (confirm('Opravdu chcete smazat zdroj ' + name + '?')) {
      deleteResource({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Detail zdroje {resource.name}
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{resource.id}</td>
            </tr>
            <tr>
              <th>Název</th>
              <td>{resource.name}</td>
            </tr>
            <tr>
              <th>Nadřízený</th>
              <td>{resource.parent?.name}</td>
            </tr>
            <tr>
              <th>Typ</th>
              <td>{resource.kind?.name}</td>
            </tr>
            <tr>
              <th>Vytvořen</th>
              <td>{timeTag(resource.createdAt)}</td>
            </tr>
            <tr>
              <th>Aktualizován</th>
              <td>{timeTag(resource.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editResource({ id: resource.id })}
          className="rw-button rw-button-blue"
        >
          Upravit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(resource.id, resource.name)}
        >
          Smazat
        </button>
      </nav>
    </>
  )
}

export default Resource
