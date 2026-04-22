import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UpdateUserStaffSchema, USER_ROLE_LABELS } from '@/modules/users'
import { useUpdateUserStaff } from '@/modules/users';
import { UserStaff } from '@/modules/users';
import { UserRole } from "@/types/enums";
import { toast } from "sonner";
import { UserCog } from "lucide-react";

interface EditUserStaffSheetProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserStaff | null;
}

// Alignement sur le DTO de mise à jour
type UpdateUserStaffFormValues = {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  password?: string;
  password_confirmation?: string;
  is_active?: boolean;
};

export function EditUserStaffSheet({ isOpen, onClose, user }: EditUserStaffSheetProps) {
  const updateMutation = useUpdateUserStaff();

  const form = useForm<UpdateUserStaffFormValues>({
    resolver: zodResolver(UpdateUserStaffSchema),
    defaultValues: {
      id: "",
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

  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role,
        password: "",
        password_confirmation: "",
        is_active: user.is_active,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: UpdateUserStaffFormValues) => {
    try {
      await updateMutation.mutateAsync(data);
      toast.success("Utilisateur modifié avec succès");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Erreur lors de la modification");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="right" className="w-full sm:max-w-2xl flex flex-col p-0">
        <SheetHeader className="pb-6 border-b px-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <UserCog className="h-5 w-5 text-primary" />
            </div>
            <SheetTitle className="text-xl">Modifier l'utilisateur</SheetTitle>
          </div>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-6 space-y-6 px-6">
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
                        <Input type="email" placeholder="email@example.com" {...field} />
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
                      <FormLabel>Nouveau mot de passe</FormLabel>
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
                      <FormLabel>Confirmer le mot de passe</FormLabel>
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
            </div>

            <SheetFooter className="mt-auto px-6 pb-6">
              <Button type="button" variant="outline" onClick={handleClose} disabled={updateMutation.isPending}>
                Annuler
              </Button>
              <Button type="submit" isLoading={updateMutation.isPending}>
                Enregistrer
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}