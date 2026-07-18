'use client';

import { MotionConfig } from 'framer-motion';
import React from 'react';

/*
  Honors the user's reduced-motion preference for all framer-motion animations.
  With reducedMotion="user", framer-motion strips transform and layout
  animations (x, y, scale) while keeping opacity and color transitions that
  aid comprehension.
*/
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion='user'>{children}</MotionConfig>;
}
