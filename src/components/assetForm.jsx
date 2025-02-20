import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const assetSchema = z.object({
    code: z.string().min(3, 'Code is required'),
    name: z.string().min(3, 'Name is required'),
    quantity: z.number().min(0, 'Quantity must be at least 0'),
    amount: z.number().min(0, 'Amount must be at least 0'),
    total: z.number().min(0, 'Total must be at least 0'),
    description: z.string().min(3, 'Description is required'),
    departmentId: z.string().uuid()
});

const AssetForm = ({ onAssetAdded }) => {
    const { departmentId } = useParams();
    const [formData, setFormData] = useState({
        id: uuidv4(),
        code: '',
        name: '',
        quantity: 0,
        amount: 0,
        total: 0,
        description: '',
        departmentId: departmentId
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = assetSchema.parse({
                ...formData,
                quantity: Number(formData.quantity),
                amount: Number(formData.amount),
                total: Number(formData.total)
            });
            const response = await axios.post('https://localhost:7117/api/Asset/Save', validatedData);
            console.log('Asset saved:', response.data);
            if (onAssetAdded) {
                onAssetAdded(response.data);
            }
            navigate(`/departments/${departmentId}/assets`);
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(error.flatten().fieldErrors);
                console.error("Validation Errors:", error.flatten().fieldErrors);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='AddAsset'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Asset</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='code'>Code:</label>
                        <input
                            type="text"
                            name="code"
                            className="form-control"
                            id="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder='Enter asset code'
                        />
                        {errors.code && <div className="text-danger">{errors.code[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='name'>Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter asset name'
                        />
                        {errors.name && <div className="text-danger">{errors.name[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='quantity'>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            id="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder='Enter quantity'
                        />
                        {errors.quantity && <div className="text-danger">{errors.quantity[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='amount'>Amount:</label>
                        <input
                            type="number"
                            name="amount"
                            className="form-control"
                            id="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder='Enter amount'
                        />
                        {errors.amount && <div className="text-danger">{errors.amount[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='total'>Total:</label>
                        <input
                            type="number"
                            name="total"
                            className="form-control"
                            id="total"
                            value={formData.total}
                            onChange={handleChange}
                            placeholder='Enter total'
                        />
                        {errors.total && <div className="text-danger">{errors.total[0]}</div>}
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor='description'>Description:</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            id="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='Enter asset description'
                        />
                        {errors.description && <div className="text-danger">{errors.description[0]}</div>}
                    </div>
                    <button className="btn btn-info" type="submit">Save Asset</button>
                </form>
            </div>
        </div>
    );
};
export default AssetForm;