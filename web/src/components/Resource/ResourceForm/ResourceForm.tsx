import type { EditResourceById, UpdateResourceInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormResource = NonNullable<EditResourceById['resource']>

interface ResourceFormProps {
  resource?: EditResourceById['resource']
  onSave: (data: UpdateResourceInput, id?: FormResource['id']) => void
  error: RWGqlError
  loading: boolean
}

const ResourceForm = (props: ResourceFormProps) => {
  const onSubmit = (data: FormResource) => {
    props.onSave(data, props?.resource?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormResource> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Název
        </Label>

        <TextField
          name="name"
          defaultValue={props.resource?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: "Povinné pole" }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="kindId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Typ
        </Label>

        <TextField
          name="resourceKindId"
          defaultValue={props.resource?.resourceKindId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: "Povinné pole" }}
        />

        <FieldError name="resourceKindId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Uložit
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ResourceForm
