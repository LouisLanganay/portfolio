'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export function NewsLetterSubscribe() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubscribed(true);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-4 rounded-lg border border-tertiary-480 bg-tertiary-600/30">
      <h3 className="text-lg font-semibold mb-2 dark:text-white text-black">
        Subscribe to the Newsletter
      </h3>
      <p className="text-sm dark:text-white/70 text-black/70 mb-4">
        Get notified about new articles and updates.
      </p>
      {subscribed ? (
        <div className="flex items-center gap-2 text-sm dark:text-white/90 text-black/90">
          <EnvelopeIcon className="h-5 w-5" />
          Thanks for subscribing!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading || !email}
          >
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
