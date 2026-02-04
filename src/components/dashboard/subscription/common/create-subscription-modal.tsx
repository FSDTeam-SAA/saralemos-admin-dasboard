"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSubscriptionSchema,
  type CreateSubscriptionValues,
} from "./subscriptions.schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AVAILABLE_FEATURES = [
  "Basic Analytics",
  "Advanced Analytics",
  "Priority Support",
  "Custom Domain",
  "Team Collaboration",
  "API Access",
  "White Label",
  "Unlimited Storage",
  "Automated Reports",
  "SSO Integration",
  "Custom Branding",
  "Dedicated Account Manager",
];

interface CreateSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSubscriptionValues) => void;
  isLoading?: boolean;
}

export function CreateSubscriptionModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateSubscriptionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateSubscriptionValues>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: {
      features: [],
    },
  });

  const features = watch("features") || [];
  const [featureInput, setFeatureInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredFeatures = AVAILABLE_FEATURES.filter(
    (feature) =>
      feature.toLowerCase().includes(featureInput.toLowerCase()) &&
      !features.includes(feature),
  );

  const addFeature = (feature: string = featureInput) => {
    if (feature.trim() && !features.includes(feature)) {
      setValue("features", [...features, feature]);
      setFeatureInput("");
      setShowDropdown(false);
    }
  };

  const removeFeature = (index: number) => {
    setValue(
      "features",
      features.filter((_, i) => i !== index),
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Subscription Plan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Subscription Name
            </label>
            <Input
              type="text"
              {...register("name")}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="Brief description of this plan"
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Price
              </label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder="0"
                className="mt-2"
              />
              {errors.price && (
                <p className="text-sm text-destructive mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Duration
              </label>
              <select
                {...register("duration")}
                className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
          </div>
          <div className="">
            <div>
              <label className="text-sm font-medium text-foreground">
                AllowedListings
              </label>
              <Input
                type="number"
                {...register("allowedListings", { valueAsNumber: true })}
                placeholder="0"
                className="mt-2"
              />
              {errors.allowedListings && (
                <p className="text-sm text-destructive mt-1">
                  {errors.allowedListings.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Features
            </label>
            <div className="mt-2 relative">
              <Input
                type="text"
                value={featureInput}
                onChange={(e) => {
                  setFeatureInput(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Type to search or add custom feature"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              />

              {showDropdown && filteredFeatures.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {filteredFeatures.map((feature) => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => addFeature(feature)}
                      className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm text-foreground"
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              )}

              {featureInput.trim() &&
                !filteredFeatures.includes(featureInput) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50">
                    <button
                      type="button"
                      onClick={() => addFeature()}
                      className="w-full text-left px-3 py-2 hover:bg-muted transition-colors text-sm text-foreground font-medium"
                    >
                      + Add &apos;{featureInput}&apos; as custom feature
                    </button>
                  </div>
                )}
            </div>

            {features.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  Selected Features ({features.length}):
                </p>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="font-bold hover:opacity-70"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.features && (
              <p className="text-sm text-destructive mt-2">
                {errors.features.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
