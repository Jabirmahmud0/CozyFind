import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../Hooks/useAuth';

const Register = () => {
 
   const {createUser, updateUserProfile} = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   const {
    register,
    handleSubmit,
    
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, photoURL, fullName } = data;
    
    //create user and update profile
    createUser(email, password)
        .then(() => {
            updateUserProfile(fullName, photoURL).then(() => {
                      navigate(from, { replace: true });
            });
        })
        .catch(error => {
            console.error("Error creating user:", error);
        });
  };
  
    

  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">Create an Account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Please fill in the following fields to create your account</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6" >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input id="name" name="name" type="text"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Your Name" {...register("fullName", { required: true })} />
                {errors.fullName && <span className='text-red-500'>This field is required</span>}
              </div>
              <div>
                <input id="email" name="email" type="email"   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2" placeholder="Your Email Address" {...register("email", { required: true })} />
                {errors.email && <span className='text-red-500'>This field is required</span>}
              </div>
              <div>
                <input id="photoURL" name="photoURL" type="text"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2" placeholder="Photo URL" {...register("photoURL")} />
              </div>
              <div>
                <input id="password" name="password" type="password"    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2" placeholder="Create a Password" {...register("password", { required: true })}/>
                {errors.password && <span className='text-red-500'>This field is required</span>}
              </div>
            </div>
             <p className="mt-2 text-sm text-red-600"></p>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">
                Create Account
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            <p className="text-gray-600">Already have an account? <NavLink to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in here</NavLink></p>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default Register;