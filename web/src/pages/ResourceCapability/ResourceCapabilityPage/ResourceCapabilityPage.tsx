import ResourceCapabilityCell from 'src/components/ResourceCapability/ResourceCapabilityCell'

type ResourceCapabilityPageProps = {
  id: number
}

const ResourceCapabilityPage = ({ id }: ResourceCapabilityPageProps) => {
  return <ResourceCapabilityCell id={id} />
}

export default ResourceCapabilityPage
