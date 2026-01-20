"use client";

import { type HeroFormValues } from "./hero-management.schema";
import UpdateHeroModal from "../common/UpdateHeroModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Asset } from "@/lib/types/hero";
import { HeroTable } from "./hero-management.table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HeroManagementPresenterProps {
  onSubmit: (
    values: HeroFormValues,
    imageFile?: File,
    videoFile?: File,
  ) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  data: Asset[];
}

export function HeroManagementPresenter({
  onSubmit,
  onDelete,
  isLoading,
  data,
}: HeroManagementPresenterProps) {
  const [open, setOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [viewingAsset, setViewingAsset] = useState<Asset | null>(null);

  const handleCreateNew = () => {
    setEditingAsset(null);
    setOpen(true);
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setOpen(true);
  };

  const handleView = (asset: Asset) => {
    setViewingAsset(asset);
  };

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Sections</h2>
        <Button onClick={handleCreateNew}>
          <Plus className="w-4 h-4 mr-2" />
          Create Now
        </Button>
      </div>

      <HeroTable 
        data={data} 
        onView={handleView} 
        onEdit={handleEdit} 
        onDelete={onDelete} 
      />

      <UpdateHeroModal
        onSubmit={onSubmit}
        isLoading={isLoading}
        open={open}
        setOpen={() => setOpen(!open)}
        initialData={editingAsset}
      />

      <Dialog open={!!viewingAsset} onOpenChange={() => setViewingAsset(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Hero Asset Details</DialogTitle>
          </DialogHeader>
          {viewingAsset && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Section</p>
                  <p className="text-lg font-semibold capitalize">{viewingAsset.section}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <p className="text-lg font-semibold capitalize">{viewingAsset.type}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Subtitle</p>
                  <p className="text-base">{viewingAsset.subtitle || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Preview</p>
                <div className="rounded-xl overflow-hidden border border-border bg-muted/30">
                  {viewingAsset.type === "image" ? (
                    <img 
                      src={viewingAsset.url} 
                      alt={viewingAsset.section} 
                      className="w-full h-auto max-h-[400px] object-contain mx-auto"
                    />
                  ) : (
                    <video 
                      src={viewingAsset.url} 
                      controls 
                      className="w-full h-auto max-h-[400px] mx-auto"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>Created: {new Date(viewingAsset.createdAt).toLocaleString()}</div>
                <div>Updated: {new Date(viewingAsset.updatedAt).toLocaleString()}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
