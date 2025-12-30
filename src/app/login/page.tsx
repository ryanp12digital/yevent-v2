"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

import { LoginSchema } from "@/lib/schemas/auth";
import { login } from "@/actions/auth";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(async () => {
            try {
                const data = await login(values);
                if (data?.error) {
                    toast.error(data.error);
                } else if (data?.success) {
                    // Login bem-sucedido - redireciona para o dashboard
                    toast.success("Login realizado com sucesso!");
                    router.push("/dashboard");
                    router.refresh();
                }
            } catch (error: any) {
                // Se for um redirect do Next.js, não é um erro real - apenas redireciona
                if (error?.digest?.startsWith('NEXT_REDIRECT') || error?.message?.includes('NEXT_REDIRECT')) {
                    router.push("/dashboard");
                    router.refresh();
                } else {
                    console.error("Erro no login:", error);
                    toast.error("Erro ao fazer login. Tente novamente.");
                }
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Yevent
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h1>
                        <p className="text-gray-500 text-sm">
                            Digite suas credenciais para acessar o painel.
                        </p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...form.register("email")}
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                            {form.formState.errors.email && (
                                <p className="text-red-500 text-xs ml-1">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-gray-700">Senha</label>
                                <Link
                                    href="/reset-password"
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...form.register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {form.formState.errors.password && (
                                <p className="text-red-500 text-xs ml-1">{form.formState.errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Entrar
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Não tem uma conta?{" "}
                            <Link
                                href="/register"
                                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                            >
                                Cadastre-se gratuitamente
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
