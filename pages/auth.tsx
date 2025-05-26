import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SignIn } from '@/service/api/auth/auth.mutation';
import { AuthSchema } from '@/schema/auth.schema';
import { AuthBody } from '@/types/auth.types';

const AuthPage = () => {
  const { signIn } = useAuth();

  const { mutateAsync, isPending } = SignIn({
    onSuccess(data) {
      signIn(data);
    },
    onError(error) {
      toast.error(error.response.data.error.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthBody>({
    resolver: zodResolver(AuthSchema),
  });

  const onSubmit: SubmitHandler<AuthBody> = (data) => {
    mutateAsync(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-20 phone:p-10">
      <div className="w-1/2 tablet:w-full phone:w-full">
        <Link href="/">
          <Image
            src="/SVG/logo.svg"
            alt="icon"
            width={141}
            height={50}
            className="mx-auto"
          />
        </Link>

        <h1 className="text-3xl font-semibold my-1 phone:my-3">Welcome 👋</h1>
        <p className="text-sm">Please Login to continue</p>

        <form
          className="flex flex-col gap-5 mt-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Input your email"
            label="Email"
            type="email"
            errorMessage={errors.identifier?.message}
            {...register('identifier')}
          />

          <Input
            placeholder="Input your password"
            label="Password"
            type="password"
            variant="password"
            errorMessage={errors.password?.message}
            {...register('password')}
          />

          <Button className="mt-5 w-full" type="submit" disabled={isPending}>
            Login
          </Button>

          <p className="text-sm">
            Not Have Account?{' '}
            <span
              className="underline cursor-pointer text-blue-500 font-semibold"
              onClick={() => {
                window.location.replace('/signup');
              }}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
