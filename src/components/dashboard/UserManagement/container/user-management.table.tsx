"use client"

import { User } from "@/lib/types/users"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash2 } from "lucide-react"

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateAllowedListings } from "@/lib/hooks/useAllowedListings";

interface UserTableProps {
  data: User[];
  onViewUser: (user: User) => void
  onDeleteUser: (id: string) => void
}

export function UserTable({ data, onViewUser, onDeleteUser }: UserTableProps) {
  const [allowedListingUserId, setAllowedListingUserId] = useState<string | null>(null);
  const [allowedListingsValue, setAllowedListingsValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const updateAllowedListings = useUpdateAllowedListings();

  const handleEditClick = (user: User) => {
    setAllowedListingUserId(user._id);
    setSelectedUser(user);
    setAllowedListingsValue(user.allowedListings?.toString() || "");
  };

  const handleDialogClose = () => {
    setAllowedListingUserId(null);
    setAllowedListingsValue("");
    setSelectedUser(null);
  };

  const handleAllowedListingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allowedListingUserId) return;
    const value = Number(allowedListingsValue);
    if (isNaN(value) || value < 0) return;
    updateAllowedListings.mutate(
      { userId: allowedListingUserId, allowedListings: value },
      {
        onSuccess: handleDialogClose,
      }
    );
  };

  return (
    <><div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Listings</th>
          
            <th className="px-4 py-3">Signup Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((user) => (
            <tr key={user._id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </td>
              <td className="px-4 py-3 capitalize">{user.subscriptionPlanId?.name || "Free"}</td>
              <td className="px-4 py-3">{user.allowedListings || 0}</td>
         
              <td className="px-4 py-3">
                {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : (user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A")}
              </td>
              <td className="px-4 py-3">
                <Badge
                  className={`px-4 py-2 rounded-xl ${user.isActive ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F3F4F6] text-[#68706A]"}`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => handleEditClick(user)} title="Edit allowed listings">
                    <Edit />
                  </button>
                  <button
                    onClick={() => onViewUser(user)}
                    className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground"
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user._id)}
                    className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors text-muted-foreground"
                    title="Delete user"
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
    <Dialog open={!!allowedListingUserId} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Allowed Listings</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAllowedListingsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Allowed Listings</label>
              <Input
                type="number"
                min={0}
                value={allowedListingsValue}
                onChange={e => setAllowedListingsValue(e.target.value)}
                required
                className="w-full" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateAllowedListings.isPending}>
                {updateAllowedListings.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
