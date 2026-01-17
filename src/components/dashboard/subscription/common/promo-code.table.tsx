"use client"

import { Trash2, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { PromoCode } from "./subscriptions.types"

interface PromoCodeTableProps {
  data: PromoCode[]
  onDelete: (id: string) => void
}

export function PromoCodeTable({ data, onDelete }: PromoCodeTableProps) {
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Code</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Discount</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Usage</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Expiry</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Status</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((promo) => (
            <tr key={promo.id} className="border-b border-border hover:bg-muted/30">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono font-semibold">{promo.code}</code>
                  <button
                    onClick={() => copyToClipboard(promo.code)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                    title="Copy code"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 text-sm">
                {promo.discountType === "percentage" ? `${promo.discountValue}%` : `$${promo.discountValue}`}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600"
                      style={{ width: `${(promo.currentUses / promo.maxUses) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {promo.currentUses} / {promo.maxUses}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{promo.expiryDate}</td>
              <td className="px-6 py-4">
                <Badge variant={promo.status === "Active" ? "default" : "secondary"}>{promo.status}</Badge>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDelete(promo.id)}
                  className="p-2 hover:bg-destructive/10 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
