import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import bgimg from '../assets/signup.jpg';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { AuthContext } from '../Provider/AuthProvider';
import Sociallogin from '../Component/Sociallogin';


const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggeduser = result.user;
        console.log('login:', loggeduser);
        updateUserProfile(data.name, data.photo)
          .then(() => {
            const userinfo = {
              name: data.name,
              email: data.email,
            };

            axiosPublic
              .post('/users', userinfo)
              .then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: 'User created successfully',
                    showClass: {
                      popup: 'animate__animated animate__fadeInUp animate__faster',
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutDown animate__faster',
                    },
                  });
                  navigate('/');
                }
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  const handleReset = () => {
    reset(); 
  };

  return (

          <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse p-8">
        <div className="text-center mt-20 mb-10 md:mt-0 md:mb-0 lg:text-left ">
          <img src={bgimg} alt="Signup Illustration" className="w-full h-auto max-w-md rounded-lg shadow-lg" />
        </div>

        <div className="card bg-white shadow-lg rounded-lg w-full max-w-2xl  md:mt-20 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="text-4xl font-bold text-center text-yellow-700 mt-10">Sign Up</h1>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Name</span>
              </label>
              <input
                type="text"
                name="name"
                {...register('name', { required: true })}
                placeholder="Your name"
                className="input input-bordered w-full"
                required
              />
              {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Photo URL</span>
              </label>
              <input
                type="url"
                name="photo"
                {...register('photo', { required: true })}
                placeholder="Insert image URL"
                className="input input-bordered w-full"
                required
              />
              {errors.photo && <span className="text-red-500 text-sm">This field is required</span>}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
              </label>
              <input
                type="email"
                name="email"
                {...register('email')}
                placeholder="Your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input
                type="password"
                name="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                })}
                placeholder="Your password"
                className="input input-bordered w-full"
                required
              />
              {errors.password?.type === 'required' && (
                <span className="text-red-500 text-sm">This field is required</span>
              )}
              {errors.password?.type === 'minLength' && (
                <span className="text-red-500 text-sm">Password must be at least 6 characters</span>
              )}
             
              {errors.password?.type === 'pattern' && (
                <span className="text-red-500 text-sm">
                  Password must contain at least one uppercase letter,one lowercase, and one special character
                </span>
              )}

              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-gray-600">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-yellow-600 text-white w-full hover:bg-yellow-700">Sign Up</button>
              <button
                type="button"
                onClick={handleReset}
                className="btn bg-red-500 text-white w-full mt-4 hover:bg-red-600"
              >
                Reset
              </button>
            </div>

            <p className="text-center mt-4">
              <small className="text-gray-600">
                Already have an account?{' '}
                <Link className="text-yellow-700 font-bold" to="/login">
                  Login here
                </Link>
              </small>
            </p>

            <Sociallogin />
          </form>
        </div>
      </div>
    </div>

  );
};

export default Signup;
