import ResourceKindCell from 'src/components/ResourceKind/ResourceKindCell'

type ResourceKindPageProps = {
  id: number
}

const ResourceKindPage = ({ id }: ResourceKindPageProps) => {
  return <ResourceKindCell id={id} />
}

export default ResourceKindPage
