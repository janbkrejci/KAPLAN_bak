import type {
  DeleteResourceKindMutation,
  DeleteResourceKindMutationVariables,
  FindResourceKindById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  resourceKind: NonNullable<FindResourceKindById['resourceKind']>
}

const ResourceKind = ({ resourceKind }: Props) => {
  const [deleteResourceKind] = useMutation(DELETE_RESOURCE_KIND_MUTATION, {
    onCompleted: () => {
      toast.success('Typ zdroje byl smazán')
      navigate(routes.resourceKinds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteResourceKindMutationVariables['id']) => {
    if (confirm('Opravdu chcete smazat typ zdroje ' + id + '?')) {
      deleteResourceKind({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Detail typu zdroje {resourceKind.name}
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{resourceKind.id}</td>
            </tr>
            <tr>
              <th>Název</th>
              <td>{resourceKind.name}</td>
            </tr>
            <tr>
              <th>Hodinová sazba</th>
              <td>{resourceKind.hourlyCost}</td>
            </tr>
            <tr>
              <th>Vytvořen</th>
              <td>{timeTag(resourceKind.createdAt)}</td>
            </tr>
            <tr>
              <th>Aktualizován</th>
              <td>{timeTag(resourceKind.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editResourceKind({ id: resourceKind.id })}
          className="rw-button rw-button-blue"
        >
          Upravit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(resourceKind.id)}
        >
          Smazat
        </button>
      </nav>
    </>
  )
}

export default ResourceKind
