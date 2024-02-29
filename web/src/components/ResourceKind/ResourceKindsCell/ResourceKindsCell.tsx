import type {
  FindResourceKinds,
  FindResourceKindsVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ResourceKinds from 'src/components/ResourceKind/ResourceKinds'

export const QUERY: TypedDocumentNode<
  FindResourceKinds,
  FindResourceKindsVariables
> = gql`
  query FindResourceKinds @live {
    resourceKinds {
      id
      name
      hourlyCost
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Nahrávám...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'Zatím tu nejsou žádné typy zdrojů. '}
      <Link to={routes.newResourceKind()} className="rw-link">
        {'Chcete jeden vytvořit?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindResourceKinds>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  resourceKinds,
}: CellSuccessProps<FindResourceKinds, FindResourceKindsVariables>) => {
  return <ResourceKinds resourceKinds={resourceKinds} />
}
