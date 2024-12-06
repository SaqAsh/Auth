"use client";
import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
export const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    });

    return (

        <CardWrapper 
            headerLabel="Welcome Back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/register"
            showSocial>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(()=>{})}
                        className="space-y-6">
                        <div className="space-y-4">
                            <FormField
                            control={form.control}
                            name="email"
                            render={}/> // we are at an hour and 12
                        </div>
                    </form>
                </Form>
        </CardWrapper>

    );

    
}