import productController from "../controllers/product.controller"
import customerController from "../controllers/customer.controller"
import orderController from "../controllers/order.controller"
import { ICustomer } from "../types/customer"
import { IOrder } from "../types/order"
// Finish the resolvers
export const resolvers = {
  Query: {
    products: async() => await productController.getProducts(),
    customers: async() => await customerController.getCustomers(),
    orders: async() => await orderController.getOrders(),
    getProductById: async(_: any,{id}:{id: string}) => await productController.getProductById(id),
    getCustomerById: async(_: any,{id}:{id:string}) => customerController.getCustomerById(id),
  },
  Product: {
    customers: async(parent:{id:string}) => await orderController.getCustomersByProductId(parent.id)
  },
  Customer: {
    products: async(parent:{id:string}) => await orderController.getProductsByCustomerId(parent.id)
  },
  Order: {
    product: async(parent: {productId: string}) => await productController.getProductById(parent.productId),
    customer: async(parent: {customerId: string}) => await customerController.getCustomerById(parent.customerId)
  },
  Mutation: {
     addProduct: async(_: any, { productName, productPrice }: { productName: string; productPrice: number }) =>
      await productController.createProduct({ productName, productPrice }),
    editProduct: async(_: any, { id, productName, productPrice }: { id: string; productName?: string; productPrice?: number }) =>
     await productController.updateProductById(id, { productName, productPrice }),
    removeProduct: async(_: any, { id }: { id: string }) => await productController.deleteProductById(id),

    addCustomer: async(_: any, { firstName, lastName, email }: { firstName: string; lastName: string; email: string }) =>
     await customerController.createCustomer({ firstName, lastName, email }),
    editCustomer: async(_: any, { id, firstName, lastName, email }: { id: string; firstName?: string; lastName?: string; email?: string }) =>
     await customerController.updateCustomerById(id, { firstName, lastName, email }),
    removeCustomer: async(_: any, { id }: { id: string }) => await customerController.deleteCustomerById(id),

    addOrder: async(_: any, { productId, customerId }: Omit<IOrder,"id">) =>
     await orderController.createOrder({productId, customerId}),
    editOrder: async(_: any, { id, productId, customerId }: { id: string; productId?: string; customerId?: string }) =>
     await orderController.updateOrder({id,productId, customerId }),
    removeOrder: async(_: any, { id }: { id: string }) => await orderController.deleteOrder(id),
  }
}

