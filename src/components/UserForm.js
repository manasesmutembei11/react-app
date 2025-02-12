// src/components/UserForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const userSchema = z.object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    email: z.string().email("Invalid email address"),
    age: z.number().min(18, "Age must be 18 or older"),
    gender: z.enum(["male", "female", "other"]),
});

const UserForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data) => {
        try {
            // Send data to the server
            await axios.post("/api/users", data);
            alert("User added successfully");
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
            <h2>Create New User</h2>

            {/* First Name */}
            <div>
                <label>First Name:</label>
                <input {...register("firstName")} />
                {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
                <label>Last Name:</label>
                <input {...register("lastName")} />
                {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label>Email:</label>
                <input type="email" {...register("email")} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>

            {/* Age */}
            <div>
                <label>Age:</label>
                <input type="number" {...register("age")} />
                {errors.age && <p>{errors.age.message}</p>}
            </div>

            {/* Gender */}
            <div>
                <label>Gender:</label>
                <select {...register("gender")}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <p>{errors.gender.message}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
