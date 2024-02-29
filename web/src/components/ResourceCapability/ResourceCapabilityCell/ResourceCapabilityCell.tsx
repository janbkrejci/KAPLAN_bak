import type {
  FindResourceCapabilityById,
  FindResourceCapabilityByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ResourceCapability from 'src/components/ResourceCapability/ResourceCapability'

export const QUERY: TypedDocumentNode<
  FindResourceCapabilityById,
  FindResourceCapabilityByIdVariables
> = gql`
  query FindResourceCapabilityById($id: String!) @live {
    resourceCapability: resourceCapability(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Nahrávám...</div>

export const Empty = () => <div>Kompetence nenalezena</div>

export const Failure = ({
  error,
}: CellFailureProps<FindResourceCapabilityByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  resourceCapability,
}: CellSuccessProps<
  FindResourceCapabilityById,
  FindResourceCapabilityByIdVariables
>) => {
  return <ResourceCapability resourceCapability={resourceCapability} />
}
