import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageTransition from "@/components/animate/page-transition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ErrorMessage } from "@/components/error-message";
import { LoginDTO, useLogin } from '@/modules/auth';
import { LoginSchema } from '@/modules/auth';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Submitting from "@/components/submitting";
import FormHeader from "@/components/formHeader";
import { useAuthContext } from "@/contexts/authContext";




export default function Login() {
  const {
    mutateAsync: login,
    isPending: isLoginPending,
    isError,
    error,
  } = useLogin();
  const { updateUser, isLoadingProfile } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginDTO>({
    resolver: zodResolver(LoginSchema),
  });


  /*useEffect(() => {
    if (isConnected && !isLoadingProfile) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isConnected, isLoadingProfile, navigate, location]);*/

  const handleLogin = async (dto: LoginDTO) => {
    await login(dto).then((response) => {
      if (response?.success) {
        updateUser(response.data?.user || null);
        const from = (location.state as any)?.from?.pathname || "/";
        navigate(from, {
          replace: true,
        });
      }
    });
  };

  // Show loading while checking auth status
  if (isLoadingProfile) {
    return (
      <PageTransition>
        <div className="min-h-fit w-full bg-transparent flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Vérification...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-fit w-full bg-transparent flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo et titre */}
          <FormHeader
            title="Bon retour"
            message="Connectez-vous à votre compte pour continuer"
          />

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLogin)}
                  className="space-y-6"
                >
                  {isError && error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <ErrorMessage message={error.message} />
                    </div>
                  )}

                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-gray-600">
                            Adresse email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="votre.email@example.com"
                              icon={MailIcon}
                              className="h-12 rounded-xl transition-all text-gray-700 shadow-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-2">
                            <FormLabel className="text-sm font-semibold text-gray-600">
                              Mot de passe
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              icon={LockIcon}
                              rightIcon={showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                              showPassword={showPassword}
                              onTogglePassword={() => setShowPassword(!showPassword)}
                              className="h-12 rounded-xl transition-all text-gray-700 shadow-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoginPending}
                    className="w-full h-12 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoginPending ? (
                      <Submitting title="Connexion ..." />

                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </form>
              </Form>

            </CardContent>
          </Card>

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Connexion sécurisée</span>
            </div>
            <div className="flex items-center gap-2">
              <LockIcon className="w-4 h-4 text-primary" />
              <span>Données cryptées</span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}