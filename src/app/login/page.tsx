import { login } from '@/actions/auth';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form action={login} className="p-8 bg-white rounded-lg shadow-md w-80">
                <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Admin Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
                    <input
                        name="username"
                        placeholder="User"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150">
                    Entrar
                </button>
            </form>
        </div>
    );
}
