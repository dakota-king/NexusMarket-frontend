import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useStore } from '@/lib/stores/useStore'
import { useUser } from '@clerk/nextjs'
import { SocketEvent } from '@/types'

export function useSocket() {
  const { socket, setSocket, addNotification } = useStore()
  const { user } = useUser()
  
  useEffect(() => {
    if (!user) return
    
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      auth: { 
        userId: user.id,
        role: user.publicMetadata?.role || 'customer'
      },
      transports: ['websocket', 'polling']
    })
    
    setSocket(socketInstance)
    
    // Connection events
    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id)
    })
    
    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected')
    })
    
    // Inventory updates
    socketInstance.on('inventory-update', (data: { productId: number; quantity: number }) => {
      addNotification({
        type: 'inventory_alert',
        title: 'Inventory Update',
        message: `Product inventory has been updated`,
        data
      })
    })
    
    // Order updates
    socketInstance.on('order-update', (data: { orderId: number; status: string }) => {
      addNotification({
        type: 'order_update',
        title: 'Order Update',
        message: `Your order #${data.orderId} status: ${data.status}`,
        data
      })
    })
    
    // Price updates
    socketInstance.on('price-update', (data: { productId: number; newPrice: number }) => {
      addNotification({
        type: 'promotion',
        title: 'Price Update',
        message: `A product in your wishlist has a new price!`,
        data
      })
    })
    
    // Error handling
    socketInstance.on('error', (error: any) => {
      console.error('Socket error:', error)
    })
    
    return () => {
      socketInstance.disconnect()
    }
  }, [user, setSocket, addNotification])
  
  return socket
}

export function useSocketEvent(event: string, callback: (data: any) => void) {
  const socket = useSocket()
  
  useEffect(() => {
    if (!socket) return
    
    socket.on(event, callback)
    
    return () => {
      socket.off(event, callback)
    }
  }, [socket, event, callback])
}

export function emitSocketEvent(event: string, data: any) {
  const socket = useSocket()
  
  if (socket) {
    socket.emit(event, data)
  }
}
