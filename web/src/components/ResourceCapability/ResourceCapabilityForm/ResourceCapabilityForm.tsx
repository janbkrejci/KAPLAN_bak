import type {
  EditResourceCapabilityById,
  UpdateResourceCapabilityInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

type FormResourceCapability = NonNullable<
  EditResourceCapabilityById['resourceCapability']
>

interface ResourceCapabilityFormProps {
  resourceCapability?: EditResourceCapabilityById['resourceCapability']
  onSave: (
    data: UpdateResourceCapabilityInput,
    id?: FormResourceCapability['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const ResourceCapabilityForm = (props: ResourceCapabilityFormProps) => {
  const onSubmit = (data: FormResourceCapability) => {
    props.onSave(data, props?.resourceCapability?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormResourceCapability> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.resourceCapability?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: "Povinné pole" }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Uložit
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ResourceCapabilityForm
