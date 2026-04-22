
import NotFound from "@/components/layouts/not-found";
import { useAuthContext } from "@/contexts/authContext";
import { UserRole } from "@/types/enums";
import DashboardOverview from "@/pages/dashboard/dashboard";



export default function UserGateway() {
  const { user } = useAuthContext();

  if (user?.role === UserRole.STUDENT) return <NotFound />;

  return <DashboardOverview></DashboardOverview>;
}
