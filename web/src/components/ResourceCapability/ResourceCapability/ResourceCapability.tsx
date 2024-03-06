import type {
  DeleteResourceCapabilityMutation,
  DeleteResourceCapabilityMutationVariables,
  FindResourceCapabilityById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

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

interface Props {
  resourceCapability: NonNullable<
    FindResourceCapabilityById['resourceCapability']
  >
}

const ResourceCapability = ({ resourceCapability }: Props) => {
  const [deleteResourceCapability] = useMutation(
    DELETE_RESOURCE_CAPABILITY_MUTATION,
    {
      onCompleted: () => {
        toast.success('Kompetence byla smazána')
        navigate(routes.resourceCapabilities())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onDeleteClick = (
    id: DeleteResourceCapabilityMutationVariables['id'],
    name: string
  ) => {
    if (
      confirm('Opravdu chcete smazat kompetenci ' + name + '?')
    ) {
      deleteResourceCapability({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Detail kompetence {resourceCapability.name}
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{resourceCapability.id}</td>
            </tr>
            <tr>
              <th>Název</th>
              <td>{resourceCapability.name}</td>
            </tr>
            <tr>
              <th>Vytvořena</th>
              <td>{timeTag(resourceCapability.createdAt)}</td>
            </tr>
            <tr>
              <th>Aktualizována</th>
              <td>{timeTag(resourceCapability.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editResourceCapability({ id: resourceCapability.id })}
          className="rw-button rw-button-blue"
        >
          Upravit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(resourceCapability.id, resourceCapability.name)}
        >
          Smazat
        </button>
      </nav>
    </>
  )
}

export default ResourceCapability
