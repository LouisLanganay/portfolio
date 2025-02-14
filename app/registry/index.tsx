import * as React from 'react';
import * as z from 'zod';


export const registrySchema = z.record(
  z.string(),
  z.object({
    name: z.string(),
    component: z.function().args(z.any()).returns(z.any()).optional(),
    source: z.any().optional(),
  }),
);

export type Registry = z.infer<typeof registrySchema>;

const example: Registry = {
  'button-outline': {
    name: 'button-outline',
    component: React.lazy(() => import('@/app/registry/components/ButtonOutline')),
    source: require('!raw-loader!@/app/registry/components/ButtonOutline'),
  },
  'text-gradient': {
    name: 'text-gradient',
    component: React.lazy(() => import('@/app/registry/components/TextGradient')),
    source: require('!raw-loader!@/app/registry/components/TextGradient'),
  },
};

const registry: Registry = {
  ...example,
};

export default registry;

export type ComponentName = keyof (typeof example);