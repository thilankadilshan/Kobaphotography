<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let { story, index = 0 } = $props();
  let cardEl;
  let imageEl;
  let shineEl;
  let isHovered = $state(false);

  function handleMouseMove(e) {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    
    gsap.to(cardEl, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });

    if (shineEl) {
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      shineEl.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
    }
  }

  function handleMouseLeave() {
    if (!cardEl) return;
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    });
    if (shineEl) {
      shineEl.style.background = 'transparent';
    }
    isHovered = false;
  }

  function handleMouseEnter() {
    isHovered = true;
  }

  onMount(() => {
    if (cardEl) {
      gsap.from(cardEl, {
        y: 120,
        opacity: 0,
        rotateZ: story.rotation + (Math.random() * 4 - 2),
        duration: 1.2,
        delay: index * 0.2,
        ease: 'power3.out',
      });
    }
  });
</script>

<a 
  href={`/story/${story.slug}`}
  class="story-card-link block"
  style="perspective: 1000px;"
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={cardEl}
    class="story-card relative rounded-sm overflow-hidden cursor-pointer"
    style="transform-style: preserve-3d; transform: rotate({story.rotation}deg);"
    onmousemove={handleMouseMove}
    onmouseleave={handleMouseLeave}
    onmouseenter={handleMouseEnter}
  >
    <!-- Photo paper texture background — warm white -->
    <div class="absolute inset-0 z-0" style="background-color: #FAF7F0;"></div>
    
    <!-- Image container with polaroid-style padding -->
    <div class="relative p-3 pb-0 z-10">
      <div class="relative aspect-4/5 overflow-hidden" style="background-color: rgba(10, 41, 71, 0.08);">
        <img
          bind:this={imageEl}
          src={story.coverImage}
          alt={story.couple}
          class="w-full h-full object-cover transition-transform duration-700 ease-out"
          class:scale-110={isHovered}
          loading="lazy"
          onerror={(e) => { e.target.src = '/images/hero-bg.jpeg'; }}
        />
        <!-- Category badge -->
        <div class="absolute top-3 left-3 z-20">
          <span class="font-sans text-[10px] tracking-[0.2em] uppercase text-cream px-3 py-1" style="background-color: rgba(10, 41, 71, 0.85); backdrop-filter: blur(4px);">
            {story.category}
          </span>
        </div>
      </div>
    </div>

    <!-- Caption area -->
    <div class="relative p-4 pt-3 z-10">
      <p class="font-sans text-[10px] tracking-[0.25em] uppercase mb-1" style="color: #8B5E3C;">
        {story.couple}
      </p>
      <h3 class="font-serif text-lg leading-tight font-light line-clamp-2" style="color: #0A2947;">
        {story.title}
      </h3>
      <p class="font-sans text-xs mt-2 line-clamp-1" style="color: rgba(10, 41, 71, 0.5);">
        {story.subtitle}
      </p>
      
      <!-- View story indicator -->
      <div class="mt-4 flex items-center gap-2 opacity-0 translate-y-2 transition-all duration-300"
           class:opacity-100={isHovered}
           class:translate-y-0={isHovered}
      >
        <span class="font-sans text-[10px] tracking-[0.2em] uppercase" style="color: #8B5E3C;">View Story</span>
        <svg class="w-3 h-3 transition-transform duration-300" style="color: #8B5E3C;" class:translate-x-1={isHovered} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
        </svg>
      </div>
    </div>

    <!-- Shine overlay -->
    <div 
      bind:this={shineEl}
      class="absolute inset-0 z-30 pointer-events-none transition-all duration-300"
      style="background: transparent;"
    ></div>

    <!-- Shadow underneath — darker for cream background contrast -->
    <div class="absolute -bottom-2 left-2 right-2 h-4 blur-lg rounded-full -z-10 transition-all duration-300"
         style="background-color: rgba(10, 41, 71, 0.15);"
         class:opacity-100={!isHovered}
         class:opacity-70={isHovered}
         class:scale-100={!isHovered}
         class:scale-110={isHovered}
    ></div>
  </div>
</a>

<style>
  .story-card {
    box-shadow: 
      0 2px 4px rgba(10, 41, 71, 0.08),
      0 1px 2px rgba(10, 41, 71, 0.06),
      inset 0 0 0 1px rgba(10, 41, 71, 0.04);
    transition: box-shadow 0.4s ease;
  }
  
  .story-card:hover {
    box-shadow: 
      0 20px 40px rgba(10, 41, 71, 0.15),
      0 12px 12px rgba(10, 41, 71, 0.1),
      inset 0 0 0 1px rgba(10, 41, 71, 0.04);
  }

  .line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-1 {
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>