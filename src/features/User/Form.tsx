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

type UserFormProps = {
  initialValues: User;
};

const UserForm = ({ initialValues }: UserFormProps) => {
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
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email..." {...field} />
              </FormControl>
              <FormDescription>This is your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  options={rolesOptions}
                  placeholder="role..."
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your role.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex justify-start items-center space-x-2">
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    name={field.name}
                  />
                  <Label>{field.value ? "Active" : "Inactive"}</Label>
                </div>
              </FormControl>
              <FormDescription>This is your account status.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export { UserForm };
