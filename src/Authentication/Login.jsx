import React, { useContext } from 'react';
import loginimg from '../assets/login.png';
import { AuthContext } from '../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sociallogin from '../Component/Sociallogin';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { signIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'Login Successful!',
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Sign-in failed:', error);
        Swal.fire({
          title: 'Login Failed!',
          text: error.message || 'Invalid credentials. Please try again.',
          icon: 'error',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp',
          },
        });
      });
  };

  return (
    <div className="hero min-h-screen p-p bg-gray-100">
      <div className="hero-content flex-col lg:flex-row p-5  mt-20 mb-10 md:mb-0 md:mt-0 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img src={loginimg} alt="Login Illustration" className="w-full max-w-md" />
        </div>

        {/* Login Section */}
        <div className="w-full  lg:w-1/2">
          <h1 className="text-4xl font-bold text-black text-center">Login Now</h1>
          <div className="card w-full">
            <form className="card-body" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-yellow-700">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full text-black"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-yellow-700">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full text-black"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-yellow-600">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Google Login Button */}
              <Sociallogin />

              {/* Submit Button */}
              <div className="form-control mt-6">
                <input
                  className="btn bg-yellow-600 text-white w-full hover:bg-yellow-700"
                  type="submit"
                  value="Sign In"
                />
              </div>
            </form>

            {/* Redirect to Registration */}
            <p className="text-center mt-2 text-gray-700">
              <small>
                New here?{' '}
                <Link className="text-yellow-700 font-bold" to="/reg">
                  Create a New Account
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
