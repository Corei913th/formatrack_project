import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileSpreadsheet, FileText, ClipboardList, MapPin, CreditCard } from "lucide-react";
import { useDownload } from "@/hooks/use-download";
import { exportsService, EXPORT_MIME_TYPES } from "@/modules/exports";
import type { ExportResultatsParams, ExportEmargementParams } from "@/modules/exports";

interface ExportsDropdownMenuProps {
  concoursId: string;
  sessionId: string;
  resultatsParams?: ExportResultatsParams;
  emargementParams?: ExportEmargementParams;
}

export function ExportsDropdownMenu({
  concoursId,
  sessionId,
  resultatsParams,
  emargementParams,
}: ExportsDropdownMenuProps) {
  const { download, loading } = useDownload();
  const canExportConcoursSession = !!concoursId && !!sessionId;

  const handleExportResultatsExcel = () => {
    const url = exportsService.exportResultatsExcel(concoursId, sessionId, resultatsParams);
    const filename = `resultats-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportResultatsPdf = () => {
    const url = exportsService.exportResultatsPdf(concoursId, sessionId, resultatsParams);
    const filename = `resultats-${new Date().toISOString().split("T")[0]}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  const handleExportEmargement = () => {
    const url = exportsService.exportEmargementPdf(concoursId, sessionId, emargementParams);
    const filename = `emargement-${new Date().toISOString().split("T")[0]}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  const handleExportCandidatsParCentreExcel = () => {
    const url = exportsService.exportCandidatsParCentreExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `candidats-par-centre-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportCandidatsParCentrePdf = () => {
    const url = exportsService.exportCandidatsParCentrePdf(concoursId, {
      session_id: sessionId,
    });
    const filename = `candidats-par-centre-${new Date().toISOString().split("T")[0]}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  const handleExportResultatsDetaillesExcel = () => {
    const url = exportsService.exportResultatsDetaillesExcel(concoursId, {
      filiere_id: resultatsParams?.filiere_id,
    });
    const filename = `resultats-detailles-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportJournalPaiementsExcel = () => {
    const url = exportsService.exportJournalPaiementsExcel({
      concours_id: concoursId,
    });
    const filename = `journal-paiements-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportConcoursExcel = () => {
    const url = exportsService.exportConcoursExcel();
    const filename = `concours-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportCandidatsConcoursExcel = () => {
    const url = exportsService.exportCandidatsParConcoursExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `candidats-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportCandidatsParRegionExcel = () => {
    const url = exportsService.exportCandidatsParRegionExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `candidats-par-region-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportCandidatsParFiliereExcel = () => {
    const url = exportsService.exportCandidatsParFiliereExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `candidats-par-filiere-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportFicheConcoursPdf = () => {
    const url = exportsService.exportFicheConcoursPdf(concoursId, {
      session_id: sessionId,
    });
    const filename = `fiche-concours-${new Date().toISOString().split("T")[0]}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  const handleExportFicheConcoursExcel = () => {
    const url = exportsService.exportFicheConcoursExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `fiche-concours-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportEtatDocumentsExcel = () => {
    const url = exportsService.exportEtatDocumentsExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `etat-documents-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportRepartitionCandidatsExcel = () => {
    const url = exportsService.exportRepartitionCandidatsExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `repartition-candidats-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportStatistiquesConcoursExcel = () => {
    const url = exportsService.exportStatistiquesConcoursExcel(concoursId, {
      session_id: sessionId,
    });
    const filename = `statistiques-concours-${new Date().toISOString().split("T")[0]}.xlsx`;
    download(url, filename, EXPORT_MIME_TYPES.EXCEL);
  };

  const handleExportEtatDocumentsPdf = () => {
    const url = exportsService.exportEtatDocumentsPdf(concoursId, {
      session_id: sessionId,
    });
    const filename = `etat-documents-${new Date().toISOString().split("T")[0]}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  const handleExportRepartitionCandidatsPdf = () => {
    const url = exportsService.exportRepartitionCandidatsPdf(concoursId, {
      session_id: sessionId,
    });
    const filename = `repartition-candidats-${new Date().toISOString().split("T")[0]}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  const handleExportStatistiquesConcoursPdf = () => {
    const url = exportsService.exportStatistiquesConcoursPdf(concoursId, {
      session_id: sessionId,
    });
    const filename = `statistiques-concours-${new Date().toISOString().split("T")[0]}.pdf`;
    download(url, filename, EXPORT_MIME_TYPES.PDF);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={loading}>
          <Download className="h-4 w-4 mr-2" />
          {loading ? "Export en cours..." : "Exports"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[700px]">
        <DropdownMenuLabel>Exports disponibles</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="grid grid-cols-2 gap-1 p-1">
          {/* Colonne 1: Concours & Candidats */}
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Concours & Candidats</div>

            <DropdownMenuItem onClick={handleExportConcoursExcel} disabled={loading}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Liste des concours (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportFicheConcoursExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Fiche concours (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportFicheConcoursPdf} disabled={loading || !canExportConcoursSession}>
              <FileText className="h-4 w-4 mr-2" />
              Fiche concours (PDF)
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleExportCandidatsConcoursExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Candidats du concours (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportCandidatsParRegionExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Candidats par région (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportCandidatsParFiliereExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Candidats par filière (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportCandidatsParCentreExcel} disabled={loading || !canExportConcoursSession}>
              <MapPin className="h-4 w-4 mr-2" />
              Candidats par centre (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportCandidatsParCentrePdf} disabled={loading || !canExportConcoursSession}>
              <MapPin className="h-4 w-4 mr-2" />
              Candidats par centre (PDF)
            </DropdownMenuItem>
          </div>

          {/* Colonne 2: Résultats & Autres */}
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Résultats & Autres</div>

            <DropdownMenuItem onClick={handleExportResultatsExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Résultats (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportResultatsDetaillesExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Résultats détaillés (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportResultatsPdf} disabled={loading || !canExportConcoursSession}>
              <FileText className="h-4 w-4 mr-2" />
              Résultats (PDF)
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleExportJournalPaiementsExcel} disabled={loading || !canExportConcoursSession}>
              <CreditCard className="h-4 w-4 mr-2" />
              Journal des paiements (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportEmargement} disabled={loading || !canExportConcoursSession}>
              <ClipboardList className="h-4 w-4 mr-2" />
              Liste d'émargement (PDF)
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleExportEtatDocumentsExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              État des documents (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportEtatDocumentsPdf} disabled={loading || !canExportConcoursSession}>
              <FileText className="h-4 w-4 mr-2" />
              État des documents (PDF)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportRepartitionCandidatsExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Répartition candidats (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportRepartitionCandidatsPdf} disabled={loading || !canExportConcoursSession}>
              <FileText className="h-4 w-4 mr-2" />
              Répartition candidats (PDF)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportStatistiquesConcoursExcel} disabled={loading || !canExportConcoursSession}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Statistiques concours (Excel)
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleExportStatistiquesConcoursPdf} disabled={loading || !canExportConcoursSession}>
              <FileText className="h-4 w-4 mr-2" />
              Statistiques concours (PDF)
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
