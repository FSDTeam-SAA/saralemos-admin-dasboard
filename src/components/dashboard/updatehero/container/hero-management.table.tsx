"use client";

import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Trash2,
  Image as ImageIcon,
  Video,
  PencilIcon,
  Eye,
} from "lucide-react";
import { Asset } from "@/lib/types/hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface HeroTableProps {
  data: Asset[];
  onView: (asset: Asset) => void;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

export function HeroTable({ data, onView, onEdit, onDelete }: HeroTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
          <tr>
            <th className="px-4 py-3">Images/Video</th>
            <th className="px-4 py-3">Tittle</th>
            <th className="px-4 py-3">SubTittle</th>
            <th className="px-4 py-3">Last Update</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((asset) => (
            <tr key={asset._id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 capitalize">
                <div className="flex items-center gap-2">
                  {asset.type === "image" ? (
                    <Image
                      src={asset.url}
                      alt={asset.section}
                      className="w-12 h-12 object-cover rounded"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <video
                      src={asset.url}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                </div>
              </td>
              <td className="px-4 py-3">{asset.section}</td>
              <td className="px-4 py-3">
                <p>{asset.subtitle ? asset.subtitle : "N/A"}</p>
              </td>
              <td className="px-4 py-3">
                <p>
                  {asset.updatedAt
                    ? new Date(asset.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })
                    : "N/A"}
                </p>
              </td>

              <td className=" py-3">
                <Badge
                  className={` px-4 py-2 rounded-xl ${asset.isActive ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F3F4F6] text-[#68706A]"}`}
                >
                  {asset.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(asset)}
                    className="p-1 cursor-pointer  hover:bg-muted rounded transition-colors hover:text-[#16A34A]"
                  >
                    <Eye></Eye>
                  </button>
                  <button
                    onClick={() => onEdit(asset)}
                    className="p-1 hover:bg-muted rounded cursor-pointer transition-colors hover:text-[#16A34A]"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(asset._id)}
                    className="p-1 hover:bg-destructive/10 cursor-pointer hover:text-destructive rounded transition-colors text-muted-foreground"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
