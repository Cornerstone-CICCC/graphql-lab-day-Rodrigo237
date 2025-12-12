import { Customer } from "../models/customer.model";
import { ICustomer } from "../types/customer";

const getCustomers = async () =>{
    const customers = await Customer.find();
    return customers;
}

const createCustomer = async (data: Omit<ICustomer,"id">) =>{
    const customer = Customer.create(data);
    return customer;
}

const getCustomerById = async (id: string) =>{
    return await Customer.findById(id);
}

const updateCustomerById = async (id: string,data: Partial<ICustomer>) =>{
    return await Customer.findByIdAndUpdate(id, data, {new: true});
}

const deleteCustomerById = async (id: string) =>{
    return await Customer.findByIdAndDelete(id); 
}

export default {
    getCustomers,
    createCustomer,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
}