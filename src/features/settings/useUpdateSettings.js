import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending: isSettingsUpdating } = useMutation(
    {
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Settings updated Successfully");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: () => {
        toast.error("There was error updating settings");
      },
    }
  );

  return { updateSettings, isSettingsUpdating };
}
