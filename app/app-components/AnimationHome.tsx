"use client";
import React, { Suspense } from 'react';
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function AnimationHome() {
    return (
        <div className="w-64 h-64 lg:w-80 lg:h-80">
            <Suspense>
                <Spline scene="https://prod.spline.design/rZgdSbCGRUSrxQo3/scene.splinecode" />
            </Suspense>
        </div>
    );
}