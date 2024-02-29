import EditResourceKindCell from 'src/components/ResourceKind/EditResourceKindCell'

type ResourceKindPageProps = {
  id: number
}

const EditResourceKindPage = ({ id }: ResourceKindPageProps) => {
  return <EditResourceKindCell id={id} />
}

export default EditResourceKindPage
