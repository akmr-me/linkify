"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyCheck, Copy } from "lucide-react";
import { ShortURLCellProps } from "@/types";
import Link from "next/link";
import Tooltip from "@/components/tooltip";

export default function CopyCell({
  row,
  header,
  accessorKey,
}: Omit<ShortURLCellProps, "value">) {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    navigator.clipboard.writeText(row.original[accessorKey]);
    setIsCopied(true);
    timerRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center space-x-2 justify-between">
      <Link
        href={row.getValue(accessorKey)}
        className="max-w-[180px] truncate block"
        title={row.getValue(accessorKey)}
      >
        {row.getValue(accessorKey)}
      </Link>
      <Tooltip hovertext={`Copy ${header} to clipboard`}>
        <Button variant="ghost" onClick={handleCopy} className="cursor-pointer">
          {isCopied ? (
            <CopyCheck size={16} color="green" />
          ) : (
            <Copy size={16} />
          )}
        </Button>
      </Tooltip>
    </div>
  );
}
