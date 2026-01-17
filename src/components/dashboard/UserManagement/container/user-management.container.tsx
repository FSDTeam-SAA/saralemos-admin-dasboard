"use client"

import { useState } from "react"


import { useUsers, useDeleteUser } from "../common/user-management.hooks"
import { UserManagementPresenter } from "./user-management.presenter"

export function UserManagementContainer() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useUsers(page, 10)
  const deleteUserMutation = useDeleteUser()

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id)
    }
  }

  const users = data?.data?.items || []
  const total = data?.data?.total || 0
  const totalPages = Math.ceil(total / 10)

  return (
    <UserManagementPresenter
      users={users}
      isLoading={isLoading}
      error={error?.message || null}
      onDeleteUser={handleDeleteUser}
      onPageChange={setPage}
      currentPage={page}
      totalPages={totalPages}
    />
  )
}
