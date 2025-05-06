import React from 'react';

export default function BigMoviesGrid({ children }) {
  return (
    <section className="w-full max-w-[1200px] px-8 py-6 mx-auto grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-items-center">
      {children}
    </section>
  );
}
