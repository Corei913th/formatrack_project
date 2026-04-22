import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { CreateUserStaffSchema, USER_ROLE_LABELS } from '@/modules/users'
import { useCreateUserStaff } from '@/modules/users';
import { UserRole } from "@/types/enums";
import { toast } from "sonner";

interface CreateUserStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Alignement sur le DTO de création
type CreateUserStaffFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password: string;
  password_confirmation: string;
  is_active: boolean;
};

export function CreateUserStaffModal({ isOpen, onClose }: CreateUserStaffModalProps) {
  const createMutation = useCreateUserStaff();

  const form = useForm<CreateUserStaffFormValues>({
    resolver: zodResolver(CreateUserStaffSchema) as any,
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      role: UserRole.ADMIN,
      password: "",
      password_confirmation: "",
      is_active: true,
    },
  });

  const onSubmit = async (data: CreateUserStaffFormValues) => {
    try {
      await createMutation.mutateAsync(data);
      toast.success("Utilisateur créé avec succès");
      form.reset();
      onClose();
    } catch (error: unknown) {
      toast.error((error as Error).message || "Erreur lors de la création");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Créer un utilisateur"
      description="Ajoutez un nouveau membre pour l'organisation"
      size="2xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Jean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jean.dupont@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle <span className="text-destructive">*</span></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>
                        {USER_ROLE_LABELS[UserRole.ADMIN]}
                      </SelectItem>
                      <SelectItem value={UserRole.INSTRUCTOR}>
                        {USER_ROLE_LABELS[UserRole.INSTRUCTOR]}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="655123456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm font-medium">Utilisateur actif</FormLabel>
                  <FormDescription className="text-xs">
                    L'utilisateur pourra se connecter à l'application
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-3 pt-6 border-t mt-6">
            <Button type="button" variant="outline" onClick={handleClose} disabled={createMutation.isPending}>
              Annuler
            </Button>
            <Button type="submit" isLoading={createMutation.isPending}>
              Créer
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
