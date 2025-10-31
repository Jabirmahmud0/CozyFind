import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';

const Login = () => {
  const { signInUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || location.state || '/';

  const onSubmit = data => {
    const { email, password } = data;

    signInUser(email, password)
      .then(user => {
        console.log(user.user);
        // Redirect to the previous page or home page
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  const { googleLogin, githubLogin } = useAuth();

  const handleLogin = (handleProvider) => {
    handleProvider()
      .then(user => {
        if (user.user) {
          // Redirect to the previous page or home page
          navigate(from, { replace: true });
        }
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <p className="w-8 h-8 mr-2" alt="logo" />
            CozyFind
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email"   
                    placeholder="name@company.com" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    {...register("email", { required: true })} 
                  />
                  {errors.email && <span className='text-red-500'>This field is required</span>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password"  
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    {...register("password", { required: true })} 
                  />
                  {errors.password && <span className='text-red-500'>This field is required</span>}
                </div>
                <div className="flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button 
                  type="submit" 
                  className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
              <div className="flex justify-center my-4">
                <p className="flex items-center">Or Sign In With</p>
              </div>
              <div className="flex justify-center">
                <button 
                  className="bg-gray-200 text-black px-4 py-2 rounded" 
                  onClick={() => handleLogin(googleLogin)}
                >
                  Google
                </button>
                <button 
                  className="bg-gray-200 text-black px-4 py-2 rounded ml-4" 
                  onClick={() => handleLogin(githubLogin)}
                >
                  GitHub
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don{`'`}t have an account yet? <NavLink to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;