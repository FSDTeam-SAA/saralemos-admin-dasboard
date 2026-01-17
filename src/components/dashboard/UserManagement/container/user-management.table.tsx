"use client"

import { User } from "@/types/user"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Eye, Trash2 } from "lucide-react"

interface UserTableProps {
  data: User[]
  onViewUser: (user: User) => void
  onDeleteUser: (id: string) => void
}

export function UserTable({ data, onViewUser, onDeleteUser }: UserTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Plan</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-medium">{user.name}</td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.plan}</td>
              <td className="px-4 py-3">
                <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onViewUser(user)}
                    className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors text-muted-foreground"
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
  )
}
