import type { FindResourceById, FindResourceByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Resource from 'src/components/Resource/Resource'

export const QUERY: TypedDocumentNode<
  FindResourceById,
  FindResourceByIdVariables
> = gql`
  query FindResourceById($id: String!) @live {
    resource: resource(id: $id) {
      id
      name
      managerId
      manager {
        id
        name
      }
      resourceKindId
      resourceKind {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Nahrávám...</div>

export const Empty = () => <div>Zdroj nenalezen</div>

export const Failure = ({
  error,
}: CellFailureProps<FindResourceByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  resource,
}: CellSuccessProps<FindResourceById, FindResourceByIdVariables>) => {
  return <Resource resource={resource} />
}
