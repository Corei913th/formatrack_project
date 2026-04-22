import { useAuthContext } from "@/contexts/authContext";


export default function DashboardOverview() {
  const { user } = useAuthContext();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Bon retour, <span className="text-warning">{user?.email}</span> !</h1>
          <p className="text-sm text-muted-foreground">
            Visualisez les infos de vos concours en temps réel avec ces tableaux analytiques!
          </p>
        </div>
      </div>
    </div>
  );
}
