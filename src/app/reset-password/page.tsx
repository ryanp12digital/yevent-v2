"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ResetPasswordSchema } from "@/lib/schemas/auth";
import { resetPassword } from "@/actions/auth";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ResetPasswordPage() {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        startTransition(() => {
            resetPassword(values)
                .then((data) => {
                    if (data?.error) {
                        toast.error(data.error);
                    }
                    if (data?.success) {
                        toast.success(data.success);
                    }
                });
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Recuperar senha
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enviaremos um link para você redefinir sua senha
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm">
                        <Input
                            {...form.register("email")}
                            type="email"
                            placeholder="seu-email@exemplo.com"
                            disabled={isPending}
                            error={form.formState.errors.email?.message}
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Enviando..." : "Enviar link"}
                        </Button>
                        <Link
                            href="/login"
                            className="text-center text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Voltar para o login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
