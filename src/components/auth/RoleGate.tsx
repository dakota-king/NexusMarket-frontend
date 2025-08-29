import { useUser } from '@clerk/nextjs'
import { UserRole } from '@/types'

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
}

export function RoleGate({ children, allowedRoles, fallback }: RoleGateProps) {
  const { user } = useUser()
  const userRole = user?.publicMetadata?.role as UserRole
  
  if (!userRole || !allowedRoles.includes(userRole)) {
    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Access Denied
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            You don't have permission to view this content.
          </p>
        </div>
      </div>
    )
  }
  
  return <>{children}</>
}
