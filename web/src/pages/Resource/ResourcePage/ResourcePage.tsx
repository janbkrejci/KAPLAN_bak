import ResourceCell from 'src/components/Resource/ResourceCell'

type ResourcePageProps = {
  id: number
}

const ResourcePage = ({ id }: ResourcePageProps) => {
  return <ResourceCell id={id} />
}

export default ResourcePage
