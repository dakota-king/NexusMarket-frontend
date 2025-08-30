import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { RoleGate } from '@/components/auth/RoleGate'

export default async function DashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Dashboard
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Info Card */}
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  User Information
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Name:</span> {user.fullName || 'Not provided'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Email:</span> {user.emailAddresses[0]?.emailAddress}
                  </p>
                                     <p className="text-sm text-gray-600 dark:text-gray-400">
                     <span className="font-medium">Role:</span> {(user.publicMetadata?.role as string) || 'No role assigned'}
                   </p>
                </div>
              </div>

              {/* Role-based Content */}
                                    <RoleGate allowedRoles={['admin']}>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
                    Admin Panel
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    You have administrative access to manage the platform.
                  </p>
                  <div className="space-y-2">
                    <button className="w-full btn-primary text-sm">
                      Manage Users
                    </button>
                    <button className="w-full btn-outline text-sm">
                      Platform Settings
                    </button>
                  </div>
                </div>
              </RoleGate>

                                    <RoleGate allowedRoles={['vendor']}>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                    Vendor Dashboard
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                    Manage your products and orders.
                  </p>
                  <div className="space-y-2">
                    <button className="w-full btn-primary text-sm">
                      Manage Products
                    </button>
                    <button className="w-full btn-outline text-sm">
                      View Orders
                    </button>
                  </div>
                </div>
              </RoleGate>

                                    <RoleGate allowedRoles={['customer']}>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
                    Customer Dashboard
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mb-4">
                    Track your orders and manage your account.
                  </p>
                  <div className="space-y-2">
                    <button className="w-full btn-primary text-sm">
                      My Orders
                    </button>
                    <button className="w-full btn-outline text-sm">
                      Account Settings
                    </button>
                  </div>
                </div>
              </RoleGate>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
