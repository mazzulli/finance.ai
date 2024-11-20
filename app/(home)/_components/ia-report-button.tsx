import { Button } from "@/app/_components/ui/button";
import { SheetIcon } from "lucide-react";

const IAReportButton = () => {
  return (
    <Button className="flex gap-2 rounded-full" variant="ghost">
      Relatório IA
      <SheetIcon />
    </Button>
  );
};

export default IAReportButton;
