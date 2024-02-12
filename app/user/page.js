import { DataTable } from '@/components/data-table/data-table';
import React from 'react';
import { columns } from './columns';

const getUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json();
    return data;
}
const CreateCustomer = async () => {
    const data = await getUsers();

    return (
        <section className='py-24'>
            <div className='container'>
                <h1 className='mb-6 text-3xl font-bold'>All Users</h1>
                <DataTable columns={columns} data={data} />
            </div>
        </section>
    )
}

export default CreateCustomer