<script>
  import { onMount } from 'svelte';

  let visible = true;
  let fading = false;

  onMount(() => {
    setTimeout(() => {
      fading = true;
      setTimeout(() => {
        visible = false;
        // Dispatch custom event that BaseLayout can catch
        document.dispatchEvent(new CustomEvent('loading-done'));
      }, 800);
    }, 2500);
  });
</script>

{#if visible}
  <div 
    class="fixed inset-0 z-[100] bg-navy flex flex-col items-center justify-center transition-opacity duration-[800ms] ease-out"
    class:opacity-0={fading}
    class:pointer-events-none={fading}
  >
    <!-- Logo -->
    <div class="mb-6 opacity-0 animate-logo-in">
      <img 
        src="/images/logo.png" 
        alt="KobaPhotography" 
        class="h-20 md:h-28 w-auto"
        style="filter: brightness(0) invert(1);"
      />
    </div>

    <!-- Name -->
    <h1 class="font-serif text-white text-3xl md:text-5xl font-light tracking-tight mb-4 opacity-0 animate-name-in">
      Koba<span class="text-earth">Photography</span>
    </h1>

    <!-- Tagline -->
    <p class="font-sans text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase opacity-0 animate-tagline-in">
      Visual Storytelling
    </p>

    <!-- Loading Bar -->
    <div class="mt-10 w-48 h-px bg-white/10 rounded-full overflow-hidden opacity-0 animate-bar-in">
      <div class="h-full bg-earth animate-loading-bar"></div>
    </div>

    <!-- Loading Text -->
    <p class="font-sans text-white/40 text-[10px] tracking-[0.2em] uppercase mt-4 opacity-0 animate-text-in">
      Loading experience...
    </p>
  </div>
{/if}

<style>
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes loading-bar {
    0% { width: 0%; }
    50% { width: 70%; }
    100% { width: 100%; }
  }

  .animate-logo-in { animation: fade-in-up 0.8s ease-out 0.3s forwards; }
  .animate-name-in { animation: fade-in-up 0.8s ease-out 0.6s forwards; }
  .animate-tagline-in { animation: fade-in-up 0.8s ease-out 0.9s forwards; }
  .animate-bar-in { animation: fade-in-up 0.8s ease-out 1.2s forwards; }
  .animate-text-in { animation: fade-in-up 0.8s ease-out 1.5s forwards; }
  .animate-loading-bar { animation: loading-bar 2s ease-in-out forwards; }
</style>