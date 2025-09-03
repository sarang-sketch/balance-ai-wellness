'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, Loader2, Mail, Lock } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 gradient-bg-primary">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="relative">
            <Brain className="h-12 w-12 text-primary" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold gradient-text">
          {mode === 'signin'
            ? 'Welcome back to BalanceAI'
            : 'Join BalanceAI Today'}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {mode === 'signin'
            ? 'Continue your mental wellness journey'
            : 'Start your personalized mental wellness journey'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card p-8 rounded-2xl">
          <form className="space-y-6" action={formAction}>
          <input type="hidden" name="redirect" value={redirect || ''} />
          <input type="hidden" name="priceId" value={priceId || ''} />
          <input type="hidden" name="inviteId" value={inviteId || ''} />
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              <Mail className="inline h-4 w-4 mr-2" />
              Email Address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="rounded-full border-primary/20 focus:border-primary"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              <Lock className="inline h-4 w-4 mr-2" />
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={
                  mode === 'signin' ? 'current-password' : 'new-password'
                }
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="rounded-full border-primary/20 focus:border-primary"
                placeholder={mode === 'signin' ? 'Enter your password' : 'Create a strong password (min 8 characters)'}
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-destructive text-sm">{state.error}</div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full rounded-full glow-teal bg-primary hover:bg-primary/90 py-3"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Loading...
                </>
              ) : mode === 'signin' ? (
                'Sign In to BalanceAI'
              ) : (
                'Create Your Account'
              )}
            </Button>
          </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">
                  {mode === 'signin'
                    ? 'New to BalanceAI?'
                    : 'Already have an account?'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
                  redirect ? `?redirect=${redirect}` : ''
                }${priceId ? `&priceId=${priceId}` : ''}`}
                className="w-full flex justify-center py-3 px-4 border border-primary/20 rounded-full shadow-sm text-sm font-medium text-foreground bg-card/50 hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                {mode === 'signin'
                  ? 'Create your BalanceAI account'
                  : 'Sign in to your account'}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Lock className="h-3 w-3" />
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center space-x-1">
            <Brain className="h-3 w-3" />
            <span>AI-Powered</span>
          </div>
        </div>
      </div>
    </div>
  );
}
