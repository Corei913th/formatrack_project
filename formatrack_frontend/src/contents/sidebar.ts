import {
  LayoutDashboard,
  Users,
  FileText,
  CheckCircle,
  Send,
  BarChart3,
  Settings,
  Calendar,
  Trophy,
  Shield,
  Bell,
  Download,
  ClipboardList,
  GraduationCap,
} from "lucide-react";
import { SidebarMenuGroup } from "@/types/ui/sidebar-menu-item.type";
import { UserRole } from "@/types/enums";

export const MENU_GROUPS: SidebarMenuGroup[] = [
  {
    title: "Vue d'ensemble",
    menus: [
      {
        title: "Tableau de bord",
        url: "/dashboard",
        icon: LayoutDashboard,
        badge: "live",
        roles: [UserRole.ADMIN],
      },
    ],
  },

  {
    title: "Concours",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Gestion des concours",
        url: "/concours",
        icon: Trophy,
        badge: "3",
      },
    ],
  },

  {
    title: "Candidatures",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Candidats",
        url: "/candidats",
        icon: Users,
        badge: "12",
      },
      {
        title: "Candidatures",
        url: "/candidatures",
        icon: FileText,
        badge: "5",
      },
    ],
  },
  {
    title: "Finances",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Rapports financiers",
        url: "/finances/rapports",
        icon: BarChart3,
      },
    ],
  },


  {
    title: "Examens",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Épreuves",
        url: "/epreuves",
        icon: FileText,
      },
      {
        title: "Planning",
        url: "/planning",
        icon: Calendar,
      },
      {
        title: "Convocations",
        url: "/convocations",
        icon: FileText,
      },
      {
        title: "Saisie des notes",
        url: "/notes",
        icon: ClipboardList,
      },
      {
        title: "Résultats",
        url: "/resultats",
        icon: CheckCircle,
      },
    ],
  },


  {
    title: "Communication",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Messages",
        url: "/messages",
        icon: Send,
      },
      {
        title: "Alertes Système",
        url: "/alertes",
        icon: Bell,
        badge: "3",
      },
      {
        title: "Notifications",
        url: "/notifications",
        icon: Bell,
      },
    ],
  },


  {
    title: "Analyses",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Statistiques",
        url: "/statistiques",
        icon: BarChart3,
      },
      {
        title: "Analytics",
        url: "/analytics",
        icon: BarChart3,
      },
      {
        title: "Exports",
        url: "/exports",
        icon: Download,
      },
    ],
  },


  {
    title: "Sécurité",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Audit système",
        url: "/audit",
        icon: Shield,
      },
    ],
  },


  {
    title: "Gestion",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Utilisateurs",
        url: "/utilisateurs",
        icon: Users,
      },
      {
        title: "Formateurs",
        url: "/formateurs",
        icon: GraduationCap,
      },
    ],
  },


  {
    title: "Configuration",
    roles: [UserRole.ADMIN],
    menus: [
      {
        title: "Paramètres",
        url: "/parametres",
        icon: Settings,
      },
    ],
  },
];

