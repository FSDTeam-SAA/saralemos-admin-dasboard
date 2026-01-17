"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSubscriptionSchema, type CreateSubscriptionValues } from "./subscriptions.schema"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateSubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateSubscriptionValues) => void
  isLoading?: boolean
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
  })

  const features = watch("features") || []
  const [featureInput, setFeatureInput] = useState("")

  const addFeature = () => {
    if (featureInput.trim()) {
      setValue("features", [...features, featureInput])
      setFeatureInput("")
    }
  }

  const removeFeature = (index: number) => {
    setValue(
      "features",
      features.filter((_, i) => i !== index),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Subscription Plan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Subscription Name</label>
            <Input  type="text"
              {...register("name")}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
            />
       
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              {...register("description")}
              placeholder="Brief description of this plan"
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              rows={3}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Price</label>
              <Input type="number" {...register("price", { valueAsNumber: true })} placeholder="0" className="mt-2" />
              {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Duration</label>
              <select
                {...register("duration")}
                className="w-full mt-2 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Features</label>
            <div className="flex gap-2 mt-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} variant="outline">
                Add
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded">
                  <span className="text-sm text-foreground">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="text-destructive hover:bg-destructive/10 px-2 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {errors.features && <p className="text-sm text-destructive mt-1">{errors.features.message}</p>}
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
  )
}
