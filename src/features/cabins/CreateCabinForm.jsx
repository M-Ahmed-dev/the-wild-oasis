import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";

function CreateCabinForm() {
  const { register, handleSubmit, getValues, formState, reset } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: insertCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data?.image[0] });
    console.log("data:", data);
  }

  if (isPending) return <Spinner />;

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
          />
        </FormRow>

        <FormRow error={errors?.image?.message}>
          <FileInput
            type="file"
            id="image"
            accept="image/*"
            {...register("image", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isPending}>Add Cabin</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
