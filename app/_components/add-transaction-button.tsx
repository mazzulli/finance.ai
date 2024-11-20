"use client";

import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

interface IAddTransactionButtonProps {
  userCanAddTransaction: boolean;
}
const AddTransactionButton = ({
  userCanAddTransaction,
}: IAddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={
                userCanAddTransaction ? () => setDialogIsOpen(true) : () => {}
              }
            >
              Adicionar transação
              <ArrowUpDownIcon size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent hidden={userCanAddTransaction}>
            {!userCanAddTransaction &&
              "Você atingiu o limite de transações do plano básico. Atualize seu plano para ter transações ilimitadas."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
