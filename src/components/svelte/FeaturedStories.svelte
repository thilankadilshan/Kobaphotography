<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { stories } from '../../data/stories.js';
  import StoryCard from './StoryCard.svelte';

  gsap.registerPlugin(ScrollTrigger);

  let sectionEl;
  let titleEl;
  let subtitleEl;
  let cardsContainer;
  let ctaEl;

  onMount(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from(titleEl, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
    .from(subtitleEl, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
    .from('.decorative-line', {
      scaleX: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    }, '-=0.4');

    gsap.from(ctaEl, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaEl,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });
</script>

<section 
  bind:this={sectionEl}
  id="featured-stories"
  class="relative py-24 md:py-32 lg:py-40 overflow-hidden"
  style="background-color: #F3E4C9;"
>
  <!-- Subtle warm texture overlay -->
  <div class="absolute inset-0 opacity-[0.04]" 
       style="background-image: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%230A2947%22 fill-opacity=%221%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"
  ></div>

  <!-- Decorative floating elements — warm tones -->
  <div class="absolute top-10 right-20 w-64 h-64 rounded-full opacity-20 blur-3xl" style="background-color: #D3D4C0;"></div>
  <div class="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15 blur-3xl" style="background-color: #8B5E3C;"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl" style="background-color: #0A2947;"></div>

  <!-- Top border accent -->
  <div class="absolute top-0 left-0 right-0 h-px" style="background: linear-gradient(to right, transparent, #8B5E3C, transparent);"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
    
    <!-- Section Header -->
    <div class="text-center mb-16 md:mb-24">
      <p 
        bind:this={subtitleEl}
        class="font-sans text-xs tracking-[0.4em] uppercase mb-4"
        style="color: #8B5E3C;"
      >
        Featured Stories
      </p>
      <h2 
        bind:this={titleEl}
        class="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none"
        style="color: #0A2947;"
      >
        Stories That<br/>
        <span class="italic" style="color: #8B5E3C;">Move Hearts</span>
      </h2>
      <!-- Decorative line -->
      <div class="decorative-line w-24 h-px mx-auto mt-8 origin-center" style="background: linear-gradient(to right, transparent, #8B5E3C, transparent);"></div>
    </div>

    <!-- Cards Grid -->
    <div 
      bind:this={cardsContainer}
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4 items-start"
    >
      {#each stories as story, i (story.id)}
        <div class={i % 2 === 0 ? 'lg:mt-0' : 'lg:mt-16'}>
          <StoryCard {story} index={i} />
        </div>
      {/each}
    </div>

    <!-- View All CTA -->
    <div 
      bind:this={ctaEl}
      class="text-center mt-20 md:mt-28"
    >
      <a 
        href="/stories"
        class="group inline-flex items-center gap-4 relative"
      >
        <span class="absolute -inset-4 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" style="background-color: rgba(139, 94, 60, 0.08);"></span>
        <span class="relative font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[#0A2947]" style="color: rgba(10, 41, 71, 0.6);">
          View All Stories
        </span>
        <span class="relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:border-[#8B5E3C]" style="border-color: rgba(10, 41, 71, 0.3);">
          <svg class="w-4 h-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#0A2947]" style="color: rgba(10, 41, 71, 0.6);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </span>
      </a>
    </div>
  </div>

  <!-- Bottom border accent -->
  <div class="absolute bottom-0 left-0 right-0 h-px" style="background: linear-gradient(to right, transparent, #8B5E3C, transparent);"></div>
</section>