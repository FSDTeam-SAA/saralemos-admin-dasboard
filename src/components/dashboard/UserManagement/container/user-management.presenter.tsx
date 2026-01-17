"use client"

import { useState } from "react"
import type { User } from "@/types/user"
import { UserTable } from "./user-management.table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface UserManagementPresenterProps {
  users: User[]
  isLoading: boolean
  error: string | null
  onDeleteUser: (id: string) => void
  onPageChange: (page: number) => void
  currentPage: number
  totalPages: number
}

export function UserManagementPresenter({
  users,
  isLoading,
  error,
  onDeleteUser,
  onPageChange,
  currentPage,
  totalPages,
}: UserManagementPresenterProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center text-muted-foreground">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-destructive/10 text-destructive p-4 rounded-lg">Error loading users: {error}</div>
  }

  return (
    <>
      <div className="space-y-6">
        <UserTable data={users} onViewUser={setSelectedUser} onDeleteUser={onDeleteUser} />

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Showing 1 to {users.length} of {users.length} results
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === i + 1 ? "bg-green-600 text-white" : "border border-border"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border rounded text-sm disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground font-medium">{selectedUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant={selectedUser.status === "Active" ? "default" : "secondary"}>
                    {selectedUser.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Plan</label>
                  <p className="text-foreground font-medium">{selectedUser.plan}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Signup Date</label>
                  <p className="text-foreground font-medium">{selectedUser.signupDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Active</label>
                  <p className="text-foreground font-medium">{selectedUser.lastActive}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
