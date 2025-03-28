"use client"
export default function ProductError({ error }: { error: Error }) {
    return (
        <div>
          <h1>Something went wrong!</h1>
          <p>{error.message}</p>
          <p>Please try again later.</p>
        </div>
      );
}
