import React, { useState } from 'react';
import { z } from 'zod';
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const schema = z.object({
    code: z.string().min(3, 'Code is required'),
    name: z.string().min(3, 'Name is required'),
    description: z.string().min(3, 'Description is required'),
    disciplineAction: z.string().min(1, 'Discipline Action is required'),

});

const DisciplineForm = () => {
    const [formData, setFormData] = useState({
        id: uuidv4(),
        code: '',
        name: '',
        description: '',
        disciplineAction: '',
    });
    const [disciplineActions, setDisciplineActions] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://localhost:7117/api/EnumLookup/DisciplineActionList")
            .then(response => setDisciplineActions(response.data))
            .catch(error => console.error("Error fetching discipline actions:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const validatedData = schema.parse(formData);
            const response = await axios.post('https://localhost:7117/api/Discipline/Save', validatedData);
            console.log('ValidatedData', validatedData)
            console.log('Discipline saved:', response.data);
            navigate("/disciplines");

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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='DepartmentForm'>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Add Discipline</h2>
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
                            placeholder='Enter discipline code'
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
                            placeholder='Enter discipline name'
                        />
                        {errors.name && <div className="text-danger">{errors.name[0]}</div>}
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
                            placeholder='Enter discipline description'
                        />
                        {errors.description && <div className="text-danger">{errors.description[0]}</div>}
                    </div>

                    <div className="col-md-6 mb-2">
                        <label htmlFor="disciplineAction">Discipline Action:</label>
                        <select
                            name="disciplineAction"
                            id="disciplineAction"
                            className="form-control"
                            value={formData.disciplineAction}
                            onChange={handleChange}
                        >
                            <option value="">-- Select an action --</option>
                            {disciplineActions.map(action => (
                                <option key={action.id} value={action.id}>
                                    {action.name}
                                </option>
                            ))}
                        </select>
                        {errors.disciplineAction && <div className="text-danger">{errors.disciplineAction[0]}</div>}
                    </div>


                    <button className="btn btn-info" type="submit">Save Discipline</button>
                </form>

            </div>


        </div>

    );
};

export default DisciplineForm;