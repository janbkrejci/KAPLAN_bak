import EditResourceCell from 'src/components/Resource/EditResourceCell'

type ResourcePageProps = {
  id: number
}

const EditResourcePage = ({ id }: ResourcePageProps) => {
  return <EditResourceCell id={id} />
}

export default EditResourcePage
