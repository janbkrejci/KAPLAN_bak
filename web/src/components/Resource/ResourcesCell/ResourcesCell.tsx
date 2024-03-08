import type { FindResources, FindResourcesVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Resources from 'src/components/Resource/Resources'

export const QUERY: TypedDocumentNode<
  FindResources,
  FindResourcesVariables
> = gql`
  query FindResources @live {
    resources {
      id
      name
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'Zatím tu nejsou žádné zdroje. '}
      <Link to={routes.newResource()} className="rw-link">
        {'Chcete jeden vytvořit?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindResources>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  resources,
}: CellSuccessProps<FindResources, FindResourcesVariables>) => {
  return <Resources resources={resources} />
}
