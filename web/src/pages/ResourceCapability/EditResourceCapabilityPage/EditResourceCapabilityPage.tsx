import EditResourceCapabilityCell from 'src/components/ResourceCapability/EditResourceCapabilityCell'

type ResourceCapabilityPageProps = {
  id: number
}

const EditResourceCapabilityPage = ({ id }: ResourceCapabilityPageProps) => {
  return <EditResourceCapabilityCell id={id} />
}

export default EditResourceCapabilityPage
