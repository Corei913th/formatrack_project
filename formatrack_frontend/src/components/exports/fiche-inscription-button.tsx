import { Button } from "@/components/ui/button";
import { FileText, Loader2 } from "lucide-react";
import { useDownload } from "@/hooks/use-download";
import { exportsService, EXPORT_MIME_TYPES } from "@/modules/exports";

interface FicheInscriptionButtonProps {
  candidatureId: string;
  numeroCandidat: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showLabel?: boolean;
}

export function FicheInscriptionButton({
  candidatureId,
  numeroCandidat,
  variant = "outline",
  size = "sm",
  className,
  showLabel = true,
}: FicheInscriptionButtonProps) {
  const { download, loading } = useDownload();

  const handleDownload = () => {
    const url = exportsService.downloadFicheInscription(candidatureId);
    const filename = `fiche-inscription-${numeroCandidat}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
      title="Télécharger la fiche d'inscription"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileText className="h-4 w-4" />
      )}
      {showLabel && !loading && <span className="ml-2">Fiche</span>}
      {showLabel && loading && <span className="ml-2">...</span>}
    </Button>
  );
}
