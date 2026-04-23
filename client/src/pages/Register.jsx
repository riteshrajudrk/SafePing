import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuth } from '../store/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await register(form);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start building safe arrival automations">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Full name</span>
          <Input
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Email</span>
          <Input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">Password</span>
          <Input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </label>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
        <Button className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </Button>
      </form>
      <p className="mt-6 text-sm text-[hsl(var(--muted-foreground))]">
        Already have an account? <Link to="/login" className="font-medium text-cyan-300">Sign in</Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterPage;
