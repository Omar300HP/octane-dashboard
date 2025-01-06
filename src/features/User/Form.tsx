import { useNavigate } from "react-router-dom";
import { User, useUpdateUserMutation } from "@/services/api";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema, rolesOptions } from "./const";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/Select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { routes } from "@/routes/paths";
import { Loader } from "lucide-react";

type UserFormProps = {
  initialValues: User;
};

const UserForm = ({ initialValues }: UserFormProps) => {
  const navigate = useNavigate();
  const [mutation, { isLoading, data }] = useUpdateUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
    values: data ?? initialValues,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await mutation({
        reqBody: { id: initialValues.id, ...values },
        params: {
          id: initialValues.id,
        },
      }).unwrap();
      navigate(routes.users``);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-[200px] md:w-[300px]">
                  <FormLabel className="font-medium flex justify-start">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 flex justify-start">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-[200px] md:w-[80%]">
                  <FormLabel className="font-medium flex justify-start">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email..."
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 flex justify-start">
                    This is your email address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-[200px] md:w-[80%]">
                  <FormLabel className="font-medium flex justify-start">
                    Role
                  </FormLabel>
                  <FormControl>
                    <Select
                      options={rolesOptions}
                      placeholder="role..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 flex justify-start">
                    This is your role.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2">
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col justify-center">
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={field.name}
                      />
                      <Label className="font-medium">
                        {field.value ? "Active" : "Inactive"}
                      </Label>
                    </div>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500 flex justify-start">
                    This is your account status.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            disabled={isLoading || !form.formState.isDirty}
            type="submit"
            className="min-w-[120px]"
          >
            {isLoading ? (
              <Loader className="h-4 w-4 animate-spin duration-[infinity]" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export { UserForm };
