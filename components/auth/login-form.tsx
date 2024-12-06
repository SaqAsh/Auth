"use client";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSucess } from "../form-sucess";
import { login } from "@/actions/login";

    export const LoginForm = () => {

        const [isPending, startTransition] = useTransition();
        const [error, setError] = useState <string | undefined> ("");
        const [sucess, setSuccess] = useState <string | undefined> ("");

        const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema),
            defaultValues: {
            email: "",
            password: "",
            },
        });

        const onSubmit = (values: z.infer<typeof LoginSchema>) =>{

            setError("");
            setSuccess("");

            startTransition(() =>{
                login(values).then((data) =>{
                    setError(data.error);
                    setSuccess(data.sucess);
                });
            })

        }
        return (
            <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial
            >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input
                            {...field}
                            disabled={isPending}
                            placeholder="john.doe@example.com"
                            type="email"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <FormError message={error}/>
                <FormSucess message={sucess}/>
                <Button 
                    disabled={isPending} 
                    className="w-full" 
                    type="submit">
                        Login
                </Button>
                </form>
            </Form>
            </CardWrapper>
        );
    };
