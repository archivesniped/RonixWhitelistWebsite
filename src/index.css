@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-dark-900 text-white antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }
}

@layer utilities {
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }
  
  .glass-hover {
    @apply transition-all duration-300 hover:bg-white/10 hover:border-white/20;
  }
  
  .gradient-text {
    @apply bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent;
  }
  
  .gradient-border {
    @apply relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-primary-500 before:to-primary-700 before:-z-10;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-dark-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-primary-500;
}

/* Selection */
::selection {
  @apply bg-primary-600 text-white;
}
