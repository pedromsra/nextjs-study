'use client';
import { memo } from 'react';

function HomeForm() {
  return (
    <form action={`/api/forms`} method="POST">
      <label htmlFor="input">Input qualquer</label>
      <input name="input" id="input" type="number" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default memo(HomeForm);
