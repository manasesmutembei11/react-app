import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import './App.css'

// Define Zod Schema
const userSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be at least 18"),
  gender: z.enum(["male", "female", "other"]),
  country: z.string().min(1, "Select a country"),
  terms: z.boolean().refine((val) => val, "You must accept the terms"),
});

const UserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      gender: "male",
      country: "",
      terms: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
        <input type="number" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      {/* Gender (Radio Buttons) */}
      <div>
        <label>Gender:</label>
        <label>
          <input type="radio" value="male" {...register("gender")} /> Male
        </label>
        <label>
          <input type="radio" value="female" {...register("gender")} /> Female
        </label>
        <label>
          <input type="radio" value="other" {...register("gender")} /> Other
        </label>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      {/* Country (Dropdown) */}
      <div>
        <label>Country:</label>
        <select {...register("country")}>
          <option value="">Select...</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
        </select>
        {errors.country && <p>{errors.country.message}</p>}
      </div>

      {/* Terms & Conditions (Checkbox) */}
      <div>
        <label>
          <input type="checkbox" {...register("terms")} /> I accept the terms
        </label>
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;

