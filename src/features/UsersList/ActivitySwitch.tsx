import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, useUpdateUserMutation } from "@/services/api";
import { Loader } from "lucide-react";

type ActivitySwitchProps = { isActive: boolean; user: User };

const ActivitySwitch = ({ isActive, user }: ActivitySwitchProps) => {
  const [mutation, { isLoading }] = useUpdateUserMutation();
  const label = isActive ? "Active" : "Inactive";

  return (
    <div className="flex justify-center items-center space-x-2">
      {isLoading ? (
        <Loader className="h-4 w-4 animate-spin duration-[infinity]" />
      ) : (
        <>
          <Switch
            id="user-active"
            checked={isActive}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              mutation({
                reqBody: { ...user, isActive: !isActive },
                params: { id: user.id },
              });
            }}
          />
          <Label htmlFor="user-active">{label}</Label>
        </>
      )}
    </div>
  );
};

export { ActivitySwitch };
