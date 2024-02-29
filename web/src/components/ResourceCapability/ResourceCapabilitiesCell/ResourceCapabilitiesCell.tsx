import type {
  FindResourceCapabilities,
  FindResourceCapabilitiesVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ResourceCapabilities from 'src/components/ResourceCapability/ResourceCapabilities'

export const QUERY: TypedDocumentNode<
  FindResourceCapabilities,
  FindResourceCapabilitiesVariables
> = gql`
  query FindResourceCapabilities @live {
    resourceCapabilities {
      id
      name
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Nahrávám...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'Zatím tu nejsou žádné kompetence zdrojů. '}
      <Link to={routes.newResourceCapability()} className="rw-link">
        {'Chcete jednu vytvořit?'}
      </Link>
    </div>
  )
}

export const Failure = ({
  error,
}: CellFailureProps<FindResourceCapabilities>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  resourceCapabilities,
}: CellSuccessProps<
  FindResourceCapabilities,
  FindResourceCapabilitiesVariables
>) => {
  return <ResourceCapabilities resourceCapabilities={resourceCapabilities} />
}
