import type {
  EditResourceKindById,
  UpdateResourceKindInput,
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

type FormResourceKind = NonNullable<EditResourceKindById['resourceKind']>

interface ResourceKindFormProps {
  resourceKind?: EditResourceKindById['resourceKind']
  onSave: (data: UpdateResourceKindInput, id?: FormResourceKind['id']) => void
  error: RWGqlError
  loading: boolean
}

const ResourceKindForm = (props: ResourceKindFormProps) => {
  const onSubmit = (data: FormResourceKind) => {
    props.onSave(data, props?.resourceKind?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormResourceKind> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.resourceKind?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: "Povinné pole" }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="hourlyCost"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Hodinová sazba
        </Label>

        <TextField
          name="hourlyCost"
          defaultValue={props.resourceKind?.hourlyCost}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: "Povinné pole" }}
        />

        <FieldError name="hourlyCost" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Uložit
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ResourceKindForm
