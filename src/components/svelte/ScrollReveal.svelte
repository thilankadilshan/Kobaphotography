<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let container;
  let isLoaded = $state(false);
  let { direction = 'up', delay = 0, duration = 1.2, stagger = 0.15 } = $props();

  onMount(() => {
    // Loading state
    isLoaded = true;

    if (!container) return;

    const yOffset = direction === 'up' ? 80 : direction === 'down' ? -80 : 0;
    const xOffset = direction === 'left' ? 80 : direction === 'right' ? -80 : 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from(container.children, {
      y: yOffset,
      x: xOffset,
      opacity: 0,
      duration: duration,
      stagger: stagger,
      delay: delay,
      ease: 'power3.out',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === container) t.kill();
      });
    };
  });
</script>

<!-- svelte-ignore slot_element_deprecated -->
<div bind:this={container} class="scroll-reveal {isLoaded ? 'loaded' : 'loading'}">
  <slot />
</div>

<style>
  .loading {
    opacity: 0;
  }
  
  .loaded {
    opacity: 1;
  }
</style>