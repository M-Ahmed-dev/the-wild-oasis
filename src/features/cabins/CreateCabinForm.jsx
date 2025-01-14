import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...getCabinValues } = cabinToEdit;
  const editSession = Boolean(editId);
  const { register, handleSubmit, getValues, formState, reset } = useForm({
    defaultValues: editSession ? getCabinValues : {},
  });
  const { errors } = formState;

  //1. creating cabin
  const { createCabin, isCreating } = useCreateCabin();

  //2. editing cabin
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data?.image : data?.image[0];
    if (editSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => reset(),
        }
      );
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Cabin Name" error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "This field is required",
            })}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 2,
                message: "Capacity should be at least one",
              },
            })}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be at least one",
              },
            })}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            {...register("discount", {
              required: " This field is required",
              validate: (value) => {
                const regularPrice = Number(getValues("regularPrice"));
                return (
                  value <= regularPrice ||
                  "Discount should be less than regular price"
                );
              },
            })}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow label="Description" error={errors?.description?.message}>
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            {...register("description", {
              required: "This field is required",
            })}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow error={errors?.image?.message}>
          <FileInput
            type="file"
            id="image"
            accept="image/*"
            {...register("image", {
              required: editSession ? false : "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {editSession ? "Edit Cabin" : "Add Cabin"}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
