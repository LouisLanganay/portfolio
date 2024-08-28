export function getTheme(): 'dark' | 'light' {
  const hasTheme = localStorage.getItem('theme') as 'dark' | 'light';

  if (!hasTheme)
    return 'dark';
  return hasTheme;
}

export function switchTheme() {
  const theme = getTheme() === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', theme);

  if (theme === 'dark')
    document.documentElement.classList.add('dark');
  else
    document.documentElement.classList.remove('dark');
}
