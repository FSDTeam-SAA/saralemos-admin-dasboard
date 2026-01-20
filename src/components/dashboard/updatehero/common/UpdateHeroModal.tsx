import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { HeroFormValues, heroFormSchema } from "../container/hero-management.schema";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Asset } from "@/lib/types/hero";

interface UpdateHeroModalProps {
  onSubmit: (
    values: HeroFormValues,
    imageFile?: File,
    videoFile?: File,
  ) => void;
  isLoading: boolean;
  open: boolean;
  setOpen: () => void;
  initialData?: Asset | null;
}

const UpdateHeroModal = ({
  onSubmit,
  isLoading,
  open,
  setOpen,
  initialData,
}: UpdateHeroModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      section: "hero",
      subtitle: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        section: initialData.section,
        subtitle: initialData.subtitle || "",
      });
    } else {
      reset({
        section: "hero",
        subtitle: "",
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data: HeroFormValues) => {
    const imageInput = (
      document.getElementById("image-input") as HTMLInputElement
    )?.files?.[0];
    const videoInput = (
      document.getElementById("video-input") as HTMLInputElement
    )?.files?.[0];
    onSubmit(data, imageInput, videoInput);
    if (!isLoading) {
       setOpen();
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <CardTitle>{initialData ? "Update Hero Section" : "Add Hero Section"}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {initialData
              ? "Modify the existing hero section details"
              : "Create a new hero section for the platform"}
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                {...register("section")}
                placeholder="Section Title"
                className="border-border bg-muted/50"
                readOnly
              />
              {errors.section && (
                <p className="text-destructive text-sm mt-1">{errors.section.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sub Title</label>
              <Input
                {...register("subtitle")}
                placeholder="Sub Title"
                className="border-border"
              />
              {errors.subtitle && (
                <p className="text-destructive text-sm mt-1">{errors.subtitle.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image Upload</label>
            <label
              htmlFor="image-input"
              className="block border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground">or click to browse image</p>
            </label>
            <input id="image-input" type="file" accept="image/*" className="hidden" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Video Upload</label>
            <label
              htmlFor="video-input"
              className="block border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition"
            >
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Drag and drop files here</p>
              <p className="text-xs text-muted-foreground">or click to browse video</p>
            </label>
            <input id="video-input" type="file" accept="video/*" className="hidden" />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={setOpen}>
              Cancel
            </Button>
            <Button disabled={isLoading} className="flex-1 bg-green-600 hover:bg-green-700">
              {isLoading ? (initialData ? "Updating..." : "Adding...") : (initialData ? "Update" : "Add")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateHeroModal;