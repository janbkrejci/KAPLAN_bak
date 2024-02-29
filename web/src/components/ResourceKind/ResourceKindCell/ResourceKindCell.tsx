import type {
  FindResourceKindById,
  FindResourceKindByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ResourceKind from 'src/components/ResourceKind/ResourceKind'

export const QUERY: TypedDocumentNode<
  FindResourceKindById,
  FindResourceKindByIdVariables
> = gql`
  query FindResourceKindById($id: String!) @live {
    resourceKind: resourceKind(id: $id) {
      id
      name
      hourlyCost
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Nahrávám...</div>

export const Empty = () => <div>Typ zdroje nenalezen</div>

export const Failure = ({
  error,
}: CellFailureProps<FindResourceKindByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  resourceKind,
}: CellSuccessProps<FindResourceKindById, FindResourceKindByIdVariables>) => {
  return <ResourceKind resourceKind={resourceKind} />
}
